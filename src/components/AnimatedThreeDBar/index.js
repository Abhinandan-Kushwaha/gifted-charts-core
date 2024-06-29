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
import { useState } from 'react';
import { BarDefaults } from '../../utils/constants';
import { getBarSideColor, getBarTopColor } from '../../utils';
export var useAnimatedThreeDBar = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var focusBarOnPress = props.focusBarOnPress, index = props.index, selectedIndex = props.selectedIndex, focusedBarConfig = props.focusedBarConfig, item = props.item;
    var isFocused = focusBarOnPress && index === selectedIndex;
    var localFrontColor = props.frontColor || BarDefaults.threeDBarFrontColor;
    var localGradientColor = props.gradientColor || BarDefaults.threeDBarGradientColor;
    var localSideColor = props.sideColor || BarDefaults.threeDBarSideColor;
    var localTopColor = props.topColor || BarDefaults.threeDBarTopColor;
    var localOpacity = props.opacity || 1;
    var isAnimated = props.isAnimated, _o = props.showGradient, showGradient = _o === void 0 ? props.showGradient || false : _o, _p = props.gradientColor, gradientColor = _p === void 0 ? isFocused
        ? (_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.gradientColor) !== null && _a !== void 0 ? _a : localGradientColor
        : localGradientColor : _p, _q = props.frontColor, frontColor = _q === void 0 ? isFocused
        ? (_b = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.color) !== null && _b !== void 0 ? _b : localFrontColor
        : localFrontColor : _q, _r = props.sideColor, sideColor = _r === void 0 ? getBarSideColor(isFocused, focusedBarConfig, item.sideColor, localSideColor) : _r, _s = props.topColor, topColor = _s === void 0 ? getBarTopColor(isFocused, focusedBarConfig, item.topColor, localTopColor) : _s, _t = props.opacity, opacity = _t === void 0 ? isFocused
        ? (_c = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.opacity) !== null && _c !== void 0 ? _c : localOpacity
        : localOpacity : _t;
    var _u = __read(useState(isAnimated), 2), initialRender = _u[0], setInitialRender = _u[1];
    return {
        showGradient: showGradient,
        gradientColor: gradientColor,
        frontColor: ((_f = (_e = (_d = frontColor === null || frontColor === void 0 ? void 0 : frontColor.toString()) === null || _d === void 0 ? void 0 : _d.trim) === null || _e === void 0 ? void 0 : _e.call(_d)) === null || _f === void 0 ? void 0 : _f.length)
            ? frontColor
            : BarDefaults.threeDBarFrontColor,
        sideColor: ((_j = (_h = (_g = sideColor === null || sideColor === void 0 ? void 0 : sideColor.toString()) === null || _g === void 0 ? void 0 : _g.trim) === null || _h === void 0 ? void 0 : _h.call(_g)) === null || _j === void 0 ? void 0 : _j.length)
            ? sideColor
            : BarDefaults.threeDBarSideColor,
        topColor: ((_m = (_l = (_k = topColor === null || topColor === void 0 ? void 0 : topColor.toString()) === null || _k === void 0 ? void 0 : _k.trim) === null || _l === void 0 ? void 0 : _l.call(_k)) === null || _m === void 0 ? void 0 : _m.length)
            ? topColor
            : BarDefaults.threeDBarTopColor,
        opacity: opacity,
        initialRender: initialRender,
        setInitialRender: setInitialRender
    };
};
