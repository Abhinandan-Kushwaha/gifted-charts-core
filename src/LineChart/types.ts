import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle, type ColorValue } from 'react-native'
import { type yAxisSides } from '../utils/constants'
import {
  XAxisConfig,
  type CurveType,
  type DataSet,
  type EdgePosition,
  type HighlightedRange,
  type LineSegment,
  type Pointer,
  type RuleType,
  type RulesConfig,
  type arrowConfigType,
  type referenceConfigType,
  type secondaryLineConfigType,
  type secondaryYAxisType,
  type Linecap,
  type IntersectionAreaConfig,
  CustomBackground,
  SpreadData
} from '../utils/types'

export interface LineChartPropsType {
  height?: number
  overflowTop?: number
  overflowBottom?: number
  noOfSections?: number
  sectionColors?: ColorValue[]
  maxValue?: number
  mostNegativeValue?: number
  stepHeight?: number
  stepValue?: number
  negativeStepValue?: number
  spacing?: number
  initialSpacing?: number
  endSpacing?: number
  data?: lineDataItem[]
  data2?: lineDataItem[]
  data3?: lineDataItem[]
  data4?: lineDataItem[]
  data5?: lineDataItem[]
  spacing1?: number
  spacing2?: number
  spacing3?: number
  spacing4?: number
  spacing5?: number
  dataSet?: DataSet[]
  zIndex1?: number
  zIndex2?: number
  zIndex3?: number
  zIndex4?: number
  zIndex5?: number
  thickness?: number
  thickness1?: number
  thickness2?: number
  thickness3?: number
  thickness4?: number
  thickness5?: number
  strokeDashArray?: number[]
  strokeDashArray1?: number[]
  strokeDashArray2?: number[]
  strokeDashArray3?: number[]
  strokeDashArray4?: number[]
  strokeDashArray5?: number[]
  strokeLinecap?: Linecap
  strokeLinecap1?: Linecap
  strokeLinecap2?: Linecap
  strokeLinecap3?: Linecap
  strokeLinecap4?: Linecap
  strokeLinecap5?: Linecap
  rotateLabel?: boolean
  isAnimated?: boolean
  animateOnDataChange?: boolean
  animationDuration?: number
  onDataChangeAnimationDuration?: number
  animationEasing?: any
  animateTogether?: boolean
  renderDataPointsAfterAnimationEnds?: boolean
  xAxisLength?: number
  xAxisThickness?: number
  xAxisColor?: ColorValue
  xAxisType?: RuleType
  hideRules?: boolean
  rulesLength?: number
  rulesColor?: ColorValue
  rulesThickness?: number
  focusEnabled?: boolean
  onFocus?: Function
  showDataPointOnFocus?: boolean
  showStripOnFocus?: boolean
  stripOverDataPoints?: boolean
  showTextOnFocus?: boolean
  showDataPointLabelOnFocus?: boolean
  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number
  stripStrokeDashArray?: number[]
  onPress?: Function
  unFocusOnPressOut?: boolean
  delayBeforeUnFocus?: number
  focusedDataPointIndex?: number

  showValuesAsDataPointsText?: boolean

  rulesType?: RuleType
  dashWidth?: number
  dashGap?: number
  rulesConfigArray?: RulesConfig[]
  showReferenceLine1?: boolean
  referenceLine1Config?: referenceConfigType
  referenceLine1Position?: number
  showReferenceLine2?: boolean
  referenceLine2Config?: referenceConfigType
  referenceLine2Position?: number
  showReferenceLine3?: boolean
  referenceLine3Config?: referenceConfigType
  referenceLine3Position?: number
  referenceLinesOverChartContent?: boolean

