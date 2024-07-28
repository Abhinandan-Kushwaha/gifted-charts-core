import { type StackedBarChartPropsType, type stackDataItem } from './types';
export declare const useRenderStackBars: (props: StackedBarChartPropsType) => {
    cotainsNegative: boolean;
    noAnimation: boolean;
    localBarInnerComponent: ((item?: stackDataItem, index?: number) => import("react").ReactNode) | undefined;
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
    tooltipProps: {
        barHeight: number;
        barWidth: number;
        item: stackDataItem;
        index: number;
        isLast: boolean;
        leftSpacing: number;
        leftShiftForLastIndexTooltip: number;
        leftShiftForTooltip: number;
        renderTooltip: Function | undefined;
        autoCenterTooltip: boolean | undefined;
        horizontal: boolean;
    };
};
