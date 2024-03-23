import { defaultAnimationDuration } from '../utils/constants';
export var usePiePro = function (props) {
    var _a, _b;
    var data = props.data, isAnimated = props.isAnimated, donut = props.donut, semiCircle = props.semiCircle, _c = props.radius, radius = _c === void 0 ? 120 : _c, _d = props.innerRadius, innerRadius = _d === void 0 ? radius / 2.5 : _d, _e = props.strokeWidth, strokeWidth = _e === void 0 ? 0 : _e, _f = props.edgesRadius, edgesRadius = _f === void 0 ? 0 : _f, _g = props.startAngle, startAngle = _g === void 0 ? 0 : _g;
    var endAngle = (_a = props.endAngle) !== null && _a !== void 0 ? _a : startAngle + Math.PI * (semiCircle ? 1 : 2);
    var total = data.reduce(function (acc, item) { return acc + item.value; }, 0);
    var animationDuration = (_b = props.animationDuration) !== null && _b !== void 0 ? _b : defaultAnimationDuration;
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
        var angle = (addedValue / total) * endAngleLocal + startAngle;
        var startInnerX = radius + Math.cos(angle) * innerRadius;
        var startInnerY = radius - Math.sin(angle) * innerRadius;
        var startOuterX = radius + Math.cos(angle) * radius;
        var startOuterY = radius - Math.sin(angle) * radius;
        var value = addValues(index - 1) +
            data[index].value +
            (addInOnlyStart ? 0 : additionalValue !== null && additionalValue !== void 0 ? additionalValue : 0);
        angle = (value / total) * endAngleLocal + startAngle;
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
        var angle = (value / total) * endAngleLocal + startAngle;
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
        total: total,
        donut: donut,
        strokeWidth: strokeWidth,
        isAnimated: isAnimated,
        animationDuration: animationDuration,
        initial: initial,
        dInitial: dInitial,
        dFinal: dFinal,
        getStartCaps: getStartCaps,
        getEndCaps: getEndCaps,
        getTextCoordinates: getTextCoordinates,
        labelsPosition: labelsPosition
    };
};
