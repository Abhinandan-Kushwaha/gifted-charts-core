import { ViewStyle } from "react-native";
import { getBarFrontColor, getBarWidth } from "../utils";
import { CommonPropsFor2Dand3DbarsType } from "./types";

export const getPropsForAnimated2DWithGradient = (props) => {
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
    localBarInnerComponent,
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
  } = props;

  const isFocused = focusBarOnPress && selectedIndex === index;
  const localBarBorderRadius = item.barBorderRadius ?? barBorderRadius ?? 0;
  const localBarWidth = getBarWidth(
    isFocused,
    focusedBarConfig,
    item.barWidth,
    barWidth
  );
  const localFrontColor = getBarFrontColor(
    isFocused,
    focusedBarConfig,
    item.frontColor,
    frontColor
  );
  const localGradientColor = item.gradientColor || gradientColor;
  const localOpacity = opacity || 1;

  const commonStyleForBar: ViewStyle[] = [
    {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderWidth: barBorderWidth ?? 0,
      borderColor: barBorderColor,
      borderRadius: isFocused
        ? focusedBarConfig?.borderRadius ?? localBarBorderRadius
        : localBarBorderRadius,
      borderTopLeftRadius:
        item.barBorderTopLeftRadius ??
        barBorderTopLeftRadius ??
        item.barBorderRadius ??
        barBorderRadius,
      borderTopRightRadius:
        item.barBorderTopRightRadius ??
        barBorderTopRightRadius ??
        item.barBorderRadius ??
        barBorderRadius,
      borderBottomLeftRadius:
        item.barBorderBottomLeftRadius ??
        barBorderBottomLeftRadius ??
        item.barBorderRadius ??
        barBorderRadius,
      borderBottomRightRadius:
        item.barBorderBottomRightRadius ??
        barBorderBottomRightRadius ??
        item.barBorderRadius ??
        barBorderRadius,
    },
  ];

  if (roundedBottom || (isFocused && focusedBarConfig?.roundedBottom)) {
    commonStyleForBar.push({
      borderBottomLeftRadius: localBarWidth / 2,
      borderBottomRightRadius: localBarWidth / 2,
    });
  }

  if (cappedBars) {
    commonStyleForBar.push({
      borderTopLeftRadius:
        item.capRadius === 0 ? 0 : item.capRadius || capRadius || 0,
      borderTopRightRadius:
        item.capRadius === 0 ? 0 : item.capRadius || capRadius || 0,
    });
  }

  if (roundedTop || (isFocused && focusedBarConfig?.roundedTop)) {
    commonStyleForBar.push({
      borderTopLeftRadius: localBarWidth / 2,
      borderTopRightRadius: localBarWidth / 2,
    });
  }
  const barStyleWithBackground: ViewStyle[] = [
    ...commonStyleForBar,
    {
      backgroundColor: localFrontColor,
    },
  ];

  const commonPropsFor2Dand3Dbars: CommonPropsFor2Dand3DbarsType = {
    barBackgroundPattern: item.barBackgroundPattern || barBackgroundPattern,
    barInnerComponent: isFocused
      ? focusedBarConfig?.barInnerComponent ?? localBarInnerComponent
      : localBarInnerComponent,
    patternId: item.patternId || patternId,
    barWidth: localBarWidth,
    barStyle: barStyle,
    item: item,
    index: index,

    frontColor: localFrontColor,
    showGradient: item.showGradient || showGradient || false,
    gradientColor: isFocused
      ? focusedBarConfig?.gradientColor ?? localGradientColor
      : localGradientColor,
    opacity: isFocused
      ? focusedBarConfig?.opacity ?? localOpacity
      : localOpacity,
    height: barHeight,
    intactTopLabel,
    showValuesAsTopLabel: !!showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
  };

  return {
    commonStyleForBar,
    barStyleWithBackground,
    commonPropsFor2Dand3Dbars,
    isFocused,
    focusedBarConfig,
    localFrontColor,
  };
};
