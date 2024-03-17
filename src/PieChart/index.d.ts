import { type pieDataItem, type PieChartPropsType } from './types';
import { type ColorValue } from 'react-native';
interface IusePieChart {
    radius: number;
    extraRadiusForFocused: number;
    pi: number;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    startAngle: number;
    endAngle: number;
    setStartAngle: (angle: number) => void;
    total: number;
    setTotal: (total: number) => void;
    data: pieDataItem[];
    donut?: boolean;
    isThreeD?: boolean;
    semiCircle?: boolean;
    inwardExtraLengthForFocused: number;
    canvasWidth: number;
    canvasHeight: number;
    strokeWidth: number;
    innerRadius: number;
    innerCircleColor: ColorValue;
    innerCircleBorderWidth: number;
    innerCircleBorderColor: ColorValue;
    shiftInnerCenterX: number;
    shiftInnerCenterY: number;
    tiltAngle: string;
    isDataShifted: boolean;
    paddingHorizontal: number;
    paddingVertical: number;
}
interface IPieChartPropsType extends PieChartPropsType {
    pro?: boolean;
}
export declare const usePieChart: (props: IPieChartPropsType) => IusePieChart;
export {};
