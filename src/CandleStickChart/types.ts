import { ColorValue, StyleProp, ViewStyle } from 'react-native'
import { BarChartPropsType, barDataItem } from '../BarChart/types'

export interface candleStickDataItem extends Omit<
  barDataItem,
  'value | stacks | frontColor'
> {
  open: number
  close: number
  high: number
  low: number
  color?: ColorValue
  bottomLabelComponent?: Function
  bottomLabelContainerStyle?: StyleProp<ViewStyle>
  bottomLabelComponentHeight?: number
}
export interface CandleStickChartPropsType extends Omit<
  BarChartPropsType,
  'data' | 'stackData'
> {
  data: candleStickDataItem[]
  showValuesAsBottomLabel?: boolean
  parentWidth?: number
  bullishColor?: ColorValue
  bearishColor?: ColorValue
  bullishBarWidth?: number
  bearishBarWidth?: number
  bullishBorderColor?: ColorValue
  bearishBorderColor?: ColorValue
  bullishBorderWidth?: number
  bearishBorderWidth?: number
  bullishBorderRadius?: number
  bearishBorderRadius?: number
  bullishVerticalLineColor?: ColorValue
  bearishVerticalLineColor?: ColorValue
}
