import { useEffect, useState } from 'react'
import { AxesAndRulesDefaults, BarDefaults } from '../../utils/constants'
import {
  type BarAndLineChartsWrapperTypes,
  type horizSectionPropTypes
} from '../../utils/types'
import { type NativeScrollEvent } from 'react-native'

export const useBarAndLineChartsWrapper = (
  props: BarAndLineChartsWrapperTypes
) => {
  const {
    chartType,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX,
    shiftY,
    initialSpacing,
    data,
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
    isRTL
  } = props

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
  const overflowTop =
    axesAndRulesProps.overflowTop ?? AxesAndRulesDefaults.overflowTop
  const yAxisThickness =
    axesAndRulesProps.yAxisThickness ?? AxesAndRulesDefaults.yAxisThickness
  const xAxisColor =
    axesAndRulesProps.xAxisColor ?? AxesAndRulesDefaults.xAxisColor
  const xAxisLength = axesAndRulesProps.xAxisLength
  const xAxisType =
    axesAndRulesProps.xAxisType ?? AxesAndRulesDefaults.xAxisType
  const xAxisLabelsVerticalShift =
    axesAndRulesProps.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift
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
  const roundToDigits = axesAndRulesProps.roundToDigits

  const referenceLinesConfig = axesAndRulesProps.referenceLinesConfig
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
  const noOfVerticalLines = axesAndRulesProps.noOfVerticalLines

  const verticalLinesAr = noOfVerticalLines
    ? [...Array(noOfVerticalLines).keys()]
    : [...Array(stackData ? stackData.length : data.length).keys()]

  const horizSectionProps: horizSectionPropTypes = {
    width,
    horizSections,
    noOfSectionsBelowXAxis,
    totalWidth,
    endSpacing,
    yAxisSide,
    horizontalRulesStyle,
    noOfSections,
    stepHeight,
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
    roundToDigits,

    secondaryData,
    secondaryYAxis,
    formatYLabel: axesAndRulesProps.formatYLabel
  }

  const lineInBarChartProps = {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue: secondaryYAxis?.maxValue ?? maxValue,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data: lineData?.length ? lineData : stackData ?? data,
    totalWidth,
    barWidth,
    labelsExtraHeight,
    scrollEventThrottle,
    xAxisLabelsVerticalShift
  }
  const lineInBarChartProps2 = {
    ...lineInBarChartProps,
    lineConfig: lineConfig2,
    points: points2,
    data: lineData2
  }
  const extendedContainerHeight = containerHeight + overflowTop + 10
  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight
  const verticalLinesProps = {
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
