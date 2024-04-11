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
import { getTextSizeForPieLabels } from '../utils';
export var getPieChartMainProps = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    var isThreeD = props.isThreeD, isBiggerPie = props.isBiggerPie, paddingHorizontal = props.paddingHorizontal, paddingVertical = props.paddingVertical, extraRadiusForFocused = props.extraRadiusForFocused;
    var propData = props.data;
    var data = [];
    var itemHasInnerComponent = false;
    if (propData) {
        for (var i = 0; i < propData.length; i++) {
            if (propData[i].pieInnerComponent)
                itemHasInnerComponent = true;
            if (propData[i].value !== 0) {
                data.push(propData[i]);
            }
            else {
                data.push(__assign(__assign({}, propData[i]), { value: props.data.map(function (item) { return item.value; }).reduce(function (v, a) { return v + a; }) /
                        160000 }));
            }
        }
    }
    var showInnerComponent = !!props.pieInnerComponent || itemHasInnerComponent;
    var radius = (_a = props.radius) !== null && _a !== void 0 ? _a : 120;
    var canvasWidth = radius * 2;
    var canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
    var shadowWidth = (_b = props.shadowWidth) !== null && _b !== void 0 ? _b : radius / 5;
    var backgroundColor = (_c = props.backgroundColor) !== null && _c !== void 0 ? _c : 'transparent';
    var shadowColor = (_d = props.shadowColor) !== null && _d !== void 0 ? _d : 'lightgray';
    var semiCircle = (_e = props.semiCircle) !== null && _e !== void 0 ? _e : false;
    var pi = Math.PI;
    var initialAngle = (_f = props.initialAngle) !== null && _f !== void 0 ? _f : (semiCircle ? pi / -2 : 0);
    var shadow = (_g = props.shadow) !== null && _g !== void 0 ? _g : false;
    var donut = (_h = props.donut) !== null && _h !== void 0 ? _h : false;
    var strokeWidth = (_j = props.strokeWidth) !== null && _j !== void 0 ? _j : 0;
    var strokeColor = (_k = props.strokeColor) !== null && _k !== void 0 ? _k : (strokeWidth ? 'gray' : 'transparent');
    var innerRadius = (_l = props.innerRadius) !== null && _l !== void 0 ? _l : radius / 2.5;
    var showText = (_m = props.showText) !== null && _m !== void 0 ? _m : false;
    var textColor = (_o = props.textColor) !== null && _o !== void 0 ? _o : '';
    var textSize = getTextSizeForPieLabels((_p = props.textSize) !== null && _p !== void 0 ? _p : 0, radius);
    var tiltAngle = (_q = props.tiltAngle) !== null && _q !== void 0 ? _q : '55deg';
    if (tiltAngle &&
        !isNaN(Number(tiltAngle)) &&
        !(tiltAngle + '').endsWith('deg')) {
        tiltAngle += 'deg';
    }
    // const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
    var labelsPosition = props.labelsPosition
        ? props.labelsPosition
        : donut || props.centerLabelComponent
            ? 'outward'
            : 'mid';
    var showTextBackground = (_r = props.showTextBackground) !== null && _r !== void 0 ? _r : false;
    var textBackgroundColor = (_s = props.textBackgroundColor) !== null && _s !== void 0 ? _s : 'white';
    var showValuesAsLabels = (_t = props.showValuesAsLabels) !== null && _t !== void 0 ? _t : false;
    var showGradient = (_u = props.showGradient) !== null && _u !== void 0 ? _u : false;
    var gradientCenterColor = (_v = props.gradientCenterColor) !== null && _v !== void 0 ? _v : 'white';
    var toggleFocusOnPress = (_w = props.toggleFocusOnPress) !== null && _w !== void 0 ? _w : true;
    var minShiftX = 0;
    var maxShiftX = 0;
    var minShiftY = 0;
    var maxShiftY = 0;
    var total = 0;
    data.forEach(function (item) {
        if (item.shiftX || item.shiftY) {
            if (minShiftX > item.shiftX) {
                minShiftX = item.shiftX;
            }
            if (minShiftY > item.shiftY) {
                minShiftY = item.shiftY;
            }
            if (maxShiftX < item.shiftX) {
                maxShiftX = item.shiftX;
            }
            if (maxShiftY < item.shiftY) {
                maxShiftY = item.shiftY;
            }
        }
    });
    var horizAdjustment = maxShiftX - minShiftX;
    var vertAdjustment = maxShiftY - minShiftY;
    if (semiCircle) {
        pi = Math.PI / 2;
    }
    var cx = radius;
    var cy = radius;
    total =
        data && data.length > 0
            ? data.map(function (item) { return item.value; }).reduce(function (v, a) { return v + a; })
            : 0;
    var acc = 0;
    var pData = data.map(function (item) {
        acc += item.value / total;
        return acc;
    });
    acc = 0;
    var mData = data.map(function (item) {
        var pAcc = acc;
        acc += item.value / total;
        return pAcc + (acc - pAcc) / 2;
    });
    pData = __spreadArray([0], __read(pData), false);
    return {
        isThreeD: isThreeD,
        isBiggerPie: isBiggerPie,
        propData: propData,
        data: data,
        itemHasInnerComponent: itemHasInnerComponent,
        showInnerComponent: showInnerComponent,
        radius: radius,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        shadowWidth: shadowWidth,
        backgroundColor: backgroundColor,
        shadowColor: shadowColor,
        semiCircle: semiCircle,
        pi: pi,
        initialAngle: initialAngle,
        shadow: shadow,
        donut: donut,
        strokeWidth: strokeWidth,
        strokeColor: strokeColor,
        innerRadius: innerRadius,
        showText: showText,
        textColor: textColor,
        textSize: textSize,
        tiltAngle: tiltAngle,
        labelsPosition: labelsPosition,
        showTextBackground: showTextBackground,
        textBackgroundColor: textBackgroundColor,
        showValuesAsLabels: showValuesAsLabels,
        showGradient: showGradient,
        gradientCenterColor: gradientCenterColor,
        toggleFocusOnPress: toggleFocusOnPress,
        minShiftX: minShiftX,
        maxShiftX: maxShiftX,
        minShiftY: minShiftY,
        maxShiftY: maxShiftY,
        total: total,
        horizAdjustment: horizAdjustment,
        vertAdjustment: vertAdjustment,
        cx: cx,
        cy: cy,
        pData: pData,
        mData: mData,
        acc: acc,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        extraRadiusForFocused: extraRadiusForFocused
    };
};
