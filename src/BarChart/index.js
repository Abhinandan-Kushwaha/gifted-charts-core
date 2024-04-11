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
import { getArrowPoints, getAxesAndRulesProps, getExtendedContainerHeightWithPadding, getLineConfigForBarChart, getMaxValue, getNoOfSections, getSecondaryDataWithOffsetIncluded, getXForLineInBar, getYForLineInBar, maxAndMinUtil, svgPath } from '../utils';
import { AxesAndRulesDefaults, BarDefaults, chartTypes, defaultLineConfig, defaultPointerConfig } from '../utils/constants';
export var useBarChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46;
    var heightValue = props.heightValue, widthValue = props.widthValue, opacValue = props.opacValue, yAxisOffset = props.yAxisOffset;
    var _47 = __read(useState(''), 2), points = _47[0], setPoints = _47[1];
    var _48 = __read(useState(''), 2), points2 = _48[0], setPoints2 = _48[1];
    var _49 = __read(useState(''), 2), arrowPoints = _49[0], setArrowPoints = _49[1];
    var _50 = __read(useState(-1), 2), selectedIndex = _50[0], setSelectedIndex = _50[1];
    var showLine = (_a = props.showLine) !== null && _a !== void 0 ? _a : BarDefaults.showLine;
    var spacing = (_b = props.spacing) !== null && _b !== void 0 ? _b : BarDefaults.spacing;
    var initialSpacing = (_c = props.initialSpacing) !== null && _c !== void 0 ? _c : spacing;
    var endSpacing = (_d = props.endSpacing) !== null && _d !== void 0 ? _d : spacing;
    var showFractionalValues = (_e = props.showFractionalValues) !== null && _e !== void 0 ? _e : AxesAndRulesDefaults.showFractionalValues;
    var horizontal = (_f = props.horizontal) !== null && _f !== void 0 ? _f : BarDefaults.horizontal;
    var rtl = (_g = props.rtl) !== null && _g !== void 0 ? _g : BarDefaults.rtl;
    var yAxisAtTop = (_h = props.yAxisAtTop) !== null && _h !== void 0 ? _h : BarDefaults.yAxisAtTop;
    var intactTopLabel = (_j = props.intactTopLabel) !== null && _j !== void 0 ? _j : BarDefaults.intactTopLabel;
    var heightFromProps = horizontal ? props.width : props.height;
    var widthFromProps = horizontal ? props.height : props.width;
    var isAnimated = (_k = props.isAnimated) !== null && _k !== void 0 ? _k : BarDefaults.isAnimated;
    var animationDuration = (_l = props.animationDuration) !== null && _l !== void 0 ? _l : BarDefaults.animationDuration;
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
    var lineBehindBars = (_m = props.lineBehindBars) !== null && _m !== void 0 ? _m : BarDefaults.lineBehindBars;
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
    var stepHeight = (_o = props.stepHeight) !== null && _o !== void 0 ? _o : containerHeight / noOfSections;
    var labelWidth = (_p = props.labelWidth) !== null && _p !== void 0 ? _p : AxesAndRulesDefaults.labelWidth;
    var scrollToEnd = (_q = props.scrollToEnd) !== null && _q !== void 0 ? _q : BarDefaults.scrollToEnd;
    var scrollAnimation = (_r = props.scrollAnimation) !== null && _r !== void 0 ? _r : BarDefaults.scrollAnimation;
    var scrollEventThrottle = (_s = props.scrollEventThrottle) !== null && _s !== void 0 ? _s : BarDefaults.scrollEventThrottle;
    var labelsExtraHeight = (_t = props.labelsExtraHeight) !== null && _t !== void 0 ? _t : AxesAndRulesDefaults.labelsExtraHeight;
    var totalWidth = initialSpacing;
    var maxItem = 0;
    var minItem = 0;
    if (props.stackData) {
        props.stackData.forEach(function (stackItem) {
            var _a, _b;
            var stackSumMax = stackItem.stacks.reduce(function (acc, stack) { return acc + (stack.value >= 0 ? stack.value : 0); }, 0);
            var stackSumMin = stackItem.stacks.reduce(function (acc, stack) { return acc + (stack.value < 0 ? stack.value : 0); }, 0);
            if (stackSumMax > maxItem) {
                maxItem = stackSumMax;
            }
            if (stackSumMin < minItem) {
                minItem = stackSumMin;
            }
            totalWidth +=
                ((_b = (_a = stackItem.stacks[0].barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : BarDefaults.barWidth) + spacing;
        });
    }
    else {
        data.forEach(function (item) {
            var _a, _b, _c;
            if (item.value > maxItem) {
                maxItem = item.value;
            }
            if (item.value < minItem) {
                minItem = item.value;
            }
            totalWidth +=
                ((_b = (_a = item.barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : BarDefaults.barWidth) +
                    ((_c = item.spacing) !== null && _c !== void 0 ? _c : spacing);
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
        ? secondaryMaxAndMin.maxItem
        : maxValue;
    var mostNegativeValue = (_u = props.mostNegativeValue) !== null && _u !== void 0 ? _u : maxAndMin.minItem;
    var stepValue = (_v = props.stepValue) !== null && _v !== void 0 ? _v : maxValue / noOfSections;
    var noOfSectionsBelowXAxis = (_w = props.noOfSectionsBelowXAxis) !== null && _w !== void 0 ? _w : -mostNegativeValue / stepValue;
    var showScrollIndicator = (_x = props.showScrollIndicator) !== null && _x !== void 0 ? _x : BarDefaults.showScrollIndicator;
    var side = (_y = props.side) !== null && _y !== void 0 ? _y : BarDefaults.side;
    var rotateLabel = (_z = props.rotateLabel) !== null && _z !== void 0 ? _z : AxesAndRulesDefaults.rotateLabel;
    var opacity = (_0 = props.opacity) !== null && _0 !== void 0 ? _0 : BarDefaults.opacity;
    var isThreeD = (_1 = props.isThreeD) !== null && _1 !== void 0 ? _1 : BarDefaults.isThreeD;
    var showXAxisIndices = (_2 = props.showXAxisIndices) !== null && _2 !== void 0 ? _2 : AxesAndRulesDefaults.showXAxisIndices;
    var xAxisIndicesHeight = (_3 = props.xAxisIndicesHeight) !== null && _3 !== void 0 ? _3 : AxesAndRulesDefaults.xAxisIndicesHeight;
    var xAxisIndicesWidth = (_4 = props.xAxisIndicesWidth) !== null && _4 !== void 0 ? _4 : AxesAndRulesDefaults.xAxisIndicesWidth;
    var xAxisIndicesColor = (_5 = props.xAxisIndicesColor) !== null && _5 !== void 0 ? _5 : AxesAndRulesDefaults.xAxisIndicesColor;
    var xAxisThickness = (_6 = props.xAxisThickness) !== null && _6 !== void 0 ? _6 : AxesAndRulesDefaults.xAxisThickness;
    var xAxisTextNumberOfLines = (_7 = props.xAxisTextNumberOfLines) !== null && _7 !== void 0 ? _7 : AxesAndRulesDefaults.xAxisTextNumberOfLines;
    var xAxisLabelsVerticalShift = (_8 = props.xAxisLabelsVerticalShift) !== null && _8 !== void 0 ? _8 : AxesAndRulesDefaults.xAxisLabelsVerticalShift;
    var horizontalRulesStyle = props.horizontalRulesStyle;
    var yAxisLabelWidth = (_9 = props.yAxisLabelWidth) !== null && _9 !== void 0 ? _9 : (props.hideYAxisText
        ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
        : AxesAndRulesDefaults.yAxisLabelWidth);
    var autoShiftLabels = (_10 = props.autoShiftLabels) !== null && _10 !== void 0 ? _10 : false;
    var barWidth = (_11 = props.barWidth) !== null && _11 !== void 0 ? _11 : BarDefaults.barWidth;
    var barBorderColor = (_12 = props.barBorderColor) !== null && _12 !== void 0 ? _12 : BarDefaults.barBorderColor;
    var extendedContainerHeight = getExtendedContainerHeightWithPadding(containerHeight, 0);
    var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
    var _51 = __read(useState(-1), 2), pointerIndex = _51[0], setPointerIndex = _51[1];
    var _52 = __read(useState(0), 2), pointerX = _52[0], setPointerX = _52[1];
    var _53 = __read(useState(0), 2), pointerY = _53[0], setPointerY = _53[1];
    var _54 = __read(useState(), 2), pointerItem = _54[0], setPointerItem = _54[1];
    var _55 = __read(useState(0), 2), responderStartTime = _55[0], setResponderStartTime = _55[1];
    var _56 = __read(useState(false), 2), responderActive = _56[0], setResponderActive = _56[1];
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
                    var currentBarWidth = (_j = (_h = (_g = data === null || data === void 0 ? void 0 : data[i]) === null || _g === void 0 ? void 0 : _g.barWidth) !== null && _h !== void 0 ? _h : props.barWidth) !== null && _j !== void 0 ? _j : BarDefaults.barWidth;
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
                    var currentBarWidth = (_s = (_r = (_q = data === null || data === void 0 ? void 0 : data[i]) === null || _q === void 0 ? void 0 : _q.barWidth) !== null && _r !== void 0 ? _r : props.barWidth) !== null && _s !== void 0 ? _s : BarDefaults.barWidth;
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
                        var currentBarWidth = (_x = (_w = (_v = data === null || data === void 0 ? void 0 : data[i]) === null || _v === void 0 ? void 0 : _v.barWidth) !== null && _w !== void 0 ? _w : props.barWidth) !== null && _x !== void 0 ? _x : BarDefaults.barWidth;
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
                        var currentBarWidth = (_2 = (_1 = (_0 = data === null || data === void 0 ? void 0 : data[i]) === null || _0 === void 0 ? void 0 : _0.barWidth) !== null && _1 !== void 0 ? _1 : props.barWidth) !== null && _2 !== void 0 ? _2 : BarDefaults.barWidth;
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
        outputRange: [0, initialSpacing + totalWidth + endSpacing]
    });
    var getPropsCommonForBarAndStack = function (item, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            key: index,
            item: item,
            index: index,
            containerHeight: containerHeight,
            maxValue: maxValue,
            spacing: (_a = item.spacing) !== null && _a !== void 0 ? _a : spacing,
            propSpacing: spacing,
            xAxisThickness: xAxisThickness,
            barWidth: props.barWidth,
            opacity: opacity,
            disablePress: (_b = item.disablePress) !== null && _b !== void 0 ? _b : props.disablePress,
            rotateLabel: rotateLabel,
            showXAxisIndices: showXAxisIndices,
            xAxisIndicesHeight: xAxisIndicesHeight,
            xAxisIndicesWidth: xAxisIndicesWidth,
            xAxisIndicesColor: xAxisIndicesColor,
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
            leftShiftForTooltip: (_c = props.leftShiftForTooltip) !== null && _c !== void 0 ? _c : 0,
            initialSpacing: initialSpacing,
            selectedIndex: selectedIndex,
            setSelectedIndex: setSelectedIndex,
            activeOpacity: (_d = props.activeOpacity) !== null && _d !== void 0 ? _d : 0.2,
            noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
            leftShiftForLastIndexTooltip: (_e = props.leftShiftForLastIndexTooltip) !== null && _e !== void 0 ? _e : 0,
            label: (_f = item.label) !== null && _f !== void 0 ? _f : (((_g = props.xAxisLabelTexts) === null || _g === void 0 ? void 0 : _g[index]) ? props.xAxisLabelTexts[index] : ''),
            labelTextStyle: (_h = item.labelTextStyle) !== null && _h !== void 0 ? _h : props.xAxisLabelTextStyle,
            pointerConfig: pointerConfig,
            yAxisExtraHeightAtTop: yAxisExtraHeightAtTop,
            yAxisOffset: yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0
        };
    };
    var barAndLineChartsWrapperProps = {
        chartType: chartTypes.BAR,
        containerHeight: containerHeight,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        stepHeight: stepHeight,
        labelsExtraHeight: labelsExtraHeight,
        yAxisLabelWidth: yAxisLabelWidth,
        horizontal: horizontal,
        rtl: rtl,
        shiftX: (_43 = props.shiftX) !== null && _43 !== void 0 ? _43 : 0,
        shiftY: (_44 = props.shiftY) !== null && _44 !== void 0 ? _44 : 0,
        yAxisAtTop: yAxisAtTop,
        initialSpacing: initialSpacing,
        data: data,
        stackData: props.stackData,
        secondaryData: secondaryData,
        barWidth: (_45 = props.barWidth) !== null && _45 !== void 0 ? _45 : BarDefaults.barWidth,
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
        showFractionalValues: showFractionalValues,
        axesAndRulesProps: getAxesAndRulesProps(props, stepValue, secondaryMaxValue),
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
        endReachedOffset: (_46 = props.endReachedOffset) !== null && _46 !== void 0 ? _46 : BarDefaults.endReachedOffset
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
