/// <reference types="react" />
import { type StackedBarChartPropsType, type stackDataItem } from './types';
export declare const useRenderStackBars: (props: StackedBarChartPropsType) => {
    cotainsNegative: boolean;
    noAnimation: boolean;
    localBarInnerComponent: ((item?: stackDataItem | undefined, index?: number | undefined) => import("react").ReactNode) | undefined;
    borderRadius: number | undefined;
    borderTopLeftRadius: number | undefined;
    borderTopRightRadius: number | undefined;
    borderBottomLeftRadius: number | undefined;
    borderBottomRightRadius: number | undefined;
    leftSpacing: number;
    disablePress: boolean;
    totalHeight: number;
    height: number;
    setHeight: import("react").Dispatch<import("react").SetStateAction<number>>;
    getBarHeight: (value: number, marginBottom?: number) => number;
    getPosition: (index: number) => number;
    getLowestPosition: () => number;
    lowestBarPosition: number;
    getStackBorderRadii: (item: stackDataItem, index: number) => {
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
        borderBottomLeftRadius: number;
        borderBottomRightRadius: number;
    };
};
