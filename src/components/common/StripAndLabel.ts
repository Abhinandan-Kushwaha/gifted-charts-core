import { type StripAndLabelProps } from './types'

interface IgetTopAndLeftForStripAndLabel {
  top: number
  left: number
}

export const getTopAndLeftForStripAndLabel = (
  props: StripAndLabelProps
): IgetTopAndLeftForStripAndLabel => {
  const {
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
    width,
    screenWidth
  } = props
  let left = 0
  let top = 0
  if (autoAdjustPointerLabelPosition) {
    if (pointerX < pointerLabelWidth / 2) {
      left = 7
    } else if (
      activatePointersOnLongPress &&
      pointerX - scrollX < pointerLabelWidth / 2 - 10
    ) {
      left = 7
    } else {
      if (
        !activatePointersOnLongPress &&
        pointerX >
          (width || screenWidth - yAxisLabelWidth - 15) - pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4
      } else if (
        activatePointersOnLongPress &&
        pointerX - scrollX >
          ((width ?? 0) + 10 || screenWidth - yAxisLabelWidth - 15) -
            pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4
      } else {
        left = -pointerLabelWidth / 2 + 5
      }
    }
  } else {
    left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX
  }

  if (autoAdjustPointerLabelPosition) {
    if (pointerLabelHeight - pointerYLocal > 10) {
      top = 10
    } else {
      top = -pointerLabelHeight
    }
  } else {
    top =
      (pointerStripUptoDataPoint
        ? pointerRadius || pointerStripHeight / 2
        : -pointerYLocal + 8) -
      pointerLabelWidth / 2 +
      shiftPointerLabelY
  }

  return {
    top,
    left
  }
}
