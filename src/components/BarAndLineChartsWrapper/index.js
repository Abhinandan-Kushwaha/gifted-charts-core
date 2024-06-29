var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from 'react';
import { AxesAndRulesDefaults, BarDefaults } from '../../utils/constants';
export var useBarAndLineChartsWrapper = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
    var chartType = props.chartType, containerHeight = props.containerHeight, noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis, stepHeight = props.stepHeight, labelsExtraHeight = props.labelsExtraHeight, yAxisLabelWidth = props.yAxisLabelWidth, horizontal = props.horizontal, rtl = props.rtl, shiftX = props.shiftX, shiftY = props.shiftY, initialSpacing = props.initialSpacing, data = props.data, stackData = props.stackData, secondaryData = props.secondaryData, barWidth = props.barWidth, xAxisThickness = props.xAxisThickness, totalWidth = props.totalWidth, spacing = props.spacing, lineConfig = props.lineConfig, lineConfig2 = props.lineConfig2, maxValue = props.maxValue, lineData = props.lineData, lineData2 = props.lineData2, animatedWidth = props.animatedWidth, lineBehindBars = props.lineBehindBars, points = props.points, points2 = props.points2, arrowPoints = props.arrowPoints, width = props.width, horizSections = props.horizSections, endSpacing = props.endSpacing, horizontalRulesStyle = props.horizontalRulesStyle, noOfSections = props.noOfSections, showFractionalValues = props.showFractionalValues, axesAndRulesProps = props.axesAndRulesProps, yAxisLabelTexts = props.yAxisLabelTexts, yAxisOffset = props.yAxisOffset, rotateYAxisTexts = props.rotateYAxisTexts, pointerConfig = props.pointerConfig, getPointerProps = props.getPointerProps, pointerIndex = props.pointerIndex, pointerX = props.pointerX, pointerY = props.pointerY, scrollEventThrottle = props.scrollEventThrottle, endReachedOffset = props.endReachedOffset, isRTL = props.isRTL;
    var yAxisAtTop = rtl ? !props.yAxisAtTop : props.yAxisAtTop;
    var hideOrigin = (_a = axesAndRulesProps.hideOrigin) !== null && _a !== void 0 ? _a : AxesAndRulesDefaults.hideOrigin;
    var yAxisSide = (_b = axesAndRulesProps.yAxisSide) !== null && _b !== void 0 ? _b : AxesAndRulesDefaults.yAxisSide;
    var yAxisLabelContainerStyle = axesAndRulesProps.yAxisLabelContainerStyle;
    var yAxisColor = (_c = axesAndRulesProps.yAxisColor) !== null && _c !== void 0 ? _c : AxesAndRulesDefaults.yAxisColor;
    var yAxisExtraHeight = (_d = axesAndRulesProps.yAxisExtraHeight) !== null && _d !== void 0 ? _d : containerHeight / 20;
    var trimYAxisAtTop = (_e = axesAndRulesProps.trimYAxisAtTop) !== null && _e !== void 0 ? _e : AxesAndRulesDefaults.trimYAxisAtTop;
    var overflowTop = (_f = axesAndRulesProps.overflowTop) !== null && _f !== void 0 ? _f : AxesAndRulesDefaults.overflowTop;
    var yAxisThickness = (_g = axesAndRulesProps.yAxisThickness) !== null && _g !== void 0 ? _g : AxesAndRulesDefaults.yAxisThickness;
    var xAxisColor = (_h = axesAndRulesProps.xAxisColor) !== null && _h !== void 0 ? _h : AxesAndRulesDefaults.xAxisColor;
    var xAxisLength = axesAndRulesProps.xAxisLength;
    var xAxisType = (_j = axesAndRulesProps.xAxisType) !== null && _j !== void 0 ? _j : AxesAndRulesDefaults.xAxisType;
    var xAxisLabelsVerticalShift = (_k = axesAndRulesProps.xAxisLabelsVerticalShift) !== null && _k !== void 0 ? _k : AxesAndRulesDefaults.xAxisLabelsVerticalShift;
    var xAxisLabelsHeight = axesAndRulesProps.xAxisLabelsHeight;
    var xAxisTextNumberOfLines = axesAndRulesProps.xAxisTextNumberOfLines;
    var dashWidth = (_l = axesAndRulesProps.dashWidth) !== null && _l !== void 0 ? _l : AxesAndRulesDefaults.dashWidth;
    var dashGap = (_m = axesAndRulesProps.dashGap) !== null && _m !== void 0 ? _m : AxesAndRulesDefaults.dashGap;
    var backgroundColor = (_o = axesAndRulesProps.backgroundColor) !== null && _o !== void 0 ? _o : AxesAndRulesDefaults.backgroundColor;
    var hideRules = (_p = axesAndRulesProps.hideRules) !== null && _p !== void 0 ? _p : AxesAndRulesDefaults.hideRules;
    var rulesLength = axesAndRulesProps.rulesLength;
    var rulesType = (_q = axesAndRulesProps.rulesType) !== null && _q !== void 0 ? _q : AxesAndRulesDefaults.rulesType;
    var rulesThickness = (_r = axesAndRulesProps.rulesThickness) !== null && _r !== void 0 ? _r : AxesAndRulesDefaults.rulesThickness;
    var rulesColor = (_s = axesAndRulesProps.rulesColor) !== null && _s !== void 0 ? _s : AxesAndRulesDefaults.rulesColor;
    var rulesConfigArray = (_t = axesAndRulesProps.rulesConfigArray) !== null && _t !== void 0 ? _t : AxesAndRulesDefaults.rulesConfigArray;
    var showYAxisIndices = (_u = axesAndRulesProps.showYAxisIndices) !== null && _u !== void 0 ? _u : false;
    var yAxisIndicesHeight = (_v = axesAndRulesProps.yAxisIndicesHeight) !== null && _v !== void 0 ? _v : AxesAndRulesDefaults.yAxisIndicesHeight;
    var yAxisIndicesWidth = (_w = axesAndRulesProps.yAxisIndicesWidth) !== null && _w !== void 0 ? _w : AxesAndRulesDefaults.yAxisIndicesWidth;
    var yAxisIndicesColor = (_x = axesAndRulesProps.yAxisIndicesColor) !== null && _x !== void 0 ? _x : AxesAndRulesDefaults.yAxisIndicesColor;
    var hideYAxisText = (_y = axesAndRulesProps.hideYAxisText) !== null && _y !== void 0 ? _y : AxesAndRulesDefaults.hideYAxisText;
    var yAxisTextNumberOfLines = (_z = axesAndRulesProps.yAxisTextNumberOfLines) !== null && _z !== void 0 ? _z : AxesAndRulesDefaults.yAxisTextNumberOfLines;
    var yAxisLabelPrefix = (_0 = axesAndRulesProps.yAxisLabelPrefix) !== null && _0 !== void 0 ? _0 : '';
    var yAxisLabelSuffix = (_1 = axesAndRulesProps.yAxisLabelSuffix) !== null && _1 !== void 0 ? _1 : '';
    var yAxisTextStyle = axesAndRulesProps.yAxisTextStyle;
    var secondaryYAxis = axesAndRulesProps.secondaryYAxis;
    var stepValue = axesAndRulesProps.stepValue;
    var roundToDigits = axesAndRulesProps.roundToDigits;
    var referenceLinesConfig = axesAndRulesProps.referenceLinesConfig;
    var referenceLinesOverChartContent = (_2 = referenceLinesConfig.referenceLinesOverChartContent) !== null && _2 !== void 0 ? _2 : AxesAndRulesDefaults.referenceLinesOverChartContent;
    var showVerticalLines = (_3 = axesAndRulesProps.showVerticalLines) !== null && _3 !== void 0 ? _3 : AxesAndRulesDefaults.showVerticalLines;
    var verticalLinesThickness = (_4 = axesAndRulesProps.verticalLinesThickness) !== null && _4 !== void 0 ? _4 : AxesAndRulesDefaults.verticalLinesThickness;
    var verticalLinesHeight = axesAndRulesProps.verticalLinesHeight;
    var verticalLinesColor = (_5 = axesAndRulesProps.verticalLinesColor) !== null && _5 !== void 0 ? _5 : AxesAndRulesDefaults.verticalLinesColor;
    var verticalLinesStrokeDashArray = (_6 = axesAndRulesProps.verticalLinesStrokeDashArray) !== null && _6 !== void 0 ? _6 : AxesAndRulesDefaults.verticalLinesStrokeDashArray;
    var verticalLinesShift = (_7 = axesAndRulesProps.verticalLinesShift) !== null && _7 !== void 0 ? _7 : AxesAndRulesDefaults.verticalLinesShift;
    var verticalLinesZIndex = (_8 = axesAndRulesProps.verticalLinesZIndex) !== null && _8 !== void 0 ? _8 : AxesAndRulesDefaults.verticalLinesZIndex;
    var verticalLinesSpacing = (_9 = axesAndRulesProps.verticalLinesSpacing) !== null && _9 !== void 0 ? _9 : AxesAndRulesDefaults.verticalLinesSpacing;
    var verticalLinesUptoDataPoint = (_10 = axesAndRulesProps.verticalLinesUptoDataPoint) !== null && _10 !== void 0 ? _10 : AxesAndRulesDefaults.verticalLinesUptoDataPoint;
    var noOfVerticalLines = axesAndRulesProps.noOfVerticalLines;
    var verticalLinesAr = noOfVerticalLines
        ? __spreadArray([], __read(Array(noOfVerticalLines).keys()), false) : __spreadArray([], __read(Array(stackData ? stackData.length : data.length).keys()), false);
    var horizSectionProps = {
        width: width,
        horizSections: horizSections,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        totalWidth: totalWidth,
        endSpacing: endSpacing,
        yAxisSide: yAxisSide,
        horizontalRulesStyle: horizontalRulesStyle,
        noOfSections: noOfSections,
        stepHeight: stepHeight,
        yAxisLabelWidth: yAxisLabelWidth,
        yAxisLabelContainerStyle: yAxisLabelContainerStyle,
        yAxisThickness: yAxisThickness,
        yAxisColor: yAxisColor,
        yAxisExtraHeight: yAxisExtraHeight,
        trimYAxisAtTop: trimYAxisAtTop,
        xAxisThickness: xAxisThickness,
        xAxisColor: xAxisColor,
        xAxisLength: xAxisLength,
        xAxisType: xAxisType,
        dashWidth: dashWidth,
        dashGap: dashGap,
        backgroundColor: backgroundColor,
        hideRules: hideRules,
        rulesLength: rulesLength,
        rulesType: rulesType,
        rulesThickness: rulesThickness,
        rulesColor: rulesColor,
        rulesConfigArray: rulesConfigArray,
        spacing: spacing,
        showYAxisIndices: showYAxisIndices,
        yAxisIndicesHeight: yAxisIndicesHeight,
        yAxisIndicesWidth: yAxisIndicesWidth,
        yAxisIndicesColor: yAxisIndicesColor,
        hideOrigin: hideOrigin,
        hideYAxisText: hideYAxisText,
        showFractionalValues: showFractionalValues,
        yAxisTextNumberOfLines: yAxisTextNumberOfLines,
        yAxisLabelPrefix: yAxisLabelPrefix,
        yAxisLabelSuffix: yAxisLabelSuffix,
        yAxisTextStyle: yAxisTextStyle,
        rotateYAxisTexts: rotateYAxisTexts,
        rtl: rtl,
        containerHeight: containerHeight,
        overflowTop: overflowTop,
        maxValue: maxValue,
        referenceLinesConfig: referenceLinesConfig,
        yAxisLabelTexts: yAxisLabelTexts,
        yAxisOffset: yAxisOffset,
        horizontal: horizontal,
        yAxisAtTop: yAxisAtTop,
        stepValue: stepValue,
        roundToDigits: roundToDigits,
        secondaryData: secondaryData,
        secondaryYAxis: secondaryYAxis,
        formatYLabel: axesAndRulesProps.formatYLabel
    };
    var lineInBarChartProps = {
        yAxisLabelWidth: yAxisLabelWidth,
        initialSpacing: initialSpacing,
        spacing: spacing,
        containerHeight: containerHeight,
        lineConfig: lineConfig,
        maxValue: (_11 = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.maxValue) !== null && _11 !== void 0 ? _11 : maxValue,
        animatedWidth: animatedWidth,
        lineBehindBars: lineBehindBars,
        points: points,
        arrowPoints: arrowPoints,
        data: (lineData === null || lineData === void 0 ? void 0 : lineData.length) ? lineData : stackData !== null && stackData !== void 0 ? stackData : data,
        totalWidth: totalWidth,
        barWidth: barWidth,
        labelsExtraHeight: labelsExtraHeight,
        scrollEventThrottle: scrollEventThrottle,
        xAxisLabelsVerticalShift: xAxisLabelsVerticalShift
    };
    var lineInBarChartProps2 = __assign(__assign({}, lineInBarChartProps), { lineConfig: lineConfig2, points: points2, data: lineData2 });
    var extendedContainerHeight = containerHeight + overflowTop + 10;
    var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
    var verticalLinesProps = {
        verticalLinesAr: verticalLinesAr,
        verticalLinesSpacing: verticalLinesSpacing,
        spacing: (_12 = lineConfig === null || lineConfig === void 0 ? void 0 : lineConfig.spacing) !== null && _12 !== void 0 ? _12 : spacing,
        initialSpacing: initialSpacing,
        verticalLinesZIndex: verticalLinesZIndex,
        verticalLinesHeight: verticalLinesHeight,
        verticalLinesThickness: verticalLinesThickness,
        verticalLinesColor: verticalLinesColor,
        verticalLinesStrokeDashArray: verticalLinesStrokeDashArray,
        verticalLinesShift: verticalLinesShift,
        verticalLinesUptoDataPoint: verticalLinesUptoDataPoint,
        xAxisThickness: xAxisThickness,
        labelsExtraHeight: labelsExtraHeight,
        containerHeight: containerHeight,
        data: data,
        stackData: stackData,
        barWidth: barWidth,
        maxValue: maxValue,
        chartType: chartType,
        containerHeightIncludingBelowXAxis: containerHeightIncludingBelowXAxis,
        yAxisLabelWidth: yAxisLabelWidth,
        totalWidth: totalWidth,
        xAxisLabelsVerticalShift: xAxisLabelsVerticalShift
    };
    var actualContainerHeight = containerHeightIncludingBelowXAxis + labelsExtraHeight - 10;
    var actualContainerWidth = (width !== null && width !== void 0 ? width : totalWidth) + yAxisLabelWidth;
    /*******************************************************************************************************************************************/
    /** *************                                 horizontal chart related calculations                                   *******************/
    /*******************************************************************************************************************************************/
    var containerHeightIncludingXaxisLabels = actualContainerHeight + BarDefaults.labelsWidthForHorizontal;
    var difBwWidthHeight = actualContainerWidth - containerHeightIncludingXaxisLabels;
    var transformForHorizontal = [
        { rotate: rtl ? '-90deg' : '90deg' },
        {
            translateY: -shiftX + (rtl ? -difBwWidthHeight + 14 : difBwWidthHeight) / 2 - 20
        },
        {
            translateX: shiftY +
                (rtl
                    ? (props.width ? -98 - endSpacing : -75 - endSpacing) -
                        difBwWidthHeight
                    : props.width
                        ? difBwWidthHeight
                        : difBwWidthHeight - 40) /
                    2 +
                (yAxisAtTop ? (rtl ? (props.width ? 12 : 40) : 12) : 52)
        }
    ];
    var transformForHorizontalForReactJS = "rotate(".concat(rtl ? '-90deg' : '90deg', ")\n  translateY(").concat(-shiftX + (rtl ? -difBwWidthHeight + 14 : difBwWidthHeight) / 2 - 20, ")\n  translateX(").concat(shiftY +
        (rtl
            ? (props.width ? -98 - endSpacing : -75 - endSpacing) - difBwWidthHeight
            : props.width
                ? difBwWidthHeight
                : difBwWidthHeight - 40) /
            2 +
        (yAxisAtTop ? (rtl ? (props.width ? 12 : 40) : 12) : 52), ")");
    var _13 = __read(useState(false), 2), canMomentum = _13[0], setCanMomentum = _13[1];
    var isCloseToEnd = function (_a) {
        var layoutMeasurement = _a.layoutMeasurement, contentOffset = _a.contentOffset, contentSize = _a.contentSize;
        return isRTL
            ? contentOffset.x <= initialSpacing
            : layoutMeasurement.width + contentOffset.x >=
                contentSize.width - initialSpacing - endReachedOffset;
    };
    // const isCloseToStart = ({ layoutMeasurement, contentOffset }) => {
    //   return layoutMeasurement.width + contentOffset.x <= initialSpacing;
    // };
    var isCloseToStart = function (_a) {
        var layoutMeasurement = _a.layoutMeasurement, contentOffset = _a.contentOffset, contentSize = _a.contentSize;
        return isRTL
            ? layoutMeasurement.width + contentOffset.x >=
                contentSize.width - initialSpacing - endReachedOffset
            : contentOffset.x <= initialSpacing;
    };
    useEffect(function () {
        if (pointerConfig && getPointerProps) {
            getPointerProps({ pointerIndex: pointerIndex, pointerX: pointerX, pointerY: pointerY });
        }
    }, [pointerIndex, pointerX, pointerY]);
    return {
        containerHeightIncludingBelowXAxis: containerHeightIncludingBelowXAxis,
        xAxisLabelsVerticalShift: xAxisLabelsVerticalShift,
        trimYAxisAtTop: trimYAxisAtTop,
        yAxisExtraHeight: yAxisExtraHeight,
        overflowTop: overflowTop,
        xAxisLabelsHeight: xAxisLabelsHeight,
        xAxisTextNumberOfLines: xAxisTextNumberOfLines,
        actualContainerWidth: actualContainerWidth,
        transformForHorizontal: transformForHorizontal,
        transformForHorizontalForReactJS: transformForHorizontalForReactJS,
        horizSectionProps: horizSectionProps,
        referenceLinesOverChartContent: referenceLinesOverChartContent,
        setCanMomentum: setCanMomentum,
        isCloseToStart: isCloseToStart,
        isCloseToEnd: isCloseToEnd,
        canMomentum: canMomentum,
        yAxisAtTop: yAxisAtTop,
        yAxisThickness: yAxisThickness,
        yAxisSide: yAxisSide,
        showVerticalLines: showVerticalLines,
        verticalLinesProps: verticalLinesProps,
        lineInBarChartProps: lineInBarChartProps,
        lineInBarChartProps2: lineInBarChartProps2
    };
};
