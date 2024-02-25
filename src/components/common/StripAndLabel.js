export var getTopAndLeftForStripAndLabel = function (props) {
    var autoAdjustPointerLabelPosition = props.autoAdjustPointerLabelPosition, pointerX = props.pointerX, pointerLabelWidth = props.pointerLabelWidth, activatePointersOnLongPress = props.activatePointersOnLongPress, yAxisLabelWidth = props.yAxisLabelWidth, pointerRadius = props.pointerRadius, pointerWidth = props.pointerWidth, shiftPointerLabelX = props.shiftPointerLabelX, pointerLabelHeight = props.pointerLabelHeight, pointerYLocal = props.pointerYLocal, pointerStripUptoDataPoint = props.pointerStripUptoDataPoint, pointerStripHeight = props.pointerStripHeight, shiftPointerLabelY = props.shiftPointerLabelY, scrollX = props.scrollX, width = props.width, screenWidth = props.screenWidth;
    var left = 0;
    var top = 0;
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
                    (width || screenWidth - yAxisLabelWidth - 15) - pointerLabelWidth / 2) {
                left = -pointerLabelWidth - 4;
            }
            else if (activatePointersOnLongPress &&
                pointerX - scrollX >
                    ((width !== null && width !== void 0 ? width : 0) + 10 || screenWidth - yAxisLabelWidth - 15) -
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
        left: left
    };
};
