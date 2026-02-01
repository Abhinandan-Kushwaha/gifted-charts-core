import { useEffect, useState } from 'react'
import {
  AxesAndRulesDefaults,
  BarDefaults,
  chartTypes
} from '../../utils/constants'
import {
  LineInBarChartPropsType,
  type BarAndLineChartsWrapperTypes,
  type horizSectionPropTypes
} from '../../utils/types'
import { type NativeScrollEvent } from 'react-native'
import { computeMaxAndMinItems } from '../../utils'

export const useBarAndLineChartsWrapper = (
  props: BarAndLineChartsWrapperTypes
) => {
  const {
    chartType,
    containerHeight,
    noOfSectionsBelowXAxis,
    sectionColors,
    stepHeight,
    negativeStepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX,
    shiftY,
    initialSpacing,
    data,
    dataSet,
    stackData,
    secondaryData,
    barWidth,
    xAxisThickness,
    totalWidth,
    spacing,
    lineConfig,
    lineConfig2,
    maxValue,
    lineData,
    lineData2,
    animatedWidth,
    lineBehindBars,
    points,
    points2,
    arrowPoints,

    width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,
    axesAndRulesProps,

    yAxisLabelTexts,
    yAxisOffset,
    rotateYAxisTexts,

    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,

    scrollEventThrottle,
    endReachedOffset,
    isRTL,
    selectedIndex,
    onlyPositive,
    highlightEnabled,
    lowlightOpacity,
    xAxisLabelsAtBottom,
    floatingYAxisLabels,
    allowFontScaling,
    xAxisLabelTexts
  } = props

  const {
    stepValue: secondaryStepValue,
    negativeStepValue: secondaryNegativeStepValue,
    noOfSectionsBelowXAxis: secondaryNoOfSectionsBelowXAxis,
    showFractionalValues: showSecondaryFractionalValues,
    roundToDigits: secondaryRoundToDigits,
    stepHeight: secondaryStepHeight,
    negativeStepHeight: secondaryNegativeStepHeight
  } = axesAndRulesProps.secondaryYAxisConfig ?? {}

  const primaryYAxisHeightBelowOrigin =
    noOfSectionsBelowXAxis * negativeStepHeight
  const secondaryYAxisHeightBelowOrigin =
    secondaryNoOfSectionsBelowXAxis * secondaryNegativeStepHeight
  const biggerNegativeYAxisHeight = Math.max(
    primaryYAxisHeightBelowOrigin,
    secondaryYAxisHeightBelowOrigin
  )

  const yAxisAtTop = rtl ? !props.yAxisAtTop : props.yAxisAtTop

  const hideOrigin =
    axesAndRulesProps.hideOrigin ?? AxesAndRulesDefaults.hideOrigin

  const yAxisSide =
    axesAndRulesProps.yAxisSide ?? AxesAndRulesDefaults.yAxisSide
  const yAxisLabelContainerStyle = axesAndRulesProps.yAxisLabelContainerStyle
  const yAxisColor =
    axesAndRulesProps.yAxisColor ?? AxesAndRulesDefaults.yAxisColor
  const yAxisExtraHeight =
    axesAndRulesProps.yAxisExtraHeight ?? containerHeight / 20
  const trimYAxisAtTop =
    axesAndRulesProps.trimYAxisAtTop ?? AxesAndRulesDefaults.trimYAxisAtTop
  const overflowTop = axesAndRulesProps.overflowTop
  const yAxisThickness =
    axesAndRulesProps.yAxisThickness ?? AxesAndRulesDefaults.yAxisThickness
  const xAxisColor =
    axesAndRulesProps.xAxisColor ?? AxesAndRulesDefaults.xAxisColor
  const xAxisLength = axesAndRulesProps.xAxisLength
  const xAxisType =
    axesAndRulesProps.xAxisType ?? AxesAndRulesDefaults.xAxisType
  const xAxisLabelsVerticalShift =
    axesAndRulesProps.xAxisLabelsVerticalShift ??
    (chartType === chartTypes.LINE && xAxisLabelsAtBottom
      ? biggerNegativeYAxisHeight
      : AxesAndRulesDefaults.xAxisLabelsVerticalShift)
  const xAxisLabelsHeight = axesAndRulesProps.xAxisLabelsHeight
  const xAxisTextNumberOfLines = axesAndRulesProps.xAxisTextNumberOfLines
  const dashWidth =
    axesAndRulesProps.dashWidth ?? AxesAndRulesDefaults.dashWidth
  const dashGap = axesAndRulesProps.dashGap ?? AxesAndRulesDefaults.dashGap
  const backgroundColor =
    axesAndRulesProps.backgroundColor ?? AxesAndRulesDefaults.backgroundColor
  const hideRules =
    axesAndRulesProps.hideRules ?? AxesAndRulesDefaults.hideRules
  const rulesLength = axesAndRulesProps.rulesLength
  const rulesType =
    axesAndRulesProps.rulesType ?? AxesAndRulesDefaults.rulesType
  const rulesThickness =
    axesAndRulesProps.rulesThickness ?? AxesAndRulesDefaults.rulesThickness
  const rulesColor =
    axesAndRulesProps.rulesColor ?? AxesAndRulesDefaults.rulesColor
  const rulesConfigArray =
    axesAndRulesProps.rulesConfigArray ?? AxesAndRulesDefaults.rulesConfigArray
  const showYAxisIndices = axesAndRulesProps.showYAxisIndices ?? false
  const yAxisIndicesHeight =
    axesAndRulesProps.yAxisIndicesHeight ??
    AxesAndRulesDefaults.yAxisIndicesHeight
  const yAxisIndicesWidth =
    axesAndRulesProps.yAxisIndicesWidth ??
    AxesAndRulesDefaults.yAxisIndicesWidth
  const yAxisIndicesColor =
    axesAndRulesProps.yAxisIndicesColor ??
    AxesAndRulesDefaults.yAxisIndicesColor
  const hideYAxisText =
    axesAndRulesProps.hideYAxisText ?? AxesAndRulesDefaults.hideYAxisText
  const yAxisTextNumberOfLines =
    axesAndRulesProps.yAxisTextNumberOfLines ??
    AxesAndRulesDefaults.yAxisTextNumberOfLines
  const yAxisLabelPrefix = axesAndRulesProps.yAxisLabelPrefix ?? ''
  const yAxisLabelSuffix = axesAndRulesProps.yAxisLabelSuffix ?? ''
  const yAxisTextStyle = axesAndRulesProps.yAxisTextStyle
  const secondaryYAxis = axesAndRulesProps.secondaryYAxis
  const stepValue = axesAndRulesProps.stepValue
  const negativeStepValue = axesAndRulesProps.negativeStepValue
  const roundToDigits = axesAndRulesProps.roundToDigits

  const referenceLinesConfig = axesAndRulesProps.referenceLinesConfig ?? {}
  const referenceLinesOverChartContent =
    referenceLinesConfig.referenceLinesOverChartContent ??
    AxesAndRulesDefaults.referenceLinesOverChartContent

  const showVerticalLines =
    axesAndRulesProps.showVerticalLines ??
    AxesAndRulesDefaults.showVerticalLines
  const verticalLinesThickness =
    axesAndRulesProps.verticalLinesThickness ??
    AxesAndRulesDefaults.verticalLinesThickness
  const verticalLinesHeight = axesAndRulesProps.verticalLinesHeight
  const verticalLinesColor =
    axesAndRulesProps.verticalLinesColor ??
    AxesAndRulesDefaults.verticalLinesColor
  const verticalLinesStrokeDashArray =
    axesAndRulesProps.verticalLinesStrokeDashArray ??
    AxesAndRulesDefaults.verticalLinesStrokeDashArray
  const verticalLinesShift =
    axesAndRulesProps.verticalLinesShift ??
    AxesAndRulesDefaults.verticalLinesShift
  const verticalLinesZIndex =
    axesAndRulesProps.verticalLinesZIndex ??
    AxesAndRulesDefaults.verticalLinesZIndex
  const verticalLinesSpacing =
    axesAndRulesProps.verticalLinesSpacing ??
    AxesAndRulesDefaults.verticalLinesSpacing
  const verticalLinesUptoDataPoint =
    axesAndRulesProps.verticalLinesUptoDataPoint ??
    AxesAndRulesDefaults.verticalLinesUptoDataPoint
  const verticalLinesStrokeLinecap =
    axesAndRulesProps.verticalLinesStrokeLinecap ??
    AxesAndRulesDefaults.verticalLinesStrokeLinecap
  const noOfVerticalLines = axesAndRulesProps.noOfVerticalLines
  const secondaryXAxis = axesAndRulesProps.secondaryXAxis

  const verticalLinesAr = noOfVerticalLines
    ? [...Array(noOfVerticalLines).keys()]
    : (chartType === chartTypes.BUBBLE
        ? xAxisLabelTexts ?? []
        : stackData ?? data
      ).map((item) => {
        const {
          showVerticalLine,
          verticalLineThickness,
          verticalLineHeight,
          verticalLineColor,
          verticalLineStrokeDashArray,
          verticalLineShift,
          verticalLineZIndex,
          verticalLineSpacing,
          verticalLineStrokeLinecap
        } = item
        return {
          showVerticalLine,
          verticalLineThickness,
          verticalLineHeight,
          verticalLineColor,
          verticalLineStrokeDashArray,
          verticalLineShift,
          verticalLineZIndex,
          verticalLineSpacing,
          verticalLineStrokeLinecap
        }
      })

  const extendedContainerHeight = containerHeight + overflowTop + 10

  const dataSetArray = [...(dataSet ?? [])]
  const setWithMinValueInDataset = dataSetArray
    .filter((set) => set.isSecondary)
    .sort?.((a, b) => {
      const minA = Math.min(...a.data.map((item) => item.value))
      const minB = Math.min(...b.data.map((item) => item.value))
      return minA - minB
    })[0]
  const secondaryDataArrayWithMinValue = secondaryData?.length
    ? secondaryData
    : setWithMinValueInDataset?.data
  const { maxItem: secondaryMaxItem, minItem: secondaryMinItem } =
    computeMaxAndMinItems(
      secondaryDataArrayWithMinValue,
      true,
      secondaryYAxis?.roundToDigits ?? roundToDigits,
      secondaryYAxis?.showFractionalValues ?? showFractionalValues
    )

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + biggerNegativeYAxisHeight

  const horizSectionProps: horizSectionPropTypes = {
    chartType,
    width,
    horizSections,
    noOfSectionsBelowXAxis,
    totalWidth,
    endSpacing,
    yAxisSide,
    horizontalRulesStyle,
    noOfSections,
    sectionColors,
    stepHeight,
    negativeStepHeight,
    yAxisLabelWidth,
    yAxisLabelContainerStyle,
    yAxisThickness,
    yAxisColor,
    yAxisExtraHeight,
    trimYAxisAtTop,
    xAxisThickness,
    xAxisColor,
    xAxisLength,
    xAxisType,
    dashWidth,
    dashGap,
    backgroundColor,
    hideRules,
    rulesLength,
    rulesType,
    rulesThickness,
    rulesColor,
    rulesConfigArray,
    spacing,
    showYAxisIndices,
    yAxisIndicesHeight,
    yAxisIndicesWidth,
    yAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    showFractionalValues,
    yAxisTextNumberOfLines,
    yAxisLabelPrefix,
    yAxisLabelSuffix,
    yAxisTextStyle,
    rotateYAxisTexts,
    rtl,

    containerHeight,
    overflowTop,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,

    horizontal,
    yAxisAtTop,

    stepValue,
    negativeStepValue,
    roundToDigits,

    secondaryYAxis,
    formatYLabel: axesAndRulesProps.formatYLabel,
    secondaryXAxis,
    secondaryMaxItem,
    secondaryMinItem,
    secondaryStepValue,
    secondaryNegativeStepValue,
    secondaryNoOfSectionsBelowXAxis,
    showSecondaryFractionalValues,
    secondaryRoundToDigits,
    secondaryStepHeight,
    secondaryNegativeStepHeight,
    customBackground: props.customBackground,
    onlyPositive,
    floatingYAxisLabels,
    allowFontScaling
  }

  const lineInBarChartProps: LineInBarChartPropsType = {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    containerHeightIncludingBelowXAxis,
    lineConfig,
    maxValue: lineConfig?.isSecondary
      ? secondaryYAxis?.maxValue ?? maxValue
      : maxValue,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data: lineData?.length ? lineData : stackData ?? data,
    totalWidth,
    barWidth,
    labelsExtraHeight,
    scrollEventThrottle,
    xAxisLabelsVerticalShift,
    selectedIndex,
    yAxisOffset: lineConfig?.isSecondary
      ? secondaryYAxis?.yAxisOffset ?? 0
      : yAxisOffset ?? 0,
    strokeDashArray: lineConfig?.strokeDashArray ?? [0, 0],
    highlightEnabled,
    lowlightOpacity
  }
  const lineInBarChartProps2: LineInBarChartPropsType = {
    ...lineInBarChartProps,
    lineConfig: lineConfig2,
    points: points2,
    data: lineData2 ?? [],
    yAxisOffset: lineConfig2?.isSecondary
      ? secondaryYAxis?.yAxisOffset ?? 0
      : yAxisOffset ?? 0
  }

  const verticalLinesProps = {
    showVerticalLines: props.showVerticalLines,
    verticalLinesAr,
    verticalLinesSpacing,
    spacing: lineConfig?.spacing ?? spacing,
    initialSpacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesStrokeDashArray,
    verticalLinesShift,
    verticalLinesUptoDataPoint,
    verticalLinesStrokeLinecap,
    xAxisThickness,
    labelsExtraHeight,
    containerHeight,
    data,
    stackData,
    barWidth,
    maxValue,
    chartType,
    containerHeightIncludingBelowXAxis,
    yAxisLabelWidth,
    totalWidth,
    xAxisLabelsVerticalShift
  }

  const actualContainerHeight =
    containerHeightIncludingBelowXAxis + labelsExtraHeight - 10
  const actualContainerWidth = (width ?? totalWidth) + yAxisLabelWidth

  /*******************************************************************************************************************************************/
  /** *************                                 horizontal chart related calculations                                   *******************/
  /*******************************************************************************************************************************************/

  const containerHeightIncludingXaxisLabels =
    actualContainerHeight + BarDefaults.labelsWidthForHorizontal

  const difBwWidthHeight =
    actualContainerWidth - containerHeightIncludingXaxisLabels

  const transformForHorizontal = [
    { rotate: rtl ? '-90deg' : '90deg' },
    {
      translateY:
        -shiftX + (rtl ? -difBwWidthHeight + 14 : difBwWidthHeight) / 2 - 20
    },
    {
      translateX:
        shiftY +
        (rtl
          ? (props.width ? -98 - endSpacing : -75 - endSpacing) -
            difBwWidthHeight
          : props.width
          ? difBwWidthHeight
          : difBwWidthHeight - 40) /
          2 +
        (yAxisAtTop ? (rtl ? (props.width ? 12 : 40) : 12) : 52)
    }
  ]

  const transformForHorizontalForReactJS = `rotate(${rtl ? '-90deg' : '90deg'})
  translateY(${
    -shiftX + (rtl ? -difBwWidthHeight + 14 : difBwWidthHeight) / 2 - 20
  })
  translateX(${
    shiftY +
    (rtl
      ? (props.width ? -98 - endSpacing : -75 - endSpacing) - difBwWidthHeight
      : props.width
      ? difBwWidthHeight
      : difBwWidthHeight - 40) /
      2 +
    (yAxisAtTop ? (rtl ? (props.width ? 12 : 40) : 12) : 52)
  })`

  const [canMomentum, setCanMomentum] = useState(false)

  const isCloseToEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }: NativeScrollEvent): boolean => {
    return isRTL
      ? contentOffset.x <= initialSpacing
      : layoutMeasurement.width + contentOffset.x >=
          contentSize.width - initialSpacing - endReachedOffset
  }

  // const isCloseToStart = ({ layoutMeasurement, contentOffset }) => {
  //   return layoutMeasurement.width + contentOffset.x <= initialSpacing;
  // };

  const isCloseToStart = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }: NativeScrollEvent): boolean => {
    return isRTL
      ? layoutMeasurement.width + contentOffset.x >=
          contentSize.width - initialSpacing - endReachedOffset
      : contentOffset.x <= initialSpacing
  }

  useEffect(() => {
    if (pointerConfig && getPointerProps) {
      getPointerProps({ pointerIndex, pointerX, pointerY })
    }
  }, [pointerIndex, pointerX, pointerY])

  return {
    containerHeightIncludingBelowXAxis,
    xAxisLabelsVerticalShift,
    trimYAxisAtTop,
    yAxisExtraHeight,
    overflowTop,
    xAxisLabelsHeight,
    xAxisTextNumberOfLines,
    actualContainerWidth,
    transformForHorizontal,
    transformForHorizontalForReactJS,
    horizSectionProps,
    referenceLinesOverChartContent,
    setCanMomentum,
    isCloseToStart,
    isCloseToEnd,
    canMomentum,
    yAxisAtTop,
    yAxisThickness,
    yAxisSide,
    showVerticalLines,
    verticalLinesProps,
    lineInBarChartProps,
    lineInBarChartProps2
  }
}
