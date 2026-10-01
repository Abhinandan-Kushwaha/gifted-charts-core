import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  type ColorValue
} from 'react-native'
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
  SpreadData,
  ColorFromToY,
  DataSetNullSafe,
  PointerEvents,
  BarAndLineChartsWrapperTypes
} from '../utils/types'
import { barDataItemNullSafe } from '../BarChart/types'

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
  xOffset?: number
  xScale?: number
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
  colors?: ColorFromToY[]
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
  floatingYAxisLabels?: boolean
  allowFontScaling?: boolean
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
  disableForeignObject?: boolean // https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/1100
  alignVerticalLinesWithXValues?: boolean
}

export interface lineDataItem {
  value?: number
  originalValue?: number
  x?: number
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
  verticalLineColor?: ColorValue
  verticalLineThickness?: number
  verticalLineStrokeDashArray?: number[]
  verticalLineShift?: number
  verticalLineZIndex?: number
  verticalLineSpacing?: number
  verticalLineStrokeLinecap?: Linecap
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
  x?: number
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
  verticalLineColor?: ColorValue
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

  spreadAreaData?: SpreadData[]
  spreadAreaColor?: ColorValue
  spreadAreaOpacity?: number

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
  floatingYAxisLabels?: boolean
  allowFontScaling?: boolean
  disableForeignObject?: boolean
}

export interface LineChartPropsTypeForWeb extends LineChartPropsType {
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
}

