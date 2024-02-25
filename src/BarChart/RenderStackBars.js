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
export var useRenderStackBars = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var item = props.item, index = props.index, containerHeight = props.containerHeight, maxValue = props.maxValue, propSpacing = props.propSpacing, initialSpacing = props.initialSpacing, stackData = props.stackData, isAnimated = props.isAnimated;
    var cotainsNegative = item.stacks.some(function (item) { return item.value < 0; });
    var noAnimation = cotainsNegative || !isAnimated;
    var localBarInnerComponent = (_a = item.barInnerComponent) !== null && _a !== void 0 ? _a : props.barInnerComponent;
    var borderRadius = item.borderRadius, borderTopLeftRadius = item.borderTopLeftRadius, borderTopRightRadius = item.borderTopRightRadius, borderBottomLeftRadius = item.borderBottomLeftRadius, borderBottomRightRadius = item.borderBottomRightRadius;
    var leftSpacing = initialSpacing;
    for (var i = 0; i < index; i++) {
        leftSpacing +=
            ((_c = (_b = stackData[i].spacing) !== null && _b !== void 0 ? _b : propSpacing) !== null && _c !== void 0 ? _c : 0) +
                ((_e = (_d = stackData[i].stacks[0].barWidth) !== null && _d !== void 0 ? _d : props.barWidth) !== null && _e !== void 0 ? _e : 30);
    }
    var disablePress = (_f = props.disablePress) !== null && _f !== void 0 ? _f : false;
    var totalHeight = props.item.stacks.reduce(function (acc, stack) {
        return acc +
            (Math.abs(stack.value) * (containerHeight !== null && containerHeight !== void 0 ? containerHeight : 200)) / (maxValue || 200);
    }, 0);
    var _g = __read(useState(noAnimation ? totalHeight : 1), 2), height = _g[0], setHeight = _g[1];
    var getBarHeight = function (value, marginBottom) {
        return ((Math.abs(value) * (containerHeight !== null && containerHeight !== void 0 ? containerHeight : 200)) / (maxValue || 200) -
            (marginBottom !== null && marginBottom !== void 0 ? marginBottom : 0));
    };
    var getPosition = function (index) {
        /* Returns bottom position for stack item
               negative values are below origin (-> negative position) */
        var height = getBarHeight(item.stacks[index].value, item.stacks[index].marginBottom);
        var itemValue = item.stacks[index].value;
        var isNegative = itemValue <= 0;
        var position = isNegative ? -(height || 0) : 0;
        for (var i = 0; i < index; i++) {
            var valueOnIndex = item.stacks[i].value;
            if (isNegative && valueOnIndex <= 0) {
                position +=
                    (valueOnIndex * (containerHeight !== null && containerHeight !== void 0 ? containerHeight : 200)) / (maxValue || 200);
            }
            else if (!isNegative && valueOnIndex >= 0) {
                position +=
                    (valueOnIndex * (containerHeight !== null && containerHeight !== void 0 ? containerHeight : 200)) / (maxValue || 200);
            }
        }
        return position;
    };
    var getLowestPosition = function () {
        var _a;
        return (((_a = item.stacks
            .map(function (_, index) { return getPosition(index); })
            .sort(function (a, b) { return a - b; })) === null || _a === void 0 ? void 0 : _a[0]) || 0);
    };
    var lowestBarPosition = getLowestPosition();
    var getStackBorderRadii = function (item, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var stackItem = item.stacks[index];
        var borderRadii = {
            borderTopLeftRadius: (_d = (_c = (_b = (_a = stackItem.borderTopLeftRadius) !== null && _a !== void 0 ? _a : stackItem.borderRadius) !== null && _b !== void 0 ? _b : props.barBorderTopLeftRadius) !== null && _c !== void 0 ? _c : props.barBorderRadius) !== null && _d !== void 0 ? _d : 0,
            borderTopRightRadius: (_h = (_g = (_f = (_e = stackItem.borderTopRightRadius) !== null && _e !== void 0 ? _e : stackItem.borderRadius) !== null && _f !== void 0 ? _f : props.barBorderTopRightRadius) !== null && _g !== void 0 ? _g : props.barBorderRadius) !== null && _h !== void 0 ? _h : 0,
            borderBottomLeftRadius: (_m = (_l = (_k = (_j = stackItem.borderBottomLeftRadius) !== null && _j !== void 0 ? _j : stackItem.borderRadius) !== null && _k !== void 0 ? _k : props.barBorderBottomLeftRadius) !== null && _l !== void 0 ? _l : props.barBorderRadius) !== null && _m !== void 0 ? _m : 0,
            borderBottomRightRadius: (_r = (_q = (_p = (_o = stackItem.borderBottomRightRadius) !== null && _o !== void 0 ? _o : stackItem.borderRadius) !== null && _p !== void 0 ? _p : props.barBorderBottomRightRadius) !== null && _q !== void 0 ? _q : props.barBorderRadius) !== null && _r !== void 0 ? _r : 0
        };
        return borderRadii;
    };
    return {
        cotainsNegative: cotainsNegative,
        noAnimation: noAnimation,
        localBarInnerComponent: localBarInnerComponent,
        borderRadius: borderRadius,
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
        leftSpacing: leftSpacing,
        disablePress: disablePress,
        totalHeight: totalHeight,
        height: height,
        setHeight: setHeight,
        getBarHeight: getBarHeight,
        getPosition: getPosition,
        getLowestPosition: getLowestPosition,
        lowestBarPosition: lowestBarPosition,
        getStackBorderRadii: getStackBorderRadii
    };
};
