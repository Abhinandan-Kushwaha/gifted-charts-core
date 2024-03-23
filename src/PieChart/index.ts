import { useEffect, useState } from 'react'
import { type pieDataItem, type PieChartPropsType } from './types'
import { getTextSizeForPieLabels } from '../utils'
import { type ColorValue } from 'react-native'

interface IusePieChart {
  radius: number
  extraRadiusForFocused: number
  pi: number
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  startAngle: number
  endAngle: number
  setStartAngle: (angle: number) => void
  total: number
  setTotal: (total: number) => void
  data: pieDataItem[]
  donut?: boolean
  isThreeD?: boolean
  semiCircle?: boolean
  inwardExtraLengthForFocused: number
  canvasWidth: number
  canvasHeight: number
  strokeWidth: number
  innerRadius: number
  innerCircleColor: ColorValue
  innerCircleBorderWidth: number
  innerCircleBorderColor: ColorValue
  shiftInnerCenterX: number
  shiftInnerCenterY: number
  tiltAngle: string
  isDataShifted: boolean
  paddingHorizontal: number
  paddingVertical: number
}

interface IPieChartPropsType extends PieChartPropsType {
  pro?: boolean
}

export const usePieChart = (props: IPieChartPropsType): IusePieChart => {
  const radius = props.radius ?? 120
  const extraRadiusForFocused =
    props.extraRadiusForFocused ??
    (props.focusOnPress ?? props.sectionAutoFocus ? radius / 10 : 0)
  const pi = props.semiCircle ? Math.PI / 2 : Math.PI
  const [selectedIndex, setSelectedIndex] = useState(-1) // at the start, nothing is selected
  // because we're going to use a useEffect, we need startAngle and total to be state variables
  const [startAngle, setStartAngle] = useState(
    props.initialAngle ?? (props.semiCircle ? -pi : 0)
  )
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Update the total, this could be use to replace the forEach : const newTotal = props.data.reduce((acc, item) => acc + item.value, 0);
    let newTotal = 0
    props.data.forEach((item) => {
      newTotal += item.value
    })
    setTotal(newTotal)

    // Update selectedIndex based on focused item
    const newSelectedIndex = props.data.findIndex(
      (item) => item.focused === true
    )
    setSelectedIndex(newSelectedIndex)

    // Calculate the new start angle
    const newStartAngle = props.initialAngle ?? (props.semiCircle ? -pi : 0)
    if (newSelectedIndex !== -1) {
      // it was !== 0 here before, which would not work, it's either !==-1 or >=0
      // This could be used to replace the for loop that was used before
      const sumBeforeSelectedIndex = props.data
        .slice(0, newSelectedIndex)
        .reduce((acc, item) => acc + item.value, 0)
      setStartAngle(
        newStartAngle + (2 * pi * sumBeforeSelectedIndex) / (newTotal || 1)
      )
    } else {
      setStartAngle(newStartAngle)
    }
  }, [props.data, props.initialAngle, props.semiCircle])

  useEffect(() => {
    if (selectedIndex !== -1) {
      const newStartAngle = props.initialAngle ?? (props.semiCircle ? -pi : 0)
      let start = 0
      for (let i = 0; i < selectedIndex; i++) {
        start += props.data[i].value
      }
      if (total) {
        setStartAngle(newStartAngle + (2 * pi * start) / (total || 1))
      }
    }
  }, [selectedIndex])

  const {
    pro,
    data,
    donut,
    isThreeD,
    semiCircle,
    inwardExtraLengthForFocused = 0,
    isAnimated = false,
    edgesRadius
  } = props

  let endAngle = props.endAngle ?? startAngle + Math.PI * (semiCircle ? 1 : 2)

  const canvasWidth = radius * 2
  const canvasHeight = isThreeD ? radius * 2.3 : radius * 2

  const strokeWidth = props.strokeWidth ?? 0
  const innerRadius = props.innerRadius ?? radius / 2.5
  const innerCircleColor =
    props.innerCircleColor ?? props.backgroundColor ?? 'white'
  const innerCircleBorderWidth =
    props.innerCircleBorderWidth ??
    (props.innerCircleBorderColor ? strokeWidth || 2 : 0)
  const innerCircleBorderColor = props.innerCircleBorderColor ?? 'lightgray'
  const shiftInnerCenterX = props.shiftInnerCenterX ?? 0
  const shiftInnerCenterY = props.shiftInnerCenterY ?? 0

  const tiltAngle = props.tiltAngle ?? '55deg'

  let isDataShifted = false

  data.forEach((item: any) => {
    if (item.shiftX || item.shiftY) {
      isDataShifted = true
    }
  })
  const textSize = getTextSizeForPieLabels(props.textSize ?? 0, radius)

  const paddingHorizontal =
    props.paddingHorizontal ?? props.labelsPosition === 'onBorder'
      ? (props.textBackgroundRadius ?? textSize) * 2 + 6
      : 0
  const paddingVertical =
    props.paddingVertical ?? props.labelsPosition === 'onBorder'
      ? (props.textBackgroundRadius ?? textSize) * 2 + 6
      : 0

  return {
    radius,
    extraRadiusForFocused,
    pi,
    selectedIndex,
    setSelectedIndex,
    startAngle,
    endAngle,
    setStartAngle,
    total,
    setTotal,
    data,
    donut,
    isThreeD,
    semiCircle,
    inwardExtraLengthForFocused,
    canvasWidth,
    canvasHeight,
    strokeWidth,
    innerRadius,
    innerCircleColor,
    innerCircleBorderWidth,
    innerCircleBorderColor,
    shiftInnerCenterX,
    shiftInnerCenterY,
    tiltAngle,
    isDataShifted,
    paddingHorizontal,
    paddingVertical
  }
}
