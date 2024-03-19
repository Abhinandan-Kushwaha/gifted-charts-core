import { useEffect, useState } from 'react'
import { type pieDataItem, type PieChartPropsType } from './types'
import { getTextSizeForPieLabels } from '../utils'
import { type ColorValue } from 'react-native'
import { defaultAnimationDuration } from '../utils/constants'
import { LabelsPosition } from '../utils/types'

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
  isAnimated: boolean
  animationDuration: number
  initial: string
  dInitial: string[]
  dFinal: string[]
  isAnimating: boolean
  getStartCaps: (index: number, item: pieDataItem) => string
  getEndCaps: (index: number, item: pieDataItem) => string
  getTextCoordinates: (
    index: number,
    labelPos?: LabelsPosition
  ) => { x: number; y: number }
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
    edgesRadius,
    endAngle = props.endAngle ?? startAngle + Math.PI * 2
  } = props

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

  /**********************************       PRO                       **********************/

  const startAngleForPro = props.startAngle ?? 0
  const animationDuration = props.animationDuration ?? defaultAnimationDuration

  const [isAnimating, setIsAnimating] = useState(isAnimated)

  useEffect(() => {
    if (isAnimated) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), animationDuration)
    }
  }, [])

  let endAngleLocal = 0

  const addValues = (index: number) => {
    if (index < 0) return 0
    let sum = 0
    for (let i = 0; i <= index; i++) sum += data[i].value
    return sum
  }
  const labelsPosition = props.labelsPosition
    ? props.labelsPosition
    : donut || props.centerLabelComponent
    ? 'outward'
    : 'mid'

  const getCoordinates = (
    index: number,
    additionalValue?: number,
    addInOnlyStart?: boolean,
    addInOnlyEnd?: boolean
  ) => {
    const addedValue =
      addValues(index - 1) + (addInOnlyEnd ? 0 : additionalValue ?? 0)
    let angle = (addedValue / total) * endAngleLocal + startAngleForPro
    const startInnerX = radius + Math.cos(angle) * innerRadius
    const startInnerY = radius - Math.sin(angle) * innerRadius
    const startOuterX = radius + Math.cos(angle) * radius
    const startOuterY = radius - Math.sin(angle) * radius

    const value =
      addValues(index - 1) +
      data[index].value +
      (addInOnlyStart ? 0 : additionalValue ?? 0)
    angle = (value / total) * endAngleLocal + startAngleForPro

    const endOuterX = radius + Math.cos(angle) * radius
    const endOuterY = radius - Math.sin(angle) * radius

    const endInnerX = radius + Math.cos(angle) * innerRadius
    const endInnerY = radius - Math.sin(angle) * innerRadius

    return {
      startInnerX,
      startInnerY,
      startOuterX,
      startOuterY,
      endOuterX,
      endOuterY,
      endInnerX,
      endInnerY
    }
  }

  const getTextCoordinates = (index: number, labelPos?: LabelsPosition) => {
    const value = addValues(index - 1) + data[index].value / 2
    const angle = (value / total) * endAngleLocal + startAngleForPro

    const labelPosition: LabelsPosition = labelPos || labelsPosition

    let x =
      radius +
      Math.cos(angle) *
        radius *
        (labelPosition === 'inward'
          ? 0.25
          : labelPosition === 'mid'
          ? 0.5
          : labelPosition === 'outward'
          ? 0.75
          : 1)
    let y =
      radius -
      Math.sin(angle) *
        radius *
        (labelPosition === 'inward'
          ? 0.25
          : labelPosition === 'mid'
          ? 0.5
          : labelPosition === 'outward'
          ? 0.75
          : 1)

    return { x, y }
  }

  var initial = ''
  const getInitial = (item: pieDataItem) => {
    if (item.isStartEdgeCurved || item.startEdgeRadius) {
      const { startInnerX, startInnerY, startOuterX, startOuterY } =
        getCoordinates(0, (radius - innerRadius) / (radius / 20))

      return `M${startInnerX},${startInnerY} L${startOuterX},${startOuterY} `
    }
    return `M${radius + innerRadius},${radius} h${radius - innerRadius} `
  }
  const getPath = (index: number) => {
    const { endOuterX, endOuterY } = getCoordinates(index)

    const isLargeArc = data[index].value / total > 0.5 ? 1 : 0

    const arc = `A${
      radius + (props.strokeWidth ?? 0) / 2
    },${radius} 0 ${isLargeArc} 0 `
    const path = `${arc} ${endOuterX}, ${endOuterY}
      L${radius},${radius} `

    initial = `M${radius},${radius} L${endOuterX},${endOuterY}`

    return path
  }
  const getDonutPath = (index: number, item: pieDataItem) => {
    const additionalForStart =
      item.isStartEdgeCurved || item.startEdgeRadius
        ? (radius - innerRadius) / (radius / 20)
        : 0

    const additionalForEnd =
      item.isEndEdgeCurved || item.endEdgeRadius
        ? (radius - innerRadius) / (radius / -20)
        : 0

    const cropAtEnd = !!(
      index === data.length - 1 &&
      (item.isEndEdgeCurved || item.endEdgeRadius)
    )
    const {
      startInnerX,
      startInnerY,
      endOuterX,
      endOuterY,
      endInnerX,
      endInnerY
    } = getCoordinates(
      index,
      cropAtEnd ? additionalForEnd : additionalForStart,
      !cropAtEnd,
      cropAtEnd
    )

    const isLargeArc = data[index].value / total > 0.5 ? 1 : 0

    const innerArc = `A${innerRadius},${innerRadius} 0 ${isLargeArc} 1 `
    const outerArc = `A${
      radius + (props.strokeWidth ?? 0) / 2
    },${radius} 0 ${isLargeArc} 0 `
    const path = `${outerArc} ${endOuterX}, ${endOuterY}
      L${endInnerX},${endInnerY} M${endInnerX},${endInnerY} ${innerArc} ${startInnerX},${startInnerY}`

    initial = `M${endInnerX},${endInnerY} L${endOuterX},${endOuterY} `

    return path
  }
  const getStartCaps = (index: number, item: pieDataItem) => {
    const edgeRadius = item.startEdgeRadius ?? edgesRadius ?? 1
    const additional =
      (item.isStartEdgeCurved || item.startEdgeRadius
        ? (radius - innerRadius) / (radius / 20)
        : 0) +
      strokeWidth / 2
    const { startInnerX, startInnerY, startOuterX, startOuterY } =
      getCoordinates(index, additional)

    const path = `M${startInnerX},${startInnerY} A${edgeRadius},${edgeRadius} 0 0 0 ${startOuterX},${startOuterY}`
    return path
  }
  const getEndCaps = (index: number, item: pieDataItem) => {
    const edgeRadius = item.endEdgeRadius ?? edgesRadius ?? 1
    const additional =
      (item.isEndEdgeCurved || item.endEdgeRadius
        ? (radius - innerRadius) / (radius / 20)
        : 0) -
      strokeWidth / 2
    const { endInnerX, endInnerY, endOuterX, endOuterY } = getCoordinates(
      index,
      -additional
    )

    const path = `M${endInnerX},${endInnerY} A${edgeRadius},${edgeRadius} 0 0 1 ${endOuterX},${endOuterY}`
    return path
  }

  const dInitial = data.map(
    (item, index) =>
      `${initial || getInitial(item)} ${
        donut ? getDonutPath(index, item) : getPath(index)
      }`
  )

  endAngleLocal = endAngle
  initial = ''
  const dFinal = data.map(
    (item, index) =>
      `${initial || getInitial(item)} ${
        donut ? getDonutPath(index, item) : getPath(index)
      }`
  )

  return {
    radius,
    extraRadiusForFocused,
    pi,
    selectedIndex,
    setSelectedIndex,
    startAngle: pro ? startAngleForPro : startAngle,
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
    paddingVertical,
    isAnimated,
    animationDuration: animationDuration / 1000,

    // PRO

    initial,
    dInitial,
    dFinal,
    isAnimating,
    getStartCaps,
    getEndCaps,
    getTextCoordinates
  }
}
