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
import { useEffect, useMemo, useState } from 'react';
import { getArrowPoints, getAxesAndRulesProps, getExtendedContainerHeightWithPadding, getLineConfigForBarChart, getMaxValue, getMostNegativeValue, getNoOfSections, getSecondaryDataWithOffsetIncluded, getXForLineInBar, getYForLineInBar, maxAndMinUtil, svgPath } from '../utils';
import { AxesAndRulesDefaults, BarDefaults, chartTypes, defaultLineConfig, defaultPointerConfig } from '../utils/constants';
export var useBarChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
    var heightValue = props.heightValue, widthValue = props.widthValue, opacValue = props.opacValue, yAxisOffset = props.yAxisOffset, adjustToWidth = props.adjustToWidth, parentWidth = props.parentWidth, labelsDistanceFromXaxis = props.labelsDistanceFromXaxis, autoShiftLabelsForNegativeStacks = props.autoShiftLabelsForNegativeStacks, focusedBarIndex = props.focusedBarIndex, negativeStepValue = props.negativeStepValue, autoCenterTooltip = props.autoCenterTooltip;
    var _48 = __read(useState(''), 2), points = _48[0], setPoints = _48[1];
    var _49 = __read(useState(''), 2), points2 = _49[0], setPoints2 = _49[1];
    var _50 = __read(useState(''), 2), arrowPoints = _50[0], setArrowPoints = _50[1];
    var _51 = __read(useState(focusedBarIndex !== null && focusedBarIndex !== void 0 ? focusedBarIndex : -1), 2), selectedIndex = _51[0], setSelectedIndex = _51[1];
    var showLine = (_a = props.showLine) !== null && _a !== void 0 ? _a : BarDefaults.showLine;
    useEffect(function () {
        setSelectedIndex(focusedBarIndex !== null && focusedBarIndex !== void 0 ? focusedBarIndex : -1);
    }, [focusedBarIndex]);
    var data = useMemo(function () {
        if (!props.data) {
            return [];
        }
        if (yAxisOffset) {
            return props.data.map(function (item) {
                var _a;
                return (__assign(__assign({}, item), { value: ((_a = item.value) !== null && _a !== void 0 ? _a : 0) - (yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0) }));
            });
        }
        return props.data;
    }, [yAxisOffset, props.data]);
    var yAxisLabelWidth = (_b = props.yAxisLabelWidth) !== null && _b !== void 0 ? _b : (props.hideYAxisText
        ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
        : AxesAndRulesDefaults.yAxisLabelWidth);
    var autoComputedSectionWidth = props.initialSpacing !== undefined
        ? (parentWidth - yAxisLabelWidth) / data.length - props.initialSpacing
        : (parentWidth - yAxisLabelWidth) / (data.length + 0.5);
    var autoComputedBarWidth = autoComputedSectionWidth * 0.6;
    var defaultBarWidth = adjustToWidth
        ? autoComputedBarWidth
        : BarDefaults.barWidth;
    var barWidth = (_c = props.barWidth) !== null && _c !== void 0 ? _c : defaultBarWidth;
    var autoComputedSpacing = autoComputedSectionWidth * 0.4;
    var spacing = (_d = props.spacing) !== null && _d !== void 0 ? _d : (adjustToWidth ? autoComputedSpacing : BarDefaults.spacing);
    var initialSpacing = (_e = props.initialSpacing) !== null && _e !== void 0 ? _e : spacing;
    var endSpacing = (_f = props.endSpacing) !== null && _f !== void 0 ? _f : spacing;
    var showFractionalValues = (_g = props.showFractionalValues) !== null && _g !== void 0 ? _g : AxesAndRulesDefaults.showFractionalValues;
    var horizontal = (_h = props.horizontal) !== null && _h !== void 0 ? _h : BarDefaults.horizontal;
    var rtl = (_j = props.rtl) !== null && _j !== void 0 ? _j : BarDefaults.rtl;
    var yAxisAtTop = (_k = props.yAxisAtTop) !== null && _k !== void 0 ? _k : BarDefaults.yAxisAtTop;
    var intactTopLabel = (_l = props.intactTopLabel) !== null && _l !== void 0 ? _l : BarDefaults.intactTopLabel;
    var heightFromProps = horizontal ? props.width : props.height;
    var widthFromProps = horizontal ? props.height : props.width;
    var isAnimated = (_m = props.isAnimated) !== null && _m !== void 0 ? _m : BarDefaults.isAnimated;
    var animationDuration = (_o = props.animationDuration) !== null && _o !== void 0 ? _o : BarDefaults.animationDuration;
    var secondaryData = getSecondaryDataWithOffsetIncluded(props.secondaryData, props.secondaryYAxis);
    var lineData = useMemo(function () {
        var _a;
        if (!props.lineData) {
            return (_a = props.stackData) !== null && _a !== void 0 ? _a : data;
        }
        if (yAxisOffset) {
            return props.lineData.map(function (item) {
                var _a;
                return (__assign(__assign({}, item), { value: ((_a = item.value) !== null && _a !== void 0 ? _a : 0) - (yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0) }));
            });
        }
        return props.lineData;
    }, [yAxisOffset, props.lineData, data, props.stackData]);
    var lineData2 = props.lineData2;
    var lineBehindBars = (_p = props.lineBehindBars) !== null && _p !== void 0 ? _p : BarDefaults.lineBehindBars;
    defaultLineConfig.initialSpacing = initialSpacing;
    defaultLineConfig.endIndex = lineData.length - 1;
    defaultLineConfig.animationDuration = animationDuration;
    var lineConfig = props.lineConfig
        ? getLineConfigForBarChart(props.lineConfig, initialSpacing)
        : defaultLineConfig;
    var lineConfig2 = props.lineConfig2
        ? getLineConfigForBarChart(props.lineConfig2, initialSpacing)
        : defaultLineConfig;
    var noOfSections = getNoOfSections(props.noOfSections, props.maxValue, props.stepValue);
    var containerHeight = heightFromProps !== null && heightFromProps !== void 0 ? heightFromProps : (props.stepHeight
        ? props.stepHeight * noOfSections
        : AxesAndRulesDefaults.containerHeight);
    var horizSections = [{ value: '0' }];
    var stepHeight = (_q = props.stepHeight) !== null && _q !== void 0 ? _q : containerHeight / noOfSections;
    var labelWidth = (_r = props.labelWidth) !== null && _r !== void 0 ? _r : AxesAndRulesDefaults.labelWidth;
    var scrollToEnd = (_s = props.scrollToEnd) !== null && _s !== void 0 ? _s : BarDefaults.scrollToEnd;
    var scrollAnimation = (_t = props.scrollAnimation) !== null && _t !== void 0 ? _t : BarDefaults.scrollAnimation;
    var scrollEventThrottle = (_u = props.scrollEventThrottle) !== null && _u !== void 0 ? _u : BarDefaults.scrollEventThrottle;
    var labelsExtraHeight = (_v = props.labelsExtraHeight) !== null && _v !== void 0 ? _v : AxesAndRulesDefaults.labelsExtraHeight;
    var totalWidth = initialSpacing + endSpacing;
    var maxItem = 0;
    var minItem = 0;
    if (props.stackData) {
        props.stackData.forEach(function (stackItem, index) {
            var _a, _b, _c;
            var stackSumMax = stackItem.stacks.reduce(function (acc, stack) { return acc + (stack.value >= 0 ? stack.value : 0); }, 0);
            var stackSumMin = stackItem.stacks.reduce(function (acc, stack) { return acc + (stack.value < 0 ? stack.value : 0); }, 0);
            if (stackSumMax > maxItem) {
                maxItem = stackSumMax;
            }
            if (stackSumMin < minItem) {
                minItem = stackSumMin;
            }
            totalWidth +=
                ((_b = (_a = stackItem.stacks[0].barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : defaultBarWidth) +
                    (index === data.length - 1 ? 0 : (_c = stackItem.spacing) !== null && _c !== void 0 ? _c : spacing);
        });
    }
    else {
        data.forEach(function (item, index) {
            var _a, _b, _c;
            if (item.value > maxItem) {
                maxItem = item.value;
            }
            if (item.value < minItem) {
                minItem = item.value;
            }
            totalWidth +=
                ((_b = (_a = item.barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : defaultBarWidth) +
                    (index === data.length - 1 ? spacing : (_c = item.spacing) !== null && _c !== void 0 ? _c : spacing);
        });
    }
    var secondaryMaxItem = 0;
    var secondaryMinItem = 0;
    if (lineConfig.isSecondary) {
        lineData.forEach(function (item) {
            var _a, _b, _c, _d;
            if (((_a = item.value) !== null && _a !== void 0 ? _a : 0) > secondaryMaxItem) {
                secondaryMaxItem = (_b = item.value) !== null && _b !== void 0 ? _b : 0;
            }
            if (((_c = item.value) !== null && _c !== void 0 ? _c : 0) < secondaryMinItem) {
                secondaryMinItem = (_d = item.value) !== null && _d !== void 0 ? _d : 0;
            }
        });
    }
    var maxAndMin = maxAndMinUtil(maxItem, minItem, props.roundToDigits, props.showFractionalValues);
    var secondaryMaxAndMin = maxAndMinUtil(secondaryMaxItem, secondaryMinItem, props.roundToDigits, props.showFractionalValues);
    var maxValue = getMaxValue(props.maxValue, props.stepValue, noOfSections, maxAndMin.maxItem);
    var secondaryMaxValue = lineConfig.isSecondary
        ? typeof props.secondaryYAxis !== 'boolean'
            ? (_w = props.secondaryYAxis.maxValue) !== null && _w !== void 0 ? _w : secondaryMaxAndMin.maxItem
            : secondaryMaxAndMin.maxItem
        : maxValue;
    var mostNegativeValue = getMostNegativeValue(props.mostNegativeValue, props.negativeStepValue, props.noOfSectionsBelowXAxis, maxAndMin.minItem);
    var stepValue = (_x = props.stepValue) !== null && _x !== void 0 ? _x : maxValue / noOfSections;
    var noOfSectionsBelowXAxis = (_y = props.noOfSectionsBelowXAxis) !== null && _y !== void 0 ? _y : Math.round(Math.ceil(-mostNegativeValue / (negativeStepValue !== null && negativeStepValue !== void 0 ? negativeStepValue : stepValue)));
    var showScrollIndicator = (_z = props.showScrollIndicator) !== null && _z !== void 0 ? _z : BarDefaults.showScrollIndicator;
    var side = (_0 = props.side) !== null && _0 !== void 0 ? _0 : BarDefaults.side;
    var rotateLabel = (_1 = props.rotateLabel) !== null && _1 !== void 0 ? _1 : AxesAndRulesDefaults.rotateLabel;
    var opacity = (_2 = props.opacity) !== null && _2 !== void 0 ? _2 : BarDefaults.opacity;
    var isThreeD = (_3 = props.isThreeD) !== null && _3 !== void 0 ? _3 : BarDefaults.isThreeD;
    var showXAxisIndices = (_4 = props.showXAxisIndices) !== null && _4 !== void 0 ? _4 : AxesAndRulesDefaults.showXAxisIndices;
    var xAxisIndicesHeight = (_5 = props.xAxisIndicesHeight) !== null && _5 !== void 0 ? _5 : AxesAndRulesDefaults.xAxisIndicesHeight;
    var xAxisIndicesWidth = (_6 = props.xAxisIndicesWidth) !== null && _6 !== void 0 ? _6 : AxesAndRulesDefaults.xAxisIndicesWidth;
    var xAxisIndicesColor = (_7 = props.xAxisIndicesColor) !== null && _7 !== void 0 ? _7 : AxesAndRulesDefaults.xAxisIndicesColor;
    var xAxisThickness = (_8 = props.xAxisThickness) !== null && _8 !== void 0 ? _8 : AxesAndRulesDefaults.xAxisThickness;
    var xAxisTextNumberOfLines = (_9 = props.xAxisTextNumberOfLines) !== null && _9 !== void 0 ? _9 : AxesAndRulesDefaults.xAxisTextNumberOfLines;
    var xAxisLabelsVerticalShift = (_10 = props.xAxisLabelsVerticalShift) !== null && _10 !== void 0 ? _10 : AxesAndRulesDefaults.xAxisLabelsVerticalShift;
    var horizontalRulesStyle = props.horizontalRulesStyle;
    var autoShiftLabels = (_11 = props.autoShiftLabels) !== null && _11 !== void 0 ? _11 : false;
    var barBorderColor = (_12 = props.barBorderColor) !== null && _12 !== void 0 ? _12 : BarDefaults.barBorderColor;
    var extendedContainerHeight = getExtendedContainerHeightWithPadding(containerHeight, 0);
    var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
    var _52 = __read(useState(-1), 2), pointerIndex = _52[0], setPointerIndex = _52[1];
    var _53 = __read(useState(0), 2), pointerX = _53[0], setPointerX = _53[1];
    var _54 = __read(useState(0), 2), pointerY = _54[0], setPointerY = _54[1];
    var _55 = __read(useState(), 2), pointerItem = _55[0], setPointerItem = _55[1];
    var _56 = __read(useState(0), 2), responderStartTime = _56[0], setResponderStartTime = _56[1];
    var _57 = __read(useState(false), 2), responderActive = _57[0], setResponderActive = _57[1];
    var pointerConfig = props.pointerConfig;
    var getPointerProps = (_13 = props.getPointerProps) !== null && _13 !== void 0 ? _13 : null;
    var pointerHeight = (_14 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.height) !== null && _14 !== void 0 ? _14 : defaultPointerConfig.height;
    var pointerWidth = (_15 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.width) !== null && _15 !== void 0 ? _15 : defaultPointerConfig.width;
    var pointerRadius = (_16 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.radius) !== null && _16 !== void 0 ? _16 : defaultPointerConfig.radius;
    var pointerColor = (_17 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerColor) !== null && _17 !== void 0 ? _17 : defaultPointerConfig.pointerColor;
    var pointerComponent = (_18 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerComponent) !== null && _18 !== void 0 ? _18 : defaultPointerConfig.pointerComponent;
    var showPointerStrip = (pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.showPointerStrip) === false
        ? false
        : defaultPointerConfig.showPointerStrip;
    var pointerStripHeight = (_19 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripHeight) !== null && _19 !== void 0 ? _19 : defaultPointerConfig.pointerStripHeight;
    var pointerStripWidth = (_20 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripWidth) !== null && _20 !== void 0 ? _20 : defaultPointerConfig.pointerStripWidth;
    var pointerStripColor = (_21 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripColor) !== null && _21 !== void 0 ? _21 : defaultPointerConfig.pointerStripColor;
    var pointerStripUptoDataPoint = (_22 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripUptoDataPoint) !== null && _22 !== void 0 ? _22 : defaultPointerConfig.pointerStripUptoDataPoint;
    var pointerLabelComponent = (_23 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelComponent) !== null && _23 !== void 0 ? _23 : defaultPointerConfig.pointerLabelComponent;
    var stripOverPointer = (_24 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripOverPointer) !== null && _24 !== void 0 ? _24 : defaultPointerConfig.stripOverPointer;
    var shiftPointerLabelX = (_25 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelX) !== null && _25 !== void 0 ? _25 : defaultPointerConfig.shiftPointerLabelX;
    var shiftPointerLabelY = (_26 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelY) !== null && _26 !== void 0 ? _26 : defaultPointerConfig.shiftPointerLabelY;
    var pointerLabelWidth = (_27 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelWidth) !== null && _27 !== void 0 ? _27 : defaultPointerConfig.pointerLabelWidth;
    var pointerLabelHeight = (_28 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelHeight) !== null && _28 !== void 0 ? _28 : defaultPointerConfig.pointerLabelHeight;
    var autoAdjustPointerLabelPosition = (_29 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.autoAdjustPointerLabelPosition) !== null && _29 !== void 0 ? _29 : defaultPointerConfig.autoAdjustPointerLabelPosition;
    var pointerVanishDelay = (_30 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerVanishDelay) !== null && _30 !== void 0 ? _30 : defaultPointerConfig.pointerVanishDelay;
    var activatePointersOnLongPress = (_31 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersOnLongPress) !== null && _31 !== void 0 ? _31 : defaultPointerConfig.activatePointersOnLongPress;
    var activatePointersDelay = (_32 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersDelay) !== null && _32 !== void 0 ? _32 : defaultPointerConfig.activatePointersDelay;
    var initialPointerIndex = (_33 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerIndex) !== null && _33 !== void 0 ? _33 : defaultPointerConfig.initialPointerIndex;
    var initialPointerAppearDelay = (_34 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerAppearDelay) !== null && _34 !== void 0 ? _34 : (isAnimated
        ? animationDuration
        : defaultPointerConfig.initialPointerAppearDelay);
    var persistPointer = (_35 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.persistPointer) !== null && _35 !== void 0 ? _35 : defaultPointerConfig.persistPointer;
    var hidePointer1 = (_36 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer1) !== null && _36 !== void 0 ? _36 : defaultPointerConfig.hidePointer1;
    var pointerEvents = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerEvents;
    var stripBehindBars = (_37 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripBehindBars) !== null && _37 !== void 0 ? _37 : defaultPointerConfig.stripBehindBars;
    var disableScroll = (_38 = props.disableScroll) !== null && _38 !== void 0 ? _38 : (pointerConfig
        ? activatePointersOnLongPress
            ? !!responderActive
            : true
        : false);
    var yAxisExtraHeightAtTop = props.trimYAxisAtTop
        ? 0
        : (_39 = props.yAxisExtraHeight) !== null && _39 !== void 0 ? _39 : containerHeight / 20;
    var barInnerComponent = props.barInnerComponent;
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        if (showLine) {
            var pp = '';
            var pp2 = '';
            var firstBarWidth = (_d = (_c = (_b = ((_a = props.stackData) !== null && _a !== void 0 ? _a : data)) === null || _b === void 0 ? void 0 : _b[0].barWidth) !== null && _c !== void 0 ? _c : props.barWidth) !== null && _d !== void 0 ? _d : 30;
            if (!lineConfig.curved) {
                for (var i = 0; i < lineData.length; i++) {
                    if (i < ((_e = lineConfig.startIndex) !== null && _e !== void 0 ? _e : 0) ||
                        i > ((_f = lineConfig.endIndex) !== null && _f !== void 0 ? _f : 0)) {
                        continue;
                    }
                    var currentBarWidth = (_j = (_h = (_g = data === null || data === void 0 ? void 0 : data[i]) === null || _g === void 0 ? void 0 : _g.barWidth) !== null && _h !== void 0 ? _h : props.barWidth) !== null && _j !== void 0 ? _j : defaultBarWidth;
                    var currentValue = props.lineData
                        ? props.lineData[i].value
                        : props.stackData
                            ? props.stackData[i].stacks.reduce(function (total, item) { return total + item.value; }, 0)
                            : data[i].value;
                    pp +=
                        'L' +
                            getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig, spacing) +
                            ' ' +
                            getYForLineInBar(currentValue, lineConfig.shiftY, containerHeight, lineConfig.isSecondary ? secondaryMaxValue : maxValue) +
                            ' ';
                }
                setPoints(pp.replace('L', 'M'));
                if (lineData.length > 1 && lineConfig.showArrow) {
                    var ppArray = pp.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints_1 = getArrowPoints(arrowTipX, arrowTipY, x1, y1, (_k = lineConfig.arrowConfig) === null || _k === void 0 ? void 0 : _k.length, (_l = lineConfig.arrowConfig) === null || _l === void 0 ? void 0 : _l.width, (_m = lineConfig.arrowConfig) === null || _m === void 0 ? void 0 : _m.showArrowBase);
                    setArrowPoints(arrowPoints_1);
                }
            }
            else {
                var p1Array = [];
                for (var i = 0; i < lineData.length; i++) {
                    if (i < ((_o = lineConfig.startIndex) !== null && _o !== void 0 ? _o : 0) ||
                        i > ((_p = lineConfig.endIndex) !== null && _p !== void 0 ? _p : 0)) {
                        continue;
                    }
                    var currentBarWidth = (_s = (_r = (_q = data === null || data === void 0 ? void 0 : data[i]) === null || _q === void 0 ? void 0 : _q.barWidth) !== null && _r !== void 0 ? _r : props.barWidth) !== null && _s !== void 0 ? _s : defaultBarWidth;
                    var currentValue = props.lineData
                        ? props.lineData[i].value
                        : props.stackData
                            ? props.stackData[i].stacks.reduce(function (total, item) { return total + item.value; }, 0)
                            : data[i].value;
                    p1Array.push([
                        getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig, spacing),
                        getYForLineInBar(currentValue, lineConfig.shiftY, containerHeight, lineConfig.isSecondary ? secondaryMaxValue : maxValue)
                    ]);
                    var xx = svgPath(p1Array, lineConfig.curveType, lineConfig.curvature);
                    setPoints(xx);
                }
            }
            if (lineData2 === null || lineData2 === void 0 ? void 0 : lineData2.length) {
                if (!(lineConfig2 === null || lineConfig2 === void 0 ? void 0 : lineConfig2.curved)) {
                    for (var i = 0; i < lineData2.length; i++) {
                        if (i < ((_t = lineConfig2.startIndex) !== null && _t !== void 0 ? _t : 0) ||
                            i > ((_u = lineConfig2.endIndex) !== null && _u !== void 0 ? _u : 0)) {
                            continue;
                        }
                        var currentBarWidth = (_x = (_w = (_v = data === null || data === void 0 ? void 0 : data[i]) === null || _v === void 0 ? void 0 : _v.barWidth) !== null && _w !== void 0 ? _w : props.barWidth) !== null && _x !== void 0 ? _x : defaultBarWidth;
                        var currentValue = lineData2[i].value;
                        pp2 +=
                            'L' +
                                getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig2, spacing) +
                                ' ' +
                                getYForLineInBar(currentValue, lineConfig2.shiftY, containerHeight, lineConfig2.isSecondary ? secondaryMaxValue : maxValue) +
                                ' ';
                    }
                    setPoints2(pp2.replace('L', 'M'));
                }
                else {
                    var p2Array = [];
                    for (var i = 0; i < lineData2.length; i++) {
                        if (i < ((_y = lineConfig2.startIndex) !== null && _y !== void 0 ? _y : 0) ||
                            i > ((_z = lineConfig2.endIndex) !== null && _z !== void 0 ? _z : 0)) {
                            continue;
                        }
                        var currentBarWidth = (_2 = (_1 = (_0 = data === null || data === void 0 ? void 0 : data[i]) === null || _0 === void 0 ? void 0 : _0.barWidth) !== null && _1 !== void 0 ? _1 : props.barWidth) !== null && _2 !== void 0 ? _2 : defaultBarWidth;
                        var currentValue = lineData2[i].value;
                        p2Array.push([
                            getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig2, spacing),
                            getYForLineInBar(currentValue, lineConfig2.shiftY, containerHeight, lineConfig2.isSecondary ? secondaryMaxValue : maxValue)
                        ]);
                        var xx = svgPath(p2Array, lineConfig2.curveType, lineConfig2.curvature);
                        setPoints2(xx);
                    }
                }
            }
        }
    }, [
        animationDuration,
        containerHeight,
        data,
        lineData,
        initialSpacing,
        lineConfig.initialSpacing,
        lineConfig.curved,
        lineConfig.dataPointsWidth,
        lineConfig.shiftY,
        lineConfig.isAnimated,
        lineConfig.delay,
        lineConfig.startIndex,
        lineConfig.endIndex,
        maxValue,
        props.barWidth,
        showLine,
        spacing,
        yAxisLabelWidth,
        lineConfig.showArrow,
        (_40 = lineConfig.arrowConfig) === null || _40 === void 0 ? void 0 : _40.length,
        (_41 = lineConfig.arrowConfig) === null || _41 === void 0 ? void 0 : _41.width,
        (_42 = lineConfig.arrowConfig) === null || _42 === void 0 ? void 0 : _42.showArrowBase
    ]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (initialPointerIndex !== -1) {
            var item_1 = (_b = ((_a = props.stackData) !== null && _a !== void 0 ? _a : data)) === null || _b === void 0 ? void 0 : _b[initialPointerIndex];
            var stackItem = (_c = props.stackData) === null || _c === void 0 ? void 0 : _c[initialPointerIndex];
            var stackSum = (_d = stackItem === null || stackItem === void 0 ? void 0 : stackItem.stacks) === null || _d === void 0 ? void 0 : _d.reduce(function (acc, stack) { var _a; return acc + ((_a = stack.value) !== null && _a !== void 0 ? _a : 0); }, 0);
            var x_1 = initialSpacing +
                (spacing + barWidth) * initialPointerIndex -
                (pointerRadius !== null && pointerRadius !== void 0 ? pointerRadius : pointerWidth / 2) +
                barWidth / 2;
            var y_1 = containerHeight -
                ((stackSum !== null && stackSum !== void 0 ? stackSum : data[initialPointerIndex].value) * containerHeight) /
                    maxValue -
                (pointerRadius !== null && pointerRadius !== void 0 ? pointerRadius : pointerHeight / 2) +
                10;
            if (initialPointerAppearDelay) {
                setTimeout(function () {
                    setPointerConfig(initialPointerIndex, item_1, x_1, y_1);
                }, initialPointerAppearDelay);
            }
            else {
                setPointerConfig(initialPointerIndex, item_1, x_1, y_1);
            }
        }
    }, []);
    var setPointerConfig = function (initialPointerIndex, item, x, y) {
        setPointerIndex(initialPointerIndex);
        setPointerItem(item);
        setPointerX(x);
        setPointerY(y);
    };
    var animatedHeight = heightValue === null || heightValue === void 0 ? void 0 : heightValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });
    var appearingOpacity = opacValue === null || opacValue === void 0 ? void 0 : opacValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    var animatedWidth = widthValue === null || widthValue === void 0 ? void 0 : widthValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, initialSpacing + totalWidth]
    });
    var getPropsCommonForBarAndStack = function (item, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return {
            item: item,
            index: index,
            containerHeight: containerHeight,
            maxValue: maxValue,
            spacing: (_a = item.spacing) !== null && _a !== void 0 ? _a : spacing,
            propSpacing: spacing,
            xAxisThickness: xAxisThickness,
            barWidth: (_b = props.barWidth) !== null && _b !== void 0 ? _b : defaultBarWidth,
            opacity: opacity,
            disablePress: (_c = item.disablePress) !== null && _c !== void 0 ? _c : props.disablePress,
            rotateLabel: rotateLabel,
            showXAxisIndices: showXAxisIndices,
            xAxisIndicesHeight: xAxisIndicesHeight,
            xAxisIndicesWidth: xAxisIndicesWidth,
            xAxisIndicesColor: xAxisIndicesColor,
            labelsDistanceFromXaxis: (_d = item.labelsDistanceFromXaxis) !== null && _d !== void 0 ? _d : labelsDistanceFromXaxis,
            horizontal: horizontal,
            rtl: rtl,
            intactTopLabel: intactTopLabel,
            showValuesAsTopLabel: props.showValuesAsTopLabel,
            topLabelContainerStyle: props.topLabelContainerStyle,
            topLabelTextStyle: props.topLabelTextStyle,
            barBorderWidth: props.barBorderWidth,
            barBorderColor: barBorderColor,
            barBorderRadius: props.barBorderRadius,
            barBorderTopLeftRadius: props.barBorderTopLeftRadius,
            barBorderTopRightRadius: props.barBorderTopRightRadius,
            barBorderBottomLeftRadius: props.barBorderBottomLeftRadius,
            barBorderBottomRightRadius: props.barBorderBottomRightRadius,
            barInnerComponent: barInnerComponent,
            color: props.color,
            showGradient: props.showGradient,
            gradientColor: props.gradientColor,
            barBackgroundPattern: props.barBackgroundPattern,
            patternId: props.patternId,
            onPress: props.onPress,
            onLongPress: props.onLongPress,
            onPressOut: props.onPressOut,
            focusBarOnPress: props.focusBarOnPress,
            focusedBarConfig: props.focusedBarConfig,
            xAxisTextNumberOfLines: xAxisTextNumberOfLines,
            xAxisLabelsHeight: props.xAxisLabelsHeight,
            xAxisLabelsVerticalShift: xAxisLabelsVerticalShift,
            renderTooltip: props.renderTooltip,
            leftShiftForTooltip: (_e = props.leftShiftForTooltip) !== null && _e !== void 0 ? _e : 0,
            autoCenterTooltip: autoCenterTooltip,
            initialSpacing: initialSpacing,
            selectedIndex: selectedIndex,
            setSelectedIndex: setSelectedIndex,
            activeOpacity: (_f = props.activeOpacity) !== null && _f !== void 0 ? _f : 0.2,
            noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
            leftShiftForLastIndexTooltip: (_g = props.leftShiftForLastIndexTooltip) !== null && _g !== void 0 ? _g : 0,
            label: (_h = item.label) !== null && _h !== void 0 ? _h : (((_j = props.xAxisLabelTexts) === null || _j === void 0 ? void 0 : _j[index]) ? props.xAxisLabelTexts[index] : ''),
            secondaryLabel: (_o = (_k = item.secondaryLabel) !== null && _k !== void 0 ? _k : (_m = (_l = props.secondaryXAxis) === null || _l === void 0 ? void 0 : _l.labelTexts) === null || _m === void 0 ? void 0 : _m[index]) !== null && _o !== void 0 ? _o : '',
            labelTextStyle: (_p = item.labelTextStyle) !== null && _p !== void 0 ? _p : props.xAxisLabelTextStyle,
            secondaryLabelTextStyle: (_t = (_s = (_q = item.secondaryLabelTextStyle) !== null && _q !== void 0 ? _q : (_r = props.secondaryXAxis) === null || _r === void 0 ? void 0 : _r.labelsTextStyle) !== null && _s !== void 0 ? _s : item.labelTextStyle) !== null && _t !== void 0 ? _t : props.xAxisLabelTextStyle,
            pointerConfig: pointerConfig,
            yAxisExtraHeightAtTop: yAxisExtraHeightAtTop,
            yAxisOffset: yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0,
            focusedBarIndex: focusedBarIndex,
            stepHeight: stepHeight,
            stepValue: stepValue,
            negativeStepHeight: (_u = props.negativeStepHeight) !== null && _u !== void 0 ? _u : stepHeight,
            negativeStepValue: (_v = props.negativeStepValue) !== null && _v !== void 0 ? _v : stepValue,
            secondaryXAxis: props.secondaryXAxis
        };
    };
    var barAndLineChartsWrapperProps = {
        chartType: chartTypes.BAR,
        containerHeight: containerHeight,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        stepHeight: stepHeight,
        negativeStepHeight: (_43 = props.negativeStepHeight) !== null && _43 !== void 0 ? _43 : stepHeight,
        labelsExtraHeight: labelsExtraHeight,
        yAxisLabelWidth: yAxisLabelWidth,
        horizontal: horizontal,
        rtl: rtl,
        shiftX: (_44 = props.shiftX) !== null && _44 !== void 0 ? _44 : 0,
        shiftY: (_45 = props.shiftY) !== null && _45 !== void 0 ? _45 : 0,
        yAxisAtTop: yAxisAtTop,
        initialSpacing: initialSpacing,
        data: data,
        stackData: props.stackData,
        secondaryData: secondaryData,
        barWidth: (_46 = props.barWidth) !== null && _46 !== void 0 ? _46 : defaultBarWidth,
        xAxisThickness: xAxisThickness,
        totalWidth: totalWidth,
        disableScroll: disableScroll,
        showScrollIndicator: showScrollIndicator,
        scrollToEnd: scrollToEnd,
        scrollToIndex: props.scrollToIndex,
        scrollAnimation: scrollAnimation,
        scrollEventThrottle: scrollEventThrottle,
        indicatorColor: props.indicatorColor,
        setSelectedIndex: setSelectedIndex,
        spacing: spacing,
        showLine: showLine,
        lineConfig: lineConfig,
        lineConfig2: lineConfig2,
        maxValue: maxValue,
        lineData: lineData,
        lineData2: lineData2,
        animatedWidth: animatedWidth,
        lineBehindBars: lineBehindBars,
        points: points,
        points2: points2,
        arrowPoints: arrowPoints,
        // horizSectionProps-
        width: widthFromProps,
        horizSections: horizSections,
        endSpacing: endSpacing,
        horizontalRulesStyle: horizontalRulesStyle,
        noOfSections: noOfSections,
        sectionColors: props.sectionColors,
        showFractionalValues: showFractionalValues,
        axesAndRulesProps: getAxesAndRulesProps(props, stepValue, negativeStepValue, secondaryMaxValue),
        yAxisLabelTexts: props.yAxisLabelTexts,
        yAxisOffset: yAxisOffset,
        rotateYAxisTexts: props.rotateYAxisTexts,
        hideAxesAndRules: props.hideAxesAndRules,
        showXAxisIndices: showXAxisIndices,
        xAxisIndicesHeight: xAxisIndicesHeight,
        xAxisIndicesWidth: xAxisIndicesWidth,
        xAxisIndicesColor: xAxisIndicesColor,
        // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        pointerConfig: pointerConfig,
        getPointerProps: getPointerProps,
        pointerIndex: pointerIndex,
        pointerX: pointerX,
        pointerY: pointerY,
        onEndReached: props.onEndReached,
        onStartReached: props.onStartReached,
        endReachedOffset: (_47 = props.endReachedOffset) !== null && _47 !== void 0 ? _47 : BarDefaults.endReachedOffset,
        onMomentumScrollEnd: props.onMomentumScrollEnd
    };
    return {
        lineConfig: lineConfig,
        hidePointer1: hidePointer1,
        pointerItem: pointerItem,
        pointerY: pointerY,
        pointerConfig: pointerConfig,
        pointerColor: pointerColor,
        pointerX: pointerX,
        pointerComponent: pointerComponent,
        pointerHeight: pointerHeight,
        pointerRadius: pointerRadius,
        pointerWidth: pointerWidth,
        autoAdjustPointerLabelPosition: autoAdjustPointerLabelPosition,
        pointerLabelWidth: pointerLabelWidth,
        activatePointersOnLongPress: activatePointersOnLongPress,
        yAxisLabelWidth: yAxisLabelWidth,
        shiftPointerLabelX: shiftPointerLabelX,
        pointerLabelHeight: pointerLabelHeight,
        pointerStripUptoDataPoint: pointerStripUptoDataPoint,
        pointerStripHeight: pointerStripHeight,
        shiftPointerLabelY: shiftPointerLabelY,
        showPointerStrip: showPointerStrip,
        pointerStripWidth: pointerStripWidth,
        containerHeight: containerHeight,
        xAxisThickness: xAxisThickness,
        pointerStripColor: pointerStripColor,
        pointerEvents: pointerEvents,
        setResponderStartTime: setResponderStartTime,
        setPointerY: setPointerY,
        setPointerItem: setPointerItem,
        initialSpacing: initialSpacing,
        spacing: spacing,
        data: data,
        barWidth: barWidth,
        setPointerX: setPointerX,
        setPointerIndex: setPointerIndex,
        maxValue: maxValue,
        maxItem: maxItem,
        responderStartTime: responderStartTime,
        responderActive: responderActive,
        setResponderActive: setResponderActive,
        activatePointersDelay: activatePointersDelay,
        persistPointer: persistPointer,
        pointerVanishDelay: pointerVanishDelay,
        containerHeightIncludingBelowXAxis: containerHeightIncludingBelowXAxis,
        extendedContainerHeight: extendedContainerHeight,
        totalWidth: totalWidth,
        stripBehindBars: stripBehindBars,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        stepHeight: stepHeight,
        xAxisLabelsVerticalShift: xAxisLabelsVerticalShift,
        labelsExtraHeight: labelsExtraHeight,
        stripOverPointer: stripOverPointer,
        pointerLabelComponent: pointerLabelComponent,
        opacity: opacity,
        rotateLabel: rotateLabel,
        showXAxisIndices: showXAxisIndices,
        xAxisIndicesHeight: xAxisIndicesHeight,
        xAxisIndicesWidth: xAxisIndicesWidth,
        xAxisIndicesColor: xAxisIndicesColor,
        autoShiftLabelsForNegativeStacks: autoShiftLabelsForNegativeStacks,
        horizontal: horizontal,
        rtl: rtl,
        intactTopLabel: intactTopLabel,
        barBorderColor: barBorderColor,
        barInnerComponent: barInnerComponent,
        xAxisTextNumberOfLines: xAxisTextNumberOfLines,
        selectedIndex: selectedIndex,
        setSelectedIndex: setSelectedIndex,
        isAnimated: isAnimated,
        animationDuration: animationDuration,
        side: side,
        labelWidth: labelWidth,
        isThreeD: isThreeD,
        animatedHeight: animatedHeight,
        appearingOpacity: appearingOpacity,
        autoShiftLabels: autoShiftLabels,
        yAxisAtTop: yAxisAtTop,
        secondaryData: secondaryData,
        disableScroll: disableScroll,
        showScrollIndicator: showScrollIndicator,
        scrollToEnd: scrollToEnd,
        scrollAnimation: scrollAnimation,
        scrollEventThrottle: scrollEventThrottle,
        showLine: showLine,
        lineConfig2: lineConfig2,
        lineData: lineData,
        lineData2: lineData2,
        animatedWidth: animatedWidth,
        lineBehindBars: lineBehindBars,
        points: points,
        setPoints: setPoints,
        points2: points2,
        setPoints2: setPoints2,
        arrowPoints: arrowPoints,
        setArrowPoints: setArrowPoints,
        horizSections: horizSections,
        endSpacing: endSpacing,
        horizontalRulesStyle: horizontalRulesStyle,
        noOfSections: noOfSections,
        showFractionalValues: showFractionalValues,
        widthFromProps: widthFromProps,
        stepValue: stepValue,
        secondaryMaxValue: secondaryMaxValue,
        getPointerProps: getPointerProps,
        pointerIndex: pointerIndex,
        getPropsCommonForBarAndStack: getPropsCommonForBarAndStack,
        barAndLineChartsWrapperProps: barAndLineChartsWrapperProps,
        yAxisExtraHeightAtTop: yAxisExtraHeightAtTop
    };
};
