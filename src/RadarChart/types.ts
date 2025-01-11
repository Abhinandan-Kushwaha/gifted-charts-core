export interface GridConfig extends StrokeFillAndGradient {
  gridSections?: GridSectionConfig[]
}

export interface LabelConfig {
  fontSize?: number
  stroke?: string
  textAnchor?: string
  alignmentBaseline?: string
  fontWeight?: string
  fontFamily?: string
}

export interface RadarChartProps {
  circular?: boolean
  gridConfig?: GridConfig
  data?: number[]
  dataSet?: number[][]
  maxValue?: number
  noOfSections?: number
  chartSize?: number
  labelConfig?: LabelConfig
  labelConfigArray?: LabelConfig[]
  labels?: string[]
  dataLabels?: string[]
  dataLabelsArray?: string[][]
  dataLabelConfig?: LabelConfig
  dataLabelsConfigArray?: LabelConfig[]
  polygonConfig?: PolygonConfig
  polygonConfigArray?: PolygonConfig[]
  asterLinesConfig?: AsterLinesConfig
  hideAsterLines?: boolean
  hideGrid?: boolean
  hideLabels?: boolean
  dataLabelsConfig?: LabelConfig
  dataLabelsConfigSet?: LabelConfig[][]
  labelsPositionOffset?: number
  dataLabelsPositionOffset?: number
  isAnimated?: boolean
  animationDuration?: number
  animateTogether?: boolean
}

export interface StrokeConfig {
  stroke?: string
  strokeWidth?: number
  strokeDashArray?: number[]
}

export interface StrokeFillAndGradient extends StrokeConfig {
  fill?: string
  gradientColor?: string
  showGradient?: boolean
  opacity?: number
  gradientOpacity?: number
}

export interface PolygonConfig extends StrokeFillAndGradient {
  showDataValuesAsLabels?: boolean
  isAnimated?: boolean
  animationDuration?: number
}

export interface GridSectionConfig extends StrokeFillAndGradient {}

export interface AsterLinesConfig extends StrokeConfig {}