  showVerticalLines?: boolean
  verticalLinesUptoDataPoint?: boolean
  verticalLinesThickness?: number
  verticalLinesHeight?: number
  verticalLinesColor?: ColorValue
  verticalLinesStrokeDashArray?: number[]
  verticalLinesShift?: number
  verticalLinesZIndex?: number
  noOfVerticalLines?: number
  verticalLinesSpacing?: number
  verticalLinesStrokeLinecap?: Linecap
  hideAxesAndRules?: boolean
  areaChart?: boolean
  areaChart1?: boolean
  areaChart2?: boolean
  areaChart3?: boolean
  areaChart4?: boolean
  areaChart5?: boolean
  stepChart?: boolean
  stepChart1?: boolean
  stepChart2?: boolean
  stepChart3?: boolean
  stepChart4?: boolean
  stepChart5?: boolean
  edgePosition?: EdgePosition

  disableScroll?: boolean
  pointerConfig?: Pointer
  showScrollIndicator?: boolean
  indicatorColor?: 'black' | 'default' | 'white'
  nestedScrollEnabled?: boolean

  // Indices

  showYAxisIndices?: boolean
  showXAxisIndices?: boolean
  yAxisIndicesHeight?: number
  xAxisIndicesHeight?: number
  yAxisIndicesWidth?: number
  xAxisIndicesWidth?: number
  xAxisIndicesColor?: ColorValue
  yAxisIndicesColor?: ColorValue
  yAxisSide?: yAxisSides
  yAxisOffset?: number

  startIndex?: number
  startIndex1?: number
  startIndex2?: number
  startIndex3?: number
  startIndex4?: number
  startIndex5?: number
  endIndex?: number
  endIndex1?: number
  endIndex2?: number
  endIndex3?: number
  endIndex4?: number
  endIndex5?: number

  color?: string
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  color5?: string
  yAxisThickness?: number
  yAxisColor?: ColorValue
  yAxisExtraHeight?: number
  trimYAxisAtTop?: boolean
  yAxisLabelContainerStyle?: StyleProp<ViewStyle>
  horizontalRulesStyle?: any
  yAxisTextStyle?: StyleProp<TextStyle>
  yAxisTextNumberOfLines?: number
  xAxisTextNumberOfLines?: number
  showFractionalValues?: boolean
  roundToDigits?: number
  yAxisLabelWidth?: number
  hideYAxisText?: boolean

  backgroundColor?: ColorValue
  customBackground?: CustomBackground
  curved?: boolean
  curvature?: number
  curveType?: CurveType
  horizSections?: sectionType[]
  focusTogether?: boolean
  focusProximity?: number

  // Data points

  hideDataPoints?: boolean
  dataPointsHeight?: number
  dataPointsWidth?: number
  dataPointsRadius?: number
  dataPointsColor?: string
  dataPointsShape?: string
  hideDataPoints1?: boolean
  dataPointsHeight1?: number
  dataPointsWidth1?: number
  dataPointsRadius1?: number
  dataPointsColor1?: string
  dataPointsShape1?: string
  hideDataPoints2?: boolean
  dataPointsHeight2?: number
  dataPointsWidth2?: number
  dataPointsRadius2?: number
  dataPointsColor2?: string
  dataPointsShape2?: string
  hideDataPoints3?: boolean
  dataPointsHeight3?: number
  dataPointsWidth3?: number
  dataPointsRadius3?: number
  dataPointsColor3?: string
  dataPointsShape3?: string
  hideDataPoints4?: boolean
  dataPointsHeight4?: number
  dataPointsWidth4?: number
  dataPointsRadius4?: number
  dataPointsColor4?: string
  dataPointsShape4?: string
  hideDataPoints5?: boolean
  dataPointsHeight5?: number
  dataPointsWidth5?: number
  dataPointsRadius5?: number
  dataPointsColor5?: string
  dataPointsShape5?: string
  customDataPoint?: Function

  focusedDataPointShape?: string
  focusedDataPointWidth?: number
  focusedDataPointHeight?: number
  focusedDataPointColor?: ColorValue | string | any
  focusedDataPointRadius?: number
  focusedCustomDataPoint?: Function
  dataPointLabelWidth?: number
  dataPointLabelShiftX?: number
  dataPointLabelShiftY?: number

