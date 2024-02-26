/***********************************************************************************************************************/
/*****************************************              Bar Chart              *****************************************/
/***********************************************************************************************************************/

export { useBarChart } from "./src/BarChart";
export { getPropsForAnimated2DWithGradient } from "./src/BarChart/Animated2DWithGradient";
export { useRenderStackBars } from "./src/BarChart/RenderStackBars";
export type {
  stackDataItem,
  StackedBarChartPropsType,
  BarChartPropsType,
  defaultLineConfigType,
  barDataItem,
  Animated2DWithGradientPropsType,
  RenderBarsPropsType,
  trianglePropTypes,
  animatedBarPropTypes,
  FocusedBarConfig,
  CommonPropsFor2Dand3DbarsType,
} from "./src/BarChart/types";

/************************************************************************************************************************/
/*****************************************              Line Chart              *****************************************/
/************************************************************************************************************************/

export { useLineChart } from "./src/LineChart";
export { useLineChartBiColor } from "./src/LineChart/LineChartBiColor";
export type {
  LineChartPropsType,
  lineDataItem,
  bicolorLineDataItem,
  LineChartBicolorPropsType,
} from "./src/LineChart/types";

/***********************************************************************************************************************/
/*****************************************              Pie Chart              *****************************************/
/***********************************************************************************************************************/

export { usePieChart } from "./src/PieChart";
export { getPieChartMainProps } from "./src/PieChart/main";
export type {
  PieChartPropsType,
  pieDataItem,
  PieChartMainProps,
} from "./src/PieChart/types";

/***********************************************************************************************************************/
/************************************          Population Pyramid Chart             ************************************/
/***********************************************************************************************************************/

export { usePopulationPyramid } from "./src/PopulationPyramid";
export type {
  popnPyramidDataItem,
  RulesProps,
  PopulationPyramidPropsType,
} from "./src/PopulationPyramid/types";

/***********************************************************************************************************************/
/************************************             Common Components                 ************************************/
/***********************************************************************************************************************/

export { useAnimatedThreeDBar } from "./src/components/AnimatedThreeDBar";
export { getHorizSectionVals } from "./src/components/BarAndLineChartsWrapper/getHorizSectionsVals";
export { useBarAndLineChartsWrapper } from "./src/components/BarAndLineChartsWrapper";
export { getTopAndLeftForStripAndLabel } from "./src/components/common/StripAndLabel";

/***********************************************************************************************************************/
/*********************************          common utils, constants and types           ********************************/
/***********************************************************************************************************************/

export {
  rnVersion,
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
} from "./src/utils";

export {
  chartTypes,
  screenWidth,
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
} from "./src/utils/constants";

export type {
  RuleType,
  RuleTypes,
  RulesConfig,
  PointerEvents,
  secondaryYAxisType,
  secondaryLineConfigType,
  referenceConfigType,
  arrowConfigType,
  horizSectionPropTypes,
  HorizSectionsType,
  BarAndLineChartsWrapperTypes,
  Pointer,
  HighlightedRange,
  LineSegment,
  LineSvgProps,
  LineProperties,
  DataSet,
} from "./src/utils/types";

export {
  CurveType,
  EdgePosition,
} from "./src/utils/types";
