import { radarChartDefaults } from '../utils/constants'
import { GridConfig, RadarChartProps } from './types'

export const useRadarChart = (props: RadarChartProps) => {
  const {
    circular = false,
    gridConfig = {},
    polygonConfig = {},
    data = radarChartDefaults.data,
    noOfSections = radarChartDefaults.noOfSections,
    chartSize = radarChartDefaults.chartSize,
    labelConfig = {},
    labelConfigArray,
    asterLinesConfig = {},
    hideGrid = radarChartDefaults.hideGrid,
    hideAsterLines = props.hideGrid ?? radarChartDefaults.hideAsterLines,
    showdataValuesAsLabels,
    dataLabelsConfig = {},
    dataLabelConfigArray,
    labelsPositionOffset = radarChartDefaults.labelsPositionOffset,
    dataLabelsPositionOffset = radarChartDefaults.dataLabelsPositionOffset
  } = props

  const labels =
    props.labels ?? data?.map((_, index) => `Label${index + 1}`) ?? []

  const maxValue = props.maxValue ?? Math.max(...data)

  const dataLabels =
    props.dataLabels ??
    (showdataValuesAsLabels ? data.map((d) => d.toString()) : null)

  const polarToCartesian = (angle: number, value: number) => {
    const radians = (Math.PI / 180) * angle
    return {
      x: center + radius * (value / maxValue) * Math.cos(radians),
      y: center - radius * (value / maxValue) * Math.sin(radians)
    }
  }

  const center = chartSize / 2
  const radius = center * 0.8


  const {
    stroke: gridStroke = radarChartDefaults.gridSection.stroke,
    strokeWidth: gridStrokeWidth = radarChartDefaults.gridSection.strokeWidth,
    strokeDashArray: gridStrokeDashArray = radarChartDefaults.gridSection
      .strokeDashArray,
    fill: gridFill = radarChartDefaults.gridSection.fill,
    gradientColor: gridGradientColor = radarChartDefaults.gridSection
      .gradientColor,
    showGradient: gridShowGradient = radarChartDefaults.gridSection
      .showGradient,
    opacity: gridOpacity = radarChartDefaults.gridSection.opacity,
    gradientOpacity: gridGradientOpacity = radarChartDefaults.gridSection
      .gradientOpacity
  } = gridConfig
  const gridSections =
    gridConfig.gridSections?.map((i) => ({
      ...radarChartDefaults.gridSection,
      ...i
    })) ?? Array(noOfSections).fill({})
  const {
    fontSize = radarChartDefaults.labelConfig.fontSize,
    stroke = radarChartDefaults.labelConfig.stroke,
    textAnchor = radarChartDefaults.labelConfig.textAnchor,
    alignmentBaseline = radarChartDefaults.labelConfig.alignmentBaseline,
    fontWeight = radarChartDefaults.labelConfig.fontWeight,
    fontFamily = radarChartDefaults.labelConfig.fontFamily
  } = labelConfig
  const {
    fontSize: dataLabelsFontSize = fontSize, // defaults to labelConfig (from above)
    stroke: dataLabelsColor = stroke, // defaults to labelConfig (from above)
    textAnchor: dataLabelsTextAnchor = textAnchor, // defaults to labelConfig (from above)
    alignmentBaseline: dataLabelsAlignmentBaseline = alignmentBaseline, // defaults to labelConfig (from above)
    fontWeight: dataLabelsFontWeight = fontWeight, // defaults to labelConfig (from above)
    fontFamily: dataLabelsFontFamily = fontFamily // defaults to labelConfig (from above)
  } = dataLabelsConfig
  const {
    stroke: polygonStroke = radarChartDefaults.polygonConfig.stroke,
    strokeWidth: polygonStrokeWidth = radarChartDefaults.polygonConfig
      .strokeWidth,
    strokeDashArray: polygonStrokeDashArray = radarChartDefaults.polygonConfig
      .strokeDashArray,
    fill: polygonFill = radarChartDefaults.polygonConfig.fill,
    gradientColor: polygonGradientColor = radarChartDefaults.polygonConfig
      .gradientColor,
    showGradient: polygonShowGradient = radarChartDefaults.polygonConfig
      .showGradient,
    opacity: polygonOpacity = radarChartDefaults.polygonConfig.opacity,
    gradientOpacity: polygonGradientOpacity = polygonOpacity
  } = polygonConfig

  const {
    stroke: asterLinesStroke = gridStroke,
    strokeWidth: asterLinesStrokeWidth = gridStrokeWidth,
    strokeDashArray:
      asterLinesStrokeDashArray = radarChartDefaults.asterLineStrokeDashArray
  } = asterLinesConfig

  // Calculate angles for each category
  const angleStep = 360 / labels.length

  // Generate coordinates for the data points
  const points = data.map((value, index) => {
    const angle = index * angleStep
    return polarToCartesian(angle, value)
  })

  // Generate the polygon points for the radar chart (in SVG "x,y" format)
  const polygonPoints = points.map((point) => `${point.x},${point.y}`).join(' ')

  const getGridLevelProps = (gridItem: GridConfig, ind: number) => {
    const level = noOfSections - ind
    const gridGradientColorLocal = gridItem.gradientColor || gridGradientColor
    const gridFillColorLocal = gridItem.fill || gridFill
    const gridOpacityLocal = gridItem.opacity || gridOpacity
    const gridGradientOpacityLocal = gridItem.gradientOpacity || gridGradientOpacity

    const gridStrokeLocal = gridItem.stroke || gridStroke
    const gridStrokeWidthLocal = gridItem.strokeWidth || gridStrokeWidth
    const gridShowGradientLocal = gridItem.showGradient || gridShowGradient
    const gridStrokeDashArrayLocal = gridItem.strokeDashArray || gridStrokeDashArray

    const levelPoints = labels.map((_, index) => {
      const angle = index * angleStep
      return polarToCartesian(angle, (level / noOfSections) * maxValue)
    })
    const levelPolygonPoints = levelPoints
      .map((point) => `${point.x},${point.y}`)
      .join(' ')

    const r = radius * (level / noOfSections)

    return {
      level,
      gridGradientColorLocal,
      gridFillColorLocal,
      gridOpacityLocal,
      gridGradientOpacityLocal,
      gridStrokeLocal,
      gridStrokeWidthLocal,
      gridShowGradientLocal,
      gridStrokeDashArrayLocal,
      levelPoints,
      levelPolygonPoints,
      r
    }
  }

  return {
    data,
    center,
    radius,
    chartSize,
    noOfSections,
    polarToCartesian,
    labels,
    labelConfigArray,
    labelsPositionOffset,
    dataLabelConfigArray,
    maxValue,
    dataLabels,
    gridSections,
    gridStroke,
    gridStrokeWidth,
    gridStrokeDashArray,
    gridFill,
    gridGradientColor,
    gridShowGradient,
    gridOpacity,
    gridGradientOpacity,
    fontSize,
    fontWeight,
    fontFamily,
    stroke,
    textAnchor,
    alignmentBaseline,
    dataLabelsFontSize,
    dataLabelsColor,
    dataLabelsTextAnchor,
    dataLabelsAlignmentBaseline,
    dataLabelsPositionOffset,
    dataLabelsFontWeight,
    dataLabelsFontFamily,
    polygonStroke,
    polygonStrokeWidth,
    polygonStrokeDashArray,
    polygonFill,
    polygonGradientColor,
    polygonShowGradient,
    polygonOpacity,
    polygonGradientOpacity,
    asterLinesStroke,
    asterLinesStrokeWidth,
    asterLinesStrokeDashArray,
    points,
    polygonPoints,
    angleStep,
    circular,
    hideGrid,
    hideAsterLines,
    getGridLevelProps
  }
}