  startFillColor?: string
  endFillColor?: string
  startOpacity?: number
  endOpacity?: number
  startFillColor1?: string
  endFillColor1?: string
  startOpacity1?: number
  endOpacity1?: number
  startFillColor2?: string
  endFillColor2?: string
  startOpacity2?: number
  endOpacity2?: number
  startFillColor3?: string
  endFillColor3?: string
  startOpacity3?: number
  endOpacity3?: number
  startFillColor4?: string
  endFillColor4?: string
  startOpacity4?: number
  endOpacity4?: number
  startFillColor5?: string
  endFillColor5?: string
  startOpacity5?: number
  endOpacity5?: number
  gradientDirection?: string

  areaGradientComponent?: () => any
  areaGradientId?: string

  textFontSize?: number
  textColor?: string
  textFontSize1?: number
  textColor1?: string
  textFontSize2?: number
  textColor2?: string
  textFontSize3?: number
  textColor3?: string
  textFontSize4?: number
  textColor4?: string
  textFontSize5?: number
  textColor5?: string
  hideOrigin?: boolean
  textShiftX?: number
  textShiftY?: number
  yAxisLabelTexts?: string[]
  xAxisLabelTexts?: string[]
  xAxisLabelTextStyle?: StyleProp<TextStyle>
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift?: number
  xAxisLabelsAtBottom?: boolean
  width?: number
  yAxisLabelPrefix?: string
  yAxisLabelSuffix?: string
  scrollRef?: any
  scrollToEnd?: boolean
  scrollToIndex?: number
  scrollAnimation?: boolean
  scrollEventThrottle?: number
  noOfSectionsBelowXAxis?: number
  labelsExtraHeight?: number
  adjustToWidth?: boolean
  getPointerProps?: Function
  showArrows?: boolean
  arrowConfig?: arrowConfigType
  showArrow1?: boolean
  arrowConfig1?: arrowConfigType
  showArrow2?: boolean
  arrowConfig2?: arrowConfigType
  showArrow3?: boolean
  arrowConfig3?: arrowConfigType
  showArrow4?: boolean
  arrowConfig4?: arrowConfigType
  showArrow5?: boolean
  arrowConfig5?: arrowConfigType

  secondaryData?: lineDataItem[]
  secondaryYAxis?: secondaryYAxisType
  secondaryLineConfig?: secondaryLineConfigType
  formatYLabel?: (label: string) => string
  lineGradient?: boolean
  lineGradientComponent?: () => any
  lineGradientId?: string
  lineGradientDirection?: string
  lineGradientStartColor?: string
  lineGradientEndColor?: string
  lineSegments?: LineSegment[]
  lineSegments2?: LineSegment[]
  lineSegments3?: LineSegment[]
  lineSegments4?: LineSegment[]
  lineSegments5?: LineSegment[]
  highlightedRange?: HighlightedRange

  onEndReached?: () => void
  onStartReached?: () => void
  endReachedOffset?: number
  onScroll?: Function
  onMomentumScrollEnd?: Function
  bounces?: boolean
  overScrollMode?: 'auto' | 'always' | 'never'
  onScrollEndDrag?: (event: any, direction: any) => void

  showDataPointsForMissingValues?: boolean
  interpolateMissingValues?: boolean
  extrapolateMissingValues?: boolean
  onlyPositive?: boolean
  parentWidth?: number

  onChartAreaPress?: (event: GestureResponderEvent) => void
  onBackgroundPress?: (event: GestureResponderEvent) => void

  secondaryXAxis?: XAxisConfig

  intersectionAreaConfig?: IntersectionAreaConfig
  renderTooltip?: Function
  renderTooltip1?: Function
  renderTooltip2?: Function
  renderTooltip3?: Function
  renderTooltip4?: Function
  renderTooltip5?: Function
  renderTooltipSecondary?: Function

  dataPointLabelComponent?: Function
  focusedDataPointLabelComponent?: Function
  spreadAreaData?: SpreadData[]
  spreadAreaColor?: ColorValue
  spreadAreaOpacity?: number
}

export interface lineDataItem {
  value?: number
  label?: string
  labelComponent?: Function
  labelTextStyle?: StyleProp<TextStyle>
  secondaryLabel?: string
  secondaryLabelComponent?: Function
  secondaryLabelTextStyle?: StyleProp<TextStyle>
  dataPointText?: string
  textShiftX?: number
  textShiftY?: number
  textColor?: string
  textFontSize?: number

