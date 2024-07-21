import { type defaultLineConfigType } from '../BarChart/types';
import { CurveType, EdgePosition, type RuleTypes } from './types';
import { type FontStyle } from 'react-native-svg';
export declare enum chartTypes {
    BAR = 0,
    LINE = 1,
    LINE_BI_COLOR = 2
}
export declare const defaultCurvature = 0.2;
export declare const defaultAnimationDuration = 800;
export declare enum yAxisSides {
    LEFT = 0,
    RIGHT = 1
}
export declare enum loc {
    IN = 0,
    UP = 1,
    DOWN = 2
}
export declare const SEGMENT_START = "segmentStart";
export declare const SEGMENT_END = "segmentEnd";
export declare const RANGE_ENTER = "RangeEnter";
export declare const RANGE_EXIT = "RangeExit";
export declare const STOP = "stop";
export declare const ruleTypes: RuleTypes;
export declare const AxesAndRulesDefaults: {
    yAxisSide: yAxisSides;
    yAxisColor: string;
    yAxisExtraHeight: number;
    yAxisThickness: number;
    trimYAxisAtTop: boolean;
    overflowTop: number;
    overflowTopWithSecondaryXAxis: number;
    xAxisColor: string;
    xAxisThickness: number;
    xAxisType: string;
    xAxisTextNumberOfLines: number;
    xAxisLabelsVerticalShift: number;
    dashWidth: number;
    dashGap: number;
    backgroundColor: string;
    hideRules: boolean;
    rulesType: string;
    rulesThickness: number;
    rulesColor: string;
    rulesConfigArray: never[];
    rotateLabel: boolean;
    showYAxisIndices: boolean;
    yAxisIndicesHeight: number;
    yAxisIndicesWidth: number;
    yAxisIndicesColor: string;
    showXAxisIndices: boolean;
    xAxisIndicesHeight: number;
    xAxisIndicesWidth: number;
    xAxisIndicesColor: string;
    hideOrigin: boolean;
    hideYAxisText: boolean;
    yAxisTextNumberOfLines: number;
    showVerticalLines: boolean;
    verticalLinesThickness: number;
    verticalLinesColor: string;
    verticalLinesStrokeDashArray: string;
    verticalLinesShift: number;
    verticalLinesZIndex: number;
    verticalLinesSpacing: number;
    verticalLinesUptoDataPoint: boolean;
    noOfSections: number;
    containerHeight: number;
    width: number;
    labelWidth: number;
    labelsExtraHeight: number;
    yAxisLabelWidth: number;
    yAxisEmptyLabelWidth: number;
    showFractionalValues: boolean;
    roundToDigits: number;
    referenceLinesOverChartContent: boolean;
};
export declare const defaultArrowConfig: {
    length: number;
    width: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    showArrowBase: boolean;
};
export declare const BarDefaults: {
    barWidth: number;
    spacing: number;
    capThickness: number;
    capColor: string;
    capRadius: number;
    barBorderColor: string;
    horizontal: boolean;
    rtl: boolean;
    labelsWidthForHorizontal: number;
    yAxisAtTop: boolean;
    rotateYAxisTexts: undefined;
    intactTopLabel: boolean;
    showLine: boolean;
    lineBehindBars: boolean;
    disableScroll: boolean;
    scrollToEnd: boolean;
    scrollAnimation: boolean;
    showScrollIndicator: boolean;
    scrollEventThrottle: number;
    side: string;
    isAnimated: boolean;
    animationDuration: number;
    opacity: number;
    isThreeD: boolean;
    frontColor: string;
    threeDBarGradientColor: string;
    threeDBarFrontColor: string;
    threeDBarSideColor: string;
    threeDBarTopColor: string;
    endReachedOffset: number;
    focusedBarFrontColor: string;
    focusedThreeDBarFrontColor: string;
    focusedBarSideColor: string;
    focusedBarTopColor: string;
};
export declare const defaultLineConfig: defaultLineConfigType;
export declare const LineDefaults: {
    color: string;
    curvature: number;
    curveType: CurveType;
    thickness: number;
    isAnimated: boolean;
    hideDataPoints: boolean;
    spacing: number;
    initialSpacing: number;
    endSpacing: number;
    animationDuration: number;
    animateTogether: boolean;
    disableScroll: boolean;
    scrollToEnd: boolean;
    scrollAnimation: boolean;
    showScrollIndicator: boolean;
    scrollEventThrottle: number;
    showValuesAsDataPointsText: boolean;
    dataPointsHeight: number;
    dataPointsWidth: number;
    dataPointsRadius: number;
    dataPointsColor: string;
    dataPointsColor2: string;
    dataPointsColor3: string;
    dataPointsShape: string;
    textFontSize: number;
    textColor: string;
    startFillColor: string;
    endFillColor: string;
    lineGradient: boolean;
    lineGradientStartColor: string;
    lineGradientEndColor: string;
    startOpacity: number;
    endOpacity: number;
    focusEnabled: boolean;
    showDataPointOnFocus: boolean;
    showStripOnFocus: boolean;
    showTextOnFocus: boolean;
    showDataPointLabelOnFocus: boolean;
    stripWidth: number;
    unFocusOnPressOut: boolean;
    delayBeforeUnFocus: number;
    edgePosition: EdgePosition;
    endReachedOffset: number;
};
export declare const defaultPointerConfig: {
    height: number;
    width: number;
    radius: number;
    pointerColor: string;
    pointerComponent: null;
    showPointerStrip: boolean;
    pointerStripHeight: number;
    pointerStripWidth: number;
    pointerStripColor: string;
    pointerStripUptoDataPoint: boolean;
    pointerLabelComponent: null;
    stripOverPointer: boolean;
    shiftPointerLabelX: number;
    shiftPointerLabelY: number;
    pointerLabelWidth: number;
    pointerLabelHeight: number;
    autoAdjustPointerLabelPosition: boolean;
    pointerVanishDelay: number;
    activatePointersOnLongPress: boolean;
    activatePointersDelay: number;
    initialPointerIndex: number;
    initialPointerAppearDelay: number;
    persistPointer: boolean;
    hidePointer1: boolean;
    hidePointer2: boolean;
    hidePointer3: boolean;
    hidePointer4: boolean;
    hidePointer5: boolean;
    hideSecondaryPointer: boolean;
    barTouchable: boolean;
    stripBehindBars: boolean;
    resetPointerOnDataChange: boolean;
};
export declare const pieColors: string[];
export declare const populationDefaults: {
    height: number;
    verticalMarginBetweenBars: number;
    barsMapToYAxisSections: boolean;
    xAxisNoOfSections: number;
    showXAxisIndices: boolean;
    xAxisIndicesWidth: number;
    xAxisIndicesHeight: number;
    xAxisIndicesColor: string;
    showXAxisLabelTexts: boolean;
    xAxisRoundToDigits: number;
    showVerticalLines: boolean;
    verticalLinesColor: string;
    verticalLinesThickness: number;
    verticalLinesType: string;
    verticalLinesStrokeDashArray: number[];
    defaultFontSize: number;
    defaultFontColor: string;
    defaultFontStyle: FontStyle;
    defaultFontWeight: number;
    defaultFontFamily: string;
    yAxisLabelTextMarginRight: number;
    showValuesAsBarLabels: boolean;
    showMidAxis: boolean;
    midAxisLabelWidth: number;
    midAxisType: string;
    leftBarLabelWidth: number;
    rightBarLabelWidth: number;
    leftBarColor: string;
    rightBarColor: string;
    leftBarBorderColor: string;
    rightBarBorderColor: string;
    leftBarBorderWidth: number;
    rightBarBorderWidth: number;
    leftBarBorderRadius: number;
    rightBarBorderRadius: number;
    allCornersRounded: boolean;
    showSurplus: boolean;
    showSurplusLeft: boolean;
    showSurplusRight: boolean;
    leftSurplusColor: string;
    leftSurplusBorderColor: string;
    rightSurplusColor: string;
    rightSurplusBorderColor: string;
    leftSurplusBorderWidth: number;
    rightSurplusBorderWidth: number;
    prefix: string;
    suffix: string;
};
