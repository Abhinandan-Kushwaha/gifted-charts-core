import { ViewStyle } from "react-native";

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
  } = props;

  const commonStyleForBar: ViewStyle[] = [
    {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderWidth: barBorderWidth ?? 0,
      borderColor: barBorderColor,
      borderRadius: item.barBorderRadius ?? barBorderRadius ?? 0,
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

  if (roundedBottom) {
    commonStyleForBar.push({
      borderBottomLeftRadius: (item.barWidth || barWidth || 30) / 2,
      borderBottomRightRadius: (item.barWidth || barWidth || 30) / 2,
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

  if (roundedTop) {
    commonStyleForBar.push({
      borderTopLeftRadius: (item.barWidth || barWidth || 30) / 2,
      borderTopRightRadius: (item.barWidth || barWidth || 30) / 2,
    });
  }
  const barStyleWithBackground: ViewStyle[] = [
    ...commonStyleForBar,
    {
      backgroundColor: item.frontColor || props.frontColor || "black",
    },
  ];

  const commonPropsFor2Dand3Dbars = {
    barBackgroundPattern: item.barBackgroundPattern || barBackgroundPattern,
    barInnerComponent: localBarInnerComponent,
    patternId: item.patternId || patternId,
    width: item.barWidth || barWidth || 30,
    barStyle: barStyle,
    item: item,
    index: index,

    frontColor: item.frontColor || frontColor || "",
    showGradient: item.showGradient || showGradient || false,
    gradientColor: item.gradientColor || gradientColor,
    opacity: opacity || 1,
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
  };
};
