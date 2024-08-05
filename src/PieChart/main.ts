import { emptyExternaLabelProperties, getTextSizeForPieLabels } from '../utils'
import { type PieChartMainProps, type pieDataItem } from './types'

export const getPieChartMainProps = (props: PieChartMainProps) => {
  const {
    isThreeD,
    isBiggerPie,
    paddingHorizontal,
    paddingVertical,
    extraRadius,
    showExternalLabels,
    externalLabelComponent
  } = props
  const propData = props.data
  const data: pieDataItem[] = []
  let itemHasInnerComponent = false
  if (propData) {
    for (let i = 0; i < propData.length; i++) {
      if (propData[i].pieInnerComponent) itemHasInnerComponent = true
      if (propData[i].value !== 0) {
        data.push(propData[i])
      } else {
        data.push({
          ...propData[i],
          value:
            props.data.map((item) => item.value).reduce((v, a) => v + a) /
            160000
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
    length: props.labelLineConfig?.length ?? 10,
    tailLength: props.labelLineConfig?.tailLength ?? 8,
    color: props.labelLineConfig?.color ?? 'black',
    thickness: props.labelLineConfig?.thickness ?? 1,
    labelComponentWidth: props.labelLineConfig?.labelComponentWidth ?? 20,
    labelComponentHeight: props.labelLineConfig?.labelComponentHeight ?? 10,
    labelComponentMargin: props.labelLineConfig?.labelComponentMargin ?? 4
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
      ? data.map((item) => item.value).reduce((v, a) => v + a)
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
    cy: number
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
    const outY = my + (isRightHalf ? yFactor : -yFactor)
    const inX = mx + (isRightHalf ? -xFactor : xFactor)
    const inY = my + (isRightHalf ? -yFactor : yFactor)

    let finalX = isRightHalf ? cx * 2 + labelLineLength : -labelLineLength

    finalX = isRightHalf
      ? finalX > outX
        ? finalX
        : outX
      : finalX < outX
      ? finalX
      : outX

    const labelComponentX = isRightHalf
      ? finalX + labelComponentMargin
      : finalX - labelComponentWidth - labelComponentMargin

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
      localExternalLabelComponent
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
    getExternaLabelProperties
  }
}
