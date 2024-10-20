import { type ColorValue } from 'react-native'
import {
  PointerEvents,
  type Pointer,
  HorizontalStripConfig
} from '../../utils/types'

export interface StripAndLabelProps {
  autoAdjustPointerLabelPosition: boolean
  pointerX: number
  pointerLabelWidth: number
  activatePointersOnLongPress: boolean
  yAxisLabelWidth: number
  pointerRadius: number
  pointerWidth: number
  shiftPointerLabelX: number
  pointerLabelHeight: number
  pointerYLocal: number
  pointerStripUptoDataPoint: boolean
  pointerStripHeight: number
  shiftPointerLabelY: number
  pointerItemLocal: any[]
  showPointerStrip: boolean
  pointerStripWidth: number
  containerHeight: number
  xAxisThickness: number
  pointerStripColor: ColorValue
  pointerConfig?: Pointer
  pointerLabelComponent: Function | null
  secondaryPointerItem?: any
  pointerItemsForSet?: any[]
  secondaryPointerItemsForSet?: any[]
  hasDataSet?: boolean
  scrollX: number
  pointerEvents?: PointerEvents
  width: number
  screenWidth: number
  isBarChart: boolean
  pointerIndex: number
  containsNegative: boolean
  horizontalStripConfig?: HorizontalStripConfig
}
