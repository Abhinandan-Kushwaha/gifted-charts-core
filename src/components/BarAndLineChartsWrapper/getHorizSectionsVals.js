import { AxesAndRulesDefaults } from '../../utils/constants';
import { computeMaxAndMinItems, getLabelTextUtil } from '../../utils';
export var getHorizSectionVals = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    var width = props.width, noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis, totalWidth = props.totalWidth, endSpacing = props.endSpacing, yAxisSide = props.yAxisSide, noOfSections = props.noOfSections, yAxisLabelWidth = props.yAxisLabelWidth, yAxisLabelContainerStyle = props.yAxisLabelContainerStyle, yAxisThickness = props.yAxisThickness, yAxisColor = props.yAxisColor, yAxisExtraHeight = props.yAxisExtraHeight, trimYAxisAtTop = props.trimYAxisAtTop, dashWidth = props.dashWidth, dashGap = props.dashGap, rulesType = props.rulesType, rulesThickness = props.rulesThickness, spacing = props.spacing, showYAxisIndices = props.showYAxisIndices, yAxisIndicesHeight = props.yAxisIndicesHeight, yAxisIndicesWidth = props.yAxisIndicesWidth, yAxisIndicesColor = props.yAxisIndicesColor, hideOrigin = props.hideOrigin, hideYAxisText = props.hideYAxisText, showFractionalValues = props.showFractionalValues, yAxisTextNumberOfLines = props.yAxisTextNumberOfLines, yAxisLabelPrefix = props.yAxisLabelPrefix, yAxisLabelSuffix = props.yAxisLabelSuffix, yAxisTextStyle = props.yAxisTextStyle, containerHeight = props.containerHeight, maxValue = props.maxValue, referenceLinesConfig = props.referenceLinesConfig, yAxisLabelTexts = props.yAxisLabelTexts, stepValue = props.stepValue, roundToDigits = props.roundToDigits, yAxisOffset = props.yAxisOffset, formatYLabel = props.formatYLabel, secondaryData = props.secondaryData, secondaryYAxis = props.secondaryYAxis;
    var yAxisExtraHeightAtTop = trimYAxisAtTop ? 0 : yAxisExtraHeight;
    /***********************************************************************************************************************************
     *                                                                                                                                  *
     *****************************               secondary Y Axis related props computations               ******************************
     *                                                                                                                                  *
     ***********************************************************************************************************************************/
    var secondaryYAxisConfig = {
        noOfSections: (_a = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.noOfSections) !== null && _a !== void 0 ? _a : noOfSections,
        maxValue: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.maxValue,
        mostNegativeValue: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.mostNegativeValue,
        stepValue: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.stepValue,
        stepHeight: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.stepHeight,
        showFractionalValues: (_b = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.showFractionalValues) !== null && _b !== void 0 ? _b : showFractionalValues,
        roundToDigits: (_c = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.roundToDigits) !== null && _c !== void 0 ? _c : roundToDigits,
        noOfSectionsBelowXAxis: (_d = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.noOfSectionsBelowXAxis) !== null && _d !== void 0 ? _d : noOfSectionsBelowXAxis,
        showYAxisIndices: (_e = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.showYAxisIndices) !== null && _e !== void 0 ? _e : showYAxisIndices,
        yAxisIndicesHeight: (_f = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisIndicesHeight) !== null && _f !== void 0 ? _f : yAxisIndicesHeight,
        yAxisIndicesWidth: (_g = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisIndicesWidth) !== null && _g !== void 0 ? _g : yAxisIndicesWidth,
        yAxisIndicesColor: (_h = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisIndicesColor) !== null && _h !== void 0 ? _h : yAxisIndicesColor,
        yAxisSide: (_j = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisSide) !== null && _j !== void 0 ? _j : yAxisSide,
        yAxisOffset: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisOffset,
        yAxisThickness: (_k = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisThickness) !== null && _k !== void 0 ? _k : yAxisThickness,
        yAxisColor: (_l = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisColor) !== null && _l !== void 0 ? _l : yAxisColor,
        yAxisLabelContainerStyle: (_m = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisLabelContainerStyle) !== null && _m !== void 0 ? _m : yAxisLabelContainerStyle,
        yAxisLabelTexts: (_o = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisLabelTexts) !== null && _o !== void 0 ? _o : yAxisLabelTexts,
        yAxisTextStyle: (_p = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisTextStyle) !== null && _p !== void 0 ? _p : yAxisTextStyle,
        yAxisTextNumberOfLines: (_q = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisTextNumberOfLines) !== null && _q !== void 0 ? _q : yAxisTextNumberOfLines,
        yAxisLabelWidth: (_r = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisLabelWidth) !== null && _r !== void 0 ? _r : yAxisLabelWidth,
        hideYAxisText: (_s = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.hideYAxisText) !== null && _s !== void 0 ? _s : hideYAxisText,
        yAxisLabelPrefix: (_t = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisLabelPrefix) !== null && _t !== void 0 ? _t : yAxisLabelPrefix,
        yAxisLabelSuffix: (_u = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisLabelSuffix) !== null && _u !== void 0 ? _u : yAxisLabelSuffix,
        hideOrigin: (_v = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.hideOrigin) !== null && _v !== void 0 ? _v : hideOrigin,
        formatYLabel: secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.formatYLabel
    };
    var _20 = computeMaxAndMinItems(secondaryData, secondaryYAxisConfig.roundToDigits, secondaryYAxisConfig.showFractionalValues), maxItem = _20.maxItem, minItem = _20.minItem;
    secondaryYAxisConfig.maxValue =
        (_w = secondaryYAxisConfig.maxValue) !== null && _w !== void 0 ? _w : (maxItem || maxValue);
    secondaryYAxisConfig.mostNegativeValue =
        (_x = secondaryYAxisConfig.mostNegativeValue) !== null && _x !== void 0 ? _x : minItem;
    secondaryYAxisConfig.stepValue =
        (_y = secondaryYAxisConfig.stepValue) !== null && _y !== void 0 ? _y : ((_z = secondaryYAxisConfig.maxValue) !== null && _z !== void 0 ? _z : 0) /
            ((_0 = secondaryYAxisConfig.noOfSections) !== null && _0 !== void 0 ? _0 : noOfSections);
    secondaryYAxisConfig.stepHeight =
        secondaryYAxisConfig.stepHeight ||
            containerHeight / ((_1 = secondaryYAxisConfig.noOfSections) !== null && _1 !== void 0 ? _1 : noOfSections);
    var horizSections = [];
    for (var i = 0; i <= noOfSections; i++) {
        var value = maxValue - stepValue * i;
        if (showFractionalValues || roundToDigits) {
            value = parseFloat(value.toFixed(roundToDigits !== null && roundToDigits !== void 0 ? roundToDigits : AxesAndRulesDefaults.roundToDigits));
        }
        horizSections.push({
            value: (yAxisLabelTexts === null || yAxisLabelTexts === void 0 ? void 0 : yAxisLabelTexts.length)
                ? (_2 = yAxisLabelTexts[noOfSections + noOfSectionsBelowXAxis - i]) !== null && _2 !== void 0 ? _2 : value.toString()
                : value.toString()
        });
    }
    var horizSectionsBelow = [];
    if (noOfSectionsBelowXAxis) {
        for (var i = 1; i <= noOfSectionsBelowXAxis; i++) {
            var value = stepValue * -i;
            if (showFractionalValues || roundToDigits) {
                value = parseFloat(value.toFixed(roundToDigits !== null && roundToDigits !== void 0 ? roundToDigits : AxesAndRulesDefaults.roundToDigits));
            }
            horizSectionsBelow.push({
                value: props.yAxisLabelTexts
                    ? (_3 = props.yAxisLabelTexts[noOfSectionsBelowXAxis - i]) !== null && _3 !== void 0 ? _3 : value.toString()
                    : value.toString()
            });
        }
    }
    var secondaryHorizSections = [];
    if (secondaryYAxis) {
        for (var i = 0; i <= ((_4 = secondaryYAxisConfig.noOfSections) !== null && _4 !== void 0 ? _4 : noOfSections); i++) {
            var value = secondaryYAxisConfig.stepValue * i;
            if (secondaryYAxisConfig.showFractionalValues ||
                secondaryYAxisConfig.roundToDigits) {
                value = parseFloat(value.toFixed((_5 = secondaryYAxisConfig.roundToDigits) !== null && _5 !== void 0 ? _5 : AxesAndRulesDefaults.roundToDigits));
            }
            secondaryHorizSections.push({
                value: ((_6 = secondaryYAxisConfig.yAxisLabelTexts) === null || _6 === void 0 ? void 0 : _6.length)
                    ? (_7 = secondaryYAxisConfig.yAxisLabelTexts[i - noOfSectionsBelowXAxis - 1]) !== null && _7 !== void 0 ? _7 : value.toString()
                    : value.toString()
            });
        }
    }
    var secondaryHorizSectionsBelow = [];
    if (secondaryYAxisConfig.noOfSectionsBelowXAxis) {
        for (var i = 1; i <= secondaryYAxisConfig.noOfSectionsBelowXAxis; i++) {
            var value = secondaryYAxisConfig.stepValue *
                (i - secondaryYAxisConfig.noOfSectionsBelowXAxis - 1);
            if (secondaryYAxisConfig.showFractionalValues ||
                secondaryYAxisConfig.roundToDigits) {
                value = parseFloat(value.toFixed((_8 = secondaryYAxisConfig.roundToDigits) !== null && _8 !== void 0 ? _8 : AxesAndRulesDefaults.roundToDigits));
            }
            secondaryHorizSectionsBelow.push({
                value: ((_9 = secondaryYAxisConfig.yAxisLabelTexts) === null || _9 === void 0 ? void 0 : _9.length)
                    ? (_10 = secondaryYAxisConfig.yAxisLabelTexts[i - 1]) !== null && _10 !== void 0 ? _10 : value.toString()
                    : value.toString()
            });
        }
    }
    /***********************************************************************************************************************************
     ***********************************************************************************************************************************/
    var showReferenceLine1 = referenceLinesConfig.showReferenceLine1, referenceLine1Position = referenceLinesConfig.referenceLine1Position, referenceLine1Config = referenceLinesConfig.referenceLine1Config, showReferenceLine2 = referenceLinesConfig.showReferenceLine2, referenceLine2Position = referenceLinesConfig.referenceLine2Position, referenceLine2Config = referenceLinesConfig.referenceLine2Config, showReferenceLine3 = referenceLinesConfig.showReferenceLine3, referenceLine3Position = referenceLinesConfig.referenceLine3Position, referenceLine3Config = referenceLinesConfig.referenceLine3Config;
    var defaultReferenceConfig = {
        thickness: rulesThickness,
        width: (width || totalWidth - spacing) + endSpacing,
        color: 'black',
        type: rulesType,
        dashWidth: dashWidth,
        dashGap: dashGap,
        labelText: '',
        labelTextStyle: null,
        zIndex: 1
    };
    showReferenceLine1 = referenceLinesConfig.showReferenceLine1 || false;
    referenceLine1Position =
        (_11 = referenceLinesConfig.referenceLine1Position) !== null && _11 !== void 0 ? _11 : (referenceLinesConfig.referenceLine1Position || containerHeight / 2);
    referenceLine1Config = referenceLinesConfig.referenceLine1Config
        ? {
            thickness: referenceLinesConfig.referenceLine1Config.thickness ||
                defaultReferenceConfig.thickness,
            width: (_12 = referenceLinesConfig.referenceLine1Config.width) !== null && _12 !== void 0 ? _12 : defaultReferenceConfig.width,
            color: referenceLinesConfig.referenceLine1Config.color ||
                defaultReferenceConfig.color,
            type: referenceLinesConfig.referenceLine1Config.type ||
                defaultReferenceConfig.type,
            dashWidth: referenceLinesConfig.referenceLine1Config.dashWidth ||
                defaultReferenceConfig.dashWidth,
            dashGap: referenceLinesConfig.referenceLine1Config.dashGap ||
                defaultReferenceConfig.dashGap,
            labelText: referenceLinesConfig.referenceLine1Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: referenceLinesConfig.referenceLine1Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
            zIndex: (_13 = referenceLinesConfig.referenceLine1Config.zIndex) !== null && _13 !== void 0 ? _13 : defaultReferenceConfig.zIndex
        }
        : defaultReferenceConfig;
    showReferenceLine2 = referenceLinesConfig.showReferenceLine2 || false;
    referenceLine2Position =
        (_14 = referenceLinesConfig.referenceLine2Position) !== null && _14 !== void 0 ? _14 : (referenceLinesConfig.referenceLine2Position || (3 * containerHeight) / 2);
    referenceLine2Config = referenceLinesConfig.referenceLine2Config
        ? {
            thickness: referenceLinesConfig.referenceLine2Config.thickness ||
                defaultReferenceConfig.thickness,
            width: (_15 = referenceLinesConfig.referenceLine2Config.width) !== null && _15 !== void 0 ? _15 : defaultReferenceConfig.width,
            color: referenceLinesConfig.referenceLine2Config.color ||
                defaultReferenceConfig.color,
            type: referenceLinesConfig.referenceLine2Config.type ||
                defaultReferenceConfig.type,
            dashWidth: referenceLinesConfig.referenceLine2Config.dashWidth ||
                defaultReferenceConfig.dashWidth,
            dashGap: referenceLinesConfig.referenceLine2Config.dashGap ||
                defaultReferenceConfig.dashGap,
            labelText: referenceLinesConfig.referenceLine2Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: referenceLinesConfig.referenceLine2Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
            zIndex: (_16 = referenceLinesConfig.referenceLine2Config.zIndex) !== null && _16 !== void 0 ? _16 : defaultReferenceConfig.zIndex
        }
        : defaultReferenceConfig;
    showReferenceLine3 = referenceLinesConfig.showReferenceLine3 || false;
    referenceLine3Position =
        (_17 = referenceLinesConfig.referenceLine3Position) !== null && _17 !== void 0 ? _17 : (referenceLinesConfig.referenceLine3Position || containerHeight / 3);
    referenceLine3Config = referenceLinesConfig.referenceLine3Config
        ? {
            thickness: referenceLinesConfig.referenceLine3Config.thickness ||
                defaultReferenceConfig.thickness,
            width: (_18 = referenceLinesConfig.referenceLine3Config.width) !== null && _18 !== void 0 ? _18 : defaultReferenceConfig.width,
            color: referenceLinesConfig.referenceLine3Config.color ||
                defaultReferenceConfig.color,
            type: referenceLinesConfig.referenceLine3Config.type ||
                defaultReferenceConfig.type,
            dashWidth: referenceLinesConfig.referenceLine3Config.dashWidth ||
                defaultReferenceConfig.dashWidth,
            dashGap: referenceLinesConfig.referenceLine3Config.dashGap ||
                defaultReferenceConfig.dashGap,
            labelText: referenceLinesConfig.referenceLine3Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: referenceLinesConfig.referenceLine3Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
            zIndex: (_19 = referenceLinesConfig.referenceLine3Config.zIndex) !== null && _19 !== void 0 ? _19 : defaultReferenceConfig.zIndex
        }
        : defaultReferenceConfig;
    var getLabelTexts = function (val, index) {
        return getLabelTextUtil(val, index, showFractionalValues, yAxisLabelTexts, yAxisOffset, yAxisLabelPrefix, yAxisLabelSuffix, roundToDigits !== null && roundToDigits !== void 0 ? roundToDigits : AxesAndRulesDefaults.roundToDigits, formatYLabel);
    };
    var getLabelTextsForSecondaryYAxis = function (val, index) {
        var showFractionalValues = secondaryYAxisConfig.showFractionalValues, yAxisLabelTexts = secondaryYAxisConfig.yAxisLabelTexts, yAxisOffset = secondaryYAxisConfig.yAxisOffset, yAxisLabelPrefix = secondaryYAxisConfig.yAxisLabelPrefix, yAxisLabelSuffix = secondaryYAxisConfig.yAxisLabelSuffix, roundToDigits = secondaryYAxisConfig.roundToDigits, formatYLabel = secondaryYAxisConfig.formatYLabel;
        return getLabelTextUtil(val, index, showFractionalValues, yAxisLabelTexts, yAxisOffset, yAxisLabelPrefix, yAxisLabelSuffix, roundToDigits !== null && roundToDigits !== void 0 ? roundToDigits : AxesAndRulesDefaults.roundToDigits, formatYLabel);
    };
    return {
        secondaryYAxisConfig: secondaryYAxisConfig,
        horizSections: horizSections,
        yAxisExtraHeightAtTop: yAxisExtraHeightAtTop,
        secondaryHorizSections: secondaryHorizSections,
        showReferenceLine1: showReferenceLine1,
        referenceLine1Config: referenceLine1Config,
        referenceLine1Position: referenceLine1Position,
        showReferenceLine2: showReferenceLine2,
        referenceLine2Config: referenceLine2Config,
        referenceLine2Position: referenceLine2Position,
        showReferenceLine3: showReferenceLine3,
        referenceLine3Config: referenceLine3Config,
        referenceLine3Position: referenceLine3Position,
        horizSectionsBelow: horizSectionsBelow,
        secondaryHorizSectionsBelow: secondaryHorizSectionsBelow,
        getLabelTexts: getLabelTexts,
        getLabelTextsForSecondaryYAxis: getLabelTextsForSecondaryYAxis
    };
};
