import {
  Animated,
  StyleProp,
  TextStyle,
  type ColorValue,
  type GestureResponderEvent,
  type ViewStyle
} from 'react-native'
import { type yAxisSides } from '../utils/constants'
import {
  XAxisConfig,
  type CurveType,
  type Pointer,
  type RuleType,
  type RulesConfig,
  type referenceConfigType,
  type secondaryYAxisType,
  type Linecap,
  type CustomBackground,
  type PointerEvents,
  type HorizSectionsType,
  type BarAndLineChartsWrapperTypes
} from '../utils/types'
import { Dispatch, SetStateAction, type Component, type ReactNode } from 'react'
import { type lineDataItem } from '../LineChart/types'

export interface stackDataItem {
  value?: number
  onPress?: any
  onLongPress?: any
  onPressOut?: any
  label?: string
  labelWidth?: number
  labelsDistanceFromXaxis?: number
  barWidth?: number
  spacing?: number
  labelTextStyle?: StyleProp<TextStyle>
  topLabelComponent?: Function
  topLabelContainerStyle?: StyleProp<ViewStyle>
  topLabelTextStyle?: StyleProp<TextStyle>
  disablePress?: any
  color?: ColorValue
  showGradient?: boolean
  gradientColor?: any
  capThickness?: number
  capColor?: ColorValue
  capRadius?: number
  labelComponent?: Function
  stacks: Array<{
    value: number
    color?: ColorValue
    onPress?: (event: GestureResponderEvent) => void
    marginBottom?: number
    borderRadius?: number
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    showGradient?: boolean
    gradientColor?: ColorValue
    barWidth?: number
    innerBarComponent?: Function
    onContextMenu?: Function
    onMouseEnter?: Function
    onMouseLeave?: Function
  }>
  barBackgroundPattern?: () => ReactNode
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  barInnerComponent?: (item?: stackDataItem, index?: number) => ReactNode
  patternId?: string
  leftShiftForTooltip?: number
  showXAxisIndex?: boolean
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  isSecondary?: boolean
  showVerticalLine?: boolean
  verticalLineThickness?: number
  verticalLineHeight?: number
  verticalLineColor?: ColorValue
  verticalLineStrokeDashArray?: number[]
  verticalLineShift?: number
  verticalLineZIndex?: number
  verticalLineSpacing?: number
  verticalLineStrokeLinecap?: Linecap
}

export interface StackedBarChartPropsType {
  style?: any
  width?: number
  height?: number
  color?: ColorValue
  topLabelComponent?: Component
  topLabelContainerStyle?: StyleProp<ViewStyle>
  topLabelTextStyle?: StyleProp<TextStyle>
  opacity?: number
  label?: string
  labelTextStyle?: StyleProp<TextStyle>
  autoShiftLabelsForNegativeStacks?: boolean
  labelsDistanceFromXaxis?: number
  xAxisLabelsAtBottom?: boolean
  disablePress?: boolean

  item: stackDataItem
  index: number
  containerHeight: number
  maxValue: number
  spacing: number
  propSpacing?: number
  data?: any
  barWidth?: number
  onPress?: Function
  onLongPress?: Function
  onPressOut?: Function
  labelWidth?: number

  rotateLabel?: boolean
  showXAxisIndices: boolean
  xAxisIndicesHeight: number
  xAxisIndicesWidth: number
  xAxisIndicesColor: ColorValue
  horizontal: boolean
  intactTopLabel: boolean
  barBorderWidth?: number
  barBorderColor: ColorValue
  barBorderRadius?: number
  barBorderTopLeftRadius?: number
  barBorderTopRightRadius?: number
  barBorderBottomLeftRadius?: number
  barBorderBottomRightRadius?: number
  barInnerComponent?: (
    item?: barDataItem | stackDataItem,
    index?: number
  ) => ReactNode
  barMarginBottom: number
  stackBorderRadius?: number
  stackBorderTopLeftRadius?: number
  stackBorderTopRightRadius?: number
  stackBorderBottomLeftRadius?: number
  stackBorderBottomRightRadius?: number
  xAxisThickness: number
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  xAxisTextNumberOfLines: number
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift: number
  renderTooltip: Function | undefined
  leftShiftForTooltip?: number
  leftShiftForLastIndexTooltip: number
  autoCenterTooltip?: boolean
  initialSpacing: number
  selectedIndex: number
  setSelectedIndex: Function
  activeOpacity: number
  showGradient?: boolean
  gradientColor?: any
  stackData: stackDataItem[]
  isAnimated?: boolean
  animationDuration?: number
  pointerConfig?: Pointer
  showValuesAsTopLabel?: boolean
  yAxisOffset: number
  stepHeight: number
  stepValue: number
  negativeStepHeight: number
  negativeStepValue: number
  secondaryStepHeight: number
  secondaryStepValue: number
  secondaryNegativeStepHeight: number
  secondaryNegativeStepValue: number
  secondaryNoOfSectionsBelowXAxis: number
  containerHeightIncludingBelowXAxis: number
  highlightEnabled: boolean
  highlightedBarIndex: number | number[]
  lowlightOpacity: number
  stackHighlightEnabled?: boolean
  selectedStackIndex: number
  setSelectedStackIndex: Function
  onBackgroundPress?: Function
  bounces?: boolean
  overScrollMode?: 'auto' | 'always' | 'never'
  onScrollEndDrag?: (event: any, direction: any) => void
  rtl?: boolean
}

