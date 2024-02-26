System.register(["react", "../utils/constants", "../utils"], function (exports_1, context_1) {
    "use strict";
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var react_1, constants_1, utils_1, initialData, useLineChartBiColor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            initialData = null;
            exports_1("useLineChartBiColor", useLineChartBiColor = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
                var _14 = react_1.useState(false), toggle = _14[0], setToggle = _14[1];
                var _15 = react_1.useState([]), pointsArray = _15[0], setPointsArray = _15[1];
                var _16 = react_1.useState([]), fillPointsArray = _16[0], setFillPointsArray = _16[1];
                var _17 = react_1.useState(-1), selectedIndex = _17[0], setSelectedIndex = _17[1];
                var containerHeight = props.height || constants_1.AxesAndRulesDefaults.containerHeight;
                var noOfSections = props.noOfSections || constants_1.AxesAndRulesDefaults.noOfSections;
                var data = react_1.useMemo(function () {
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
                var scrollToEnd = (_a = props.scrollToEnd) !== null && _a !== void 0 ? _a : constants_1.LineDefaults.scrollToEnd;
                var scrollAnimation = (_b = props.scrollAnimation) !== null && _b !== void 0 ? _b : constants_1.LineDefaults.scrollAnimation;
                var scrollEventThrottle = (_c = props.scrollEventThrottle) !== null && _c !== void 0 ? _c : constants_1.LineDefaults.scrollEventThrottle;
                var labelsExtraHeight = props.labelsExtraHeight || 0;
                var animationDuration = props.animationDuration || constants_1.LineDefaults.animationDuration;
                var startIndex1 = props.startIndex || 0;
                var endIndex1;
                if (props.endIndex === undefined || props.endIndex === null) {
                    endIndex1 = data.length - 1;
                }
                else {
                    endIndex1 = props.endIndex;
                }
                if (!initialData) {
                    initialData = __spreadArray([], data, true);
                }
                var adjustToWidth = props.adjustToWidth || false;
                var initialSpacing = (_d = props.initialSpacing) !== null && _d !== void 0 ? _d : constants_1.LineDefaults.initialSpacing;
                var endSpacing = (_e = props.endSpacing) !== null && _e !== void 0 ? _e : (adjustToWidth ? 0 : constants_1.LineDefaults.endSpacing);
                var thickness = props.thickness || constants_1.LineDefaults.thickness;
                var spacing = (_f = props.spacing) !== null && _f !== void 0 ? _f : (adjustToWidth
                    ? ((props.width || constants_1.AxesAndRulesDefaults.width) - initialSpacing) /
                        data.length
                    : constants_1.LineDefaults.spacing);
                var xAxisThickness = (_g = props.xAxisThickness) !== null && _g !== void 0 ? _g : constants_1.AxesAndRulesDefaults.xAxisThickness;
                var dataPointsHeight1 = (_h = props.dataPointsHeight) !== null && _h !== void 0 ? _h : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth1 = (_j = props.dataPointsWidth) !== null && _j !== void 0 ? _j : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius1 = (_k = props.dataPointsRadius) !== null && _k !== void 0 ? _k : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor1 = (_l = props.dataPointsColor) !== null && _l !== void 0 ? _l : constants_1.LineDefaults.dataPointsColor;
                var dataPointsShape1 = (_m = props.dataPointsShape) !== null && _m !== void 0 ? _m : constants_1.LineDefaults.dataPointsShape;
                var areaChart = props.areaChart || false;
                var textFontSize1 = props.textFontSize || constants_1.LineDefaults.textFontSize;
                var textColor1 = props.textColor || constants_1.LineDefaults.textColor;
                var totalWidth = initialSpacing;
                var maxItem = 0, minItem = 0;
                data.forEach(function (item) {
                    if (item.value > maxItem) {
                        maxItem = item.value;
                    }
                    if (item.value < minItem) {
                        minItem = item.value;
                    }
                    totalWidth += spacing;
                });
                if (props.showFractionalValues || props.roundToDigits) {
                    maxItem *= 10 * (props.roundToDigits || 1);
                    maxItem = maxItem + (10 - (maxItem % 10));
                    maxItem /= 10 * (props.roundToDigits || 1);
                    maxItem = parseFloat(maxItem.toFixed(props.roundToDigits || 1));
                    if (minItem !== 0) {
                        minItem *= 10 * (props.roundToDigits || 1);
                        minItem = minItem - (10 + (minItem % 10));
                        minItem /= 10 * (props.roundToDigits || 1);
                        minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
                    }
                }
                else {
                    maxItem = maxItem + (10 - (maxItem % 10));
                    if (minItem !== 0) {
                        minItem = minItem - (10 + (minItem % 10));
                    }
                }
                var maxValue = props.maxValue || maxItem;
                var mostNegativeValue = props.mostNegativeValue || minItem;
                var extendedContainerHeight = utils_1.getExtendedContainerHeightWithPadding(containerHeight, props.overflowTop);
                var yAtxAxis = extendedContainerHeight - xAxisThickness / 2;
                var getX = function (index) { return initialSpacing + spacing * index; };
                var getY = function (index) {
                    return yAtxAxis - (data[index].value * containerHeight) / maxValue;
                };
                react_1.useEffect(function () {
                    var ppArray = [];
                    var pp = "M" + initialSpacing + " " + getY(0), prevValuev, nextValue;
                    for (var i_1 = 0; i_1 < data.length - 1; i_1++) {
                        prevValuev = data[i_1].value;
                        nextValue = data[i_1 + 1].value;
                        if (prevValuev < 0 && nextValue < 0) {
                            pp += "L" + getX(i_1) + " " + getY(i_1) + " ";
                        }
                        else if (prevValuev < 0 && nextValue > 0) {
                            pp += "L" + getX(i_1) + " " + getY(i_1) + " ";
                            var prevX = getX(i_1);
                            var prevY = getY(i_1);
                            var nextX = getX(i_1 + 1);
                            var nextY = getY(i_1 + 1);
                            var slope = (nextY - prevY) / (nextX - prevX);
                            var x = (yAtxAxis - prevY) / slope + prevX;
                            pp += "L" + (x - thickness / 2) + " " + yAtxAxis + " ";
                            var pointsOb_1 = {
                                points: pp.startsWith("L") ? pp.replace("L", "M") : pp,
                                color: "red",
                            };
                            ppArray.push(pointsOb_1);
                            setPointsArray(__spreadArray([], ppArray, true));
                            pp = "M" + x + " " + yAtxAxis + " L" + nextX + " " + nextY + " ";
                            pointsOb_1 = {
                                points: pp,
                                color: "green",
                            };
                            ppArray.push(pointsOb_1);
                        }
                        else if (prevValuev > 0 && nextValue < 0) {
                            pp += "L" + getX(i_1) + " " + getY(i_1) + " ";
                            var prevX = getX(i_1);
                            var prevY = getY(i_1);
                            var nextX = getX(i_1 + 1);
                            var nextY = getY(i_1 + 1);
                            var slope = (nextY - prevY) / (nextX - prevX);
                            var x = (yAtxAxis - prevY) / slope + prevX;
                            pp += "L" + (x - thickness / 2) + " " + yAtxAxis + " ";
                            var pointsOb_2 = {
                                points: pp.startsWith("L") ? pp.replace("L", "M") : pp,
                                color: "green",
                            };
                            ppArray.push(pointsOb_2);
                            setPointsArray(__spreadArray([], ppArray, true));
                            pp = "M" + x + " " + yAtxAxis + " L" + nextX + " " + nextY + " ";
                            pointsOb_2 = {
                                points: pp,
                                color: "red",
                            };
                            ppArray.push(pointsOb_2);
                        }
                        else {
                            pp += "L" + getX(i_1) + " " + getY(i_1) + " ";
                        }
                    }
                    var i = data.length - 1;
                    prevValuev = data[i - 1].value;
                    nextValue = data[i].value;
                    if ((prevValuev > 0 && nextValue > 0) ||
                        (prevValuev < 0 && nextValue < 0)) {
                        pp += "L" + getX(i) + " " + getY(i) + " ";
                    }
                    var pointsOb = {
                        points: pp.startsWith("L") ? pp.replace("L", "M") : pp,
                        color: nextValue > 0 ? "green" : "red",
                    };
                    ppArray.push(pointsOb);
                    setPointsArray(__spreadArray([], ppArray, true));
                    /***************************          For Area Charts          *************************/
                    var startIndex = -1, endIndex = -1, startX, startY, endY, color = "green", localArray = [], broken = false;
                    pp = "M" + initialSpacing + " " + yAtxAxis;
                    for (i = 0; i < data.length - 1; i++) {
                        prevValuev = data[i].value;
                        nextValue = data[i + 1].value;
                        pp += "L" + getX(i) + " " + getY(i) + " ";
                        if ((prevValuev > 0 && nextValue < 0) ||
                            (prevValuev < 0 && nextValue > 0)) {
                            var prevX = getX(i);
                            var prevY = getY(i);
                            var nextX = getX(i + 1);
                            var nextY = getY(i + 1);
                            var slope = (nextY - prevY) / (nextX - prevX);
                            var x = (yAtxAxis - prevY) / slope + prevX;
                            pp += "L" + (x - thickness / 2) + " " + yAtxAxis + " ";
                            broken = true;
                            break;
                        }
                    }
                    if (!broken) {
                        i = data.length - 1;
                        pp +=
                            "L" +
                                getX(i) +
                                " " +
                                getY(i) +
                                " L" +
                                getX(i) +
                                " " +
                                (yAtxAxis - xAxisThickness / 2);
                    }
                    localArray.push({
                        points: pp,
                        color: data[0].value >= 0 ? "green" : "red",
                    });
                    var xs = [];
                    data.forEach(function (item, index) {
                        var x = getX(index);
                        xs.push(x + "");
                    });
                    pointsArray.forEach(function (item, index) {
                        var splitArray = item.points
                            .split(" ")
                            .filter(function (spItem) { return spItem && spItem !== " "; });
                        if (splitArray[1] === yAtxAxis + "" &&
                            !xs.includes(splitArray[0].replace("M", "").replace("L", ""))) {
                            startIndex = index;
                            startX = splitArray[0].replace("M", "").replace("L", "");
                            if (splitArray.length > 3) {
                                startY = splitArray[1].replace("M", "").replace("L", "");
                                endY = splitArray[3].replace("M", "").replace("L", "");
                                if (Number(startY) < Number(endY)) {
                                    color = "red";
                                }
                                else {
                                    color = "green";
                                }
                            }
                        }
                        if (splitArray[splitArray.length - 1] === yAtxAxis + "" &&
                            !xs.includes(splitArray[splitArray.length - 2].replace("M", "").replace("L", ""))) {
                            endIndex = index;
                        }
                        if (startX) {
                            var filPts = "";
                            for (var j = startIndex; j <= endIndex; j++) {
                                if (pointsArray[j]) {
                                    filPts += pointsArray[j].points.replaceAll("M", "L");
                                }
                            }
                            filPts += "L " + startX + " " + yAtxAxis;
                            localArray.push({ points: filPts.replace("L", "M"), color: color });
                        }
                    });
                    if (broken) {
                        pp = "M" + getX(data.length - 1) + " " + yAtxAxis;
                        for (var i_2 = data.length - 1; i_2 > 0; i_2--) {
                            prevValuev = data[i_2].value;
                            nextValue = data[i_2 - 1].value;
                            pp += "L" + getX(i_2) + " " + getY(i_2) + " ";
                            if ((prevValuev > 0 && nextValue < 0) ||
                                (prevValuev < 0 && nextValue > 0)) {
                                var prevX = getX(i_2);
                                var prevY = getY(i_2);
                                var nextX = getX(i_2 - 1);
                                var nextY = getY(i_2 - 1);
                                var slope = (nextY - prevY) / (nextX - prevX);
                                var x = (yAtxAxis - prevY) / slope + prevX;
                                pp += "L" + x + " " + yAtxAxis + " ";
                                break;
                            }
                        }
                        localArray.push({
                            points: pp,
                            color: data[data.length - 1].value > 0 ? "green" : "red",
                        });
                    }
                    setFillPointsArray(__spreadArray([], localArray, true));
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
                    maxValue,
                ]);
                var horizSections = [{ value: "0" }];
                var stepHeight = props.stepHeight || containerHeight / noOfSections;
                var stepValue = props.stepValue || maxValue / noOfSections;
                var noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis || -mostNegativeValue / stepValue;
                var thickness1 = props.thickness || constants_1.LineDefaults.thickness;
                var zIndex = props.zIndex || 0;
                var strokeDashArray1 = props.strokeDashArray;
                var rotateLabel = (_o = props.rotateLabel) !== null && _o !== void 0 ? _o : constants_1.AxesAndRulesDefaults.rotateLabel;
                var isAnimated = (_p = props.isAnimated) !== null && _p !== void 0 ? _p : constants_1.LineDefaults.isAnimated;
                var hideDataPoints1 = (_q = props.hideDataPoints) !== null && _q !== void 0 ? _q : constants_1.LineDefaults.hideDataPoints;
                var color = props.color || "green";
                var colorNegative = props.colorNegative || "red";
                var startFillColor = props.startFillColor || "lightgreen";
                var endFillColor = props.endFillColor || "white";
                var startOpacity = (_r = props.startOpacity) !== null && _r !== void 0 ? _r : constants_1.LineDefaults.startOpacity;
                var endOpacity = (_s = props.endOpacity) !== null && _s !== void 0 ? _s : constants_1.LineDefaults.endOpacity;
                var startFillColorNegative = props.startFillColorNegative || "pink";
                var endFillColorNegative = props.endFillColorNegative || "white";
                var startOpacityNegative = (_t = props.startOpacityNegative) !== null && _t !== void 0 ? _t : constants_1.LineDefaults.startOpacity;
                var endOpacityNegative = (_u = props.endOpacityNegative) !== null && _u !== void 0 ? _u : constants_1.LineDefaults.endOpacity;
                var gradientDirection = props.gradientDirection || "vertical";
                var showXAxisIndices = (_v = props.showXAxisIndices) !== null && _v !== void 0 ? _v : constants_1.AxesAndRulesDefaults.showXAxisIndices;
                var xAxisIndicesHeight = (_w = props.xAxisIndicesHeight) !== null && _w !== void 0 ? _w : constants_1.AxesAndRulesDefaults.xAxisIndicesHeight;
                var xAxisIndicesWidth = (_x = props.xAxisIndicesWidth) !== null && _x !== void 0 ? _x : constants_1.AxesAndRulesDefaults.xAxisIndicesWidth;
                var xAxisIndicesColor = (_y = props.xAxisIndicesColor) !== null && _y !== void 0 ? _y : constants_1.AxesAndRulesDefaults.xAxisIndicesColor;
                var xAxisTextNumberOfLines = (_z = props.xAxisTextNumberOfLines) !== null && _z !== void 0 ? _z : constants_1.AxesAndRulesDefaults.xAxisTextNumberOfLines;
                var horizontalRulesStyle = props.horizontalRulesStyle;
                var showFractionalValues = (_0 = props.showFractionalValues) !== null && _0 !== void 0 ? _0 : constants_1.AxesAndRulesDefaults.showFractionalValues;
                var yAxisLabelWidth = (_1 = props.yAxisLabelWidth) !== null && _1 !== void 0 ? _1 : (props.hideYAxisText
                    ? constants_1.AxesAndRulesDefaults.yAxisEmptyLabelWidth
                    : constants_1.AxesAndRulesDefaults.yAxisLabelWidth);
                var horizontal = false;
                var yAxisAtTop = false;
                var disableScroll = (_2 = props.disableScroll) !== null && _2 !== void 0 ? _2 : constants_1.LineDefaults.disableScroll;
                var showScrollIndicator = props.showScrollIndicator || constants_1.LineDefaults.showScrollIndicator;
                var focusEnabled = (_3 = props.focusEnabled) !== null && _3 !== void 0 ? _3 : constants_1.LineDefaults.focusEnabled;
                var showDataPointOnFocus = (_4 = props.showDataPointOnFocus) !== null && _4 !== void 0 ? _4 : constants_1.LineDefaults.showDataPointOnFocus;
                var showStripOnFocus = (_5 = props.showStripOnFocus) !== null && _5 !== void 0 ? _5 : constants_1.LineDefaults.showStripOnFocus;
                var showTextOnFocus = (_6 = props.showTextOnFocus) !== null && _6 !== void 0 ? _6 : constants_1.LineDefaults.showTextOnFocus;
                var stripHeight = props.stripHeight;
                var stripWidth = (_7 = props.stripWidth) !== null && _7 !== void 0 ? _7 : constants_1.LineDefaults.stripWidth;
                var stripColor = (_8 = props.stripColor) !== null && _8 !== void 0 ? _8 : color;
                var stripOpacity = (_9 = props.stripOpacity) !== null && _9 !== void 0 ? _9 : (startOpacity + endOpacity) / 2;
                var unFocusOnPressOut = (_10 = props.unFocusOnPressOut) !== null && _10 !== void 0 ? _10 : constants_1.LineDefaults.unFocusOnPressOut;
                var delayBeforeUnFocus = (_11 = props.delayBeforeUnFocus) !== null && _11 !== void 0 ? _11 : constants_1.LineDefaults.delayBeforeUnFocus;
                horizSections.pop();
                for (var i = 0; i <= noOfSections; i++) {
                    var value = maxValue - stepValue * i;
                    if (props.showFractionalValues || props.roundToDigits) {
                        value = parseFloat(value.toFixed(props.roundToDigits || 1));
                    }
                    horizSections.push({
                        value: props.yAxisLabelTexts
                            ? (_12 = props.yAxisLabelTexts[noOfSections - i]) !== null && _12 !== void 0 ? _12 : value.toString()
                            : value.toString(),
                    });
                }
                var barAndLineChartsWrapperProps = {
                    chartType: constants_1.chartTypes.LINE_BI_COLOR,
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
                    points2: "", // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
                    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
                    remainingScrollViewProps: {},
                    //horizSectionProps-
                    width: props.width,
                    horizSections: horizSections,
                    endSpacing: endSpacing,
                    horizontalRulesStyle: horizontalRulesStyle,
                    noOfSections: noOfSections,
                    showFractionalValues: showFractionalValues,
                    axesAndRulesProps: utils_1.getAxesAndRulesProps(props, stepValue, undefined),
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
                    endReachedOffset: (_13 = props.endReachedOffset) !== null && _13 !== void 0 ? _13 : constants_1.LineDefaults.endReachedOffset,
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
                    barAndLineChartsWrapperProps: barAndLineChartsWrapperProps,
                };
            });
        }
    };
});
//# sourceMappingURL=LineChartBiColor.js.map