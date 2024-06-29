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
import { useEffect, useState } from 'react';
import { getTextSizeForPieLabels } from '../utils';
export var usePieChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    var radius = (_a = props.radius) !== null && _a !== void 0 ? _a : 120;
    var extraRadiusForFocused = (_b = props.extraRadiusForFocused) !== null && _b !== void 0 ? _b : (((_c = props.focusOnPress) !== null && _c !== void 0 ? _c : props.sectionAutoFocus) ? radius / 10 : 0);
    var pi = props.semiCircle ? Math.PI / 2 : Math.PI;
    var _v = __read(useState(-1), 2), selectedIndex = _v[0], setSelectedIndex = _v[1]; // at the start, nothing is selected
    // because we're going to use a useEffect, we need startAngle and total to be state variables
    var _w = __read(useState((_d = props.initialAngle) !== null && _d !== void 0 ? _d : (props.semiCircle ? -pi : 0)), 2), startAngle = _w[0], setStartAngle = _w[1];
    var _x = __read(useState(0), 2), total = _x[0], setTotal = _x[1];
    useEffect(function () {
        var _a;
        // Update the total, this could be use to replace the forEach : const newTotal = props.data.reduce((acc, item) => acc + item.value, 0);
        var newTotal = 0;
        props.data.forEach(function (item) {
            newTotal += item.value;
        });
        setTotal(newTotal);
        // Update selectedIndex based on focused item
        var newSelectedIndex = props.data.findIndex(function (item) { return item.focused === true; });
        setSelectedIndex(newSelectedIndex);
        // Calculate the new start angle
        var newStartAngle = (_a = props.initialAngle) !== null && _a !== void 0 ? _a : (props.semiCircle ? -pi : 0);
        if (newSelectedIndex !== -1) {
            // it was !== 0 here before, which would not work, it's either !==-1 or >=0
            // This could be used to replace the for loop that was used before
            var sumBeforeSelectedIndex = props.data
                .slice(0, newSelectedIndex)
                .reduce(function (acc, item) { return acc + item.value; }, 0);
            setStartAngle(newStartAngle + (2 * pi * sumBeforeSelectedIndex) / (newTotal || 1));
        }
        else {
            setStartAngle(newStartAngle);
        }
    }, [props.data, props.initialAngle, props.semiCircle]);
    useEffect(function () {
        var _a;
        if (selectedIndex !== -1) {
            var newStartAngle = (_a = props.initialAngle) !== null && _a !== void 0 ? _a : (props.semiCircle ? -pi : 0);
            var start = 0;
            for (var i = 0; i < selectedIndex; i++) {
                start += props.data[i].value;
            }
            if (total) {
                setStartAngle(newStartAngle + (2 * pi * start) / (total || 1));
            }
        }
    }, [selectedIndex]);
    var pro = props.pro, data = props.data, donut = props.donut, isThreeD = props.isThreeD, semiCircle = props.semiCircle, _y = props.inwardExtraLengthForFocused, inwardExtraLengthForFocused = _y === void 0 ? 0 : _y, _z = props.isAnimated, isAnimated = _z === void 0 ? false : _z, edgesRadius = props.edgesRadius;
    var endAngle = (_e = props.endAngle) !== null && _e !== void 0 ? _e : startAngle + Math.PI * (semiCircle ? 1 : 2);
    var canvasWidth = radius * 2;
    var canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
    var strokeWidth = (_f = props.strokeWidth) !== null && _f !== void 0 ? _f : 0;
    var innerRadius = (_g = props.innerRadius) !== null && _g !== void 0 ? _g : radius / 2.5;
    var innerCircleColor = (_j = (_h = props.innerCircleColor) !== null && _h !== void 0 ? _h : props.backgroundColor) !== null && _j !== void 0 ? _j : 'white';
    var innerCircleBorderWidth = (_k = props.innerCircleBorderWidth) !== null && _k !== void 0 ? _k : (props.innerCircleBorderColor ? strokeWidth || 2 : 0);
    var innerCircleBorderColor = (_l = props.innerCircleBorderColor) !== null && _l !== void 0 ? _l : 'lightgray';
    var shiftInnerCenterX = (_m = props.shiftInnerCenterX) !== null && _m !== void 0 ? _m : 0;
    var shiftInnerCenterY = (_o = props.shiftInnerCenterY) !== null && _o !== void 0 ? _o : 0;
    var tiltAngle = (_p = props.tiltAngle) !== null && _p !== void 0 ? _p : '55deg';
    var isDataShifted = false;
    data.forEach(function (item) {
        if (item.shiftX || item.shiftY) {
            isDataShifted = true;
        }
    });
    var textSize = getTextSizeForPieLabels((_q = props.textSize) !== null && _q !== void 0 ? _q : 0, radius);
    var paddingHorizontal = ((_r = props.paddingHorizontal) !== null && _r !== void 0 ? _r : props.labelsPosition === 'onBorder')
        ? ((_s = props.textBackgroundRadius) !== null && _s !== void 0 ? _s : textSize) * 2 + 6
        : 0;
    var paddingVertical = ((_t = props.paddingVertical) !== null && _t !== void 0 ? _t : props.labelsPosition === 'onBorder')
        ? ((_u = props.textBackgroundRadius) !== null && _u !== void 0 ? _u : textSize) * 2 + 6
        : 0;
    return {
        radius: radius,
        extraRadiusForFocused: extraRadiusForFocused,
        pi: pi,
        selectedIndex: selectedIndex,
        setSelectedIndex: setSelectedIndex,
        startAngle: startAngle,
        endAngle: endAngle,
        setStartAngle: setStartAngle,
        total: total,
        setTotal: setTotal,
        data: data,
        donut: donut,
        isThreeD: isThreeD,
        semiCircle: semiCircle,
        inwardExtraLengthForFocused: inwardExtraLengthForFocused,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        strokeWidth: strokeWidth,
        innerRadius: innerRadius,
        innerCircleColor: innerCircleColor,
        innerCircleBorderWidth: innerCircleBorderWidth,
        innerCircleBorderColor: innerCircleBorderColor,
        shiftInnerCenterX: shiftInnerCenterX,
        shiftInnerCenterY: shiftInnerCenterY,
        tiltAngle: tiltAngle,
        isDataShifted: isDataShifted,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical
    };
};