export interface StackedBarChartPropsTypeForWeb extends StackedBarChartPropsType {
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  renderTooltipConditions?: string[]
}

export interface BarChartPropsType {
  width?: number
  height?: number
  overflowTop?: number
  minHeight?: number
  noOfSections?: number
  sectionColors?: ColorValue[]
  noOfSectionsBelowXAxis?: number
  maxValue?: number
  mostNegativeValue?: number
  stepHeight?: number
  stepValue?: number
  negativeStepHeight?: number
  negativeStepValue?: number
  spacing?: number
  data?: barDataItem[]
  stackData?: stackDataItem[]
  side?: string
  rotateLabel?: boolean
  isAnimated?: boolean
  animationDuration?: number
  // animationEasing?: any
  opacity?: number
  isThreeD?: boolean
  xAxisLength?: number
  xAxisThickness?: number
  xAxisColor?: ColorValue
  yAxisThickness?: number
  yAxisColor?: ColorValue
  yAxisExtraHeight?: number
  trimYAxisAtTop?: boolean
  xAxisType?: RuleType
  yAxisLabelContainerStyle?: StyleProp<ViewStyle>
  horizontalRulesStyle?: any
  yAxisTextStyle?: StyleProp<TextStyle>
  yAxisTextNumberOfLines?: number
  xAxisTextNumberOfLines?: number
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift?: number
  xAxisLabelsAtBottom?: boolean
  yAxisLabelWidth?: number
  floatingYAxisLabels?: boolean
  allowFontScaling?: boolean
  hideYAxisText?: boolean
  rotateYAxisTexts?: number
  yAxisSide?: yAxisSides
  yAxisOffset?: number
  initialSpacing?: number
  endSpacing?: number
  barWidth?: number
  sideWidth?: number
  showLine?: boolean
  lineData?: Array<lineDataItem | barDataItem | stackDataItem>
  lineData2?: Array<lineDataItem | barDataItem | stackDataItem>
  lineConfig?: lineConfigType
  lineConfig2?: lineConfigType
  lineBehindBars?: boolean

  cappedBars?: boolean
  capThickness?: number
  capColor?: ColorValue
  capRadius?: number

  hideAxesAndRules?: boolean
  hideRules?: boolean
  rulesLength?: number
  rulesColor?: ColorValue
  rulesThickness?: number
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
  verticalLinesThickness?: number
  verticalLinesHeight?: number
  verticalLinesColor?: ColorValue
  verticalLinesStrokeDashArray?: number[]
  verticalLinesShift?: number
  verticalLinesZIndex?: number
  noOfVerticalLines?: number
  verticalLinesSpacing?: number
  verticalLinesStrokeLinecap?: Linecap

  showYAxisIndices?: boolean
  showXAxisIndices?: boolean
  yAxisIndicesHeight?: number
  xAxisIndicesHeight?: number
  yAxisIndicesWidth?: number
  xAxisIndicesWidth?: number
  xAxisIndicesColor?: ColorValue
  yAxisIndicesColor?: ColorValue

  showFractionalValues?: boolean
  roundToDigits?: number
  backgroundColor?: ColorValue
  customBackground?: CustomBackground

  disableScroll?: boolean
  showScrollIndicator?: boolean
  indicatorColor?: 'black' | 'default' | 'white'
  nestedScrollEnabled?: boolean
  roundedTop?: boolean
  roundedBottom?: boolean
  disablePress?: boolean

