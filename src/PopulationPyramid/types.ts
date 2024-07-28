import { type ColorValue } from 'react-native'
import { type Linecap, type Framework, type RuleTypes } from '../utils/types'
import { type FontStyle, type FontWeight } from 'react-native-svg'

export interface popnPyramidDataItem {
  left: number
  right: number
  leftBarColor?: ColorValue
  rightBarColor?: ColorValue
  leftBarBorderColor?: ColorValue
  rightBarBorderColor?: ColorValue
  barBorderWidth?: number
  leftBarBorderWidth?: number
  rightBarBorderWidth?: number
  barBorderRadius?: number
  leftBarBorderRadius?: number
  rightBarBorderRadius?: number

  barLabelWidth?: number
  barLabelFontSize?: number
  barLabelColor?: ColorValue
  barLabelFontStyle?: FontStyle
  barLabelFontWeight?: FontWeight
  barLabelFontFamily?: string

  leftBarLabel?: string
  leftBarLabelWidth?: number
  leftBarLabelFontSize?: number
  leftBarLabelColor?: ColorValue
  leftBarLabelFontStyle?: FontStyle
  leftBarLabelFontWeight?: FontWeight
  leftBarLabelFontFamily?: string
  leftBarLabelShift?: number

  rightBarLabel?: string
  rightBarLabelWidth?: number
  rightBarLabelFontSize?: number
  rightBarLabelColor?: ColorValue
  rightBarLabelFontStyle?: FontStyle
  rightBarLabelFontWeight?: FontWeight
  rightBarLabelFontFamily?: string
  rightBarLabelShift?: number

  yAxisLabel?: string
  midAxisLabel?: string
  midAxisLabelFontSize?: number
  midAxisLabelColor?: ColorValue
  midAxisLabelFontStyle?: FontStyle
  midAxisLabelFontWeight?: FontWeight
  midAxisLabelFontFamily?: string

  showSurplus?: boolean
  showSurplusLeft?: boolean
  showSurplusRight?: boolean
  leftSurplusColor?: ColorValue
  leftSurplusBorderColor?: ColorValue
  rightSurplusColor?: ColorValue
  rightSurplusBorderColor?: ColorValue
  leftSurplusBorderWidth?: number
  rightSurplusBorderWidth?: number
}

export type popnPyramidDataItemReactJS = popnPyramidDataItem & {
  leftBarColor?: string
  rightBarColor?: string
  leftBarBorderColor?: string
  rightBarBorderColor?: string
  barLabelColor?: string
  leftBarLabelColor?: string
  rightBarLabelColor?: string
  midAxisLabelColor?: string
  leftSurplusColor?: string
  leftSurplusBorderColor?: string
  rightSurplusColor?: string
  rightSurplusBorderColor?: string
}

export interface RulesProps {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  stroke?: ColorValue
  strokeWidth?: number
  strokeDasharray?: number[] | string
  strokeLinecap?: Linecap
}

export type RulesPropsReactJS = RulesProps & {
  stroke?: string
}

export interface PopulationPyramidPropsType {
  height?: number
  width?: number
  data: popnPyramidDataItem[]
  hideRules?: boolean
  stepHeight?: number
  verticalMarginBetweenBars?: number
  hideYAxisText?: boolean
  yAxisLabelWidth?: number
  yAxisColor?: ColorValue
  yAxisThickness?: number
  yAxisStrokeDashArray?: number[] | string
  xAxisColor?: ColorValue
  xAxisThickness?: number
  xAxisType?: RuleTypes
  xAxisNoOfSections?: number
  showXAxisIndices?: boolean
  xAxisIndicesWidth?: number
  xAxisIndicesHeight?: number
  xAxisIndicesColor?: ColorValue
  xAxisIndicesShiftY?: number
  showXAxisLabelTexts?: boolean
  xAxisLabelFontSize?: number
  xAxisLabelColor?: ColorValue
  xAxisLabelFontStyle?: FontStyle
  xAxisLabelFontWeight?: FontWeight
  xAxisLabelFontFamily?: string
  xAxisLabelShiftX?: number
  xAxisLabelShiftY?: number
  xAxisRoundToDigits?: number
  xAxisLabelPrefix?: string
  xAxisLabelSuffix?: string
  formatXAxisLabels?: (label: string) => string

  showVerticalLines?: boolean
  verticalLinesColor?: ColorValue
  verticalLinesThickness?: number
  verticalLinesType?: RuleTypes
  verticalLinesStrokeDashArray?: number[] | string
  verticalLinesStrokeLinecap?: Linecap

