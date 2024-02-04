System.register(["../utils"], function (exports_1, context_1) {
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
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var utils_1, getPieChartMainProps;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("getPieChartMainProps", getPieChartMainProps = function (props) {
                var _a, _b;
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
                var radius = props.radius || 120;
                var canvasWidth = radius * 2;
                var canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
                var shadowWidth = props.shadowWidth || radius / 5;
                var backgroundColor = props.backgroundColor || "transparent";
                var shadowColor = props.shadowColor || "lightgray";
                var semiCircle = props.semiCircle || false;
                var pi = Math.PI;
                var initialAngle = props.initialAngle || (semiCircle ? pi / -2 : 0);
                var shadow = props.shadow || false;
                var donut = props.donut || false;
                var strokeWidth = props.strokeWidth || 0;
                var strokeColor = props.strokeColor || (strokeWidth ? "gray" : "transparent");
                var innerRadius = props.innerRadius || radius / 2.5;
                var showText = props.showText || false;
                var textColor = props.textColor || "";
                var textSize = utils_1.getTextSizeForPieLabels((_a = props.textSize) !== null && _a !== void 0 ? _a : 0, radius);
                var tiltAngle = props.tiltAngle || "55deg";
                if (tiltAngle &&
                    !isNaN(Number(tiltAngle)) &&
                    !(tiltAngle + "").endsWith("deg")) {
                    tiltAngle += "deg";
                }
                // const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
                var labelsPosition = props.labelsPosition
                    ? props.labelsPosition
                    : donut || props.centerLabelComponent
                        ? "outward"
                        : "mid";
                var showTextBackground = props.showTextBackground || false;
                var textBackgroundColor = props.textBackgroundColor || "white";
                var showValuesAsLabels = props.showValuesAsLabels || false;
                var showGradient = props.showGradient || false;
                var gradientCenterColor = props.gradientCenterColor || "white";
                var toggleFocusOnPress = (_b = props.toggleFocusOnPress) !== null && _b !== void 0 ? _b : true;
                var minShiftX = 0, maxShiftX = 0, minShiftY = 0, maxShiftY = 0, total = 0;
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
                var cx = radius, cy = radius;
                total =
                    data && data.length
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
                pData = __spreadArray([0], pData, true);
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
                    extraRadiusForFocused: extraRadiusForFocused,
                };
            });
        }
    };
});
//# sourceMappingURL=main.js.map