  frontColor?: ColorValue
  color?: ColorValue
  sideColor?: ColorValue
  topColor?: ColorValue
  gradientColor?: ColorValue
  showGradient?: boolean
  activeOpacity?: number

  horizontal?: boolean
  rtl?: boolean
  shiftX?: number
  shiftY?: number
  yAxisAtTop?: boolean

  intactTopLabel?: boolean
  showValuesAsTopLabel?: boolean
  topLabelContainerStyle?: StyleProp<ViewStyle>
  bottomLabelContainerStyle?: StyleProp<ViewStyle> // only for candleStick chart
  topLabelTextStyle?: StyleProp<TextStyle>
  bottomLabelTextStyle?: StyleProp<TextStyle> // only for candleStick chart

  horizSections?: sectionType[]
  barBorderWidth?: number
  barBorderColor?: ColorValue
  barBorderRadius?: number
  barBorderTopLeftRadius?: number
  barBorderTopRightRadius?: number
  barBorderBottomLeftRadius?: number
  barBorderBottomRightRadius?: number
  stackBorderRadius?: number
  stackBorderTopLeftRadius?: number
  stackBorderTopRightRadius?: number
  stackBorderBottomLeftRadius?: number
  stackBorderBottomRightRadius?: number
  hideOrigin?: boolean
  labelWidth?: number
  yAxisLabelTexts?: string[]
  xAxisLabelTexts?: string[]
  xAxisLabelTextStyle?: StyleProp<TextStyle>
  yAxisLabelPrefix?: string
  yAxisLabelSuffix?: string
  autoShiftLabels?: boolean
  scrollRef?: any
  scrollToEnd?: boolean
  scrollToIndex?: number
  scrollAnimation?: boolean
  scrollEventThrottle?: number
  labelsExtraHeight?: number
  labelsDistanceFromXaxis?: number
  autoShiftLabelsForNegativeStacks?: boolean
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  onPress?: Function
  onLongPress?: Function
  onPressOut?: Function
  renderTooltip?: Function
  leftShiftForTooltip?: number
  autoCenterTooltip?: boolean
  leftShiftForLastIndexTooltip?: number
  barStyle?: object
  barInnerComponent?: (
    item?: stackDataItem | barDataItem,
    index?: number
  ) => ReactNode

  // secondaryData?: barDataItem[]
  secondaryYAxis?: secondaryYAxisType | boolean
  pointerConfig?: Pointer
  getPointerProps?: Function
  formatYLabel?: (label: string) => string

  onEndReached?: () => void
  onStartReached?: () => void
  endReachedOffset?: number
  onScroll?: Function
  onMomentumScrollEnd?: Function
  bounces?: boolean
  overScrollMode?: 'auto' | 'always' | 'never'
  onScrollEndDrag?: (event: any, direction: any) => void

  focusBarOnPress?: boolean
  focusedBarConfig?: FocusedBarConfig
  focusedBarIndex?: number | number[]

  highlightEnabled?: boolean // highlights Bar on press in react-native and on on hover in react-js
  highlightedBarIndex?: number | number[]
  lowlightOpacity?: number

  stackHighlightEnabled?: boolean
  highlightedStackIndex?: number
  // highlightedStackIndex?: number

  adjustToWidth?: boolean
  parentWidth?: number
  secondaryXAxis?: XAxisConfig
  onBackgroundPress?: Function
  disableForeignObject?: boolean // https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/1100
}

export interface FocusedBarConfig {
  color?: ColorValue
  sideColor?: ColorValue
  topColor?: ColorValue
  gradientColor?: ColorValue
  width?: number
  borderRadius?: number
  roundedTop?: boolean
  roundedBottom?: boolean
  opacity?: number
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
}

export interface lineConfigType {
  initialSpacing?: number
  spacing?: number
  curved?: boolean
  curvature?: number
  curveType?: CurveType
  isAnimated?: boolean
  animationDuration?: number
  delay?: number
  thickness?: number
  color?: ColorValue | string | any
  strokeDashArray?: number[]
  hideDataPoints?: boolean
  dataPointsShape?: string
  dataPointsWidth?: number
  dataPointsHeight?: number
  dataPointsColor?: ColorValue | string | any
  dataPointsRadius?: number
  dataPointLabelComponent?: (item: lineDataItem, index: number) => ReactNode
  textColor?: ColorValue | string | any
  textFontSize?: number
  textShiftX?: number
  textShiftY?: number
  shiftX?: number
  shiftY?: number
  startIndex?: number
  endIndex?: number
  showArrow?: boolean
  arrowConfig?: arrowType
  customDataPoint?: Function
  isSecondary?: boolean
  focusEnabled?: boolean
  focusedDataPointColor?: ColorValue
  focusedDataPointRadius?: number
  focusedDataPointIndex?: number
  showDataPointLabelOnFocus?: boolean
}

