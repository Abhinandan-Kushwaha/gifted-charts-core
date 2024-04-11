import { PieChartPropsType, pieDataItem } from './types';
import { LabelsPosition } from '../utils/types';
interface IsvgProps {
    height: number;
    width: number;
    viewBox: string;
}
interface IusePiePro {
    radius: number;
    total: number;
    donut?: boolean;
    strokeWidth: number;
    maxStrokeWidth: number;
    isAnimated?: boolean;
    animationDuration: number;
    initial: string;
    dInitial: string[];
    dFinal: string[];
    getStartCaps: (index: number, item: pieDataItem) => string;
    getEndCaps: (index: number, item: pieDataItem) => string;
    getTextCoordinates: (index: number, labelPos?: LabelsPosition) => {
        x: number;
        y: number;
    };
    labelsPosition: LabelsPosition;
    heightFactor: number;
    height: number;
    svgProps: IsvgProps;
}
export declare const usePiePro: (props: PieChartPropsType) => IusePiePro;
export {};
