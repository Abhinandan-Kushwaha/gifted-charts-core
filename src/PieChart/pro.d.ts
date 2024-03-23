import { PieChartPropsType, pieDataItem } from './types';
import { LabelsPosition } from '../utils/types';
interface IusePiePro {
    radius: number;
    total: number;
    donut?: boolean;
    strokeWidth: number;
    isAnimated?: boolean;
    animationDuration: number;
    initial: string;
    dInitial: string[];
    dFinal: string[];
    isAnimating?: boolean;
    getStartCaps: (index: number, item: pieDataItem) => string;
    getEndCaps: (index: number, item: pieDataItem) => string;
    getTextCoordinates: (index: number, labelPos?: LabelsPosition) => {
        x: number;
        y: number;
    };
    labelsPosition: LabelsPosition;
}
export declare const usePiePro: (props: PieChartPropsType) => IusePiePro;
export {};
