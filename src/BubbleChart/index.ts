import { useState } from 'react'
import {
  computeMaxAndMinXForBubble,
  computeMaxAndMinYForBubble,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getMaxValue,
  getNoOfSections,
  indexOfFirstNonZeroDigit
  // weightedRegression
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
  const { data = [], formatXLabel } = props

  const yNoOfSections = getNoOfSections(
    props.yNoOfSections,
    props.maxY,
    props.yStepValue
  )
  const containerHeight =
    props.height ??
    ((props.yStepHeight ?? 0) * yNoOfSections ||
      AxesAndRulesDefaults.containerHeight)

  const yRange =
    Math.max(...data.map((i: any) => Math.max(i.y, 0))) - // find the largest +ve number
    Math.min(...data.map((i: any) => Math.max(i.y, 0))) // find the smallest +ve number

  const showFractionalYAxis =
    props.showFractionalYAxis ?? (isFinite(yRange) && yRange <= 1)
  const roundToDigits =
    props.yRoundToDigits ??
    (showFractionalYAxis ? indexOfFirstNonZeroDigit(yRange) + 1 : 0)

  const { maxItem: yMaxItem, minItem: yMinItem } = computeMaxAndMinYForBubble(
    data,
    false, // extrapolateMissingValues
    roundToDigits,
    showFractionalYAxis,
    data
  )

  const maxY =
    getMaxValue(props.maxY, props.yStepValue, yNoOfSections, yMaxItem) || 10

  const mostNegativeY = props.mostNegativeY ?? yMinItem

  const onlyPositive = props.onlyPositive ?? mostNegativeY >= 0

  const horizSections = [{ value: '0' }]
  const yStepHeight = props.yStepHeight ?? containerHeight / yNoOfSections
  const yStepValue = props.yStepValue ?? maxY / yNoOfSections

  const yNegativeStepValue = props.yNegativeStepValue ?? yStepValue

  const xRange =
    Math.max(...data.map((i: any) => Math.max(i.x, 0))) - // find the largest +ve number
    Math.min(...data.map((i: any) => Math.max(i.x, 0))) // find the smallest +ve number

  const showFractionalXAxis =
    props.showFractionalXAxis ?? (isFinite(xRange) && xRange <= 1)
  const xRoundToDigits =
    props.xRoundToDigits ??
    (showFractionalXAxis ? indexOfFirstNonZeroDigit(xRange) + 1 : 0)

  const { maxItem: xMaxItem, minItem: xMinItem } = computeMaxAndMinXForBubble(
    data,
    false, // extrapolateMissingValues
    xRoundToDigits,
    showFractionalXAxis,
    data
  )
  const xNoOfSections = getNoOfSections(
    props.xNoOfSections,
    props.maxX,
    props.xStepValue,
    true
  )

  const maxX =
    getMaxValue(props.maxX, props.xStepValue, xNoOfSections, xMaxItem) || 10
  const minX = xMinItem

  // const xStepHeight = props.xStepHeight ?? containerHeight / yNoOfSections
  const xStepValue = props.xStepValue ?? maxX / xNoOfSections

  const xAxisLabelTexts =
    props.xAxisLabelTexts ??
    Array.from({ length: xNoOfSections + 1 }, (_, i) => {
      if (i == 0) return ''
      const labelText = (xStepValue * i).toString()
      if (formatXLabel) {
        return formatXLabel(labelText)
      }
      return labelText
    })

  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ??
    Math.round(Math.ceil(-mostNegativeY / yNegativeStepValue))

  const labelsExtraHeight = props.labelsExtraHeight ?? 0

  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const horizontal = false
  const yAxisAtTop = false

  const initialSpacing = props.initialSpacing ?? BubbleDefaults.initialSpacing

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness

  const spacing = props.spacing ?? LineDefaults.spacing

  // let cumulativeSpacing: number[] = []

  // let spacingSum = 0
  // let space = props.spacing ?? spacing
  // data.forEach((item) => {
  //   spacingSum += item.spacing ?? space
  //   cumulativeSpacing.push(spacingSum)
  // })

  const endSpacing = props.endSpacing ?? LineDefaults.endSpacing

  const totalWidth =
    initialSpacing + spacing * (xAxisLabelTexts.length - 1) + endSpacing

  const disableScroll = props.disableScroll ?? false
  const showScrollIndicator = props.showScrollIndicator ?? false
  const scrollToEnd = props.scrollToEnd ?? false
  const scrollAnimation = props.scrollAnimation ?? false
  const scrollEventThrottle = props.scrollEventThrottle ?? 16

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled
  const showBubbleOnFocus =
    props.showBubbleOnFocus ?? BubbleDefaults.showBubbleOnFocus

  const [selectedIndex, setSelectedIndex] = useState(
    props.focusedBubbleIndex ?? -1
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

  const bubblesRadius = props.bubblesRadius ?? BubbleDefaults.bubblesRadius
  const bubblesWidth = props.bubblesWidth ?? BubbleDefaults.bubblesWidth
  const extraWidthDueToBubble = props.hideBubbles
    ? 0
    : bubblesRadius ?? bubblesWidth

  const xAxisLabelsAtBottom = props.xAxisLabelsAtBottom ?? false

  const allowFontScaling =
    props.allowFontScaling ?? AxesAndRulesDefaults.allowFontScaling

  const animationDuration =
    props.animationDuration ?? LineDefaults.animationDuration

  const secondaryMaxValue = maxY
  const secondaryMinItem = maxY * -1
  const showSecondaryFractionalValues = false
  const secondaryRoundToDigits = 1

  const axesAndRulesProps = getAxesAndRulesProps(
    props,
    containerHeight,
    yStepHeight,
    yStepValue,
    yNoOfSections,
    roundToDigits,
    yNegativeStepValue,
    secondaryMaxValue,
    secondaryMinItem,
    showSecondaryFractionalValues,
    secondaryRoundToDigits
  )
  const fourthQuadrantHeight = noOfSectionsBelowXAxis * yStepHeight

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    0
  )

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + fourthQuadrantHeight

  const mostNegativeValueOnYAxis = yNegativeStepValue * noOfSectionsBelowXAxis

  const containsNegativeValue =
    (props.mostNegativeY ?? 0) < 0 ||
    props.data?.some((item) => (item.y ?? 0) < 0)

  const xScale = spacing / xStepValue

  const getX = (index: number): number => {
    const val =
      props.data?.[index].x !== undefined
        ? (props.data?.[index].x ?? 0) * xScale
        : Math.min(
            totalWidth -
              (props.data?.[index].r ?? BubbleDefaults.bubblesRadius),
            ((index + 1) * totalWidth) / (props.data?.length ?? 1)
          )
    return val
  }

  const getY = (value: number): number => {
    if (
      containsNegativeValue &&
      value < 0 &&
      yStepValue !== yNegativeStepValue
    ) {
      return (
        extendedContainerHeight +
        (value * fourthQuadrantHeight) / mostNegativeValueOnYAxis
      )
    }
    return extendedContainerHeight - (value * containerHeight) / maxY
  }

  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus
  const showBubbleLabelOnFocus =
    props.showBubbleLabelOnFocus ?? BubbleDefaults.showBubbleLabelOnFocus

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

  const hideBubbles = props.hideBubbles ?? false
  const bubblesShape = props.bubblesShape ?? BubbleDefaults.bubblesShape

  const bubblesHeight = props.bubblesHeight ?? BubbleDefaults.bubblesHeight

  const bubblesColor = props.bubblesColor ?? BubbleDefaults.bubblesColor

  // const textFontSize = props.textFontSize ?? LineDefaults.textFontSize
  // const textColor = props.textColor ?? LineDefaults.textColor
  // const textFontFamily = props.textFontFamily
  // const textFontWeight = props.textFontWeight

  const startIndex = 0
  const endIndex = props.data?.length ?? 0

  const labelFontSize = props.labelFontSize ?? BubbleDefaults.labelFontSize
  const showValuesAsBubbleLabels =
    props.showValuesAsBubbleLabels ?? BubbleDefaults.showValuesAsBubbleLabels

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

  const showRegressionLine = props.showRegressionLine ?? false

  const weightedRegression = () => {
    if (!data) return { slope: 0, intercept: 0 }
    let sumW = 0
    let sumWX = 0
    let sumWY = 0
    let sumWXX = 0
    let sumWXY = 0
    let i = -1

    for (let { y, r = 1 } of data) {
      ++i
      const w = r * r
      if (w <= 0) continue // ignore zero/negative weights

      const x = getX(i)

      sumW += w
      sumWX += w * x
      sumWY += w * y
      sumWXX += w * x * x
      sumWXY += w * x * y
    }

    const denominator = sumW * sumWXX - sumWX * sumWX

    if (denominator === 0) {
      throw new Error('Regression not defined (degenerate data)')
    }

    const slope = (sumW * sumWXY - sumWX * sumWY) / denominator
    const intercept = (sumWY - slope * sumWX) / sumW

    return { slope, intercept }
  }

  let regressionLineX1 = 0,
    regressionLineY1 = 0,
    regressionLineX2 = 0,
    regressionLineY2 = 0
  if (showRegressionLine) {
    let slope = 0,
      intercept = 0
    const slopeIntercept = weightedRegression()
    slope = slopeIntercept.slope
    intercept = slopeIntercept.intercept

    // Calculate Y values in data space first
    const y1_data = slope * minX + intercept
    const y2_data = slope * maxX + intercept

    // Convert X coordinates to screen space
    regressionLineX1 = minX * xScale
    regressionLineX2 = maxX * xScale

    // Convert Y coordinates to screen space using getY function
    regressionLineY1 = getY(y1_data)
    regressionLineY2 = getY(y2_data)
  }

  const regressionLineConfig = {
    thickness:
      props.regressionLineConfig?.thickness ??
      BubbleDefaults.regressionLineConfig.thickness,
    color:
      props.regressionLineConfig?.color ??
      BubbleDefaults.regressionLineConfig.color,
    opacity:
      props.regressionLineConfig?.opacity ??
      BubbleDefaults.regressionLineConfig.opacity,
    strokeDashArray: props.regressionLineConfig?.strokeDashArray,
    isAnimated: props.regressionLineConfig?.isAnimated ?? isAnimated,
    animationDuration:
      props.regressionLineConfig?.animationDuration ?? animationDuration
  }

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.BUBBLE,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight: yStepHeight,
    negativeStepHeight: yStepHeight,
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
    maxValue: maxY,
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
    noOfSections: yNoOfSections,
    sectionColors: props.ySectionColors,
    showFractionalValues: showFractionalYAxis,

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
    extraWidthDueToDataPoint: extraWidthDueToBubble,
    customBackground: props.customBackground,
    onlyPositive,
    highlightEnabled: LineDefaults.highlightEnabled,
    lowlightOpacity: LineDefaults.lowlightOpacity,
    xAxisLabelsAtBottom,
    onScrollEndDrag: props.onScrollEndDrag,
    allowFontScaling,
    showVerticalLines: props.showVerticalLines,
    xAxisLabelTexts
  }
  return {
    totalWidth,
    animationDuration,
    containerHeightIncludingBelowXAxis,
    getY,
    barAndLineChartsWrapperProps,
    getX,
    maxValue: maxY,
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
    showBubbleOnFocus,
    showBubbleLabelOnFocus,
    bubblesShape,
    bubblesWidth,
    bubblesHeight,
    bubblesColor,
    bubblesRadius,
    labelFontSize,
    labelTextStyle: props.labelTextStyle,
    startIndex,
    endIndex,
    showValuesAsBubbleLabels,
    hideBubbles,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    xAxisThickness,
    xAxisTextNumberOfLines,
    rotateLabel,
    allowFontScaling,
    borderWidth,
    borderColor,
    opacity,
    xAxisLabelTexts,
    showRegressionLine,
    regressionLineConfig,
    regressionLineX1,
    regressionLineY1,
    regressionLineX2,
    regressionLineY2
  }
}
