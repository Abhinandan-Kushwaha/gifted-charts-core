import { screenWidth } from "../../utils/constants";

type GetTopAndLeftForStripAndLabelProps = {
  width?: number
  autoAdjustPointerLabelPosition?: boolean;
  pointerX: number,
  pointerLabelWidth: number,
  activatePointersOnLongPress: boolean,
  yAxisLabelWidth: number,
  pointerRadius: number,
  pointerWidth: number,
  shiftPointerLabelX: number,
  pointerLabelHeight: number,
  pointerYLocal: number,
  pointerStripUptoDataPoint: boolean,
  pointerStripHeight: number,
  shiftPointerLabelY: number,
  scrollX: number,
}

export const getTopAndLeftForStripAndLabel = <T extends GetTopAndLeftForStripAndLabelProps>({
  width,
  autoAdjustPointerLabelPosition,
  pointerX,
  pointerLabelWidth,
  activatePointersOnLongPress,
  yAxisLabelWidth,
  pointerRadius,
  pointerWidth,
  shiftPointerLabelX,
  pointerLabelHeight,
  pointerYLocal,
  pointerStripUptoDataPoint,
  pointerStripHeight,
  shiftPointerLabelY,
  scrollX,
}: T) => {
  let left = 0,
    top = 0;
  if (autoAdjustPointerLabelPosition) {
    if (pointerX < pointerLabelWidth / 2) {
      left = 7;
    } else if (
      activatePointersOnLongPress &&
      pointerX - scrollX < pointerLabelWidth / 2 - 10
    ) {
      left = 7;
    } else {
      if (
        !activatePointersOnLongPress &&
        pointerX >
          (width || screenWidth - yAxisLabelWidth - 15) -
            pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4;
      } else if (
        activatePointersOnLongPress &&
        pointerX - scrollX >
          ((width ?? 0) + 10 || screenWidth - yAxisLabelWidth - 15) -
            pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4;
      } else {
        left = -pointerLabelWidth / 2 + 5;
      }
    }
  } else {
    left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX;
  }

  if (autoAdjustPointerLabelPosition) {
    if (pointerLabelHeight - pointerYLocal > 10) {
      top = 10;
    } else {
      top = -pointerLabelHeight;
    }
  } else {
    top =
      (pointerStripUptoDataPoint
        ? pointerRadius || pointerStripHeight / 2
        : -pointerYLocal + 8) -
      pointerLabelWidth / 2 +
      shiftPointerLabelY;
  }

  return {
    top,
    left,
  };
};
