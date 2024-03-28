import { defaultAnimationDuration } from '../utils/constants'
import { PieChartPropsType, pieDataItem } from './types'
import { LabelsPosition } from '../utils/types'

interface IsvgProps {
  height: number
  width: number
  viewBox: string
}

interface IusePiePro {
  radius: number
  total: number
  donut?: boolean
  strokeWidth: number
  maxStrokeWidth: number
  isAnimated?: boolean
  animationDuration: number
  initial: string
  dInitial: string[]
  dFinal: string[]
  getStartCaps: (index: number, item: pieDataItem) => string
  getEndCaps: (index: number, item: pieDataItem) => string
  getTextCoordinates: (
    index: number,
    labelPos?: LabelsPosition
  ) => { x: number; y: number }
  labelsPosition: LabelsPosition
  heightFactor: number
  height: number
  svgProps: IsvgProps
}

export const usePiePro = (props: PieChartPropsType): IusePiePro => {
  const {
    data,
    isAnimated,
    donut,
    semiCircle,
    radius = 120,
    innerRadius = donut ? radius / 2.5 : 0,
    strokeWidth = 0,
    edgesRadius = 0,
    startAngle = 0,
    ring
  } = props
  let endAngle = props.endAngle ?? startAngle + Math.PI * (semiCircle ? 1 : 2)
  const total = data.reduce((acc, item) => acc + item?.value, 0)
  const animationDuration = props.animationDuration ?? defaultAnimationDuration

  const maxStrokeWidth = Math.max(
    ...data.map((item) => item.strokeWidth ?? 0),
    strokeWidth
  )

  const heightFactor = semiCircle ? 1 : 2
  const height = radius + maxStrokeWidth

  const svgProps = {
    height: height * 2,
    width: height * 2,
    viewBox: `${-maxStrokeWidth * 1.5} ${
      -maxStrokeWidth - (semiCircle ? height / 2 : 0)
    } ${height * 2} ${height * 2}`
  }

  //   let endAngleLocal = 0

  const addValues = (index: number) => {
    if (index < 0) return 0
    let sum = 0
    for (let i = 0; i <= index; i++) sum += data[i]?.value
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
    addInOnlyEnd?: boolean,
    totalParam?: number
  ) => {
    const addedValue =
      addValues(index - 1) + (addInOnlyEnd ? 0 : additionalValue ?? 0)
    let angle = (addedValue / (totalParam ?? total)) * endAngle + startAngle
    const startInnerX = radius + Math.cos(angle) * innerRadius
    const startInnerY = radius - Math.sin(angle) * innerRadius
    const startOuterX = radius + Math.cos(angle) * radius
    const startOuterY = radius - Math.sin(angle) * radius

    const value =
      addValues(index - 1) +
      data[index]?.value +
      (addInOnlyStart ? 0 : additionalValue ?? 0)
    angle = (value / (totalParam ?? total)) * endAngle + startAngle

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
    const value = addValues(index - 1) + data[index]?.value / 2
    const angle = (value / total) * endAngle + startAngle

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
    return ring
      ? `M${radius * 2},${radius}`
      : `M${radius + innerRadius},${radius} h${radius - innerRadius} `
  }
  const getPath = (index: number, totalParam?: number) => {
    const { endOuterX, endOuterY } = getCoordinates(
      index,
      0,
      false,
      false,
      totalParam
    )

    const isLargeArc = semiCircle
      ? 0
      : data[index]?.value / (totalParam ?? total) > 0.5
      ? 1
      : 0

    const arc = `A${
      radius + (props.strokeWidth ?? 0) / 2
    },${radius} 0 ${isLargeArc} 0 `
    let path = `${arc} ${endOuterX}, ${endOuterY} `

    if (!ring) {
      path += `L${radius},${radius} `
    }

    initial = ring
      ? `M${endOuterX},${endOuterY} `
      : `M${radius},${radius} L${endOuterX},${endOuterY}`

    return path
  }
  const getDonutPath = (
    index: number,
    item: pieDataItem,
    totalParam?: number
  ) => {
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
      cropAtEnd,
      totalParam
    )
    const isLargeArc = semiCircle
      ? 0
      : data[index]?.value / (totalParam ?? total) > 0.5
      ? 1
      : 0

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
        donut
          ? getDonutPath(index, item, total * 101)
          : getPath(index, total * 101)
      }`
  )

  initial = ''
  const dFinal = data.map(
    (item, index) =>
      `${initial || getInitial(item)} ${
        donut ? getDonutPath(index, item) : getPath(index)
      }`
  )

  return {
    radius,
    total,
    donut,
    strokeWidth,
    maxStrokeWidth,
    isAnimated,
    animationDuration,
    initial,
    dInitial,
    dFinal,
    getStartCaps,
    getEndCaps,
    getTextCoordinates,
    labelsPosition,
    heightFactor,
    height,
    svgProps
  }
}
