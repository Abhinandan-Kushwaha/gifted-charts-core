import { useState } from 'react'
import {
  computeMaxAndMinXForBubble,
  computeMaxAndMinYForBubble,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getIntegerizedValue,
  getMaxValue,
  getNoOfSections,
  indexOfFirstNonZeroDigit,
  withinMinMaxRange
} from '../utils'
import {
  AxesAndRulesDefaults,
  BubbleDefaults,
  chartTypes,
  defaultBubbleColors,
  LineDefaults
} from '../utils/constants'
import {
  BarAndLineChartsWrapperTypes,
  RegressionLineConfig,
  RegressionLineCoordinates
} from '../utils/types'
import { BubbleChartPropsType, bubbleDataItem } from './types'
import {
  computeAxisSections,
  getBubbleMode,
  getNormalizedXAxisLayout
} from '../utils/bubbleChartUtils'
import { Dimensions } from 'react-native'

export interface extendedBubbleChartPropsType extends BubbleChartPropsType {
  parentWidth: number
}
const screenWidth = Dimensions.get('window').width

export const useBubbleChart = (props: extendedBubbleChartPropsType) => {
  const { formatXLabel, dataSet } = props
  let { data = [] } = props

  if (dataSet) {
    const emptyDataSet: bubbleDataItem[] = []

    data = dataSet.reduce((acc, item) => [...acc, ...item.data], emptyDataSet)
  }

  // For the sake of uniformity across other charts, allow value as an alternate to y
  for (const item of data) {
    if (item.y === undefined && item.value !== undefined) item.y = item.value
  }

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

  const minRadius = props.minRadius ?? BubbleDefaults.minRadius
  const maxRadius =
    props.maxRadius ?? Math.min(containerHeight, props.width ?? Infinity) / 5

  // ── Auto axis computation ────────────────────────────────────────────────
  // Build a series array from whatever data the caller provided so that
  // computeAxisSections / getNormalizedXAxisLayout can work with it.
  // Explicit props always take precedence via the ?? fallbacks below.
  const seriesForAxisCalc = dataSet
    ? dataSet.map(s => ({
        data: s.data.map(item => ({
          x: item.x ?? 0,
          y: item.y ?? 0,
          r: item.r
        }))
      }))
    : [{ data: data.map(item => ({ x: item.x ?? 0, y: item.y ?? 0, r: item.r })) }]

  const isBubbleMode = getBubbleMode(
    seriesForAxisCalc,
    props.scatterChart ? 'scatter' : 'bubble'
  )

  const derivedAxes = computeAxisSections(seriesForAxisCalc, props.width)

  const derivedXLayout = getNormalizedXAxisLayout({
    normalizedAxes: derivedAxes,
    series: seriesForAxisCalc,
    bubbleMode: isBubbleMode,
    chartWidth: props.width ?? screenWidth,
    minBubbleRadius: minRadius,
    maxBubbleRadius: maxRadius
  })
  // ─────────────────────────────────────────────────────────────────────────

  let xRange =
    Math.max(...data.map((i: any) => Math.max(i.x ?? 0, 0))) - // find the largest +ve number
      Math.min(...data.map((i: any) => Math.max(i.x ?? 0, 0))) || // find the smallest +ve number
    data.length

  const xNoOfSections = getNoOfSections(
    props.xNoOfSections ?? derivedXLayout.xNoOfSections,
    props.maxX,
    props.xStepValue,
    true
  )

  const initialSpacing = props.initialSpacing ?? derivedXLayout.initialSpacing
  const spacing =
    props.spacing ??
    (props.width ? derivedXLayout.spacing : LineDefaults.spacing)

  const showFractionalXAxis =
    props.showFractionalXAxis ??
    (isFinite(xRange) && xRange - 1 <= xNoOfSections)
  const xRoundToDigits =
    props.xRoundToDigits ??
    (showFractionalXAxis ? indexOfFirstNonZeroDigit(xRange) + 1 : 0)

  const endSpacing = props.endSpacing ?? derivedXLayout.endSpacing

  const totalWidth = initialSpacing + spacing * xNoOfSections + endSpacing

  const { maxItem: yMaxItem, minItem: yMinItem } = computeMaxAndMinYForBubble(
    data,
    false, // extrapolateMissingValues
    roundToDigits,
    showFractionalYAxis,
    data
  )
  const bubblesRadius = props.bubblesRadius ?? BubbleDefaults.bubblesRadius

  let maxY = // should change only once and that's when autoRoundLabelsY is true
    getMaxValue(props.maxY, props.yStepValue, yNoOfSections, yMaxItem) || 10

  const mostNegativeY = props.mostNegativeY ?? yMinItem

  const onlyPositive = props.onlyPositive ?? mostNegativeY >= 0

  const horizSections = [{ value: '0' }]
  let yStepHeight = props.yStepHeight ?? containerHeight / yNoOfSections
  let yStepValue = props.yStepValue ?? maxY / yNoOfSections

  const yScale = yStepHeight / yStepValue

  /*******************************************************************************************
   * *************      RE - CALCULATE maxY, yStepValue & yStepHeight               *********
   ******************************************************************************************/

  let topMostReachingBubbleY = 0
  for (const item of data) {
    const radius = withinMinMaxRange(
      item.r ?? bubblesRadius,
      maxRadius,
      minRadius
    )
    const maxY = ((item.y ?? 0) + radius / yScale) * 1.01 // 1.01 is a factor to get a little higher value of maxY. This avoids cut-off from top
    topMostReachingBubbleY = Math.max(maxY, topMostReachingBubbleY)
  }

  maxY = topMostReachingBubbleY

  yStepHeight = props.yStepHeight ?? containerHeight / yNoOfSections
  yStepValue = props.yStepValue ?? maxY / yNoOfSections
  /*******************************************************************************************
   *******************************************************************************************/

  const autoRoundLabelsY =
    props.autoRoundLabelsY ??
    props.autoRoundLabels ??
    BubbleDefaults.autoRoundLabelsY
  if (autoRoundLabelsY) {
    yStepValue = getIntegerizedValue(yStepValue)
    maxY = yStepValue * yNoOfSections
  }

  const yNegativeStepValue = props.yNegativeStepValue ?? yStepValue

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness

  const { maxItem: xMaxItem, minItem: xMinItem } = computeMaxAndMinXForBubble(
    data,
    false, // extrapolateMissingValues
    xRoundToDigits,
    showFractionalXAxis,
    data
  )
  let maxX = // should change only once and that's when autoRoundLabelsX is true
    getMaxValue(props.maxX, props.xStepValue, xNoOfSections, xMaxItem) || 10
  const minX = xMinItem

  let leftMostReachingBubblesX = Infinity
  let rightMostReachingBubblesX = 0

  for (const [index, item] of data.entries()) {
    const radius = withinMinMaxRange(
      item.r ?? bubblesRadius,
      maxRadius,
      minRadius
    )
    const rescaledRadius = (item.x ?? index + 1) / (radius === 0 ? 1 : radius)
    const leftX = (item.x ?? index + 1) - rescaledRadius
    const rightX = (item.x ?? index + 1) + rescaledRadius
    leftMostReachingBubblesX = Math.min(leftX, leftMostReachingBubblesX)
    rightMostReachingBubblesX = Math.max(rightX, rightMostReachingBubblesX)
  }

  let xStepValue =
    props.xStepValue ??
    (rightMostReachingBubblesX - leftMostReachingBubblesX) / xNoOfSections

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

  const getPointerProps = props.getPointerProps ?? null

  const bubblesWidth = props.bubblesWidth ?? BubbleDefaults.bubblesWidth
  const extraWidthDueToBubble = props.hideBubbles
    ? 0
    : Math.min(10, bubblesRadius ?? bubblesWidth)

  const xAxisLabelsAtBottom = props.xAxisLabelsAtBottom ?? false

  const allowFontScaling =
    props.allowFontScaling ?? AxesAndRulesDefaults.allowFontScaling

  const animationDuration =
    props.animationDuration ?? LineDefaults.animationDuration

  const secondaryMaxValue = maxY
  const secondaryMinItem = maxY * -1
  const showSecondaryFractionalValues = false
  const secondaryRoundToDigits = 1

  // const autoRoundLabelsX =
  //   props.autoRoundLabelsX ??
  //   props.autoRoundLabels ??
  //   BubbleDefaults.autoRoundLabelsX

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
    (props.mostNegativeY ?? 0) < 0 || data?.some((item) => (item.y ?? 0) < 0)

  /*******************************************************************************************
   * *************               RE - CALCULATE xScale & xStepValue                  *********
   ******************************************************************************************/

  let xScale = spacing / xStepValue

  leftMostReachingBubblesX = Infinity
  rightMostReachingBubblesX = 0
  for (const [index, item] of data.entries()) {
    const radius = withinMinMaxRange(
      item.r ?? bubblesRadius,
      maxRadius,
      minRadius
    )
    const leftX = (item.x ?? index + 1) - radius / xScale
    const rightX = (item.x ?? index + 1) + radius / xScale
    leftMostReachingBubblesX = Math.min(leftX, leftMostReachingBubblesX)
    rightMostReachingBubblesX = Math.max(rightX, rightMostReachingBubblesX)
  }

  xStepValue =
    props.xStepValue ??
    (rightMostReachingBubblesX - leftMostReachingBubblesX) / xNoOfSections

  xScale = spacing / xStepValue
  /*******************************************************************************************
   *******************************************************************************************/

  /*******************************************************************************************
   * *************            3rd iteration for xScale & xStepValue             *********
   ******************************************************************************************/

  leftMostReachingBubblesX = Infinity
  rightMostReachingBubblesX = 0
  for (const [index, item] of data.entries()) {
    const radius = withinMinMaxRange(
      item.r ?? bubblesRadius,
      maxRadius,
      minRadius
    )
    const leftX = (item.x ?? index + 1) - radius / xScale
    const rightX = (item.x ?? index + 1) + radius / xScale
    leftMostReachingBubblesX = Math.min(leftX, leftMostReachingBubblesX)
    rightMostReachingBubblesX = Math.max(rightX, rightMostReachingBubblesX)
  }

  // this statement is to polish the leftMostReachingBubblesX to avoid being cut off by x axis
  leftMostReachingBubblesX -=
    Number(
      (rightMostReachingBubblesX - leftMostReachingBubblesX) / xNoOfSections //.toFixed(roundToDigits)
    ) / 5

  xStepValue =
    props.xStepValue ??
    Number(
      (rightMostReachingBubblesX - leftMostReachingBubblesX) / xNoOfSections //.toFixed(roundToDigits)
    )

  xStepValue += xStepValue / 20 // this statement is to polish thexStepValue to avoid the leftmost bubble being cut off by x axis

  // if (autoRoundLabelsX) {
  //   xStepValue = getIntegerizedValue(xStepValue)
  //   maxX = xStepValue * xNoOfSections
  // }

  xScale = spacing / xStepValue
  /*******************************************************************************************
   *******************************************************************************************/

  const initialX =
    props.xAxisOffset ??
    Math.max(props.minX ?? -Infinity, leftMostReachingBubblesX)
  const xAxisLabelTexts =
    props.xAxisLabelTexts ??
    Array.from({ length: xNoOfSections + 1 }, (_, i) => {
      const labelText = (initialX + xStepValue * i)
        .toFixed(xRoundToDigits)
        .toString()
      if (formatXLabel) {
        return formatXLabel(labelText)
      }
      return labelText
    })

  const getX = (index: number, spreadIndex?: number): number => {
    const item = data?.[spreadIndex ?? index]
    let val
    if (item?.x !== undefined) {
      val = ((item?.x ?? 0) - initialX) * xScale + initialSpacing
    } else {
      const radius = withinMinMaxRange(
        item?.r ?? bubblesRadius,
        maxRadius,
        minRadius
      )
      val =
        Math.min(
          totalWidth - (item?.r ?? BubbleDefaults.bubblesRadius),
          (index * totalWidth) /
            ((props.dataSet?.[0]?.data ?? props.data)?.length ?? 1)
        ) -
        initialX +
        radius
    }
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

  const scatterChart = props.scatterChart ?? BubbleDefaults.scatterChart

  const hideBubbles = props.hideBubbles ?? false
  const bubblesShape = props.bubblesShape ?? BubbleDefaults.bubblesShape

  const bubblesHeight = props.bubblesHeight ?? BubbleDefaults.bubblesHeight

  const bubblesColor = scatterChart
    ? props.bubblesColor ?? BubbleDefaults.bubblesColor
    : props.bubblesColor

  const startIndex = 0
  const endIndex = (props.dataSet?.[0]?.data ?? props.data)?.length ?? 0

  const labelFontSize = props.labelFontSize ?? BubbleDefaults.labelFontSize
  const labelMaxLength = Math.max(
    3,
    props.labelMaxLength ?? BubbleDefaults.labelMaxLength
  )
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
  const borderColor = scatterChart
    ? props.borderColor ?? BubbleDefaults.borderColor
    : props.borderColor
  const opacity = props.opacity ?? BubbleDefaults.opacity
  const borderOpacity = props.borderOpacity ?? BubbleDefaults.borderOpacity

  const showRegressionLine = props.showRegressionLine ?? false

  const weightedRegression = (data: bubbleDataItem[]) => {
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

  const getAdjustedScaledX = (x: number) =>
    (x - initialX) * xScale + initialSpacing

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
      props.regressionLineConfig?.animationDuration ?? animationDuration,
    x1: props.regressionLineConfig?.x1,
    x2: props.regressionLineConfig?.x2,
    y1: props.regressionLineConfig?.y1,
    y2: props.regressionLineConfig?.y2
  }

  const regressionLineCoordinates: RegressionLineCoordinates[] = []
  const regressionLineConfigs: RegressionLineConfig[] = []
  let regressionLineX1 = 0,
    regressionLineY1 = 0,
    regressionLineX2 = 0,
    regressionLineY2 = 0
  if (dataSet) {
    dataSet?.forEach((item) => {
      /************           Add default x values to each data item in case of DataSet           ************/
      item.data.forEach((dataItem, index) => {
        dataItem.indexUsedInDevForDataSet = index

        if (item.seriesBubblesColor) {
          dataItem.bubbleColor = item.seriesBubblesColor
        } else if (!bubblesColor && !dataItem.bubbleColor) {
          dataItem.bubbleColor =
            defaultBubbleColors[index % defaultBubbleColors.length]
        }

        if (item.seriesBubblesBorderColor) {
          dataItem.borderColor = item.seriesBubblesBorderColor
        } else if (!borderColor && !dataItem.borderColor) {
          dataItem.borderColor =
            defaultBubbleColors[index % defaultBubbleColors.length]
        }
      })
      /*******************************************************************************************************/

      if (item.showRegressionLine) {
        const currentRegressionLineConfig = item.regressionLineConfig
        const currentRegressionLineConfigModified = {
          thickness:
            currentRegressionLineConfig?.thickness ??
            regressionLineConfig.thickness,
          color:
            currentRegressionLineConfig?.color ?? regressionLineConfig.color,
          opacity:
            currentRegressionLineConfig?.opacity ??
            regressionLineConfig.opacity,
          strokeDashArray:
            currentRegressionLineConfig?.strokeDashArray ??
            regressionLineConfig.strokeDashArray,
          isAnimated:
            currentRegressionLineConfig?.isAnimated ??
            regressionLineConfig.isAnimated,
          animationDuration:
            currentRegressionLineConfig?.animationDuration ??
            regressionLineConfig.animationDuration,
          x1: currentRegressionLineConfig?.x1 ?? regressionLineConfig.x1,
          x2: currentRegressionLineConfig?.x2 ?? regressionLineConfig.x2,
          y1: currentRegressionLineConfig?.y1 ?? regressionLineConfig.y1,
          y2: currentRegressionLineConfig?.y2 ?? regressionLineConfig.y2
        }
        regressionLineConfigs.push(currentRegressionLineConfigModified)

        let regressionLineX1 = 0,
          regressionLineY1 = 0,
          regressionLineX2 = 0,
          regressionLineY2 = 0

        let slope = 0,
          intercept = 0
        const slopeIntercept = weightedRegression(item.data)
        slope = slopeIntercept.slope
        intercept = slopeIntercept.intercept

        // Calculate Y values in data space first
        const y1_data = slope * minX + intercept
        const y2_data = slope * maxX + intercept

        // Convert X coordinates to screen space
        regressionLineX1 = getAdjustedScaledX(
          currentRegressionLineConfigModified.x1 ?? 0
        )
        regressionLineX2 =
          currentRegressionLineConfigModified.x2 !== undefined
            ? getAdjustedScaledX(currentRegressionLineConfigModified.x2)
            : Math.min(screenWidth, props.width ?? totalWidth)

        // Convert Y coordinates to screen space using getY function
        regressionLineY1 =
          currentRegressionLineConfigModified.y1 !== undefined
            ? getY(currentRegressionLineConfigModified.y1)
            : getY(y1_data)
        regressionLineY2 =
          currentRegressionLineConfigModified.y2 !== undefined
            ? getY(currentRegressionLineConfigModified.y2)
            : getY(y2_data)
        regressionLineCoordinates.push({
          regressionLineX1,
          regressionLineX2,
          regressionLineY1,
          regressionLineY2
        })
      }
    })
  } else {
    if (showRegressionLine) {
      let slope = 0,
        intercept = 0
      const slopeIntercept = weightedRegression(data)
      slope = slopeIntercept.slope
      intercept = slopeIntercept.intercept

      // Calculate Y values in data space first
      const y1_data = slope * minX + intercept
      const y2_data = slope * maxX + intercept

      // Convert X coordinates to screen space
      regressionLineX1 = getAdjustedScaledX(regressionLineConfig.x1 ?? 0)
      regressionLineX2 =
        regressionLineConfig.x2 !== undefined
          ? getAdjustedScaledX(regressionLineConfig.x2)
          : Math.min(screenWidth, props.width ?? totalWidth)

      // Convert Y coordinates to screen space using getY function
      regressionLineY1 = regressionLineConfig.y1
        ? getY(regressionLineConfig.y1)
        : getY(y1_data)
      regressionLineY2 = regressionLineConfig.y2
        ? getY(regressionLineConfig.y2)
        : getY(y2_data)
    }
  }

  const showGradient =
    props.showGradient ?? (scatterChart ? false : BubbleDefaults.showGradient)
  const centerColorForGradient =
    props.centerColorForGradient ?? BubbleDefaults.centerColorForGradient

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
    data,
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
    minRadius,
    maxRadius,
    labelFontSize,
    labelMaxLength,
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
    borderOpacity,
    xAxisLabelTexts,
    showRegressionLine,
    regressionLineConfig,
    regressionLineConfigs,
    regressionLineX1,
    regressionLineY1,
    regressionLineX2,
    regressionLineY2,
    regressionLineCoordinates,
    scatterChart,
    extraWidthDueToBubble,
    showGradient,
    centerColorForGradient
  }
}
