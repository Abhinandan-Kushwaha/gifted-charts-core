import { type animatedBarPropTypes } from '../../BarChart/types';
export declare const useAnimatedThreeDBar: (props: animatedBarPropTypes) => {
    showGradient: boolean;
    gradientColor: any;
    frontColor: import("react-native").ColorValue;
    sideColor: import("react-native").ColorValue;
    topColor: import("react-native").ColorValue;
    opacity: number;
    initialRender: boolean | undefined;
    setInitialRender: import("react").Dispatch<import("react").SetStateAction<boolean | undefined>>;
};