  noOfSections?: number
  barsMapToYAxisSections?: boolean

  showYAxisIndices?: boolean
  yAxisIndicesWidth?: number
  yAxisIndicesHeight?: number
  yAxisIndicesColor?: ColorValue
  yAxisLabelColor?: ColorValue
  yAxisLabelFontSize?: number
  yAxisLabelTextMarginRight?: number
  yAxisLabelTexts?: string[]
  yAxisLabelFontStyle?: FontStyle
  yAxisLabelFontWeight?: FontWeight
  yAxisLabelFontFamily?: string

  showValuesAsBarLabels?: boolean

  rulesThickness?: number
  rulesColor?: ColorValue
  rulesType?: RuleTypes
  dashWidth?: number
  dashGap?: number

  showMidAxis?: boolean
  midAxisThickness?: number
  midAxisLabelWidth?: number
  midAxisColor?: ColorValue
  midAxisLeftColor?: ColorValue
  midAxisRightColor?: ColorValue
  midAxisStrokeDashArray?: number[] | string
  midAxisLabelFontSize?: number
  midAxisLabelColor?: ColorValue
  midAxisLabelFontStyle?: FontStyle
  midAxisLabelFontWeight?: FontWeight
  midAxisLabelFontFamily?: string

  barLabelWidth?: number
  barLabelFontSize?: number
  barLabelColor?: ColorValue
  barLabelFontStyle?: FontStyle
  barLabelFontWeight?: FontWeight
  barLabelFontFamily?: string

  leftBarLabelWidth?: number
  leftBarLabelFontSize?: number
  leftBarLabelColor?: ColorValue
  leftBarLabelFontStyle?: FontStyle
  leftBarLabelFontWeight?: FontWeight
  leftBarLabelFontFamily?: string
  leftBarLabelShift?: number
  leftBarLabelPrefix?: string
  leftBarLabelSuffix?: string

  rightBarLabelWidth?: number
  rightBarLabelFontSize?: number
  rightBarLabelColor?: ColorValue
  rightBarLabelFontStyle?: FontStyle
  rightBarLabelFontWeight?: FontWeight
  rightBarLabelFontFamily?: string
  rightBarLabelShift?: number
  rightBarLabelPrefix?: string
  rightBarLabelSuffix?: string
  formatBarLabels?: (label: string) => string

  leftBarColor?: ColorValue
  rightBarColor?: ColorValue
  leftBarBorderColor?: ColorValue
  rightBarBorderColor?: ColorValue
  barBorderWidth?: number
  leftBarBorderWidth?: number
  rightBarBorderWidth?: number
  barBorderRadius?: number
  leftBarBorderRadius?: number
  rightBarBorderRadius?: number
  allCornersRounded?: boolean

  showSurplus?: boolean
  showSurplusLeft?: boolean
  showSurplusRight?: boolean
  leftSurplusColor?: ColorValue
  leftSurplusBorderColor?: ColorValue
  rightSurplusColor?: ColorValue
  rightSurplusBorderColor?: ColorValue
  leftSurplusBorderWidth?: number
  rightSurplusBorderWidth?: number
}

export type PopulationPyramidPropsTypeReactJS = PopulationPyramidPropsType & {
  data: popnPyramidDataItemReactJS[]
  yAxisColor?: string
  xAxisColor?: string
  xAxisIndicesColor?: string
  xAxisLabelColor?: string
  verticalLinesColor?: string
  yAxisIndicesColor?: string
  yAxisLabelColor?: string
  rulesColor?: string
  midAxisColor?: string
  midAxisLeftColor?: string
  midAxisRightColor?: string
  midAxisLabelColor?: string
  barLabelColor?: string
  leftBarLabelColor?: string
  rightBarLabelColor?: string
  leftBarColor?: string
  rightBarColor?: string
  leftBarBorderColor?: string
  rightBarBorderColor?: string
  leftSurplusColor?: string
  leftSurplusBorderColor?: string
  rightSurplusColor?: string
  rightSurplusBorderColor?: string
}

export type RulesPropsType =
  | ({ framework: Framework.reactJS } & RulesPropsReactJS)
  | ({ framework?: Framework.reactNative } & RulesProps)

export type TPopulationPyramidPropsType =
  | ({ framework: Framework.reactJS } & PopulationPyramidPropsTypeReactJS)
  | ({ framework?: Framework.reactNative } & PopulationPyramidPropsType)

export type extendedPopulationPyramidPropsType = TPopulationPyramidPropsType & {
  screenWidth: number
}
