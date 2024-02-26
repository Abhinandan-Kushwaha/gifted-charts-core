System.register(["../utils/constants"], function (exports_1, context_1) {
    "use strict";
    var constants_1, usePopulationPyramid;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            exports_1("usePopulationPyramid", usePopulationPyramid = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
                var _x = props.height, height = _x === void 0 ? constants_1.populationDefaults.height : _x, _y = props.width, width = _y === void 0 ? constants_1.populationDefaults.width : _y, _z = props.verticalMarginBetweenBars, verticalMarginBetweenBars = _z === void 0 ? constants_1.populationDefaults.verticalMarginBetweenBars : _z, _0 = props.barsMapToYAxisSections, barsMapToYAxisSections = _0 === void 0 ? constants_1.populationDefaults.barsMapToYAxisSections : _0, data = props.data, _1 = props.hideRules, hideRules = _1 === void 0 ? constants_1.AxesAndRulesDefaults.hideRules : _1, _2 = props.hideYAxisText, hideYAxisText = _2 === void 0 ? constants_1.AxesAndRulesDefaults.hideYAxisText : _2, _3 = props.yAxisColor, yAxisColor = _3 === void 0 ? constants_1.AxesAndRulesDefaults.yAxisColor : _3, _4 = props.yAxisThickness, yAxisThickness = _4 === void 0 ? constants_1.AxesAndRulesDefaults.yAxisThickness : _4, _5 = props.xAxisColor, xAxisColor = _5 === void 0 ? constants_1.AxesAndRulesDefaults.xAxisColor : _5, _6 = props.xAxisThickness, xAxisThickness = _6 === void 0 ? constants_1.AxesAndRulesDefaults.xAxisThickness : _6, _7 = props.xAxisType, xAxisType = _7 === void 0 ? constants_1.AxesAndRulesDefaults.xAxisType : _7, _8 = props.xAxisNoOfSections, xAxisNoOfSections = _8 === void 0 ? constants_1.populationDefaults.xAxisNoOfSections : _8, _9 = props.showXAxisIndices, showXAxisIndices = _9 === void 0 ? constants_1.populationDefaults.showXAxisIndices : _9, _10 = props.xAxisIndicesWidth, xAxisIndicesWidth = _10 === void 0 ? constants_1.populationDefaults.xAxisIndicesWidth : _10, _11 = props.xAxisIndicesHeight, xAxisIndicesHeight = _11 === void 0 ? constants_1.populationDefaults.xAxisIndicesHeight : _11, _12 = props.xAxisIndicesColor, xAxisIndicesColor = _12 === void 0 ? constants_1.populationDefaults.xAxisIndicesColor : _12, _13 = props.xAxisIndicesShiftY, xAxisIndicesShiftY = _13 === void 0 ? 0 : _13, _14 = props.showXAxisLabelTexts, showXAxisLabelTexts = _14 === void 0 ? constants_1.populationDefaults.showXAxisLabelTexts : _14, _15 = props.xAxisLabelFontSize, xAxisLabelFontSize = _15 === void 0 ? constants_1.populationDefaults.defaultFontSize : _15, _16 = props.xAxisLabelFontStyle, xAxisLabelFontStyle = _16 === void 0 ? constants_1.populationDefaults.defaultFontStyle : _16, _17 = props.xAxisLabelFontWeight, xAxisLabelFontWeight = _17 === void 0 ? constants_1.populationDefaults.defaultFontWeight : _17, _18 = props.xAxisLabelFontFamily, xAxisLabelFontFamily = _18 === void 0 ? constants_1.populationDefaults.defaultFontFamily : _18, _19 = props.xAxisLabelColor, xAxisLabelColor = _19 === void 0 ? constants_1.populationDefaults.defaultFontColor : _19, _20 = props.xAxisLabelShiftX, xAxisLabelShiftX = _20 === void 0 ? 0 : _20, _21 = props.xAxisLabelShiftY, xAxisLabelShiftY = _21 === void 0 ? 0 : _21, _22 = props.xAxisLabelPrefix, xAxisLabelPrefix = _22 === void 0 ? constants_1.populationDefaults.prefix : _22, _23 = props.xAxisLabelSuffix, xAxisLabelSuffix = _23 === void 0 ? constants_1.populationDefaults.suffix : _23, formatXAxisLabels = props.formatXAxisLabels, _24 = props.showVerticalLines, showVerticalLines = _24 === void 0 ? constants_1.populationDefaults.showVerticalLines : _24, _25 = props.verticalLinesColor, verticalLinesColor = _25 === void 0 ? constants_1.populationDefaults.verticalLinesColor : _25, _26 = props.verticalLinesThickness, verticalLinesThickness = _26 === void 0 ? constants_1.populationDefaults.verticalLinesThickness : _26, _27 = props.verticalLinesType, verticalLinesType = _27 === void 0 ? constants_1.populationDefaults.verticalLinesType : _27, _28 = props.verticalLinesStrokeDashArray, verticalLinesStrokeDashArray = _28 === void 0 ? constants_1.populationDefaults.verticalLinesStrokeDashArray : _28, _29 = props.showYAxisIndices, showYAxisIndices = _29 === void 0 ? constants_1.AxesAndRulesDefaults.showYAxisIndices : _29, _30 = props.yAxisIndicesWidth, yAxisIndicesWidth = _30 === void 0 ? constants_1.AxesAndRulesDefaults.yAxisIndicesWidth : _30, _31 = props.yAxisIndicesHeight, yAxisIndicesHeight = _31 === void 0 ? constants_1.AxesAndRulesDefaults.yAxisIndicesHeight : _31, _32 = props.yAxisIndicesColor, yAxisIndicesColor = _32 === void 0 ? constants_1.AxesAndRulesDefaults.yAxisIndicesColor : _32, _33 = props.yAxisLabelFontSize, yAxisLabelFontSize = _33 === void 0 ? constants_1.populationDefaults.defaultFontSize : _33, _34 = props.yAxisLabelFontStyle, yAxisLabelFontStyle = _34 === void 0 ? constants_1.populationDefaults.defaultFontStyle : _34, _35 = props.yAxisLabelFontWeight, yAxisLabelFontWeight = _35 === void 0 ? constants_1.populationDefaults.defaultFontWeight : _35, _36 = props.yAxisLabelFontFamily, yAxisLabelFontFamily = _36 === void 0 ? constants_1.populationDefaults.defaultFontFamily : _36, _37 = props.yAxisLabelColor, yAxisLabelColor = _37 === void 0 ? constants_1.populationDefaults.defaultFontColor : _37, _38 = props.yAxisLabelTextMarginRight, yAxisLabelTextMarginRight = _38 === void 0 ? constants_1.populationDefaults.yAxisLabelTextMarginRight : _38, _39 = props.yAxisLabelTexts, yAxisLabelTexts = _39 === void 0 ? [] : _39, _40 = props.showValuesAsBarLabels, showValuesAsBarLabels = _40 === void 0 ? constants_1.populationDefaults.showValuesAsBarLabels : _40, _41 = props.rulesThickness, rulesThickness = _41 === void 0 ? constants_1.AxesAndRulesDefaults.rulesThickness : _41, _42 = props.rulesColor, rulesColor = _42 === void 0 ? constants_1.AxesAndRulesDefaults.rulesColor : _42, _43 = props.rulesType, rulesType = _43 === void 0 ? constants_1.AxesAndRulesDefaults.rulesType : _43, _44 = props.dashWidth, dashWidth = _44 === void 0 ? constants_1.AxesAndRulesDefaults.dashWidth : _44, _45 = props.dashGap, dashGap = _45 === void 0 ? constants_1.AxesAndRulesDefaults.dashGap : _45, _46 = props.leftBarLabelWidth, leftBarLabelWidth = _46 === void 0 ? constants_1.populationDefaults.leftBarLabelWidth : _46, _47 = props.leftBarLabelFontSize, leftBarLabelFontSize = _47 === void 0 ? (_a = props.barLabelFontSize) !== null && _a !== void 0 ? _a : constants_1.populationDefaults.defaultFontSize : _47, _48 = props.leftBarLabelColor, leftBarLabelColor = _48 === void 0 ? (_b = props.barLabelColor) !== null && _b !== void 0 ? _b : constants_1.populationDefaults.defaultFontColor : _48, _49 = props.leftBarLabelFontStyle, leftBarLabelFontStyle = _49 === void 0 ? (_c = props.barLabelFontStyle) !== null && _c !== void 0 ? _c : constants_1.populationDefaults.defaultFontStyle : _49, _50 = props.leftBarLabelFontWeight, leftBarLabelFontWeight = _50 === void 0 ? (_d = props.barLabelFontWeight) !== null && _d !== void 0 ? _d : constants_1.populationDefaults.defaultFontWeight : _50, _51 = props.leftBarLabelFontFamily, leftBarLabelFontFamily = _51 === void 0 ? (_e = props.barLabelFontFamily) !== null && _e !== void 0 ? _e : constants_1.populationDefaults.defaultFontFamily : _51, _52 = props.leftBarLabelPrefix, leftBarLabelPrefix = _52 === void 0 ? constants_1.populationDefaults.prefix : _52, _53 = props.leftBarLabelSuffix, leftBarLabelSuffix = _53 === void 0 ? constants_1.populationDefaults.suffix : _53, _54 = props.rightBarLabelWidth, rightBarLabelWidth = _54 === void 0 ? constants_1.populationDefaults.rightBarLabelWidth : _54, _55 = props.rightBarLabelFontSize, rightBarLabelFontSize = _55 === void 0 ? (_f = props.barLabelFontSize) !== null && _f !== void 0 ? _f : constants_1.populationDefaults.defaultFontSize : _55, _56 = props.rightBarLabelColor, rightBarLabelColor = _56 === void 0 ? (_g = props.barLabelColor) !== null && _g !== void 0 ? _g : constants_1.populationDefaults.defaultFontColor : _56, _57 = props.rightBarLabelFontStyle, rightBarLabelFontStyle = _57 === void 0 ? (_h = props.barLabelFontStyle) !== null && _h !== void 0 ? _h : constants_1.populationDefaults.defaultFontStyle : _57, _58 = props.rightBarLabelFontWeight, rightBarLabelFontWeight = _58 === void 0 ? (_j = props.barLabelFontWeight) !== null && _j !== void 0 ? _j : constants_1.populationDefaults.defaultFontWeight : _58, _59 = props.rightBarLabelFontFamily, rightBarLabelFontFamily = _59 === void 0 ? (_k = props.barLabelFontFamily) !== null && _k !== void 0 ? _k : constants_1.populationDefaults.defaultFontFamily : _59, _60 = props.rightBarLabelPrefix, rightBarLabelPrefix = _60 === void 0 ? constants_1.populationDefaults.prefix : _60, _61 = props.rightBarLabelSuffix, rightBarLabelSuffix = _61 === void 0 ? constants_1.populationDefaults.suffix : _61, formatBarLabels = props.formatBarLabels, _62 = props.showMidAxis, showMidAxis = _62 === void 0 ? constants_1.populationDefaults.showMidAxis : _62, _63 = props.midAxisLabelWidth, midAxisLabelWidth = _63 === void 0 ? constants_1.populationDefaults.midAxisLabelWidth : _63, _64 = props.midAxisLabelFontSize, midAxisLabelFontSize = _64 === void 0 ? constants_1.populationDefaults.defaultFontSize : _64, _65 = props.midAxisLabelColor, midAxisLabelColor = _65 === void 0 ? constants_1.populationDefaults.defaultFontColor : _65, _66 = props.midAxisLabelFontStyle, midAxisLabelFontStyle = _66 === void 0 ? constants_1.populationDefaults.defaultFontStyle : _66, _67 = props.midAxisLabelFontWeight, midAxisLabelFontWeight = _67 === void 0 ? constants_1.populationDefaults.defaultFontWeight : _67, _68 = props.midAxisLabelFontFamily, midAxisLabelFontFamily = _68 === void 0 ? constants_1.populationDefaults.defaultFontFamily : _68, _69 = props.leftBarColor, leftBarColor = _69 === void 0 ? constants_1.populationDefaults.leftBarColor : _69, _70 = props.rightBarColor, rightBarColor = _70 === void 0 ? constants_1.populationDefaults.rightBarColor : _70, _71 = props.leftBarBorderColor, leftBarBorderColor = _71 === void 0 ? constants_1.populationDefaults.leftBarBorderColor : _71, _72 = props.rightBarBorderColor, rightBarBorderColor = _72 === void 0 ? constants_1.populationDefaults.rightBarBorderColor : _72, _73 = props.leftBarBorderWidth, leftBarBorderWidth = _73 === void 0 ? (_l = props.barBorderWidth) !== null && _l !== void 0 ? _l : constants_1.populationDefaults.leftBarBorderWidth : _73, _74 = props.rightBarBorderWidth, rightBarBorderWidth = _74 === void 0 ? (_m = props.barBorderWidth) !== null && _m !== void 0 ? _m : constants_1.populationDefaults.rightBarBorderWidth : _74, _75 = props.leftBarBorderRadius, leftBarBorderRadius = _75 === void 0 ? (_o = props.barBorderRadius) !== null && _o !== void 0 ? _o : constants_1.populationDefaults.leftBarBorderRadius : _75, _76 = props.rightBarBorderRadius, rightBarBorderRadius = _76 === void 0 ? (_p = props.barBorderRadius) !== null && _p !== void 0 ? _p : constants_1.populationDefaults.rightBarBorderRadius : _76, _77 = props.allCornersRounded, allCornersRounded = _77 === void 0 ? constants_1.populationDefaults.allCornersRounded : _77, _78 = props.showSurplus, showSurplus = _78 === void 0 ? constants_1.populationDefaults.showSurplus : _78, _79 = props.showSurplusLeft, showSurplusLeft = _79 === void 0 ? constants_1.populationDefaults.showSurplusLeft : _79, _80 = props.showSurplusRight, showSurplusRight = _80 === void 0 ? constants_1.populationDefaults.showSurplusRight : _80, _81 = props.leftSurplusColor, leftSurplusColor = _81 === void 0 ? constants_1.populationDefaults.leftSurplusColor : _81, _82 = props.leftSurplusBorderColor, leftSurplusBorderColor = _82 === void 0 ? constants_1.populationDefaults.leftSurplusBorderColor : _82, _83 = props.rightSurplusColor, rightSurplusColor = _83 === void 0 ? constants_1.populationDefaults.rightSurplusColor : _83, _84 = props.rightSurplusBorderColor, rightSurplusBorderColor = _84 === void 0 ? constants_1.populationDefaults.rightSurplusBorderColor : _84, _85 = props.leftSurplusBorderWidth, leftSurplusBorderWidth = _85 === void 0 ? constants_1.populationDefaults.leftSurplusBorderWidth : _85, _86 = props.rightSurplusBorderWidth, rightSurplusBorderWidth = _86 === void 0 ? constants_1.populationDefaults.rightSurplusBorderWidth : _86;
                var yAxisLabelWidth = hideYAxisText
                    ? yAxisThickness
                    : (_q = props.yAxisLabelWidth) !== null && _q !== void 0 ? _q : constants_1.AxesAndRulesDefaults.yAxisLabelWidth;
                var noOfSections = (_r = props.noOfSections) !== null && _r !== void 0 ? _r : data.length;
                var containerHeight = props.stepHeight
                    ? props.stepHeight * noOfSections
                    : height;
                var stepHeight = (_s = props.stepHeight) !== null && _s !== void 0 ? _s : containerHeight / noOfSections;
                var xAxisLabelsHeight = 80;
                var containerHeightWithXaxisLabels = containerHeight + xAxisLabelsHeight;
                var mid = (width + yAxisLabelWidth) / 2;
                var leftMax = Math.max.apply(Math, data.map(function (item) { return item.left; }));
                var rightMax = Math.max.apply(Math, data.map(function (item) { return item.right; }));
                var max = Math.max(leftMax, rightMax);
                var xAxisRoundToDigits = (_t = props.xAxisRoundToDigits) !== null && _t !== void 0 ? _t : (max < 0.1 ? 3 : max < 1 ? 2 : max < 10 ? 1 : 0);
                var midAxisAndLabelWidth = (showMidAxis ? midAxisLabelWidth : 0) / 2 +
                    Math.max(leftBarLabelWidth, rightBarLabelWidth);
                var barWidthFactor = ((width - yAxisLabelWidth) / 2 - midAxisAndLabelWidth) / max;
                var leftXAfterMid = mid - (showMidAxis ? midAxisLabelWidth / 2 : 0);
                var rightXAfterMid = mid + (showMidAxis ? midAxisLabelWidth / 2 : 0);
                var yAxisLineProps = {
                    x1: yAxisLabelWidth,
                    y1: 0,
                    x2: yAxisLabelWidth,
                    y2: containerHeight,
                    stroke: yAxisColor,
                    strokeWidth: yAxisThickness,
                };
                if (((_u = props.yAxisStrokeDashArray) === null || _u === void 0 ? void 0 : _u.length) === 2) {
                    yAxisLineProps.strokeDasharray = props.yAxisStrokeDashArray;
                }
                var midAxisLineCommonProps = {
                    y1: 0,
                    y2: containerHeight,
                    strokeWidth: (_v = props.midAxisThickness) !== null && _v !== void 0 ? _v : yAxisThickness,
                };
                if (((_w = props.midAxisStrokeDashArray) === null || _w === void 0 ? void 0 : _w.length) === 2) {
                    midAxisLineCommonProps.strokeDasharray = props.midAxisStrokeDashArray;
                }
                var xAxisLabelY = containerHeight + xAxisLabelFontSize + 6 + xAxisLabelShiftY;
                var xAxisIndicesCommonProps = {
                    y1: containerHeight - xAxisIndicesHeight / 2 + xAxisIndicesShiftY,
                    y2: containerHeight + xAxisIndicesHeight / 2 + xAxisIndicesShiftY,
                    stroke: xAxisIndicesColor,
                    strokeWidth: xAxisIndicesWidth,
                };
                var verticalLinesCommonProps = {
                    y1: 0,
                    y2: containerHeight,
                    stroke: verticalLinesColor,
                    strokeWidth: verticalLinesThickness,
                };
                if (verticalLinesType !== constants_1.ruleTypes.SOLID) {
                    verticalLinesCommonProps.strokeDasharray = verticalLinesStrokeDashArray;
                }
                var xAxisLabelsCommonProps = {
                    y: xAxisLabelY + xAxisLabelShiftY,
                    stroke: xAxisLabelColor,
                    fontSize: xAxisLabelFontSize,
                    fontStyle: xAxisLabelFontStyle,
                    fontWeight: xAxisLabelFontWeight,
                    fontFamily: xAxisLabelFontFamily,
                };
                var getXLabel = function (index) {
                    return ((leftXAfterMid * index) / xAxisNoOfSections / barWidthFactor)
                        .toFixed(xAxisRoundToDigits)
                        .toString();
                };
                return {
                    height: height,
                    width: width,
                    verticalMarginBetweenBars: verticalMarginBetweenBars,
                    barsMapToYAxisSections: barsMapToYAxisSections,
                    data: data,
                    hideRules: hideRules,
                    hideYAxisText: hideYAxisText,
                    yAxisColor: yAxisColor,
                    yAxisThickness: yAxisThickness,
                    xAxisColor: xAxisColor,
                    xAxisThickness: xAxisThickness,
                    xAxisType: xAxisType,
                    xAxisNoOfSections: xAxisNoOfSections,
                    showXAxisIndices: showXAxisIndices,
                    xAxisIndicesWidth: xAxisIndicesWidth,
                    xAxisIndicesHeight: xAxisIndicesHeight,
                    xAxisIndicesColor: xAxisIndicesColor,
                    xAxisIndicesShiftY: xAxisIndicesShiftY,
                    showXAxisLabelTexts: showXAxisLabelTexts,
                    xAxisLabelFontSize: xAxisLabelFontSize,
                    xAxisLabelFontStyle: xAxisLabelFontStyle,
                    xAxisLabelFontWeight: xAxisLabelFontWeight,
                    xAxisLabelFontFamily: xAxisLabelFontFamily,
                    xAxisLabelColor: xAxisLabelColor,
                    xAxisLabelShiftX: xAxisLabelShiftX,
                    xAxisLabelShiftY: xAxisLabelShiftY,
                    xAxisLabelPrefix: xAxisLabelPrefix,
                    xAxisLabelSuffix: xAxisLabelSuffix,
                    formatXAxisLabels: formatXAxisLabels,
                    showVerticalLines: showVerticalLines,
                    verticalLinesColor: verticalLinesColor,
                    verticalLinesThickness: verticalLinesThickness,
                    verticalLinesType: verticalLinesType,
                    verticalLinesStrokeDashArray: verticalLinesStrokeDashArray,
                    showYAxisIndices: showYAxisIndices,
                    yAxisIndicesWidth: yAxisIndicesWidth,
                    yAxisIndicesHeight: yAxisIndicesHeight,
                    yAxisIndicesColor: yAxisIndicesColor,
                    yAxisLabelFontSize: yAxisLabelFontSize,
                    yAxisLabelFontStyle: yAxisLabelFontStyle,
                    yAxisLabelFontWeight: yAxisLabelFontWeight,
                    yAxisLabelFontFamily: yAxisLabelFontFamily,
                    yAxisLabelColor: yAxisLabelColor,
                    yAxisLabelTextMarginRight: yAxisLabelTextMarginRight,
                    yAxisLabelTexts: yAxisLabelTexts,
                    showValuesAsBarLabels: showValuesAsBarLabels,
                    rulesThickness: rulesThickness,
                    rulesColor: rulesColor,
                    rulesType: rulesType,
                    dashWidth: dashWidth,
                    dashGap: dashGap,
                    leftBarLabelWidth: leftBarLabelWidth,
                    leftBarLabelFontSize: leftBarLabelFontSize,
                    leftBarLabelColor: leftBarLabelColor,
                    leftBarLabelFontStyle: leftBarLabelFontStyle,
                    leftBarLabelFontWeight: leftBarLabelFontWeight,
                    leftBarLabelFontFamily: leftBarLabelFontFamily,
                    leftBarLabelPrefix: leftBarLabelPrefix,
                    leftBarLabelSuffix: leftBarLabelSuffix,
                    rightBarLabelWidth: rightBarLabelWidth,
                    rightBarLabelFontSize: rightBarLabelFontSize,
                    rightBarLabelColor: rightBarLabelColor,
                    rightBarLabelFontStyle: rightBarLabelFontStyle,
                    rightBarLabelFontWeight: rightBarLabelFontWeight,
                    rightBarLabelFontFamily: rightBarLabelFontFamily,
                    rightBarLabelPrefix: rightBarLabelPrefix,
                    rightBarLabelSuffix: rightBarLabelSuffix,
                    formatBarLabels: formatBarLabels,
                    showMidAxis: showMidAxis,
                    midAxisLabelWidth: midAxisLabelWidth,
                    midAxisLabelFontSize: midAxisLabelFontSize,
                    midAxisLabelColor: midAxisLabelColor,
                    midAxisLabelFontStyle: midAxisLabelFontStyle,
                    midAxisLabelFontWeight: midAxisLabelFontWeight,
                    midAxisLabelFontFamily: midAxisLabelFontFamily,
                    leftBarColor: leftBarColor,
                    rightBarColor: rightBarColor,
                    leftBarBorderColor: leftBarBorderColor,
                    rightBarBorderColor: rightBarBorderColor,
                    leftBarBorderWidth: leftBarBorderWidth,
                    rightBarBorderWidth: rightBarBorderWidth,
                    leftBarBorderRadius: leftBarBorderRadius,
                    rightBarBorderRadius: rightBarBorderRadius,
                    allCornersRounded: allCornersRounded,
                    showSurplus: showSurplus,
                    showSurplusLeft: showSurplusLeft,
                    showSurplusRight: showSurplusRight,
                    leftSurplusColor: leftSurplusColor,
                    leftSurplusBorderColor: leftSurplusBorderColor,
                    rightSurplusColor: rightSurplusColor,
                    rightSurplusBorderColor: rightSurplusBorderColor,
                    leftSurplusBorderWidth: leftSurplusBorderWidth,
                    rightSurplusBorderWidth: rightSurplusBorderWidth,
                    yAxisLabelWidth: yAxisLabelWidth,
                    noOfSections: noOfSections,
                    containerHeight: containerHeight,
                    stepHeight: stepHeight,
                    xAxisLabelsHeight: xAxisLabelsHeight,
                    containerHeightWithXaxisLabels: containerHeightWithXaxisLabels,
                    mid: mid,
                    leftMax: leftMax,
                    rightMax: rightMax,
                    max: max,
                    xAxisRoundToDigits: xAxisRoundToDigits,
                    midAxisAndLabelWidth: midAxisAndLabelWidth,
                    barWidthFactor: barWidthFactor,
                    leftXAfterMid: leftXAfterMid,
                    rightXAfterMid: rightXAfterMid,
                    yAxisLineProps: yAxisLineProps,
                    midAxisLineCommonProps: midAxisLineCommonProps,
                    xAxisLabelY: xAxisLabelY,
                    xAxisIndicesCommonProps: xAxisIndicesCommonProps,
                    verticalLinesCommonProps: verticalLinesCommonProps,
                    xAxisLabelsCommonProps: xAxisLabelsCommonProps,
                    getXLabel: getXLabel,
                };
            });
        }
    };
});
//# sourceMappingURL=index.js.map