export type lineConfigWithSetFocusedDataPointIndexType = lineConfigType & {
  setFocusedDataPointIndex: (i: number) => void
}
export interface defaultLineConfigType {
  initialSpacing: number
  curved: boolean
  curvature: number
  curveType: CurveType
  isAnimated: boolean
  animationDuration: number
  delay: number
  thickness: number
  color: ColorValue | string | any
  hideDataPoints: boolean
  dataPointsShape: string
  dataPointsWidth: number
  dataPointsHeight: number
  dataPointsColor: ColorValue | string | any
  dataPointsRadius: number
  dataPointLabelComponent?: (item: lineDataItem, index: number) => ReactNode
  textColor: ColorValue | string | any
  textFontSize: number
  textShiftX: number
  textShiftY: number
  shiftX: number
  shiftY: number
  startIndex: number
  endIndex: number
  showArrow: boolean
  arrowConfig: arrowType
  customDataPoint?: Function
  isSecondary: boolean
  focusEnabled: boolean
  focusedDataPointColor: ColorValue
  focusedDataPointRadius: number
  showDataPointLabelOnFocus: boolean
  setFocusedDataPointIndex: (i: number) => void
}
interface arrowType {
  length?: number
  width?: number
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
  showArrowBase?: boolean
}

export interface sectionType {
  value: string
}

export interface barDataItem {
  value?: number
  x?: number
  lowerValue?: number // only for candleStick chart
  onPress?: any
  onLongPress?: any
  onPressOut?: any
  frontColor?: ColorValue
  sideColor?: ColorValue
  topColor?: ColorValue
  showGradient?: boolean
  gradientColor?: any
  label?: string
  labelsDistanceFromXaxis?: number
  barWidth?: number
  sideWidth?: number
  barBorderWidth?: number
  barBorderColor?: ColorValue
  labelTextStyle?: StyleProp<TextStyle>
  topLabelComponent?: Function
  bottomLabelComponent?: Function // only for candleStick chart
  topLabelContainerStyle?: StyleProp<ViewStyle>
  bottomLabelContainerStyle?: StyleProp<ViewStyle> // only for candleStick chart
  disablePress?: any
  capThickness?: number
  capColor?: ColorValue
  capRadius?: number
  labelComponent?: Function
  barBorderRadius?: number
  barBorderTopLeftRadius?: number
  barBorderTopRightRadius?: number
  barBorderBottomLeftRadius?: number
  barBorderBottomRightRadius?: number
  topLabelComponentHeight?: number
  spacing?: number
  labelWidth?: number
  secondaryLabel?: string
  secondaryLabelComponent?: Function
  secondaryLabelTextStyle?: StyleProp<TextStyle>
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  leftShiftForTooltip?: number
  autoCenterTooltip?: boolean
  barStyle?: object
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  showXAxisIndex?: boolean
  isSecondary?: boolean
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  showVerticalLine?: boolean
  verticalLineThickness?: number
  verticalLineHeight?: number
  verticalLineColor?: ColorValue
  verticalLineStrokeDashArray?: number[]
  verticalLineShift?: number
  verticalLineZIndex?: number
  verticalLineSpacing?: number
  verticalLineStrokeLinecap?: Linecap
}

export interface barDataItemNullSafe extends barDataItem {
  value: number
}

export interface Animated2DWithGradientPropsType {
  item: barDataItemNullSafe
  index: number
  height: number
  minHeight: number
  opacity?: number
  animationDuration: number
  roundedTop: boolean
  roundedBottom: boolean
  barWidth: number
  gradientColor: ColorValue
  frontColor: ColorValue
  noGradient?: boolean
  noAnimation?: boolean
  cappedBars?: boolean
  capThickness?: number
  capColor?: ColorValue
  capRadius?: number
  horizontal: boolean
  intactTopLabel: boolean
  showValuesAsTopLabel: boolean
  showValuesAsBottomLabel?: boolean
  topLabelContainerStyle?: StyleProp<ViewStyle>
  bottomLabelContainerStyle?: StyleProp<ViewStyle> // only for candleStick chart
  topLabelTextStyle?: StyleProp<TextStyle>
  bottomLabelTextStyle?: StyleProp<TextStyle> // only for candleStick chart
  barBorderWidth?: number
  barBorderColor: ColorValue
  barBorderRadius?: number
  barBorderTopLeftRadius?: number
  barBorderTopRightRadius?: number
  barBorderBottomLeftRadius?: number
  barBorderBottomRightRadius?: number
  containerHeight?: number
  maxValue?: number
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  barStyle?: object
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  commonStyleForBar?: ViewStyle[]
  barStyleWithBackground?: ViewStyle[]
  yAxisOffset: number
  isCandleStickChart?: boolean
}

