import { type ColorValue } from 'react-native'
import { type FontStyle } from 'react-native-svg'
import { LabelLineConfig, LabelsPosition } from '../utils/types'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface PieChartPropsType {
  radius?: number
  isThreeD?: boolean
  donut?: boolean
  ring?: boolean
  innerRadius?: number
  shadow?: boolean
  innerCircleColor?: ColorValue
  innerCircleBorderWidth?: number
  innerCircleBorderColor?: ColorValue
  shiftInnerCenterX?: number
  shiftInnerCenterY?: number
  shadowColor?: string
  shadowWidth?: number
  strokeWidth?: number
  strokeColor?: string
  strokeDashArray?: number[]
  backgroundColor?: string
  data: pieDataItem[]
  semiCircle?: boolean

  showText?: boolean
  textColor?: string
  textSize?: number
  fontStyle?: FontStyle
  fontWeight?: string
  font?: string
  showTextBackground?: boolean
  textBackgroundColor?: string
  textBackgroundRadius?: number
  showValuesAsLabels?: boolean

  showTooltip?: boolean
  tooltipWidth?: number
  tooltipComponent?: Function
  persistTooltip?: boolean
  tooltipDuration?: number
  tooltipVerticalShift?: number
  tooltipHorizontalShift?: number
  showValuesAsTooltipText?: boolean
  tooltipTextNoOfLines?: number
  tooltipBackgroundColor?: ColorValue
  tooltipBorderRadius?: number

  centerLabelComponent?: Function
  tiltAngle?: string
  initialAngle?: number
  labelsPosition?: LabelsPosition
  showGradient?: boolean
  gradientCenterColor?: string
  onPress?: Function
  focusOnPress?: boolean
  toggleFocusOnPress?: boolean
  selectedIndex?: number
  setSelectedIndex?: Function
  sectionAutoFocus?: boolean
  onLabelPress?: Function
  extraRadius?: number
  inwardExtraLengthForFocused?: number
  pieInnerComponent?: (item?: pieDataItem, index?: number) => any
  pieInnerComponentHeight?: number
  pieInnerComponentWidth?: number
  paddingHorizontal?: number
  paddingVertical?: number
  endAngle?: number
  curvedStartEdges?: boolean
  curvedEndEdges?: boolean
  edgesRadius?: number
  isAnimated?: boolean
  animationDuration?: number
  focusedPieIndex?: number
  showExternalLabels?: boolean
  labelLineConfig?: LabelLineConfig
  externalLabelComponent?: (item?: pieDataItem, index?: number) => any
  /**
   * @description If true, the edges of the pie will be pressable, but you may need to press twice for focus- once for unfocusing the already focused pie and then for focusing the new pie
   */
  edgesPressable?: boolean
  rotatable?: boolean
}
export interface pieDataItem {
  value: number
  shiftX?: number
  shiftY?: number
  color?: string
  gradientCenterColor?: string
  tooltipText?: string
  tooltipComponent?: Function
  text?: string
  textColor?: string
  textSize?: number
  fontStyle?: FontStyle
  fontWeight?: string
  font?: string
  textBackgroundColor?: string
  textBackgroundRadius?: number
  shiftTextX?: number
  shiftTextY?: number
  shiftTextBackgroundX?: number
  shiftTextBackgroundY?: number
  labelPosition?: 'onBorder' | 'outward' | 'inward' | 'mid'
  onPress?: Function
  onLabelPress?: Function
  strokeWidth?: number
  strokeDashArray?: number[]
  strokeColor?: string
  focused?: boolean
  peripheral?: boolean
  pieInnerComponent?: (item?: pieDataItem, index?: number) => any
  isStartEdgeCurved?: boolean
  isEndEdgeCurved?: boolean
  startEdgeRadius?: number
  endEdgeRadius?: number
  labelLineConfig?: LabelLineConfig
  externalLabelComponent?: (item?: pieDataItem, index?: number) => any
}

export interface PieChartMainProps extends PieChartPropsType {
  setSelectedIndex: Function
  isBiggerPie?: boolean
  paddingHorizontal: number
  paddingVertical: number
  extraRadius: number
  setTouchX: Function
  setTouchY: Function

  tooltipSelectedIndex: number
  setTooltipSelectedIndex: any
}


export interface PieSliceCoordinates {
  sx: number
  sy: number
  ax: number
  ay: number
}

export type ResolvedPieLabelLineConfig = Required<LabelLineConfig>

export interface ExternalPieLabelProperties {
  labelLineColor: ColorValue
  labelLineThickness: number
  labelComponentHeight: number
  inX: number
  inY: number
  outX: number
  outY: number
  finalX: number
  labelComponentX: number
  labelComponentY: number
  localExternalLabelComponent:
    | ((item?: pieDataItem, index?: number) => ReactNode)
    | null
    | undefined
  isRightHalf: boolean
}

export interface PieChartMainReturnType {
  isThreeD: boolean | undefined
  isBiggerPie: boolean | undefined
  propData: pieDataItem[]
  data: pieDataItem[]
  itemHasInnerComponent: boolean
  showInnerComponent: boolean
  radius: number
  canvasWidth: number
  canvasHeight: number
  shadowWidth: number
  backgroundColor: string
  shadowColor: string
  semiCircle: boolean
  pi: number
  initialAngle: number
  shadow: boolean
  donut: boolean
  strokeWidth: number
  strokeColor: string
  innerRadius: number
  showTooltip: boolean | undefined
  tooltipWidth: number | undefined
  persistTooltip: boolean | undefined
  tooltipDuration: number
  tooltipComponent: Function | undefined
  tooltipVerticalShift: number
  tooltipHorizontalShift: number
  showValuesAsTooltipText: boolean
  tooltipTextNoOfLines: number
  tooltipBackgroundColor: ColorValue
  tooltipBorderRadius: number
  tooltipSelectedIndex: number
  setTooltipSelectedIndex: Dispatch<SetStateAction<number>>
  showText: boolean
  textColor: string
  textSize: number
  tiltAngle: string
  labelsPosition: LabelsPosition
  showTextBackground: boolean
  textBackgroundColor: string
  showValuesAsLabels: boolean
  showGradient: boolean
  gradientCenterColor: string
  toggleFocusOnPress: boolean
  minShiftX: number
  maxShiftX: number
  minShiftY: number
  maxShiftY: number
  total: number
  horizAdjustment: number
  vertAdjustment: number
  cx: number
  cy: number
  pData: number[]
  mData: number[]
  acc: number
  paddingHorizontal: number
  paddingVertical: number
  extraRadius: number
  showExternalLabels: boolean | undefined
  labelLineConfig: ResolvedPieLabelLineConfig
  externalLabelComponent:
    | ((item?: pieDataItem, index?: number) => ReactNode)
    | undefined
  getExternaLabelProperties: (
    item: pieDataItem,
    mx: number,
    my: number,
    cx: number,
    cy: number,
    prevSide: string,
    prevLabelComponentX: number,
    isLast?: boolean,
    wasFirstItemOnPole?: boolean
  ) => ExternalPieLabelProperties
  coordinates: PieSliceCoordinates[]
  onPressed: (item: pieDataItem, index: number) => void
  font: string | undefined
  fontWeight: string | undefined
  fontStyle: FontStyle | undefined
  edgesPressable: boolean | undefined
}

