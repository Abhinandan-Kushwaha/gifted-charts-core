import { useEffect, useMemo, useState } from 'react'
import {
  AxesAndRulesDefaults,
  LineDefaults,
  chartTypes
} from '../utils/constants'
import {
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding
} from '../utils'
import { type LineChartBicolorPropsType, type bicolorLineDataItem } from './types'
import { type BarAndLineChartsWrapperTypes } from '../utils/types'
import { type Animated } from 'react-native'

let initialData: bicolorLineDataItem[] | null = null

interface Points {
  points: string
  color: string
}

export const useLineChartBiColor = (props: LineChartBicolorPropsType) => {
  const [toggle, setToggle] = useState(false)
  const [pointsArray, setPointsArray] = useState<Points[]>([])
  const [fillPointsArray, setFillPointsArray] = useState<Points[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const containerHeight = props.height ?? AxesAndRulesDefaults.containerHeight
  const noOfSections = props.noOfSections ?? AxesAndRulesDefaults.noOfSections
  const data = useMemo(() => {
    if (!props.data) {
      return []
    }
    if (props.yAxisOffset) {
      return props.data.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0)
        return item
      })
    }
    return props.data
  }, [props.yAxisOffset, props.data])

  const scrollToEnd = props.scrollToEnd ?? LineDefaults.scrollToEnd
  const scrollAnimation = props.scrollAnimation ?? LineDefaults.scrollAnimation
  const scrollEventThrottle =
    props.scrollEventThrottle ?? LineDefaults.scrollEventThrottle

  const labelsExtraHeight = props.labelsExtraHeight ?? 0

  const animationDuration =
    props.animationDuration ?? LineDefaults.animationDuration

  const startIndex1 = props.startIndex ?? 0

  let endIndex1
  if (props.endIndex === undefined || props.endIndex === null) {
    endIndex1 = data.length - 1
  } else {
    endIndex1 = props.endIndex
  }

  if (!initialData) {
    initialData = [...data]
  }

  const adjustToWidth = props.adjustToWidth ?? false

  const initialSpacing = props.initialSpacing ?? LineDefaults.initialSpacing
  const endSpacing =
    props.endSpacing ?? (adjustToWidth ? 0 : LineDefaults.endSpacing)
  const thickness = props.thickness ?? LineDefaults.thickness

  const spacing =
    props.spacing ??
    (adjustToWidth
      ? ((props.width ?? AxesAndRulesDefaults.width) - initialSpacing) /
        data.length
      : LineDefaults.spacing)

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness
  const dataPointsHeight1 =
    props.dataPointsHeight ?? LineDefaults.dataPointsHeight
  const dataPointsWidth1 =
    props.dataPointsWidth ?? LineDefaults.dataPointsWidth
  const dataPointsRadius1 =
    props.dataPointsRadius ?? LineDefaults.dataPointsRadius
  const dataPointsColor1 =
    props.dataPointsColor ?? LineDefaults.dataPointsColor
  const dataPointsShape1 =
    props.dataPointsShape ?? LineDefaults.dataPointsShape

  const areaChart = props.areaChart ?? false
  const textFontSize1 = props.textFontSize ?? LineDefaults.textFontSize
  const textColor1 = props.textColor ?? LineDefaults.textColor

  let totalWidth = initialSpacing
  let maxItem = 0
  let minItem = 0
  data.forEach((item: bicolorLineDataItem) => {
    if (item.value > maxItem) {
      maxItem = item.value
    }
    if (item.value < minItem) {
      minItem = item.value
    }
    totalWidth += spacing
  })

  if (props.showFractionalValues ?? props.roundToDigits) {
    maxItem *= 10 * (props.roundToDigits ?? 1)
    maxItem = maxItem + (10 - (maxItem % 10))
    maxItem /= 10 * (props.roundToDigits ?? 1)
    maxItem = parseFloat(maxItem.toFixed(props.roundToDigits ?? 1))

    if (minItem !== 0) {
      minItem *= 10 * (props.roundToDigits ?? 1)
      minItem = minItem - (10 + (minItem % 10))
      minItem /= 10 * (props.roundToDigits ?? 1)
      minItem = parseFloat(minItem.toFixed(props.roundToDigits ?? 1))
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10))
    if (minItem !== 0) {
      minItem = minItem - (10 + (minItem % 10))
    }
  }

  const maxValue = props.maxValue ?? maxItem
  const mostNegativeValue = props.mostNegativeValue ?? minItem

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    props.overflowTop
  )

  const yAtxAxis = extendedContainerHeight - xAxisThickness / 2
  const getX = (index: number): number => initialSpacing + spacing * index
  const getY = (index: number): number =>
    yAtxAxis - (data[index].value * containerHeight) / maxValue

  useEffect(() => {
    const ppArray: Points[] = []
    let pp = 'M' + initialSpacing + ' ' + getY(0)
    let prevValuev
    let nextValue
    for (let i = 0; i < data.length - 1; i++) {
      prevValuev = data[i].value
      nextValue = data[i + 1].value

      if (prevValuev < 0 && nextValue < 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' '
      } else if (prevValuev < 0 && nextValue > 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' '
        const prevX = getX(i)
        const prevY = getY(i)
        const nextX = getX(i + 1)
        const nextY = getY(i + 1)
        const slope = (nextY - prevY) / (nextX - prevX)
        const x = (yAtxAxis - prevY) / slope + prevX
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' '

        let pointsOb = {
          points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
          color: 'red'
        }
        ppArray.push(pointsOb)
        setPointsArray([...ppArray])
        pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' '
        pointsOb = {
          points: pp,
          color: 'green'
        }
        ppArray.push(pointsOb)
      } else if (prevValuev > 0 && nextValue < 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' '
        const prevX = getX(i)
        const prevY = getY(i)
        const nextX = getX(i + 1)
        const nextY = getY(i + 1)
        const slope = (nextY - prevY) / (nextX - prevX)

        const x = (yAtxAxis - prevY) / slope + prevX
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' '

        let pointsOb = {
          points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
          color: 'green'
        }
        ppArray.push(pointsOb)
        setPointsArray([...ppArray])
        pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' '
        pointsOb = {
          points: pp,
          color: 'red'
        }
        ppArray.push(pointsOb)
      } else {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' '
      }
    }
    let i = data.length - 1
    prevValuev = data[i - 1].value
    nextValue = data[i].value
    if (
      (prevValuev > 0 && nextValue > 0) ||
      (prevValuev < 0 && nextValue < 0)
    ) {
      pp += 'L' + getX(i) + ' ' + getY(i) + ' '
    }
    const pointsOb = {
      points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
      color: nextValue > 0 ? 'green' : 'red'
    }
    ppArray.push(pointsOb)
    setPointsArray([...ppArray])

    /** *************************          For Area Charts          *************************/

    let startIndex = -1
    let endIndex = -1
    let startX: string
    let startY: string
    let endY: string
    let color = 'green'
    const localArray: Points[] = []
    let broken = false

    pp = 'M' + initialSpacing + ' ' + yAtxAxis
    for (i = 0; i < data.length - 1; i++) {
      prevValuev = data[i].value
      nextValue = data[i + 1].value
      pp += 'L' + getX(i) + ' ' + getY(i) + ' '
      if (
        (prevValuev > 0 && nextValue < 0) ||
        (prevValuev < 0 && nextValue > 0)
      ) {
        const prevX = getX(i)
        const prevY = getY(i)
        const nextX = getX(i + 1)
        const nextY = getY(i + 1)
        const slope = (nextY - prevY) / (nextX - prevX)

        const x = (yAtxAxis - prevY) / slope + prevX
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' '
        broken = true
        break
      }
    }
    if (!broken) {
      i = data.length - 1
      pp +=
        'L' +
        getX(i) +
        ' ' +
        getY(i) +
        ' L' +
        getX(i) +
        ' ' +
        (yAtxAxis - xAxisThickness / 2)
    }
    localArray.push({
      points: pp,
      color: data[0].value >= 0 ? 'green' : 'red'
    })

    const xs: string[] = []
    data.forEach((item, index) => {
      const x = getX(index)
      xs.push(x + '')
    })

    pointsArray.forEach((item, index) => {
      const splitArray = item.points
        .split(' ')
        .filter((spItem) => spItem && spItem !== ' ')

      if (
        splitArray[1] === yAtxAxis + '' &&
        !xs.includes(splitArray[0].replace('M', '').replace('L', ''))
      ) {
        startIndex = index
        startX = splitArray[0].replace('M', '').replace('L', '')
        if (splitArray.length > 3) {
          startY = splitArray[1].replace('M', '').replace('L', '')
          endY = splitArray[3].replace('M', '').replace('L', '')
          if (Number(startY) < Number(endY)) {
            color = 'red'
          } else {
            color = 'green'
          }
        }
      }
      if (
        splitArray[splitArray.length - 1] === yAtxAxis + '' &&
        !xs.includes(
          splitArray[splitArray.length - 2].replace('M', '').replace('L', '')
        )
      ) {
        endIndex = index
      }
      if (startX) {
        let filPts = ''
        for (let j = startIndex; j <= endIndex; j++) {
          if (pointsArray[j]) {
            filPts += pointsArray[j].points.replaceAll('M', 'L')
          }
        }
        filPts += 'L ' + startX + ' ' + yAtxAxis
        localArray.push({ points: filPts.replace('L', 'M'), color })
      }
    })
    if (broken) {
      pp = 'M' + getX(data.length - 1) + ' ' + yAtxAxis
      for (let i = data.length - 1; i > 0; i--) {
        prevValuev = data[i].value
        nextValue = data[i - 1].value
        pp += 'L' + getX(i) + ' ' + getY(i) + ' '
        if (
          (prevValuev > 0 && nextValue < 0) ||
          (prevValuev < 0 && nextValue > 0)
        ) {
          const prevX = getX(i)
          const prevY = getY(i)
          const nextX = getX(i - 1)
          const nextY = getY(i - 1)
          const slope = (nextY - prevY) / (nextX - prevX)

          const x = (yAtxAxis - prevY) / slope + prevX
          pp += 'L' + x + ' ' + yAtxAxis + ' '
          break
        }
      }

      localArray.push({
        points: pp,
        color: data[data.length - 1].value > 0 ? 'green' : 'red'
      })
    }

    setFillPointsArray([...localArray])
    setToggle(true)
  }, [
    areaChart,
    containerHeight,
    data,
    dataPointsWidth1,
    initialSpacing,
    spacing,
    xAxisThickness,
    toggle,
    maxValue
  ])

  const horizSections = [{ value: '0' }]
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections
  const stepValue = props.stepValue ?? maxValue / noOfSections
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ?? -mostNegativeValue / stepValue
  const thickness1 = props.thickness ?? LineDefaults.thickness
  const zIndex = props.zIndex ?? 0

  const strokeDashArray1 = props.strokeDashArray

  const rotateLabel = props.rotateLabel ?? AxesAndRulesDefaults.rotateLabel
  const isAnimated = props.isAnimated ?? LineDefaults.isAnimated
  const hideDataPoints1 = props.hideDataPoints ?? LineDefaults.hideDataPoints

  const color = props.color ?? 'green'
  const colorNegative = props.colorNegative ?? 'red'

  const startFillColor = props.startFillColor ?? 'lightgreen'
  const endFillColor = props.endFillColor ?? 'white'
  const startOpacity = props.startOpacity ?? LineDefaults.startOpacity
  const endOpacity = props.endOpacity ?? LineDefaults.endOpacity
  const startFillColorNegative = props.startFillColorNegative ?? 'pink'
  const endFillColorNegative = props.endFillColorNegative ?? 'white'
  const startOpacityNegative =
    props.startOpacityNegative ?? LineDefaults.startOpacity
  const endOpacityNegative =
    props.endOpacityNegative ?? LineDefaults.endOpacity

  const gradientDirection = props.gradientDirection ?? 'vertical'

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines
  const horizontalRulesStyle = props.horizontalRulesStyle
  const showFractionalValues =
    props.showFractionalValues ?? AxesAndRulesDefaults.showFractionalValues
  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const horizontal = false
  const yAxisAtTop = false

  const disableScroll = props.disableScroll ?? LineDefaults.disableScroll
  const showScrollIndicator =
    props.showScrollIndicator ?? LineDefaults.showScrollIndicator

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled
  const showDataPointOnFocus =
    props.showDataPointOnFocus ?? LineDefaults.showDataPointOnFocus
  const showStripOnFocus =
    props.showStripOnFocus ?? LineDefaults.showStripOnFocus
  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus
  const stripHeight = props.stripHeight
  const stripWidth = props.stripWidth ?? LineDefaults.stripWidth
  const stripColor = props.stripColor ?? color
  const stripOpacity = props.stripOpacity ?? (startOpacity + endOpacity) / 2
  const unFocusOnPressOut =
    props.unFocusOnPressOut ?? LineDefaults.unFocusOnPressOut
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus ?? LineDefaults.delayBeforeUnFocus

  horizSections.pop()
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i
    if (props.showFractionalValues ?? props.roundToDigits) {
      value = parseFloat(value.toFixed(props.roundToDigits ?? 1))
    }
    horizSections.push({
      value: props.yAxisLabelTexts
        ? props.yAxisLabelTexts[noOfSections - i] ?? value.toString()
        : value.toString()
    })
  }

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.LINE_BI_COLOR,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl: false,
    shiftX: 0,
    shiftY: 0,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    secondaryData: [],
    barWidth: 0, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex: props.scrollToIndex,
    scrollAnimation,
    scrollEventThrottle,
    indicatorColor: props.indicatorColor,
    setSelectedIndex,
    spacing,
    showLine: false,
    lineConfig: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineConfig2: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    maxValue,
    lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineData2: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineBehindBars: false,
    points: pointsArray,
    points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    remainingScrollViewProps: {},

    // horizSectionProps-
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    rotateYAxisTexts: 0,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    pointerConfig: undefined,
    getPointerProps: null,
    pointerIndex: 0,
    pointerX: 0,
    pointerY: 0,
    endReachedOffset: props.endReachedOffset ?? LineDefaults.endReachedOffset
  }

  return {
    toggle,
    setToggle,
    pointsArray,
    setPointsArray,
    fillPointsArray,
    setFillPointsArray,
    selectedIndex,
    setSelectedIndex,
    containerHeight,
    noOfSections,
    data,
    scrollToEnd,
    scrollAnimation,
    scrollEventThrottle,
    labelsExtraHeight,
    animationDuration,
    startIndex1,
    endIndex1,
    initialData,
    adjustToWidth,
    initialSpacing,
    endSpacing,
    thickness,
    spacing,
    xAxisThickness,
    dataPointsHeight1,
    dataPointsWidth1,
    dataPointsRadius1,
    dataPointsColor1,
    dataPointsShape1,
    areaChart,
    textFontSize1,
    textColor1,
    totalWidth,
    maxItem,
    minItem,
    maxValue,
    mostNegativeValue,
    extendedContainerHeight,
    getX,
    getY,
    yAtxAxis,
    stepHeight,
    stepValue,
    noOfSectionsBelowXAxis,
    thickness1,
    zIndex,
    strokeDashArray1,
    rotateLabel,
    isAnimated,
    hideDataPoints1,
    color,
    colorNegative,
    startFillColor,
    endFillColor,
    startOpacity,
    endOpacity,
    startFillColorNegative,
    endFillColorNegative,
    startOpacityNegative,
    endOpacityNegative,
    gradientDirection,
    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    xAxisTextNumberOfLines,
    horizontalRulesStyle,
    showFractionalValues,
    yAxisLabelWidth,
    horizontal,
    yAxisAtTop,
    disableScroll,
    showScrollIndicator,
    focusEnabled,
    showDataPointOnFocus,
    showStripOnFocus,
    showTextOnFocus,
    stripHeight,
    stripWidth,
    stripColor,
    stripOpacity,
    unFocusOnPressOut,
    delayBeforeUnFocus,
    horizSections,
    barAndLineChartsWrapperProps
  }
}
