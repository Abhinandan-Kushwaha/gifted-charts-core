import { type ColorValue, type ViewStyle } from 'react-native'
import { getBarFrontColor, getBarWidth } from '../utils'
import {
  type FocusedBarConfig,
  type BarChartPropsType,
  type CommonPropsFor2Dand3DbarsType,
  type barDataItem,
  type stackDataItem
} from './types'
import { type ReactNode } from 'react'

interface Animated2dWithGradientPropsType extends BarChartPropsType {
  item: barDataItem
  index: number
  barHeight: number
  selectedIndex: number
  barBackgroundPattern?: () => ReactNode
  barInnerComponent?: (
    item?: stackDataItem | barDataItem,
    index?: number
  ) => ReactNode
  patternId?: string
  barStyle?: object
  intactTopLabel: boolean
}

interface IgetPropsForAnimated2DWithGradientReturnType {
  commonStyleForBar: ViewStyle[]
  barStyleWithBackground: ViewStyle[]
  commonPropsFor2Dand3Dbars: CommonPropsFor2Dand3DbarsType
  isFocused?: boolean
  focusedBarConfig?: FocusedBarConfig
  localFrontColor: ColorValue
}

export const getPropsForAnimated2DWithGradient = (
  props: Animated2dWithGradientPropsType
): IgetPropsForAnimated2DWithGradientReturnType => {
  const {
    barBorderWidth,
    barBorderColor,
    barBorderRadius,
    item,
    barBorderTopLeftRadius,
    barBorderTopRightRadius,
    barBorderBottomLeftRadius,
    barBorderBottomRightRadius,
    barWidth,
    barInnerComponent,
    barStyle,
    index,
    opacity,
    barHeight,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
    roundedBottom,
    cappedBars,
    capRadius,
    roundedTop,
    barBackgroundPattern,
    patternId,
    frontColor,
    showGradient,
    gradientColor,
    selectedIndex,
    focusBarOnPress,
    focusedBarConfig,
    isThreeD,
    yAxisOffset
  } = props

  const isFocused = (focusBarOnPress ?? false) && selectedIndex === index
  const itemOrPropsBarBorderRadius =
    item.barBorderRadius ?? barBorderRadius ?? 0
  const localBarBorderRadius =
    isFocused ?? false
      ? focusedBarConfig?.borderRadius ?? itemOrPropsBarBorderRadius
      : itemOrPropsBarBorderRadius
  const localBarWidth = getBarWidth(
    isFocused,
    focusedBarConfig,
    item.barWidth,
    barWidth
  )
  const localFrontColor = getBarFrontColor(
    isFocused,
    focusedBarConfig,
    item.frontColor,
    frontColor,
    isThreeD
  )
  const localGradientColor = item.gradientColor ?? gradientColor
  const localOpacity = opacity ?? 1

  const commonStyleForBar: ViewStyle[] = [
    {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderWidth: barBorderWidth ?? 0,
      borderColor: barBorderColor,
      borderRadius: localBarBorderRadius,
      borderTopLeftRadius:
        item.barBorderTopLeftRadius ??
        barBorderTopLeftRadius ??
        localBarBorderRadius,
      borderTopRightRadius:
        item.barBorderTopRightRadius ??
        barBorderTopRightRadius ??
        localBarBorderRadius,
      borderBottomLeftRadius:
        item.barBorderBottomLeftRadius ??
        barBorderBottomLeftRadius ??
        localBarBorderRadius,
      borderBottomRightRadius:
        item.barBorderBottomRightRadius ??
        barBorderBottomRightRadius ??
        localBarBorderRadius
    }
  ]

  if (
    roundedBottom ??
    (isFocused && focusedBarConfig?.roundedBottom) ??
    false
  ) {
    commonStyleForBar.push({
      borderBottomLeftRadius: localBarWidth / 2,
      borderBottomRightRadius: localBarWidth / 2
    })
  }

  if (cappedBars ?? false) {
    commonStyleForBar.push({
      borderTopLeftRadius:
        item.capRadius === 0 ? 0 : item.capRadius ?? capRadius ?? 0,
      borderTopRightRadius:
        item.capRadius === 0 ? 0 : item.capRadius ?? capRadius ?? 0
    })
  }

  if (roundedTop ?? (isFocused && focusedBarConfig?.roundedTop) ?? false) {
    commonStyleForBar.push({
      borderTopLeftRadius: localBarWidth / 2,
      borderTopRightRadius: localBarWidth / 2
    })
  }
  const barStyleWithBackground: ViewStyle[] = [
    ...commonStyleForBar,
    {
      backgroundColor: localFrontColor
    }
  ]

  const commonPropsFor2Dand3Dbars: CommonPropsFor2Dand3DbarsType = {
    barBackgroundPattern: item.barBackgroundPattern ?? barBackgroundPattern,
    barInnerComponent: isFocused
      ? focusedBarConfig?.barInnerComponent ?? barInnerComponent
      : barInnerComponent,
    patternId: item.patternId ?? patternId,
    barWidth: localBarWidth,
    barStyle,
    item,
    index,

    frontColor: localFrontColor,
    showGradient: item.showGradient ?? showGradient ?? false,
    gradientColor: isFocused
      ? focusedBarConfig?.gradientColor ?? localGradientColor
      : localGradientColor,
    opacity: isFocused
      ? focusedBarConfig?.opacity ?? localOpacity
      : localOpacity,
    height: barHeight,
    intactTopLabel,
    showValuesAsTopLabel: showValuesAsTopLabel ?? false,
    topLabelContainerStyle,
    topLabelTextStyle,
    yAxisOffset: yAxisOffset ?? 0
  }

  return {
    commonStyleForBar,
    barStyleWithBackground,
    commonPropsFor2Dand3Dbars,
    isFocused,
    focusedBarConfig,
    localFrontColor
  }
}
