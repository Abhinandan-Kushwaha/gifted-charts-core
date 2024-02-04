System.register(["react", "../utils"], function (exports_1, context_1) {
    "use strict";
    var react_1, utils_1, usePieChart;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("usePieChart", usePieChart = function (props) {
                var _a, _b, _c, _d, _e, _f;
                var radius = props.radius || 120;
                var extraRadiusForFocused = (_a = props.extraRadiusForFocused) !== null && _a !== void 0 ? _a : (props.focusOnPress || props.sectionAutoFocus ? radius / 10 : 0);
                var pi = props.semiCircle ? Math.PI / 2 : Math.PI;
                var _g = react_1.useState(-1), selectedIndex = _g[0], setSelectedIndex = _g[1]; // at the start, nothing is selected
                // because we're going to use a useEffect, we need startAngle and total to be state variables
                var _h = react_1.useState(props.initialAngle || (props.semiCircle ? -pi : 0)), startAngle = _h[0], setStartAngle = _h[1];
                var _j = react_1.useState(0), total = _j[0], setTotal = _j[1];
                react_1.useEffect(function () {
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
                    var newStartAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
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
                react_1.useEffect(function () {
                    if (selectedIndex !== -1) {
                        var newStartAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
                        var start = 0;
                        for (var i = 0; i < selectedIndex; i++) {
                            start += props.data[i].value;
                        }
                        if (total) {
                            setStartAngle(newStartAngle + (2 * pi * start) / (total || 1));
                        }
                    }
                }, [selectedIndex]);
                var data = props.data, donut = props.donut, isThreeD = props.isThreeD, semiCircle = props.semiCircle, _k = props.inwardExtraLengthForFocused, inwardExtraLengthForFocused = _k === void 0 ? 0 : _k;
                var canvasWidth = radius * 2;
                var canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
                var strokeWidth = props.strokeWidth || 0;
                var innerRadius = props.innerRadius || radius / 2.5;
                var innerCircleColor = props.innerCircleColor || props.backgroundColor || "white";
                var innerCircleBorderWidth = props.innerCircleBorderWidth ||
                    (props.innerCircleBorderColor ? strokeWidth || 2 : 0);
                var innerCircleBorderColor = props.innerCircleBorderColor || "lightgray";
                var shiftInnerCenterX = props.shiftInnerCenterX || 0;
                var shiftInnerCenterY = props.shiftInnerCenterY || 0;
                var tiltAngle = props.tiltAngle || "55deg";
                var isDataShifted = false;
                data.forEach(function (item) {
                    if (item.shiftX || item.shiftY) {
                        isDataShifted = true;
                    }
                });
                var textSize = utils_1.getTextSizeForPieLabels((_b = props.textSize) !== null && _b !== void 0 ? _b : 0, radius);
                var paddingHorizontal = ((_c = props.paddingHorizontal) !== null && _c !== void 0 ? _c : props.labelsPosition === "onBorder")
                    ? ((_d = props.textBackgroundRadius) !== null && _d !== void 0 ? _d : textSize) * 2 + 6
                    : 0;
                var paddingVertical = ((_e = props.paddingVertical) !== null && _e !== void 0 ? _e : props.labelsPosition === "onBorder")
                    ? ((_f = props.textBackgroundRadius) !== null && _f !== void 0 ? _f : textSize) * 2 + 6
                    : 0;
                return {
                    radius: radius,
                    extraRadiusForFocused: extraRadiusForFocused,
                    pi: pi,
                    selectedIndex: selectedIndex,
                    setSelectedIndex: setSelectedIndex,
                    startAngle: startAngle,
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
                };
            });
        }
    };
});
//# sourceMappingURL=index.js.map