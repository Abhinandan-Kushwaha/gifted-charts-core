import { getTextSizeForPieLabels } from '../utils'
import { type PieChartMainProps, type pieDataItem } from './types'

export const getPieChartMainProps = (props: PieChartMainProps) => {
  const {
    isThreeD,
    isBiggerPie,
    paddingHorizontal,
    paddingVertical,
    extraRadiusForFocused
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
    extraRadiusForFocused
  }
}
