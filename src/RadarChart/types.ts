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
  maxValue?: number
  noOfSections?: number
  chartSize?: number
  labelConfig?: LabelConfig
  labelConfigArray?: LabelConfig[]
  labels?: string[]
  dataLabels?: string[]
  dataLabelConfig?: LabelConfig
  dataLabelConfigArray?: LabelConfig[]
  showdataValuesAsLabels?: boolean
  polygonConfig?: PolygonConfig
  asterLinesConfig?: AsterLinesConfig
  hideAsterLines?: boolean
  hideGrid?: boolean
  hideLabels?: boolean
  dataLabelsConfig?: LabelConfig
  labelsPositionOffset?: number
  dataLabelsPositionOffset?: number
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

export interface PolygonConfig extends StrokeFillAndGradient {}

export interface GridSectionConfig extends StrokeFillAndGradient {}

export interface AsterLinesConfig extends StrokeConfig {}
