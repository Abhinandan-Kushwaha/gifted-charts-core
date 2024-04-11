/***********************************************************************************************************************
/*****************************************              Bar Chart              *****************************************
/***********************************************************************************************************************/

export { useBarChart } from './BarChart'
export { getPropsForAnimated2DWithGradient } from './BarChart/Animated2DWithGradient'
export { useRenderStackBars } from './BarChart/RenderStackBars'
export {
  type stackDataItem,
  type StackedBarChartPropsType,
  type BarChartPropsType,
  type defaultLineConfigType,
  type barDataItem,
  type Animated2DWithGradientPropsType,
  type RenderBarsPropsType,
  type trianglePropTypes,
  type animatedBarPropTypes,
  type FocusedBarConfig,
  type CommonPropsFor2Dand3DbarsType
} from './BarChart/types'

/************************************************************************************************************************
/*****************************************              Line Chart              *****************************************
/************************************************************************************************************************/

export { useLineChart } from './LineChart'
export { useLineChartBiColor } from './LineChart/LineChartBiColor'
export {
  type LineChartPropsType,
  type lineDataItem,
  type bicolorLineDataItem,
  type LineChartBicolorPropsType
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
/************************************             Common Components                 ************************************
/***********************************************************************************************************************/

export { useAnimatedThreeDBar } from './components/AnimatedThreeDBar'
export { getHorizSectionVals } from './components/BarAndLineChartsWrapper/getHorizSectionsVals'
export { useBarAndLineChartsWrapper } from './components/BarAndLineChartsWrapper'
export { getTopAndLeftForStripAndLabel } from './components/common/StripAndLabel'

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
  adjustToOffset
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
  type CurveType,
  type EdgePosition,
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
  type Framework
} from './utils/types'
