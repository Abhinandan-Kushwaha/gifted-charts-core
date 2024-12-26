import { type ColorValue } from 'react-native'
import { type chartTypes, type yAxisSides } from './constants'
import { lineDataItemNullSafe, type lineDataItem } from '../LineChart/types'
import {
  lineConfigType,
  type barDataItem,
  type stackDataItem
} from '../BarChart/types'

export enum Framework {
  reactJS,
  reactNative
}

export type RuleType = 'solid' | 'dashed' | 'dotted' | string

export type LabelsPosition = 'onBorder' | 'outward' | 'inward' | 'mid'

export type Linecap = 'butt' | 'square' | 'round'

export interface CustomBackground {
  color?: ColorValue
  component?: Function
  horizontalShift?: number
  verticalShift?: number
  height?: number
  width?: number
  widthAdjustment?: number
}

export interface RuleTypes {
  SOLID: RuleType
  DASHED: RuleType
  DOTTED: RuleType
}

export enum CurveType {
  CUBIC,
  QUADRATIC
}

export enum EdgePosition {
  AFTER_DATA_POINT,
  AROUND_DATA_POINT,
  BEFORE_DATA_POINT
}

export interface RulesConfig {
  rulesLength?: number
  rulesColor?: ColorValue
  rulesThickness?: number
  rulesType?: RuleType
  dashWidth?: number
  dashGap?: number
}

export interface XAxisConfig {
  thickness?: number
  color?: ColorValue
  labelsDistanceFromXaxis?: number
  labelsHeight?: number
  labelsTextStyle?: any
  labelTexts?: string[]
}

export type PointerEvents = 'box-none' | 'none' | 'box-only' | 'auto'

export interface secondaryYAxisType {
  noOfSections?: number
  maxValue?: number
  mostNegativeValue?: number
  stepValue?: number
  stepHeight?: number
  negativeStepValue?: number
  negativeStepHeight?: number
  showFractionalValues?: boolean
  roundToDigits?: number
  noOfSectionsBelowXAxis?: number

  showYAxisIndices?: boolean
  yAxisIndicesHeight?: number
  yAxisIndicesWidth?: number
  yAxisIndicesColor?: ColorValue

  yAxisSide?: yAxisSides
  yAxisOffset?: number
  yAxisThickness?: number
  yAxisColor?: ColorValue
  yAxisLabelContainerStyle?: any
  yAxisLabelTexts?: string[] | undefined
  yAxisTextStyle?: any
  yAxisTextNumberOfLines?: number
  yAxisLabelWidth?: number
  hideYAxisText?: boolean
  yAxisLabelPrefix?: string
  yAxisLabelSuffix?: string
  hideOrigin?: boolean
  formatYLabel?: (label: string) => string
}

export interface secondaryLineConfigType {
  zIndex?: number
  curved?: boolean
  curvature?: number
  curveType?: CurveType
  areaChart?: boolean
  color?: ColorValue
  thickness?: number
  zIndex1?: number
  strokeDashArray?: number[]
  startIndex?: number
  endIndex?: number
  hideDataPoints?: boolean
  dataPointsHeight?: number
  dataPointsWidth?: number
  dataPointsRadius?: number
  dataPointsColor?: string
  dataPointsShape?: string
  showValuesAsDataPointsText?: boolean
  startFillColor?: string
  endFillColor?: string
  startOpacity?: number
  endOpacity?: number
  textFontSize?: number
  textColor?: string
  showArrow?: boolean
  arrowConfig?: arrowConfigType
  isSecondary?: boolean
  spacing?: number
}

export interface ExtendedLineConfigType extends lineConfigType {
  startIndex: number
  endIndex: number
  dataPointsHeight: number
}

export interface LineInBarChartPropsType {
  yAxisLabelWidth: number
  initialSpacing: number
  spacing: number
  containerHeight: number
  containerHeightIncludingBelowXAxis: number
  lineConfig: ExtendedLineConfigType
  maxValue: number
  animatedWidth: number
  lineBehindBars: boolean
  points: any
  arrowPoints: any
  data: any[]
  totalWidth: number
  barWidth?: number
  labelsExtraHeight: number
  scrollEventThrottle: number
  xAxisLabelsVerticalShift: number
  selectedIndex: number
  yAxisOffset: number
  strokeDashArray: number[]
}

export interface DataPointProps {
  data: any[]
  lineConfig: ExtendedLineConfigType
  barWidth?: number
  containerHeight: number
  maxValue: number
  firstBarWidth: number
  yAxisLabelWidth: number
  spacing: number
  selectedIndex: number
  yAxisOffset: number
}

