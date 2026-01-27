import { useState } from 'react'
import {
  computeMaxAndMinItems,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getMaxValue,
  getNoOfSections,
  indexOfFirstNonZeroDigit
} from '../utils'
import {
  AxesAndRulesDefaults,
  BubbleDefaults,
  chartTypes,
  LineDefaults
} from '../utils/constants'
import { BarAndLineChartsWrapperTypes } from '../utils/types'
import { BubbleChartPropsType } from './types'

export interface extendedBubbleChartPropsType extends BubbleChartPropsType {
  parentWidth: number
}

export const useBubbleChart = (props: extendedBubbleChartPropsType) => {
  const { data = [] } = props

  const noOfSections = getNoOfSections(
    props.noOfSections,
    props.maxValue,
    props.stepValue
  )
  const containerHeight =
    props.height ??
    ((props.stepHeight ?? 0) * noOfSections ||
      AxesAndRulesDefaults.containerHeight)

  const valuesRange =
    Math.max(...data.map((i: any) => Math.max(i.value, 0))) - // find the largest +ve number
    Math.min(...data.map((i: any) => Math.max(i.value, 0))) // find the smallest +ve number

  const showFractionalValues =
    props.showFractionalValues ?? (isFinite(valuesRange) && valuesRange <= 1)
  const roundToDigits =
    props.roundToDigits ??
    (showFractionalValues ? indexOfFirstNonZeroDigit(valuesRange) + 1 : 0)

  const { maxItem, minItem } = computeMaxAndMinItems(
    data,
    false, // extrapolateMissingValues
    roundToDigits,
    showFractionalValues,
    data
  )

  const maxValue =
    getMaxValue(props.maxValue, props.stepValue, noOfSections, maxItem) || 10

  const mostNegativeValue = props.mostNegativeValue ?? minItem

  const onlyPositive = props.onlyPositive ?? mostNegativeValue >= 0

  const horizSections = [{ value: '0' }]
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections
  const stepValue = props.stepValue ?? maxValue / noOfSections
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ??
    Math.round(Math.ceil(-mostNegativeValue / stepValue))

  const labelsExtraHeight = props.labelsExtraHeight ?? 0

  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const horizontal = false
  const yAxisAtTop = false

  const initialSpacing = props.initialSpacing ?? LineDefaults.initialSpacing

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness

  const spacing = props.spacing ?? LineDefaults.spacing

  let cumulativeSpacing: number[] = []

  let spacingSum = 0
  let space = props.spacing ?? spacing
  data.forEach((item) => {
    spacingSum += item.spacing ?? space
    cumulativeSpacing.push(spacingSum)
  })

  const totalWidth =
    initialSpacing +
    spacing * (data.length - 1) +
    (props.endSpacing ?? LineDefaults.endSpacing)

  const endSpacing = props.endSpacing ?? LineDefaults.endSpacing

  const disableScroll = props.disableScroll ?? false
  const showScrollIndicator = props.showScrollIndicator ?? false
  const scrollToEnd = props.scrollToEnd ?? false
  const scrollAnimation = props.scrollAnimation ?? false
  const scrollEventThrottle = props.scrollEventThrottle ?? 16

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled
  const showDataPointOnFocus =
    props.showDataPointOnFocus ?? LineDefaults.showDataPointOnFocus

  const [selectedIndex, setSelectedIndex] = useState(
    props.focusedDataPointIndex ?? -1
  )

  const [points, setPoints] = useState('')
  const [pointerIndex, setPointerIndex] = useState(-1)
  const [pointerX, setPointerX] = useState(0)
  const [pointerY, setPointerY] = useState(0)

  const isAnimated = props.isAnimated ?? false

  const horizontalRulesStyle = props.horizontalRulesStyle

  const yAxisOffset = props.yAxisOffset ?? 0

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor

  //   const pointerConfig = props.pointerConfig
  const getPointerProps = props.getPointerProps ?? null

  const dataPointsRadius =
    props.dataPointsRadius ?? LineDefaults.dataPointsRadius
  const dataPointsWidth = props.dataPointsWidth ?? LineDefaults.dataPointsWidth
  const extraWidthDueToDataPoint = props.hideDataPoints
    ? 0
    : dataPointsRadius ?? dataPointsWidth

  const xAxisLabelsAtBottom = props.xAxisLabelsAtBottom ?? false

  const allowFontScaling =
    props.allowFontScaling ?? AxesAndRulesDefaults.allowFontScaling

  const animationDuration =
    props.animationDuration ?? LineDefaults.animationDuration

  const negativeStepValue = props.negativeStepValue ?? stepValue

  const secondaryMaxValue = maxValue
  const secondaryMinItem = maxValue * -1
  const showSecondaryFractionalValues = false
  const secondaryRoundToDigits = 1

  const axesAndRulesProps = getAxesAndRulesProps(
    props,
    containerHeight,
    stepHeight,
    stepValue,
    noOfSections,
    roundToDigits,
    negativeStepValue,
    secondaryMaxValue,
    secondaryMinItem,
    showSecondaryFractionalValues,
    secondaryRoundToDigits
  )
  const fourthQuadrantHeight = noOfSectionsBelowXAxis * stepHeight

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    0
  )

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + fourthQuadrantHeight

  const mostNegativeValueOnYAxis = negativeStepValue * noOfSectionsBelowXAxis

  const containsNegativeValue =
    (props.mostNegativeValue ?? 0) < 0 ||
    props.data?.some((item) => (item.y ?? 0) < 0)

  const getX = (spacingArray: number[], index: number): number =>
    props.data?.[index].x ??
    initialSpacing + (index ? spacingArray[index - 1] : 0)

  const getY = (value: number): number => {
    if (containsNegativeValue && value < 0 && stepValue !== negativeStepValue) {
      return (
        extendedContainerHeight +
        (value * fourthQuadrantHeight) / mostNegativeValueOnYAxis
      )
    }
    return extendedContainerHeight - (value * containerHeight) / maxValue
  }

  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus
  const showDataPointLabelOnFocus =
    props.showDataPointLabelOnFocus ?? LineDefaults.showDataPointLabelOnFocus

  const focusTogether = props.focusTogether ?? true

  const [selectedLineNumber, setSelectedLineNumber] = useState(-1)

  let lastLineNumber = 1

  // if (props.secondaryData) {
  //   lastLineNumber = 6667 // lastLineNumber is 6667 for a secondary line, so the index or key of the secondary line is 6666
  // }
  // if (props.data2) lastLineNumber = 2
  // if (props.data3) lastLineNumber = 3
  // if (props.data4) lastLineNumber = 4
  // if (props.data5) lastLineNumber = 5

  // if ((props.dataSet?.length ?? 0) > lastLineNumber)
  //   lastLineNumber = props.dataSet?.length ?? 0

  const unFocusOnPressOut =
    props.unFocusOnPressOut ?? LineDefaults.unFocusOnPressOut
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus ?? LineDefaults.delayBeforeUnFocus

  const handleFocus = (index: number) => {
    setSelectedIndex(index)
  }

  const handleUnFocus = () => {
    if (unFocusOnPressOut) {
      setTimeout(() => setSelectedIndex(-1), delayBeforeUnFocus)
    }
  }

  const hideDataPoints = props.hideDataPoints ?? false
  const dataPointsShape = props.dataPointsShape ?? LineDefaults.dataPointsShape

  const dataPointsHeight =
    props.dataPointsHeight ?? LineDefaults.dataPointsHeight

  const dataPointsColor = props.dataPointsColor ?? BubbleDefaults.dataPointsColor

  const textFontSize = props.textFontSize ?? LineDefaults.textFontSize
  const textColor = props.textColor ?? LineDefaults.textColor

  const startIndex = 0
  const endIndex = props.data?.length ?? 0

  const showValuesAsDataPointsText =
    props.showValuesAsDataPointsText ?? LineDefaults.showValuesAsDataPointsText

  const xAxisLabelsVerticalShift =
    props.xAxisLabelsVerticalShift ??
    (xAxisLabelsAtBottom
      ? fourthQuadrantHeight
      : AxesAndRulesDefaults.xAxisLabelsVerticalShift)

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines
  const rotateLabel = props.rotateLabel ?? false

  const borderWidth = props.borderWidth ?? BubbleDefaults.borderWidth
  const borderColor = props.borderColor ?? BubbleDefaults.borderColor
  const opacity = props.opacity ?? BubbleDefaults.opacity

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.BUBBLE,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    negativeStepHeight: stepHeight,
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
    secondaryData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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
    selectedIndex: [selectedIndex],
    setSelectedIndex,
    spacing,
    showLine: false,
    lineConfig: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineConfig2: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    maxValue,
    lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineData2: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineBehindBars: false,
    points,
    points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)

    // horizSectionProps-
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    sectionColors: props.sectionColors,
    showFractionalValues,

    axesAndRulesProps,

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset,
    rotateYAxisTexts: 0,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,

    onEndReached: props.onEndReached,
    onStartReached: props.onStartReached,
    endReachedOffset: props.endReachedOffset ?? LineDefaults.endReachedOffset,
    onMomentumScrollEnd: props.onMomentumScrollEnd,
    extraWidthDueToDataPoint,
    customBackground: props.customBackground,
    onlyPositive,
    highlightEnabled: LineDefaults.highlightEnabled,
    lowlightOpacity: LineDefaults.lowlightOpacity,
    xAxisLabelsAtBottom,
    onScrollEndDrag: props.onScrollEndDrag,
    allowFontScaling,
    showVerticalLines: props.showVerticalLines
  }
  return {
    totalWidth,
    animationDuration,
    containerHeightIncludingBelowXAxis,
    getY,
    barAndLineChartsWrapperProps,
    getX,
    maxValue,
    selectedIndex,
    setSelectedIndex,
    showTextOnFocus,
    focusEnabled,
    focusTogether,
    selectedLineNumber,
    lastLineNumber,
    initialSpacing,
    spacing,
    containerHeight,
    handleFocus,
    handleUnFocus,
    isAnimated,
    showDataPointOnFocus,
    showDataPointLabelOnFocus,
    dataPointsShape,
    dataPointsWidth,
    dataPointsHeight,
    dataPointsColor,
    dataPointsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
    showValuesAsDataPointsText,
    cumulativeSpacing,
    hideDataPoints,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    xAxisThickness,
    xAxisTextNumberOfLines,
    rotateLabel,
    allowFontScaling,
    borderWidth,
    borderColor,
    opacity
  }
}
