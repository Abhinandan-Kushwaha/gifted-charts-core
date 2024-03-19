import { type pieDataItem, type PieChartPropsType } from './types';
import { type ColorValue } from 'react-native';
import { LabelsPosition } from '../utils/types';
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
    isAnimated: boolean;
    animationDuration: number;
    initial: string;
    dInitial: string[];
    dFinal: string[];
    isAnimating: boolean;
    getStartCaps: (index: number, item: pieDataItem) => string;
    getEndCaps: (index: number, item: pieDataItem) => string;
    getTextCoordinates: (index: number, labelPos?: LabelsPosition) => {
        x: number;
        y: number;
    };
}
interface IPieChartPropsType extends PieChartPropsType {
    pro?: boolean;
}
export declare const usePieChart: (props: IPieChartPropsType) => IusePieChart;
export {};
