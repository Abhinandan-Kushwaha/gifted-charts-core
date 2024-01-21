import { useState } from "react";
import { animatedBarPropTypes } from "../../BarChart/types";
import { BarDefaults } from "../../utils/constants";

export const useAnimatedThreeDBar = (props: animatedBarPropTypes) => {
  const {
    isAnimated,
    showGradient = props.showGradient || false,
    gradientColor = props.gradientColor || BarDefaults.threeDBarGradientColor,
    frontColor = props.frontColor || BarDefaults.threeDBarFrontColor,
    sideColor = props.sideColor || BarDefaults.threeDBarSideColor,
    topColor = props.topColor || BarDefaults.threeDBarTopColor,
    opacity = props.opacity || 1,
  } = props;

  const [initialRender, setInitialRender] = useState(isAnimated);

  return {
    showGradient,
    gradientColor,
    frontColor,
    sideColor,
    topColor,
    opacity,
    initialRender,
    setInitialRender,
  };
};