export interface RenderBarsPropsType {
  isCandleStickChart?: boolean
  style?: StyleProp<ViewStyle>
  width?: number
  height?: number
  minHeight: number
  color?: ColorValue
  showGradient?: boolean
  gradientColor?: any
  frontColor?: ColorValue
  sideColor?: ColorValue
  topColor?: ColorValue
  topLabelComponent?: Component
  topLabelContainerStyle?: StyleProp<ViewStyle>
  topLabelTextStyle?: StyleProp<TextStyle>
  opacity?: number
  side?: string
  labelTextStyle?: StyleProp<TextStyle>
  secondaryLabelTextStyle?: StyleProp<TextStyle>

  item: barDataItemNullSafe
  index: number
  label: string
  secondaryLabel: string
  containerHeight: number
  containerHeightIncludingBelowXAxis: number
  maxValue: number
  spacing: number
  propSpacing?: number
  data?: any
  barWidth: number
  sideWidth?: number
  labelWidth?: number

  isThreeD?: boolean
  isAnimated?: boolean
  rotateLabel?: boolean
  labelsDistanceFromXaxis?: number
  animatedHeight?: any
  appearingOpacity?: any
  animationDuration?: number
  roundedTop?: boolean
  roundedBottom?: boolean
  disablePress?: boolean
  activeOpacity?: number
  cappedBars?: boolean
  capThickness?: number
  capColor?: ColorValue
  capRadius?: number
  showXAxisIndices: boolean
  xAxisIndicesHeight: number
  xAxisIndicesWidth: number
  xAxisIndicesColor: ColorValue
  horizontal: boolean
  rtl: boolean
  intactTopLabel: boolean
  showValuesAsTopLabel?: boolean
  showValuesAsBottomLabel?: boolean
  barBorderWidth?: number
  barBorderColor: ColorValue
  barBorderRadius?: number
  barBorderTopLeftRadius?: number
  barBorderTopRightRadius?: number
  barBorderBottomLeftRadius?: number
  barBorderBottomRightRadius?: number
  barInnerComponent?: (
    item?: barDataItem | stackDataItem,
    index?: number
  ) => ReactNode
  autoShiftLabels?: boolean
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  onPress?: Function
  onLongPress?: Function
  onPressOut?: Function
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  xAxisTextNumberOfLines: number
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift: number
  renderTooltip: Function | undefined
  leftShiftForTooltip?: number
  autoCenterTooltip?: boolean
  leftShiftForLastIndexTooltip: number
  initialSpacing: number
  selectedIndex: number[]
  setSelectedIndex: Function
  barStyle?: object
  xAxisThickness?: number
  secondaryXAxis?: XAxisConfig
  pointerConfig?: Pointer
  focusBarOnPress?: boolean
  focusedBarIndex?: number | number[]
  noOfSectionsBelowXAxis?: number
  yAxisOffset: number
  stepHeight: number
  stepValue: number
  negativeStepHeight: number
  negativeStepValue: number
  secondaryStepHeight: number
  secondaryStepValue: number
  secondaryNegativeStepHeight: number
  secondaryNegativeStepValue: number
  secondaryNoOfSectionsBelowXAxis: number
  highlightEnabled: boolean
  highlightedBarIndex: number | number[]
  lowlightOpacity: number
}

export interface RenderBarsPropsTypeForWeb extends RenderBarsPropsType {
  renderTooltipConditions: string[]
}

export interface trianglePropTypes {
  style: any
  width: number
  color: ColorValue
}

