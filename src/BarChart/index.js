System.register(["react", "../utils", "../utils/constants"], function (exports_1, context_1) {
    "use strict";
    var react_1, utils_1, constants_1, useBarChart;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            exports_1("useBarChart", useBarChart = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36;
                var heightValue = props.heightValue, widthValue = props.widthValue, opacValue = props.opacValue;
                var _37 = react_1.useState(""), points = _37[0], setPoints = _37[1];
                var _38 = react_1.useState(""), points2 = _38[0], setPoints2 = _38[1];
                var _39 = react_1.useState(""), arrowPoints = _39[0], setArrowPoints = _39[1];
                var _40 = react_1.useState(-1), selectedIndex = _40[0], setSelectedIndex = _40[1];
                var showLine = props.showLine || constants_1.BarDefaults.showLine;
                var spacing = (_a = props.spacing) !== null && _a !== void 0 ? _a : constants_1.BarDefaults.spacing;
                var initialSpacing = (_b = props.initialSpacing) !== null && _b !== void 0 ? _b : spacing;
                var endSpacing = (_c = props.endSpacing) !== null && _c !== void 0 ? _c : spacing;
                var showFractionalValues = props.showFractionalValues || constants_1.AxesAndRulesDefaults.showFractionalValues;
                var horizontal = (_d = props.horizontal) !== null && _d !== void 0 ? _d : constants_1.BarDefaults.horizontal;
                var rtl = (_e = props.rtl) !== null && _e !== void 0 ? _e : constants_1.BarDefaults.rtl;
                var yAxisAtTop = (_f = props.yAxisAtTop) !== null && _f !== void 0 ? _f : constants_1.BarDefaults.yAxisAtTop;
                var intactTopLabel = (_g = props.intactTopLabel) !== null && _g !== void 0 ? _g : constants_1.BarDefaults.intactTopLabel;
                var heightFromProps = horizontal ? props.width : props.height;
                var widthFromProps = horizontal ? props.height : props.width;
                var isAnimated = (_h = props.isAnimated) !== null && _h !== void 0 ? _h : constants_1.BarDefaults.isAnimated;
                var animationDuration = (_j = props.animationDuration) !== null && _j !== void 0 ? _j : constants_1.BarDefaults.animationDuration;
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
                var secondaryData = utils_1.getSecondaryDataWithOffsetIncluded(props.secondaryData, props.secondaryYAxis);
                var lineData = react_1.useMemo(function () {
                    var _a;
                    if (!props.lineData) {
                        return (_a = props.stackData) !== null && _a !== void 0 ? _a : data;
                    }
                    if (props.yAxisOffset) {
                        return props.lineData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return props.lineData;
                }, [props.yAxisOffset, props.lineData, data, props.stackData]);
                var lineData2 = props.lineData2;
                var lineBehindBars = props.lineBehindBars || constants_1.BarDefaults.lineBehindBars;
                constants_1.defaultLineConfig.initialSpacing = initialSpacing;
                constants_1.defaultLineConfig.endIndex = lineData.length - 1;
                constants_1.defaultLineConfig.animationDuration = animationDuration;
                var lineConfig = props.lineConfig
                    ? utils_1.getLineConfigForBarChart(props.lineConfig, initialSpacing)
                    : constants_1.defaultLineConfig;
                var lineConfig2 = props.lineConfig2
                    ? utils_1.getLineConfigForBarChart(props.lineConfig2, initialSpacing)
                    : constants_1.defaultLineConfig;
                var noOfSections = utils_1.getNoOfSections(props.noOfSections, props.maxValue, props.stepValue);
                var containerHeight = heightFromProps !== null && heightFromProps !== void 0 ? heightFromProps : (((_k = props.stepHeight) !== null && _k !== void 0 ? _k : 0) * noOfSections ||
                    constants_1.AxesAndRulesDefaults.containerHeight);
                var horizSections = [{ value: "0" }];
                var stepHeight = (_l = props.stepHeight) !== null && _l !== void 0 ? _l : containerHeight / noOfSections;
                var labelWidth = (_m = props.labelWidth) !== null && _m !== void 0 ? _m : constants_1.AxesAndRulesDefaults.labelWidth;
                var scrollToEnd = (_o = props.scrollToEnd) !== null && _o !== void 0 ? _o : constants_1.BarDefaults.scrollToEnd;
                var scrollAnimation = (_p = props.scrollAnimation) !== null && _p !== void 0 ? _p : constants_1.BarDefaults.scrollAnimation;
                var scrollEventThrottle = (_q = props.scrollEventThrottle) !== null && _q !== void 0 ? _q : constants_1.BarDefaults.scrollEventThrottle;
                var labelsExtraHeight = (_r = props.labelsExtraHeight) !== null && _r !== void 0 ? _r : constants_1.AxesAndRulesDefaults.labelsExtraHeight;
                var totalWidth = initialSpacing;
                var maxItem = 0, minItem = 0;
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
                            ((_b = (_a = stackItem.stacks[0].barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : constants_1.BarDefaults.barWidth) + spacing;
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
                            ((_b = (_a = item.barWidth) !== null && _a !== void 0 ? _a : props.barWidth) !== null && _b !== void 0 ? _b : constants_1.BarDefaults.barWidth) +
                                ((_c = item.spacing) !== null && _c !== void 0 ? _c : spacing);
                    });
                }
                var secondaryMaxItem = 0, secondaryMinItem = 0;
                if (lineConfig.isSecondary) {
                    lineData.forEach(function (item) {
                        if (item.value > secondaryMaxItem) {
                            secondaryMaxItem = item.value;
                        }
                        if (item.value < secondaryMinItem) {
                            secondaryMinItem = item.value;
                        }
                    });
                }
                var maxAndMin = utils_1.maxAndMinUtil(maxItem, minItem, props.roundToDigits, props.showFractionalValues);
                var secondaryMaxAndMin = utils_1.maxAndMinUtil(secondaryMaxItem, secondaryMinItem, props.roundToDigits, props.showFractionalValues);
                var maxValue = utils_1.getMaxValue(props.maxValue, props.stepValue, noOfSections, maxAndMin.maxItem);
                var secondaryMaxValue = lineConfig.isSecondary
                    ? secondaryMaxAndMin.maxItem
                    : maxValue;
                var mostNegativeValue = (_s = props.mostNegativeValue) !== null && _s !== void 0 ? _s : maxAndMin.minItem;
                var stepValue = (_t = props.stepValue) !== null && _t !== void 0 ? _t : maxValue / noOfSections;
                var noOfSectionsBelowXAxis = (_u = props.noOfSectionsBelowXAxis) !== null && _u !== void 0 ? _u : -mostNegativeValue / stepValue;
                var showScrollIndicator = (_v = props.showScrollIndicator) !== null && _v !== void 0 ? _v : constants_1.BarDefaults.showScrollIndicator;
                var side = (_w = props.side) !== null && _w !== void 0 ? _w : constants_1.BarDefaults.side;
                var rotateLabel = (_x = props.rotateLabel) !== null && _x !== void 0 ? _x : constants_1.AxesAndRulesDefaults.rotateLabel;
                var opacity = (_y = props.opacity) !== null && _y !== void 0 ? _y : constants_1.BarDefaults.opacity;
                var isThreeD = (_z = props.isThreeD) !== null && _z !== void 0 ? _z : constants_1.BarDefaults.isThreeD;
                var showXAxisIndices = (_0 = props.showXAxisIndices) !== null && _0 !== void 0 ? _0 : constants_1.AxesAndRulesDefaults.showXAxisIndices;
                var xAxisIndicesHeight = (_1 = props.xAxisIndicesHeight) !== null && _1 !== void 0 ? _1 : constants_1.AxesAndRulesDefaults.xAxisIndicesHeight;
                var xAxisIndicesWidth = (_2 = props.xAxisIndicesWidth) !== null && _2 !== void 0 ? _2 : constants_1.AxesAndRulesDefaults.xAxisIndicesWidth;
                var xAxisIndicesColor = (_3 = props.xAxisIndicesColor) !== null && _3 !== void 0 ? _3 : constants_1.AxesAndRulesDefaults.xAxisIndicesColor;
                var xAxisThickness = (_4 = props.xAxisThickness) !== null && _4 !== void 0 ? _4 : constants_1.AxesAndRulesDefaults.xAxisThickness;
                var xAxisTextNumberOfLines = (_5 = props.xAxisTextNumberOfLines) !== null && _5 !== void 0 ? _5 : constants_1.AxesAndRulesDefaults.xAxisTextNumberOfLines;
                var xAxisLabelsVerticalShift = (_6 = props.xAxisLabelsVerticalShift) !== null && _6 !== void 0 ? _6 : constants_1.AxesAndRulesDefaults.xAxisLabelsVerticalShift;
                var horizontalRulesStyle = props.horizontalRulesStyle;
                var yAxisLabelWidth = (_7 = props.yAxisLabelWidth) !== null && _7 !== void 0 ? _7 : (props.hideYAxisText
                    ? constants_1.AxesAndRulesDefaults.yAxisEmptyLabelWidth
                    : constants_1.AxesAndRulesDefaults.yAxisLabelWidth);
                var autoShiftLabels = (_8 = props.autoShiftLabels) !== null && _8 !== void 0 ? _8 : false;
                var barWidth = props.barWidth || constants_1.BarDefaults.barWidth;
                var barBorderColor = (_9 = props.barBorderColor) !== null && _9 !== void 0 ? _9 : constants_1.BarDefaults.barBorderColor;
                var extendedContainerHeight = utils_1.getExtendedContainerHeightWithPadding(containerHeight, 0);
                var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
                var _41 = react_1.useState(-1), pointerIndex = _41[0], setPointerIndex = _41[1];
                var _42 = react_1.useState(0), pointerX = _42[0], setPointerX = _42[1];
                var _43 = react_1.useState(0), pointerY = _43[0], setPointerY = _43[1];
                var _44 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem = _44[0], setPointerItem = _44[1];
                var _45 = react_1.useState(0), responderStartTime = _45[0], setResponderStartTime = _45[1];
                var _46 = react_1.useState(false), responderActive = _46[0], setResponderActive = _46[1];
                var pointerConfig = props.pointerConfig;
                var getPointerProps = props.getPointerProps || null;
                var pointerHeight = (_10 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.height) !== null && _10 !== void 0 ? _10 : constants_1.defaultPointerConfig.height;
                var pointerWidth = (_11 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.width) !== null && _11 !== void 0 ? _11 : constants_1.defaultPointerConfig.width;
                var pointerRadius = (_12 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.radius) !== null && _12 !== void 0 ? _12 : constants_1.defaultPointerConfig.radius;
                var pointerColor = (_13 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerColor) !== null && _13 !== void 0 ? _13 : constants_1.defaultPointerConfig.pointerColor;
                var pointerComponent = (_14 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerComponent) !== null && _14 !== void 0 ? _14 : constants_1.defaultPointerConfig.pointerComponent;
                var showPointerStrip = (pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.showPointerStrip) === false
                    ? false
                    : constants_1.defaultPointerConfig.showPointerStrip;
                var pointerStripHeight = (_15 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripHeight) !== null && _15 !== void 0 ? _15 : constants_1.defaultPointerConfig.pointerStripHeight;
                var pointerStripWidth = (_16 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripWidth) !== null && _16 !== void 0 ? _16 : constants_1.defaultPointerConfig.pointerStripWidth;
                var pointerStripColor = (_17 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripColor) !== null && _17 !== void 0 ? _17 : constants_1.defaultPointerConfig.pointerStripColor;
                var pointerStripUptoDataPoint = (_18 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripUptoDataPoint) !== null && _18 !== void 0 ? _18 : constants_1.defaultPointerConfig.pointerStripUptoDataPoint;
                var pointerLabelComponent = (_19 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelComponent) !== null && _19 !== void 0 ? _19 : constants_1.defaultPointerConfig.pointerLabelComponent;
                var stripOverPointer = (_20 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripOverPointer) !== null && _20 !== void 0 ? _20 : constants_1.defaultPointerConfig.stripOverPointer;
                var shiftPointerLabelX = (_21 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelX) !== null && _21 !== void 0 ? _21 : constants_1.defaultPointerConfig.shiftPointerLabelX;
                var shiftPointerLabelY = (_22 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelY) !== null && _22 !== void 0 ? _22 : constants_1.defaultPointerConfig.shiftPointerLabelY;
                var pointerLabelWidth = (_23 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelWidth) !== null && _23 !== void 0 ? _23 : constants_1.defaultPointerConfig.pointerLabelWidth;
                var pointerLabelHeight = (_24 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelHeight) !== null && _24 !== void 0 ? _24 : constants_1.defaultPointerConfig.pointerLabelHeight;
                var autoAdjustPointerLabelPosition = (_25 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.autoAdjustPointerLabelPosition) !== null && _25 !== void 0 ? _25 : constants_1.defaultPointerConfig.autoAdjustPointerLabelPosition;
                var pointerVanishDelay = (_26 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerVanishDelay) !== null && _26 !== void 0 ? _26 : constants_1.defaultPointerConfig.pointerVanishDelay;
                var activatePointersOnLongPress = (_27 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersOnLongPress) !== null && _27 !== void 0 ? _27 : constants_1.defaultPointerConfig.activatePointersOnLongPress;
                var activatePointersDelay = (_28 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersDelay) !== null && _28 !== void 0 ? _28 : constants_1.defaultPointerConfig.activatePointersDelay;
                var initialPointerIndex = (_29 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerIndex) !== null && _29 !== void 0 ? _29 : constants_1.defaultPointerConfig.initialPointerIndex;
                var initialPointerAppearDelay = (_30 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerAppearDelay) !== null && _30 !== void 0 ? _30 : (isAnimated
                    ? animationDuration
                    : constants_1.defaultPointerConfig.initialPointerAppearDelay);
                var persistPointer = (_31 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.persistPointer) !== null && _31 !== void 0 ? _31 : constants_1.defaultPointerConfig.persistPointer;
                var hidePointer1 = (_32 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer1) !== null && _32 !== void 0 ? _32 : constants_1.defaultPointerConfig.hidePointer1;
                var pointerEvents = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerEvents;
                var stripBehindBars = (_33 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripBehindBars) !== null && _33 !== void 0 ? _33 : constants_1.defaultPointerConfig.stripBehindBars;
                var disableScroll = props.disableScroll ||
                    (pointerConfig
                        ? activatePointersOnLongPress
                            ? responderActive
                                ? true
                                : false
                            : true
                        : false);
                var barInnerComponent = props.barInnerComponent;
                react_1.useEffect(function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                    if (showLine) {
                        var pp = "", pp2 = "";
                        var firstBarWidth = (_d = (_c = (_b = ((_a = props.stackData) !== null && _a !== void 0 ? _a : data)) === null || _b === void 0 ? void 0 : _b[0].barWidth) !== null && _c !== void 0 ? _c : props.barWidth) !== null && _d !== void 0 ? _d : 30;
                        if (!lineConfig.curved) {
                            for (var i = 0; i < lineData.length; i++) {
                                if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                                    continue;
                                var currentBarWidth = (_g = (_f = (_e = data === null || data === void 0 ? void 0 : data[i]) === null || _e === void 0 ? void 0 : _e.barWidth) !== null && _f !== void 0 ? _f : props.barWidth) !== null && _g !== void 0 ? _g : constants_1.BarDefaults.barWidth;
                                var currentValue = props.lineData
                                    ? props.lineData[i].value
                                    : props.stackData
                                        ? props.stackData[i].stacks.reduce(function (total, item) { return total + item.value; }, 0)
                                        : data[i].value;
                                pp +=
                                    "L" +
                                        utils_1.getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig, spacing) +
                                        " " +
                                        utils_1.getYForLineInBar(currentValue, lineConfig.shiftY, containerHeight, lineConfig.isSecondary ? secondaryMaxValue : maxValue) +
                                        " ";
                            }
                            setPoints(pp.replace("L", "M"));
                            if (lineData.length > 1 && lineConfig.showArrow) {
                                var ppArray = pp.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints_1 = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, lineConfig.arrowConfig.length, lineConfig.arrowConfig.width, lineConfig.arrowConfig.showArrowBase);
                                setArrowPoints(arrowPoints_1);
                            }
                        }
                        else {
                            var p1Array = [];
                            for (var i = 0; i < lineData.length; i++) {
                                if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                                    continue;
                                var currentBarWidth = (_k = (_j = (_h = data === null || data === void 0 ? void 0 : data[i]) === null || _h === void 0 ? void 0 : _h.barWidth) !== null && _j !== void 0 ? _j : props.barWidth) !== null && _k !== void 0 ? _k : constants_1.BarDefaults.barWidth;
                                var currentValue = props.lineData
                                    ? props.lineData[i].value
                                    : props.stackData
                                        ? props.stackData[i].stacks.reduce(function (total, item) { return total + item.value; }, 0)
                                        : data[i].value;
                                p1Array.push([
                                    utils_1.getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig, spacing),
                                    utils_1.getYForLineInBar(currentValue, lineConfig.shiftY, containerHeight, lineConfig.isSecondary ? secondaryMaxValue : maxValue),
                                ]);
                                var xx = utils_1.svgPath(p1Array, lineConfig.curveType, lineConfig.curvature);
                                setPoints(xx);
                            }
                        }
                        if (lineData2 === null || lineData2 === void 0 ? void 0 : lineData2.length) {
                            if (!(lineConfig2 === null || lineConfig2 === void 0 ? void 0 : lineConfig2.curved)) {
                                for (var i = 0; i < lineData2.length; i++) {
                                    if (i < lineConfig2.startIndex || i > lineConfig2.endIndex)
                                        continue;
                                    var currentBarWidth = (_o = (_m = (_l = data === null || data === void 0 ? void 0 : data[i]) === null || _l === void 0 ? void 0 : _l.barWidth) !== null && _m !== void 0 ? _m : props.barWidth) !== null && _o !== void 0 ? _o : constants_1.BarDefaults.barWidth;
                                    var currentValue = lineData2[i].value;
                                    pp2 +=
                                        "L" +
                                            utils_1.getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig2, spacing) +
                                            " " +
                                            utils_1.getYForLineInBar(currentValue, lineConfig2.shiftY, containerHeight, lineConfig2.isSecondary ? secondaryMaxValue : maxValue) +
                                            " ";
                                }
                                setPoints2(pp2.replace("L", "M"));
                            }
                            else {
                                var p2Array = [];
                                for (var i = 0; i < lineData2.length; i++) {
                                    if (i < lineConfig2.startIndex || i > lineConfig2.endIndex)
                                        continue;
                                    var currentBarWidth = (_r = (_q = (_p = data === null || data === void 0 ? void 0 : data[i]) === null || _p === void 0 ? void 0 : _p.barWidth) !== null && _q !== void 0 ? _q : props.barWidth) !== null && _r !== void 0 ? _r : constants_1.BarDefaults.barWidth;
                                    var currentValue = lineData2[i].value;
                                    p2Array.push([
                                        utils_1.getXForLineInBar(i, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig2, spacing),
                                        utils_1.getYForLineInBar(currentValue, lineConfig2.shiftY, containerHeight, lineConfig2.isSecondary ? secondaryMaxValue : maxValue),
                                    ]);
                                    var xx = utils_1.svgPath(p2Array, lineConfig2.curveType, lineConfig2.curvature);
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
                    lineConfig.arrowConfig.length,
                    lineConfig.arrowConfig.width,
                    lineConfig.arrowConfig.showArrowBase,
                ]);
                react_1.useEffect(function () {
                    var _a, _b, _c, _d;
                    if (initialPointerIndex !== -1) {
                        var item_1 = (_b = ((_a = props.stackData) !== null && _a !== void 0 ? _a : data)) === null || _b === void 0 ? void 0 : _b[initialPointerIndex];
                        var stackItem = (_c = props.stackData) === null || _c === void 0 ? void 0 : _c[initialPointerIndex];
                        var stackSum = (_d = stackItem === null || stackItem === void 0 ? void 0 : stackItem.stacks) === null || _d === void 0 ? void 0 : _d.reduce(function (acc, stack) { var _a; return acc + ((_a = stack.value) !== null && _a !== void 0 ? _a : 0); }, 0);
                        var x_1 = initialSpacing +
                            (spacing + barWidth) * initialPointerIndex -
                            (pointerRadius || pointerWidth / 2) +
                            barWidth / 2;
                        var y_1 = containerHeight -
                            ((stackSum !== null && stackSum !== void 0 ? stackSum : data[initialPointerIndex].value) * containerHeight) /
                                maxValue -
                            (pointerRadius || pointerHeight / 2) +
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
                var animatedHeight = heightValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                });
                var appearingOpacity = opacValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                });
                var animatedWidth = widthValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, initialSpacing + totalWidth + endSpacing],
                });
                var getPropsCommonForBarAndStack = function (item, index) {
                    var _a;
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
                        disablePress: item.disablePress || props.disablePress,
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
                        leftShiftForTooltip: props.leftShiftForTooltip || 0,
                        initialSpacing: initialSpacing,
                        selectedIndex: selectedIndex,
                        setSelectedIndex: setSelectedIndex,
                        activeOpacity: props.activeOpacity || 0.2,
                        noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
                        leftShiftForLastIndexTooltip: props.leftShiftForLastIndexTooltip || 0,
                        label: item.label ||
                            (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                                ? props.xAxisLabelTexts[index]
                                : ""),
                        labelTextStyle: item.labelTextStyle || props.xAxisLabelTextStyle,
                        pointerConfig: pointerConfig,
                    };
                };
                var barAndLineChartsWrapperProps = {
                    chartType: constants_1.chartTypes.BAR,
                    containerHeight: containerHeight,
                    noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
                    stepHeight: stepHeight,
                    labelsExtraHeight: labelsExtraHeight,
                    yAxisLabelWidth: yAxisLabelWidth,
                    horizontal: horizontal,
                    rtl: rtl,
                    shiftX: (_34 = props.shiftX) !== null && _34 !== void 0 ? _34 : 0,
                    shiftY: (_35 = props.shiftY) !== null && _35 !== void 0 ? _35 : 0,
                    yAxisAtTop: yAxisAtTop,
                    initialSpacing: initialSpacing,
                    data: data,
                    stackData: props.stackData,
                    secondaryData: secondaryData,
                    barWidth: props.barWidth || constants_1.BarDefaults.barWidth,
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
                    //horizSectionProps-
                    width: widthFromProps,
                    horizSections: horizSections,
                    endSpacing: endSpacing,
                    horizontalRulesStyle: horizontalRulesStyle,
                    noOfSections: noOfSections,
                    showFractionalValues: showFractionalValues,
                    axesAndRulesProps: utils_1.getAxesAndRulesProps(props, stepValue, secondaryMaxValue),
                    yAxisLabelTexts: props.yAxisLabelTexts,
                    yAxisOffset: props.yAxisOffset,
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
                    endReachedOffset: (_36 = props.endReachedOffset) !== null && _36 !== void 0 ? _36 : constants_1.BarDefaults.endReachedOffset,
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
                };
            });
        }
    };
});
//# sourceMappingURL=index.js.map