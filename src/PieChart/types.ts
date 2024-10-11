import { type ColorValue } from 'react-native'
import { type FontStyle } from 'react-native-svg'
import { LabelLineConfig, LabelsPosition } from '../utils/types'

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
  startAngle?: number
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
}
