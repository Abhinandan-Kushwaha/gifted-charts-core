import { useRef, useState } from 'react'
import {
  defaultLabelLineConfig,
  emptyExternaLabelProperties,
  getTextSizeForPieLabels
} from '../utils'
import { type PieChartMainProps, type pieDataItem } from './types'
import { PieTooltipDefaults } from '../utils/constants'

export const getPieChartMainProps = (props: PieChartMainProps) => {
  const {
    isThreeD,
    isBiggerPie,
    paddingHorizontal,
    paddingVertical,
    extraRadius,
    showExternalLabels,
    externalLabelComponent,
    showTooltip,
    tooltipWidth,
    persistTooltip,
    tooltipComponent,
    tooltipDuration = PieTooltipDefaults.tooltipDuration,
    tooltipVerticalShift = PieTooltipDefaults.tooltipVerticalShift,
    tooltipHorizontalShift = PieTooltipDefaults.tooltipHorizontalShift,
    showValuesAsTooltipText = PieTooltipDefaults.showValuesAsTooltipText,
    tooltipTextNoOfLines = PieTooltipDefaults.tooltipTextNoOfLines,
    tooltipBackgroundColor = PieTooltipDefaults.tooltipBackgroundColor,
    tooltipBorderRadius = PieTooltipDefaults.tooltipBorderRadius,
    font,
    fontWeight,
    fontStyle,
    edgesPressable,
    tooltipSelectedIndex,
    setTooltipSelectedIndex
  } = props
  const propData = props.data
  const data: pieDataItem[] = []
  const minisculeDataItem =
    props.data.map((item) => item.value).reduce((v, a) => v + a, 0) / 160000
  let itemHasInnerComponent = false
  if (propData) {
    for (let i = 0; i < propData.length; i++) {
      if (propData[i].pieInnerComponent) itemHasInnerComponent = true
      if (propData[i].value > minisculeDataItem) {
        data.push(propData[i])
      } else {
        data.push({
          ...propData[i],
          value: minisculeDataItem
        })
      }
    }
  }
  const showInnerComponent = !!props.pieInnerComponent || itemHasInnerComponent

  const radius = props.radius ?? 120
  const canvasWidth = radius * 2
  const canvasHeight = isThreeD ? radius * 2.3 : radius * 2
  const shadowWidth = props.shadowWidth ?? radius / 5
  const backgroundColor = props.backgroundColor ?? 'transparent'
  const shadowColor = props.shadowColor ?? 'lightgray'
  const semiCircle = props.semiCircle ?? false

  let pi = Math.PI
  const initialAngle = props.initialAngle ?? (semiCircle ? pi / -2 : 0)
  const shadow = props.shadow ?? false
  const donut = props.donut ?? false
  const strokeWidth = props.strokeWidth ?? 0
  const strokeColor =
    props.strokeColor ?? (strokeWidth ? 'gray' : 'transparent')
  const innerRadius = props.innerRadius ?? radius / 2.5

  const showText = props.showText ?? false
  const textColor = props.textColor ?? ''
  const textSize = getTextSizeForPieLabels(props.textSize ?? 0, radius)
  const labelLineConfig = {
    length: props.labelLineConfig?.length ?? defaultLabelLineConfig.length,
    tailLength:
      props.labelLineConfig?.tailLength ?? defaultLabelLineConfig.tailLength,
    color: props.labelLineConfig?.color ?? defaultLabelLineConfig.color,
    thickness:
      props.labelLineConfig?.thickness ?? defaultLabelLineConfig.thickness,
    labelComponentWidth:
      props.labelLineConfig?.labelComponentWidth ??
      defaultLabelLineConfig.labelComponentWidth,
    labelComponentHeight:
      props.labelLineConfig?.labelComponentHeight ??
      defaultLabelLineConfig.labelComponentHeight,
    labelComponentMargin:
      props.labelLineConfig?.labelComponentMargin ??
      defaultLabelLineConfig.labelComponentMargin,
    avoidOverlappingOfLabels:
      props.labelLineConfig?.avoidOverlappingOfLabels ??
      defaultLabelLineConfig.avoidOverlappingOfLabels
  }

  let tiltAngle = props.tiltAngle ?? '55deg'
  if (
    tiltAngle &&
    !isNaN(Number(tiltAngle)) &&
    !(tiltAngle + '').endsWith('deg')
  ) {
    tiltAngle += 'deg'
  }

  // const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
  const labelsPosition = props.labelsPosition
    ? props.labelsPosition
    : donut || props.centerLabelComponent
    ? 'outward'
    : 'mid'

  const showTextBackground = props.showTextBackground ?? false
  const textBackgroundColor = props.textBackgroundColor ?? 'white'
  const showValuesAsLabels = props.showValuesAsLabels ?? false
  const showGradient = props.showGradient ?? false
  const gradientCenterColor = props.gradientCenterColor ?? 'white'
  const toggleFocusOnPress = props.toggleFocusOnPress ?? true

  let minShiftX = 0
  let maxShiftX = 0
  let minShiftY = 0
  let maxShiftY = 0
  let total = 0

  data.forEach((item: any) => {
    if (item.shiftX || item.shiftY) {
      if (minShiftX > item.shiftX) {
        minShiftX = item.shiftX
      }
      if (minShiftY > item.shiftY) {
        minShiftY = item.shiftY
      }
      if (maxShiftX < item.shiftX) {
        maxShiftX = item.shiftX
      }
      if (maxShiftY < item.shiftY) {
        maxShiftY = item.shiftY
      }
    }
  })

  const horizAdjustment = maxShiftX - minShiftX
  const vertAdjustment = maxShiftY - minShiftY

  if (semiCircle) {
    pi = Math.PI / 2
  }

  const cx = radius
  const cy = radius

  total =
    data && data.length > 0
      ? data.map((item) => item.value).reduce((v, a) => v + a, 0)
      : 0
  let acc = 0
  let pData = data.map((item) => {
    acc += item.value / total
    return acc
  })
  acc = 0
  const mData = data.map((item) => {
    const pAcc = acc
    acc += item.value / total
    return pAcc + (acc - pAcc) / 2
  })
  pData = [0, ...pData]

  const getExternaLabelProperties = (
    item: pieDataItem,
    mx: number,
    my: number,
    cx: number,
    cy: number,
    prevSide: string,
    prevLabelComponentX: number,
    isLast?: boolean,
    wasFirstItemOnPole?: boolean
  ) => {
    if (!showExternalLabels) return emptyExternaLabelProperties
    const labelLineLength =
      item.labelLineConfig?.length ?? labelLineConfig.length
    const labelTailLength =
      item.labelLineConfig?.tailLength ?? labelLineConfig.tailLength
    const labelLineColor = item.labelLineConfig?.color ?? labelLineConfig.color
    const labelLineThickness =
      item.labelLineConfig?.thickness ?? labelLineConfig.thickness
    const labelComponentWidth =
      item.labelLineConfig?.labelComponentWidth ??
      labelLineConfig.labelComponentWidth
    const labelComponentHeight =
      item.labelLineConfig?.labelComponentHeight ??
      labelLineConfig.labelComponentHeight
    const labelComponentMargin =
      item.labelLineConfig?.labelComponentMargin ??
      labelLineConfig.labelComponentMargin

    const isRightHalf = mx > cx

    const slope = (my - cy) / (mx - cx)
    const xFactor = labelTailLength / Math.sqrt(1 + slope * slope)
    const yFactor = (labelTailLength * slope) / Math.sqrt(1 + slope * slope)
    const outX = mx + (isRightHalf ? xFactor : -xFactor)
    let outY = my + (isRightHalf ? yFactor : -yFactor)
    const inX = mx + (isRightHalf ? -xFactor : xFactor)
    const inY = my + (isRightHalf ? -yFactor : yFactor)
    let labelComponentY = outY
    const side = isRightHalf ? 'right' : 'left'
    const isOnPole =
      labelLineConfig.avoidOverlappingOfLabels &&
      Math.abs(inX - outX) < 4 &&
      side === prevSide

    let finalX = isRightHalf ? cx * 2 + labelLineLength : -labelLineLength

    if (isOnPole) {
      finalX = outX
      labelComponentY += outY > cy ? 10 : -10
    } else {
      finalX = isRightHalf
        ? finalX > outX
          ? finalX
          : outX
        : finalX < outX
        ? finalX
        : outX
    }

    let labelComponentX = isRightHalf
      ? finalX + (isOnPole ? -10 : labelComponentMargin)
      : finalX - labelComponentWidth - (isOnPole ? -20 : labelComponentMargin)

    // In case both previous & current labels are at pole, then their labels might again overlap, to counter this, we vertically shift the current label
    if (
      labelLineConfig.avoidOverlappingOfLabels &&
      isOnPole &&
      (Math.abs(prevLabelComponentX - labelComponentX) < 30 ||
        (isLast && wasFirstItemOnPole))
    ) {
      labelComponentY += outY > cy ? 20 : -20
      outY += outY > cy ? 20 : -20
    }

    const localExternalLabelComponent =
      item.externalLabelComponent ?? props.externalLabelComponent

    return {
      labelLineColor,
      labelLineThickness,
      labelComponentHeight,
      inX,
      inY,
      outX,
      outY,
      finalX,
      labelComponentX,
      labelComponentY,
      localExternalLabelComponent,
      isRightHalf
    }
  }

  const coordinates: any[] = []

  data.forEach((item, index) => {
    let nextItem
    if (index === pData.length - 1) nextItem = pData[0]
    else nextItem = pData[index + 1]
    let sx =
      cx * (1 + Math.sin(2 * pi * pData[index] + initialAngle)) +
      (item.shiftX || 0)
    let sy =
      cy * (1 - Math.cos(2 * pi * pData[index] + initialAngle)) +
      (item.shiftY || 0)
    let ax =
      cx * (1 + Math.sin(2 * pi * nextItem + initialAngle)) + (item.shiftX || 0)
    let ay =
      cy * (1 - Math.cos(2 * pi * nextItem + initialAngle)) + (item.shiftY || 0)

    coordinates[index] = { sx, sy, ax, ay }
  })

  const timer = useRef(setTimeout(() => {})) // timer for tooltip

  const onPressed = (item: pieDataItem, index: number) => {
    if (item.onPress) {
      item.onPress()
    } else if (props.onPress) {
      props.onPress(item, index)
    }
    if (props.focusOnPress) {
      if (props.selectedIndex === index || props.isBiggerPie) {
        if (toggleFocusOnPress) {
          props.setSelectedIndex(-1)
        }
      } else {
        props.setSelectedIndex(index)
      }
    }
    if (showTooltip) {
      if (tooltipSelectedIndex === index) {
        setTooltipSelectedIndex(-1)
      } else {
        setTooltipSelectedIndex(index)
        if (!persistTooltip) {
          clearTimeout(timer.current)
          timer.current = setTimeout(() => {
            setTooltipSelectedIndex(-1)
          }, tooltipDuration)
        }
      }
    }
  }

  return {
    isThreeD,
    isBiggerPie,
    propData,
    data,
    itemHasInnerComponent,
    showInnerComponent,
    radius,
    canvasWidth,
    canvasHeight,
    shadowWidth,
    backgroundColor,
    shadowColor,
    semiCircle,
    pi,
    initialAngle,
    shadow,
    donut,
    strokeWidth,
    strokeColor,
    innerRadius,
    showTooltip,
    tooltipWidth,
    persistTooltip,
    tooltipDuration,
    tooltipComponent,
    tooltipVerticalShift,
    tooltipHorizontalShift,
    showValuesAsTooltipText,
    tooltipTextNoOfLines,
    tooltipBackgroundColor,
    tooltipBorderRadius,
    tooltipSelectedIndex,
    setTooltipSelectedIndex,
    // getTooltipText,
    showText,
    textColor,
    textSize,
    tiltAngle,
    labelsPosition,
    showTextBackground,
    textBackgroundColor,
    showValuesAsLabels,
    showGradient,
    gradientCenterColor,
    toggleFocusOnPress,
    minShiftX,
    maxShiftX,
    minShiftY,
    maxShiftY,
    total,
    horizAdjustment,
    vertAdjustment,
    cx,
    cy,
    pData,
    mData,
    acc,
    paddingHorizontal,
    paddingVertical,
    extraRadius,
    showExternalLabels,
    labelLineConfig,
    externalLabelComponent,
    getExternaLabelProperties,
    coordinates,
    onPressed,
    font,
    fontWeight,
    fontStyle,
    edgesPressable
  }
}
