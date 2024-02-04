/***********************************************************************************************************************/
/*****************************************              Bar Chart              *****************************************/
/***********************************************************************************************************************/
System.register(["./src/BarChart", "./src/BarChart/Animated2DWithGradient", "./src/BarChart/RenderStackBars", "./src/LineChart", "./src/LineChart/LineChartBiColor", "./src/PieChart", "./src/PieChart/main", "./src/PopulationPyramid", "./src/components/AnimatedThreeDBar", "./src/components/BarAndLineChartsWrapper/getHorizSectionsVals", "./src/components/BarAndLineChartsWrapper", "./src/components/common/StripAndLabel", "./src/utils", "./src/utils/constants", "./src/utils/types"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BarChart_1_1) {
                exports_1({
                    "useBarChart": BarChart_1_1["useBarChart"]
                });
            },
            function (Animated2DWithGradient_1_1) {
                exports_1({
                    "getPropsForAnimated2DWithGradient": Animated2DWithGradient_1_1["getPropsForAnimated2DWithGradient"]
                });
            },
            function (RenderStackBars_1_1) {
                exports_1({
                    "useRenderStackBars": RenderStackBars_1_1["useRenderStackBars"]
                });
            },
            function (LineChart_1_1) {
                exports_1({
                    "useLineChart": LineChart_1_1["useLineChart"]
                });
            },
            function (LineChartBiColor_1_1) {
                exports_1({
                    "useLineChartBiColor": LineChartBiColor_1_1["useLineChartBiColor"]
                });
            },
            function (PieChart_1_1) {
                exports_1({
                    "usePieChart": PieChart_1_1["usePieChart"]
                });
            },
            function (main_1_1) {
                exports_1({
                    "getPieChartMainProps": main_1_1["getPieChartMainProps"]
                });
            },
            function (PopulationPyramid_1_1) {
                exports_1({
                    "usePopulationPyramid": PopulationPyramid_1_1["usePopulationPyramid"]
                });
            },
            function (AnimatedThreeDBar_1_1) {
                exports_1({
                    "useAnimatedThreeDBar": AnimatedThreeDBar_1_1["useAnimatedThreeDBar"]
                });
            },
            function (getHorizSectionsVals_1_1) {
                exports_1({
                    "getHorizSectionVals": getHorizSectionsVals_1_1["getHorizSectionVals"]
                });
            },
            function (BarAndLineChartsWrapper_1_1) {
                exports_1({
                    "useBarAndLineChartsWrapper": BarAndLineChartsWrapper_1_1["useBarAndLineChartsWrapper"]
                });
            },
            function (StripAndLabel_1_1) {
                exports_1({
                    "getTopAndLeftForStripAndLabel": StripAndLabel_1_1["getTopAndLeftForStripAndLabel"]
                });
            },
            function (utils_1_1) {
                exports_1({
                    "rnVersion": utils_1_1["rnVersion"],
                    "getCumulativeWidth": utils_1_1["getCumulativeWidth"],
                    "getLighterColor": utils_1_1["getLighterColor"],
                    "svgQuadraticCurvePath": utils_1_1["svgQuadraticCurvePath"],
                    "svgPath": utils_1_1["svgPath"],
                    "bezierCommand": utils_1_1["bezierCommand"],
                    "getSegmentString": utils_1_1["getSegmentString"],
                    "getCurvePathWithSegments": utils_1_1["getCurvePathWithSegments"],
                    "getPreviousSegmentsLastPoint": utils_1_1["getPreviousSegmentsLastPoint"],
                    "getPathWithHighlight": utils_1_1["getPathWithHighlight"],
                    "getRegionPathObjects": utils_1_1["getRegionPathObjects"],
                    "getSegmentedPathObjects": utils_1_1["getSegmentedPathObjects"],
                    "getArrowPoints": utils_1_1["getArrowPoints"],
                    "getAxesAndRulesProps": utils_1_1["getAxesAndRulesProps"],
                    "getExtendedContainerHeightWithPadding": utils_1_1["getExtendedContainerHeightWithPadding"],
                    "getSecondaryDataWithOffsetIncluded": utils_1_1["getSecondaryDataWithOffsetIncluded"],
                    "getArrowProperty": utils_1_1["getArrowProperty"],
                    "getAllArrowProperties": utils_1_1["getAllArrowProperties"],
                    "maxAndMinUtil": utils_1_1["maxAndMinUtil"],
                    "computeMaxAndMinItems": utils_1_1["computeMaxAndMinItems"],
                    "getLabelTextUtil": utils_1_1["getLabelTextUtil"],
                    "getXForLineInBar": utils_1_1["getXForLineInBar"],
                    "getYForLineInBar": utils_1_1["getYForLineInBar"],
                    "clone": utils_1_1["clone"],
                    "getLineConfigForBarChart": utils_1_1["getLineConfigForBarChart"]
                });
            },
            function (constants_1_1) {
                exports_1({
                    "chartTypes": constants_1_1["chartTypes"],
                    "screenWidth": constants_1_1["screenWidth"],
                    "yAxisSides": constants_1_1["yAxisSides"],
                    "loc": constants_1_1["loc"],
                    "SEGMENT_START": constants_1_1["SEGMENT_START"],
                    "SEGMENT_END": constants_1_1["SEGMENT_END"],
                    "RANGE_ENTER": constants_1_1["RANGE_ENTER"],
                    "RANGE_EXIT": constants_1_1["RANGE_EXIT"],
                    "STOP": constants_1_1["STOP"],
                    "ruleTypes": constants_1_1["ruleTypes"],
                    "AxesAndRulesDefaults": constants_1_1["AxesAndRulesDefaults"],
                    "defaultArrowConfig": constants_1_1["defaultArrowConfig"],
                    "BarDefaults": constants_1_1["BarDefaults"],
                    "defaultLineConfig": constants_1_1["defaultLineConfig"],
                    "LineDefaults": constants_1_1["LineDefaults"],
                    "defaultPointerConfig": constants_1_1["defaultPointerConfig"],
                    "pieColors": constants_1_1["pieColors"],
                    "populationDefaults": constants_1_1["populationDefaults"]
                });
            },
            function (types_1_1) {
                exports_1({
                    "CurveType": types_1_1["CurveType"],
                    "EdgePosition": types_1_1["EdgePosition"]
                });
            }
        ],
        execute: function () {/***********************************************************************************************************************/
            /*****************************************              Bar Chart              *****************************************/
            /***********************************************************************************************************************/
        }
    };
});
//# sourceMappingURL=index.js.map