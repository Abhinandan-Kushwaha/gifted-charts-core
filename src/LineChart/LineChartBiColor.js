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
import { useEffect, useMemo, useState } from 'react';
import { AxesAndRulesDefaults, LineDefaults, chartTypes } from '../utils/constants';
import { getAxesAndRulesProps, getExtendedContainerHeightWithPadding } from '../utils';
var initialData = null;
export var useLineChartBiColor = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48;
    var _49 = __read(useState(false), 2), toggle = _49[0], setToggle = _49[1];
    var _50 = __read(useState([]), 2), pointsArray = _50[0], setPointsArray = _50[1];
    var _51 = __read(useState([]), 2), fillPointsArray = _51[0], setFillPointsArray = _51[1];
    var _52 = __read(useState(-1), 2), selectedIndex = _52[0], setSelectedIndex = _52[1];
    var containerHeight = (_a = props.height) !== null && _a !== void 0 ? _a : AxesAndRulesDefaults.containerHeight;
    var noOfSections = (_b = props.noOfSections) !== null && _b !== void 0 ? _b : AxesAndRulesDefaults.noOfSections;
    var data = useMemo(function () {
        if (!props.data) {
            return [];
        }
        if (props.yAxisOffset) {
            return props.data.map(function (item) {
                var _a;
                item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                return item;
            });
        }
        return props.data;
    }, [props.yAxisOffset, props.data]);
    var scrollToEnd = (_c = props.scrollToEnd) !== null && _c !== void 0 ? _c : LineDefaults.scrollToEnd;
    var scrollAnimation = (_d = props.scrollAnimation) !== null && _d !== void 0 ? _d : LineDefaults.scrollAnimation;
    var scrollEventThrottle = (_e = props.scrollEventThrottle) !== null && _e !== void 0 ? _e : LineDefaults.scrollEventThrottle;
    var labelsExtraHeight = (_f = props.labelsExtraHeight) !== null && _f !== void 0 ? _f : 0;
    var animationDuration = (_g = props.animationDuration) !== null && _g !== void 0 ? _g : LineDefaults.animationDuration;
    var startIndex1 = (_h = props.startIndex) !== null && _h !== void 0 ? _h : 0;
    var endIndex1;
    if (props.endIndex === undefined || props.endIndex === null) {
        endIndex1 = data.length - 1;
    }
    else {
        endIndex1 = props.endIndex;
    }
    if (!initialData) {
        initialData = __spreadArray([], __read(data), false);
    }
    var adjustToWidth = (_j = props.adjustToWidth) !== null && _j !== void 0 ? _j : false;
    var initialSpacing = (_k = props.initialSpacing) !== null && _k !== void 0 ? _k : LineDefaults.initialSpacing;
    var endSpacing = (_l = props.endSpacing) !== null && _l !== void 0 ? _l : (adjustToWidth ? 0 : LineDefaults.endSpacing);
    var thickness = (_m = props.thickness) !== null && _m !== void 0 ? _m : LineDefaults.thickness;
    var spacing = (_o = props.spacing) !== null && _o !== void 0 ? _o : (adjustToWidth
        ? (((_p = props.width) !== null && _p !== void 0 ? _p : AxesAndRulesDefaults.width) - initialSpacing) /
            data.length
        : LineDefaults.spacing);
    var xAxisThickness = (_q = props.xAxisThickness) !== null && _q !== void 0 ? _q : AxesAndRulesDefaults.xAxisThickness;
    var dataPointsHeight1 = (_r = props.dataPointsHeight) !== null && _r !== void 0 ? _r : LineDefaults.dataPointsHeight;
    var dataPointsWidth1 = (_s = props.dataPointsWidth) !== null && _s !== void 0 ? _s : LineDefaults.dataPointsWidth;
    var dataPointsRadius1 = (_t = props.dataPointsRadius) !== null && _t !== void 0 ? _t : LineDefaults.dataPointsRadius;
    var dataPointsColor1 = (_u = props.dataPointsColor) !== null && _u !== void 0 ? _u : LineDefaults.dataPointsColor;
    var dataPointsShape1 = (_v = props.dataPointsShape) !== null && _v !== void 0 ? _v : LineDefaults.dataPointsShape;
    var areaChart = (_w = props.areaChart) !== null && _w !== void 0 ? _w : false;
    var textFontSize1 = (_x = props.textFontSize) !== null && _x !== void 0 ? _x : LineDefaults.textFontSize;
    var textColor1 = (_y = props.textColor) !== null && _y !== void 0 ? _y : LineDefaults.textColor;
    var totalWidth = initialSpacing;
    var maxItem = 0;
    var minItem = 0;
    data.forEach(function (item) {
        if (item.value > maxItem) {
            maxItem = item.value;
        }
        if (item.value < minItem) {
            minItem = item.value;
        }
        totalWidth += spacing;
    });
    if ((_z = props.showFractionalValues) !== null && _z !== void 0 ? _z : props.roundToDigits) {
        maxItem *= 10 * ((_0 = props.roundToDigits) !== null && _0 !== void 0 ? _0 : 1);
        maxItem = maxItem + (10 - (maxItem % 10));
        maxItem /= 10 * ((_1 = props.roundToDigits) !== null && _1 !== void 0 ? _1 : 1);
        maxItem = parseFloat(maxItem.toFixed((_2 = props.roundToDigits) !== null && _2 !== void 0 ? _2 : 1));
        if (minItem !== 0) {
            minItem *= 10 * ((_3 = props.roundToDigits) !== null && _3 !== void 0 ? _3 : 1);
            minItem = minItem - (10 + (minItem % 10));
            minItem /= 10 * ((_4 = props.roundToDigits) !== null && _4 !== void 0 ? _4 : 1);
            minItem = parseFloat(minItem.toFixed((_5 = props.roundToDigits) !== null && _5 !== void 0 ? _5 : 1));
        }
    }
    else {
        maxItem = maxItem + (10 - (maxItem % 10));
        if (minItem !== 0) {
            minItem = minItem - (10 + (minItem % 10));
        }
    }
    var maxValue = (_6 = props.maxValue) !== null && _6 !== void 0 ? _6 : maxItem;
    var mostNegativeValue = (_7 = props.mostNegativeValue) !== null && _7 !== void 0 ? _7 : minItem;
    var extendedContainerHeight = getExtendedContainerHeightWithPadding(containerHeight, props.overflowTop);
    var yAtxAxis = extendedContainerHeight - xAxisThickness / 2;
    var getX = function (index) { return initialSpacing + spacing * index; };
    var getY = function (index) {
        return yAtxAxis - (data[index].value * containerHeight) / maxValue;
    };
    useEffect(function () {
        var ppArray = [];
        var pp = 'M' + initialSpacing + ' ' + getY(0);
        var prevValuev;
        var nextValue;
        for (var i_1 = 0; i_1 < data.length - 1; i_1++) {
            prevValuev = data[i_1].value;
            nextValue = data[i_1 + 1].value;
            if (prevValuev < 0 && nextValue < 0) {
                pp += 'L' + getX(i_1) + ' ' + getY(i_1) + ' ';
            }
            else if (prevValuev < 0 && nextValue > 0) {
                pp += 'L' + getX(i_1) + ' ' + getY(i_1) + ' ';
                var prevX = getX(i_1);
                var prevY = getY(i_1);
                var nextX = getX(i_1 + 1);
                var nextY = getY(i_1 + 1);
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                var pointsOb_1 = {
                    points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
                    color: 'red'
                };
                ppArray.push(pointsOb_1);
                setPointsArray(__spreadArray([], __read(ppArray), false));
                pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
                pointsOb_1 = {
                    points: pp,
                    color: 'green'
                };
                ppArray.push(pointsOb_1);
            }
            else if (prevValuev > 0 && nextValue < 0) {
                pp += 'L' + getX(i_1) + ' ' + getY(i_1) + ' ';
                var prevX = getX(i_1);
                var prevY = getY(i_1);
                var nextX = getX(i_1 + 1);
                var nextY = getY(i_1 + 1);
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                var pointsOb_2 = {
                    points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
                    color: 'green'
                };
                ppArray.push(pointsOb_2);
                setPointsArray(__spreadArray([], __read(ppArray), false));
                pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
                pointsOb_2 = {
                    points: pp,
                    color: 'red'
                };
                ppArray.push(pointsOb_2);
            }
            else {
                pp += 'L' + getX(i_1) + ' ' + getY(i_1) + ' ';
            }
        }
        var i = data.length - 1;
        prevValuev = data[i - 1].value;
        nextValue = data[i].value;
        if ((prevValuev > 0 && nextValue > 0) ||
            (prevValuev < 0 && nextValue < 0)) {
            pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
        }
        var pointsOb = {
            points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
            color: nextValue > 0 ? 'green' : 'red'
        };
        ppArray.push(pointsOb);
        setPointsArray(__spreadArray([], __read(ppArray), false));
        /** *************************          For Area Charts          *************************/
        var startIndex = -1;
        var endIndex = -1;
        var startX;
        var startY;
        var endY;
        var color = 'green';
        var localArray = [];
        var broken = false;
        pp = 'M' + initialSpacing + ' ' + yAtxAxis;
        for (i = 0; i < data.length - 1; i++) {
            prevValuev = data[i].value;
            nextValue = data[i + 1].value;
            pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
            if ((prevValuev > 0 && nextValue < 0) ||
                (prevValuev < 0 && nextValue > 0)) {
                var prevX = getX(i);
                var prevY = getY(i);
                var nextX = getX(i + 1);
                var nextY = getY(i + 1);
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                broken = true;
                break;
            }
        }
        if (!broken) {
            i = data.length - 1;
            pp +=
                'L' +
                    getX(i) +
                    ' ' +
                    getY(i) +
                    ' L' +
                    getX(i) +
                    ' ' +
                    (yAtxAxis - xAxisThickness / 2);
        }
        localArray.push({
            points: pp,
            color: data[0].value >= 0 ? 'green' : 'red'
        });
        var xs = [];
        data.forEach(function (item, index) {
            var x = getX(index);
            xs.push(x + '');
        });
        pointsArray.forEach(function (item, index) {
            var splitArray = item.points
                .split(' ')
                .filter(function (spItem) { return spItem && spItem !== ' '; });
            if (splitArray[1] === yAtxAxis + '' &&
                !xs.includes(splitArray[0].replace('M', '').replace('L', ''))) {
                startIndex = index;
                startX = splitArray[0].replace('M', '').replace('L', '');
                if (splitArray.length > 3) {
                    startY = splitArray[1].replace('M', '').replace('L', '');
                    endY = splitArray[3].replace('M', '').replace('L', '');
                    if (Number(startY) < Number(endY)) {
                        color = 'red';
                    }
                    else {
                        color = 'green';
                    }
                }
            }
            if (splitArray[splitArray.length - 1] === yAtxAxis + '' &&
                !xs.includes(splitArray[splitArray.length - 2].replace('M', '').replace('L', ''))) {
                endIndex = index;
            }
            if (startX) {
                var filPts = '';
                for (var j = startIndex; j <= endIndex; j++) {
                    if (pointsArray[j]) {
                        filPts += pointsArray[j].points.replaceAll('M', 'L');
                    }
                }
                filPts += 'L ' + startX + ' ' + yAtxAxis;
                localArray.push({ points: filPts.replace('L', 'M'), color: color });
            }
        });
        if (broken) {
            pp = 'M' + getX(data.length - 1) + ' ' + yAtxAxis;
            for (var i_2 = data.length - 1; i_2 > 0; i_2--) {
                prevValuev = data[i_2].value;
                nextValue = data[i_2 - 1].value;
                pp += 'L' + getX(i_2) + ' ' + getY(i_2) + ' ';
                if ((prevValuev > 0 && nextValue < 0) ||
                    (prevValuev < 0 && nextValue > 0)) {
                    var prevX = getX(i_2);
                    var prevY = getY(i_2);
                    var nextX = getX(i_2 - 1);
                    var nextY = getY(i_2 - 1);
                    var slope = (nextY - prevY) / (nextX - prevX);
                    var x = (yAtxAxis - prevY) / slope + prevX;
                    pp += 'L' + x + ' ' + yAtxAxis + ' ';
                    break;
                }
            }
            localArray.push({
                points: pp,
                color: data[data.length - 1].value > 0 ? 'green' : 'red'
            });
        }
        setFillPointsArray(__spreadArray([], __read(localArray), false));
        setToggle(true);
    }, [
        areaChart,
        containerHeight,
        data,
        dataPointsWidth1,
        initialSpacing,
        spacing,
        xAxisThickness,
        toggle,
        maxValue
    ]);
    var horizSections = [{ value: '0' }];
    var stepHeight = (_8 = props.stepHeight) !== null && _8 !== void 0 ? _8 : containerHeight / noOfSections;
    var stepValue = (_9 = props.stepValue) !== null && _9 !== void 0 ? _9 : maxValue / noOfSections;
    var noOfSectionsBelowXAxis = (_10 = props.noOfSectionsBelowXAxis) !== null && _10 !== void 0 ? _10 : -mostNegativeValue / stepValue;
    var thickness1 = (_11 = props.thickness) !== null && _11 !== void 0 ? _11 : LineDefaults.thickness;
    var zIndex = (_12 = props.zIndex) !== null && _12 !== void 0 ? _12 : 0;
    var strokeDashArray1 = props.strokeDashArray;
    var rotateLabel = (_13 = props.rotateLabel) !== null && _13 !== void 0 ? _13 : AxesAndRulesDefaults.rotateLabel;
    var isAnimated = (_14 = props.isAnimated) !== null && _14 !== void 0 ? _14 : LineDefaults.isAnimated;
    var hideDataPoints1 = (_15 = props.hideDataPoints) !== null && _15 !== void 0 ? _15 : LineDefaults.hideDataPoints;
    var color = (_16 = props.color) !== null && _16 !== void 0 ? _16 : 'green';
    var colorNegative = (_17 = props.colorNegative) !== null && _17 !== void 0 ? _17 : 'red';
    var startFillColor = (_18 = props.startFillColor) !== null && _18 !== void 0 ? _18 : 'lightgreen';
    var endFillColor = (_19 = props.endFillColor) !== null && _19 !== void 0 ? _19 : 'white';
    var startOpacity = (_20 = props.startOpacity) !== null && _20 !== void 0 ? _20 : LineDefaults.startOpacity;
    var endOpacity = (_21 = props.endOpacity) !== null && _21 !== void 0 ? _21 : LineDefaults.endOpacity;
    var startFillColorNegative = (_22 = props.startFillColorNegative) !== null && _22 !== void 0 ? _22 : 'pink';
    var endFillColorNegative = (_23 = props.endFillColorNegative) !== null && _23 !== void 0 ? _23 : 'white';
    var startOpacityNegative = (_24 = props.startOpacityNegative) !== null && _24 !== void 0 ? _24 : LineDefaults.startOpacity;
    var endOpacityNegative = (_25 = props.endOpacityNegative) !== null && _25 !== void 0 ? _25 : LineDefaults.endOpacity;
    var gradientDirection = (_26 = props.gradientDirection) !== null && _26 !== void 0 ? _26 : 'vertical';
    var showXAxisIndices = (_27 = props.showXAxisIndices) !== null && _27 !== void 0 ? _27 : AxesAndRulesDefaults.showXAxisIndices;
    var xAxisIndicesHeight = (_28 = props.xAxisIndicesHeight) !== null && _28 !== void 0 ? _28 : AxesAndRulesDefaults.xAxisIndicesHeight;
    var xAxisIndicesWidth = (_29 = props.xAxisIndicesWidth) !== null && _29 !== void 0 ? _29 : AxesAndRulesDefaults.xAxisIndicesWidth;
    var xAxisIndicesColor = (_30 = props.xAxisIndicesColor) !== null && _30 !== void 0 ? _30 : AxesAndRulesDefaults.xAxisIndicesColor;
    var xAxisTextNumberOfLines = (_31 = props.xAxisTextNumberOfLines) !== null && _31 !== void 0 ? _31 : AxesAndRulesDefaults.xAxisTextNumberOfLines;
    var horizontalRulesStyle = props.horizontalRulesStyle;
    var showFractionalValues = (_32 = props.showFractionalValues) !== null && _32 !== void 0 ? _32 : AxesAndRulesDefaults.showFractionalValues;
    var yAxisLabelWidth = (_33 = props.yAxisLabelWidth) !== null && _33 !== void 0 ? _33 : (props.hideYAxisText
        ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
        : AxesAndRulesDefaults.yAxisLabelWidth);
    var horizontal = false;
    var yAxisAtTop = false;
    var disableScroll = (_34 = props.disableScroll) !== null && _34 !== void 0 ? _34 : LineDefaults.disableScroll;
    var showScrollIndicator = (_35 = props.showScrollIndicator) !== null && _35 !== void 0 ? _35 : LineDefaults.showScrollIndicator;
    var focusEnabled = (_36 = props.focusEnabled) !== null && _36 !== void 0 ? _36 : LineDefaults.focusEnabled;
    var showDataPointOnFocus = (_37 = props.showDataPointOnFocus) !== null && _37 !== void 0 ? _37 : LineDefaults.showDataPointOnFocus;
    var showStripOnFocus = (_38 = props.showStripOnFocus) !== null && _38 !== void 0 ? _38 : LineDefaults.showStripOnFocus;
    var showTextOnFocus = (_39 = props.showTextOnFocus) !== null && _39 !== void 0 ? _39 : LineDefaults.showTextOnFocus;
    var stripHeight = props.stripHeight;
    var stripWidth = (_40 = props.stripWidth) !== null && _40 !== void 0 ? _40 : LineDefaults.stripWidth;
    var stripColor = (_41 = props.stripColor) !== null && _41 !== void 0 ? _41 : color;
    var stripOpacity = (_42 = props.stripOpacity) !== null && _42 !== void 0 ? _42 : (startOpacity + endOpacity) / 2;
    var unFocusOnPressOut = (_43 = props.unFocusOnPressOut) !== null && _43 !== void 0 ? _43 : LineDefaults.unFocusOnPressOut;
    var delayBeforeUnFocus = (_44 = props.delayBeforeUnFocus) !== null && _44 !== void 0 ? _44 : LineDefaults.delayBeforeUnFocus;
    horizSections.pop();
    for (var i = 0; i <= noOfSections; i++) {
        var value = maxValue - stepValue * i;
        if ((_45 = props.showFractionalValues) !== null && _45 !== void 0 ? _45 : props.roundToDigits) {
            value = parseFloat(value.toFixed((_46 = props.roundToDigits) !== null && _46 !== void 0 ? _46 : 1));
        }
        horizSections.push({
            value: props.yAxisLabelTexts
                ? (_47 = props.yAxisLabelTexts[noOfSections - i]) !== null && _47 !== void 0 ? _47 : value.toString()
                : value.toString()
        });
    }
    var barAndLineChartsWrapperProps = {
        chartType: chartTypes.LINE_BI_COLOR,
        containerHeight: containerHeight,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        stepHeight: stepHeight,
        labelsExtraHeight: labelsExtraHeight,
        yAxisLabelWidth: yAxisLabelWidth,
        horizontal: horizontal,
        rtl: false,
        shiftX: 0,
        shiftY: 0,
        yAxisAtTop: yAxisAtTop,
        initialSpacing: initialSpacing,
        data: data,
        stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        secondaryData: [],
        barWidth: 0, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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
        showLine: false,
        lineConfig: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        lineConfig2: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        maxValue: maxValue,
        lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        lineData2: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        lineBehindBars: false,
        points: pointsArray,
        points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        remainingScrollViewProps: {},
        // horizSectionProps-
        width: props.width,
        horizSections: horizSections,
        endSpacing: endSpacing,
        horizontalRulesStyle: horizontalRulesStyle,
        noOfSections: noOfSections,
        showFractionalValues: showFractionalValues,
        axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),
        yAxisLabelTexts: props.yAxisLabelTexts,
        yAxisOffset: props.yAxisOffset,
        rotateYAxisTexts: 0,
        hideAxesAndRules: props.hideAxesAndRules,
        showXAxisIndices: showXAxisIndices,
        xAxisIndicesHeight: xAxisIndicesHeight,
        xAxisIndicesWidth: xAxisIndicesWidth,
        xAxisIndicesColor: xAxisIndicesColor,
        // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        pointerConfig: undefined,
        getPointerProps: null,
        pointerIndex: 0,
        pointerX: 0,
        pointerY: 0,
        endReachedOffset: (_48 = props.endReachedOffset) !== null && _48 !== void 0 ? _48 : LineDefaults.endReachedOffset
    };
    return {
        toggle: toggle,
        setToggle: setToggle,
        pointsArray: pointsArray,
        setPointsArray: setPointsArray,
        fillPointsArray: fillPointsArray,
        setFillPointsArray: setFillPointsArray,
        selectedIndex: selectedIndex,
        setSelectedIndex: setSelectedIndex,
        containerHeight: containerHeight,
        noOfSections: noOfSections,
        data: data,
        scrollToEnd: scrollToEnd,
        scrollAnimation: scrollAnimation,
        scrollEventThrottle: scrollEventThrottle,
        labelsExtraHeight: labelsExtraHeight,
        animationDuration: animationDuration,
        startIndex1: startIndex1,
        endIndex1: endIndex1,
        initialData: initialData,
        adjustToWidth: adjustToWidth,
        initialSpacing: initialSpacing,
        endSpacing: endSpacing,
        thickness: thickness,
        spacing: spacing,
        xAxisThickness: xAxisThickness,
        dataPointsHeight1: dataPointsHeight1,
        dataPointsWidth1: dataPointsWidth1,
        dataPointsRadius1: dataPointsRadius1,
        dataPointsColor1: dataPointsColor1,
        dataPointsShape1: dataPointsShape1,
        areaChart: areaChart,
        textFontSize1: textFontSize1,
        textColor1: textColor1,
        totalWidth: totalWidth,
        maxItem: maxItem,
        minItem: minItem,
        maxValue: maxValue,
        mostNegativeValue: mostNegativeValue,
        extendedContainerHeight: extendedContainerHeight,
        getX: getX,
        getY: getY,
        yAtxAxis: yAtxAxis,
        stepHeight: stepHeight,
        stepValue: stepValue,
        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
        thickness1: thickness1,
        zIndex: zIndex,
        strokeDashArray1: strokeDashArray1,
        rotateLabel: rotateLabel,
        isAnimated: isAnimated,
        hideDataPoints1: hideDataPoints1,
        color: color,
        colorNegative: colorNegative,
        startFillColor: startFillColor,
        endFillColor: endFillColor,
        startOpacity: startOpacity,
        endOpacity: endOpacity,
        startFillColorNegative: startFillColorNegative,
        endFillColorNegative: endFillColorNegative,
        startOpacityNegative: startOpacityNegative,
        endOpacityNegative: endOpacityNegative,
        gradientDirection: gradientDirection,
        showXAxisIndices: showXAxisIndices,
        xAxisIndicesHeight: xAxisIndicesHeight,
        xAxisIndicesWidth: xAxisIndicesWidth,
        xAxisIndicesColor: xAxisIndicesColor,
        xAxisTextNumberOfLines: xAxisTextNumberOfLines,
        horizontalRulesStyle: horizontalRulesStyle,
        showFractionalValues: showFractionalValues,
        yAxisLabelWidth: yAxisLabelWidth,
        horizontal: horizontal,
        yAxisAtTop: yAxisAtTop,
        disableScroll: disableScroll,
        showScrollIndicator: showScrollIndicator,
        focusEnabled: focusEnabled,
        showDataPointOnFocus: showDataPointOnFocus,
        showStripOnFocus: showStripOnFocus,
        showTextOnFocus: showTextOnFocus,
        stripHeight: stripHeight,
        stripWidth: stripWidth,
        stripColor: stripColor,
        stripOpacity: stripOpacity,
        unFocusOnPressOut: unFocusOnPressOut,
        delayBeforeUnFocus: delayBeforeUnFocus,
        horizSections: horizSections,
        barAndLineChartsWrapperProps: barAndLineChartsWrapperProps
    };
};
