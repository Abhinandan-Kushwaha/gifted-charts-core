import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import { Linecap } from 'react-native-svg'
import {
  CustomBackground,
  RegressionLineConfig,
  RuleType,
  RulesConfig,
  SpreadData,
  XAxisConfig,
  referenceConfigType
} from '../utils/types'
import { yAxisSides } from '../utils/constants'

interface sectionType {
  value: string
}

export interface BubbleChartPropsType {
  opacity?: number
  height?: number
  overflowTop?: number
  overflowBottom?: number
  yNoOfSections?: number
  ySectionColors?: ColorValue[]
  maxY?: number
  mostNegativeY?: number
  yStepHeight?: number
  yStepValue?: number
  yNegativeStepValue?: number
  showFractionalYAxis?: boolean
  yRoundToDigits?: number
  xNoOfSections?: number
  // xSectionColors?: ColorValue[]
  maxX?: number
  mostNegativeX?: number
  xStepHeight?: number
  xStepValue?: number
  showFractionalXAxis?: boolean
  xRoundToDigits?: number
  spacing?: number
  initialSpacing?: number
  endSpacing?: number
  data?: bubbleDataItem[]
  zIndex?: number
  thickness?: number
  strokeDashArray?: number[]
  strokeLinecap?: Linecap
  rotateLabel?: boolean
  isAnimated?: boolean
  animateOnDataChange?: boolean
  animationDuration?: number
  onDataChangeAnimationDuration?: number
  animationEasing?: any
  animateTogether?: boolean
  renderBubblesAfterAnimationEnds?: boolean
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
  showBubbleOnFocus?: boolean
  showStripOnFocus?: boolean
  stripOverBubbles?: boolean
  showTextOnFocus?: boolean
  showBubbleLabelOnFocus?: boolean
  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number
  stripStrokeDashArray?: number[]
  onPress?: Function
  unFocusOnPressOut?: boolean
  delayBeforeUnFocus?: number
  focusedBubbleIndex?: number

  showValuesAsBubbleLabels?: boolean

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

  disableScroll?: boolean
  // pointerConfig?: Pointer
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

  yAxisThickness?: number
  yAxisColor?: ColorValue
  yAxisExtraHeight?: number
  trimYAxisAtTop?: boolean
  yAxisLabelContainerStyle?: StyleProp<ViewStyle>
  horizontalRulesStyle?: any
  yAxisTextStyle?: StyleProp<TextStyle>
  yAxisTextNumberOfLines?: number
  xAxisTextNumberOfLines?: number
  yAxisLabelWidth?: number
  hideYAxisText?: boolean
  floatingYAxisLabels?: boolean
  allowFontScaling?: boolean
  backgroundColor?: ColorValue
  customBackground?: CustomBackground
  horizSections?: sectionType[]
  focusTogether?: boolean
  focusProximity?: number

  // Data points

  hideBubbles?: boolean
  bubblesHeight?: number
  bubblesWidth?: number
  bubblesRadius?: number
  bubblesColor?: string
  bubblesShape?: string
  customBubble?: Function

  focusedBubbleShape?: string
  focusedBubbleWidth?: number
  focusedBubbleHeight?: number
  focusedBubbleColor?: ColorValue | string | any
  focusedBubbleRadius?: number
  focusedCustomBubble?: Function

  gradientDirection?: string

  areaGradientComponent?: () => any
  areaGradientId?: string

  hideOrigin?: boolean
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

  formatYLabel?: (label: string) => string
  formatXLabel?: (label: string) => string
  formatBubbleLabel?: (label: string) => string
  lineGradient?: boolean
  lineGradientComponent?: () => any
  lineGradientId?: string
  lineGradientDirection?: string
  lineGradientStartColor?: string
  lineGradientEndColor?: string

  onEndReached?: () => void
  onStartReached?: () => void
  endReachedOffset?: number
  onScroll?: Function
  onMomentumScrollEnd?: Function
  bounces?: boolean
  overScrollMode?: 'auto' | 'always' | 'never'
  onScrollEndDrag?: (event: any, direction: any) => void

  showBubblesForMissingValues?: boolean
  interpolateMissingValues?: boolean
  extrapolateMissingValues?: boolean
  onlyPositive?: boolean
  parentWidth?: number

  onChartAreaPress?: (event: GestureResponderEvent) => void
  onBackgroundPress?: (event: GestureResponderEvent) => void

  secondaryXAxis?: XAxisConfig

  renderTooltip?: Function
  renderTooltipSecondary?: Function

  labelWidth?: number
  labelHeight?: number
  labelFontSize?: number
  labelShiftX?: number
  labelShiftY?: number
  labelComponent?: Function
  labelTextStyle?: Object
  focusedLabelComponent?: Function
  spreadAreaData?: SpreadData[]
  spreadAreaColor?: ColorValue
  spreadAreaOpacity?: number
  borderWidth?: number
  borderColor?: ColorValue
  borderOpacity?: number
  showRegressionLine?: boolean
  regressionLineConfig?: RegressionLineConfig
  scatterChart?: boolean
}

export interface bubbleDataItem {
  y: number
  label?: string
  labelWidth?: number
  labelHeight?: number
  labelFontSize?: number
  labelComponent?: Function
  labelTextStyle?: Object
  labelShiftX?: number
  labelShiftY?: number
  secondaryLabel?: string
  secondaryLabelComponent?: Function
  secondaryLabelTextStyle?: StyleProp<TextStyle>

  spacing?: number

  hideBubble?: boolean
  bubbleHeight?: number
  bubbleWidth?: number
  r?: number
  bubbleColor?: string
  bubbleShape?: string
  customBubble?: Function

  stripHeight?: number
  stripWidth?: number
  stripColor?: ColorValue | string | any
  stripOpacity?: number
  stripStrokeDashArray?: number[]

  focusedBubbleShape?: string
  focusedBubbleWidth?: number
  focusedBubbleHeight?: number
  focusedBubbleColor?: ColorValue | string | any
  focusedBubbleRadius?: number
  focusedCustomBubble?: Function
  focusedLabelComponent?: Function

  showStrip?: boolean

  showVerticalLine?: boolean
  verticalLineHeight?: number
  verticalLineUptoBubble?: boolean
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
  x?: number
  borderWidth?: number
  borderColor?: ColorValue
  borderOpacity?: number
  opacity?: number
}
