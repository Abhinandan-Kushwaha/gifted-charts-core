System.register(["../utils"], function (exports_1, context_1) {
    "use strict";
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var utils_1, getPropsForAnimated2DWithGradient;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("getPropsForAnimated2DWithGradient", getPropsForAnimated2DWithGradient = function (props) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                var barBorderWidth = props.barBorderWidth, barBorderColor = props.barBorderColor, barBorderRadius = props.barBorderRadius, item = props.item, barBorderTopLeftRadius = props.barBorderTopLeftRadius, barBorderTopRightRadius = props.barBorderTopRightRadius, barBorderBottomLeftRadius = props.barBorderBottomLeftRadius, barBorderBottomRightRadius = props.barBorderBottomRightRadius, barWidth = props.barWidth, barInnerComponent = props.barInnerComponent, barStyle = props.barStyle, index = props.index, opacity = props.opacity, barHeight = props.barHeight, intactTopLabel = props.intactTopLabel, showValuesAsTopLabel = props.showValuesAsTopLabel, topLabelContainerStyle = props.topLabelContainerStyle, topLabelTextStyle = props.topLabelTextStyle, roundedBottom = props.roundedBottom, cappedBars = props.cappedBars, capRadius = props.capRadius, roundedTop = props.roundedTop, barBackgroundPattern = props.barBackgroundPattern, patternId = props.patternId, frontColor = props.frontColor, showGradient = props.showGradient, gradientColor = props.gradientColor, selectedIndex = props.selectedIndex, focusBarOnPress = props.focusBarOnPress, focusedBarConfig = props.focusedBarConfig, isThreeD = props.isThreeD;
                var isFocused = focusBarOnPress && selectedIndex === index;
                var itemOrPropsBarBorderRadius = (_b = (_a = item.barBorderRadius) !== null && _a !== void 0 ? _a : barBorderRadius) !== null && _b !== void 0 ? _b : 0;
                var localBarBorderRadius = isFocused
                    ? (_c = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.borderRadius) !== null && _c !== void 0 ? _c : itemOrPropsBarBorderRadius
                    : itemOrPropsBarBorderRadius;
                var localBarWidth = utils_1.getBarWidth(isFocused, focusedBarConfig, item.barWidth, barWidth);
                var localFrontColor = utils_1.getBarFrontColor(isFocused, focusedBarConfig, item.frontColor, frontColor, isThreeD);
                var localGradientColor = item.gradientColor || gradientColor;
                var localOpacity = opacity || 1;
                var commonStyleForBar = [
                    {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderWidth: barBorderWidth !== null && barBorderWidth !== void 0 ? barBorderWidth : 0,
                        borderColor: barBorderColor,
                        borderRadius: localBarBorderRadius,
                        borderTopLeftRadius: (_e = (_d = item.barBorderTopLeftRadius) !== null && _d !== void 0 ? _d : barBorderTopLeftRadius) !== null && _e !== void 0 ? _e : localBarBorderRadius,
                        borderTopRightRadius: (_g = (_f = item.barBorderTopRightRadius) !== null && _f !== void 0 ? _f : barBorderTopRightRadius) !== null && _g !== void 0 ? _g : localBarBorderRadius,
                        borderBottomLeftRadius: (_j = (_h = item.barBorderBottomLeftRadius) !== null && _h !== void 0 ? _h : barBorderBottomLeftRadius) !== null && _j !== void 0 ? _j : localBarBorderRadius,
                        borderBottomRightRadius: (_l = (_k = item.barBorderBottomRightRadius) !== null && _k !== void 0 ? _k : barBorderBottomRightRadius) !== null && _l !== void 0 ? _l : localBarBorderRadius,
                    },
                ];
                if (roundedBottom || (isFocused && (focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.roundedBottom))) {
                    commonStyleForBar.push({
                        borderBottomLeftRadius: localBarWidth / 2,
                        borderBottomRightRadius: localBarWidth / 2,
                    });
                }
                if (cappedBars) {
                    commonStyleForBar.push({
                        borderTopLeftRadius: item.capRadius === 0 ? 0 : item.capRadius || capRadius || 0,
                        borderTopRightRadius: item.capRadius === 0 ? 0 : item.capRadius || capRadius || 0,
                    });
                }
                if (roundedTop || (isFocused && (focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.roundedTop))) {
                    commonStyleForBar.push({
                        borderTopLeftRadius: localBarWidth / 2,
                        borderTopRightRadius: localBarWidth / 2,
                    });
                }
                var barStyleWithBackground = __spreadArray(__spreadArray([], commonStyleForBar, true), [
                    {
                        backgroundColor: localFrontColor,
                    },
                ], false);
                var commonPropsFor2Dand3Dbars = {
                    barBackgroundPattern: item.barBackgroundPattern || barBackgroundPattern,
                    barInnerComponent: isFocused
                        ? (_m = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.barInnerComponent) !== null && _m !== void 0 ? _m : barInnerComponent
                        : barInnerComponent,
                    patternId: item.patternId || patternId,
                    barWidth: localBarWidth,
                    barStyle: barStyle,
                    item: item,
                    index: index,
                    frontColor: localFrontColor,
                    showGradient: item.showGradient || showGradient || false,
                    gradientColor: isFocused
                        ? (_o = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.gradientColor) !== null && _o !== void 0 ? _o : localGradientColor
                        : localGradientColor,
                    opacity: isFocused
                        ? (_p = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.opacity) !== null && _p !== void 0 ? _p : localOpacity
                        : localOpacity,
                    height: barHeight,
                    intactTopLabel: intactTopLabel,
                    showValuesAsTopLabel: !!showValuesAsTopLabel,
                    topLabelContainerStyle: topLabelContainerStyle,
                    topLabelTextStyle: topLabelTextStyle,
                };
                return {
                    commonStyleForBar: commonStyleForBar,
                    barStyleWithBackground: barStyleWithBackground,
                    commonPropsFor2Dand3Dbars: commonPropsFor2Dand3Dbars,
                    isFocused: isFocused,
                    focusedBarConfig: focusedBarConfig,
                    localFrontColor: localFrontColor,
                };
            });
        }
    };
});
//# sourceMappingURL=Animated2DWithGradient.js.map