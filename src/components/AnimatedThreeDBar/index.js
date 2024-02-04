System.register(["react", "../../utils/constants", "../../utils"], function (exports_1, context_1) {
    "use strict";
    var react_1, constants_1, utils_1, useAnimatedThreeDBar;
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
            }
        ],
        execute: function () {
            exports_1("useAnimatedThreeDBar", useAnimatedThreeDBar = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                var focusBarOnPress = props.focusBarOnPress, index = props.index, selectedIndex = props.selectedIndex, focusedBarConfig = props.focusedBarConfig, item = props.item;
                var isFocused = focusBarOnPress && index === selectedIndex;
                var localFrontColor = props.frontColor || constants_1.BarDefaults.threeDBarFrontColor;
                var localGradientColor = props.gradientColor || constants_1.BarDefaults.threeDBarGradientColor;
                var localSideColor = props.sideColor || constants_1.BarDefaults.threeDBarSideColor;
                var localTopColor = props.topColor || constants_1.BarDefaults.threeDBarTopColor;
                var localOpacity = props.opacity || 1;
                var isAnimated = props.isAnimated, _o = props.showGradient, showGradient = _o === void 0 ? props.showGradient || false : _o, _p = props.gradientColor, gradientColor = _p === void 0 ? isFocused
                    ? (_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.gradientColor) !== null && _a !== void 0 ? _a : localGradientColor
                    : localGradientColor : _p, _q = props.frontColor, frontColor = _q === void 0 ? isFocused
                    ? (_b = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.color) !== null && _b !== void 0 ? _b : localFrontColor
                    : localFrontColor : _q, _r = props.sideColor, sideColor = _r === void 0 ? utils_1.getBarSideColor(isFocused, focusedBarConfig, item.sideColor, localSideColor) : _r, _s = props.topColor, topColor = _s === void 0 ? utils_1.getBarTopColor(isFocused, focusBarOnPress, item.topColor, localTopColor) : _s, _t = props.opacity, opacity = _t === void 0 ? isFocused
                    ? (_c = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.opacity) !== null && _c !== void 0 ? _c : localOpacity
                    : localOpacity : _t;
                var _u = react_1.useState(isAnimated), initialRender = _u[0], setInitialRender = _u[1];
                return {
                    showGradient: showGradient,
                    gradientColor: gradientColor,
                    frontColor: ((_f = (_e = (_d = frontColor === null || frontColor === void 0 ? void 0 : frontColor.toString()) === null || _d === void 0 ? void 0 : _d.trim) === null || _e === void 0 ? void 0 : _e.call(_d)) === null || _f === void 0 ? void 0 : _f.length)
                        ? frontColor
                        : constants_1.BarDefaults.threeDBarFrontColor,
                    sideColor: ((_j = (_h = (_g = sideColor === null || sideColor === void 0 ? void 0 : sideColor.toString()) === null || _g === void 0 ? void 0 : _g.trim) === null || _h === void 0 ? void 0 : _h.call(_g)) === null || _j === void 0 ? void 0 : _j.length)
                        ? sideColor
                        : constants_1.BarDefaults.threeDBarSideColor,
                    topColor: ((_m = (_l = (_k = topColor === null || topColor === void 0 ? void 0 : topColor.toString()) === null || _k === void 0 ? void 0 : _k.trim) === null || _l === void 0 ? void 0 : _l.call(_k)) === null || _m === void 0 ? void 0 : _m.length)
                        ? topColor
                        : constants_1.BarDefaults.threeDBarTopColor,
                    opacity: opacity,
                    initialRender: initialRender,
                    setInitialRender: setInitialRender,
                };
            });
        }
    };
});
//# sourceMappingURL=index.js.map