export interface animatedBarPropTypes {
  isAnimated?: boolean
  animationDuration: number
  barWidth: number
  sideWidth: number
  height: number
  showGradient: boolean
  gradientColor: any
  frontColor: ColorValue
  sideColor: ColorValue
  topColor: ColorValue
  opacity: number
  side: string
  horizontal: boolean
  intactTopLabel: boolean
  showValuesAsTopLabel: boolean
  topLabelContainerStyle?: StyleProp<ViewStyle>
  topLabelTextStyle?: StyleProp<TextStyle>
  barBackgroundPattern?: () => ReactNode
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  patternId?: string
  barStyle?: object
  item: barDataItem
  index: number
  selectedIndex: number[]
  focusBarOnPress?: boolean
  focusedBarConfig?: FocusedBarConfig
  containerHeight: number
}

export interface CommonPropsFor2dand3dBarsType {
  barBackgroundPattern?: () => ReactNode
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  patternId?: string
  barWidth: number
  barStyle?: object
  item: barDataItemNullSafe
  index: number

  frontColor: ColorValue
  showGradient: boolean
  gradientColor: ColorValue
  opacity: number
  height: number
  intactTopLabel: boolean
  showValuesAsTopLabel: boolean
  topLabelContainerStyle: StyleProp<ViewStyle>
  bottomLabelContainerStyle: StyleProp<ViewStyle>
  topLabelTextStyle: StyleProp<TextStyle>
  bottomLabelTextStyle: StyleProp<TextStyle>
  yAxisOffset: number
}

export interface BarChartPropsTypeForWeb extends BarChartPropsType {
  onContextMenu?: Function
  onMouseEnter?: Function
  onMouseLeave?: Function
  renderTooltipConditions?: string[]
}


type BarChartCommonRenderPropsKeys =
  | 'index'
  | 'containerHeight'
  | 'containerHeightIncludingBelowXAxis'
  | 'maxValue'
  | 'spacing'
  | 'propSpacing'
  | 'xAxisThickness'
  | 'barWidth'
  | 'opacity'
  | 'disablePress'
  | 'rotateLabel'
  | 'showXAxisIndices'
  | 'xAxisIndicesHeight'
  | 'xAxisIndicesWidth'
  | 'xAxisIndicesColor'
  | 'labelsDistanceFromXaxis'
  | 'horizontal'
  | 'rtl'
  | 'intactTopLabel'
  | 'showValuesAsTopLabel'
  | 'topLabelContainerStyle'
  | 'topLabelTextStyle'
  | 'barBorderWidth'
  | 'barBorderColor'
  | 'barBorderRadius'
  | 'barBorderTopLeftRadius'
  | 'barBorderTopRightRadius'
  | 'barBorderBottomLeftRadius'
  | 'barBorderBottomRightRadius'
  | 'barInnerComponent'
  | 'color'
  | 'showGradient'
  | 'gradientColor'
  | 'barBackgroundPattern'
  | 'patternId'
  | 'onPress'
  | 'onLongPress'
  | 'onPressOut'
  | 'onContextMenu'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'focusBarOnPress'
  | 'xAxisTextNumberOfLines'
  | 'xAxisLabelsHeight'
  | 'xAxisLabelsVerticalShift'
  | 'renderTooltip'
  | 'renderTooltipConditions'
  | 'leftShiftForTooltip'
  | 'autoCenterTooltip'
  | 'initialSpacing'
  | 'selectedIndex'
  | 'setSelectedIndex'
  | 'activeOpacity'
  | 'noOfSectionsBelowXAxis'
  | 'leftShiftForLastIndexTooltip'
  | 'label'
  | 'secondaryLabel'
  | 'labelTextStyle'
  | 'secondaryLabelTextStyle'
  | 'pointerConfig'
  | 'yAxisOffset'
  | 'focusedBarIndex'
  | 'stepHeight'
  | 'stepValue'
  | 'negativeStepHeight'
  | 'negativeStepValue'
  | 'secondaryXAxis'
  | 'secondaryStepHeight'
  | 'secondaryStepValue'
  | 'secondaryNegativeStepHeight'
  | 'secondaryNegativeStepValue'
  | 'secondaryNoOfSectionsBelowXAxis'
  | 'barMarginBottom'
  | 'highlightEnabled'
  | 'highlightedBarIndex'
  | 'lowlightOpacity'

type RequiredPresentProps<T, K extends keyof T> = {
  [P in K]-?: Required<T>[P]
}