  spacing?: number

  hideDataPoint?: boolean
  dataPointHeight?: number
  dataPointWidth?: number
  dataPointRadius?: number
  dataPointColor?: string
  dataPointShape?: string
  customDataPoint?: Function

  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number
  stripStrokeDashArray?: number[]

  focusedDataPointShape?: string
  focusedDataPointWidth?: number
  focusedDataPointHeight?: number
  focusedDataPointColor?: ColorValue | string | any
  focusedDataPointRadius?: number
  focusedCustomDataPoint?: Function

  dataPointLabelComponent?: Function
  focusedDataPointLabelComponent?: Function
  dataPointLabelWidth?: number
  dataPointLabelShiftX?: number
  dataPointLabelShiftY?: number
  showStrip?: boolean

  showVerticalLine?: boolean
  verticalLineHeight?: number
  verticalLineUptoDataPoint?: boolean
  verticalLineColor?: string
  verticalLineThickness?: number
  verticalLineStrokeDashArray?: number[]
  pointerShiftX?: number
  pointerShiftY?: number
  onPress?: Function
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  showXAxisIndex?: boolean
  hidePointer?: boolean
}

export interface lineDataItemNullSafe extends lineDataItem {
  value: number
}

interface sectionType {
  value: string
}

export interface bicolorLineDataItem {
  value: number
  label?: string
  labelComponent?: Function
  labelTextStyle?: StyleProp<TextStyle>
  dataPointText?: string
  textShiftX?: number
  textShiftY?: number
  textColor?: string
  textFontSize?: number

  hideDataPoint?: boolean
  dataPointHeight?: number
  dataPointWidth?: number
  dataPointRadius?: number
  dataPointColor?: string
  dataPointShape?: string
  customDataPoint?: Function

  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number

  focusedDataPointShape?: string
  focusedDataPointWidth?: number
  focusedDataPointHeight?: number
  focusedDataPointColor?: ColorValue | string | any
  focusedDataPointRadius?: number
  focusedCustomDataPoint?: Function

  dataPointLabelComponent?: Function
  focusedDataPointLabelComponent?: Function
  dataPointLabelWidth?: number
  dataPointLabelShiftX?: number
  dataPointLabelShiftY?: number
  showStrip?: boolean

  showVerticalLine?: boolean
  verticalLineUptoDataPoint?: boolean
  verticalLineColor?: string
  verticalLineThickness?: number
  pointerShiftX?: number
  pointerShiftY?: number
  onPress?: Function
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
}

export interface LineChartBicolorPropsType {
  height?: number
  overflowTop?: number
  noOfSections?: number
  maxValue?: number
  mostNegativeValue?: number
  stepHeight?: number
  stepValue?: number
  spacing?: number
  initialSpacing?: number
  endSpacing?: number
  data?: bicolorLineDataItem[]
  zIndex?: number
  thickness?: number
  strokeDashArray?: number[]
  rotateLabel?: boolean
  isAnimated?: boolean
  animationDuration?: number
  onDataChangeAnimationDuration?: number
  animationEasing?: any
  xAxisLength?: number
  xAxisThickness?: number
  xAxisColor?: ColorValue
  xAxisType?: RuleType
  hideRules?: boolean
  rulesLength?: number
  rulesColor?: ColorValue
  rulesThickness?: number
  focusEnabled?: boolean
  onFocus?: Function
  showDataPointOnFocus?: boolean
  showStripOnFocus?: boolean
  showTextOnFocus?: boolean
  showDataPointLabelOnFocus?: boolean
  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number
  onPress?: Function
  unFocusOnPressOut?: boolean
  delayBeforeUnFocus?: number

  rulesType?: RuleType
  dashWidth?: number
  dashGap?: number
  showReferenceLine1?: boolean
  referenceLine1Config?: referenceConfigType
  referenceLine1Position?: number
  showReferenceLine2?: boolean
  referenceLine2Config?: referenceConfigType
  referenceLine2Position?: number
  showReferenceLine3?: boolean
  referenceLine3Config?: referenceConfigType
  referenceLine3Position?: number

