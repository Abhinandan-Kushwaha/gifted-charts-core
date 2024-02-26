System.register(["./types", "react-native"], function (exports_1, context_1) {
    "use strict";
    var types_1, react_native_1, chartTypes, screenWidth, defaultCurvature, defaultCurveType, defaultAnimationDuration, defaultScrollEventThrottle, defaultEndReachedOffset, yAxisSides, loc, SEGMENT_START, SEGMENT_END, RANGE_ENTER, RANGE_EXIT, STOP, ruleTypes, AxesAndRulesDefaults, defaultArrowConfig, BarDefaults, defaultLineConfig, LineDefaults, defaultPointerConfig, pieColors, populationDefaults;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (types_1_1) {
                types_1 = types_1_1;
            },
            function (react_native_1_1) {
                react_native_1 = react_native_1_1;
            }
        ],
        execute: function () {
            // Global
            (function (chartTypes) {
                chartTypes[chartTypes["BAR"] = 0] = "BAR";
                chartTypes[chartTypes["LINE"] = 1] = "LINE";
                chartTypes[chartTypes["LINE_BI_COLOR"] = 2] = "LINE_BI_COLOR";
            })(chartTypes || (exports_1("chartTypes", chartTypes = {})));
            exports_1("screenWidth", screenWidth = react_native_1.Dimensions.get("window").width);
            defaultCurvature = 0.2;
            defaultCurveType = types_1.CurveType.CUBIC;
            defaultAnimationDuration = 800;
            defaultScrollEventThrottle = 0;
            defaultEndReachedOffset = 80;
            // Bar and Line chart Specific
            (function (yAxisSides) {
                yAxisSides[yAxisSides["LEFT"] = 0] = "LEFT";
                yAxisSides[yAxisSides["RIGHT"] = 1] = "RIGHT";
            })(yAxisSides || (exports_1("yAxisSides", yAxisSides = {})));
            (function (loc) {
                loc[loc["IN"] = 0] = "IN";
                loc[loc["UP"] = 1] = "UP";
                loc[loc["DOWN"] = 2] = "DOWN";
            })(loc || (exports_1("loc", loc = {})));
            exports_1("SEGMENT_START", SEGMENT_START = "segmentStart");
            exports_1("SEGMENT_END", SEGMENT_END = "segmentEnd");
            exports_1("RANGE_ENTER", RANGE_ENTER = "RangeEnter");
            exports_1("RANGE_EXIT", RANGE_EXIT = "RangeExit");
            exports_1("STOP", STOP = "stop");
            exports_1("ruleTypes", ruleTypes = {
                SOLID: "solid",
                DASHED: "dashed",
                DOTTED: "dotted",
            });
            exports_1("AxesAndRulesDefaults", AxesAndRulesDefaults = {
                yAxisSide: yAxisSides.LEFT,
                yAxisColor: "black",
                yAxisExtraHeight: 0,
                yAxisThickness: 1,
                trimYAxisAtTop: false,
                overflowTop: 0,
                xAxisColor: "black",
                xAxisThickness: 1,
                xAxisType: ruleTypes.SOLID,
                xAxisTextNumberOfLines: 1,
                xAxisLabelsVerticalShift: 0,
                dashWidth: 4,
                dashGap: 8,
                backgroundColor: "transparent",
                hideRules: false,
                rulesType: ruleTypes.DASHED,
                rulesThickness: 1,
                rulesColor: "lightgray",
                rulesConfigArray: [],
                rotateLabel: false,
                showYAxisIndices: false,
                yAxisIndicesHeight: 2,
                yAxisIndicesWidth: 4,
                yAxisIndicesColor: "black",
                showXAxisIndices: false,
                xAxisIndicesHeight: 2,
                xAxisIndicesWidth: 4,
                xAxisIndicesColor: "black",
                hideOrigin: false,
                hideYAxisText: false,
                yAxisTextNumberOfLines: 1,
                showVerticalLines: false,
                verticalLinesThickness: 1,
                verticalLinesColor: "lightgray",
                verticalLinesStrokeDashArray: "",
                verticalLinesShift: 0,
                verticalLinesZIndex: -1,
                verticalLinesSpacing: 0,
                verticalLinesUptoDataPoint: false,
                noOfSections: 10,
                containerHeight: 200,
                width: 200,
                labelWidth: 0,
                labelsExtraHeight: 0,
                yAxisLabelWidth: 35,
                yAxisEmptyLabelWidth: 10,
                showFractionalValues: false,
                roundToDigits: 1,
                referenceLinesOverChartContent: true,
            });
            exports_1("defaultArrowConfig", defaultArrowConfig = {
                length: 10,
                width: 10,
                strokeWidth: 1,
                strokeColor: "black",
                fillColor: "none",
                showArrowBase: true,
            });
            // Bar chart specific
            exports_1("BarDefaults", BarDefaults = {
                barWidth: 30,
                spacing: 20,
                capThickness: 6,
                capColor: "gray",
                capRadius: 0,
                barBorderColor: "gray",
                horizontal: false,
                rtl: false,
                labelsWidthForHorizontal: 30,
                yAxisAtTop: false,
                rotateYAxisTexts: undefined,
                intactTopLabel: false,
                showLine: false,
                lineBehindBars: false,
                disableScroll: false,
                scrollToEnd: false,
                scrollAnimation: true,
                showScrollIndicator: false,
                scrollEventThrottle: defaultScrollEventThrottle,
                side: "",
                isAnimated: false,
                animationDuration: 800,
                opacity: 1,
                isThreeD: false,
                frontColor: "black",
                threeDBarGradientColor: "white",
                threeDBarFrontColor: "#C0CA3A",
                threeDBarSideColor: "#887A24",
                threeDBarTopColor: "#D9E676",
                endReachedOffset: defaultEndReachedOffset,
                focusedBarFrontColor: 'lightgreen',
                focusedThreeDBarFrontColor: '#B0B929',
                focusedBarSideColor: '#776913',
                focusedBarTopColor: '#C8D565',
            });
            exports_1("defaultLineConfig", defaultLineConfig = {
                initialSpacing: BarDefaults.spacing, // gets updated to spacing before being used
                curved: false,
                curvature: defaultCurvature,
                curveType: defaultCurveType,
                isAnimated: false,
                animationDuration: defaultAnimationDuration,
                thickness: 1,
                color: "black",
                hideDataPoints: false,
                dataPointsShape: "circular",
                dataPointsWidth: 4,
                dataPointsHeight: 4,
                dataPointsColor: "black",
                dataPointsRadius: 3,
                textColor: "gray",
                textFontSize: 10,
                textShiftX: 0,
                textShiftY: 0,
                shiftX: 0,
                shiftY: 0,
                delay: 0,
                startIndex: 0,
                endIndex: 0, // gets updated to lineData.length - 1
                showArrow: false,
                arrowConfig: defaultArrowConfig,
                isSecondary: false,
            });
            // Line chart specific
            exports_1("LineDefaults", LineDefaults = {
                color: "black",
                curvature: defaultCurvature,
                curveType: defaultCurveType,
                thickness: 2,
                isAnimated: false,
                hideDataPoints: false,
                spacing: 50,
                initialSpacing: 20,
                endSpacing: 20,
                animationDuration: defaultAnimationDuration,
                animateTogether: false,
                disableScroll: false,
                scrollToEnd: false,
                scrollAnimation: true,
                showScrollIndicator: false,
                scrollEventThrottle: defaultScrollEventThrottle,
                showValuesAsDataPointsText: false,
                dataPointsHeight: 4,
                dataPointsWidth: 4,
                dataPointsRadius: 3,
                dataPointsColor: "black",
                dataPointsColor2: "blue",
                dataPointsColor3: "red",
                dataPointsShape: "circular",
                textFontSize: 10,
                textColor: "gray",
                startFillColor: "gray",
                endFillColor: "white",
                lineGradient: false,
                lineGradientStartColor: "lightgreen",
                lineGradientEndColor: "orange",
                startOpacity: 1,
                endOpacity: 1,
                focusEnabled: false,
                showDataPointOnFocus: false,
                showStripOnFocus: false,
                showTextOnFocus: false,
                stripWidth: 2,
                unFocusOnPressOut: true,
                delayBeforeUnFocus: 300,
                edgePosition: types_1.EdgePosition.AFTER_DATA_POINT,
                endReachedOffset: defaultEndReachedOffset,
            });
            exports_1("defaultPointerConfig", defaultPointerConfig = {
                height: 0,
                width: 0,
                radius: 5,
                pointerColor: "red",
                pointerComponent: null,
                showPointerStrip: true,
                pointerStripHeight: AxesAndRulesDefaults.containerHeight, // gets updated to actual containerHeight
                pointerStripWidth: 1,
                pointerStripColor: "black",
                pointerStripUptoDataPoint: false,
                pointerLabelComponent: null,
                stripOverPointer: false,
                shiftPointerLabelX: 0,
                shiftPointerLabelY: 0,
                pointerLabelWidth: 20,
                pointerLabelHeight: 20,
                autoAdjustPointerLabelPosition: false,
                pointerVanishDelay: 150,
                activatePointersOnLongPress: false,
                activatePointersDelay: 150,
                initialPointerIndex: -1,
                initialPointerAppearDelay: 0,
                persistPointer: false,
                hidePointer1: false,
                hidePointer2: false,
                hidePointer3: false,
                hidePointer4: false,
                hidePointer5: false,
                hideSecondaryPointer: false,
                barTouchable: false,
                stripBehindBars: true,
                resetPointerOnDataChange: true,
                // pointerEvents: PointerEvent
            });
            // Pie chart specific
            exports_1("pieColors", pieColors = [
                "cyan",
                "green",
                "orange",
                "purple",
                "#bbff00",
                "red",
                "blue",
                "pink",
            ]);
            exports_1("populationDefaults", populationDefaults = {
                height: 200,
                width: screenWidth,
                verticalMarginBetweenBars: 1,
                barsMapToYAxisSections: true,
                xAxisNoOfSections: 4,
                showXAxisIndices: true,
                xAxisIndicesWidth: 2,
                xAxisIndicesHeight: 4,
                xAxisIndicesColor: "black",
                showXAxisLabelTexts: true,
                xAxisRoundToDigits: 0,
                showVerticalLines: true,
                verticalLinesColor: "lightgray",
                verticalLinesThickness: 1,
                verticalLinesType: ruleTypes.DASHED,
                verticalLinesStrokeDashArray: [4, 8],
                defaultFontSize: 12,
                defaultFontColor: "black",
                defaultFontStyle: "normal",
                defaultFontWeight: 1,
                defaultFontFamily: "",
                yAxisLabelTextMarginRight: 4,
                showValuesAsBarLabels: false,
                showMidAxis: false,
                midAxisLabelWidth: 35,
                midAxisType: ruleTypes.SOLID,
                leftBarLabelWidth: 30,
                rightBarLabelWidth: 30,
                leftBarColor: "skyblue",
                rightBarColor: "orange",
                leftBarBorderColor: "blue",
                rightBarBorderColor: "red",
                leftBarBorderWidth: 0,
                rightBarBorderWidth: 0,
                leftBarBorderRadius: 0,
                rightBarBorderRadius: 0,
                allCornersRounded: false,
                showSurplus: false,
                showSurplusLeft: false,
                showSurplusRight: false,
                leftSurplusColor: "#334790",
                leftSurplusBorderColor: "blue",
                rightSurplusColor: "#AC343C",
                rightSurplusBorderColor: "red",
                leftSurplusBorderWidth: 0,
                rightSurplusBorderWidth: 0,
                prefix: "",
                suffix: "",
            });
        }
    };
});
//# sourceMappingURL=constants.js.map