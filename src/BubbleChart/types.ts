import { ColorValue, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native"
import { Linecap } from "react-native-svg"
import { ColorFromToY, CustomBackground, HorizSectionsType, RuleType, RulesConfig, SpreadData, XAxisConfig, referenceConfigType } from "../utils/types"
import { yAxisSides } from "../utils/constants"

interface sectionType {
    value: string
  }

export interface BubbleChartPropsType {
    opacity?: number
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
  
    startIndex?: number
    endIndex?: number
  
    color?: string
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
    gradientDirection?: string
  
    areaGradientComponent?: () => any
    areaGradientId?: string
  
    textFontSize?: number
    textColor?: string
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
  
    formatYLabel?: (label: string) => string
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
  
    showDataPointsForMissingValues?: boolean
    interpolateMissingValues?: boolean
    extrapolateMissingValues?: boolean
    onlyPositive?: boolean
    parentWidth?: number
  
    onChartAreaPress?: (event: GestureResponderEvent) => void
    onBackgroundPress?: (event: GestureResponderEvent) => void
  
    secondaryXAxis?: XAxisConfig
  
    renderTooltip?: Function
    renderTooltipSecondary?: Function
  
    dataPointLabelComponent?: Function
    focusedDataPointLabelComponent?: Function
    spreadAreaData?: SpreadData[]
    spreadAreaColor?: ColorValue
    spreadAreaOpacity?: number
    borderWidth?: number
    borderColor?: ColorValue
  }

export interface bubbleDataItem {
  y: number
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
  r?: number
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
  x?: number
  borderWidth?: number
  borderColor?: ColorValue
  opacity?: number
}