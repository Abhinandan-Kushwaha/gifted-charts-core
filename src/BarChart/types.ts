import {
  type ColorValue,
  type GestureResponderEvent,
  type ViewStyle
} from 'react-native'
import { type yAxisSides } from '../utils/constants'
import {
  type CurveType,
  type Pointer,
  type RuleType,
  type RulesConfig,
  type referenceConfigType,
  type secondaryYAxisType
} from '../utils/types'
import { type Component, type ReactNode } from 'react'
import { type lineDataItem } from '../LineChart/types'

export interface stackDataItem {
  value?: number
  onPress?: any
  onLongPress?: any
  onPressOut?: any
  label?: string
  barWidth?: number
  spacing?: number
  labelTextStyle?: any
  topLabelComponent?: Function
  topLabelContainerStyle?: any
  topLabelTextStyle?: any
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
}

export interface StackedBarChartPropsType {
  style?: any
  width?: number
  height?: number
  color?: ColorValue
  topLabelComponent?: Component
  topLabelContainerStyle?: any
  opacity?: number
  label: string
  labelTextStyle?: any
  disablePress?: boolean

  item: stackDataItem
  index: number
  containerHeight?: number
  maxValue: number
  spacing: number
  propSpacing?: number
  data?: any
  barWidth?: number
  onPress?: Function
  onLongPress?: Function
  onPressOut?: Function

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
}

export interface BarChartPropsType {
  width?: number
  height?: number
  overflowTop?: number
  minHeight?: number
  noOfSections?: number
  noOfSectionsBelowXAxis?: number
  maxValue?: number
  mostNegativeValue?: number
  stepHeight?: number
  stepValue?: number
  spacing?: number
  data?: barDataItem[]
  stackData?: stackDataItem[]
  side?: string
  rotateLabel?: boolean
  isAnimated?: boolean
  animationDuration?: number
  // animationEasing?: any;
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
  yAxisLabelContainerStyle?: any
  horizontalRulesStyle?: any
  yAxisTextStyle?: any
  yAxisTextNumberOfLines?: number
  xAxisTextNumberOfLines?: number
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift?: number
  yAxisLabelWidth?: number
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

  disableScroll?: boolean
  showScrollIndicator?: boolean
  indicatorColor?: 'black' | 'default' | 'white'
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
  topLabelContainerStyle?: any
  topLabelTextStyle?: any

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
  xAxisLabelTextStyle?: any
  yAxisLabelPrefix?: string
  yAxisLabelSuffix?: string
  autoShiftLabels?: boolean
  scrollRef?: any
  scrollToEnd?: boolean
  scrollToIndex?: number
  scrollAnimation?: boolean
  scrollEventThrottle?: number
  labelsExtraHeight?: number
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  onPress?: Function
  onLongPress?: Function
  onPressOut?: Function
  renderTooltip?: Function
  leftShiftForTooltip?: number
  leftShiftForLastIndexTooltip?: number
  barStyle?: object
  barInnerComponent?: (
    item?: stackDataItem | barDataItem,
    index?: number
  ) => ReactNode

  secondaryData?: barDataItem[]
  secondaryYAxis?: secondaryYAxisType | boolean
  pointerConfig?: Pointer
  getPointerProps?: Function
  formatYLabel?: (label: string) => string

  onEndReached?: () => void
  onStartReached?: () => void
  endReachedOffset?: number
  onScroll?: Function

  focusBarOnPress?: boolean
  focusedBarConfig?: FocusedBarConfig
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
  hideDataPoints?: boolean
  dataPointsShape?: string
  dataPointsWidth?: number
  dataPointsHeight?: number
  dataPointsColor?: ColorValue | string | any
  dataPointsRadius?: number
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
}
interface arrowType {
  length?: number
  width?: number
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
  showArrowBase?: boolean
}

interface sectionType {
  value: string
}

export interface barDataItem {
  value: number
  onPress?: any
  onLongPress?: any
  onPressOut?: any
  frontColor?: ColorValue
  sideColor?: ColorValue
  topColor?: ColorValue
  showGradient?: boolean
  gradientColor?: any
  label?: string
  barWidth?: number
  sideWidth?: number
  labelTextStyle?: any
  topLabelComponent?: Function
  topLabelContainerStyle?: any
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
  barBackgroundPattern?: () => ReactNode
  patternId?: string
  barMarginBottom?: number
  leftShiftForTooltip?: number
  barStyle?: object
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  showXAxisIndex?: boolean
}

export interface Animated2DWithGradientPropsType {
  item: barDataItem
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
  topLabelContainerStyle?: any
  topLabelTextStyle?: any
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
}

export interface RenderBarsPropsType {
  style?: any
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
  topLabelContainerStyle?: any
  topLabelTextStyle?: any
  opacity?: number
  side?: string
  labelTextStyle?: any

  item: barDataItem
  index: number
  label: string
  containerHeight?: number
  maxValue: number
  spacing: number
  propSpacing?: number
  data?: any
  barWidth?: number
  sideWidth?: number
  labelWidth?: number

  isThreeD?: boolean
  isAnimated?: boolean
  rotateLabel?: boolean
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
  xAxisTextNumberOfLines: number
  xAxisLabelsHeight?: number
  xAxisLabelsVerticalShift: number
  renderTooltip: Function | undefined
  leftShiftForTooltip?: number
  leftShiftForLastIndexTooltip: number
  initialSpacing: number
  selectedIndex: number
  setSelectedIndex: Function
  barStyle?: object
  xAxisThickness?: number
  pointerConfig?: Pointer
  focusBarOnPress?: boolean
  noOfSectionsBelowXAxis?: number
  yAxisOffset: number
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
  topLabelContainerStyle?: any
  topLabelTextStyle?: any
  barBackgroundPattern?: () => ReactNode
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  patternId?: string
  barStyle?: object
  item: barDataItem
  index: number
  selectedIndex: number
  focusBarOnPress?: boolean
  focusedBarConfig?: FocusedBarConfig
}

export interface CommonPropsFor2Dand3DbarsType {
  barBackgroundPattern?: () => ReactNode
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode
  patternId?: string
  barWidth: number
  barStyle?: object
  item: barDataItem
  index: number

  frontColor: ColorValue
  showGradient: boolean
  gradientColor: ColorValue
  opacity: number
  height: number
  intactTopLabel: boolean
  showValuesAsTopLabel: boolean
  topLabelContainerStyle: any
  topLabelTextStyle: any
  yAxisOffset: number
}