  showVerticalLines?: boolean
  verticalLinesUptoDataPoint?: boolean
  verticalLinesThickness?: number
  verticalLinesHeight?: number
  verticalLinesColor?: ColorValue
  verticalLinesStrokeDashArray?: number[]
  verticalLinesShift?: number
  verticalLinesZIndex?: number
  noOfVerticalLines?: number
  verticalLinesSpacing?: number
  hideAxesAndRules?: boolean
  areaChart?: boolean

  disableScroll?: boolean
  showScrollIndicator?: boolean
  indicatorColor?: 'black' | 'default' | 'white'
  nestedScrollEnabled?: boolean

  // Indices

  showYAxisIndices?: boolean
  showXAxisIndices?: boolean
  yAxisIndicesHeight?: number
  xAxisIndicesHeight?: number
  yAxisIndicesWidth?: number
  xAxisIndicesWidth?: number
  xAxisIndicesColor?: ColorValue
  yAxisIndicesColor?: ColorValue
  yAxisSide?: yAxisSides
  yAxisOffset?: number

  startIndex?: number
  endIndex?: number

  color?: string
  colorNegative?: string
  yAxisThickness?: number
  yAxisColor?: ColorValue
  yAxisLabelContainerStyle?: StyleProp<ViewStyle>
  horizontalRulesStyle?: any
  yAxisTextStyle?: StyleProp<TextStyle>
  yAxisTextNumberOfLines?: number
  xAxisTextNumberOfLines?: number
  showFractionalValues?: boolean
  roundToDigits?: number
  yAxisLabelWidth?: number
  hideYAxisText?: boolean

  backgroundColor?: ColorValue
  curved?: boolean
  horizSections?: sectionType[]

  // Data points

  hideDataPoints?: boolean
  dataPointsHeight?: number
  dataPointsWidth?: number
  dataPointsRadius?: number
  dataPointsColor?: string
  dataPointsShape?: string
  customDataPoint?: Function

  focusedDataPointShape?: string
  focusedDataPointWidth?: number
  focusedDataPointHeight?: number
  focusedDataPointColor?: ColorValue | string | any
  focusedDataPointRadius?: number
  focusedCustomDataPoint?: Function
  dataPointLabelWidth?: number
  dataPointLabelShiftX?: number
  dataPointLabelShiftY?: number

  startFillColor?: string
  endFillColor?: string
  startFillColorNegative?: string
  endFillColorNegative?: string
  startOpacity?: number
  endOpacity?: number
  startOpacityNegative?: number
  endOpacityNegative?: number
  gradientDirection?: string

  textFontSize?: number
  textColor?: string
  hideOrigin?: boolean
  textShiftX?: number
  textShiftY?: number
  yAxisLabelTexts?: string[]
  xAxisLabelTexts?: string[]
  xAxisLabelTextStyle?: StyleProp<TextStyle>
  width?: number
  yAxisLabelPrefix?: string
  yAxisLabelSuffix?: string
  scrollToEnd?: boolean
  scrollToIndex?: number
  scrollAnimation?: boolean
  scrollEventThrottle?: number
  noOfSectionsBelowXAxis?: number
  labelsExtraHeight?: number
  adjustToWidth?: boolean
  getPointerProps?: Function
  formatYLabel?: (label: string) => string
  onScroll?: Function
  endReachedOffset?: number
  bounces?: boolean
  overScrollMode?: 'auto' | 'always' | 'never'
  onScrollEndDrag?: (event: any, direction: any) => void
  parentWidth?: number
  yAxisExtraHeight?: number
  trimYAxisAtTop?: boolean
}

export interface LineChartPropsTypeForWeb extends LineChartPropsType {
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
}

export interface LineChartBicolorPropsTypeForWeb
  extends LineChartBicolorPropsType {
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
}

export interface IDataSanitisationProps {
  showDataPointsForMissingValues: boolean | undefined
  interpolateMissingValues: boolean
  onlyPositive: boolean | undefined
  yAxisOffset: number | undefined
}
