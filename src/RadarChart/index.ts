import { radarChartDefaults } from '../utils/constants'
import { GridConfig, RadarChartProps } from './types'

export const useRadarChart = (props: RadarChartProps) => {
  const {
    circular = false,
    gridConfig = {},
    polygonConfig = {},
    data = [],
    dataSet,
    noOfSections = radarChartDefaults.noOfSections,
    chartSize = radarChartDefaults.chartSize,
    labelConfig = {},
    labelConfigArray,
    asterLinesConfig = {},
    hideGrid = radarChartDefaults.hideGrid,
    hideLabels = radarChartDefaults.hideLabels,
    hideAsterLines = props.hideGrid ?? radarChartDefaults.hideAsterLines,
    dataLabelsConfig = {},
    labelsPositionOffset = radarChartDefaults.labelsPositionOffset,
    dataLabelsPositionOffset = radarChartDefaults.dataLabelsPositionOffset,
    isAnimated = radarChartDefaults.isAnimated,
    animationDuration = radarChartDefaults.animationDuration,
    animateTogether = radarChartDefaults.animateTogether,
    startAngle = radarChartDefaults.startAngle,
    isClockWise = radarChartDefaults.isClockWise
  } = props

  const chartContainerProps = {
    height: props.chartContainerProps?.height ?? chartSize,
    width: props.chartContainerProps?.width ?? chartSize,
    shiftX:
      props.chartContainerProps?.shiftX ??
      radarChartDefaults.chartContainerProps.shiftX,
    shiftY:
      props.chartContainerProps?.shiftY ??
      radarChartDefaults.chartContainerProps.shiftY,
    backgroundColor:
      props.chartContainerProps?.backgroundColor ??
      radarChartDefaults.chartContainerProps.backgroundColor
  }

  const labels =
    props.labels ??
    (dataSet?.[0] ?? data)?.map((_, index) => `Label${index + 1}`) ??
    []

  const getMax = (dataSet: number[][]) => {
    return dataSet.reduce((acc, set) => {
      const max = Math.max(...set)
      return max > acc ? max : acc
    }, 0)
  }

  const maxValue =
    props.maxValue ??
    (dataSet ? Math.max(getMax(dataSet ?? [])) : Math.max(...(data ?? [])))

  const dataLabels =
    props.dataLabels ??
    (polygonConfig.showDataValuesAsLabels
      ? data.map((d) => d.toString())
      : null)

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
    gradientOpacity: polygonGradientOpacity = polygonOpacity,
    showDataValuesAsLabels,
    isAnimated: polygonIsAnimated = isAnimated,
    animationDuration: polygonAnimationDuration = animationDuration
  } = polygonConfig

  const polygonConfigArray =
    props.polygonConfigArray?.map((set) => ({
      stroke: set.stroke ?? polygonStroke,
      strokeWidth: set.strokeWidth ?? polygonStrokeWidth,
      strokeDashArray: set.strokeDashArray ?? polygonStrokeDashArray,
      fill: set.fill ?? polygonFill,
      gradientColor: set.gradientColor ?? polygonGradientColor,
      showGradient: set.showGradient ?? polygonShowGradient,
      opacity: set.opacity ?? polygonOpacity,
      gradientOpacity: set.gradientOpacity ?? polygonGradientOpacity,
      showDataValuesAsLabels:
        set.showDataValuesAsLabels ?? showDataValuesAsLabels,
      isAnimated: set.isAnimated ?? polygonIsAnimated,
      animationDuration: set.animationDuration ?? polygonAnimationDuration
    })) ??
    (dataSet
      ? Array(dataSet.length).fill({
          stroke: polygonStroke,
          strokeWidth: polygonStrokeWidth,
          strokeDashArray: polygonStrokeDashArray,
          fill: polygonFill,
          gradientColor: polygonGradientColor,
          showGradient: polygonShowGradient,
          opacity: polygonOpacity,
          gradientOpacity: polygonGradientOpacity,
          showDataValuesAsLabels,
          isAnimated: polygonIsAnimated,
          animationDuration: polygonAnimationDuration
        })
      : null)

  const dataLabelsArray =
    props.dataLabelsArray ??
    polygonConfigArray?.map((polygonItem, index) =>
      polygonItem.showDataValuesAsLabels ? data.map((d) => d.toString()) : null
    )

  const dataLabelsConfigArray =
    props.dataLabelsConfigArray?.map((dataLabelsConfigItem) => ({
      fontSize: dataLabelsConfigItem.fontSize ?? dataLabelsFontSize,
      stroke: dataLabelsConfigItem.stroke ?? dataLabelsColor,
      textAnchor: dataLabelsConfigItem.textAnchor ?? dataLabelsTextAnchor,
      alignmentBaseline:
        dataLabelsConfigItem.alignmentBaseline ?? dataLabelsAlignmentBaseline,
      fontWeight: dataLabelsConfigItem.fontWeight ?? dataLabelsFontWeight,
      fontFamily: dataLabelsConfigItem.fontFamily ?? dataLabelsFontFamily
    })) ??
    Array(data.length).fill({
      fontSize: dataLabelsFontSize,
      stroke: dataLabelsColor,
      textAnchor: dataLabelsTextAnchor,
      alignmentBaseline: dataLabelsAlignmentBaseline,
      fontWeight: dataLabelsFontWeight,
      fontFamily: dataLabelsFontFamily
    })

  const dataLabelsConfigSet =
    props.dataLabelsConfigSet?.map((dataLabelConfigSetItem) =>
      dataLabelConfigSetItem.map((dataLabelConfigItem) => ({
        fontSize: dataLabelConfigItem.fontSize ?? dataLabelsFontSize,
        stroke: dataLabelConfigItem.stroke ?? dataLabelsColor,
        textAnchor: dataLabelConfigItem.textAnchor ?? dataLabelsTextAnchor,
        alignmentBaseline:
          dataLabelConfigItem.alignmentBaseline ?? dataLabelsAlignmentBaseline,
        fontWeight: dataLabelConfigItem.fontWeight ?? dataLabelsFontWeight,
        fontFamily: dataLabelConfigItem.fontFamily ?? dataLabelsFontFamily
      }))
    ) ?? (dataSet ? Array(dataSet.length).fill(dataLabelsConfigArray) : null)

  const {
    stroke: asterLinesStroke = gridStroke,
    strokeWidth: asterLinesStrokeWidth = gridStrokeWidth,
    strokeDashArray:
      asterLinesStrokeDashArray = radarChartDefaults.asterLineStrokeDashArray
  } = asterLinesConfig

  // Calculate angles for each category
  const angleStep = (360 / labels.length) * (isClockWise ? -1 : 1)

  // Generate coordinates for the data points
  const points = data.map((value, index) => {
    const angle = index * angleStep + startAngle
    return polarToCartesian(angle, value)
  })

  const initialPoints = data.map((value, index) => {
    const angle = index * angleStep + startAngle
    return polarToCartesian(angle, 0)
  })

  const pointsArray =
    dataSet?.map((set) => {
      return set.map((value, index) => {
        const angle = index * angleStep + startAngle
        return polarToCartesian(angle, value)
      })
    }) ?? []

  const initialPointsArray =
    dataSet?.map((set) => {
      return set.map((value, index) => {
        const angle = index * angleStep + startAngle
        return polarToCartesian(angle, 0)
      })
    }) ?? []

  // Generate the polygon points for the radar chart (in SVG "x,y" format)
  const polygonPoints = points.map((point) => `${point.x},${point.y}`).join(' ')
  const initialPolygonPoints = initialPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ')
  const polygonPointsArray = pointsArray.map((set) =>
    set.map((point) => `${point.x},${point.y}`).join(' ')
  )
  const initialPolygonPointsArray = initialPointsArray.map((set) =>
    set.map((point) => `${point.x},${point.y}`).join(' ')
  )

  const getGridLevelProps = (gridItem: GridConfig, ind: number) => {
    const level = noOfSections - ind
    const gridGradientColorLocal = gridItem.gradientColor || gridGradientColor
    const gridFillColorLocal = gridItem.fill || gridFill
    const gridOpacityLocal = gridItem.opacity || gridOpacity
    const gridGradientOpacityLocal =
      gridItem.gradientOpacity || gridGradientOpacity

    const gridStrokeLocal = gridItem.stroke || gridStroke
    const gridStrokeWidthLocal = gridItem.strokeWidth || gridStrokeWidth
    const gridShowGradientLocal = gridItem.showGradient || gridShowGradient
    const gridStrokeDashArrayLocal =
      gridItem.strokeDashArray || gridStrokeDashArray

    const levelPoints = labels.map((_, index) => {
      const angle = index * angleStep + startAngle
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
    dataSet,
    center,
    radius,
    chartSize,
    chartContainerProps,
    noOfSections,
    polarToCartesian,
    labels,
    labelConfigArray,
    labelsPositionOffset,
    dataLabelsConfigArray,
    maxValue,
    dataLabels,
    dataLabelsArray,
    dataLabelsConfigSet,
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
    polygonConfigArray,
    polygonIsAnimated,
    polygonAnimationDuration,
    asterLinesStroke,
    asterLinesStrokeWidth,
    asterLinesStrokeDashArray,
    points,
    initialPoints,
    polygonPoints,
    initialPolygonPoints,
    polygonPointsArray,
    initialPolygonPointsArray,
    angleStep,
    circular,
    hideGrid,
    hideLabels,
    hideAsterLines,
    getGridLevelProps,
    animateTogether,
    startAngle
  }
}
