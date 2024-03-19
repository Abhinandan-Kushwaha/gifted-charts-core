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
import { defaultAnimationDuration } from '../utils/constants';
export var usePieChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    var radius = (_a = props.radius) !== null && _a !== void 0 ? _a : 120;
    var extraRadiusForFocused = (_b = props.extraRadiusForFocused) !== null && _b !== void 0 ? _b : (((_c = props.focusOnPress) !== null && _c !== void 0 ? _c : props.sectionAutoFocus) ? radius / 10 : 0);
    var pi = props.semiCircle ? Math.PI / 2 : Math.PI;
    var _x = __read(useState(-1), 2), selectedIndex = _x[0], setSelectedIndex = _x[1]; // at the start, nothing is selected
    // because we're going to use a useEffect, we need startAngle and total to be state variables
    var _y = __read(useState((_d = props.initialAngle) !== null && _d !== void 0 ? _d : (props.semiCircle ? -pi : 0)), 2), startAngle = _y[0], setStartAngle = _y[1];
    var _z = __read(useState(0), 2), total = _z[0], setTotal = _z[1];
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
    var pro = props.pro, data = props.data, donut = props.donut, isThreeD = props.isThreeD, semiCircle = props.semiCircle, _0 = props.inwardExtraLengthForFocused, inwardExtraLengthForFocused = _0 === void 0 ? 0 : _0, _1 = props.isAnimated, isAnimated = _1 === void 0 ? false : _1, edgesRadius = props.edgesRadius;
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
    /**********************************       PRO                       **********************/
    var startAngleForPro = (_v = props.startAngle) !== null && _v !== void 0 ? _v : 0;
    endAngle = endAngle - startAngle + startAngleForPro;
    var animationDuration = (_w = props.animationDuration) !== null && _w !== void 0 ? _w : defaultAnimationDuration;
    var _2 = __read(useState(isAnimated), 2), isAnimating = _2[0], setIsAnimating = _2[1];
    useEffect(function () {
        if (isAnimated) {
            setIsAnimating(true);
            setTimeout(function () { return setIsAnimating(false); }, animationDuration);
        }
    }, []);
    var endAngleLocal = 0;
    var addValues = function (index) {
        if (index < 0)
            return 0;
        var sum = 0;
        for (var i = 0; i <= index; i++)
            sum += data[i].value;
        return sum;
    };
    var labelsPosition = props.labelsPosition
        ? props.labelsPosition
        : donut || props.centerLabelComponent
            ? 'outward'
            : 'mid';
    var getCoordinates = function (index, additionalValue, addInOnlyStart, addInOnlyEnd) {
        var addedValue = addValues(index - 1) + (addInOnlyEnd ? 0 : additionalValue !== null && additionalValue !== void 0 ? additionalValue : 0);
        var angle = (addedValue / total) * endAngleLocal + startAngleForPro;
        var startInnerX = radius + Math.cos(angle) * innerRadius;
        var startInnerY = radius - Math.sin(angle) * innerRadius;
        var startOuterX = radius + Math.cos(angle) * radius;
        var startOuterY = radius - Math.sin(angle) * radius;
        var value = addValues(index - 1) +
            data[index].value +
            (addInOnlyStart ? 0 : additionalValue !== null && additionalValue !== void 0 ? additionalValue : 0);
        angle = (value / total) * endAngleLocal + startAngleForPro;
        var endOuterX = radius + Math.cos(angle) * radius;
        var endOuterY = radius - Math.sin(angle) * radius;
        var endInnerX = radius + Math.cos(angle) * innerRadius;
        var endInnerY = radius - Math.sin(angle) * innerRadius;
        return {
            startInnerX: startInnerX,
            startInnerY: startInnerY,
            startOuterX: startOuterX,
            startOuterY: startOuterY,
            endOuterX: endOuterX,
            endOuterY: endOuterY,
            endInnerX: endInnerX,
            endInnerY: endInnerY
        };
    };
    var getTextCoordinates = function (index, labelPos) {
        var value = addValues(index - 1) + data[index].value / 2;
        var angle = (value / total) * endAngleLocal + startAngleForPro;
        var labelPosition = labelPos || labelsPosition;
        var x = radius +
            Math.cos(angle) *
                radius *
                (labelPosition === 'inward'
                    ? 0.25
                    : labelPosition === 'mid'
                        ? 0.5
                        : labelPosition === 'outward'
                            ? 0.75
                            : 1);
        var y = radius -
            Math.sin(angle) *
                radius *
                (labelPosition === 'inward'
                    ? 0.25
                    : labelPosition === 'mid'
                        ? 0.5
                        : labelPosition === 'outward'
                            ? 0.75
                            : 1);
        return { x: x, y: y };
    };
    var initial = '';
    var getInitial = function (item) {
        if (item.isStartEdgeCurved || item.startEdgeRadius) {
            var _a = getCoordinates(0, (radius - innerRadius) / (radius / 20)), startInnerX = _a.startInnerX, startInnerY = _a.startInnerY, startOuterX = _a.startOuterX, startOuterY = _a.startOuterY;
            return "M".concat(startInnerX, ",").concat(startInnerY, " L").concat(startOuterX, ",").concat(startOuterY, " ");
        }
        return "M".concat(radius + innerRadius, ",").concat(radius, " h").concat(radius - innerRadius, " ");
    };
    var getPath = function (index) {
        var _a;
        var _b = getCoordinates(index), endOuterX = _b.endOuterX, endOuterY = _b.endOuterY;
        var isLargeArc = data[index].value / total > 0.5 ? 1 : 0;
        var arc = "A".concat(radius + ((_a = props.strokeWidth) !== null && _a !== void 0 ? _a : 0) / 2, ",").concat(radius, " 0 ").concat(isLargeArc, " 0 ");
        var path = "".concat(arc, " ").concat(endOuterX, ", ").concat(endOuterY, "\n      L").concat(radius, ",").concat(radius, " ");
        initial = "M".concat(radius, ",").concat(radius, " L").concat(endOuterX, ",").concat(endOuterY);
        return path;
    };
    var getDonutPath = function (index, item) {
        var _a;
        var additionalForStart = item.isStartEdgeCurved || item.startEdgeRadius
            ? (radius - innerRadius) / (radius / 20)
            : 0;
        var additionalForEnd = item.isEndEdgeCurved || item.endEdgeRadius
            ? (radius - innerRadius) / (radius / -20)
            : 0;
        var cropAtEnd = !!(index === data.length - 1 &&
            (item.isEndEdgeCurved || item.endEdgeRadius));
        var _b = getCoordinates(index, cropAtEnd ? additionalForEnd : additionalForStart, !cropAtEnd, cropAtEnd), startInnerX = _b.startInnerX, startInnerY = _b.startInnerY, endOuterX = _b.endOuterX, endOuterY = _b.endOuterY, endInnerX = _b.endInnerX, endInnerY = _b.endInnerY;
        var isLargeArc = data[index].value / total > 0.5 ? 1 : 0;
        var innerArc = "A".concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(isLargeArc, " 1 ");
        var outerArc = "A".concat(radius + ((_a = props.strokeWidth) !== null && _a !== void 0 ? _a : 0) / 2, ",").concat(radius, " 0 ").concat(isLargeArc, " 0 ");
        var path = "".concat(outerArc, " ").concat(endOuterX, ", ").concat(endOuterY, "\n      L").concat(endInnerX, ",").concat(endInnerY, " M").concat(endInnerX, ",").concat(endInnerY, " ").concat(innerArc, " ").concat(startInnerX, ",").concat(startInnerY);
        initial = "M".concat(endInnerX, ",").concat(endInnerY, " L").concat(endOuterX, ",").concat(endOuterY, " ");
        return path;
    };
    var getStartCaps = function (index, item) {
        var _a, _b;
        var edgeRadius = (_b = (_a = item.startEdgeRadius) !== null && _a !== void 0 ? _a : edgesRadius) !== null && _b !== void 0 ? _b : 1;
        var additional = (item.isStartEdgeCurved || item.startEdgeRadius
            ? (radius - innerRadius) / (radius / 20)
            : 0) +
            strokeWidth / 2;
        var _c = getCoordinates(index, additional), startInnerX = _c.startInnerX, startInnerY = _c.startInnerY, startOuterX = _c.startOuterX, startOuterY = _c.startOuterY;
        var path = "M".concat(startInnerX, ",").concat(startInnerY, " A").concat(edgeRadius, ",").concat(edgeRadius, " 0 0 0 ").concat(startOuterX, ",").concat(startOuterY);
        return path;
    };
    var getEndCaps = function (index, item) {
        var _a, _b;
        var edgeRadius = (_b = (_a = item.endEdgeRadius) !== null && _a !== void 0 ? _a : edgesRadius) !== null && _b !== void 0 ? _b : 1;
        var additional = (item.isEndEdgeCurved || item.endEdgeRadius
            ? (radius - innerRadius) / (radius / 20)
            : 0) -
            strokeWidth / 2;
        var _c = getCoordinates(index, -additional), endInnerX = _c.endInnerX, endInnerY = _c.endInnerY, endOuterX = _c.endOuterX, endOuterY = _c.endOuterY;
        var path = "M".concat(endInnerX, ",").concat(endInnerY, " A").concat(edgeRadius, ",").concat(edgeRadius, " 0 0 1 ").concat(endOuterX, ",").concat(endOuterY);
        return path;
    };
    var dInitial = data.map(function (item, index) {
        return "".concat(initial || getInitial(item), " ").concat(donut ? getDonutPath(index, item) : getPath(index));
    });
    endAngleLocal = endAngle;
    initial = '';
    var dFinal = data.map(function (item, index) {
        return "".concat(initial || getInitial(item), " ").concat(donut ? getDonutPath(index, item) : getPath(index));
    });
    return {
        radius: radius,
        extraRadiusForFocused: extraRadiusForFocused,
        pi: pi,
        selectedIndex: selectedIndex,
        setSelectedIndex: setSelectedIndex,
        startAngle: pro ? startAngleForPro : startAngle,
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
        paddingVertical: paddingVertical,
        isAnimated: isAnimated,
        animationDuration: animationDuration / 1000,
        // PRO
        initial: initial,
        dInitial: dInitial,
        dFinal: dFinal,
        isAnimating: isAnimating,
        getStartCaps: getStartCaps,
        getEndCaps: getEndCaps,
        getTextCoordinates: getTextCoordinates
    };
};