export interface referenceConfigType {
  thickness?: number
  width?: number
  color?: ColorValue | string | any
  type?: string
  dashWidth?: number
  dashGap?: number
  labelText?: string
  labelTextStyle?: any
  zIndex?: number
}

export interface arrowConfigType {
  length: number
  width: number
  strokeWidth: number
  strokeColor: string
  fillColor: string
  showArrowBase: boolean
}

export interface horizSectionPropTypes {
  chartType: chartTypes
  width: number | undefined
  horizSections: any[]
  noOfSectionsBelowXAxis: number
  totalWidth: number
  endSpacing: number
  yAxisSide: yAxisSides
  horizontalRulesStyle: any
  noOfSections: number
  sectionColors?: ColorValue[]
  stepHeight: number
  negativeStepHeight: number
  yAxisLabelWidth: number
  yAxisLabelContainerStyle: any
  yAxisThickness: number
  trimYAxisAtTop: boolean
  yAxisColor: string
  yAxisExtraHeight: number
  xAxisThickness: number
  xAxisColor: string
  xAxisLength: number
  xAxisType: RuleType
  dashWidth: number
  dashGap: number
  rulesConfigArray: RulesConfig[]
  backgroundColor: string
  hideRules: boolean
  rulesLength: number
  rulesType: RuleType
  rulesThickness: number
  rulesColor: string
  spacing: number
  showYAxisIndices: boolean
  yAxisIndicesHeight: number
  yAxisIndicesWidth: number
  yAxisIndicesColor: string

  hideOrigin: boolean
  hideYAxisText: boolean
  showFractionalValues: boolean
  yAxisTextNumberOfLines: number
  yAxisLabelPrefix: string
  yAxisLabelSuffix: string
  yAxisTextStyle: any
  rotateYAxisTexts: number | undefined
  rtl: boolean

  containerHeight: number
  overflowTop: number
  maxValue: number

  referenceLinesConfig: any

  yAxisLabelTexts: string[] | undefined
  yAxisOffset: number | undefined

  horizontal: boolean
  yAxisAtTop: boolean

  stepValue: number
  negativeStepValue: number
  roundToDigits: number | undefined
  secondaryYAxis: secondaryYAxisType | null
  formatYLabel?: (label: string) => string
  onlyReferenceLines?: boolean
  renderReferenceLines?: boolean
  secondaryXAxis?: XAxisConfig
  secondaryMaxItem: number
  secondaryMinItem: number
  secondaryStepValue: number
  secondaryNegativeStepValue: number
  secondaryNoOfSectionsBelowXAxis: number
  showSecondaryFractionalValues: boolean
  secondaryRoundToDigits: number
  secondaryStepHeight: number
  secondaryNegativeStepHeight: number
  customBackground?: CustomBackground
}

interface HorizSectionObject {
  value: string
}

export type HorizSectionsType = HorizSectionObject[]

export interface BarAndLineChartsWrapperTypes {
  chartType: chartTypes
  containerHeight: number
  noOfSectionsBelowXAxis: number
  sectionColors?: ColorValue[]
  stepHeight: number
  negativeStepHeight: number
  labelsExtraHeight: number
  yAxisLabelWidth: number
  horizontal: boolean
  rtl: boolean
  shiftX: number
  shiftY: number
  scrollRef?: any
  yAxisAtTop: boolean
  initialSpacing: number
  data: any[]
  stackData: any[] | undefined
  secondaryData?: any[]
  barWidth: number | undefined
  xAxisThickness: number
  totalWidth: number
  disableScroll: boolean
  showScrollIndicator: boolean
  scrollToEnd: boolean
  scrollToIndex: number | undefined
  scrollAnimation: boolean
  indicatorColor: 'black' | 'default' | 'white' | undefined
  selectedIndex: number
  setSelectedIndex: any
  spacing: number
  showLine: boolean
  lineConfig: any
  lineConfig2: any
  maxValue: number
  lineData?: Array<lineDataItem | barDataItem | stackDataItem>
  lineData2?: Array<lineDataItem | barDataItem | stackDataItem>
  animatedWidth?: any
  lineBehindBars: boolean
  points: string | any[]
  points2: string | any[]
  arrowPoints: any
  renderChartContent?: any
  remainingScrollViewProps?: any

  width: number | undefined
  horizSections: HorizSectionsType
  endSpacing: number
  horizontalRulesStyle: any
  noOfSections: number
  showFractionalValues: boolean
  axesAndRulesProps: any

  yAxisLabelTexts: string[] | undefined
  yAxisOffset: number | undefined
  rotateYAxisTexts: number | undefined
  hideAxesAndRules: boolean | undefined