type BarChartCommonPropsMaybeUndefined =
  | 'disablePress'
  | 'labelsDistanceFromXaxis'
  | 'showValuesAsTopLabel'
  | 'topLabelContainerStyle'
  | 'topLabelTextStyle'
  | 'barBorderWidth'
  | 'barBorderRadius'
  | 'barBorderTopLeftRadius'
  | 'barBorderTopRightRadius'
  | 'barBorderBottomLeftRadius'
  | 'barBorderBottomRightRadius'
  | 'barInnerComponent'
  | 'color'
  | 'showGradient'
  | 'gradientColor'
  | 'barBackgroundPattern'
  | 'patternId'
  | 'onPress'
  | 'onLongPress'
  | 'onPressOut'
  | 'onContextMenu'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'focusBarOnPress'
  | 'xAxisLabelsHeight'
  | 'autoCenterTooltip'
  | 'pointerConfig'
  | 'focusedBarIndex'
  | 'secondaryXAxis'

export type BarChartCommonPropsType = Omit<
  Partial<RenderBarsPropsTypeForWeb>,
  BarChartCommonRenderPropsKeys | BarChartCommonPropsMaybeUndefined | 'item'
> &
  RequiredPresentProps<
    RenderBarsPropsTypeForWeb,
    Exclude<BarChartCommonRenderPropsKeys, BarChartCommonPropsMaybeUndefined>
  > & {
    item: barDataItem | stackDataItem
    disablePress: RenderBarsPropsTypeForWeb['disablePress']
    labelsDistanceFromXaxis: RenderBarsPropsTypeForWeb['labelsDistanceFromXaxis']
    showValuesAsTopLabel: RenderBarsPropsTypeForWeb['showValuesAsTopLabel']
    topLabelContainerStyle: RenderBarsPropsTypeForWeb['topLabelContainerStyle']
    topLabelTextStyle: RenderBarsPropsTypeForWeb['topLabelTextStyle']
    barBorderWidth: RenderBarsPropsTypeForWeb['barBorderWidth']
    barBorderRadius: RenderBarsPropsTypeForWeb['barBorderRadius']
    barBorderTopLeftRadius: RenderBarsPropsTypeForWeb['barBorderTopLeftRadius']
    barBorderTopRightRadius: RenderBarsPropsTypeForWeb['barBorderTopRightRadius']
    barBorderBottomLeftRadius: RenderBarsPropsTypeForWeb['barBorderBottomLeftRadius']
    barBorderBottomRightRadius: RenderBarsPropsTypeForWeb['barBorderBottomRightRadius']
    barInnerComponent: RenderBarsPropsTypeForWeb['barInnerComponent']
    color: RenderBarsPropsTypeForWeb['color']
    showGradient: RenderBarsPropsTypeForWeb['showGradient']
    gradientColor: RenderBarsPropsTypeForWeb['gradientColor']
    barBackgroundPattern: RenderBarsPropsTypeForWeb['barBackgroundPattern']
    patternId: RenderBarsPropsTypeForWeb['patternId']
    onPress: RenderBarsPropsTypeForWeb['onPress']
    onLongPress: RenderBarsPropsTypeForWeb['onLongPress']
    onPressOut: RenderBarsPropsTypeForWeb['onPressOut']
    onContextMenu: RenderBarsPropsTypeForWeb['onContextMenu']
    onMouseEnter: RenderBarsPropsTypeForWeb['onMouseEnter']
    onMouseLeave: RenderBarsPropsTypeForWeb['onMouseLeave']
    focusBarOnPress: RenderBarsPropsTypeForWeb['focusBarOnPress']
    xAxisLabelsHeight: RenderBarsPropsTypeForWeb['xAxisLabelsHeight']
    autoCenterTooltip: RenderBarsPropsTypeForWeb['autoCenterTooltip']
    pointerConfig: RenderBarsPropsTypeForWeb['pointerConfig']
    focusedBarIndex: RenderBarsPropsTypeForWeb['focusedBarIndex']
    secondaryXAxis: RenderBarsPropsTypeForWeb['secondaryXAxis']
    bottomLabelTextStyle: BarChartPropsTypeForWeb['bottomLabelTextStyle']
    focusedBarConfig: BarChartPropsTypeForWeb['focusedBarConfig']
    xAxisLabelsAtBottom: boolean
    yAxisExtraHeightAtTop: number
    secondaryYAxis: secondaryYAxisType | boolean | undefined
    stackHighlightEnabled: boolean
  }

