System.register(["react", "../utils/constants", "../utils", "../utils/types"], function (exports_1, context_1) {
    "use strict";
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
    var react_1, constants_1, utils_1, types_1, useLineChart;
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
            },
            function (types_1_1) {
                types_1 = types_1_1;
            }
        ],
        execute: function () {
            exports_1("useLineChart", useLineChart = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204, _205, _206, _207, _208, _209, _210, _211, _212, _213, _214, _215, _216, _217, _218, _219, _220, _221, _222, _223, _224, _225, _226, _227, _228, _229, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239, _240, _241, _242, _243, _244, _245, _246, _247, _248, _249, _250, _251, _252, _253, _254, _255, _256, _257, _258, _259, _260, _261, _262, _263, _264, _265, _266;
                var animations = props.animations, showDataPointsForMissingValues = props.showDataPointsForMissingValues, _267 = props.interpolateMissingValues, interpolateMissingValues = _267 === void 0 ? true : _267, onlyPositive = props.onlyPositive;
                var curvature = (_a = props.curvature) !== null && _a !== void 0 ? _a : constants_1.LineDefaults.curvature;
                var curveType = (_b = props.curveType) !== null && _b !== void 0 ? _b : constants_1.LineDefaults.curveType;
                var _268 = react_1.useState(0), scrollX = _268[0], setScrollX = _268[1];
                var _269 = react_1.useState(""), arrow1Points = _269[0], setArrow1Points = _269[1];
                var _270 = react_1.useState(""), arrow2Points = _270[0], setArrow2Points = _270[1];
                var _271 = react_1.useState(""), arrow3Points = _271[0], setArrow3Points = _271[1];
                var _272 = react_1.useState(""), arrow4Points = _272[0], setArrow4Points = _272[1];
                var _273 = react_1.useState(""), arrow5Points = _273[0], setArrow5Points = _273[1];
                var _274 = react_1.useState(""), secondaryArrowPoints = _274[0], setSecondaryArrowPoints = _274[1];
                var _275 = react_1.useState(-1), pointerIndex = _275[0], setPointerIndex = _275[1];
                var _276 = react_1.useState(0), pointerX = _276[0], setPointerX = _276[1];
                var _277 = react_1.useState(0), pointerY = _277[0], setPointerY = _277[1];
                var _278 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem = _278[0], setPointerItem = _278[1];
                var _279 = react_1.useState(0), pointerY2 = _279[0], setPointerY2 = _279[1];
                var _280 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem2 = _280[0], setPointerItem2 = _280[1];
                var _281 = react_1.useState(0), pointerY3 = _281[0], setPointerY3 = _281[1];
                var _282 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem3 = _282[0], setPointerItem3 = _282[1];
                var _283 = react_1.useState(0), pointerY4 = _283[0], setPointerY4 = _283[1];
                var _284 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem4 = _284[0], setPointerItem4 = _284[1];
                var _285 = react_1.useState(0), pointerY5 = _285[0], setPointerY5 = _285[1];
                var _286 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), pointerItem5 = _286[0], setPointerItem5 = _286[1];
                var _287 = react_1.useState(0), secondaryPointerY = _287[0], setSecondaryPointerY = _287[1];
                var _288 = react_1.useState({
                    pointerShiftX: 0,
                    pointerShiftY: 0,
                }), secondaryPointerItem = _288[0], setSecondaryPointerItem = _288[1];
                var _289 = react_1.useState(0), responderStartTime = _289[0], setResponderStartTime = _289[1];
                var _290 = react_1.useState(false), responderActive = _290[0], setResponderActive = _290[1];
                var _291 = react_1.useState(""), points = _291[0], setPoints = _291[1];
                var _292 = react_1.useState(""), points2 = _292[0], setPoints2 = _292[1];
                var _293 = react_1.useState(""), points3 = _293[0], setPoints3 = _293[1];
                var _294 = react_1.useState(""), points4 = _294[0], setPoints4 = _294[1];
                var _295 = react_1.useState(""), points5 = _295[0], setPoints5 = _295[1];
                var _296 = react_1.useState(""), secondaryPoints = _296[0], setSecondaryPoints = _296[1];
                var _297 = react_1.useState(""), fillPoints = _297[0], setFillPoints = _297[1];
                var _298 = react_1.useState(""), fillPoints2 = _298[0], setFillPoints2 = _298[1];
                var _299 = react_1.useState(""), fillPoints3 = _299[0], setFillPoints3 = _299[1];
                var _300 = react_1.useState(""), fillPoints4 = _300[0], setFillPoints4 = _300[1];
                var _301 = react_1.useState(""), fillPoints5 = _301[0], setFillPoints5 = _301[1];
                var _302 = react_1.useState(""), secondaryFillPoints = _302[0], setSecondaryFillPoints = _302[1];
                var _303 = react_1.useState([]), pointsFromSet = _303[0], setPointsFromSet = _303[1];
                var _304 = react_1.useState([]), fillPointsFromSet = _304[0], setFillPointsFromSet = _304[1];
                var _305 = react_1.useState([]), arrowPointsFromSet = _305[0], setArrowPointsFromSet = _305[1];
                var _306 = react_1.useState(-1), selectedIndex = _306[0], setSelectedIndex = _306[1];
                var noOfSections = utils_1.getNoOfSections(props.noOfSections, props.maxValue, props.stepValue);
                var containerHeight = (_c = props.height) !== null && _c !== void 0 ? _c : (((_d = props.stepHeight) !== null && _d !== void 0 ? _d : 0) * noOfSections ||
                    constants_1.AxesAndRulesDefaults.containerHeight);
                var data = react_1.useMemo(function () {
                    if (!props.data) {
                        return [];
                    }
                    var nullishHandledData = utils_1.getInterpolatedData(props.data, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                    if (props.yAxisOffset) {
                        return nullishHandledData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return nullishHandledData;
                }, [props.yAxisOffset, props.data]);
                var data2 = react_1.useMemo(function () {
                    if (!props.data2) {
                        return [];
                    }
                    var nullishHandledData = utils_1.getInterpolatedData(props.data2, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                    if (props.yAxisOffset) {
                        return nullishHandledData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return nullishHandledData;
                }, [props.yAxisOffset, props.data2]);
                var data3 = react_1.useMemo(function () {
                    if (!props.data3) {
                        return [];
                    }
                    var nullishHandledData = utils_1.getInterpolatedData(props.data3, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                    if (props.yAxisOffset) {
                        return nullishHandledData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return nullishHandledData;
                }, [props.yAxisOffset, props.data3]);
                var data4 = react_1.useMemo(function () {
                    if (!props.data4) {
                        return [];
                    }
                    var nullishHandledData = utils_1.getInterpolatedData(props.data4, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                    if (props.yAxisOffset) {
                        return nullishHandledData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return nullishHandledData;
                }, [props.yAxisOffset, props.data4]);
                var data5 = react_1.useMemo(function () {
                    if (!props.data5) {
                        return [];
                    }
                    var nullishHandledData = utils_1.getInterpolatedData(props.data5, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                    if (props.yAxisOffset) {
                        return nullishHandledData.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                    return nullishHandledData;
                }, [props.yAxisOffset, props.data5]);
                var secondaryData = utils_1.getSecondaryDataWithOffsetIncluded(props.secondaryData, props.secondaryYAxis, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive) || [];
                var dataSet = props.dataSet;
                if (dataSet === null || dataSet === void 0 ? void 0 : dataSet.length) {
                    dataSet = dataSet.map(function (dataSetItem) { return (__assign(__assign({}, dataSetItem), { data: utils_1.getInterpolatedData(dataSetItem.data, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive) })); });
                }
                var data0 = react_1.useMemo(function () {
                    var _a, _b, _c;
                    if (props.yAxisOffset) {
                        return (_a = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _a === void 0 ? void 0 : _a.data;
                    }
                    else {
                        return (_c = (_b = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.map(function (item) {
                            var _a;
                            item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                            return item;
                        });
                    }
                }, [props.yAxisOffset, dataSet]);
                var scrollToEnd = props.scrollToEnd || constants_1.LineDefaults.scrollToEnd;
                var scrollAnimation = (_e = props.scrollAnimation) !== null && _e !== void 0 ? _e : constants_1.LineDefaults.scrollAnimation;
                var scrollEventThrottle = (_f = props.scrollEventThrottle) !== null && _f !== void 0 ? _f : constants_1.LineDefaults.scrollEventThrottle;
                var labelsExtraHeight = props.labelsExtraHeight || 0;
                var animationDuration = props.animationDuration || constants_1.LineDefaults.animationDuration;
                var onDataChangeAnimationDuration = props.onDataChangeAnimationDuration || 400;
                var animateTogether = props.animateTogether || constants_1.LineDefaults.animateTogether;
                var animateOnDataChange = props.yAxisOffset
                    ? false
                    : props.animateOnDataChange || false;
                var startIndex1 = (_h = (_g = props.startIndex1) !== null && _g !== void 0 ? _g : props.startIndex) !== null && _h !== void 0 ? _h : 0;
                var endIndex1;
                if (props.endIndex1 === undefined || props.endIndex1 === null) {
                    if (props.endIndex === undefined || props.endIndex === null) {
                        endIndex1 = data.length - 1;
                    }
                    else {
                        endIndex1 = props.endIndex;
                    }
                }
                else {
                    endIndex1 = props.endIndex1;
                }
                var startIndex2 = props.startIndex2 || 0;
                var endIndex2 = (_j = props.endIndex2) !== null && _j !== void 0 ? _j : data2.length - 1;
                var startIndex3 = props.startIndex3 || 0;
                var endIndex3 = (_k = props.endIndex3) !== null && _k !== void 0 ? _k : data3.length - 1;
                var startIndex4 = props.startIndex4 || 0;
                var endIndex4 = (_l = props.endIndex4) !== null && _l !== void 0 ? _l : data4.length - 1;
                var startIndex5 = props.startIndex5 || 0;
                var endIndex5 = (_m = props.endIndex5) !== null && _m !== void 0 ? _m : data5.length - 1;
                var lineSegments = !interpolateMissingValues
                    ? utils_1.getLineSegmentsForMissingValues(props.data)
                    : props.lineSegments;
                var lineSegments2 = !interpolateMissingValues
                    ? utils_1.getLineSegmentsForMissingValues(props.data2)
                    : props.lineSegments2;
                var lineSegments3 = !interpolateMissingValues
                    ? utils_1.getLineSegmentsForMissingValues(props.data3)
                    : props.lineSegments3;
                var lineSegments4 = !interpolateMissingValues
                    ? utils_1.getLineSegmentsForMissingValues(props.data4)
                    : props.lineSegments4;
                var lineSegments5 = !interpolateMissingValues
                    ? utils_1.getLineSegmentsForMissingValues(props.data5)
                    : props.lineSegments5;
                var highlightedRange = props.highlightedRange;
                var newPoints = "", newFillPoints = "";
                var counter = 0;
                var adjustToWidth = props.adjustToWidth || false;
                var initialSpacing = (_o = props.initialSpacing) !== null && _o !== void 0 ? _o : constants_1.LineDefaults.initialSpacing;
                var endSpacing = (_p = props.endSpacing) !== null && _p !== void 0 ? _p : (adjustToWidth ? 0 : constants_1.LineDefaults.endSpacing);
                var thickness = (_q = props.thickness) !== null && _q !== void 0 ? _q : constants_1.LineDefaults.thickness;
                var yAxisLabelWidth = (_r = props.yAxisLabelWidth) !== null && _r !== void 0 ? _r : (props.hideYAxisText
                    ? constants_1.AxesAndRulesDefaults.yAxisEmptyLabelWidth
                    : constants_1.AxesAndRulesDefaults.yAxisLabelWidth);
                var spacing = (_s = props.spacing) !== null && _s !== void 0 ? _s : (adjustToWidth
                    ? (((_t = props.width) !== null && _t !== void 0 ? _t : constants_1.screenWidth - yAxisLabelWidth) - initialSpacing) /
                        Math.max((data0 !== null && data0 !== void 0 ? data0 : data).length - 1, 1)
                    : constants_1.LineDefaults.spacing);
                var xAxisThickness = (_u = props.xAxisThickness) !== null && _u !== void 0 ? _u : constants_1.AxesAndRulesDefaults.xAxisThickness;
                var dataPointsHeight1 = (_w = (_v = props.dataPointsHeight1) !== null && _v !== void 0 ? _v : props.dataPointsHeight) !== null && _w !== void 0 ? _w : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth1 = (_y = (_x = props.dataPointsWidth1) !== null && _x !== void 0 ? _x : props.dataPointsWidth) !== null && _y !== void 0 ? _y : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius1 = (_0 = (_z = props.dataPointsRadius1) !== null && _z !== void 0 ? _z : props.dataPointsRadius) !== null && _0 !== void 0 ? _0 : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor1 = (_2 = (_1 = props.dataPointsColor1) !== null && _1 !== void 0 ? _1 : props.dataPointsColor) !== null && _2 !== void 0 ? _2 : constants_1.LineDefaults.dataPointsColor;
                var dataPointsShape1 = (_4 = (_3 = props.dataPointsShape1) !== null && _3 !== void 0 ? _3 : props.dataPointsShape) !== null && _4 !== void 0 ? _4 : constants_1.LineDefaults.dataPointsShape;
                var dataPointsHeight2 = (_6 = (_5 = props.dataPointsHeight2) !== null && _5 !== void 0 ? _5 : props.dataPointsHeight) !== null && _6 !== void 0 ? _6 : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth2 = (_8 = (_7 = props.dataPointsWidth2) !== null && _7 !== void 0 ? _7 : props.dataPointsWidth) !== null && _8 !== void 0 ? _8 : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius2 = (_10 = (_9 = props.dataPointsRadius2) !== null && _9 !== void 0 ? _9 : props.dataPointsRadius) !== null && _10 !== void 0 ? _10 : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor2 = (_12 = (_11 = props.dataPointsColor2) !== null && _11 !== void 0 ? _11 : props.dataPointsColor) !== null && _12 !== void 0 ? _12 : constants_1.LineDefaults.dataPointsColor2;
                var dataPointsShape2 = (_14 = (_13 = props.dataPointsShape2) !== null && _13 !== void 0 ? _13 : props.dataPointsShape) !== null && _14 !== void 0 ? _14 : constants_1.LineDefaults.dataPointsShape;
                var dataPointsHeight3 = (_16 = (_15 = props.dataPointsHeight3) !== null && _15 !== void 0 ? _15 : props.dataPointsHeight) !== null && _16 !== void 0 ? _16 : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth3 = (_18 = (_17 = props.dataPointsWidth3) !== null && _17 !== void 0 ? _17 : props.dataPointsWidth) !== null && _18 !== void 0 ? _18 : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius3 = (_20 = (_19 = props.dataPointsRadius3) !== null && _19 !== void 0 ? _19 : props.dataPointsRadius) !== null && _20 !== void 0 ? _20 : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor3 = (_22 = (_21 = props.dataPointsColor3) !== null && _21 !== void 0 ? _21 : props.dataPointsColor) !== null && _22 !== void 0 ? _22 : constants_1.LineDefaults.dataPointsColor3;
                var dataPointsShape3 = (_24 = (_23 = props.dataPointsShape3) !== null && _23 !== void 0 ? _23 : props.dataPointsShape) !== null && _24 !== void 0 ? _24 : constants_1.LineDefaults.dataPointsShape;
                var dataPointsHeight4 = (_26 = (_25 = props.dataPointsHeight4) !== null && _25 !== void 0 ? _25 : props.dataPointsHeight) !== null && _26 !== void 0 ? _26 : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth4 = (_28 = (_27 = props.dataPointsWidth4) !== null && _27 !== void 0 ? _27 : props.dataPointsWidth) !== null && _28 !== void 0 ? _28 : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius4 = (_30 = (_29 = props.dataPointsRadius4) !== null && _29 !== void 0 ? _29 : props.dataPointsRadius) !== null && _30 !== void 0 ? _30 : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor4 = (_32 = (_31 = props.dataPointsColor4) !== null && _31 !== void 0 ? _31 : props.dataPointsColor) !== null && _32 !== void 0 ? _32 : constants_1.LineDefaults.dataPointsColor;
                var dataPointsShape4 = (_34 = (_33 = props.dataPointsShape4) !== null && _33 !== void 0 ? _33 : props.dataPointsShape) !== null && _34 !== void 0 ? _34 : constants_1.LineDefaults.dataPointsShape;
                var dataPointsHeight5 = (_36 = (_35 = props.dataPointsHeight5) !== null && _35 !== void 0 ? _35 : props.dataPointsHeight) !== null && _36 !== void 0 ? _36 : constants_1.LineDefaults.dataPointsHeight;
                var dataPointsWidth5 = (_38 = (_37 = props.dataPointsWidth5) !== null && _37 !== void 0 ? _37 : props.dataPointsWidth) !== null && _38 !== void 0 ? _38 : constants_1.LineDefaults.dataPointsWidth;
                var dataPointsRadius5 = (_40 = (_39 = props.dataPointsRadius5) !== null && _39 !== void 0 ? _39 : props.dataPointsRadius) !== null && _40 !== void 0 ? _40 : constants_1.LineDefaults.dataPointsRadius;
                var dataPointsColor5 = (_42 = (_41 = props.dataPointsColor5) !== null && _41 !== void 0 ? _41 : props.dataPointsColor) !== null && _42 !== void 0 ? _42 : constants_1.LineDefaults.dataPointsColor;
                var dataPointsShape5 = (_44 = (_43 = props.dataPointsShape5) !== null && _43 !== void 0 ? _43 : props.dataPointsShape) !== null && _44 !== void 0 ? _44 : constants_1.LineDefaults.dataPointsShape;
                var areaChart = (_45 = props.areaChart) !== null && _45 !== void 0 ? _45 : false;
                var areaChart1 = (_46 = props.areaChart1) !== null && _46 !== void 0 ? _46 : false;
                var areaChart2 = (_47 = props.areaChart2) !== null && _47 !== void 0 ? _47 : false;
                var areaChart3 = (_48 = props.areaChart3) !== null && _48 !== void 0 ? _48 : false;
                var areaChart4 = (_49 = props.areaChart4) !== null && _49 !== void 0 ? _49 : false;
                var areaChart5 = (_50 = props.areaChart5) !== null && _50 !== void 0 ? _50 : false;
                var atLeastOneAreaChart = (dataSet === null || dataSet === void 0 ? void 0 : dataSet.some(function (set) { return set.areaChart; })) ||
                    areaChart ||
                    areaChart1 ||
                    areaChart2 ||
                    areaChart3 ||
                    areaChart4 ||
                    areaChart5;
                var stepChart = (_51 = props.stepChart) !== null && _51 !== void 0 ? _51 : false;
                var stepChart1 = (_52 = props.stepChart1) !== null && _52 !== void 0 ? _52 : false;
                var stepChart2 = (_53 = props.stepChart2) !== null && _53 !== void 0 ? _53 : false;
                var stepChart3 = (_54 = props.stepChart3) !== null && _54 !== void 0 ? _54 : false;
                var stepChart4 = (_55 = props.stepChart4) !== null && _55 !== void 0 ? _55 : false;
                var stepChart5 = (_56 = props.stepChart5) !== null && _56 !== void 0 ? _56 : false;
                var edgePosition = (_57 = props.edgePosition) !== null && _57 !== void 0 ? _57 : constants_1.LineDefaults.edgePosition;
                var textFontSize1 = (_59 = (_58 = props.textFontSize1) !== null && _58 !== void 0 ? _58 : props.textFontSize) !== null && _59 !== void 0 ? _59 : constants_1.LineDefaults.textFontSize;
                var textFontSize2 = (_61 = (_60 = props.textFontSize2) !== null && _60 !== void 0 ? _60 : props.textFontSize) !== null && _61 !== void 0 ? _61 : constants_1.LineDefaults.textFontSize;
                var textFontSize3 = (_63 = (_62 = props.textFontSize3) !== null && _62 !== void 0 ? _62 : props.textFontSize) !== null && _63 !== void 0 ? _63 : constants_1.LineDefaults.textFontSize;
                var textFontSize4 = (_65 = (_64 = props.textFontSize4) !== null && _64 !== void 0 ? _64 : props.textFontSize) !== null && _65 !== void 0 ? _65 : constants_1.LineDefaults.textFontSize;
                var textFontSize5 = (_67 = (_66 = props.textFontSize5) !== null && _66 !== void 0 ? _66 : props.textFontSize) !== null && _67 !== void 0 ? _67 : constants_1.LineDefaults.textFontSize;
                var textColor1 = (_69 = (_68 = props.textColor1) !== null && _68 !== void 0 ? _68 : props.textColor) !== null && _69 !== void 0 ? _69 : constants_1.LineDefaults.textColor;
                var textColor2 = (_71 = (_70 = props.textColor2) !== null && _70 !== void 0 ? _70 : props.textColor) !== null && _71 !== void 0 ? _71 : constants_1.LineDefaults.textColor;
                var textColor3 = (_73 = (_72 = props.textColor3) !== null && _72 !== void 0 ? _72 : props.textColor) !== null && _73 !== void 0 ? _73 : constants_1.LineDefaults.textColor;
                var textColor4 = (_75 = (_74 = props.textColor4) !== null && _74 !== void 0 ? _74 : props.textColor) !== null && _75 !== void 0 ? _75 : constants_1.LineDefaults.textColor;
                var textColor5 = (_77 = (_76 = props.textColor5) !== null && _76 !== void 0 ? _76 : props.textColor) !== null && _77 !== void 0 ? _77 : constants_1.LineDefaults.textColor;
                var totalWidth = initialSpacing + spacing * (data0 !== null && data0 !== void 0 ? data0 : data).length;
                var _307 = utils_1.computeMaxAndMinItems(data0 !== null && data0 !== void 0 ? data0 : data, props.roundToDigits, props.showFractionalValues), maxItem = _307.maxItem, minItem = _307.minItem;
                var maxValue = utils_1.getMaxValue(props.maxValue, props.stepValue, noOfSections, maxItem);
                var mostNegativeValue = props.mostNegativeValue || minItem;
                var overflowTop = (_78 = props.overflowTop) !== null && _78 !== void 0 ? _78 : 0;
                var extendedContainerHeight = utils_1.getExtendedContainerHeightWithPadding(containerHeight, overflowTop);
                var getX = function (index) { return initialSpacing + spacing * index - 1; };
                var getY = function (value) {
                    return extendedContainerHeight - (value * containerHeight) / maxValue;
                };
                var secondaryMaxItem = utils_1.computeMaxAndMinItems(secondaryData, (_79 = props.secondaryYAxis) === null || _79 === void 0 ? void 0 : _79.roundToDigits, (_80 = props.secondaryYAxis) === null || _80 === void 0 ? void 0 : _80.showFractionalValues).maxItem;
                var secondaryMaxValue = (_82 = (_81 = props.secondaryYAxis) === null || _81 === void 0 ? void 0 : _81.maxValue) !== null && _82 !== void 0 ? _82 : (secondaryMaxItem || maxValue);
                var getSecondaryY = function (value) {
                    return extendedContainerHeight - (value * containerHeight) / secondaryMaxValue;
                };
                var heightUptoXaxis = extendedContainerHeight - xAxisThickness;
                if (animateOnDataChange) {
                    animations.forEach(function (item, index) {
                        item.addListener(function (val) {
                            var _a, _b, _c, _d, _e;
                            var temp = (_b = (_a = data[index]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
                            data[index].value = val.value;
                            var pp = "", ppp = "";
                            if (!((_c = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0].curved) !== null && _c !== void 0 ? _c : props.curved)) {
                                for (var i = 0; i < (data0 !== null && data0 !== void 0 ? data0 : data).length; i++) {
                                    pp += "L" + getX(i) + " " + getY((data0 !== null && data0 !== void 0 ? data0 : data)[i].value) + " ";
                                }
                                if ((_e = (_d = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _d === void 0 ? void 0 : _d.areaChart) !== null && _e !== void 0 ? _e : areaChart) {
                                    ppp = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp += pp;
                                    ppp +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                }
                                newPoints = pp;
                                newFillPoints = ppp;
                                setPointsOnChange();
                            }
                            counter++;
                            data[index].value = temp;
                        });
                    });
                }
                var setPointsOnChange = function () {
                    if (counter === data.length) {
                        if (!props.curved) {
                            setPoints(newPoints.replace("L", "M"));
                            if (areaChart) {
                                setFillPoints(newFillPoints.replace("L", "M"));
                            }
                        }
                    }
                };
                var showValuesAsDataPointsText = (_83 = props.showValuesAsDataPointsText) !== null && _83 !== void 0 ? _83 : constants_1.LineDefaults.showValuesAsDataPointsText;
                var thickness1 = (_85 = (_84 = props.thickness1) !== null && _84 !== void 0 ? _84 : props.thickness) !== null && _85 !== void 0 ? _85 : constants_1.LineDefaults.thickness;
                var thickness2 = (_87 = (_86 = props.thickness2) !== null && _86 !== void 0 ? _86 : props.thickness) !== null && _87 !== void 0 ? _87 : constants_1.LineDefaults.thickness;
                var thickness3 = (_89 = (_88 = props.thickness3) !== null && _88 !== void 0 ? _88 : props.thickness) !== null && _89 !== void 0 ? _89 : constants_1.LineDefaults.thickness;
                var thickness4 = (_91 = (_90 = props.thickness4) !== null && _90 !== void 0 ? _90 : props.thickness) !== null && _91 !== void 0 ? _91 : constants_1.LineDefaults.thickness;
                var thickness5 = (_93 = (_92 = props.thickness5) !== null && _92 !== void 0 ? _92 : props.thickness) !== null && _93 !== void 0 ? _93 : constants_1.LineDefaults.thickness;
                var zIndex1 = (_94 = props.zIndex1) !== null && _94 !== void 0 ? _94 : 0;
                var zIndex2 = (_95 = props.zIndex2) !== null && _95 !== void 0 ? _95 : 0;
                var zIndex3 = (_96 = props.zIndex3) !== null && _96 !== void 0 ? _96 : 0;
                var zIndex4 = (_97 = props.zIndex4) !== null && _97 !== void 0 ? _97 : 0;
                var zIndex5 = (_98 = props.zIndex5) !== null && _98 !== void 0 ? _98 : 0;
                var strokeDashArray1 = (_99 = props.strokeDashArray1) !== null && _99 !== void 0 ? _99 : props.strokeDashArray;
                var strokeDashArray2 = (_100 = props.strokeDashArray2) !== null && _100 !== void 0 ? _100 : props.strokeDashArray;
                var strokeDashArray3 = (_101 = props.strokeDashArray3) !== null && _101 !== void 0 ? _101 : props.strokeDashArray;
                var strokeDashArray4 = (_102 = props.strokeDashArray4) !== null && _102 !== void 0 ? _102 : props.strokeDashArray;
                var strokeDashArray5 = (_103 = props.strokeDashArray5) !== null && _103 !== void 0 ? _103 : props.strokeDashArray;
                var rotateLabel = (_104 = props.rotateLabel) !== null && _104 !== void 0 ? _104 : false;
                var isAnimated = (_105 = props.isAnimated) !== null && _105 !== void 0 ? _105 : false;
                var hideDataPoints1 = (_107 = (_106 = props.hideDataPoints) !== null && _106 !== void 0 ? _106 : props.hideDataPoints1) !== null && _107 !== void 0 ? _107 : false;
                var hideDataPoints2 = (_109 = (_108 = props.hideDataPoints) !== null && _108 !== void 0 ? _108 : props.hideDataPoints2) !== null && _109 !== void 0 ? _109 : false;
                var hideDataPoints3 = (_111 = (_110 = props.hideDataPoints) !== null && _110 !== void 0 ? _110 : props.hideDataPoints3) !== null && _111 !== void 0 ? _111 : false;
                var hideDataPoints4 = (_113 = (_112 = props.hideDataPoints) !== null && _112 !== void 0 ? _112 : props.hideDataPoints4) !== null && _113 !== void 0 ? _113 : false;
                var hideDataPoints5 = (_115 = (_114 = props.hideDataPoints) !== null && _114 !== void 0 ? _114 : props.hideDataPoints5) !== null && _115 !== void 0 ? _115 : false;
                var color1 = (_117 = (_116 = props.color1) !== null && _116 !== void 0 ? _116 : props.color) !== null && _117 !== void 0 ? _117 : constants_1.LineDefaults.color;
                var color2 = (_119 = (_118 = props.color2) !== null && _118 !== void 0 ? _118 : props.color) !== null && _119 !== void 0 ? _119 : constants_1.LineDefaults.color;
                var color3 = (_121 = (_120 = props.color3) !== null && _120 !== void 0 ? _120 : props.color) !== null && _121 !== void 0 ? _121 : constants_1.LineDefaults.color;
                var color4 = (_123 = (_122 = props.color4) !== null && _122 !== void 0 ? _122 : props.color) !== null && _123 !== void 0 ? _123 : constants_1.LineDefaults.color;
                var color5 = (_125 = (_124 = props.color5) !== null && _124 !== void 0 ? _124 : props.color) !== null && _125 !== void 0 ? _125 : constants_1.LineDefaults.color;
                var startFillColor1 = (_127 = (_126 = props.startFillColor1) !== null && _126 !== void 0 ? _126 : props.startFillColor) !== null && _127 !== void 0 ? _127 : constants_1.LineDefaults.startFillColor;
                var endFillColor1 = (_129 = (_128 = props.endFillColor1) !== null && _128 !== void 0 ? _128 : props.endFillColor) !== null && _129 !== void 0 ? _129 : constants_1.LineDefaults.endFillColor;
                var startOpacity = (_130 = props.startOpacity) !== null && _130 !== void 0 ? _130 : constants_1.LineDefaults.startOpacity;
                var endOpacity = (_131 = props.endOpacity) !== null && _131 !== void 0 ? _131 : constants_1.LineDefaults.endOpacity;
                var startOpacity1 = (_132 = props.startOpacity1) !== null && _132 !== void 0 ? _132 : startOpacity;
                var endOpacity1 = (_133 = props.endOpacity1) !== null && _133 !== void 0 ? _133 : endOpacity;
                var startFillColor2 = (_135 = (_134 = props.startFillColor2) !== null && _134 !== void 0 ? _134 : props.startFillColor) !== null && _135 !== void 0 ? _135 : constants_1.LineDefaults.startFillColor;
                var endFillColor2 = (_137 = (_136 = props.endFillColor2) !== null && _136 !== void 0 ? _136 : props.endFillColor) !== null && _137 !== void 0 ? _137 : constants_1.LineDefaults.endFillColor;
                var startOpacity2 = (_138 = props.startOpacity2) !== null && _138 !== void 0 ? _138 : startOpacity;
                var endOpacity2 = (_139 = props.endOpacity2) !== null && _139 !== void 0 ? _139 : endOpacity;
                var startFillColor3 = (_141 = (_140 = props.startFillColor3) !== null && _140 !== void 0 ? _140 : props.startFillColor) !== null && _141 !== void 0 ? _141 : constants_1.LineDefaults.startFillColor;
                var endFillColor3 = (_143 = (_142 = props.endFillColor3) !== null && _142 !== void 0 ? _142 : props.endFillColor) !== null && _143 !== void 0 ? _143 : constants_1.LineDefaults.endFillColor;
                var startOpacity3 = (_144 = props.startOpacity3) !== null && _144 !== void 0 ? _144 : startOpacity;
                var endOpacity3 = (_145 = props.endOpacity3) !== null && _145 !== void 0 ? _145 : endOpacity;
                var startFillColor4 = (_147 = (_146 = props.startFillColor4) !== null && _146 !== void 0 ? _146 : props.startFillColor) !== null && _147 !== void 0 ? _147 : constants_1.LineDefaults.startFillColor;
                var endFillColor4 = (_149 = (_148 = props.endFillColor4) !== null && _148 !== void 0 ? _148 : props.endFillColor) !== null && _149 !== void 0 ? _149 : constants_1.LineDefaults.endFillColor;
                var startOpacity4 = (_150 = props.startOpacity4) !== null && _150 !== void 0 ? _150 : startOpacity;
                var endOpacity4 = (_151 = props.endOpacity4) !== null && _151 !== void 0 ? _151 : endOpacity;
                var startFillColor5 = (_153 = (_152 = props.startFillColor5) !== null && _152 !== void 0 ? _152 : props.startFillColor) !== null && _153 !== void 0 ? _153 : constants_1.LineDefaults.startFillColor;
                var endFillColor5 = (_155 = (_154 = props.endFillColor5) !== null && _154 !== void 0 ? _154 : props.endFillColor) !== null && _155 !== void 0 ? _155 : constants_1.LineDefaults.endFillColor;
                var startOpacity5 = (_156 = props.startOpacity5) !== null && _156 !== void 0 ? _156 : startOpacity;
                var endOpacity5 = (_157 = props.endOpacity5) !== null && _157 !== void 0 ? _157 : endOpacity;
                constants_1.defaultArrowConfig.strokeWidth = (_159 = (_158 = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _158 === void 0 ? void 0 : _158.thickness) !== null && _159 !== void 0 ? _159 : thickness1;
                constants_1.defaultArrowConfig.strokeColor = (_161 = (_160 = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _160 === void 0 ? void 0 : _160.color) !== null && _161 !== void 0 ? _161 : color1;
                var _308 = utils_1.getAllArrowProperties(props, constants_1.defaultArrowConfig), arrowLength1 = _308.arrowLength1, arrowWidth1 = _308.arrowWidth1, arrowStrokeWidth1 = _308.arrowStrokeWidth1, arrowStrokeColor1 = _308.arrowStrokeColor1, arrowFillColor1 = _308.arrowFillColor1, showArrowBase1 = _308.showArrowBase1, arrowLength2 = _308.arrowLength2, arrowWidth2 = _308.arrowWidth2, arrowStrokeWidth2 = _308.arrowStrokeWidth2, arrowStrokeColor2 = _308.arrowStrokeColor2, arrowFillColor2 = _308.arrowFillColor2, showArrowBase2 = _308.showArrowBase2, arrowLength3 = _308.arrowLength3, arrowWidth3 = _308.arrowWidth3, arrowStrokeWidth3 = _308.arrowStrokeWidth3, arrowStrokeColor3 = _308.arrowStrokeColor3, arrowFillColor3 = _308.arrowFillColor3, showArrowBase3 = _308.showArrowBase3, arrowLength4 = _308.arrowLength4, arrowWidth4 = _308.arrowWidth4, arrowStrokeWidth4 = _308.arrowStrokeWidth4, arrowStrokeColor4 = _308.arrowStrokeColor4, arrowFillColor4 = _308.arrowFillColor4, showArrowBase4 = _308.showArrowBase4, arrowLength5 = _308.arrowLength5, arrowWidth5 = _308.arrowWidth5, arrowStrokeWidth5 = _308.arrowStrokeWidth5, arrowStrokeColor5 = _308.arrowStrokeColor5, arrowFillColor5 = _308.arrowFillColor5, showArrowBase5 = _308.showArrowBase5, arrowLengthsFromSet = _308.arrowLengthsFromSet, arrowWidthsFromSet = _308.arrowWidthsFromSet, arrowStrokeWidthsFromSet = _308.arrowStrokeWidthsFromSet, arrowStrokeColorsFromSet = _308.arrowStrokeColorsFromSet, arrowFillColorsFromSet = _308.arrowFillColorsFromSet, showArrowBasesFromSet = _308.showArrowBasesFromSet;
                var secondaryLineConfig = {
                    zIndex: (_163 = (_162 = props.secondaryLineConfig) === null || _162 === void 0 ? void 0 : _162.zIndex) !== null && _163 !== void 0 ? _163 : zIndex1,
                    curved: (_165 = (_164 = props.secondaryLineConfig) === null || _164 === void 0 ? void 0 : _164.curved) !== null && _165 !== void 0 ? _165 : props.curved,
                    curvature: (_167 = (_166 = props.secondaryLineConfig) === null || _166 === void 0 ? void 0 : _166.curvature) !== null && _167 !== void 0 ? _167 : curvature,
                    curveType: (_169 = (_168 = props.secondaryLineConfig) === null || _168 === void 0 ? void 0 : _168.curveType) !== null && _169 !== void 0 ? _169 : curveType,
                    areaChart: (_171 = (_170 = props.secondaryLineConfig) === null || _170 === void 0 ? void 0 : _170.areaChart) !== null && _171 !== void 0 ? _171 : areaChart,
                    color: (_173 = (_172 = props.secondaryLineConfig) === null || _172 === void 0 ? void 0 : _172.color) !== null && _173 !== void 0 ? _173 : color1,
                    thickness: (_175 = (_174 = props.secondaryLineConfig) === null || _174 === void 0 ? void 0 : _174.thickness) !== null && _175 !== void 0 ? _175 : thickness1,
                    zIndex1: (_177 = (_176 = props.secondaryLineConfig) === null || _176 === void 0 ? void 0 : _176.zIndex1) !== null && _177 !== void 0 ? _177 : zIndex1,
                    strokeDashArray: (_179 = (_178 = props.secondaryLineConfig) === null || _178 === void 0 ? void 0 : _178.strokeDashArray) !== null && _179 !== void 0 ? _179 : strokeDashArray1,
                    startIndex: (_181 = (_180 = props.secondaryLineConfig) === null || _180 === void 0 ? void 0 : _180.startIndex) !== null && _181 !== void 0 ? _181 : startIndex1,
                    endIndex: (_183 = (_182 = props.secondaryLineConfig) === null || _182 === void 0 ? void 0 : _182.endIndex) !== null && _183 !== void 0 ? _183 : endIndex1,
                    hideDataPoints: (_185 = (_184 = props.secondaryLineConfig) === null || _184 === void 0 ? void 0 : _184.hideDataPoints) !== null && _185 !== void 0 ? _185 : hideDataPoints1,
                    dataPointsHeight: (_187 = (_186 = props.secondaryLineConfig) === null || _186 === void 0 ? void 0 : _186.dataPointsHeight) !== null && _187 !== void 0 ? _187 : dataPointsHeight1,
                    dataPointsWidth: (_189 = (_188 = props.secondaryLineConfig) === null || _188 === void 0 ? void 0 : _188.dataPointsWidth) !== null && _189 !== void 0 ? _189 : dataPointsWidth1,
                    dataPointsRadius: (_191 = (_190 = props.secondaryLineConfig) === null || _190 === void 0 ? void 0 : _190.dataPointsRadius) !== null && _191 !== void 0 ? _191 : dataPointsRadius1,
                    dataPointsColor: (_193 = (_192 = props.secondaryLineConfig) === null || _192 === void 0 ? void 0 : _192.dataPointsColor) !== null && _193 !== void 0 ? _193 : dataPointsColor1,
                    dataPointsShape: (_195 = (_194 = props.secondaryLineConfig) === null || _194 === void 0 ? void 0 : _194.dataPointsShape) !== null && _195 !== void 0 ? _195 : dataPointsShape1,
                    showValuesAsDataPointsText: (_197 = (_196 = props.secondaryLineConfig) === null || _196 === void 0 ? void 0 : _196.showValuesAsDataPointsText) !== null && _197 !== void 0 ? _197 : showValuesAsDataPointsText,
                    startFillColor: (_199 = (_198 = props.secondaryLineConfig) === null || _198 === void 0 ? void 0 : _198.startFillColor) !== null && _199 !== void 0 ? _199 : startFillColor1,
                    endFillColor: (_201 = (_200 = props.secondaryLineConfig) === null || _200 === void 0 ? void 0 : _200.endFillColor) !== null && _201 !== void 0 ? _201 : endFillColor1,
                    startOpacity: (_203 = (_202 = props.secondaryLineConfig) === null || _202 === void 0 ? void 0 : _202.startOpacity) !== null && _203 !== void 0 ? _203 : startOpacity1,
                    endOpacity: (_205 = (_204 = props.secondaryLineConfig) === null || _204 === void 0 ? void 0 : _204.endOpacity) !== null && _205 !== void 0 ? _205 : endOpacity1,
                    textFontSize: (_207 = (_206 = props.secondaryLineConfig) === null || _206 === void 0 ? void 0 : _206.textFontSize) !== null && _207 !== void 0 ? _207 : textFontSize1,
                    textColor: (_209 = (_208 = props.secondaryLineConfig) === null || _208 === void 0 ? void 0 : _208.textColor) !== null && _209 !== void 0 ? _209 : textColor1,
                    showArrow: (_211 = (_210 = props.secondaryLineConfig) === null || _210 === void 0 ? void 0 : _210.showArrow) !== null && _211 !== void 0 ? _211 : props.showArrows,
                    arrowConfig: (_213 = (_212 = props.secondaryLineConfig) === null || _212 === void 0 ? void 0 : _212.arrowConfig) !== null && _213 !== void 0 ? _213 : props.arrowConfig,
                };
                var addLeadingAndTrailingPathForAreaFill = function (initialPath, value, dataLength) {
                    return ("M " +
                        initialSpacing +
                        "," +
                        heightUptoXaxis +
                        " " +
                        "L " +
                        initialSpacing +
                        "," +
                        getY(value) +
                        " " +
                        initialPath +
                        " " +
                        "L " +
                        (initialSpacing + spacing * (dataLength - 1)) +
                        "," +
                        heightUptoXaxis +
                        " " +
                        "L " +
                        initialSpacing +
                        "," +
                        heightUptoXaxis +
                        " ");
                };
                var getNextPoint = function (data, index, around, before) {
                    var isLast = index === data.length - 1;
                    return isLast && !(around || before)
                        ? " "
                        : " L" +
                            (getX(index) +
                                (around ? (isLast ? 0 : spacing / 2) : before ? 0 : spacing)) +
                            " " +
                            getY(data[index].value) +
                            " ";
                };
                var getStepPath = function (data, i) {
                    var around = edgePosition === types_1.EdgePosition.AROUND_DATA_POINT;
                    var before = edgePosition === types_1.EdgePosition.BEFORE_DATA_POINT;
                    return ("L" +
                        (getX(i) -
                            (around && i > 0 ? spacing / 2 : before && i > 0 ? spacing : 0)) +
                        " " +
                        getY(data[i].value) +
                        getNextPoint(data, i, around, before));
                };
                var getSegmentPath = function (data, i, lineSegment, startIndex, endIndex) {
                    var path = "L" +
                        getX(i) +
                        " " +
                        getY(data[i].value) +
                        " " +
                        utils_1.getSegmentString(lineSegment, i, constants_1.SEGMENT_START, constants_1.SEGMENT_END);
                    if (highlightedRange) {
                        path += utils_1.getPathWithHighlight(data, i, highlightedRange, startIndex, endIndex, getX, getY);
                    }
                    return path;
                };
                react_1.useEffect(function () {
                    if (dataSet) {
                        var pointsArray_1 = [];
                        var arrowPointsArray_1 = [];
                        var fillPointsArray_1 = [];
                        dataSet.map(function (set, index) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                            var setData = set.data.map(function (item) {
                                var _a;
                                item.value = item.value - ((_a = props.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                                return item;
                            });
                            if ((_a = set.curved) !== null && _a !== void 0 ? _a : props.curved) {
                                var pArray = [];
                                for (var i = 0; i < setData.length; i++) {
                                    if (i >= ((_b = set.startIndex) !== null && _b !== void 0 ? _b : 0) &&
                                        i <= ((_c = set.endIndex) !== null && _c !== void 0 ? _c : set.data.length - 1)) {
                                        pArray.push([getX(i), getY(setData[i].value)]);
                                    }
                                }
                                var xx = utils_1.svgPath(pArray, (_d = set.curveType) !== null && _d !== void 0 ? _d : curveType, (_e = set.curvature) !== null && _e !== void 0 ? _e : curvature);
                                pointsArray_1.push(utils_1.getCurvePathWithSegments(xx, set.lineSegments, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                                // For Arrow-
                                if (setData.length > 1 && ((_f = set.showArrow) !== null && _f !== void 0 ? _f : props.showArrows)) {
                                    var arrowTipY = pArray[pArray.length - 1][1];
                                    var arrowTipX = pArray[pArray.length - 1][0];
                                    var y1 = pArray[pArray.length - 2][1];
                                    var x1 = pArray[pArray.length - 2][0];
                                    var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLengthsFromSet[index], arrowWidthsFromSet[index], showArrowBasesFromSet[index]);
                                    arrowPointsArray_1.push(arrowPoints);
                                }
                                // For Area charts-
                                if ((set.areaChart || areaChart) && setData.length) {
                                    xx = addLeadingAndTrailingPathForAreaFill(xx, setData[0].value, setData.length);
                                    fillPointsArray_1.push(xx);
                                }
                            }
                            else {
                                var pp = "";
                                for (var i = 0; i < setData.length; i++) {
                                    if (i >= ((_g = set.startIndex) !== null && _g !== void 0 ? _g : 0) &&
                                        i <= ((_h = set.endIndex) !== null && _h !== void 0 ? _h : set.data.length - 1)) {
                                        if (set.stepChart || stepChart) {
                                            pp += getStepPath(setData, i);
                                        }
                                        else {
                                            pp += getSegmentPath(setData, i, set.lineSegments, (_j = set.startIndex) !== null && _j !== void 0 ? _j : 0, (_k = set.endIndex) !== null && _k !== void 0 ? _k : set.data.length - 1);
                                        }
                                    }
                                }
                                pointsArray_1.push(pp.replace("L", "M"));
                                // For Arrow-
                                if (setData.length > 1 && ((_l = set.showArrow) !== null && _l !== void 0 ? _l : props.showArrows)) {
                                    var ppArray = pp.trim().split(" ");
                                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                                    var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                    var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLengthsFromSet[index], arrowWidthsFromSet[index], showArrowBasesFromSet[index]);
                                    arrowPointsArray_1.push(arrowPoints);
                                }
                                // For Area charts-
                                if ((set.areaChart || areaChart) && setData.length) {
                                    var ppp = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp += pp;
                                    ppp +=
                                        "L" +
                                            (initialSpacing + spacing * (setData.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    fillPointsArray_1.push(ppp.replace("L", "M"));
                                }
                            }
                        });
                        setPointsFromSet(pointsArray_1);
                        setArrowPointsFromSet(arrowPointsArray_1);
                        setFillPointsFromSet(fillPointsArray_1);
                    }
                    else {
                        var pp = "", pp2 = "", pp3 = "", pp4 = "", pp5 = "";
                        if (!props.curved) {
                            for (var i = 0; i < data.length; i++) {
                                if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
                                    if (stepChart || stepChart1) {
                                        pp += getStepPath(data, i);
                                    }
                                    else {
                                        pp += getSegmentPath(data, i, lineSegments, startIndex1, endIndex1);
                                    }
                                }
                                if (data2.length && i >= startIndex2 && i <= endIndex2) {
                                    if (stepChart || stepChart2) {
                                        pp2 += getStepPath(data2, i);
                                        (" ");
                                    }
                                    else {
                                        pp2 += getSegmentPath(data2, i, lineSegments2, startIndex2, endIndex2);
                                    }
                                }
                                if (data3.length && i >= startIndex3 && i <= endIndex3) {
                                    if (stepChart || stepChart3) {
                                        pp3 += getStepPath(data3, i);
                                    }
                                    else {
                                        pp3 += getSegmentPath(data3, i, lineSegments3, startIndex3, endIndex3);
                                    }
                                }
                                if (data4.length && i >= startIndex4 && i <= endIndex4) {
                                    if (stepChart || stepChart4) {
                                        pp4 += getStepPath(data4, i);
                                    }
                                    else {
                                        pp4 += getSegmentPath(data4, i, lineSegments4, startIndex4, endIndex4);
                                    }
                                }
                                if (data5.length && i >= startIndex5 && i <= endIndex5) {
                                    if (stepChart || stepChart5) {
                                        pp5 += getStepPath(data5, i);
                                    }
                                    else {
                                        pp5 += getSegmentPath(data5, i, lineSegments5, startIndex5, endIndex5);
                                    }
                                }
                            }
                            setPoints2(pp2.replace("L", "M"));
                            setPoints3(pp3.replace("L", "M"));
                            setPoints4(pp4.replace("L", "M"));
                            setPoints5(pp5.replace("L", "M"));
                            setPoints(pp.replace("L", "M"));
                            if (data.length > 1 && (props.showArrow1 || props.showArrows)) {
                                var ppArray = pp.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                                setArrow1Points(arrowPoints);
                            }
                            if (data2.length > 1 && (props.showArrow2 || props.showArrows)) {
                                var ppArray = pp2.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength2, arrowWidth2, showArrowBase2);
                                setArrow2Points(arrowPoints);
                            }
                            if (data3.length > 1 && (props.showArrow3 || props.showArrows)) {
                                var ppArray = pp3.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength3, arrowWidth3, showArrowBase3);
                                setArrow3Points(arrowPoints);
                            }
                            if (data4.length > 1 && (props.showArrow4 || props.showArrows)) {
                                var ppArray = pp4.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength4, arrowWidth4, showArrowBase4);
                                setArrow4Points(arrowPoints);
                            }
                            if (data5.length > 1 && (props.showArrow5 || props.showArrows)) {
                                var ppArray = pp5.trim().split(" ");
                                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                                var y1 = parseInt(ppArray[ppArray.length - 3]);
                                var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength5, arrowWidth5, showArrowBase5);
                                setArrow5Points(arrowPoints);
                            }
                            /***************************          For Area Charts          *************************/
                            if (atLeastOneAreaChart) {
                                var ppp = "", ppp2 = "", ppp3 = "", ppp4 = "", ppp5 = "";
                                if ((areaChart || areaChart1) &&
                                    data.length &&
                                    !animateOnDataChange) {
                                    ppp = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp += pp;
                                    ppp +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    setFillPoints(ppp.replace("L", "M"));
                                }
                                if ((areaChart || areaChart2) && data2.length) {
                                    ppp2 = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp2 += pp2;
                                    ppp2 +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp2 += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    setFillPoints2(ppp2.replace("L", "M"));
                                }
                                if ((areaChart || areaChart3) && data3.length) {
                                    ppp3 = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp3 += pp3;
                                    ppp3 +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp3 += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    setFillPoints3(ppp3.replace("L", "M"));
                                }
                                if ((areaChart || areaChart4) && data4.length) {
                                    ppp4 = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp4 += pp4;
                                    ppp4 +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp4 += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    setFillPoints4(ppp4.replace("L", "M"));
                                }
                                if ((areaChart || areaChart5) && data5.length) {
                                    ppp5 = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    ppp5 += pp5;
                                    ppp5 +=
                                        "L" +
                                            (initialSpacing + spacing * (data.length - 1)) +
                                            " " +
                                            heightUptoXaxis;
                                    ppp5 += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                    setFillPoints5(ppp5.replace("L", "M"));
                                }
                            }
                            /*************************************************************************************/
                        }
                        else {
                            var p1Array = [], p2Array = [], p3Array = [], p4Array = [], p5Array = [];
                            for (var i = 0; i < data.length; i++) {
                                if (i >= startIndex1 && i <= endIndex1) {
                                    p1Array.push([getX(i), getY(data[i].value)]);
                                }
                                if (data2.length && i >= startIndex2 && i <= endIndex2) {
                                    p2Array.push([getX(i), getY(data2[i].value)]);
                                }
                                if (data3.length && i >= startIndex3 && i <= endIndex3) {
                                    p3Array.push([getX(i), getY(data3[i].value)]);
                                }
                                if (data4.length && i >= startIndex4 && i <= endIndex4) {
                                    p4Array.push([getX(i), getY(data4[i].value)]);
                                }
                                if (data5.length && i >= startIndex5 && i <= endIndex5) {
                                    p5Array.push([getX(i), getY(data5[i].value)]);
                                }
                            }
                            var xx = utils_1.svgPath(p1Array, curveType, curvature);
                            var xx2 = utils_1.svgPath(p2Array, curveType, curvature);
                            var xx3 = utils_1.svgPath(p3Array, curveType, curvature);
                            var xx4 = utils_1.svgPath(p4Array, curveType, curvature);
                            var xx5 = utils_1.svgPath(p5Array, curveType, curvature);
                            setPoints(utils_1.getCurvePathWithSegments(xx, lineSegments, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                            setPoints2(utils_1.getCurvePathWithSegments(xx2, lineSegments2, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                            setPoints3(utils_1.getCurvePathWithSegments(xx3, lineSegments3, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                            setPoints4(utils_1.getCurvePathWithSegments(xx4, lineSegments4, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                            setPoints5(utils_1.getCurvePathWithSegments(xx5, lineSegments5, constants_1.SEGMENT_START, constants_1.SEGMENT_END));
                            if (data.length > 1 && (props.showArrow1 || props.showArrows)) {
                                var arrowTipY = p1Array[p1Array.length - 1][1];
                                var arrowTipX = p1Array[p1Array.length - 1][0];
                                var y1 = p1Array[p1Array.length - 2][1];
                                var x1 = p1Array[p1Array.length - 2][0];
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                                setArrow1Points(arrowPoints);
                            }
                            if (data2.length > 1 && (props.showArrow2 || props.showArrows)) {
                                var arrowTipY = p2Array[p2Array.length - 1][1];
                                var arrowTipX = p2Array[p2Array.length - 1][0];
                                var y1 = p2Array[p2Array.length - 2][1];
                                var x1 = p2Array[p2Array.length - 2][0];
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength2, arrowWidth2, showArrowBase2);
                                setArrow2Points(arrowPoints);
                            }
                            if (data3.length > 1 && (props.showArrow3 || props.showArrows)) {
                                var arrowTipY = p3Array[p3Array.length - 1][1];
                                var arrowTipX = p3Array[p3Array.length - 1][0];
                                var y1 = p3Array[p3Array.length - 2][1];
                                var x1 = p3Array[p3Array.length - 2][0];
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength3, arrowWidth3, showArrowBase3);
                                setArrow2Points(arrowPoints);
                            }
                            if (data4.length > 1 && (props.showArrow4 || props.showArrows)) {
                                var arrowTipY = p4Array[p4Array.length - 1][1];
                                var arrowTipX = p4Array[p4Array.length - 1][0];
                                var y1 = p4Array[p4Array.length - 2][1];
                                var x1 = p4Array[p4Array.length - 2][0];
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength4, arrowWidth4, showArrowBase4);
                                setArrow2Points(arrowPoints);
                            }
                            if (data5.length > 1 && (props.showArrow5 || props.showArrows)) {
                                var arrowTipY = p5Array[p5Array.length - 1][1];
                                var arrowTipX = p5Array[p5Array.length - 1][0];
                                var y1 = p5Array[p5Array.length - 2][1];
                                var x1 = p5Array[p5Array.length - 2][0];
                                var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength5, arrowWidth5, showArrowBase5);
                                setArrow2Points(arrowPoints);
                            }
                            /***************************          For Area Charts          *************************/
                            if (atLeastOneAreaChart) {
                                if ((areaChart || areaChart1) && data.length) {
                                    xx = addLeadingAndTrailingPathForAreaFill(xx, data[0].value, data.length);
                                    setFillPoints(xx);
                                }
                                if ((areaChart || areaChart2) && data2.length) {
                                    xx2 = addLeadingAndTrailingPathForAreaFill(xx2, data2[0].value, data2.length);
                                    setFillPoints2(xx2);
                                }
                                if ((areaChart || areaChart3) && data3.length) {
                                    xx3 = addLeadingAndTrailingPathForAreaFill(xx3, data3[0].value, data3.length);
                                    setFillPoints3(xx3);
                                }
                                if ((areaChart || areaChart4) && data4.length) {
                                    xx4 = addLeadingAndTrailingPathForAreaFill(xx4, data4[0].value, data4.length);
                                    setFillPoints4(xx4);
                                }
                                if ((areaChart || areaChart5) && data5.length) {
                                    xx5 = addLeadingAndTrailingPathForAreaFill(xx5, data5[0].value, data5.length);
                                    setFillPoints5(xx5);
                                }
                            }
                            /*************************************************************************************/
                        }
                    }
                }, [
                    animateOnDataChange,
                    areaChart,
                    areaChart1,
                    areaChart2,
                    containerHeight,
                    data,
                    data2,
                    data3,
                    data4,
                    data5,
                    // data0,
                    dataPointsWidth1,
                    dataPointsWidth2,
                    dataPointsWidth3,
                    dataPointsWidth4,
                    dataPointsWidth5,
                    initialSpacing,
                    maxValue,
                    props.curved,
                    spacing,
                    xAxisThickness,
                    startIndex1,
                    endIndex1,
                    startIndex2,
                    endIndex2,
                    startIndex3,
                    endIndex3,
                    startIndex4,
                    endIndex4,
                    startIndex5,
                    endIndex5,
                    arrowLength1,
                    arrowWidth1,
                    showArrowBase1,
                    props.showArrow1,
                    props.showArrows,
                    props.showArrow2,
                    props.showArrow3,
                    props.showArrow4,
                    props.showArrow5,
                    arrowLength2,
                    arrowWidth2,
                    showArrowBase2,
                    arrowLength3,
                    arrowWidth3,
                    showArrowBase3,
                    arrowLength4,
                    arrowWidth4,
                    showArrowBase4,
                    arrowLength5,
                    arrowWidth5,
                    showArrowBase5,
                ]);
                react_1.useEffect(function () {
                    var _a, _b, _c;
                    var pp = "";
                    if (!secondaryLineConfig.curved) {
                        for (var i = 0; i < secondaryData.length; i++) {
                            if (i >= secondaryLineConfig.startIndex &&
                                i <= secondaryLineConfig.endIndex &&
                                !animateOnDataChange) {
                                pp +=
                                    "L" + getX(i) + " " + getSecondaryY(secondaryData[i].value) + " ";
                            }
                        }
                        setSecondaryPoints(pp.replace("L", "M"));
                        if (secondaryData.length > 1 && secondaryLineConfig.showArrow) {
                            var ppArray = pp.trim().split(" ");
                            var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                            var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace("L", ""));
                            var y1 = parseInt(ppArray[ppArray.length - 3]);
                            var x1 = parseInt(ppArray[ppArray.length - 4].replace("L", ""));
                            var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, (_a = secondaryLineConfig.arrowConfig) === null || _a === void 0 ? void 0 : _a.length, (_b = secondaryLineConfig.arrowConfig) === null || _b === void 0 ? void 0 : _b.width, (_c = secondaryLineConfig.arrowConfig) === null || _c === void 0 ? void 0 : _c.showArrowBase);
                            setSecondaryArrowPoints(arrowPoints);
                        }
                        /***************************          For Area Chart          *************************/
                        if (secondaryLineConfig.areaChart) {
                            var ppp = "";
                            if (secondaryData.length && !animateOnDataChange) {
                                ppp = "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                ppp += pp;
                                ppp +=
                                    "L" +
                                        (initialSpacing + spacing * (secondaryData.length - 1)) +
                                        " " +
                                        heightUptoXaxis;
                                ppp += "L" + initialSpacing + " " + heightUptoXaxis + " ";
                                setSecondaryFillPoints(ppp.replace("L", "M"));
                            }
                        }
                    }
                    else {
                        /***************************          For Curved Charts         *************************/
                        var p1Array = [];
                        for (var i = 0; i < secondaryData.length; i++) {
                            if (i >= secondaryLineConfig.startIndex &&
                                i <= secondaryLineConfig.endIndex) {
                                p1Array.push([getX(i), getSecondaryY(secondaryData[i].value)]);
                            }
                        }
                        var xx = utils_1.svgPath(p1Array, secondaryLineConfig.curveType, secondaryLineConfig.curvature);
                        setSecondaryPoints(xx);
                        if (secondaryData.length > 1 && (props.showArrow1 || props.showArrows)) {
                            var arrowTipY = p1Array[p1Array.length - 1][1];
                            var arrowTipX = p1Array[p1Array.length - 1][0];
                            var y1 = p1Array[p1Array.length - 2][1];
                            var x1 = p1Array[p1Array.length - 2][0];
                            var arrowPoints = utils_1.getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                            setSecondaryArrowPoints(arrowPoints);
                        }
                        /***************************          For Curved Area Charts          *************************/
                        if (secondaryLineConfig.areaChart) {
                            if (secondaryData.length) {
                                xx = addLeadingAndTrailingPathForAreaFill(xx, secondaryData[0].value, secondaryData.length);
                                setSecondaryFillPoints(xx);
                            }
                        }
                    }
                }, [secondaryData, secondaryLineConfig]);
                var gradientDirection = (_214 = props.gradientDirection) !== null && _214 !== void 0 ? _214 : "vertical";
                var horizSections = [{ value: "0" }];
                var stepHeight = props.stepHeight || containerHeight / noOfSections;
                var stepValue = props.stepValue || maxValue / noOfSections;
                var noOfSectionsBelowXAxis = (_215 = props.noOfSectionsBelowXAxis) !== null && _215 !== void 0 ? _215 : -mostNegativeValue / (stepValue || 1);
                var showXAxisIndices = (_216 = props.showXAxisIndices) !== null && _216 !== void 0 ? _216 : constants_1.AxesAndRulesDefaults.showXAxisIndices;
                var xAxisIndicesHeight = (_217 = props.xAxisIndicesHeight) !== null && _217 !== void 0 ? _217 : constants_1.AxesAndRulesDefaults.xAxisIndicesHeight;
                var xAxisIndicesWidth = (_218 = props.xAxisIndicesWidth) !== null && _218 !== void 0 ? _218 : constants_1.AxesAndRulesDefaults.xAxisIndicesWidth;
                var xAxisIndicesColor = (_219 = props.xAxisIndicesColor) !== null && _219 !== void 0 ? _219 : constants_1.AxesAndRulesDefaults.xAxisIndicesColor;
                var xAxisTextNumberOfLines = (_220 = props.xAxisTextNumberOfLines) !== null && _220 !== void 0 ? _220 : constants_1.AxesAndRulesDefaults.xAxisTextNumberOfLines;
                var xAxisLabelsVerticalShift = (_221 = props.xAxisLabelsVerticalShift) !== null && _221 !== void 0 ? _221 : constants_1.AxesAndRulesDefaults.xAxisLabelsVerticalShift;
                var horizontalRulesStyle = props.horizontalRulesStyle;
                var showFractionalValues = (_222 = props.showFractionalValues) !== null && _222 !== void 0 ? _222 : constants_1.AxesAndRulesDefaults.showFractionalValues;
                var horizontal = false;
                var yAxisAtTop = false;
                constants_1.defaultPointerConfig.pointerStripHeight = containerHeight;
                var pointerConfig = props.pointerConfig;
                var getPointerProps = props.getPointerProps || null;
                var pointerHeight = (_223 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.height) !== null && _223 !== void 0 ? _223 : constants_1.defaultPointerConfig.height;
                var pointerWidth = (_224 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.width) !== null && _224 !== void 0 ? _224 : constants_1.defaultPointerConfig.width;
                var pointerRadius = (_225 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.radius) !== null && _225 !== void 0 ? _225 : constants_1.defaultPointerConfig.radius;
                var pointerColor = (_226 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerColor) !== null && _226 !== void 0 ? _226 : constants_1.defaultPointerConfig.pointerColor;
                var pointerComponent = (_227 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerComponent) !== null && _227 !== void 0 ? _227 : constants_1.defaultPointerConfig.pointerComponent;
                var showPointerStrip = (pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.showPointerStrip) === false
                    ? false
                    : constants_1.defaultPointerConfig.showPointerStrip;
                var pointerStripHeight = (_228 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripHeight) !== null && _228 !== void 0 ? _228 : constants_1.defaultPointerConfig.pointerStripHeight;
                var pointerStripWidth = (_229 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripWidth) !== null && _229 !== void 0 ? _229 : constants_1.defaultPointerConfig.pointerStripWidth;
                var pointerStripColor = (_230 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripColor) !== null && _230 !== void 0 ? _230 : constants_1.defaultPointerConfig.pointerStripColor;
                var pointerStripUptoDataPoint = (_231 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripUptoDataPoint) !== null && _231 !== void 0 ? _231 : constants_1.defaultPointerConfig.pointerStripUptoDataPoint;
                var pointerLabelComponent = (_232 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelComponent) !== null && _232 !== void 0 ? _232 : constants_1.defaultPointerConfig.pointerLabelComponent;
                var stripOverPointer = (_233 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripOverPointer) !== null && _233 !== void 0 ? _233 : constants_1.defaultPointerConfig.stripOverPointer;
                var shiftPointerLabelX = (_234 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelX) !== null && _234 !== void 0 ? _234 : constants_1.defaultPointerConfig.shiftPointerLabelX;
                var shiftPointerLabelY = (_235 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelY) !== null && _235 !== void 0 ? _235 : constants_1.defaultPointerConfig.shiftPointerLabelY;
                var pointerLabelWidth = (_236 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelWidth) !== null && _236 !== void 0 ? _236 : constants_1.defaultPointerConfig.pointerLabelWidth;
                var pointerLabelHeight = (_237 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelHeight) !== null && _237 !== void 0 ? _237 : constants_1.defaultPointerConfig.pointerLabelHeight;
                var autoAdjustPointerLabelPosition = (_238 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.autoAdjustPointerLabelPosition) !== null && _238 !== void 0 ? _238 : constants_1.defaultPointerConfig.autoAdjustPointerLabelPosition;
                var pointerVanishDelay = (_239 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerVanishDelay) !== null && _239 !== void 0 ? _239 : constants_1.defaultPointerConfig.pointerVanishDelay;
                var activatePointersOnLongPress = (_240 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersOnLongPress) !== null && _240 !== void 0 ? _240 : constants_1.defaultPointerConfig.activatePointersOnLongPress;
                var activatePointersDelay = (_241 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersDelay) !== null && _241 !== void 0 ? _241 : constants_1.defaultPointerConfig.activatePointersDelay;
                var initialPointerIndex = (_242 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerIndex) !== null && _242 !== void 0 ? _242 : constants_1.defaultPointerConfig.initialPointerIndex;
                var initialPointerAppearDelay = (_243 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerAppearDelay) !== null && _243 !== void 0 ? _243 : (isAnimated
                    ? animationDuration
                    : constants_1.defaultPointerConfig.initialPointerAppearDelay);
                var persistPointer = (_244 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.persistPointer) !== null && _244 !== void 0 ? _244 : constants_1.defaultPointerConfig.persistPointer;
                var hidePointer1 = (_245 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer1) !== null && _245 !== void 0 ? _245 : constants_1.defaultPointerConfig.hidePointer1;
                var hidePointer2 = (_246 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer2) !== null && _246 !== void 0 ? _246 : constants_1.defaultPointerConfig.hidePointer2;
                var hidePointer3 = (_247 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer3) !== null && _247 !== void 0 ? _247 : constants_1.defaultPointerConfig.hidePointer3;
                var hidePointer4 = (_248 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer4) !== null && _248 !== void 0 ? _248 : constants_1.defaultPointerConfig.hidePointer4;
                var hidePointer5 = (_249 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer5) !== null && _249 !== void 0 ? _249 : constants_1.defaultPointerConfig.hidePointer5;
                var hideSecondaryPointer = (_250 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hideSecondaryPointer) !== null && _250 !== void 0 ? _250 : constants_1.defaultPointerConfig.hideSecondaryPointer;
                var resetPointerOnDataChange = (_251 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.resetPointerOnDataChange) !== null && _251 !== void 0 ? _251 : constants_1.defaultPointerConfig.resetPointerOnDataChange;
                var pointerEvents = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerEvents;
                var disableScroll = props.disableScroll ||
                    (pointerConfig
                        ? activatePointersOnLongPress
                            ? responderActive
                                ? true
                                : false
                            : true
                        : false);
                var showScrollIndicator = (_252 = props.showScrollIndicator) !== null && _252 !== void 0 ? _252 : constants_1.LineDefaults.showScrollIndicator;
                var focusEnabled = (_253 = props.focusEnabled) !== null && _253 !== void 0 ? _253 : constants_1.LineDefaults.focusEnabled;
                var showDataPointOnFocus = (_254 = props.showDataPointOnFocus) !== null && _254 !== void 0 ? _254 : constants_1.LineDefaults.showDataPointOnFocus;
                var showStripOnFocus = (_255 = props.showStripOnFocus) !== null && _255 !== void 0 ? _255 : constants_1.LineDefaults.showStripOnFocus;
                var showTextOnFocus = (_256 = props.showTextOnFocus) !== null && _256 !== void 0 ? _256 : constants_1.LineDefaults.showTextOnFocus;
                var stripHeight = props.stripHeight;
                var stripWidth = (_257 = props.stripWidth) !== null && _257 !== void 0 ? _257 : constants_1.LineDefaults.stripWidth;
                var stripColor = (_258 = props.stripColor) !== null && _258 !== void 0 ? _258 : color1;
                var stripOpacity = (_259 = props.stripOpacity) !== null && _259 !== void 0 ? _259 : (startOpacity1 + endOpacity1) / 2;
                var unFocusOnPressOut = (_260 = props.unFocusOnPressOut) !== null && _260 !== void 0 ? _260 : constants_1.LineDefaults.unFocusOnPressOut;
                var delayBeforeUnFocus = (_261 = props.delayBeforeUnFocus) !== null && _261 !== void 0 ? _261 : constants_1.LineDefaults.delayBeforeUnFocus;
                var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
                var lineGradient = (_262 = props.lineGradient) !== null && _262 !== void 0 ? _262 : constants_1.LineDefaults.lineGradient;
                var lineGradientDirection = (_263 = props.lineGradientDirection) !== null && _263 !== void 0 ? _263 : "vertical";
                var lineGradientStartColor = (_264 = props.lineGradientStartColor) !== null && _264 !== void 0 ? _264 : constants_1.LineDefaults.lineGradientStartColor;
                var lineGradientEndColor = (_265 = props.lineGradientEndColor) !== null && _265 !== void 0 ? _265 : constants_1.LineDefaults.lineGradientEndColor;
                var getPointerY = function (value) {
                    return value
                        ? containerHeight -
                            (value * containerHeight) / maxValue -
                            (pointerRadius || pointerHeight / 2) +
                            10
                        : 0;
                };
                var initialisePointers = function () {
                    var _a, _b, _c, _d;
                    if (initialPointerIndex !== -1) {
                        var item_1 = (data0 !== null && data0 !== void 0 ? data0 : data)[initialPointerIndex];
                        var x_1 = initialSpacing +
                            spacing * initialPointerIndex -
                            (pointerRadius || pointerWidth / 2) -
                            1;
                        var y_1 = getPointerY(item_1.value);
                        var y2_1 = getPointerY((_a = data2 === null || data2 === void 0 ? void 0 : data2[initialPointerIndex]) === null || _a === void 0 ? void 0 : _a.value);
                        var y3_1 = getPointerY((_b = data3 === null || data3 === void 0 ? void 0 : data3[initialPointerIndex]) === null || _b === void 0 ? void 0 : _b.value);
                        var y4_1 = getPointerY((_c = data4 === null || data4 === void 0 ? void 0 : data4[initialPointerIndex]) === null || _c === void 0 ? void 0 : _c.value);
                        var y5_1 = getPointerY((_d = data5 === null || data5 === void 0 ? void 0 : data5[initialPointerIndex]) === null || _d === void 0 ? void 0 : _d.value);
                        if (initialPointerAppearDelay) {
                            setTimeout(function () {
                                setPointerConfig(initialPointerIndex, item_1, x_1, y_1, y2_1, y3_1, y4_1, y5_1);
                            }, initialPointerAppearDelay);
                        }
                        else {
                            setPointerConfig(initialPointerIndex, item_1, x_1, y_1, y2_1, y3_1, y4_1, y5_1);
                        }
                    }
                };
                react_1.useEffect(function () {
                    initialisePointers();
                }, []);
                react_1.useEffect(function () {
                    if (resetPointerOnDataChange) {
                        initialisePointers();
                    }
                }, [data]);
                var setPointerConfig = function (initialPointerIndex, item, x, y, y2, y3, y4, y5) {
                    setPointerIndex(initialPointerIndex);
                    setPointerItem(item);
                    setPointerX(x);
                    setPointerY(y);
                    setPointerY2(y2);
                    setPointerY3(y3);
                    setPointerY4(y4);
                    setPointerY5(y5);
                };
                var barAndLineChartsWrapperProps = {
                    chartType: constants_1.chartTypes.LINE,
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
                    data: data0 !== null && data0 !== void 0 ? data0 : data,
                    stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
                    secondaryData: secondaryData,
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
                    points: points,
                    points2: "", // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
                    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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
                    pointerConfig: pointerConfig,
                    getPointerProps: getPointerProps,
                    pointerIndex: pointerIndex,
                    pointerX: pointerX,
                    pointerY: pointerY,
                    onEndReached: props.onEndReached,
                    onStartReached: props.onStartReached,
                    endReachedOffset: (_266 = props.endReachedOffset) !== null && _266 !== void 0 ? _266 : constants_1.LineDefaults.endReachedOffset,
                };
                return {
                    curvature: curvature,
                    curveType: curveType,
                    scrollX: scrollX,
                    setScrollX: setScrollX,
                    arrow1Points: arrow1Points,
                    setArrow1Points: setArrow1Points,
                    arrow2Points: arrow2Points,
                    setArrow2Points: setArrow2Points,
                    arrow3Points: arrow3Points,
                    setArrow3Points: setArrow3Points,
                    arrow4Points: arrow4Points,
                    setArrow4Points: setArrow4Points,
                    arrow5Points: arrow5Points,
                    setArrow5Points: setArrow5Points,
                    secondaryArrowPoints: secondaryArrowPoints,
                    setSecondaryArrowPoints: setSecondaryArrowPoints,
                    pointerIndex: pointerIndex,
                    setPointerIndex: setPointerIndex,
                    pointerX: pointerX,
                    setPointerX: setPointerX,
                    pointerY: pointerY,
                    setPointerY: setPointerY,
                    pointerItem: pointerItem,
                    setPointerItem: setPointerItem,
                    pointerY2: pointerY2,
                    setPointerY2: setPointerY2,
                    pointerItem2: pointerItem2,
                    setPointerItem2: setPointerItem2,
                    pointerY3: pointerY3,
                    setPointerY3: setPointerY3,
                    pointerItem3: pointerItem3,
                    setPointerItem3: setPointerItem3,
                    pointerY4: pointerY4,
                    setPointerY4: setPointerY4,
                    pointerItem4: pointerItem4,
                    setPointerItem4: setPointerItem4,
                    pointerY5: pointerY5,
                    setPointerY5: setPointerY5,
                    pointerItem5: pointerItem5,
                    setPointerItem5: setPointerItem5,
                    secondaryPointerY: secondaryPointerY,
                    setSecondaryPointerY: setSecondaryPointerY,
                    secondaryPointerItem: secondaryPointerItem,
                    setSecondaryPointerItem: setSecondaryPointerItem,
                    responderStartTime: responderStartTime,
                    setResponderStartTime: setResponderStartTime,
                    responderActive: responderActive,
                    setResponderActive: setResponderActive,
                    points: points,
                    setPoints: setPoints,
                    points2: points2,
                    setPoints2: setPoints2,
                    points3: points3,
                    setPoints3: setPoints3,
                    points4: points4,
                    setPoints4: setPoints4,
                    points5: points5,
                    setPoints5: setPoints5,
                    secondaryPoints: secondaryPoints,
                    setSecondaryPoints: setSecondaryPoints,
                    fillPoints: fillPoints,
                    setFillPoints: setFillPoints,
                    fillPoints2: fillPoints2,
                    setFillPoints2: setFillPoints2,
                    fillPoints3: fillPoints3,
                    setFillPoints3: setFillPoints3,
                    fillPoints4: fillPoints4,
                    setFillPoints4: setFillPoints4,
                    fillPoints5: fillPoints5,
                    setFillPoints5: setFillPoints5,
                    secondaryFillPoints: secondaryFillPoints,
                    setSecondaryFillPoints: setSecondaryFillPoints,
                    pointsFromSet: pointsFromSet,
                    setPointsFromSet: setPointsFromSet,
                    fillPointsFromSet: fillPointsFromSet,
                    setFillPointsFromSet: setFillPointsFromSet,
                    arrowPointsFromSet: arrowPointsFromSet,
                    setArrowPointsFromSet: setArrowPointsFromSet,
                    selectedIndex: selectedIndex,
                    setSelectedIndex: setSelectedIndex,
                    noOfSections: noOfSections,
                    containerHeight: containerHeight,
                    data: data,
                    data2: data2,
                    data3: data3,
                    data4: data4,
                    data5: data5,
                    secondaryData: secondaryData,
                    dataSet: dataSet,
                    data0: data0,
                    scrollToEnd: scrollToEnd,
                    scrollAnimation: scrollAnimation,
                    scrollEventThrottle: scrollEventThrottle,
                    labelsExtraHeight: labelsExtraHeight,
                    animationDuration: animationDuration,
                    onDataChangeAnimationDuration: onDataChangeAnimationDuration,
                    animateTogether: animateTogether,
                    animateOnDataChange: animateOnDataChange,
                    startIndex1: startIndex1,
                    startIndex2: startIndex2,
                    endIndex1: endIndex1,
                    endIndex2: endIndex2,
                    startIndex3: startIndex3,
                    endIndex3: endIndex3,
                    startIndex4: startIndex4,
                    endIndex4: endIndex4,
                    startIndex5: startIndex5,
                    endIndex5: endIndex5,
                    lineSegments: lineSegments,
                    lineSegments2: lineSegments2,
                    lineSegments3: lineSegments3,
                    lineSegments4: lineSegments4,
                    lineSegments5: lineSegments5,
                    highlightedRange: highlightedRange,
                    adjustToWidth: adjustToWidth,
                    initialSpacing: initialSpacing,
                    endSpacing: endSpacing,
                    thickness: thickness,
                    yAxisLabelWidth: yAxisLabelWidth,
                    spacing: spacing,
                    xAxisThickness: xAxisThickness,
                    dataPointsHeight1: dataPointsHeight1,
                    dataPointsWidth1: dataPointsWidth1,
                    dataPointsRadius1: dataPointsRadius1,
                    dataPointsColor1: dataPointsColor1,
                    dataPointsShape1: dataPointsShape1,
                    dataPointsHeight2: dataPointsHeight2,
                    dataPointsWidth2: dataPointsWidth2,
                    dataPointsRadius2: dataPointsRadius2,
                    dataPointsColor2: dataPointsColor2,
                    dataPointsShape2: dataPointsShape2,
                    dataPointsHeight3: dataPointsHeight3,
                    dataPointsWidth3: dataPointsWidth3,
                    dataPointsRadius3: dataPointsRadius3,
                    dataPointsColor3: dataPointsColor3,
                    dataPointsShape3: dataPointsShape3,
                    dataPointsHeight4: dataPointsHeight4,
                    dataPointsWidth4: dataPointsWidth4,
                    dataPointsRadius4: dataPointsRadius4,
                    dataPointsColor4: dataPointsColor4,
                    dataPointsShape4: dataPointsShape4,
                    dataPointsHeight5: dataPointsHeight5,
                    dataPointsWidth5: dataPointsWidth5,
                    dataPointsRadius5: dataPointsRadius5,
                    dataPointsColor5: dataPointsColor5,
                    dataPointsShape5: dataPointsShape5,
                    areaChart: areaChart,
                    areaChart1: areaChart1,
                    areaChart2: areaChart2,
                    areaChart3: areaChart3,
                    areaChart4: areaChart4,
                    areaChart5: areaChart5,
                    atLeastOneAreaChart: atLeastOneAreaChart,
                    stepChart: stepChart,
                    stepChart1: stepChart1,
                    stepChart2: stepChart2,
                    stepChart3: stepChart3,
                    stepChart4: stepChart4,
                    stepChart5: stepChart5,
                    edgePosition: edgePosition,
                    textFontSize1: textFontSize1,
                    textFontSize2: textFontSize2,
                    textFontSize3: textFontSize3,
                    textFontSize4: textFontSize4,
                    textFontSize5: textFontSize5,
                    textColor1: textColor1,
                    textColor2: textColor2,
                    textColor3: textColor3,
                    textColor4: textColor4,
                    textColor5: textColor5,
                    totalWidth: totalWidth,
                    maxValue: maxValue,
                    mostNegativeValue: mostNegativeValue,
                    overflowTop: overflowTop,
                    extendedContainerHeight: extendedContainerHeight,
                    getX: getX,
                    getY: getY,
                    secondaryMaxValue: secondaryMaxValue,
                    getSecondaryY: getSecondaryY,
                    heightUptoXaxis: heightUptoXaxis,
                    setPointsOnChange: setPointsOnChange,
                    showValuesAsDataPointsText: showValuesAsDataPointsText,
                    thickness1: thickness1,
                    thickness2: thickness2,
                    thickness3: thickness3,
                    thickness4: thickness4,
                    thickness5: thickness5,
                    zIndex1: zIndex1,
                    zIndex2: zIndex2,
                    zIndex3: zIndex3,
                    zIndex4: zIndex4,
                    zIndex5: zIndex5,
                    strokeDashArray1: strokeDashArray1,
                    strokeDashArray2: strokeDashArray2,
                    strokeDashArray3: strokeDashArray3,
                    strokeDashArray4: strokeDashArray4,
                    strokeDashArray5: strokeDashArray5,
                    rotateLabel: rotateLabel,
                    isAnimated: isAnimated,
                    hideDataPoints1: hideDataPoints1,
                    hideDataPoints2: hideDataPoints2,
                    hideDataPoints3: hideDataPoints3,
                    hideDataPoints4: hideDataPoints4,
                    hideDataPoints5: hideDataPoints5,
                    color1: color1,
                    color2: color2,
                    color3: color3,
                    color4: color4,
                    color5: color5,
                    startFillColor1: startFillColor1,
                    endFillColor1: endFillColor1,
                    startOpacity: startOpacity,
                    endOpacity: endOpacity,
                    startOpacity1: startOpacity1,
                    endOpacity1: endOpacity1,
                    startFillColor2: startFillColor2,
                    endFillColor2: endFillColor2,
                    startOpacity2: startOpacity2,
                    endOpacity2: endOpacity2,
                    startFillColor3: startFillColor3,
                    endFillColor3: endFillColor3,
                    startOpacity3: startOpacity3,
                    endOpacity3: endOpacity3,
                    startFillColor4: startFillColor4,
                    endFillColor4: endFillColor4,
                    startOpacity4: startOpacity4,
                    endOpacity4: endOpacity4,
                    startFillColor5: startFillColor5,
                    endFillColor5: endFillColor5,
                    startOpacity5: startOpacity5,
                    endOpacity5: endOpacity5,
                    arrowLength1: arrowLength1,
                    arrowWidth1: arrowWidth1,
                    arrowStrokeWidth1: arrowStrokeWidth1,
                    arrowStrokeColor1: arrowStrokeColor1,
                    arrowFillColor1: arrowFillColor1,
                    showArrowBase1: showArrowBase1,
                    arrowLength2: arrowLength2,
                    arrowWidth2: arrowWidth2,
                    arrowStrokeWidth2: arrowStrokeWidth2,
                    arrowStrokeColor2: arrowStrokeColor2,
                    arrowFillColor2: arrowFillColor2,
                    showArrowBase2: showArrowBase2,
                    arrowLength3: arrowLength3,
                    arrowWidth3: arrowWidth3,
                    arrowStrokeWidth3: arrowStrokeWidth3,
                    arrowStrokeColor3: arrowStrokeColor3,
                    arrowFillColor3: arrowFillColor3,
                    showArrowBase3: showArrowBase3,
                    arrowLength4: arrowLength4,
                    arrowWidth4: arrowWidth4,
                    arrowStrokeWidth4: arrowStrokeWidth4,
                    arrowStrokeColor4: arrowStrokeColor4,
                    arrowFillColor4: arrowFillColor4,
                    showArrowBase4: showArrowBase4,
                    arrowLength5: arrowLength5,
                    arrowWidth5: arrowWidth5,
                    arrowStrokeWidth5: arrowStrokeWidth5,
                    arrowStrokeColor5: arrowStrokeColor5,
                    arrowFillColor5: arrowFillColor5,
                    showArrowBase5: showArrowBase5,
                    arrowLengthsFromSet: arrowLengthsFromSet,
                    arrowWidthsFromSet: arrowWidthsFromSet,
                    arrowStrokeWidthsFromSet: arrowStrokeWidthsFromSet,
                    arrowStrokeColorsFromSet: arrowStrokeColorsFromSet,
                    arrowFillColorsFromSet: arrowFillColorsFromSet,
                    showArrowBasesFromSet: showArrowBasesFromSet,
                    secondaryLineConfig: secondaryLineConfig,
                    addLeadingAndTrailingPathForAreaFill: addLeadingAndTrailingPathForAreaFill,
                    getNextPoint: getNextPoint,
                    getStepPath: getStepPath,
                    getSegmentPath: getSegmentPath,
                    gradientDirection: gradientDirection,
                    horizSections: horizSections,
                    stepHeight: stepHeight,
                    stepValue: stepValue,
                    noOfSectionsBelowXAxis: noOfSectionsBelowXAxis,
                    showXAxisIndices: showXAxisIndices,
                    xAxisIndicesHeight: xAxisIndicesHeight,
                    xAxisIndicesWidth: xAxisIndicesWidth,
                    xAxisIndicesColor: xAxisIndicesColor,
                    xAxisTextNumberOfLines: xAxisTextNumberOfLines,
                    xAxisLabelsVerticalShift: xAxisLabelsVerticalShift,
                    horizontalRulesStyle: horizontalRulesStyle,
                    showFractionalValues: showFractionalValues,
                    horizontal: horizontal,
                    yAxisAtTop: yAxisAtTop,
                    pointerConfig: pointerConfig,
                    getPointerProps: getPointerProps,
                    pointerHeight: pointerHeight,
                    pointerWidth: pointerWidth,
                    pointerRadius: pointerRadius,
                    pointerColor: pointerColor,
                    pointerComponent: pointerComponent,
                    showPointerStrip: showPointerStrip,
                    pointerStripHeight: pointerStripHeight,
                    pointerStripWidth: pointerStripWidth,
                    pointerStripColor: pointerStripColor,
                    pointerStripUptoDataPoint: pointerStripUptoDataPoint,
                    pointerLabelComponent: pointerLabelComponent,
                    stripOverPointer: stripOverPointer,
                    shiftPointerLabelX: shiftPointerLabelX,
                    shiftPointerLabelY: shiftPointerLabelY,
                    pointerLabelWidth: pointerLabelWidth,
                    pointerLabelHeight: pointerLabelHeight,
                    autoAdjustPointerLabelPosition: autoAdjustPointerLabelPosition,
                    pointerVanishDelay: pointerVanishDelay,
                    activatePointersOnLongPress: activatePointersOnLongPress,
                    activatePointersDelay: activatePointersDelay,
                    initialPointerIndex: initialPointerIndex,
                    initialPointerAppearDelay: initialPointerAppearDelay,
                    persistPointer: persistPointer,
                    hidePointer1: hidePointer1,
                    hidePointer2: hidePointer2,
                    hidePointer3: hidePointer3,
                    hidePointer4: hidePointer4,
                    hidePointer5: hidePointer5,
                    hideSecondaryPointer: hideSecondaryPointer,
                    resetPointerOnDataChange: resetPointerOnDataChange,
                    pointerEvents: pointerEvents,
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
                    containerHeightIncludingBelowXAxis: containerHeightIncludingBelowXAxis,
                    lineGradient: lineGradient,
                    lineGradientDirection: lineGradientDirection,
                    lineGradientStartColor: lineGradientStartColor,
                    lineGradientEndColor: lineGradientEndColor,
                    getPointerY: getPointerY,
                    initialisePointers: initialisePointers,
                    setPointerConfig: setPointerConfig,
                    barAndLineChartsWrapperProps: barAndLineChartsWrapperProps,
                };
            });
        }
    };
});
//# sourceMappingURL=index.js.map