System.register(["../../utils/constants"], function (exports_1, context_1) {
    "use strict";
    var constants_1, getTopAndLeftForStripAndLabel;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            exports_1("getTopAndLeftForStripAndLabel", getTopAndLeftForStripAndLabel = function (props) {
                var _a;
                var autoAdjustPointerLabelPosition = props.autoAdjustPointerLabelPosition, pointerX = props.pointerX, pointerLabelWidth = props.pointerLabelWidth, activatePointersOnLongPress = props.activatePointersOnLongPress, yAxisLabelWidth = props.yAxisLabelWidth, pointerRadius = props.pointerRadius, pointerWidth = props.pointerWidth, shiftPointerLabelX = props.shiftPointerLabelX, pointerLabelHeight = props.pointerLabelHeight, pointerYLocal = props.pointerYLocal, pointerStripUptoDataPoint = props.pointerStripUptoDataPoint, pointerStripHeight = props.pointerStripHeight, shiftPointerLabelY = props.shiftPointerLabelY, scrollX = props.scrollX;
                var left = 0, top = 0;
                if (autoAdjustPointerLabelPosition) {
                    if (pointerX < pointerLabelWidth / 2) {
                        left = 7;
                    }
                    else if (activatePointersOnLongPress &&
                        pointerX - scrollX < pointerLabelWidth / 2 - 10) {
                        left = 7;
                    }
                    else {
                        if (!activatePointersOnLongPress &&
                            pointerX >
                                (props.width || constants_1.screenWidth - yAxisLabelWidth - 15) -
                                    pointerLabelWidth / 2) {
                            left = -pointerLabelWidth - 4;
                        }
                        else if (activatePointersOnLongPress &&
                            pointerX - scrollX >
                                (((_a = props.width) !== null && _a !== void 0 ? _a : 0) + 10 || constants_1.screenWidth - yAxisLabelWidth - 15) -
                                    pointerLabelWidth / 2) {
                            left = -pointerLabelWidth - 4;
                        }
                        else {
                            left = -pointerLabelWidth / 2 + 5;
                        }
                    }
                }
                else {
                    left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX;
                }
                if (autoAdjustPointerLabelPosition) {
                    if (pointerLabelHeight - pointerYLocal > 10) {
                        top = 10;
                    }
                    else {
                        top = -pointerLabelHeight;
                    }
                }
                else {
                    top =
                        (pointerStripUptoDataPoint
                            ? pointerRadius || pointerStripHeight / 2
                            : -pointerYLocal + 8) -
                            pointerLabelWidth / 2 +
                            shiftPointerLabelY;
                }
                return {
                    top: top,
                    left: left,
                };
            });
        }
    };
});
//# sourceMappingURL=StripAndLabel.js.map