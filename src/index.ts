/***********************************************************************************************************************
/*****************************************              Bar Chart              *****************************************
/***********************************************************************************************************************/

export { useBarChart } from './BarChart'
export { getPropsForAnimated2DWithGradient } from './BarChart/Animated2DWithGradient'
export { useRenderStackBars } from './BarChart/RenderStackBars'
export { useRenderBars } from './BarChart/RenderBars'
export {
  type stackDataItem,
  type StackedBarChartPropsType,
  type StackedBarChartPropsTypeForWeb,
  type BarChartPropsType,
  type defaultLineConfigType,
  type barDataItem,
  type barDataItemNullSafe,
  type Animated2DWithGradientPropsType,
  type RenderBarsPropsType,
  type trianglePropTypes,
  type animatedBarPropTypes,
  type FocusedBarConfig,
  type CommonPropsFor2dand3dBarsType
} from './BarChart/types'

/************************************************************************************************************************
/*****************************************              Line Chart              *****************************************
/************************************************************************************************************************/

export { useLineChart } from './LineChart'
export { useLineChartBiColor } from './LineChart/LineChartBiColor'
export {
  type LineChartPropsType,
  type LineChartPropsTypeForWeb,
  type lineDataItem,
  type lineDataItemNullSafe,
  type bicolorLineDataItem,
  type LineChartBicolorPropsType,
  type LineChartBicolorPropsTypeForWeb
} from './LineChart/types'

/***********************************************************************************************************************
/*****************************************              Pie Chart              *****************************************
/***********************************************************************************************************************/

export { usePieChart } from './PieChart'
export { usePiePro } from './PieChart/pro'
export { getPieChartMainProps } from './PieChart/main'
export {
  type PieChartPropsType,
  type pieDataItem,
  type PieChartMainProps
} from './PieChart/types'

/***********************************************************************************************************************
/************************************          Population Pyramid Chart             ************************************
/***********************************************************************************************************************/

export { usePopulationPyramid } from './PopulationPyramid'
export {
  type popnPyramidDataItem,
  type popnPyramidDataItemReactJS,
  type RulesProps,
  type RulesPropsReactJS,
  type RulesPropsType,
  type PopulationPyramidPropsType,
  type PopulationPyramidPropsTypeReactJS,
  type TPopulationPyramidPropsType,
  type extendedPopulationPyramidPropsType
} from './PopulationPyramid/types'

/***********************************************************************************************************************
/************************************                Radar Chart                    ************************************
/***********************************************************************************************************************/

export { useRadarChart } from './RadarChart'
export {
  type RadarChartProps,
  type PolygonConfig,
  type GridConfig,
  type GridSectionConfig,
  type AsterLinesConfig
} from './RadarChart/types'

/***********************************************************************************************************************
/************************************             Common Components                 ************************************
/***********************************************************************************************************************/

export { useAnimatedThreeDBar } from './components/AnimatedThreeDBar'
export { getHorizSectionVals } from './components/BarAndLineChartsWrapper/getHorizSectionsVals'
export { useBarAndLineChartsWrapper } from './components/BarAndLineChartsWrapper'
export { getTopAndLeftForStripAndLabel } from './components/common/StripAndLabel'
export { type StripAndLabelProps } from './components/common/types'

/***********************************************************************************************************************
/*********************************          common utils, constants and types           ********************************
/***********************************************************************************************************************/

export {
  getCumulativeWidth,
  getLighterColor,
  svgQuadraticCurvePath,
  svgPath,
  bezierCommand,
  getSegmentString,
  getCurvePathWithSegments,
  getPreviousSegmentsLastPoint,
  getPathWithHighlight,
  getRegionPathObjects,
  getSegmentedPathObjects,
  getArrowPoints,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getSecondaryDataWithOffsetIncluded,
  getArrowProperty,
  getAllArrowProperties,
  maxAndMinUtil,
  computeMaxAndMinItems,
  getLabelTextUtil,
  getXForLineInBar,
  getYForLineInBar,
  clone,
  getLineConfigForBarChart,
  adjustToOffset,
  pointsWithPaddedRepititions
} from './utils'

export {
  chartTypes,
  yAxisSides,
  loc,
  SEGMENT_START,
  SEGMENT_END,
  RANGE_ENTER,
  RANGE_EXIT,
  STOP,
  ruleTypes,
  AxesAndRulesDefaults,
  defaultArrowConfig,
  BarDefaults,
  defaultLineConfig,
  LineDefaults,
  defaultPointerConfig,
  pieColors,
  populationDefaults,
  defaultAnimationDuration
} from './utils/constants'

export {
  type RuleType,
  type RuleTypes,
  type RulesConfig,
  CurveType,
  EdgePosition,
  type LabelsPosition,
  type PointerEvents,
  type secondaryYAxisType,
  type secondaryLineConfigType,
  type referenceConfigType,
  type arrowConfigType,
  type horizSectionPropTypes,
  type HorizSectionsType,
  type BarAndLineChartsWrapperTypes,
  type Pointer,
  type HighlightedRange,
  type LineSegment,
  type LineSvgProps,
  type LineProperties,
  type DataSet,
  type DataSetNullSafe,
  Framework,
  type XAxisConfig,
  type LineInBarChartPropsType,
  type DataPointProps,
  type Linecap,
  type IntersectionAreaConfig,
  type LabelLineConfig,
  type TooltipProps,
  type SpreadData
} from './utils/types'