  showXAxisIndices: boolean
  xAxisIndicesHeight: number
  xAxisIndicesWidth: number
  xAxisIndicesColor: ColorValue

  pointerConfig?: Pointer
  getPointerProps: any
  pointerIndex: number
  pointerX: number
  pointerY: number

  scrollEventThrottle: number

  onEndReached?: () => void
  onStartReached?: () => void
  onMomentumScrollEnd?: Function
  endReachedOffset: number
  isRTL?: boolean
  extraWidthDueToDataPoint?: number
  nestedScrollEnabled?: boolean
  dataSet?: DataSetNullSafe[]
  customBackground?: CustomBackground
}

export interface HorizontalStripConfig {
  thickness?: number
  length?: number
  color?: ColorValue
  strokeDashArray?: number[]
  horizontalStripUptoDataPoint?: boolean
  labelComponent?: Function
  labelComponentHeight?: number
  labelComponentWidth?: number
}

export interface Pointer {
  height?: number
  width?: number
  radius?: number
  pointerColor?: ColorValue
  pointer1Color?: ColorValue
  pointer2Color?: ColorValue
  pointer3Color?: ColorValue
  pointer4Color?: ColorValue
  pointer5Color?: ColorValue
  pointerColorsForDataSet?: ColorValue[]
  secondaryPointerColor?: ColorValue
  pointerComponent?: Function
  showPointerStrip?: boolean
  pointerStripWidth?: number
  pointerStripHeight?: number
  pointerStripColor?: ColorValue
  pointerStripUptoDataPoint?: boolean
  hidePointerForMissingValues?: boolean
  hidePointerDataPointForMissingValues?: boolean

  horizontalStripConfig?: HorizontalStripConfig

  pointerLabelComponent?: Function
  dynamicLegendComponent?: Function
  dynamicLegendContainerStyle?: any
  stripOverPointer?: boolean
  autoAdjustPointerLabelPosition?: boolean
  shiftPointerLabelX?: number
  shiftPointerLabelY?: number
  pointerLabelWidth?: number
  pointerLabelHeight?: number
  pointerVanishDelay?: number
  activatePointersOnLongPress?: boolean
  activatePointersInstantlyOnTouch?: boolean
  activatePointersDelay?: number
  initialPointerIndex?: number
  initialPointerAppearDelay?: number
  persistPointer?: boolean
  resetPointerIndexOnRelease?: boolean
  hidePointers?: boolean
  hidePointer1?: boolean
  hidePointer2?: boolean
  hidePointer3?: boolean
  hidePointer4?: boolean
  hidePointer5?: boolean
  hideSecondaryPointer?: boolean
  strokeDashArray?: number[]
  barTouchable?: boolean
  pointerEvents?: PointerEvents
  stripBehindBars?: boolean
  resetPointerOnDataChange?: boolean
}

export interface HighlightedRange {
  from: number
  to: number
  color?: string | ColorValue
  thickness?: number
  strokeDashArray?: number[]
}

export interface LineSegment {
  startIndex: number
  endIndex: number
  color?: string | ColorValue
  thickness?: number
  strokeDashArray?: number[]
}

export interface LineSvgProps {
  d: string
  fill: string
  stroke: string | ColorValue
  strokeWidth: number
  strokeDasharray?: number[]
  clipPath?: string
}

export interface LineProperties {
  d: string
  color: string | ColorValue
  strokeWidth: number
  strokeDashArray?: number[]
}

export interface DataSet {
  data: lineDataItem[]
  zIndex?: number
  thickness?: number
  strokeDashArray?: number[]
  areaChart?: boolean
  stepChart?: boolean
  startIndex?: number
  endIndex?: number
  color?: string
  hideDataPoints?: boolean
  dataPointsHeight?: number
  dataPointsWidth?: number
  dataPointsRadius?: number
  dataPointsColor?: string
  dataPointsShape?: string
  startFillColor?: string
  endFillColor?: string
  startOpacity?: number
  endOpacity?: number
  textFontSize?: number
  textColor?: string
  showArrow?: boolean
  arrowConfig?: arrowConfigType
  curved?: boolean
  curvature?: number
  curveType?: CurveType
  lineSegments?: LineSegment[]
  isSecondary?: boolean
  hidePointers?: boolean
  spacing?: number
}
export interface DataSetNullSafe extends DataSet {
  data: lineDataItemNullSafe[]
}

export interface IntersectionAreaConfig {
  fillColor?: ColorValue
}

export interface LabelLineConfig {
  length?: number
  tailLength?: number
  color?: ColorValue
  thickness?: number
  labelComponentWidth?: number
  labelComponentHeight?: number
  labelComponentMargin?: number
  avoidOverlappingOfLabels?: boolean
}