export interface LineChartBicolorPropsTypeForWeb extends LineChartBicolorPropsType {
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


type LineChartStateSetter<T> = import('react').Dispatch<
  import('react').SetStateAction<T>
>

export interface secondaryLineConfigTypeNullSafe extends secondaryLineConfigType {
  zIndex: number
  color: ColorValue
  startFillColor: string
  endFillColor: string
  startOpacity: number
  endOpacity: number
  strokeLinecap: 'butt' | 'round' | 'square'
}


export type UseLineChartReturnType = {
  curveType: CurveType
  pointerItem: lineDataItem | undefined
  pointerItem2: lineDataItem | undefined
  pointerItem3: lineDataItem | undefined
  pointerItem4: lineDataItem | undefined
  pointerItem5: lineDataItem | undefined
  secondaryPointerItem: lineDataItem | undefined
  pointerItemsForSet: lineDataItem[]
  secondaryPointerItemsForSet: lineDataItem[]
  data: lineDataItemNullSafe[]
  data2: lineDataItemNullSafe[]
  data3: lineDataItemNullSafe[]
  data4: lineDataItemNullSafe[]
  data5: lineDataItemNullSafe[]
  secondaryData: lineDataItemNullSafe[] | barDataItemNullSafe[]
  dataSet: DataSetNullSafe[] | undefined
  data0: lineDataItemNullSafe[] | undefined
  lineSegments: LineSegment[] | undefined
  lineSegments2: LineSegment[] | undefined
  lineSegments3: LineSegment[] | undefined
  lineSegments4: LineSegment[] | undefined
  lineSegments5: LineSegment[] | undefined
  highlightedRange: HighlightedRange | undefined
  edgePosition: EdgePosition
  colors: ColorFromToY[] | undefined
  secondaryLineConfig: secondaryLineConfigTypeNullSafe
  horizSections: { value: string }[]
  arrowStrokeColorsFromSet: ColorValue[] | undefined
  arrowFillColorsFromSet: ColorValue[] | undefined
  showArrowBasesFromSet: boolean[] | undefined
  horizontalRulesStyle: LineChartPropsType['horizontalRulesStyle']
  pointerConfig: Pointer | undefined
  getPointerProps: Function | null
  pointerComponent: Function | null
  pointerLabelComponent: Function | null
  pointerEvents: PointerEvents | undefined
  stripHeight: number | undefined
  stripColor: LineChartPropsType['stripColor']
  barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes
  cumulativeSpacingForSet: number[][]
  strips: Record<
    number,
    Record<number, { item: lineDataItemNullSafe; index: number; key: number }>
  >
  renderTooltip: Function | undefined
  renderTooltip1: Function | undefined
  renderTooltip2: Function | undefined
  renderTooltip3: Function | undefined
  renderTooltip4: Function | undefined
  renderTooltip5: Function | undefined
  renderTooltipSecondary: Function | undefined
  pointerItemLocal: Array<Partial<lineDataItem> & { value?: number }>
  getIsNthAreaChart: (n: number) => boolean
  getX: (spacingArray: number[], index: number) => number
  getY: (value: number) => number
  getSecondaryY: (value: number) => number
  addLeadingAndTrailingPathForAreaFill: (
    initialPath: string,
    value: number,
    dataLength: number
  ) => string
  getNextPoint: (
    data: lineDataItemNullSafe[],
    index: number,
    around: boolean,
    before: boolean,
    spacingArray: number[],
    isSecondary?: boolean
  ) => string
  getStepPath: (
    data: lineDataItemNullSafe[],
    index: number,
    spacingArray: number[],
    lineSegment: LineSegment[] | undefined,
    isSecondary?: boolean
  ) => string
  getSegmentPath: (
    data: lineDataItemNullSafe[],
    index: number,
    lineSegment: LineSegment[] | undefined,
    startIndex: number,
    endIndex: number,
    spacingArray: number[],
    isSecondary?: boolean
  ) => string
  getPointerY: (value: number) => number
  initialisePointers: () => void
  handleFocus: (
    index: number,
    item: lineDataItemNullSafe,
    locationY: number,
    onStripPress: Function
  ) => void
  handleUnFocus: () => void
} & Record<
  | 'curvature'
  | 'scrollX'
  | 'pointerIndex'
  | 'pointerX'
  | 'pointerY'
  | 'pointerY2'
  | 'pointerY3'
  | 'pointerY4'
  | 'pointerY5'
  | 'secondaryPointerY'
  | 'responderStartTime'
  | 'selectedIndex'
  | 'noOfSections'
  | 'containerHeight'
  | 'scrollEventThrottle'
  | 'labelsExtraHeight'
  | 'animationDuration'
  | 'onDataChangeAnimationDuration'
  | 'startIndex1'
  | 'startIndex2'
  | 'endIndex1'
  | 'endIndex2'
  | 'startIndex3'
  | 'endIndex3'
  | 'startIndex4'
  | 'endIndex4'
  | 'startIndex5'
  | 'endIndex5'
  | 'initialSpacing'
  | 'endSpacing'
  | 'thickness'
  | 'yAxisLabelWidth'
  | 'spacing'
  | 'xAxisThickness'
  | 'dataPointsHeight1'
  | 'dataPointsWidth1'
  | 'dataPointsRadius1'
  | 'dataPointsHeight2'
  | 'dataPointsWidth2'
  | 'dataPointsRadius2'
  | 'dataPointsHeight3'
  | 'dataPointsWidth3'
  | 'dataPointsRadius3'
  | 'dataPointsHeight4'
  | 'dataPointsWidth4'
  | 'dataPointsRadius4'
  | 'dataPointsHeight5'
  | 'dataPointsWidth5'
  | 'dataPointsRadius5'
  | 'textFontSize1'
  | 'textFontSize2'
  | 'textFontSize3'
  | 'textFontSize4'
  | 'textFontSize5'
  | 'totalWidth'
  | 'maxValue'
  | 'mostNegativeValue'
  | 'overflowTop'
  | 'extendedContainerHeight'
  | 'secondaryMaxValue'
  | 'heightUptoXaxis'
  | 'thickness1'
  | 'thickness2'
  | 'thickness3'
  | 'thickness4'
  | 'thickness5'
  | 'zIndex1'
  | 'zIndex2'
  | 'zIndex3'
  | 'zIndex4'
  | 'zIndex5'
  | 'startOpacity'
  | 'endOpacity'
  | 'startOpacity1'
  | 'endOpacity1'
  | 'startOpacity2'
  | 'endOpacity2'
  | 'startOpacity3'
  | 'endOpacity3'
  | 'startOpacity4'
  | 'endOpacity4'
  | 'startOpacity5'
  | 'endOpacity5'
  | 'arrowLength1'
  | 'arrowWidth1'
  | 'arrowStrokeWidth1'
  | 'arrowLength2'
  | 'arrowWidth2'
  | 'arrowStrokeWidth2'
  | 'arrowLength3'
  | 'arrowWidth3'
  | 'arrowStrokeWidth3'
  | 'arrowLength4'
  | 'arrowWidth4'
  | 'arrowStrokeWidth4'
  | 'arrowLength5'
  | 'arrowWidth5'
  | 'arrowStrokeWidth5'
  | 'stepHeight'
  | 'stepValue'
  | 'noOfSectionsBelowXAxis'
  | 'xAxisIndicesHeight'
  | 'xAxisIndicesWidth'
  | 'xAxisTextNumberOfLines'
  | 'xAxisLabelsVerticalShift'
  | 'roundToDigits'
  | 'pointerHeight'
  | 'pointerWidth'
  | 'pointerRadius'
  | 'pointerStripHeight'
  | 'pointerStripWidth'
  | 'shiftPointerLabelX'
  | 'shiftPointerLabelY'
  | 'pointerLabelWidth'
  | 'pointerLabelHeight'
  | 'pointerVanishDelay'
  | 'activatePointersDelay'
  | 'initialPointerIndex'
  | 'initialPointerAppearDelay'
  | 'stripWidth'
  | 'stripOpacity'
  | 'delayBeforeUnFocus'
  | 'containerHeightIncludingBelowXAxis'
  | 'yAxisExtraHeightAtTop'
  | 'selectedLineNumber'
  | 'lastLineNumber'
  | 'focusProximity',
  number
> & Record<
  | 'arrow1Points'
  | 'arrow2Points'
  | 'arrow3Points'
  | 'arrow4Points'
  | 'arrow5Points'
  | 'secondaryArrowPoints'
  | 'points'
  | 'points2'
  | 'points3'
  | 'points4'
  | 'points5'
  | 'secondaryPoints'
  | 'fillPoints'
  | 'fillPoints2'
  | 'fillPoints3'
  | 'fillPoints4'
  | 'fillPoints5'
  | 'secondaryFillPoints'
  | 'dataPointsColor1'
  | 'dataPointsShape1'
  | 'dataPointsColor2'
  | 'dataPointsShape2'
  | 'dataPointsColor3'
  | 'dataPointsShape3'
  | 'dataPointsColor4'
  | 'dataPointsShape4'
  | 'dataPointsColor5'
  | 'dataPointsShape5'
  | 'textColor1'
  | 'textColor2'
  | 'textColor3'
  | 'textColor4'
  | 'textColor5'
  | 'color1'
  | 'color2'
  | 'color3'
  | 'color4'
  | 'color5'
  | 'startFillColor1'
  | 'endFillColor1'
  | 'startFillColor2'
  | 'endFillColor2'
  | 'startFillColor3'
  | 'endFillColor3'
  | 'startFillColor4'
  | 'endFillColor4'
  | 'startFillColor5'
  | 'endFillColor5'
  | 'gradientDirection'
  | 'lineGradientDirection'
  | 'lineGradientStartColor'
  | 'lineGradientEndColor',
  string
> & Record<
  | 'setScrollX'
  | 'setPointerIndex'
  | 'setPointerX'
  | 'setPointerY'
  | 'setPointerY2'
  | 'setPointerY3'
  | 'setPointerY4'
  | 'setPointerY5'
  | 'setSecondaryPointerY'
  | 'setResponderStartTime'
  | 'setSelectedIndex'
  | 'setSelectedLineNumber',
  LineChartStateSetter<number>
> & Record<
  | 'setArrow1Points'
  | 'setArrow2Points'
  | 'setArrow3Points'
  | 'setArrow4Points'
  | 'setArrow5Points'
  | 'setSecondaryArrowPoints'
  | 'setPoints'
  | 'setPoints2'
  | 'setPoints3'
  | 'setPoints4'
  | 'setPoints5'
  | 'setSecondaryPoints'
  | 'setFillPoints'
  | 'setFillPoints2'
  | 'setFillPoints3'
  | 'setFillPoints4'
  | 'setFillPoints5'
  | 'setSecondaryFillPoints',
  LineChartStateSetter<string>
> & Record<
  | 'setPointerItem'
  | 'setPointerItem2'
  | 'setPointerItem3'
  | 'setPointerItem4'
  | 'setPointerItem5'
  | 'setSecondaryPointerItem',
  LineChartStateSetter<lineDataItem | undefined>
> & Record<
  | 'pointerYsForDataSet'
  | 'cumulativeSpacing1'
  | 'cumulativeSpacing2'
  | 'cumulativeSpacing3'
  | 'cumulativeSpacing4'
  | 'cumulativeSpacing5'
  | 'cumulativeSpacingSecondary',
  number[]
> & Record<
  | 'responderActive'
  | 'scrollToEnd'
  | 'scrollAnimation'
  | 'animateTogether'
  | 'renderDataPointsAfterAnimationEnds'
  | 'animateOnDataChange'
  | 'adjustToWidth'
  | 'stepChart'
  | 'stepChart1'
  | 'stepChart2'
  | 'stepChart3'
  | 'stepChart4'
  | 'stepChart5'
  | 'showValuesAsDataPointsText'
  | 'rotateLabel'
  | 'isAnimated'
  | 'hidePointers'
  | 'hideDataPoints1'
  | 'hideDataPoints2'
  | 'hideDataPoints3'
  | 'hideDataPoints4'
  | 'hideDataPoints5'
  | 'showArrowBase1'
  | 'showArrowBase2'
  | 'showArrowBase3'
  | 'showArrowBase4'
  | 'showArrowBase5'
  | 'showXAxisIndices'
  | 'xAxisLabelsAtBottom'
  | 'showFractionalValues'
  | 'horizontal'
  | 'yAxisAtTop'
  | 'showPointerStrip'
  | 'pointerStripUptoDataPoint'
  | 'stripOverPointer'
  | 'autoAdjustPointerLabelPosition'
  | 'activatePointersOnLongPress'
  | 'activatePointersInstantlyOnTouch'
  | 'persistPointer'
  | 'resetPointerIndexOnRelease'
  | 'hidePointer1'
  | 'hidePointer2'
  | 'hidePointer3'
  | 'hidePointer4'
  | 'hidePointer5'
  | 'hideSecondaryPointer'
  | 'resetPointerOnDataChange'
  | 'hidePointerDataPointForMissingValues'
  | 'disableScroll'
  | 'showScrollIndicator'
  | 'focusEnabled'
  | 'showDataPointOnFocus'
  | 'showStripOnFocus'
  | 'showTextOnFocus'
  | 'showDataPointLabelOnFocus'
  | 'unFocusOnPressOut'
  | 'lineGradient'
  | 'focusTogether'
  | 'allowFontScaling'
  | 'disableForeignObject'
  | 'doAllPointsHaveX',
  boolean
> & Record<'setPointerYsForDataSet', LineChartStateSetter<number[]>> & Record<
  'setResponderActive',
  LineChartStateSetter<boolean>
> & Record<
  'pointsFromSet' | 'fillPointsFromSet' | 'arrowPointsFromSet',
  string[]
> & Record<
  'setPointsFromSet' | 'setFillPointsFromSet' | 'setArrowPointsFromSet',
  LineChartStateSetter<string[]>
> & Record<
  'setPointerItemsForSet' | 'setSecondaryPointerItemsForSet',
  LineChartStateSetter<lineDataItem[]>
> & Record<
  'lineSegments' | 'lineSegments2' | 'lineSegments3' | 'lineSegments4' | 'lineSegments5',
  LineSegment[] | undefined
> & Record<
  | 'areaChart'
  | 'areaChart1'
  | 'areaChart2'
  | 'areaChart3'
  | 'areaChart4'
  | 'areaChart5'
  | 'atLeastOneAreaChart'
  | 'stripOverDataPoints',
  boolean | undefined
> & Record<
  | 'strokeDashArray1'
  | 'strokeDashArray2'
  | 'strokeDashArray3'
  | 'strokeDashArray4'
  | 'strokeDashArray5'
  | 'arrowLengthsFromSet'
  | 'arrowWidthsFromSet'
  | 'arrowStrokeWidthsFromSet'
  | 'stripStrokeDashArray',
  number[] | undefined
> & Record<
  'strokeLinecap1' | 'strokeLinecap2' | 'strokeLinecap3' | 'strokeLinecap4' | 'strokeLinecap5',
  Linecap
> & Record<
  | 'arrowStrokeColor1'
  | 'arrowFillColor1'
  | 'arrowStrokeColor2'
  | 'arrowFillColor2'
  | 'arrowStrokeColor3'
  | 'arrowFillColor3'
  | 'arrowStrokeColor4'
  | 'arrowFillColor4'
  | 'arrowStrokeColor5'
  | 'arrowFillColor5',
  ColorValue
> & Record<
  'xAxisIndicesColor' | 'pointerColor' | 'pointerStripColor',
  ColorValue
> & Record<
  | 'renderTooltip'
  | 'renderTooltip1'
  | 'renderTooltip2'
  | 'renderTooltip3'
  | 'renderTooltip4'
  | 'renderTooltip5'
  | 'renderTooltipSecondary',
  Function | undefined
>
