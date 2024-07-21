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
import { getBarFrontColor, getBarWidth } from '../utils';
export var getPropsForAnimated2DWithGradient = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    var barBorderWidth = props.barBorderWidth, barBorderColor = props.barBorderColor, barBorderRadius = props.barBorderRadius, item = props.item, barBorderTopLeftRadius = props.barBorderTopLeftRadius, barBorderTopRightRadius = props.barBorderTopRightRadius, barBorderBottomLeftRadius = props.barBorderBottomLeftRadius, barBorderBottomRightRadius = props.barBorderBottomRightRadius, barWidth = props.barWidth, barInnerComponent = props.barInnerComponent, barStyle = props.barStyle, index = props.index, opacity = props.opacity, barHeight = props.barHeight, intactTopLabel = props.intactTopLabel, showValuesAsTopLabel = props.showValuesAsTopLabel, topLabelContainerStyle = props.topLabelContainerStyle, topLabelTextStyle = props.topLabelTextStyle, roundedBottom = props.roundedBottom, cappedBars = props.cappedBars, capRadius = props.capRadius, roundedTop = props.roundedTop, barBackgroundPattern = props.barBackgroundPattern, patternId = props.patternId, frontColor = props.frontColor, showGradient = props.showGradient, gradientColor = props.gradientColor, selectedIndex = props.selectedIndex, focusBarOnPress = props.focusBarOnPress, focusedBarConfig = props.focusedBarConfig, isThreeD = props.isThreeD, yAxisOffset = props.yAxisOffset;
    var isFocused = (focusBarOnPress !== null && focusBarOnPress !== void 0 ? focusBarOnPress : false) && selectedIndex === index;
    var itemOrPropsBarBorderRadius = (_b = (_a = item.barBorderRadius) !== null && _a !== void 0 ? _a : barBorderRadius) !== null && _b !== void 0 ? _b : 0;
    var localBarBorderRadius = (isFocused !== null && isFocused !== void 0 ? isFocused : false)
        ? (_c = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.borderRadius) !== null && _c !== void 0 ? _c : itemOrPropsBarBorderRadius
        : itemOrPropsBarBorderRadius;
    var localBarWidth = getBarWidth(isFocused, focusedBarConfig, item.barWidth, barWidth);
    var localFrontColor = getBarFrontColor(isFocused, focusedBarConfig, item.frontColor, frontColor, isThreeD);
    var localGradientColor = (_d = item.gradientColor) !== null && _d !== void 0 ? _d : gradientColor;
    var localOpacity = opacity !== null && opacity !== void 0 ? opacity : 1;
    var commonStyleForBar = [
        {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderWidth: (_f = (_e = item.barBorderWidth) !== null && _e !== void 0 ? _e : barBorderWidth) !== null && _f !== void 0 ? _f : 0,
            borderColor: (_g = item.barBorderColor) !== null && _g !== void 0 ? _g : barBorderColor,
            borderRadius: localBarBorderRadius,
            borderTopLeftRadius: (_j = (_h = item.barBorderTopLeftRadius) !== null && _h !== void 0 ? _h : barBorderTopLeftRadius) !== null && _j !== void 0 ? _j : localBarBorderRadius,
            borderTopRightRadius: (_l = (_k = item.barBorderTopRightRadius) !== null && _k !== void 0 ? _k : barBorderTopRightRadius) !== null && _l !== void 0 ? _l : localBarBorderRadius,
            borderBottomLeftRadius: (_o = (_m = item.barBorderBottomLeftRadius) !== null && _m !== void 0 ? _m : barBorderBottomLeftRadius) !== null && _o !== void 0 ? _o : localBarBorderRadius,
            borderBottomRightRadius: (_q = (_p = item.barBorderBottomRightRadius) !== null && _p !== void 0 ? _p : barBorderBottomRightRadius) !== null && _q !== void 0 ? _q : localBarBorderRadius
        }
    ];
    if ((_r = roundedBottom !== null && roundedBottom !== void 0 ? roundedBottom : (isFocused && (focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.roundedBottom))) !== null && _r !== void 0 ? _r : false) {
        commonStyleForBar.push({
            borderBottomLeftRadius: localBarWidth / 2,
            borderBottomRightRadius: localBarWidth / 2
        });
    }
    if (cappedBars !== null && cappedBars !== void 0 ? cappedBars : false) {
        commonStyleForBar.push({
            borderTopLeftRadius: item.capRadius === 0 ? 0 : (_t = (_s = item.capRadius) !== null && _s !== void 0 ? _s : capRadius) !== null && _t !== void 0 ? _t : 0,
            borderTopRightRadius: item.capRadius === 0 ? 0 : (_v = (_u = item.capRadius) !== null && _u !== void 0 ? _u : capRadius) !== null && _v !== void 0 ? _v : 0
        });
    }
    if ((_w = roundedTop !== null && roundedTop !== void 0 ? roundedTop : (isFocused && (focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.roundedTop))) !== null && _w !== void 0 ? _w : false) {
        commonStyleForBar.push({
            borderTopLeftRadius: localBarWidth / 2,
            borderTopRightRadius: localBarWidth / 2
        });
    }
    var barStyleWithBackground = __spreadArray(__spreadArray([], __read(commonStyleForBar), false), [
        {
            backgroundColor: localFrontColor
        }
    ], false);
    var commonPropsFor2Dand3Dbars = {
        barBackgroundPattern: (_x = item.barBackgroundPattern) !== null && _x !== void 0 ? _x : barBackgroundPattern,
        barInnerComponent: isFocused
            ? (_y = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.barInnerComponent) !== null && _y !== void 0 ? _y : barInnerComponent
            : barInnerComponent,
        patternId: (_z = item.patternId) !== null && _z !== void 0 ? _z : patternId,
        barWidth: localBarWidth,
        barStyle: barStyle,
        item: item,
        index: index,
        frontColor: localFrontColor,
        showGradient: (_1 = (_0 = item.showGradient) !== null && _0 !== void 0 ? _0 : showGradient) !== null && _1 !== void 0 ? _1 : false,
        gradientColor: isFocused
            ? (_2 = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.gradientColor) !== null && _2 !== void 0 ? _2 : localGradientColor
            : localGradientColor,
        opacity: isFocused
            ? (_3 = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.opacity) !== null && _3 !== void 0 ? _3 : localOpacity
            : localOpacity,
        height: barHeight,
        intactTopLabel: intactTopLabel,
        showValuesAsTopLabel: showValuesAsTopLabel !== null && showValuesAsTopLabel !== void 0 ? showValuesAsTopLabel : false,
        topLabelContainerStyle: topLabelContainerStyle,
        topLabelTextStyle: topLabelTextStyle,
        yAxisOffset: yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0
    };
    return {
        commonStyleForBar: commonStyleForBar,
        barStyleWithBackground: barStyleWithBackground,
        commonPropsFor2Dand3Dbars: commonPropsFor2Dand3Dbars,
        isFocused: isFocused,
        focusedBarConfig: focusedBarConfig,
        localFrontColor: localFrontColor
    };
};
