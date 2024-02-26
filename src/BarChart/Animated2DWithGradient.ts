import { ColorValue, ViewStyle } from "react-native";
import { getBarFrontColor, getBarWidth } from "../utils";
import { Pointer } from "../utils/types";
import { CommonPropsFor2Dand3DbarsType, FocusedBarConfig, barDataItem } from "./types";

export type RenderBarsPropsType = {
  style?: any;
  width?: number;
  height?: number;
  minHeight: number;
  color?: ColorValue;
  showGradient?: boolean;
  gradientColor?: any;
  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  topLabelComponent?: React.ReactNode;
  topLabelContainerStyle?: any;
  topLabelTextStyle?: any;
  opacity?: number;
  side?: string;
  labelTextStyle?: any;

  item: barDataItem;
  index: number;
  label: string;
  containerHeight?: number;
  maxValue: number;
  spacing: number;
  propSpacing?: number;
  data?: any;
  barHeight: number;
  barWidth?: number;
  sideWidth?: number;
  labelWidth?: number;

  isThreeD?: boolean;
  isAnimated?: boolean;
  rotateLabel?: boolean;
  animatedHeight?: any;
  appearingOpacity?: any;
  animationDuration?: number;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  disablePress?: boolean;
  activeOpacity?: number;
  cappedBars?: boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  showXAxisIndices: boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;
  horizontal: boolean;
  rtl: boolean;
  intactTopLabel: boolean;
  showValuesAsTopLabel?: boolean;
  barBorderWidth?: number;
  barBorderColor: ColorValue;
  barBorderRadius?: number;
  barBorderTopLeftRadius?: number;
  barBorderTopRightRadius?: number;
  barBorderBottomLeftRadius?: number;
  barBorderBottomRightRadius?: number;
  barInnerComponent?: (item?: barDataItem, index?: number) => React.ReactNode;
  autoShiftLabels?: boolean;
  barBackgroundPattern?: Function;
  patternId?: string;
  barMarginBottom?: number;
  onPress?: Function;
  onLongPress?: Function;
  onPressOut?: Function;
  xAxisTextNumberOfLines: number;
  xAxisLabelsHeight?: number;
  xAxisLabelsVerticalShift: number;
  renderTooltip: Function | undefined;
  leftShiftForTooltip?: number;
  leftShiftForLastIndexTooltip: number;
  initialSpacing: number;
  selectedIndex: number;
  setSelectedIndex: Function;
  barStyle?: object;
  xAxisThickness?: number;
  pointerConfig?: Pointer;
  focusBarOnPress?: boolean;
  noOfSectionsBelowXAxis?: number;
  focusedBarConfig?: FocusedBarConfig;
};

export const getPropsForAnimated2DWithGradient = <T extends RenderBarsPropsType,>(props: T) => {
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
    focusBarOnPress = false,
    focusedBarConfig,
    isThreeD,
  } = props;

  const isFocused = focusBarOnPress && selectedIndex === index;
  const itemOrPropsBarBorderRadius =
    item.barBorderRadius ?? barBorderRadius ?? 0;
  const localBarBorderRadius = isFocused
    ? focusedBarConfig?.borderRadius ?? itemOrPropsBarBorderRadius
    : itemOrPropsBarBorderRadius;
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
    frontColor,
    isThreeD
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
        localBarBorderRadius,
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

  const commonPropsFor2Dand3Dbars = {
    barBackgroundPattern: item.barBackgroundPattern || barBackgroundPattern,
    barInnerComponent: isFocused && focusedBarConfig?.barInnerComponent
      ? focusedBarConfig.barInnerComponent
      : barInnerComponent,
    patternId: item.patternId || patternId || '',
    barWidth: localBarWidth,
    barStyle,
    item,
    index,

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
  } satisfies CommonPropsFor2Dand3DbarsType;

  return {
    commonStyleForBar,
    barStyleWithBackground,
    commonPropsFor2Dand3Dbars,
    isFocused,
    focusedBarConfig,
    localFrontColor,
  };
};
