import { type ColorValue } from 'react-native'
import { PointerEvents, type Pointer } from '../../utils/types'

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
  secondaryPointerItem?: any[]
  scrollX: number
  pointerEvents?: PointerEvents
  width: number
  screenWidth: number
  isBarChart: boolean
  pointerIndex: number
}
