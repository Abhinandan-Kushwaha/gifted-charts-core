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
import { AxesAndRulesDefaults, LineDefaults, SEGMENT_END, SEGMENT_START, chartTypes, defaultArrowConfig, defaultPointerConfig } from '../utils/constants';
import { adjustToOffset, computeMaxAndMinItems, getAllArrowProperties, getArrowPoints, getAxesAndRulesProps, getCurvePathWithSegments, getExtendedContainerHeightWithPadding, getInterpolatedData, getLineSegmentsForMissingValues, getMaxValue, getNoOfSections, getPathWithHighlight, getSanitisedData, getSecondaryDataWithOffsetIncluded, getSegmentString, svgPath } from '../utils';
import { EdgePosition } from '../utils/types';
export var useLineChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204, _205, _206, _207, _208, _209, _210, _211, _212, _213, _214, _215, _216, _217, _218, _219, _220, _221, _222, _223, _224, _225, _226, _227, _228, _229, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239, _240, _241, _242, _243, _244, _245, _246, _247, _248, _249, _250, _251, _252, _253, _254, _255, _256, _257, _258, _259, _260, _261, _262, _263, _264, _265, _266, _267, _268, _269, _270, _271, _272, _273, _274, _275, _276, _277, _278, _279, _280, _281, _282, _283, _284, _285, _286, _287, _288, _289, _290, _291, _292, _293, _294, _295, _296, _297;
    var animations = props.animations, showDataPointsForMissingValues = props.showDataPointsForMissingValues, _298 = props.interpolateMissingValues, interpolateMissingValues = _298 === void 0 ? true : _298, onlyPositive = props.onlyPositive, yAxisOffset = props.yAxisOffset, parentWidth = props.parentWidth;
    var curvature = (_a = props.curvature) !== null && _a !== void 0 ? _a : LineDefaults.curvature;
    var curveType = (_b = props.curveType) !== null && _b !== void 0 ? _b : LineDefaults.curveType;
    var _299 = __read(useState(0), 2), scrollX = _299[0], setScrollX = _299[1];
    var _300 = __read(useState(''), 2), arrow1Points = _300[0], setArrow1Points = _300[1];
    var _301 = __read(useState(''), 2), arrow2Points = _301[0], setArrow2Points = _301[1];
    var _302 = __read(useState(''), 2), arrow3Points = _302[0], setArrow3Points = _302[1];
    var _303 = __read(useState(''), 2), arrow4Points = _303[0], setArrow4Points = _303[1];
    var _304 = __read(useState(''), 2), arrow5Points = _304[0], setArrow5Points = _304[1];
    var _305 = __read(useState(''), 2), secondaryArrowPoints = _305[0], setSecondaryArrowPoints = _305[1];
    var _306 = __read(useState(-1), 2), pointerIndex = _306[0], setPointerIndex = _306[1];
    var _307 = __read(useState(0), 2), pointerX = _307[0], setPointerX = _307[1];
    var _308 = __read(useState(0), 2), pointerY = _308[0], setPointerY = _308[1];
    var _309 = __read(useState(), 2), pointerItem = _309[0], setPointerItem = _309[1];
    var _310 = __read(useState(0), 2), pointerY2 = _310[0], setPointerY2 = _310[1];
    var _311 = __read(useState(), 2), pointerItem2 = _311[0], setPointerItem2 = _311[1];
    var _312 = __read(useState(0), 2), pointerY3 = _312[0], setPointerY3 = _312[1];
    var _313 = __read(useState(), 2), pointerItem3 = _313[0], setPointerItem3 = _313[1];
    var _314 = __read(useState(0), 2), pointerY4 = _314[0], setPointerY4 = _314[1];
    var _315 = __read(useState(), 2), pointerItem4 = _315[0], setPointerItem4 = _315[1];
    var _316 = __read(useState(0), 2), pointerY5 = _316[0], setPointerY5 = _316[1];
    var _317 = __read(useState([]), 2), pointerYsForDataSet = _317[0], setPointerYsForDataSet = _317[1];
    var _318 = __read(useState(), 2), pointerItem5 = _318[0], setPointerItem5 = _318[1];
    var _319 = __read(useState(0), 2), secondaryPointerY = _319[0], setSecondaryPointerY = _319[1];
    var _320 = __read(useState(), 2), secondaryPointerItem = _320[0], setSecondaryPointerItem = _320[1];
    var _321 = __read(useState(0), 2), responderStartTime = _321[0], setResponderStartTime = _321[1];
    var _322 = __read(useState(false), 2), responderActive = _322[0], setResponderActive = _322[1];
    var _323 = __read(useState(''), 2), points = _323[0], setPoints = _323[1];
    var _324 = __read(useState(''), 2), points2 = _324[0], setPoints2 = _324[1];
    var _325 = __read(useState(''), 2), points3 = _325[0], setPoints3 = _325[1];
    var _326 = __read(useState(''), 2), points4 = _326[0], setPoints4 = _326[1];
    var _327 = __read(useState(''), 2), points5 = _327[0], setPoints5 = _327[1];
    var _328 = __read(useState(''), 2), secondaryPoints = _328[0], setSecondaryPoints = _328[1];
    var _329 = __read(useState(''), 2), fillPoints = _329[0], setFillPoints = _329[1];
    var _330 = __read(useState(''), 2), fillPoints2 = _330[0], setFillPoints2 = _330[1];
    var _331 = __read(useState(''), 2), fillPoints3 = _331[0], setFillPoints3 = _331[1];
    var _332 = __read(useState(''), 2), fillPoints4 = _332[0], setFillPoints4 = _332[1];
    var _333 = __read(useState(''), 2), fillPoints5 = _333[0], setFillPoints5 = _333[1];
    var _334 = __read(useState(''), 2), secondaryFillPoints = _334[0], setSecondaryFillPoints = _334[1];
    var _335 = __read(useState([]), 2), pointsFromSet = _335[0], setPointsFromSet = _335[1];
    var _336 = __read(useState([]), 2), fillPointsFromSet = _336[0], setFillPointsFromSet = _336[1];
    var _337 = __read(useState([]), 2), arrowPointsFromSet = _337[0], setArrowPointsFromSet = _337[1];
    var _338 = __read(useState((_c = props.focusedDataPointIndex) !== null && _c !== void 0 ? _c : -1), 2), selectedIndex = _338[0], setSelectedIndex = _338[1];
    useEffect(function () {
        var _a;
        setSelectedIndex((_a = props.focusedDataPointIndex) !== null && _a !== void 0 ? _a : -1);
    }, [props.focusedDataPointIndex]);
    var noOfSections = getNoOfSections(props.noOfSections, props.maxValue, props.stepValue);
    var containerHeight = (_d = props.height) !== null && _d !== void 0 ? _d : (((_e = props.stepHeight) !== null && _e !== void 0 ? _e : 0) * noOfSections ||
        AxesAndRulesDefaults.containerHeight);
    var dataSanitisationProps = {
        showDataPointsForMissingValues: showDataPointsForMissingValues,
        interpolateMissingValues: interpolateMissingValues,
        onlyPositive: onlyPositive,
        yAxisOffset: yAxisOffset
    };
    var data = useMemo(function () { return getSanitisedData(props.data, dataSanitisationProps); }, [yAxisOffset, props.data]);
    var data2 = useMemo(function () { return getSanitisedData(props.data2, dataSanitisationProps); }, [yAxisOffset, props.data2]);
    var data3 = useMemo(function () { return getSanitisedData(props.data3, dataSanitisationProps); }, [yAxisOffset, props.data3]);
    var data4 = useMemo(function () { return getSanitisedData(props.data4, dataSanitisationProps); }, [yAxisOffset, props.data4]);
    var data5 = useMemo(function () { return getSanitisedData(props.data5, dataSanitisationProps); }, [yAxisOffset, props.data5]);
    var secondaryData = (_f = getSecondaryDataWithOffsetIncluded(props.secondaryData, props.secondaryYAxis, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive)) !== null && _f !== void 0 ? _f : [];
    var dataSet = props.dataSet;
    if (dataSet === null || dataSet === void 0 ? void 0 : dataSet.length) {
        dataSet = useMemo(function () {
            return dataSet === null || dataSet === void 0 ? void 0 : dataSet.map(function (dataSetItem) {
                var nullishHandledDataItem = getInterpolatedData(dataSetItem.data, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                return __assign(__assign({}, dataSetItem), { data: adjustToOffset(nullishHandledDataItem, yAxisOffset) });
            });
        }, [yAxisOffset, dataSet]);
    }
    var data0 = (_g = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _g === void 0 ? void 0 : _g.data;
    var scrollToEnd = (_h = props.scrollToEnd) !== null && _h !== void 0 ? _h : LineDefaults.scrollToEnd;
    var scrollAnimation = (_j = props.scrollAnimation) !== null && _j !== void 0 ? _j : LineDefaults.scrollAnimation;
    var scrollEventThrottle = (_k = props.scrollEventThrottle) !== null && _k !== void 0 ? _k : LineDefaults.scrollEventThrottle;
    var labelsExtraHeight = (_l = props.labelsExtraHeight) !== null && _l !== void 0 ? _l : 0;
    var animationDuration = (_m = props.animationDuration) !== null && _m !== void 0 ? _m : LineDefaults.animationDuration;
    var onDataChangeAnimationDuration = (_o = props.onDataChangeAnimationDuration) !== null && _o !== void 0 ? _o : 400;
    var animateTogether = (_p = props.animateTogether) !== null && _p !== void 0 ? _p : LineDefaults.animateTogether;
    var animateOnDataChange = yAxisOffset
        ? false
        : (_q = props.animateOnDataChange) !== null && _q !== void 0 ? _q : false;
    var startIndex1 = (_s = (_r = props.startIndex1) !== null && _r !== void 0 ? _r : props.startIndex) !== null && _s !== void 0 ? _s : 0;
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
    var startIndex2 = (_t = props.startIndex2) !== null && _t !== void 0 ? _t : 0;
    var endIndex2 = (_u = props.endIndex2) !== null && _u !== void 0 ? _u : data2.length - 1;
    var startIndex3 = (_v = props.startIndex3) !== null && _v !== void 0 ? _v : 0;
    var endIndex3 = (_w = props.endIndex3) !== null && _w !== void 0 ? _w : data3.length - 1;
    var startIndex4 = (_x = props.startIndex4) !== null && _x !== void 0 ? _x : 0;
    var endIndex4 = (_y = props.endIndex4) !== null && _y !== void 0 ? _y : data4.length - 1;
    var startIndex5 = (_z = props.startIndex5) !== null && _z !== void 0 ? _z : 0;
    var endIndex5 = (_0 = props.endIndex5) !== null && _0 !== void 0 ? _0 : data5.length - 1;
    var lineSegments = !interpolateMissingValues
        ? getLineSegmentsForMissingValues(props.data)
        : props.lineSegments;
    var lineSegments2 = !interpolateMissingValues
        ? getLineSegmentsForMissingValues(props.data2)
        : props.lineSegments2;
    var lineSegments3 = !interpolateMissingValues
        ? getLineSegmentsForMissingValues(props.data3)
        : props.lineSegments3;
    var lineSegments4 = !interpolateMissingValues
        ? getLineSegmentsForMissingValues(props.data4)
        : props.lineSegments4;
    var lineSegments5 = !interpolateMissingValues
        ? getLineSegmentsForMissingValues(props.data5)
        : props.lineSegments5;
    var highlightedRange = props.highlightedRange;
    var newPoints = '';
    var newFillPoints = '';
    var counter = 0;
    var adjustToWidth = (_1 = props.adjustToWidth) !== null && _1 !== void 0 ? _1 : false;
    var initialSpacing = (_2 = props.initialSpacing) !== null && _2 !== void 0 ? _2 : LineDefaults.initialSpacing;
    var endSpacing = (_3 = props.endSpacing) !== null && _3 !== void 0 ? _3 : (adjustToWidth ? 0 : LineDefaults.endSpacing);
    var thickness = (_4 = props.thickness) !== null && _4 !== void 0 ? _4 : LineDefaults.thickness;
    var yAxisLabelWidth = (_5 = props.yAxisLabelWidth) !== null && _5 !== void 0 ? _5 : (props.hideYAxisText
        ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
        : AxesAndRulesDefaults.yAxisLabelWidth);
    var spacing = (_6 = props.spacing) !== null && _6 !== void 0 ? _6 : (adjustToWidth
        ? (((_7 = props.width) !== null && _7 !== void 0 ? _7 : parentWidth - yAxisLabelWidth) - initialSpacing) /
            Math.max((data0 !== null && data0 !== void 0 ? data0 : data).length - 1, 1)
        : LineDefaults.spacing);
    var xAxisThickness = (_8 = props.xAxisThickness) !== null && _8 !== void 0 ? _8 : AxesAndRulesDefaults.xAxisThickness;
    var dataPointsHeight1 = (_10 = (_9 = props.dataPointsHeight1) !== null && _9 !== void 0 ? _9 : props.dataPointsHeight) !== null && _10 !== void 0 ? _10 : LineDefaults.dataPointsHeight;
    var dataPointsWidth1 = (_12 = (_11 = props.dataPointsWidth1) !== null && _11 !== void 0 ? _11 : props.dataPointsWidth) !== null && _12 !== void 0 ? _12 : LineDefaults.dataPointsWidth;
    var dataPointsRadius1 = (_14 = (_13 = props.dataPointsRadius1) !== null && _13 !== void 0 ? _13 : props.dataPointsRadius) !== null && _14 !== void 0 ? _14 : LineDefaults.dataPointsRadius;
    var dataPointsColor1 = (_16 = (_15 = props.dataPointsColor1) !== null && _15 !== void 0 ? _15 : props.dataPointsColor) !== null && _16 !== void 0 ? _16 : LineDefaults.dataPointsColor;
    var dataPointsShape1 = (_18 = (_17 = props.dataPointsShape1) !== null && _17 !== void 0 ? _17 : props.dataPointsShape) !== null && _18 !== void 0 ? _18 : LineDefaults.dataPointsShape;
    var dataPointsHeight2 = (_20 = (_19 = props.dataPointsHeight2) !== null && _19 !== void 0 ? _19 : props.dataPointsHeight) !== null && _20 !== void 0 ? _20 : LineDefaults.dataPointsHeight;
    var dataPointsWidth2 = (_22 = (_21 = props.dataPointsWidth2) !== null && _21 !== void 0 ? _21 : props.dataPointsWidth) !== null && _22 !== void 0 ? _22 : LineDefaults.dataPointsWidth;
    var dataPointsRadius2 = (_24 = (_23 = props.dataPointsRadius2) !== null && _23 !== void 0 ? _23 : props.dataPointsRadius) !== null && _24 !== void 0 ? _24 : LineDefaults.dataPointsRadius;
    var dataPointsColor2 = (_26 = (_25 = props.dataPointsColor2) !== null && _25 !== void 0 ? _25 : props.dataPointsColor) !== null && _26 !== void 0 ? _26 : LineDefaults.dataPointsColor2;
    var dataPointsShape2 = (_28 = (_27 = props.dataPointsShape2) !== null && _27 !== void 0 ? _27 : props.dataPointsShape) !== null && _28 !== void 0 ? _28 : LineDefaults.dataPointsShape;
    var dataPointsHeight3 = (_30 = (_29 = props.dataPointsHeight3) !== null && _29 !== void 0 ? _29 : props.dataPointsHeight) !== null && _30 !== void 0 ? _30 : LineDefaults.dataPointsHeight;
    var dataPointsWidth3 = (_32 = (_31 = props.dataPointsWidth3) !== null && _31 !== void 0 ? _31 : props.dataPointsWidth) !== null && _32 !== void 0 ? _32 : LineDefaults.dataPointsWidth;
    var dataPointsRadius3 = (_34 = (_33 = props.dataPointsRadius3) !== null && _33 !== void 0 ? _33 : props.dataPointsRadius) !== null && _34 !== void 0 ? _34 : LineDefaults.dataPointsRadius;
    var dataPointsColor3 = (_36 = (_35 = props.dataPointsColor3) !== null && _35 !== void 0 ? _35 : props.dataPointsColor) !== null && _36 !== void 0 ? _36 : LineDefaults.dataPointsColor3;
    var dataPointsShape3 = (_38 = (_37 = props.dataPointsShape3) !== null && _37 !== void 0 ? _37 : props.dataPointsShape) !== null && _38 !== void 0 ? _38 : LineDefaults.dataPointsShape;
    var dataPointsHeight4 = (_40 = (_39 = props.dataPointsHeight4) !== null && _39 !== void 0 ? _39 : props.dataPointsHeight) !== null && _40 !== void 0 ? _40 : LineDefaults.dataPointsHeight;
    var dataPointsWidth4 = (_42 = (_41 = props.dataPointsWidth4) !== null && _41 !== void 0 ? _41 : props.dataPointsWidth) !== null && _42 !== void 0 ? _42 : LineDefaults.dataPointsWidth;
    var dataPointsRadius4 = (_44 = (_43 = props.dataPointsRadius4) !== null && _43 !== void 0 ? _43 : props.dataPointsRadius) !== null && _44 !== void 0 ? _44 : LineDefaults.dataPointsRadius;
    var dataPointsColor4 = (_46 = (_45 = props.dataPointsColor4) !== null && _45 !== void 0 ? _45 : props.dataPointsColor) !== null && _46 !== void 0 ? _46 : LineDefaults.dataPointsColor;
    var dataPointsShape4 = (_48 = (_47 = props.dataPointsShape4) !== null && _47 !== void 0 ? _47 : props.dataPointsShape) !== null && _48 !== void 0 ? _48 : LineDefaults.dataPointsShape;
    var dataPointsHeight5 = (_50 = (_49 = props.dataPointsHeight5) !== null && _49 !== void 0 ? _49 : props.dataPointsHeight) !== null && _50 !== void 0 ? _50 : LineDefaults.dataPointsHeight;
    var dataPointsWidth5 = (_52 = (_51 = props.dataPointsWidth5) !== null && _51 !== void 0 ? _51 : props.dataPointsWidth) !== null && _52 !== void 0 ? _52 : LineDefaults.dataPointsWidth;
    var dataPointsRadius5 = (_54 = (_53 = props.dataPointsRadius5) !== null && _53 !== void 0 ? _53 : props.dataPointsRadius) !== null && _54 !== void 0 ? _54 : LineDefaults.dataPointsRadius;
    var dataPointsColor5 = (_56 = (_55 = props.dataPointsColor5) !== null && _55 !== void 0 ? _55 : props.dataPointsColor) !== null && _56 !== void 0 ? _56 : LineDefaults.dataPointsColor;
    var dataPointsShape5 = (_58 = (_57 = props.dataPointsShape5) !== null && _57 !== void 0 ? _57 : props.dataPointsShape) !== null && _58 !== void 0 ? _58 : LineDefaults.dataPointsShape;
    var areaChart = (_59 = props.areaChart) !== null && _59 !== void 0 ? _59 : false;
    var areaChart1 = (_60 = props.areaChart1) !== null && _60 !== void 0 ? _60 : false;
    var areaChart2 = (_61 = props.areaChart2) !== null && _61 !== void 0 ? _61 : false;
    var areaChart3 = (_62 = props.areaChart3) !== null && _62 !== void 0 ? _62 : false;
    var areaChart4 = (_63 = props.areaChart4) !== null && _63 !== void 0 ? _63 : false;
    var areaChart5 = (_64 = props.areaChart5) !== null && _64 !== void 0 ? _64 : false;
    var atLeastOneAreaChart = (_70 = (_69 = (_68 = (_67 = (_66 = (_65 = dataSet === null || dataSet === void 0 ? void 0 : dataSet.some(function (set) { return set.areaChart; })) !== null && _65 !== void 0 ? _65 : areaChart) !== null && _66 !== void 0 ? _66 : areaChart1) !== null && _67 !== void 0 ? _67 : areaChart2) !== null && _68 !== void 0 ? _68 : areaChart3) !== null && _69 !== void 0 ? _69 : areaChart4) !== null && _70 !== void 0 ? _70 : areaChart5;
    var getIsNthAreaChart = function (n) {
        if (areaChart)
            return true;
        if (!(dataSet === null || dataSet === void 0 ? void 0 : dataSet.length)) {
            switch (n) {
                case 0:
                    return areaChart1;
                case 1:
                    return areaChart2;
                case 2:
                    return areaChart3;
                case 3:
                    return areaChart4;
                case 4:
                    return areaChart5;
            }
        }
        return false;
    };
    var stepChart = (_71 = props.stepChart) !== null && _71 !== void 0 ? _71 : false;
    var stepChart1 = (_72 = props.stepChart1) !== null && _72 !== void 0 ? _72 : false;
    var stepChart2 = (_73 = props.stepChart2) !== null && _73 !== void 0 ? _73 : false;
    var stepChart3 = (_74 = props.stepChart3) !== null && _74 !== void 0 ? _74 : false;
    var stepChart4 = (_75 = props.stepChart4) !== null && _75 !== void 0 ? _75 : false;
    var stepChart5 = (_76 = props.stepChart5) !== null && _76 !== void 0 ? _76 : false;
    var edgePosition = (_77 = props.edgePosition) !== null && _77 !== void 0 ? _77 : LineDefaults.edgePosition;
    var textFontSize1 = (_79 = (_78 = props.textFontSize1) !== null && _78 !== void 0 ? _78 : props.textFontSize) !== null && _79 !== void 0 ? _79 : LineDefaults.textFontSize;
    var textFontSize2 = (_81 = (_80 = props.textFontSize2) !== null && _80 !== void 0 ? _80 : props.textFontSize) !== null && _81 !== void 0 ? _81 : LineDefaults.textFontSize;
    var textFontSize3 = (_83 = (_82 = props.textFontSize3) !== null && _82 !== void 0 ? _82 : props.textFontSize) !== null && _83 !== void 0 ? _83 : LineDefaults.textFontSize;
    var textFontSize4 = (_85 = (_84 = props.textFontSize4) !== null && _84 !== void 0 ? _84 : props.textFontSize) !== null && _85 !== void 0 ? _85 : LineDefaults.textFontSize;
    var textFontSize5 = (_87 = (_86 = props.textFontSize5) !== null && _86 !== void 0 ? _86 : props.textFontSize) !== null && _87 !== void 0 ? _87 : LineDefaults.textFontSize;
    var textColor1 = (_89 = (_88 = props.textColor1) !== null && _88 !== void 0 ? _88 : props.textColor) !== null && _89 !== void 0 ? _89 : LineDefaults.textColor;
    var textColor2 = (_91 = (_90 = props.textColor2) !== null && _90 !== void 0 ? _90 : props.textColor) !== null && _91 !== void 0 ? _91 : LineDefaults.textColor;
    var textColor3 = (_93 = (_92 = props.textColor3) !== null && _92 !== void 0 ? _92 : props.textColor) !== null && _93 !== void 0 ? _93 : LineDefaults.textColor;
    var textColor4 = (_95 = (_94 = props.textColor4) !== null && _94 !== void 0 ? _94 : props.textColor) !== null && _95 !== void 0 ? _95 : LineDefaults.textColor;
    var textColor5 = (_97 = (_96 = props.textColor5) !== null && _96 !== void 0 ? _96 : props.textColor) !== null && _97 !== void 0 ? _97 : LineDefaults.textColor;
    var totalWidth = initialSpacing + spacing * (data0 !== null && data0 !== void 0 ? data0 : data).length;
    var _339 = computeMaxAndMinItems(data0 !== null && data0 !== void 0 ? data0 : data, props.roundToDigits, props.showFractionalValues), maxItem = _339.maxItem, minItem = _339.minItem;
    var maxValue = getMaxValue(props.maxValue, props.stepValue, noOfSections, maxItem);
    var mostNegativeValue = (_98 = props.mostNegativeValue) !== null && _98 !== void 0 ? _98 : minItem;
    var overflowTop = (_99 = props.overflowTop) !== null && _99 !== void 0 ? _99 : 0;
    var extendedContainerHeight = getExtendedContainerHeightWithPadding(containerHeight, overflowTop);
    var getX = function (index) { return initialSpacing + spacing * index - 1; };
    var getY = function (value) {
        return extendedContainerHeight - (value * containerHeight) / maxValue;
    };
    var secondaryMaxItem = computeMaxAndMinItems(secondaryData, (_100 = props.secondaryYAxis) === null || _100 === void 0 ? void 0 : _100.roundToDigits, (_101 = props.secondaryYAxis) === null || _101 === void 0 ? void 0 : _101.showFractionalValues).maxItem;
    var secondaryMaxValue = (_103 = (_102 = props.secondaryYAxis) === null || _102 === void 0 ? void 0 : _102.maxValue) !== null && _103 !== void 0 ? _103 : (secondaryMaxItem || maxValue);
    var getSecondaryY = function (value) {
        return extendedContainerHeight - (value * containerHeight) / secondaryMaxValue;
    };
    var heightUptoXaxis = extendedContainerHeight - xAxisThickness;
    if (animateOnDataChange && animations) {
        animations.forEach(function (item, index) {
            item.addListener(function (val) {
                var _a, _b, _c, _d, _e;
                var temp = (_b = (_a = data[index]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
                data[index].value = val.value;
                var pp = '';
                var ppp = '';
                if (!((_c = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0].curved) !== null && _c !== void 0 ? _c : props.curved)) {
                    for (var i = 0; i < (data0 !== null && data0 !== void 0 ? data0 : data).length; i++) {
                        pp += 'L' + getX(i) + ' ' + getY((data0 !== null && data0 !== void 0 ? data0 : data)[i].value) + ' ';
                    }
                    if ((_e = (_d = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _d === void 0 ? void 0 : _d.areaChart) !== null && _e !== void 0 ? _e : areaChart) {
                        ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp += pp;
                        ppp +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
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
                setPoints(newPoints.replace('L', 'M'));
                if (areaChart) {
                    setFillPoints(newFillPoints.replace('L', 'M'));
                }
            }
        }
    };
    var showValuesAsDataPointsText = (_104 = props.showValuesAsDataPointsText) !== null && _104 !== void 0 ? _104 : LineDefaults.showValuesAsDataPointsText;
    var thickness1 = (_106 = (_105 = props.thickness1) !== null && _105 !== void 0 ? _105 : props.thickness) !== null && _106 !== void 0 ? _106 : LineDefaults.thickness;
    var thickness2 = (_108 = (_107 = props.thickness2) !== null && _107 !== void 0 ? _107 : props.thickness) !== null && _108 !== void 0 ? _108 : LineDefaults.thickness;
    var thickness3 = (_110 = (_109 = props.thickness3) !== null && _109 !== void 0 ? _109 : props.thickness) !== null && _110 !== void 0 ? _110 : LineDefaults.thickness;
    var thickness4 = (_112 = (_111 = props.thickness4) !== null && _111 !== void 0 ? _111 : props.thickness) !== null && _112 !== void 0 ? _112 : LineDefaults.thickness;
    var thickness5 = (_114 = (_113 = props.thickness5) !== null && _113 !== void 0 ? _113 : props.thickness) !== null && _114 !== void 0 ? _114 : LineDefaults.thickness;
    var zIndex1 = (_115 = props.zIndex1) !== null && _115 !== void 0 ? _115 : 0;
    var zIndex2 = (_116 = props.zIndex2) !== null && _116 !== void 0 ? _116 : 0;
    var zIndex3 = (_117 = props.zIndex3) !== null && _117 !== void 0 ? _117 : 0;
    var zIndex4 = (_118 = props.zIndex4) !== null && _118 !== void 0 ? _118 : 0;
    var zIndex5 = (_119 = props.zIndex5) !== null && _119 !== void 0 ? _119 : 0;
    var strokeDashArray1 = (_120 = props.strokeDashArray1) !== null && _120 !== void 0 ? _120 : props.strokeDashArray;
    var strokeDashArray2 = (_121 = props.strokeDashArray2) !== null && _121 !== void 0 ? _121 : props.strokeDashArray;
    var strokeDashArray3 = (_122 = props.strokeDashArray3) !== null && _122 !== void 0 ? _122 : props.strokeDashArray;
    var strokeDashArray4 = (_123 = props.strokeDashArray4) !== null && _123 !== void 0 ? _123 : props.strokeDashArray;
    var strokeDashArray5 = (_124 = props.strokeDashArray5) !== null && _124 !== void 0 ? _124 : props.strokeDashArray;
    var rotateLabel = (_125 = props.rotateLabel) !== null && _125 !== void 0 ? _125 : false;
    var isAnimated = (_126 = props.isAnimated) !== null && _126 !== void 0 ? _126 : false;
    var hideDataPoints1 = (_128 = (_127 = props.hideDataPoints) !== null && _127 !== void 0 ? _127 : props.hideDataPoints1) !== null && _128 !== void 0 ? _128 : false;
    var hideDataPoints2 = (_130 = (_129 = props.hideDataPoints) !== null && _129 !== void 0 ? _129 : props.hideDataPoints2) !== null && _130 !== void 0 ? _130 : false;
    var hideDataPoints3 = (_132 = (_131 = props.hideDataPoints) !== null && _131 !== void 0 ? _131 : props.hideDataPoints3) !== null && _132 !== void 0 ? _132 : false;
    var hideDataPoints4 = (_134 = (_133 = props.hideDataPoints) !== null && _133 !== void 0 ? _133 : props.hideDataPoints4) !== null && _134 !== void 0 ? _134 : false;
    var hideDataPoints5 = (_136 = (_135 = props.hideDataPoints) !== null && _135 !== void 0 ? _135 : props.hideDataPoints5) !== null && _136 !== void 0 ? _136 : false;
    var color1 = (_138 = (_137 = props.color1) !== null && _137 !== void 0 ? _137 : props.color) !== null && _138 !== void 0 ? _138 : LineDefaults.color;
    var color2 = (_140 = (_139 = props.color2) !== null && _139 !== void 0 ? _139 : props.color) !== null && _140 !== void 0 ? _140 : LineDefaults.color;
    var color3 = (_142 = (_141 = props.color3) !== null && _141 !== void 0 ? _141 : props.color) !== null && _142 !== void 0 ? _142 : LineDefaults.color;
    var color4 = (_144 = (_143 = props.color4) !== null && _143 !== void 0 ? _143 : props.color) !== null && _144 !== void 0 ? _144 : LineDefaults.color;
    var color5 = (_146 = (_145 = props.color5) !== null && _145 !== void 0 ? _145 : props.color) !== null && _146 !== void 0 ? _146 : LineDefaults.color;
    var startFillColor1 = (_148 = (_147 = props.startFillColor1) !== null && _147 !== void 0 ? _147 : props.startFillColor) !== null && _148 !== void 0 ? _148 : LineDefaults.startFillColor;
    var endFillColor1 = (_150 = (_149 = props.endFillColor1) !== null && _149 !== void 0 ? _149 : props.endFillColor) !== null && _150 !== void 0 ? _150 : LineDefaults.endFillColor;
    var startOpacity = (_151 = props.startOpacity) !== null && _151 !== void 0 ? _151 : LineDefaults.startOpacity;
    var endOpacity = (_152 = props.endOpacity) !== null && _152 !== void 0 ? _152 : LineDefaults.endOpacity;
    var startOpacity1 = (_153 = props.startOpacity1) !== null && _153 !== void 0 ? _153 : startOpacity;
    var endOpacity1 = (_154 = props.endOpacity1) !== null && _154 !== void 0 ? _154 : endOpacity;
    var startFillColor2 = (_156 = (_155 = props.startFillColor2) !== null && _155 !== void 0 ? _155 : props.startFillColor) !== null && _156 !== void 0 ? _156 : LineDefaults.startFillColor;
    var endFillColor2 = (_158 = (_157 = props.endFillColor2) !== null && _157 !== void 0 ? _157 : props.endFillColor) !== null && _158 !== void 0 ? _158 : LineDefaults.endFillColor;
    var startOpacity2 = (_159 = props.startOpacity2) !== null && _159 !== void 0 ? _159 : startOpacity;
    var endOpacity2 = (_160 = props.endOpacity2) !== null && _160 !== void 0 ? _160 : endOpacity;
    var startFillColor3 = (_162 = (_161 = props.startFillColor3) !== null && _161 !== void 0 ? _161 : props.startFillColor) !== null && _162 !== void 0 ? _162 : LineDefaults.startFillColor;
    var endFillColor3 = (_164 = (_163 = props.endFillColor3) !== null && _163 !== void 0 ? _163 : props.endFillColor) !== null && _164 !== void 0 ? _164 : LineDefaults.endFillColor;
    var startOpacity3 = (_165 = props.startOpacity3) !== null && _165 !== void 0 ? _165 : startOpacity;
    var endOpacity3 = (_166 = props.endOpacity3) !== null && _166 !== void 0 ? _166 : endOpacity;
    var startFillColor4 = (_168 = (_167 = props.startFillColor4) !== null && _167 !== void 0 ? _167 : props.startFillColor) !== null && _168 !== void 0 ? _168 : LineDefaults.startFillColor;
    var endFillColor4 = (_170 = (_169 = props.endFillColor4) !== null && _169 !== void 0 ? _169 : props.endFillColor) !== null && _170 !== void 0 ? _170 : LineDefaults.endFillColor;
    var startOpacity4 = (_171 = props.startOpacity4) !== null && _171 !== void 0 ? _171 : startOpacity;
    var endOpacity4 = (_172 = props.endOpacity4) !== null && _172 !== void 0 ? _172 : endOpacity;
    var startFillColor5 = (_174 = (_173 = props.startFillColor5) !== null && _173 !== void 0 ? _173 : props.startFillColor) !== null && _174 !== void 0 ? _174 : LineDefaults.startFillColor;
    var endFillColor5 = (_176 = (_175 = props.endFillColor5) !== null && _175 !== void 0 ? _175 : props.endFillColor) !== null && _176 !== void 0 ? _176 : LineDefaults.endFillColor;
    var startOpacity5 = (_177 = props.startOpacity5) !== null && _177 !== void 0 ? _177 : startOpacity;
    var endOpacity5 = (_178 = props.endOpacity5) !== null && _178 !== void 0 ? _178 : endOpacity;
    defaultArrowConfig.strokeWidth = (_180 = (_179 = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _179 === void 0 ? void 0 : _179.thickness) !== null && _180 !== void 0 ? _180 : thickness1;
    defaultArrowConfig.strokeColor = (_182 = (_181 = dataSet === null || dataSet === void 0 ? void 0 : dataSet[0]) === null || _181 === void 0 ? void 0 : _181.color) !== null && _182 !== void 0 ? _182 : color1;
    var _340 = getAllArrowProperties(props, defaultArrowConfig), arrowLength1 = _340.arrowLength1, arrowWidth1 = _340.arrowWidth1, arrowStrokeWidth1 = _340.arrowStrokeWidth1, arrowStrokeColor1 = _340.arrowStrokeColor1, arrowFillColor1 = _340.arrowFillColor1, showArrowBase1 = _340.showArrowBase1, arrowLength2 = _340.arrowLength2, arrowWidth2 = _340.arrowWidth2, arrowStrokeWidth2 = _340.arrowStrokeWidth2, arrowStrokeColor2 = _340.arrowStrokeColor2, arrowFillColor2 = _340.arrowFillColor2, showArrowBase2 = _340.showArrowBase2, arrowLength3 = _340.arrowLength3, arrowWidth3 = _340.arrowWidth3, arrowStrokeWidth3 = _340.arrowStrokeWidth3, arrowStrokeColor3 = _340.arrowStrokeColor3, arrowFillColor3 = _340.arrowFillColor3, showArrowBase3 = _340.showArrowBase3, arrowLength4 = _340.arrowLength4, arrowWidth4 = _340.arrowWidth4, arrowStrokeWidth4 = _340.arrowStrokeWidth4, arrowStrokeColor4 = _340.arrowStrokeColor4, arrowFillColor4 = _340.arrowFillColor4, showArrowBase4 = _340.showArrowBase4, arrowLength5 = _340.arrowLength5, arrowWidth5 = _340.arrowWidth5, arrowStrokeWidth5 = _340.arrowStrokeWidth5, arrowStrokeColor5 = _340.arrowStrokeColor5, arrowFillColor5 = _340.arrowFillColor5, showArrowBase5 = _340.showArrowBase5, arrowLengthsFromSet = _340.arrowLengthsFromSet, arrowWidthsFromSet = _340.arrowWidthsFromSet, arrowStrokeWidthsFromSet = _340.arrowStrokeWidthsFromSet, arrowStrokeColorsFromSet = _340.arrowStrokeColorsFromSet, arrowFillColorsFromSet = _340.arrowFillColorsFromSet, showArrowBasesFromSet = _340.showArrowBasesFromSet;
    var secondaryLineConfig = {
        zIndex: (_184 = (_183 = props.secondaryLineConfig) === null || _183 === void 0 ? void 0 : _183.zIndex) !== null && _184 !== void 0 ? _184 : zIndex1,
        curved: (_186 = (_185 = props.secondaryLineConfig) === null || _185 === void 0 ? void 0 : _185.curved) !== null && _186 !== void 0 ? _186 : props.curved,
        curvature: (_188 = (_187 = props.secondaryLineConfig) === null || _187 === void 0 ? void 0 : _187.curvature) !== null && _188 !== void 0 ? _188 : curvature,
        curveType: (_190 = (_189 = props.secondaryLineConfig) === null || _189 === void 0 ? void 0 : _189.curveType) !== null && _190 !== void 0 ? _190 : curveType,
        areaChart: (_192 = (_191 = props.secondaryLineConfig) === null || _191 === void 0 ? void 0 : _191.areaChart) !== null && _192 !== void 0 ? _192 : areaChart,
        color: (_194 = (_193 = props.secondaryLineConfig) === null || _193 === void 0 ? void 0 : _193.color) !== null && _194 !== void 0 ? _194 : color1,
        thickness: (_196 = (_195 = props.secondaryLineConfig) === null || _195 === void 0 ? void 0 : _195.thickness) !== null && _196 !== void 0 ? _196 : thickness1,
        zIndex1: (_198 = (_197 = props.secondaryLineConfig) === null || _197 === void 0 ? void 0 : _197.zIndex1) !== null && _198 !== void 0 ? _198 : zIndex1,
        strokeDashArray: (_200 = (_199 = props.secondaryLineConfig) === null || _199 === void 0 ? void 0 : _199.strokeDashArray) !== null && _200 !== void 0 ? _200 : strokeDashArray1,
        startIndex: (_202 = (_201 = props.secondaryLineConfig) === null || _201 === void 0 ? void 0 : _201.startIndex) !== null && _202 !== void 0 ? _202 : startIndex1,
        endIndex: (_204 = (_203 = props.secondaryLineConfig) === null || _203 === void 0 ? void 0 : _203.endIndex) !== null && _204 !== void 0 ? _204 : endIndex1,
        hideDataPoints: (_206 = (_205 = props.secondaryLineConfig) === null || _205 === void 0 ? void 0 : _205.hideDataPoints) !== null && _206 !== void 0 ? _206 : hideDataPoints1,
        dataPointsHeight: (_208 = (_207 = props.secondaryLineConfig) === null || _207 === void 0 ? void 0 : _207.dataPointsHeight) !== null && _208 !== void 0 ? _208 : dataPointsHeight1,
        dataPointsWidth: (_210 = (_209 = props.secondaryLineConfig) === null || _209 === void 0 ? void 0 : _209.dataPointsWidth) !== null && _210 !== void 0 ? _210 : dataPointsWidth1,
        dataPointsRadius: (_212 = (_211 = props.secondaryLineConfig) === null || _211 === void 0 ? void 0 : _211.dataPointsRadius) !== null && _212 !== void 0 ? _212 : dataPointsRadius1,
        dataPointsColor: (_214 = (_213 = props.secondaryLineConfig) === null || _213 === void 0 ? void 0 : _213.dataPointsColor) !== null && _214 !== void 0 ? _214 : dataPointsColor1,
        dataPointsShape: (_216 = (_215 = props.secondaryLineConfig) === null || _215 === void 0 ? void 0 : _215.dataPointsShape) !== null && _216 !== void 0 ? _216 : dataPointsShape1,
        showValuesAsDataPointsText: (_218 = (_217 = props.secondaryLineConfig) === null || _217 === void 0 ? void 0 : _217.showValuesAsDataPointsText) !== null && _218 !== void 0 ? _218 : showValuesAsDataPointsText,
        startFillColor: (_220 = (_219 = props.secondaryLineConfig) === null || _219 === void 0 ? void 0 : _219.startFillColor) !== null && _220 !== void 0 ? _220 : startFillColor1,
        endFillColor: (_222 = (_221 = props.secondaryLineConfig) === null || _221 === void 0 ? void 0 : _221.endFillColor) !== null && _222 !== void 0 ? _222 : endFillColor1,
        startOpacity: (_224 = (_223 = props.secondaryLineConfig) === null || _223 === void 0 ? void 0 : _223.startOpacity) !== null && _224 !== void 0 ? _224 : startOpacity1,
        endOpacity: (_226 = (_225 = props.secondaryLineConfig) === null || _225 === void 0 ? void 0 : _225.endOpacity) !== null && _226 !== void 0 ? _226 : endOpacity1,
        textFontSize: (_228 = (_227 = props.secondaryLineConfig) === null || _227 === void 0 ? void 0 : _227.textFontSize) !== null && _228 !== void 0 ? _228 : textFontSize1,
        textColor: (_230 = (_229 = props.secondaryLineConfig) === null || _229 === void 0 ? void 0 : _229.textColor) !== null && _230 !== void 0 ? _230 : textColor1,
        showArrow: (_232 = (_231 = props.secondaryLineConfig) === null || _231 === void 0 ? void 0 : _231.showArrow) !== null && _232 !== void 0 ? _232 : props.showArrows,
        arrowConfig: (_234 = (_233 = props.secondaryLineConfig) === null || _233 === void 0 ? void 0 : _233.arrowConfig) !== null && _234 !== void 0 ? _234 : props.arrowConfig
    };
    var yAxisExtraHeightAtTop = props.trimYAxisAtTop
        ? 0
        : (_235 = props.yAxisExtraHeight) !== null && _235 !== void 0 ? _235 : containerHeight / 20;
    var addLeadingAndTrailingPathForAreaFill = function (initialPath, value, dataLength) {
        return ('M ' +
            initialSpacing +
            ',' +
            heightUptoXaxis +
            ' ' +
            'L ' +
            initialSpacing +
            ',' +
            getY(value) +
            ' ' +
            initialPath +
            ' ' +
            'L ' +
            (initialSpacing + spacing * (dataLength - 1)) +
            ',' +
            heightUptoXaxis +
            ' ' +
            'L ' +
            initialSpacing +
            ',' +
            heightUptoXaxis +
            ' ');
    };
    var getNextPoint = function (data, index, around, before) {
        var isLast = index === data.length - 1;
        return isLast && !(around || before)
            ? ' '
            : ' L' +
                (getX(index) +
                    (around ? (isLast ? 0 : spacing / 2) : before ? 0 : spacing)) +
                ' ' +
                getY(data[index].value) +
                ' ';
    };
    var getStepPath = function (data, i) {
        var around = edgePosition === EdgePosition.AROUND_DATA_POINT;
        var before = edgePosition === EdgePosition.BEFORE_DATA_POINT;
        return ('L' +
            (getX(i) -
                (around && i > 0 ? spacing / 2 : before && i > 0 ? spacing : 0)) +
            ' ' +
            getY(data[i].value) +
            getNextPoint(data, i, around, before));
    };
    var getSegmentPath = function (data, i, lineSegment, startIndex, endIndex, isSecondary) {
        var path = 'L' +
            getX(i) +
            ' ' +
            (isSecondary ? getSecondaryY(data[i].value) : getY(data[i].value)) +
            ' ' +
            getSegmentString(lineSegment, i, SEGMENT_START, SEGMENT_END);
        if (highlightedRange) {
            path += getPathWithHighlight(data, i, highlightedRange, startIndex, endIndex, getX, getY);
        }
        return path;
    };
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (dataSet) {
            var pointsArray_1 = [];
            var arrowPointsArray_1 = [];
            var fillPointsArray_1 = [];
            dataSet.map(function (set, index) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                if ((_a = set.curved) !== null && _a !== void 0 ? _a : props.curved) {
                    var pArray = [];
                    for (var i = 0; i < set.data.length; i++) {
                        if (i >= ((_b = set.startIndex) !== null && _b !== void 0 ? _b : 0) &&
                            i <= ((_c = set.endIndex) !== null && _c !== void 0 ? _c : set.data.length - 1)) {
                            pArray.push([
                                getX(i),
                                set.isSecondary
                                    ? getSecondaryY(set.data[i].value)
                                    : getY(set.data[i].value)
                            ]);
                        }
                    }
                    var xx = svgPath(pArray, (_d = set.curveType) !== null && _d !== void 0 ? _d : curveType, (_e = set.curvature) !== null && _e !== void 0 ? _e : curvature);
                    pointsArray_1.push(getCurvePathWithSegments(xx, set.lineSegments, SEGMENT_START, SEGMENT_END));
                    // For Arrow-
                    if (set.data.length > 1 && ((_f = set.showArrow) !== null && _f !== void 0 ? _f : props.showArrows)) {
                        var arrowTipY = pArray[pArray.length - 1][1];
                        var arrowTipX = pArray[pArray.length - 1][0];
                        var y1 = pArray[pArray.length - 2][1];
                        var x1 = pArray[pArray.length - 2][0];
                        var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLengthsFromSet === null || arrowLengthsFromSet === void 0 ? void 0 : arrowLengthsFromSet[index], arrowWidthsFromSet === null || arrowWidthsFromSet === void 0 ? void 0 : arrowWidthsFromSet[index], showArrowBasesFromSet === null || showArrowBasesFromSet === void 0 ? void 0 : showArrowBasesFromSet[index]);
                        arrowPointsArray_1.push(arrowPoints);
                    }
                    // For Area charts-
                    if (((_g = set.areaChart) !== null && _g !== void 0 ? _g : areaChart) && set.data.length > 0) {
                        xx = addLeadingAndTrailingPathForAreaFill(xx, set.data[0].value, set.data.length);
                        fillPointsArray_1.push(xx);
                    }
                }
                else {
                    var pp = '';
                    for (var i = 0; i < set.data.length; i++) {
                        if (i >= ((_h = set.startIndex) !== null && _h !== void 0 ? _h : 0) &&
                            i <= ((_j = set.endIndex) !== null && _j !== void 0 ? _j : set.data.length - 1)) {
                            if ((_k = set.stepChart) !== null && _k !== void 0 ? _k : stepChart) {
                                pp += getStepPath(set.data, i);
                            }
                            else {
                                pp += getSegmentPath(set.data, i, set.lineSegments, (_l = set.startIndex) !== null && _l !== void 0 ? _l : 0, (_m = set.endIndex) !== null && _m !== void 0 ? _m : set.data.length - 1, set.isSecondary);
                            }
                        }
                    }
                    pointsArray_1.push(pp.replace('L', 'M'));
                    // For Arrow-
                    if (set.data.length > 1 && ((_o = set.showArrow) !== null && _o !== void 0 ? _o : props.showArrows)) {
                        var ppArray = pp.trim().split(' ');
                        var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                        var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                        var y1 = parseInt(ppArray[ppArray.length - 3]);
                        var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                        var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLengthsFromSet === null || arrowLengthsFromSet === void 0 ? void 0 : arrowLengthsFromSet[index], arrowWidthsFromSet === null || arrowWidthsFromSet === void 0 ? void 0 : arrowWidthsFromSet[index], showArrowBasesFromSet === null || showArrowBasesFromSet === void 0 ? void 0 : showArrowBasesFromSet[index]);
                        arrowPointsArray_1.push(arrowPoints);
                    }
                    // For Area charts-
                    if (((_p = set.areaChart) !== null && _p !== void 0 ? _p : areaChart) && set.data.length > 0) {
                        var ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp += pp;
                        ppp +=
                            'L' +
                                (initialSpacing + spacing * (set.data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        fillPointsArray_1.push(ppp.replace('L', 'M'));
                    }
                }
                return null;
            });
            setPointsFromSet(pointsArray_1);
            setArrowPointsFromSet(arrowPointsArray_1);
            setFillPointsFromSet(fillPointsArray_1);
        }
        else {
            var pp = '';
            var pp2 = '';
            var pp3 = '';
            var pp4 = '';
            var pp5 = '';
            if (!props.curved) {
                for (var i = 0; i < data.length; i++) {
                    if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
                        if (stepChart !== null && stepChart !== void 0 ? stepChart : stepChart1) {
                            pp += getStepPath(data, i);
                        }
                        else {
                            pp += getSegmentPath(data, i, lineSegments, startIndex1, endIndex1);
                        }
                    }
                    if (data2.length > 0 && i >= startIndex2 && i <= endIndex2) {
                        if (stepChart !== null && stepChart !== void 0 ? stepChart : stepChart2) {
                            pp2 += getStepPath(data2, i);
                        }
                        else {
                            pp2 += getSegmentPath(data2, i, lineSegments2, startIndex2, endIndex2);
                        }
                    }
                    if (data3.length > 0 && i >= startIndex3 && i <= endIndex3) {
                        if (stepChart !== null && stepChart !== void 0 ? stepChart : stepChart3) {
                            pp3 += getStepPath(data3, i);
                        }
                        else {
                            pp3 += getSegmentPath(data3, i, lineSegments3, startIndex3, endIndex3);
                        }
                    }
                    if (data4.length > 0 && i >= startIndex4 && i <= endIndex4) {
                        if (stepChart !== null && stepChart !== void 0 ? stepChart : stepChart4) {
                            pp4 += getStepPath(data4, i);
                        }
                        else {
                            pp4 += getSegmentPath(data4, i, lineSegments4, startIndex4, endIndex4);
                        }
                    }
                    if (data5.length > 0 && i >= startIndex5 && i <= endIndex5) {
                        if (stepChart !== null && stepChart !== void 0 ? stepChart : stepChart5) {
                            pp5 += getStepPath(data5, i);
                        }
                        else {
                            pp5 += getSegmentPath(data5, i, lineSegments5, startIndex5, endIndex5);
                        }
                    }
                }
                setPoints2(pp2.replace('L', 'M'));
                setPoints3(pp3.replace('L', 'M'));
                setPoints4(pp4.replace('L', 'M'));
                setPoints5(pp5.replace('L', 'M'));
                setPoints(pp.replace('L', 'M'));
                if (data.length > 1 && ((_a = props.showArrow1) !== null && _a !== void 0 ? _a : props.showArrows)) {
                    var ppArray = pp.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                    setArrow1Points(arrowPoints);
                }
                if (data2.length > 1 && ((_b = props.showArrow2) !== null && _b !== void 0 ? _b : props.showArrows)) {
                    var ppArray = pp2.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength2, arrowWidth2, showArrowBase2);
                    setArrow2Points(arrowPoints);
                }
                if (data3.length > 1 && ((_c = props.showArrow3) !== null && _c !== void 0 ? _c : props.showArrows)) {
                    var ppArray = pp3.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength3, arrowWidth3, showArrowBase3);
                    setArrow3Points(arrowPoints);
                }
                if (data4.length > 1 && ((_d = props.showArrow4) !== null && _d !== void 0 ? _d : props.showArrows)) {
                    var ppArray = pp4.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength4, arrowWidth4, showArrowBase4);
                    setArrow4Points(arrowPoints);
                }
                if (data5.length > 1 && ((_e = props.showArrow5) !== null && _e !== void 0 ? _e : props.showArrows)) {
                    var ppArray = pp5.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength5, arrowWidth5, showArrowBase5);
                    setArrow5Points(arrowPoints);
                }
                /** *************************          For Area Charts          *************************/
                if (atLeastOneAreaChart) {
                    var ppp = '';
                    var ppp2 = '';
                    var ppp3 = '';
                    var ppp4 = '';
                    var ppp5 = '';
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart1) &&
                        data.length > 0 &&
                        !animateOnDataChange) {
                        ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp += pp;
                        ppp +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        setFillPoints(ppp.replace('L', 'M'));
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart2) && data2.length > 0) {
                        ppp2 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp2 += pp2;
                        ppp2 +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp2 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        setFillPoints2(ppp2.replace('L', 'M'));
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart3) && data3.length > 0) {
                        ppp3 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp3 += pp3;
                        ppp3 +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp3 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        setFillPoints3(ppp3.replace('L', 'M'));
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart4) && data4.length > 0) {
                        ppp4 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp4 += pp4;
                        ppp4 +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp4 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        setFillPoints4(ppp4.replace('L', 'M'));
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart5) && data5.length > 0) {
                        ppp5 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        ppp5 += pp5;
                        ppp5 +=
                            'L' +
                                (initialSpacing + spacing * (data.length - 1)) +
                                ' ' +
                                heightUptoXaxis;
                        ppp5 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                        setFillPoints5(ppp5.replace('L', 'M'));
                    }
                }
                /*************************************************************************************/
            }
            else {
                var p1Array = [];
                var p2Array = [];
                var p3Array = [];
                var p4Array = [];
                var p5Array = [];
                for (var i = 0; i < data.length; i++) {
                    if (i >= startIndex1 && i <= endIndex1) {
                        p1Array.push([getX(i), getY(data[i].value)]);
                    }
                    if (data2.length > 0 && i >= startIndex2 && i <= endIndex2) {
                        p2Array.push([getX(i), getY(data2[i].value)]);
                    }
                    if (data3.length > 0 && i >= startIndex3 && i <= endIndex3) {
                        p3Array.push([getX(i), getY(data3[i].value)]);
                    }
                    if (data4.length > 0 && i >= startIndex4 && i <= endIndex4) {
                        p4Array.push([getX(i), getY(data4[i].value)]);
                    }
                    if (data5.length > 0 && i >= startIndex5 && i <= endIndex5) {
                        p5Array.push([getX(i), getY(data5[i].value)]);
                    }
                }
                var xx = svgPath(p1Array, curveType, curvature);
                var xx2 = svgPath(p2Array, curveType, curvature);
                var xx3 = svgPath(p3Array, curveType, curvature);
                var xx4 = svgPath(p4Array, curveType, curvature);
                var xx5 = svgPath(p5Array, curveType, curvature);
                setPoints(getCurvePathWithSegments(xx, lineSegments, SEGMENT_START, SEGMENT_END));
                setPoints2(getCurvePathWithSegments(xx2, lineSegments2, SEGMENT_START, SEGMENT_END));
                setPoints3(getCurvePathWithSegments(xx3, lineSegments3, SEGMENT_START, SEGMENT_END));
                setPoints4(getCurvePathWithSegments(xx4, lineSegments4, SEGMENT_START, SEGMENT_END));
                setPoints5(getCurvePathWithSegments(xx5, lineSegments5, SEGMENT_START, SEGMENT_END));
                if (data.length > 1 && ((_f = props.showArrow1) !== null && _f !== void 0 ? _f : props.showArrows)) {
                    var arrowTipY = p1Array[p1Array.length - 1][1];
                    var arrowTipX = p1Array[p1Array.length - 1][0];
                    var y1 = p1Array[p1Array.length - 2][1];
                    var x1 = p1Array[p1Array.length - 2][0];
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                    setArrow1Points(arrowPoints);
                }
                if (data2.length > 1 && ((_g = props.showArrow2) !== null && _g !== void 0 ? _g : props.showArrows)) {
                    var arrowTipY = p2Array[p2Array.length - 1][1];
                    var arrowTipX = p2Array[p2Array.length - 1][0];
                    var y1 = p2Array[p2Array.length - 2][1];
                    var x1 = p2Array[p2Array.length - 2][0];
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength2, arrowWidth2, showArrowBase2);
                    setArrow2Points(arrowPoints);
                }
                if (data3.length > 1 && ((_h = props.showArrow3) !== null && _h !== void 0 ? _h : props.showArrows)) {
                    var arrowTipY = p3Array[p3Array.length - 1][1];
                    var arrowTipX = p3Array[p3Array.length - 1][0];
                    var y1 = p3Array[p3Array.length - 2][1];
                    var x1 = p3Array[p3Array.length - 2][0];
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength3, arrowWidth3, showArrowBase3);
                    setArrow2Points(arrowPoints);
                }
                if (data4.length > 1 && ((_j = props.showArrow4) !== null && _j !== void 0 ? _j : props.showArrows)) {
                    var arrowTipY = p4Array[p4Array.length - 1][1];
                    var arrowTipX = p4Array[p4Array.length - 1][0];
                    var y1 = p4Array[p4Array.length - 2][1];
                    var x1 = p4Array[p4Array.length - 2][0];
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength4, arrowWidth4, showArrowBase4);
                    setArrow2Points(arrowPoints);
                }
                if (data5.length > 1 && ((_k = props.showArrow5) !== null && _k !== void 0 ? _k : props.showArrows)) {
                    var arrowTipY = p5Array[p5Array.length - 1][1];
                    var arrowTipX = p5Array[p5Array.length - 1][0];
                    var y1 = p5Array[p5Array.length - 2][1];
                    var x1 = p5Array[p5Array.length - 2][0];
                    var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength5, arrowWidth5, showArrowBase5);
                    setArrow2Points(arrowPoints);
                }
                /** *************************          For Area Charts          *************************/
                if (atLeastOneAreaChart) {
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart1) && data.length > 0) {
                        xx = addLeadingAndTrailingPathForAreaFill(xx, data[0].value, data.length);
                        setFillPoints(xx);
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart2) && data2.length > 0) {
                        xx2 = addLeadingAndTrailingPathForAreaFill(xx2, data2[0].value, data2.length);
                        setFillPoints2(xx2);
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart3) && data3.length > 0) {
                        xx3 = addLeadingAndTrailingPathForAreaFill(xx3, data3[0].value, data3.length);
                        setFillPoints3(xx3);
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart4) && data4.length > 0) {
                        xx4 = addLeadingAndTrailingPathForAreaFill(xx4, data4[0].value, data4.length);
                        setFillPoints4(xx4);
                    }
                    if ((areaChart !== null && areaChart !== void 0 ? areaChart : areaChart5) && data5.length > 0) {
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
        showArrowBase5
    ]);
    useEffect(function () {
        var _a, _b, _c, _d;
        var pp = '';
        if (!secondaryLineConfig.curved) {
            for (var i = 0; i < secondaryData.length; i++) {
                if (i >= secondaryLineConfig.startIndex &&
                    i <= secondaryLineConfig.endIndex &&
                    !animateOnDataChange) {
                    pp +=
                        'L' + getX(i) + ' ' + getSecondaryY(secondaryData[i].value) + ' ';
                }
            }
            setSecondaryPoints(pp.replace('L', 'M'));
            if (secondaryData.length > 1 && secondaryLineConfig.showArrow) {
                var ppArray = pp.trim().split(' ');
                var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                var y1 = parseInt(ppArray[ppArray.length - 3]);
                var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, (_a = secondaryLineConfig.arrowConfig) === null || _a === void 0 ? void 0 : _a.length, (_b = secondaryLineConfig.arrowConfig) === null || _b === void 0 ? void 0 : _b.width, (_c = secondaryLineConfig.arrowConfig) === null || _c === void 0 ? void 0 : _c.showArrowBase);
                setSecondaryArrowPoints(arrowPoints);
            }
            /** *************************          For Area Chart          *************************/
            if (secondaryLineConfig.areaChart) {
                var ppp = '';
                if (secondaryData.length > 0 && !animateOnDataChange) {
                    ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                    ppp += pp;
                    ppp +=
                        'L' +
                            (initialSpacing + spacing * (secondaryData.length - 1)) +
                            ' ' +
                            heightUptoXaxis;
                    ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
                    setSecondaryFillPoints(ppp.replace('L', 'M'));
                }
            }
        }
        else {
            /** *************************          For Curved Charts         *************************/
            var p1Array = [];
            for (var i = 0; i < secondaryData.length; i++) {
                if (i >= secondaryLineConfig.startIndex &&
                    i <= secondaryLineConfig.endIndex) {
                    p1Array.push([getX(i), getSecondaryY(secondaryData[i].value)]);
                }
            }
            var xx = svgPath(p1Array, secondaryLineConfig.curveType, secondaryLineConfig.curvature);
            setSecondaryPoints(xx);
            if (secondaryData.length > 1 && ((_d = props.showArrow1) !== null && _d !== void 0 ? _d : props.showArrows)) {
                var arrowTipY = p1Array[p1Array.length - 1][1];
                var arrowTipX = p1Array[p1Array.length - 1][0];
                var y1 = p1Array[p1Array.length - 2][1];
                var x1 = p1Array[p1Array.length - 2][0];
                var arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, arrowLength1, arrowWidth1, showArrowBase1);
                setSecondaryArrowPoints(arrowPoints);
            }
            /** *************************          For Curved Area Charts          *************************/
            if (secondaryLineConfig.areaChart) {
                if (secondaryData.length > 0) {
                    xx = addLeadingAndTrailingPathForAreaFill(xx, secondaryData[0].value, secondaryData.length);
                    setSecondaryFillPoints(xx);
                }
            }
        }
    }, [secondaryData, secondaryLineConfig]);
    var gradientDirection = (_236 = props.gradientDirection) !== null && _236 !== void 0 ? _236 : 'vertical';
    var horizSections = [{ value: '0' }];
    var stepHeight = (_237 = props.stepHeight) !== null && _237 !== void 0 ? _237 : containerHeight / noOfSections;
    var stepValue = (_238 = props.stepValue) !== null && _238 !== void 0 ? _238 : maxValue / noOfSections;
    var noOfSectionsBelowXAxis = (_239 = props.noOfSectionsBelowXAxis) !== null && _239 !== void 0 ? _239 : Math.round(Math.ceil(-mostNegativeValue / stepValue));
    var showXAxisIndices = (_240 = props.showXAxisIndices) !== null && _240 !== void 0 ? _240 : AxesAndRulesDefaults.showXAxisIndices;
    var xAxisIndicesHeight = (_241 = props.xAxisIndicesHeight) !== null && _241 !== void 0 ? _241 : AxesAndRulesDefaults.xAxisIndicesHeight;
    var xAxisIndicesWidth = (_242 = props.xAxisIndicesWidth) !== null && _242 !== void 0 ? _242 : AxesAndRulesDefaults.xAxisIndicesWidth;
    var xAxisIndicesColor = (_243 = props.xAxisIndicesColor) !== null && _243 !== void 0 ? _243 : AxesAndRulesDefaults.xAxisIndicesColor;
    var xAxisTextNumberOfLines = (_244 = props.xAxisTextNumberOfLines) !== null && _244 !== void 0 ? _244 : AxesAndRulesDefaults.xAxisTextNumberOfLines;
    var xAxisLabelsVerticalShift = (_245 = props.xAxisLabelsVerticalShift) !== null && _245 !== void 0 ? _245 : AxesAndRulesDefaults.xAxisLabelsVerticalShift;
    var horizontalRulesStyle = props.horizontalRulesStyle;
    var showFractionalValues = (_246 = props.showFractionalValues) !== null && _246 !== void 0 ? _246 : AxesAndRulesDefaults.showFractionalValues;
    var horizontal = false;
    var yAxisAtTop = false;
    defaultPointerConfig.pointerStripHeight = containerHeight;
    var pointerConfig = props.pointerConfig;
    var getPointerProps = (_247 = props.getPointerProps) !== null && _247 !== void 0 ? _247 : null;
    var pointerHeight = (_248 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.height) !== null && _248 !== void 0 ? _248 : defaultPointerConfig.height;
    var pointerWidth = (_249 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.width) !== null && _249 !== void 0 ? _249 : defaultPointerConfig.width;
    var pointerRadius = (_250 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.radius) !== null && _250 !== void 0 ? _250 : defaultPointerConfig.radius;
    var pointerColor = (_251 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerColor) !== null && _251 !== void 0 ? _251 : defaultPointerConfig.pointerColor;
    var pointerComponent = (_252 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerComponent) !== null && _252 !== void 0 ? _252 : defaultPointerConfig.pointerComponent;
    var showPointerStrip = (pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.showPointerStrip) === false
        ? false
        : defaultPointerConfig.showPointerStrip;
    var pointerStripHeight = (_253 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripHeight) !== null && _253 !== void 0 ? _253 : defaultPointerConfig.pointerStripHeight;
    var pointerStripWidth = (_254 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripWidth) !== null && _254 !== void 0 ? _254 : defaultPointerConfig.pointerStripWidth;
    var pointerStripColor = (_255 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripColor) !== null && _255 !== void 0 ? _255 : defaultPointerConfig.pointerStripColor;
    var pointerStripUptoDataPoint = (_256 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerStripUptoDataPoint) !== null && _256 !== void 0 ? _256 : defaultPointerConfig.pointerStripUptoDataPoint;
    var pointerLabelComponent = (_257 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelComponent) !== null && _257 !== void 0 ? _257 : defaultPointerConfig.pointerLabelComponent;
    var stripOverPointer = (_258 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.stripOverPointer) !== null && _258 !== void 0 ? _258 : defaultPointerConfig.stripOverPointer;
    var shiftPointerLabelX = (_259 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelX) !== null && _259 !== void 0 ? _259 : defaultPointerConfig.shiftPointerLabelX;
    var shiftPointerLabelY = (_260 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.shiftPointerLabelY) !== null && _260 !== void 0 ? _260 : defaultPointerConfig.shiftPointerLabelY;
    var pointerLabelWidth = (_261 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelWidth) !== null && _261 !== void 0 ? _261 : defaultPointerConfig.pointerLabelWidth;
    var pointerLabelHeight = (_262 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerLabelHeight) !== null && _262 !== void 0 ? _262 : defaultPointerConfig.pointerLabelHeight;
    var autoAdjustPointerLabelPosition = (_263 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.autoAdjustPointerLabelPosition) !== null && _263 !== void 0 ? _263 : defaultPointerConfig.autoAdjustPointerLabelPosition;
    var pointerVanishDelay = (_264 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerVanishDelay) !== null && _264 !== void 0 ? _264 : defaultPointerConfig.pointerVanishDelay;
    var activatePointersOnLongPress = (_265 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersOnLongPress) !== null && _265 !== void 0 ? _265 : defaultPointerConfig.activatePointersOnLongPress;
    var activatePointersDelay = (_266 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.activatePointersDelay) !== null && _266 !== void 0 ? _266 : defaultPointerConfig.activatePointersDelay;
    var initialPointerIndex = (_267 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerIndex) !== null && _267 !== void 0 ? _267 : defaultPointerConfig.initialPointerIndex;
    var initialPointerAppearDelay = (_268 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.initialPointerAppearDelay) !== null && _268 !== void 0 ? _268 : (isAnimated
        ? animationDuration
        : defaultPointerConfig.initialPointerAppearDelay);
    var persistPointer = (_269 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.persistPointer) !== null && _269 !== void 0 ? _269 : defaultPointerConfig.persistPointer;
    var hidePointer1 = (_270 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer1) !== null && _270 !== void 0 ? _270 : defaultPointerConfig.hidePointer1;
    var hidePointer2 = (_271 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer2) !== null && _271 !== void 0 ? _271 : defaultPointerConfig.hidePointer2;
    var hidePointer3 = (_272 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer3) !== null && _272 !== void 0 ? _272 : defaultPointerConfig.hidePointer3;
    var hidePointer4 = (_273 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer4) !== null && _273 !== void 0 ? _273 : defaultPointerConfig.hidePointer4;
    var hidePointer5 = (_274 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hidePointer5) !== null && _274 !== void 0 ? _274 : defaultPointerConfig.hidePointer5;
    var hideSecondaryPointer = (_275 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.hideSecondaryPointer) !== null && _275 !== void 0 ? _275 : defaultPointerConfig.hideSecondaryPointer;
    var resetPointerOnDataChange = (_276 = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.resetPointerOnDataChange) !== null && _276 !== void 0 ? _276 : defaultPointerConfig.resetPointerOnDataChange;
    var pointerEvents = pointerConfig === null || pointerConfig === void 0 ? void 0 : pointerConfig.pointerEvents;
    var disableScroll = (_277 = props.disableScroll) !== null && _277 !== void 0 ? _277 : (pointerConfig
        ? activatePointersOnLongPress
            ? !!responderActive
            : true
        : false);
    var showScrollIndicator = (_278 = props.showScrollIndicator) !== null && _278 !== void 0 ? _278 : LineDefaults.showScrollIndicator;
    var focusEnabled = (_279 = props.focusEnabled) !== null && _279 !== void 0 ? _279 : LineDefaults.focusEnabled;
    var showDataPointOnFocus = (_280 = props.showDataPointOnFocus) !== null && _280 !== void 0 ? _280 : LineDefaults.showDataPointOnFocus;
    var showStripOnFocus = (_281 = props.showStripOnFocus) !== null && _281 !== void 0 ? _281 : LineDefaults.showStripOnFocus;
    var showTextOnFocus = (_282 = props.showTextOnFocus) !== null && _282 !== void 0 ? _282 : LineDefaults.showTextOnFocus;
    var showDataPointLabelOnFocus = (_283 = props.showDataPointLabelOnFocus) !== null && _283 !== void 0 ? _283 : LineDefaults.showDataPointLabelOnFocus;
    var stripHeight = props.stripHeight;
    var stripWidth = (_284 = props.stripWidth) !== null && _284 !== void 0 ? _284 : LineDefaults.stripWidth;
    var stripColor = (_285 = props.stripColor) !== null && _285 !== void 0 ? _285 : color1;
    var stripOpacity = (_286 = props.stripOpacity) !== null && _286 !== void 0 ? _286 : (startOpacity1 + endOpacity1) / 2;
    var unFocusOnPressOut = (_287 = props.unFocusOnPressOut) !== null && _287 !== void 0 ? _287 : LineDefaults.unFocusOnPressOut;
    var delayBeforeUnFocus = (_288 = props.delayBeforeUnFocus) !== null && _288 !== void 0 ? _288 : LineDefaults.delayBeforeUnFocus;
    var containerHeightIncludingBelowXAxis = extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
    var lineGradient = (_289 = props.lineGradient) !== null && _289 !== void 0 ? _289 : LineDefaults.lineGradient;
    var lineGradientDirection = (_290 = props.lineGradientDirection) !== null && _290 !== void 0 ? _290 : 'vertical';
    var lineGradientStartColor = (_291 = props.lineGradientStartColor) !== null && _291 !== void 0 ? _291 : LineDefaults.lineGradientStartColor;
    var lineGradientEndColor = (_292 = props.lineGradientEndColor) !== null && _292 !== void 0 ? _292 : LineDefaults.lineGradientEndColor;
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
            var x_1 = initialSpacing +
                spacing * initialPointerIndex -
                (pointerRadius || pointerWidth / 2) -
                1;
            if (dataSet === null || dataSet === void 0 ? void 0 : dataSet.length) {
                var item_1 = dataSet[0].data[initialPointerIndex];
                if (initialPointerAppearDelay) {
                    setTimeout(function () {
                        setPointerConfigForDataSet(initialPointerIndex, item_1, x_1);
                    }, initialPointerAppearDelay);
                }
                else {
                    setPointerConfigForDataSet(initialPointerIndex, item_1, x_1);
                }
            }
            else {
                var item_2 = (data0 !== null && data0 !== void 0 ? data0 : data)[initialPointerIndex];
                var y_1 = getPointerY(item_2.value);
                var y2_1 = getPointerY((_a = data2 === null || data2 === void 0 ? void 0 : data2[initialPointerIndex]) === null || _a === void 0 ? void 0 : _a.value);
                var y3_1 = getPointerY((_b = data3 === null || data3 === void 0 ? void 0 : data3[initialPointerIndex]) === null || _b === void 0 ? void 0 : _b.value);
                var y4_1 = getPointerY((_c = data4 === null || data4 === void 0 ? void 0 : data4[initialPointerIndex]) === null || _c === void 0 ? void 0 : _c.value);
                var y5_1 = getPointerY((_d = data5 === null || data5 === void 0 ? void 0 : data5[initialPointerIndex]) === null || _d === void 0 ? void 0 : _d.value);
                if (initialPointerAppearDelay) {
                    setTimeout(function () {
                        setPointerConfig(initialPointerIndex, item_2, x_1, y_1, y2_1, y3_1, y4_1, y5_1);
                    }, initialPointerAppearDelay);
                }
                else {
                    setPointerConfig(initialPointerIndex, item_2, x_1, y_1, y2_1, y3_1, y4_1, y5_1);
                }
            }
        }
    };
    useEffect(function () {
        initialisePointers();
    }, []);
    useEffect(function () {
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
    var setPointerConfigForDataSet = function (initialPointerIndex, item, x) {
        var _a;
        setPointerIndex(initialPointerIndex);
        setPointerItem(item);
        setPointerX(x);
        var initialPointerYs = (_a = dataSet === null || dataSet === void 0 ? void 0 : dataSet.map(function (set) { return getPointerY(set.data[initialPointerIndex].value); })) !== null && _a !== void 0 ? _a : [];
        setPointerYsForDataSet(initialPointerYs);
    };
    var dataPointsRadius = (_294 = (_293 = props.dataPointsRadius1) !== null && _293 !== void 0 ? _293 : props.dataPointsRadius) !== null && _294 !== void 0 ? _294 : LineDefaults.dataPointsRadius;
    var dataPointsWidth = (_296 = (_295 = props.dataPointsWidth1) !== null && _295 !== void 0 ? _295 : props.dataPointsWidth) !== null && _296 !== void 0 ? _296 : LineDefaults.dataPointsWidth;
    var extraWidthDueToDataPoint = props.hideDataPoints
        ? 0
        : dataPointsRadius !== null && dataPointsRadius !== void 0 ? dataPointsRadius : dataPointsWidth;
    var barAndLineChartsWrapperProps = {
        chartType: chartTypes.LINE,
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
        points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
        // horizSectionProps-
        width: props.width,
        horizSections: horizSections,
        endSpacing: endSpacing,
        horizontalRulesStyle: horizontalRulesStyle,
        noOfSections: noOfSections,
        showFractionalValues: showFractionalValues,
        axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),
        yAxisLabelTexts: props.yAxisLabelTexts,
        yAxisOffset: yAxisOffset,
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
        endReachedOffset: (_297 = props.endReachedOffset) !== null && _297 !== void 0 ? _297 : LineDefaults.endReachedOffset,
        onMomentumScrollEnd: props.onMomentumScrollEnd,
        extraWidthDueToDataPoint: extraWidthDueToDataPoint
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
        pointerYsForDataSet: pointerYsForDataSet,
        setPointerYsForDataSet: setPointerYsForDataSet,
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
        getIsNthAreaChart: getIsNthAreaChart,
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
        showDataPointLabelOnFocus: showDataPointLabelOnFocus,
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
        barAndLineChartsWrapperProps: barAndLineChartsWrapperProps,
        yAxisExtraHeightAtTop: yAxisExtraHeightAtTop
    };
};
