import { useState } from 'react'
import { type animatedBarPropTypes } from '../../BarChart/types'
import { BarDefaults } from '../../utils/constants'
import { getBarSideColor, getBarTopColor } from '../../utils'

export const useAnimatedThreeDBar = (props: animatedBarPropTypes) => {
  const { focusBarOnPress, index, selectedIndex, focusedBarConfig, item } =
    props
  const isFocused = focusBarOnPress && index === selectedIndex
  const localFrontColor = props.frontColor || BarDefaults.threeDBarFrontColor
  const localGradientColor =
    props.gradientColor || BarDefaults.threeDBarGradientColor
  const localSideColor = props.sideColor || BarDefaults.threeDBarSideColor
  const localTopColor = props.topColor || BarDefaults.threeDBarTopColor
  const localOpacity = props.opacity || 1
  const {
    isAnimated,
    showGradient = props.showGradient || false,
    gradientColor = isFocused
      ? focusedBarConfig?.gradientColor ?? localGradientColor
      : localGradientColor,
    frontColor = isFocused
      ? focusedBarConfig?.color ?? localFrontColor
      : localFrontColor,
    sideColor = getBarSideColor(
      isFocused,
      focusedBarConfig,
      item.sideColor,
      localSideColor
    ),
    topColor = getBarTopColor(
      isFocused,
      focusedBarConfig,
      item.topColor,
      localTopColor
    ),
    opacity = isFocused
      ? focusedBarConfig?.opacity ?? localOpacity
      : localOpacity
  } = props

  const [initialRender, setInitialRender] = useState(isAnimated)

  return {
    showGradient,
    gradientColor,
    frontColor: frontColor?.toString()?.trim?.()?.length
      ? frontColor
      : BarDefaults.threeDBarFrontColor,
    sideColor: sideColor?.toString()?.trim?.()?.length
      ? sideColor
      : BarDefaults.threeDBarSideColor,
    topColor: topColor?.toString()?.trim?.()?.length
      ? topColor
      : BarDefaults.threeDBarTopColor,
    opacity,
    initialRender,
    setInitialRender
  }
}
