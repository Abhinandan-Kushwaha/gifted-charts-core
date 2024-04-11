import { getStrokeDashArray } from '../utils'
import { AxesAndRulesDefaults, populationDefaults } from '../utils/constants'
import { Framework } from '../utils/types'
import { type extendedPopulationPyramidPropsType, type RulesPropsType } from './types'

export const usePopulationPyramid = (props: extendedPopulationPyramidPropsType) => {
  const {
    framework,
    height = populationDefaults.height,
    width = props.screenWidth,
    verticalMarginBetweenBars = populationDefaults.verticalMarginBetweenBars,
    barsMapToYAxisSections = populationDefaults.barsMapToYAxisSections,
    data,
    hideRules = AxesAndRulesDefaults.hideRules,
    hideYAxisText = AxesAndRulesDefaults.hideYAxisText,
    yAxisThickness = AxesAndRulesDefaults.yAxisThickness,

    xAxisThickness = AxesAndRulesDefaults.xAxisThickness,
    xAxisType = AxesAndRulesDefaults.xAxisType,
    xAxisNoOfSections = populationDefaults.xAxisNoOfSections,
    showXAxisIndices = populationDefaults.showXAxisIndices,
    xAxisIndicesWidth = populationDefaults.xAxisIndicesWidth,
    xAxisIndicesHeight = populationDefaults.xAxisIndicesHeight,
    xAxisIndicesShiftY = 0,
    showXAxisLabelTexts = populationDefaults.showXAxisLabelTexts,
    xAxisLabelFontSize = populationDefaults.defaultFontSize,
    xAxisLabelFontStyle = populationDefaults.defaultFontStyle,
    xAxisLabelFontWeight = populationDefaults.defaultFontWeight,
    xAxisLabelFontFamily = populationDefaults.defaultFontFamily,
    xAxisLabelShiftX = 0,
    xAxisLabelShiftY = 0,
    xAxisLabelPrefix = populationDefaults.prefix,
    xAxisLabelSuffix = populationDefaults.suffix,
    formatXAxisLabels,

    showVerticalLines = populationDefaults.showVerticalLines,
    verticalLinesThickness = populationDefaults.verticalLinesThickness,
    verticalLinesType = populationDefaults.verticalLinesType,
    verticalLinesStrokeDashArray = populationDefaults.verticalLinesStrokeDashArray,

    showYAxisIndices = AxesAndRulesDefaults.showYAxisIndices,
    yAxisIndicesWidth = AxesAndRulesDefaults.yAxisIndicesWidth,
    yAxisIndicesHeight = AxesAndRulesDefaults.yAxisIndicesHeight,
    yAxisLabelFontSize = populationDefaults.defaultFontSize,
    yAxisLabelFontStyle = populationDefaults.defaultFontStyle,
    yAxisLabelFontWeight = populationDefaults.defaultFontWeight,
    yAxisLabelFontFamily = populationDefaults.defaultFontFamily,
    yAxisLabelTextMarginRight = populationDefaults.yAxisLabelTextMarginRight,
    yAxisLabelTexts = [],
    showValuesAsBarLabels = populationDefaults.showValuesAsBarLabels,

    rulesThickness = AxesAndRulesDefaults.rulesThickness,
    rulesType = AxesAndRulesDefaults.rulesType,
    dashWidth = AxesAndRulesDefaults.dashWidth,
    dashGap = AxesAndRulesDefaults.dashGap,

    leftBarLabelWidth = populationDefaults.leftBarLabelWidth,
    leftBarLabelFontSize = props.barLabelFontSize ??
      populationDefaults.defaultFontSize,
    leftBarLabelFontStyle = props.barLabelFontStyle ??
      populationDefaults.defaultFontStyle,
    leftBarLabelFontWeight = props.barLabelFontWeight ??
      populationDefaults.defaultFontWeight,
    leftBarLabelFontFamily = props.barLabelFontFamily ??
      populationDefaults.defaultFontFamily,
    leftBarLabelPrefix = populationDefaults.prefix,
    leftBarLabelSuffix = populationDefaults.suffix,

    rightBarLabelWidth = populationDefaults.rightBarLabelWidth,
    rightBarLabelFontSize = props.barLabelFontSize ??
      populationDefaults.defaultFontSize,
    rightBarLabelFontStyle = props.barLabelFontStyle ??
      populationDefaults.defaultFontStyle,
    rightBarLabelFontWeight = props.barLabelFontWeight ??
      populationDefaults.defaultFontWeight,
    rightBarLabelFontFamily = props.barLabelFontFamily ??
      populationDefaults.defaultFontFamily,
    rightBarLabelPrefix = populationDefaults.prefix,
    rightBarLabelSuffix = populationDefaults.suffix,
    formatBarLabels,

    showMidAxis = populationDefaults.showMidAxis,
    midAxisLabelWidth = populationDefaults.midAxisLabelWidth,
    midAxisLabelFontSize = populationDefaults.defaultFontSize,
    midAxisLabelFontStyle = populationDefaults.defaultFontStyle,
    midAxisLabelFontWeight = populationDefaults.defaultFontWeight,
    midAxisLabelFontFamily = populationDefaults.defaultFontFamily,

    leftBarBorderWidth = props.barBorderWidth ??
      populationDefaults.leftBarBorderWidth,
    rightBarBorderWidth = props.barBorderWidth ??
      populationDefaults.rightBarBorderWidth,
    leftBarBorderRadius = props.barBorderRadius ??
      populationDefaults.leftBarBorderRadius,
    rightBarBorderRadius = props.barBorderRadius ??
      populationDefaults.rightBarBorderRadius,
    allCornersRounded = populationDefaults.allCornersRounded,

    showSurplus = populationDefaults.showSurplus,
    showSurplusLeft = populationDefaults.showSurplusLeft,
    showSurplusRight = populationDefaults.showSurplusRight,
    leftSurplusBorderWidth = populationDefaults.leftSurplusBorderWidth,
    rightSurplusBorderWidth = populationDefaults.rightSurplusBorderWidth
  } = props

  let {
    yAxisColor = AxesAndRulesDefaults.yAxisColor,
    xAxisColor = AxesAndRulesDefaults.xAxisColor,
    xAxisIndicesColor = populationDefaults.xAxisIndicesColor,
    xAxisLabelColor = populationDefaults.defaultFontColor,
    verticalLinesColor = populationDefaults.verticalLinesColor,
    yAxisIndicesColor = AxesAndRulesDefaults.yAxisIndicesColor,
    yAxisLabelColor = populationDefaults.defaultFontColor,
    rulesColor = AxesAndRulesDefaults.rulesColor,
    leftBarLabelColor = props.barLabelColor ??
      populationDefaults.defaultFontColor,
    rightBarLabelColor = props.barLabelColor ??
      populationDefaults.defaultFontColor,
    midAxisLabelColor = populationDefaults.defaultFontColor,
    leftBarColor = populationDefaults.leftBarColor,
    rightBarColor = populationDefaults.rightBarColor,
    leftBarBorderColor = populationDefaults.leftBarBorderColor,
    rightBarBorderColor = populationDefaults.rightBarBorderColor,
    leftSurplusColor = populationDefaults.leftSurplusColor,
    leftSurplusBorderColor = populationDefaults.leftSurplusBorderColor,
    rightSurplusColor = populationDefaults.rightSurplusColor,
    rightSurplusBorderColor = populationDefaults.rightSurplusBorderColor
  } = props

  if (framework === Framework.reactJS) {
    yAxisColor = yAxisColor.toString()
    xAxisColor = xAxisColor.toString()
    xAxisIndicesColor = xAxisIndicesColor.toString()
    xAxisLabelColor = xAxisLabelColor.toString()
    verticalLinesColor = verticalLinesColor.toString()
    yAxisIndicesColor = yAxisIndicesColor.toString()
    yAxisLabelColor = yAxisLabelColor.toString()
    rulesColor = rulesColor.toString()
    leftBarLabelColor = leftBarLabelColor.toString()
    rightBarLabelColor = rightBarLabelColor.toString()
    midAxisLabelColor = midAxisLabelColor.toString()
    leftBarColor = leftBarColor.toString()
    rightBarColor = rightBarColor.toString()
    leftBarBorderColor = leftBarBorderColor.toString()
    rightBarBorderColor = rightBarBorderColor.toString()
    leftSurplusColor = leftSurplusColor.toString()
    leftSurplusBorderColor = leftSurplusBorderColor.toString()
    rightSurplusColor = rightSurplusColor.toString()
    rightSurplusBorderColor = rightSurplusBorderColor.toString()
  }

  const yAxisLabelWidth = hideYAxisText
    ? yAxisThickness
    : props.yAxisLabelWidth ?? AxesAndRulesDefaults.yAxisLabelWidth

  const noOfSections = props.noOfSections ?? data.length
  const containerHeight = props.stepHeight
    ? props.stepHeight * noOfSections
    : height
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections

  const xAxisLabelsHeight = 30
  const containerHeightWithXaxisLabels = containerHeight + xAxisLabelsHeight

  const mid = (width + yAxisLabelWidth) / 2

  const leftMax = Math.max(...data.map((item) => item.left))
  const rightMax = Math.max(...data.map((item) => item.right))

  const max = Math.max(leftMax, rightMax)

  const xAxisRoundToDigits =
    props.xAxisRoundToDigits ?? (max < 0.1 ? 3 : max < 1 ? 2 : max < 10 ? 1 : 0)

  const midAxisAndLabelWidth =
    (showMidAxis ? midAxisLabelWidth : 0) / 2 +
    Math.max(leftBarLabelWidth, rightBarLabelWidth)
  const barWidthFactor =
    ((width - yAxisLabelWidth) / 2 - midAxisAndLabelWidth) / max

  const leftXAfterMid = mid - (showMidAxis ? midAxisLabelWidth / 2 : 0)
  const rightXAfterMid = mid + (showMidAxis ? midAxisLabelWidth / 2 : 0)

  const yAxisLineProps: RulesPropsType = {
    x1: yAxisLabelWidth,
    y1: 0,
    x2: yAxisLabelWidth,
    y2: containerHeight,
    stroke: yAxisColor,
    strokeWidth: yAxisThickness
  }

  yAxisLineProps.strokeDasharray = getStrokeDashArray(
    props.yAxisStrokeDashArray,
    framework
  )

  const midAxisLineCommonProps: RulesPropsType = {
    y1: 0,
    y2: containerHeight,
    strokeWidth: props.midAxisThickness ?? yAxisThickness
  }

  midAxisLineCommonProps.strokeDasharray = getStrokeDashArray(
    props.midAxisStrokeDashArray,
    framework
  )

  const xAxisLabelY =
    containerHeight + xAxisLabelFontSize + 6 + xAxisLabelShiftY
  const xAxisIndicesCommonProps = {
    y1: containerHeight - xAxisIndicesHeight / 2 + xAxisIndicesShiftY,
    y2: containerHeight + xAxisIndicesHeight / 2 + xAxisIndicesShiftY,
    stroke: xAxisIndicesColor,
    strokeWidth: xAxisIndicesWidth
  }
  const verticalLinesCommonProps: RulesPropsType = {
    y1: 0,
    y2: containerHeight,
    stroke: verticalLinesColor,
    strokeWidth: verticalLinesThickness
  }
  verticalLinesCommonProps.strokeDasharray = getStrokeDashArray(
    verticalLinesStrokeDashArray
  )

  const xAxisLabelsCommonProps = {
    y: xAxisLabelY + xAxisLabelShiftY,
    stroke: xAxisLabelColor,
    fontSize: xAxisLabelFontSize,
    fontStyle: xAxisLabelFontStyle,
    fontWeight: xAxisLabelFontWeight,
    fontFamily: xAxisLabelFontFamily
  }

  const getXLabel = (index: number): string =>
    ((leftXAfterMid * index) / xAxisNoOfSections / barWidthFactor)
      .toFixed(xAxisRoundToDigits)
      .toString()

  return {
    height,
    width,
    verticalMarginBetweenBars,
    barsMapToYAxisSections,
    data,
    hideRules,
    hideYAxisText,
    yAxisColor,
    yAxisThickness,
    xAxisColor,
    xAxisThickness,
    xAxisType,
    xAxisNoOfSections,
    showXAxisIndices,
    xAxisIndicesWidth,
    xAxisIndicesHeight,
    xAxisIndicesColor,
    xAxisIndicesShiftY,
    showXAxisLabelTexts,
    xAxisLabelFontSize,
    xAxisLabelFontStyle,
    xAxisLabelFontWeight,
    xAxisLabelFontFamily,
    xAxisLabelColor,
    xAxisLabelShiftX,
    xAxisLabelShiftY,
    xAxisLabelPrefix,
    xAxisLabelSuffix,
    formatXAxisLabels,
    showVerticalLines,
    verticalLinesColor,
    verticalLinesThickness,
    verticalLinesType,
    verticalLinesStrokeDashArray,
    showYAxisIndices,
    yAxisIndicesWidth,
    yAxisIndicesHeight,
    yAxisIndicesColor,
    yAxisLabelFontSize,
    yAxisLabelFontStyle,
    yAxisLabelFontWeight,
    yAxisLabelFontFamily,
    yAxisLabelColor,
    yAxisLabelTextMarginRight,
    yAxisLabelTexts,
    showValuesAsBarLabels,
    rulesThickness,
    rulesColor,
    rulesType,
    dashWidth,
    dashGap,
    leftBarLabelWidth,
    leftBarLabelFontSize,
    leftBarLabelColor,
    leftBarLabelFontStyle,
    leftBarLabelFontWeight,
    leftBarLabelFontFamily,
    leftBarLabelPrefix,
    leftBarLabelSuffix,
    rightBarLabelWidth,
    rightBarLabelFontSize,
    rightBarLabelColor,
    rightBarLabelFontStyle,
    rightBarLabelFontWeight,
    rightBarLabelFontFamily,
    rightBarLabelPrefix,
    rightBarLabelSuffix,
    formatBarLabels,
    showMidAxis,
    midAxisLabelWidth,
    midAxisLabelFontSize,
    midAxisLabelColor,
    midAxisLabelFontStyle,
    midAxisLabelFontWeight,
    midAxisLabelFontFamily,
    leftBarColor,
    rightBarColor,
    leftBarBorderColor,
    rightBarBorderColor,
    leftBarBorderWidth,
    rightBarBorderWidth,
    leftBarBorderRadius,
    rightBarBorderRadius,
    allCornersRounded,
    showSurplus,
    showSurplusLeft,
    showSurplusRight,
    leftSurplusColor,
    leftSurplusBorderColor,
    rightSurplusColor,
    rightSurplusBorderColor,
    leftSurplusBorderWidth,
    rightSurplusBorderWidth,
    yAxisLabelWidth,
    noOfSections,
    containerHeight,
    stepHeight,
    xAxisLabelsHeight,
    containerHeightWithXaxisLabels,
    mid,
    leftMax,
    rightMax,
    max,
    xAxisRoundToDigits,
    midAxisAndLabelWidth,
    barWidthFactor,
    leftXAfterMid,
    rightXAfterMid,
    yAxisLineProps,
    midAxisLineCommonProps,
    xAxisLabelY,
    xAxisIndicesCommonProps,
    verticalLinesCommonProps,
    xAxisLabelsCommonProps,
    getXLabel
  }
}
