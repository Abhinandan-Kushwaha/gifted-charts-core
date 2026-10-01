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
  onLeftPress?: (item: popnPyramidDataItem, index: number) => void
  onRightPress?: (item: popnPyramidDataItem, index: number) => void
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


export type UsePopulationPyramidReturnType = {
  data: popnPyramidDataItem[] | popnPyramidDataItemReactJS[]
  xAxisType: string | RuleTypes
  verticalLinesType: string | RuleTypes
  rulesType: string | RuleTypes
  xAxisLabelFontStyle: FontStyle
  yAxisLabelFontStyle: FontStyle
  leftBarLabelFontStyle: FontStyle
  rightBarLabelFontStyle: FontStyle
  midAxisLabelFontStyle: FontStyle
  xAxisLabelFontWeight: FontWeight
  yAxisLabelFontWeight: FontWeight
  leftBarLabelFontWeight: FontWeight
  rightBarLabelFontWeight: FontWeight
  midAxisLabelFontWeight: FontWeight
  verticalLinesStrokeDashArray: string | number[]
  yAxisLabelTexts: string[]
  yAxisLineProps: RulesPropsType
  midAxisLineCommonProps: RulesPropsType
  verticalLinesCommonProps: RulesPropsType
  xAxisIndicesCommonProps: {
    y1: number
    y2: number
    stroke: ColorValue
    strokeWidth: number
  }
  xAxisLabelsCommonProps: {
    y: number
    stroke: ColorValue
    fontSize: number
    fontStyle: FontStyle
    fontWeight: FontWeight
    fontFamily: string
  }
  formatXAxisLabels: ((label: string) => string) | undefined
  formatBarLabels: ((label: string) => string) | undefined
  getXLabel: (index: number) => string
} & Record<
  | 'height'
  | 'width'
  | 'verticalMarginBetweenBars'
  | 'yAxisThickness'
  | 'xAxisThickness'
  | 'xAxisNoOfSections'
  | 'xAxisIndicesWidth'
  | 'xAxisIndicesHeight'
  | 'xAxisIndicesShiftY'
  | 'xAxisLabelFontSize'
  | 'xAxisLabelShiftX'
  | 'xAxisLabelShiftY'
  | 'verticalLinesThickness'
  | 'yAxisIndicesWidth'
  | 'yAxisIndicesHeight'
  | 'yAxisLabelFontSize'
  | 'yAxisLabelTextMarginRight'
  | 'rulesThickness'
  | 'dashWidth'
  | 'dashGap'
  | 'leftBarLabelWidth'
  | 'leftBarLabelFontSize'
  | 'rightBarLabelWidth'
  | 'rightBarLabelFontSize'
  | 'midAxisLabelWidth'
  | 'midAxisLabelFontSize'
  | 'leftBarBorderWidth'
  | 'rightBarBorderWidth'
  | 'leftBarBorderRadius'
  | 'rightBarBorderRadius'
  | 'leftSurplusBorderWidth'
  | 'rightSurplusBorderWidth'
  | 'yAxisLabelWidth'
  | 'noOfSections'
  | 'containerHeight'
  | 'stepHeight'
  | 'xAxisLabelsHeight'
  | 'containerHeightWithXaxisLabels'
  | 'mid'
  | 'leftMax'
  | 'rightMax'
  | 'max'
  | 'xAxisRoundToDigits'
  | 'midAxisAndLabelWidth'
  | 'barWidthFactor'
  | 'leftXAfterMid'
  | 'rightXAfterMid'
  | 'xAxisLabelY',
  number
> & Record<
  | 'barsMapToYAxisSections'
  | 'hideRules'
  | 'hideYAxisText'
  | 'showXAxisIndices'
  | 'showXAxisLabelTexts'
  | 'showVerticalLines'
  | 'showYAxisIndices'
  | 'showValuesAsBarLabels'
  | 'showMidAxis'
  | 'allCornersRounded'
  | 'showSurplus'
  | 'showSurplusLeft'
  | 'showSurplusRight',
  boolean
> & Record<
  | 'yAxisColor'
  | 'xAxisColor'
  | 'xAxisIndicesColor'
  | 'xAxisLabelColor'
  | 'verticalLinesColor'
  | 'yAxisIndicesColor'
  | 'yAxisLabelColor'
  | 'rulesColor'
  | 'leftBarLabelColor'
  | 'rightBarLabelColor'
  | 'midAxisLabelColor'
  | 'leftBarColor'
  | 'rightBarColor'
  | 'leftBarBorderColor'
  | 'rightBarBorderColor'
  | 'leftSurplusColor'
  | 'leftSurplusBorderColor'
  | 'rightSurplusColor'
  | 'rightSurplusBorderColor',
  ColorValue
> & Record<
  | 'xAxisLabelFontFamily'
  | 'xAxisLabelPrefix'
  | 'xAxisLabelSuffix'
  | 'yAxisLabelFontFamily'
  | 'leftBarLabelFontFamily'
  | 'leftBarLabelPrefix'
  | 'leftBarLabelSuffix'
  | 'rightBarLabelFontFamily'
  | 'rightBarLabelPrefix'
  | 'rightBarLabelSuffix'
  | 'midAxisLabelFontFamily',
  string
>