export interface UseBarChartReturnType {
  lineConfig: lineConfigWithSetFocusedDataPointIndexType
  hidePointer1: boolean
  pointerItem: barDataItem | stackDataItem | undefined
  pointerY: number
  pointerConfig: Pointer | undefined
  pointerColor: import('react-native').ColorValue
  pointerX: number
  pointerComponent: Function | null
  pointerHeight: number
  pointerRadius: number
  pointerWidth: number
  autoAdjustPointerLabelPosition: boolean
  pointerLabelWidth: number
  activatePointersOnLongPress: boolean
  yAxisLabelWidth: number
  shiftPointerLabelX: number
  pointerLabelHeight: number
  pointerStripUptoDataPoint: boolean
  pointerStripHeight: number
  shiftPointerLabelY: number
  showPointerStrip: boolean
  pointerStripWidth: number
  containerHeight: number
  xAxisThickness: number
  pointerStripColor: import('react-native').ColorValue
  pointerEvents: PointerEvents | undefined
  setResponderStartTime: Dispatch<SetStateAction<number>>
  setPointerY: Dispatch<SetStateAction<number>>
  setPointerItem: Dispatch<
    SetStateAction<barDataItem | stackDataItem | undefined>
  >
  initialSpacing: number
  spacing: number
  data: barDataItemNullSafe[]
  barWidth: number
  setPointerX: Dispatch<SetStateAction<number>>
  setPointerIndex: Dispatch<SetStateAction<number>>
  maxValue: number
  maxItem: number
  responderStartTime: number
  responderActive: boolean
  setResponderActive: Dispatch<SetStateAction<boolean>>
  activatePointersDelay: number
  persistPointer: boolean
  pointerVanishDelay: number
  containerHeightIncludingBelowXAxis: number
  extendedContainerHeight: number
  totalWidth: number
  stripBehindBars: boolean
  noOfSectionsBelowXAxis: number
  stepHeight: number
  xAxisLabelsVerticalShift: number
  xAxisLabelsAtBottom: boolean
  labelsExtraHeight: number
  stripOverPointer: boolean
  pointerLabelComponent: Function | null
  opacity: number
  rotateLabel: boolean
  showXAxisIndices: boolean
  xAxisIndicesHeight: number
  xAxisIndicesWidth: number
  xAxisIndicesColor: import('react-native').ColorValue
  autoShiftLabelsForNegativeStacks: boolean | undefined
  horizontal: boolean
  rtl: boolean
  intactTopLabel: boolean
  barBorderColor: import('react-native').ColorValue
  barInnerComponent:
    | ((item?: barDataItem | stackDataItem, index?: number) => ReactNode)
    | undefined
  xAxisTextNumberOfLines: number
  selectedIndex: number[]
  setSelectedIndex: Dispatch<SetStateAction<number[]>>
  isAnimated: boolean
  animationDuration: number
  side: string
  labelWidth: number
  isThreeD: boolean
  animatedHeight: Animated.Interpolation<'0%' | '100%'> | undefined
  appearingOpacity: Animated.Interpolation<0 | 1> | undefined
  autoShiftLabels: boolean
  yAxisAtTop: boolean
  disableScroll: boolean
  showScrollIndicator: boolean
  scrollToEnd: boolean
  scrollAnimation: boolean
  scrollEventThrottle: number
  showLine: boolean
  lineConfig2: lineConfigWithSetFocusedDataPointIndexType
  lineData: (barDataItem | stackDataItem | lineDataItem)[]
  lineData2: (barDataItem | stackDataItem | lineDataItem)[] | undefined
  animatedWidth: Animated.Interpolation<number> | undefined
  lineBehindBars: boolean
  points: string
  setPoints: Dispatch<SetStateAction<string>>
  points2: string
  setPoints2: Dispatch<SetStateAction<string>>
  arrowPoints: string
  setArrowPoints: Dispatch<SetStateAction<string>>
  horizSections: HorizSectionsType
  endSpacing: number
  horizontalRulesStyle: BarChartPropsTypeForWeb['horizontalRulesStyle']
  noOfSections: number
  showFractionalValues: boolean
  widthFromProps: number | undefined
  stepValue: number
  secondaryMaxValue: number
  getPointerProps: Function | null
  pointerIndex: number
  getPropsCommonForBarAndStack: (
    item: barDataItem | stackDataItem,
    index: number
  ) => BarChartCommonPropsType
  barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes
  yAxisExtraHeightAtTop: number
  selectedStackIndex: number
  setSelectedStackIndex: Dispatch<SetStateAction<number>>
  allowFontScaling: boolean
  disableForeignObject: boolean
}
