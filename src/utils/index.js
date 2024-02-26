System.register(["./constants", "./types"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var _a, _b, constants_1, types_1, versionString, versionAr, msb, mid, lsb, rnVersion, getCumulativeWidth, getLighterColor, svgQuadraticCurvePath, svgPath, line, controlPoint, bezierCommand, getSegmentString, getCurvePathWithSegments, getPreviousSegmentsLastPoint, getPathWithHighlight, getRegionPathObjects, getSegmentedPathObjects, getArrowPoints, getAxesAndRulesProps, getExtendedContainerHeightWithPadding, getSecondaryDataWithOffsetIncluded, getArrowProperty, getAllArrowProperties, maxAndMinUtil, computeMaxAndMinItems, getLabelTextUtil, getXForLineInBar, getYForLineInBar, clone, getLineConfigForBarChart, getNoOfSections, getMaxValue, getBarFrontColor, getBarSideColor, getBarTopColor, getBarWidth, getInterpolatedData, getLineSegmentsForMissingValues, getTextSizeForPieLabels;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (types_1_1) {
                types_1 = types_1_1;
            }
        ],
        execute: function () {
            versionString = require("react-native/package.json").version;
            versionAr = (_b = (_a = versionString === null || versionString === void 0 ? void 0 : versionString.split) === null || _a === void 0 ? void 0 : _a.call(versionString, ".")) !== null && _b !== void 0 ? _b : "";
            msb = Number(versionAr[0]);
            mid = Number(versionAr[1]);
            lsb = Number(versionAr[2]);
            exports_1("rnVersion", rnVersion = (!isNaN(msb) ? msb : 0) * 1000000 +
                (!isNaN(mid) ? mid : 0) * 10000 +
                (!isNaN(lsb) ? lsb : 0));
            exports_1("getCumulativeWidth", getCumulativeWidth = function (data, index, spacing) {
                var cumWidth = 0;
                for (var i = 0; i < index; i++) {
                    var barWidth = data[i].barWidth;
                    barWidth = barWidth || 30;
                    cumWidth += barWidth + (spacing !== null && spacing !== void 0 ? spacing : 20);
                }
                return cumWidth;
            });
            exports_1("getLighterColor", getLighterColor = function (color) {
                var r, g, b, lighter = "#";
                if (color.startsWith("#")) {
                    if (color.length < 7) {
                        r = parseInt(color[1], 16);
                        g = parseInt(color[2], 16);
                        b = parseInt(color[3], 16);
                        if (r < 14) {
                            r += 2;
                            lighter += r.toString(16);
                        }
                        if (g < 14) {
                            g += 2;
                            lighter += g.toString(16);
                        }
                        if (b < 14) {
                            b += 2;
                            lighter += b.toString(16);
                        }
                    }
                    else {
                        r = parseInt(color[1] + color[2], 16);
                        g = parseInt(color[3] + color[4], 16);
                        b = parseInt(color[5] + color[6], 16);
                        if (r < 224) {
                            r += 32;
                            lighter += r.toString(16);
                        }
                        if (g < 224) {
                            g += 32;
                            lighter += g.toString(16);
                        }
                        if (b < 224) {
                            b += 32;
                            lighter += b.toString(16);
                        }
                    }
                }
                return lighter;
            });
            exports_1("svgQuadraticCurvePath", svgQuadraticCurvePath = function (points) {
                var path = "M" + points[0][0] + "," + points[0][1];
                for (var i = 0; i < points.length - 1; i++) {
                    var xMid = (points[i][0] + points[i + 1][0]) / 2;
                    var yMid = (points[i][1] + points[i + 1][1]) / 2;
                    var cpX1 = (xMid + points[i][0]) / 2;
                    var cpX2 = (xMid + points[i + 1][0]) / 2;
                    path +=
                        "Q " +
                            cpX1 +
                            ", " +
                            points[i][1] +
                            ", " +
                            xMid +
                            ", " +
                            yMid +
                            (" Q " +
                                cpX2 +
                                ", " +
                                points[i + 1][1] +
                                ", " +
                                points[i + 1][0] +
                                ", " +
                                points[i + 1][1]);
                }
                return path;
            });
            exports_1("svgPath", svgPath = function (points, curveType, curvature) {
                if (!(points === null || points === void 0 ? void 0 : points.length))
                    return "";
                if (curveType === types_1.CurveType.QUADRATIC) {
                    return svgQuadraticCurvePath(points);
                }
                // build the d attributes by looping over the points
                var d = points.reduce(function (acc, point, i, a) {
                    return i === 0
                        ? // if first point
                            "M".concat(point[0], ",").concat(point[1])
                        : // else
                            "".concat(acc, " ").concat(bezierCommand(point, i, a, curvature));
                }, "");
                return d;
            });
            line = function (pointA, pointB) {
                var lengthX = pointB[0] - pointA[0];
                var lengthY = pointB[1] - pointA[1];
                return {
                    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
                    angle: Math.atan2(lengthY, lengthX),
                };
            };
            controlPoint = function (curvature, current, previous, next, reverse) {
                // When 'current' is the first or last point of the array
                // 'previous' or 'next' don't exist.
                // Replace with 'current'
                var p = previous || current;
                var n = next || current;
                // The smoothing ratio
                var smoothing = curvature;
                // Properties of the opposed-line
                var o = line(p, n);
                // If is end-control-point, add PI to the angle to go backward
                var angle = o.angle + (reverse ? Math.PI : 0);
                var length = o.length * smoothing;
                // The control point position is relative to the current point
                var x = current[0] + Math.cos(angle) * length;
                var y = current[1] + Math.sin(angle) * length;
                return [x, y];
            };
            exports_1("bezierCommand", bezierCommand = function (point, i, a, curvature) {
                // start control point
                var _a = controlPoint(curvature, a[i - 1], a[i - 2], point), cpsX = _a[0], cpsY = _a[1];
                // end control point
                var _b = controlPoint(curvature, point, a[i - 1], a[i + 1], true), cpeX = _b[0], cpeY = _b[1];
                return "C".concat(cpsX, ",").concat(cpsY, " ").concat(cpeX, ",").concat(cpeY, " ").concat(point[0], ",").concat(point[1]);
            });
            exports_1("getSegmentString", getSegmentString = function (lineSegment, index, startDelimeter, endDelimeter) {
                var segment = lineSegment === null || lineSegment === void 0 ? void 0 : lineSegment.find(function (segment) { return segment.startIndex === index; });
                return segment ? startDelimeter + JSON.stringify(segment) + endDelimeter : "";
            });
            exports_1("getCurvePathWithSegments", getCurvePathWithSegments = function (path, lineSegment, startDelimeter, endDelimeter) {
                if (!(lineSegment === null || lineSegment === void 0 ? void 0 : lineSegment.length))
                    return path;
                var newPath = "";
                var pathArray = path.split("C");
                var _loop_1 = function (i) {
                    var segment = lineSegment === null || lineSegment === void 0 ? void 0 : lineSegment.find(function (segment) { return segment.startIndex === i; });
                    newPath +=
                        (pathArray[i].startsWith("M") ? "" : "C") +
                            pathArray[i] +
                            (segment ? startDelimeter + JSON.stringify(segment) + endDelimeter : "");
                };
                for (var i = 0; i < pathArray.length; i++) {
                    _loop_1(i);
                }
                return newPath;
            });
            exports_1("getPreviousSegmentsLastPoint", getPreviousSegmentsLastPoint = function (isCurved, previousSegment) {
                var prevSegmentLastPoint = isCurved
                    ? previousSegment.substring(previousSegment.trim().lastIndexOf(" "))
                    : previousSegment
                        .substring(previousSegment.lastIndexOf("L"))
                        .replace("L", "M");
                return ((prevSegmentLastPoint.trim()[0] === "M" ? "" : "M") + prevSegmentLastPoint);
            });
            exports_1("getPathWithHighlight", getPathWithHighlight = function (data, i, highlightedRange, startIndex, endIndex, getX, getY) {
                var path = "";
                var from = highlightedRange.from, to = highlightedRange.to;
                var currentPointRegion = data[i].value < from ? constants_1.loc.DOWN : data[i].value > to ? constants_1.loc.UP : constants_1.loc.IN;
                if (i !== endIndex) {
                    var nextPointRegion = data[i + 1].value < from
                        ? constants_1.loc.DOWN
                        : data[i + 1].value > to
                            ? constants_1.loc.UP
                            : constants_1.loc.IN;
                    if (currentPointRegion !== nextPointRegion ||
                        (i === startIndex && currentPointRegion === constants_1.loc.IN)) {
                        var x1 = getX(i), y1 = getY(data[i].value), x2 = getX(i + 1), y2 = getY(data[i + 1].value);
                        var m = (y2 - y1) / (x2 - x1), x = void 0, y = void 0;
                        if (i === startIndex && currentPointRegion === constants_1.loc.IN) {
                            // If the 1st point lies IN
                            y = y1;
                            x = x1;
                            path +=
                                "L" +
                                    x +
                                    " " +
                                    y +
                                    " " +
                                    constants_1.RANGE_ENTER +
                                    JSON.stringify(highlightedRange) +
                                    constants_1.STOP;
                            if (nextPointRegion === constants_1.loc.UP) {
                                y = getY(to);
                                x = (y - y1) / m + x1;
                                path += "L" + x + " " + y + " " + constants_1.RANGE_EXIT;
                            }
                            else if (nextPointRegion === constants_1.loc.DOWN) {
                                y = getY(from);
                                x = (y - y1) / m + x1;
                                path += "L" + x + " " + y + " " + constants_1.RANGE_EXIT;
                            }
                        }
                        else if (currentPointRegion !== nextPointRegion) {
                            if (currentPointRegion === constants_1.loc.DOWN && nextPointRegion === constants_1.loc.UP) {
                                // if current point is in DOWN and next point is in UP, then we will add 2 points to the the path
                                y = getY(from);
                                x = (y - y1) / m + x1;
                                path +=
                                    "L" +
                                        x +
                                        " " +
                                        y +
                                        " " +
                                        constants_1.RANGE_ENTER +
                                        JSON.stringify(highlightedRange) +
                                        constants_1.STOP;
                                y = getY(to);
                                x = (y - y1) / m + x1;
                                path += "L" + x + " " + y + " " + constants_1.RANGE_EXIT;
                            }
                            else if (currentPointRegion === constants_1.loc.UP &&
                                nextPointRegion === constants_1.loc.DOWN) {
                                // if current point is in UP and next point is in DOWN, then we will add 2 points to the the path
                                y = getY(to);
                                x = (y - y1) / m + x1;
                                path +=
                                    "L" +
                                        x +
                                        " " +
                                        y +
                                        " " +
                                        constants_1.RANGE_ENTER +
                                        JSON.stringify(highlightedRange) +
                                        constants_1.STOP;
                                y = getY(from);
                                x = (y - y1) / m + x1;
                                path += "L" + x + " " + y + " " + constants_1.RANGE_EXIT;
                            }
                            else {
                                if ((currentPointRegion === constants_1.loc.UP && nextPointRegion === constants_1.loc.IN) ||
                                    (currentPointRegion === constants_1.loc.IN && nextPointRegion === constants_1.loc.UP)) {
                                    y = getY(to);
                                }
                                else if ((currentPointRegion === constants_1.loc.IN && nextPointRegion === constants_1.loc.DOWN) ||
                                    (currentPointRegion === constants_1.loc.DOWN && nextPointRegion === constants_1.loc.IN)) {
                                    y = getY(from);
                                }
                                m = (y2 - y1) / (x2 - x1);
                                x = (y - y1) / m + x1;
                                var prefix = nextPointRegion === constants_1.loc.IN
                                    ? constants_1.RANGE_ENTER + JSON.stringify(highlightedRange) + constants_1.STOP
                                    : constants_1.RANGE_EXIT;
                                path += "L" + x + " " + y + " " + prefix;
                            }
                        }
                    }
                }
                else if (currentPointRegion === constants_1.loc.IN) {
                    // If the last point lies IN, add RANGE_EXIT
                    path += constants_1.RANGE_EXIT;
                }
                return path;
            });
            exports_1("getRegionPathObjects", getRegionPathObjects = function (points, color, currentLineThickness, thickness, strokeDashArray, isCurved, startDelimeter, stop, endDelimeter) {
                var _a, _b;
                var ar = [{}];
                var tempStr = points;
                if (!points.startsWith(startDelimeter)) {
                    /**********************            line upto first segment                 *****************/
                    var lineSvgProps = {
                        d: points.substring(0, points.indexOf(startDelimeter)),
                        color: color,
                        strokeWidth: currentLineThickness || thickness,
                    };
                    if (strokeDashArray) {
                        lineSvgProps.strokeDashArray = strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                }
                while (tempStr.includes(startDelimeter)) {
                    var startDelimeterIndex = tempStr.indexOf(startDelimeter);
                    var stopIndex = tempStr.indexOf(stop);
                    var endDelimeterIndex = tempStr.indexOf(endDelimeter);
                    var segmentConfigString = tempStr.substring(startDelimeterIndex + startDelimeter.length, stopIndex);
                    var segmentConfig = JSON.parse(segmentConfigString);
                    var segment = tempStr.substring(stopIndex + stop.length, endDelimeterIndex);
                    var previousSegment = ar[ar.length - 1].d;
                    var moveToLastPointOfPreviousSegment = getPreviousSegmentsLastPoint(isCurved, previousSegment);
                    /**********************            segment line                 *****************/
                    var lineSvgProps = {
                        d: moveToLastPointOfPreviousSegment + segment,
                        color: (_a = segmentConfig.color) !== null && _a !== void 0 ? _a : color,
                        strokeWidth: (_b = segmentConfig.thickness) !== null && _b !== void 0 ? _b : (currentLineThickness || thickness),
                    };
                    if (segmentConfig.strokeDashArray) {
                        lineSvgProps.strokeDashArray = segmentConfig.strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                    tempStr = tempStr.substring(endDelimeterIndex + endDelimeter.length);
                    var nextDelimiterIndex = tempStr.indexOf(startDelimeter);
                    var stringUptoNextSegment = tempStr.substring(0, nextDelimiterIndex);
                    /**********************            line upto the next segment            *****************/
                    if (nextDelimiterIndex !== -1 &&
                        stringUptoNextSegment.indexOf(isCurved ? "C" : "L") !== -1) {
                        var previousSegment_1 = ar[ar.length - 1].d;
                        var moveToLastPointOfPreviousSegment_1 = getPreviousSegmentsLastPoint(isCurved, previousSegment_1);
                        var lineSvgProps_1 = {
                            d: moveToLastPointOfPreviousSegment_1 + " " + stringUptoNextSegment,
                            color: color,
                            strokeWidth: currentLineThickness || thickness,
                        };
                        if (strokeDashArray) {
                            lineSvgProps_1.strokeDashArray = strokeDashArray;
                        }
                        ar.push(lineSvgProps_1);
                    }
                }
                /**********************            line after the last segment            *****************/
                if (tempStr.length) {
                    var previousSegment = ar[ar.length - 1].d;
                    var moveToLastPointOfPreviousSegment = getPreviousSegmentsLastPoint(isCurved, previousSegment);
                    var lineSvgProps = {
                        d: moveToLastPointOfPreviousSegment + tempStr,
                        color: color,
                        strokeWidth: currentLineThickness || thickness,
                    };
                    if (strokeDashArray) {
                        lineSvgProps.strokeDashArray = strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                }
                ar.shift();
                return ar;
            });
            exports_1("getSegmentedPathObjects", getSegmentedPathObjects = function (points, color, currentLineThickness, thickness, strokeDashArray, isCurved, startDelimeter, endDelimeter) {
                var _a, _b;
                var ar = [{}];
                var tempStr = points;
                if (!points.startsWith(startDelimeter)) {
                    /**********************            line upto first segment                 *****************/
                    var lineSvgProps = {
                        d: points.substring(0, points.indexOf(startDelimeter)),
                        color: color,
                        strokeWidth: currentLineThickness || thickness,
                    };
                    if (strokeDashArray) {
                        lineSvgProps.strokeDashArray = strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                }
                while (tempStr.includes(startDelimeter)) {
                    var startDelimeterIndex = tempStr.indexOf(startDelimeter);
                    var endDelimeterIndex = tempStr.indexOf(endDelimeter);
                    var segmentConfigString = tempStr.substring(startDelimeterIndex + startDelimeter.length, endDelimeterIndex);
                    var segmentConfig = JSON.parse(segmentConfigString);
                    var startIndex = segmentConfig.startIndex, endIndex = segmentConfig.endIndex;
                    var segmentLength = endIndex - startIndex;
                    var segment = tempStr.substring(endDelimeterIndex + endDelimeter.length);
                    var c = 0, s = 0, i = void 0;
                    for (i = 0; i < segment.length; i++) {
                        if (segment[i] === (isCurved ? "C" : "L"))
                            c++;
                        if (c === segmentLength) {
                            if (segment[i] === " ")
                                s++;
                            if (s === (isCurved ? 3 : 2))
                                break;
                        }
                    }
                    segment = segment.substring(0, i);
                    var previousSegment = ar[ar.length - 1].d;
                    var moveToLastPointOfPreviousSegment = getPreviousSegmentsLastPoint(isCurved, previousSegment);
                    /**********************            segment line                 *****************/
                    var lineSvgProps = {
                        d: moveToLastPointOfPreviousSegment + segment,
                        color: (_a = segmentConfig.color) !== null && _a !== void 0 ? _a : color,
                        strokeWidth: (_b = segmentConfig.thickness) !== null && _b !== void 0 ? _b : (currentLineThickness || thickness),
                    };
                    if (segmentConfig.strokeDashArray) {
                        lineSvgProps.strokeDashArray = segmentConfig.strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                    tempStr = tempStr.substring(endDelimeterIndex + endDelimeter.length + i);
                    var nextDelimiterIndex = tempStr.indexOf(startDelimeter);
                    var stringUptoNextSegment = tempStr.substring(0, nextDelimiterIndex);
                    /**********************            line upto the next segment            *****************/
                    if (nextDelimiterIndex !== -1 &&
                        stringUptoNextSegment.indexOf(isCurved ? "C" : "L") !== -1) {
                        var previousSegment_2 = ar[ar.length - 1].d;
                        var moveToLastPointOfPreviousSegment_2 = getPreviousSegmentsLastPoint(isCurved, previousSegment_2);
                        var lineSvgProps_2 = {
                            d: moveToLastPointOfPreviousSegment_2 + " " + stringUptoNextSegment,
                            color: color,
                            strokeWidth: currentLineThickness || thickness,
                        };
                        if (strokeDashArray) {
                            lineSvgProps_2.strokeDashArray = strokeDashArray;
                        }
                        ar.push(lineSvgProps_2);
                    }
                }
                /**********************            line after the last segment            *****************/
                if (tempStr.length) {
                    var previousSegment = ar[ar.length - 1].d;
                    var moveToLastPointOfPreviousSegment = getPreviousSegmentsLastPoint(isCurved, previousSegment);
                    var lineSvgProps = {
                        d: moveToLastPointOfPreviousSegment + tempStr,
                        color: color,
                        strokeWidth: currentLineThickness || thickness,
                    };
                    if (strokeDashArray) {
                        lineSvgProps.strokeDashArray = strokeDashArray;
                    }
                    ar.push(lineSvgProps);
                }
                ar.shift();
                return ar;
            });
            exports_1("getArrowPoints", getArrowPoints = function (arrowTipX, arrowTipY, x1, y1, arrowLength, arrowWidth, showArrowBase) {
                var dataLineSlope = (arrowTipY - y1) / (arrowTipX - x1);
                var d = arrowLength !== null && arrowLength !== void 0 ? arrowLength : 0;
                var d2 = (arrowWidth !== null && arrowWidth !== void 0 ? arrowWidth : 0) / 2;
                var interSectionX = arrowTipX - Math.sqrt((d * d) / (dataLineSlope * dataLineSlope + 1));
                var interSectionY = arrowTipY - dataLineSlope * (arrowTipX - interSectionX);
                var arrowBasex1, arrowBaseY1, arrowBaseX2, arrowBaseY2;
                if (dataLineSlope === 0) {
                    arrowBasex1 = interSectionX;
                    arrowBaseY1 = interSectionY - d2;
                    arrowBaseX2 = interSectionX;
                    arrowBaseY2 = interSectionY + d2;
                }
                else {
                    var arrowBaseSlope = -1 / dataLineSlope;
                    arrowBasex1 =
                        interSectionX -
                            Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
                    arrowBaseY1 =
                        interSectionY - arrowBaseSlope * (interSectionX - arrowBasex1);
                    arrowBaseX2 =
                        interSectionX +
                            Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
                    arrowBaseY2 =
                        interSectionY + arrowBaseSlope * (interSectionX - arrowBasex1);
                }
                var arrowPoints = " M".concat(interSectionX, " ").concat(interSectionY);
                arrowPoints += " ".concat(showArrowBase ? "L" : "M").concat(arrowBasex1, " ").concat(arrowBaseY1);
                arrowPoints += " L".concat(arrowTipX, " ").concat(arrowTipY);
                arrowPoints += " M".concat(interSectionX, " ").concat(interSectionY);
                arrowPoints += " ".concat(showArrowBase ? "L" : "M").concat(arrowBaseX2, " ").concat(arrowBaseY2);
                arrowPoints += " L".concat(arrowTipX, " ").concat(arrowTipY);
                return arrowPoints;
            });
            exports_1("getAxesAndRulesProps", getAxesAndRulesProps = function (props, stepValue, maxValue) {
                var _a, _b;
                var axesAndRulesProps = {
                    yAxisSide: props.yAxisSide,
                    yAxisLabelContainerStyle: props.yAxisLabelContainerStyle,
                    yAxisColor: props.yAxisColor,
                    yAxisExtraHeight: props.yAxisExtraHeight,
                    trimYAxisAtTop: props.trimYAxisAtTop,
                    overflowTop: props.overflowTop,
                    yAxisThickness: props.yAxisThickness,
                    xAxisColor: props.xAxisColor,
                    xAxisLength: props.xAxisLength,
                    xAxisType: props.xAxisType,
                    xAxisTextNumberOfLines: (_a = props.xAxisTextNumberOfLines) !== null && _a !== void 0 ? _a : 1,
                    xAxisLabelsHeight: props.xAxisLabelsHeight,
                    xAxisLabelsVerticalShift: props.xAxisLabelsVerticalShift,
                    dashWidth: props.dashWidth,
                    dashGap: props.dashGap,
                    backgroundColor: props.backgroundColor,
                    hideRules: props.hideRules,
                    rulesLength: props.rulesLength,
                    rulesType: props.rulesType,
                    rulesThickness: props.rulesThickness,
                    rulesColor: props.rulesColor,
                    rulesConfigArray: props.rulesConfigArray,
                    showYAxisIndices: props.showYAxisIndices,
                    yAxisIndicesHeight: props.yAxisIndicesHeight,
                    yAxisIndicesWidth: props.yAxisIndicesWidth,
                    yAxisIndicesColor: props.yAxisIndicesColor,
                    hideOrigin: props.hideOrigin,
                    hideYAxisText: props.hideYAxisText,
                    yAxisTextNumberOfLines: props.yAxisTextNumberOfLines,
                    yAxisLabelPrefix: props.yAxisLabelPrefix,
                    yAxisLabelSuffix: props.yAxisLabelSuffix,
                    yAxisTextStyle: props.yAxisTextStyle,
                    referenceLinesConfig: {
                        showReferenceLine1: props.showReferenceLine1,
                        referenceLine1Position: props.referenceLine1Position,
                        referenceLine1Config: props.referenceLine1Config,
                        showReferenceLine2: props.showReferenceLine2,
                        referenceLine2Position: props.referenceLine2Position,
                        referenceLine2Config: props.referenceLine2Config,
                        showReferenceLine3: props.showReferenceLine3,
                        referenceLine3Position: props.referenceLine3Position,
                        referenceLine3Config: props.referenceLine3Config,
                        referenceLinesOverChartContent: props.referenceLinesOverChartContent,
                    },
                    showVerticalLines: props.showVerticalLines,
                    verticalLinesThickness: props.verticalLinesThickness,
                    verticalLinesHeight: props.verticalLinesHeight,
                    verticalLinesColor: props.verticalLinesColor,
                    verticalLinesShift: props.verticalLinesShift,
                    verticalLinesZIndex: props.verticalLinesZIndex,
                    verticalLinesSpacing: props.verticalLinesSpacing,
                    noOfVerticalLines: props.noOfVerticalLines,
                    //specific to Line charts-
                    verticalLinesUptoDataPoint: props.verticalLinesUptoDataPoint,
                    roundToDigits: props.roundToDigits,
                    stepValue: stepValue,
                    secondaryYAxis: props.secondaryYAxis,
                    formatYLabel: props.formatYLabel,
                };
                if ((props.secondaryYAxis || ((_b = props.lineConfig) === null || _b === void 0 ? void 0 : _b.isSecondary)) &&
                    maxValue !== undefined) {
                    axesAndRulesProps.secondaryYAxis = __assign(__assign({}, props.secondaryYAxis), { maxValue: maxValue });
                }
                return axesAndRulesProps;
            });
            exports_1("getExtendedContainerHeightWithPadding", getExtendedContainerHeightWithPadding = function (containerHeight, overflowTop) { return containerHeight + (overflowTop !== null && overflowTop !== void 0 ? overflowTop : 0) + 10; });
            exports_1("getSecondaryDataWithOffsetIncluded", getSecondaryDataWithOffsetIncluded = function (secondaryData, secondaryYAxis, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive) {
                if (!secondaryData)
                    return secondaryData;
                var nullishHandledData = getInterpolatedData(secondaryData, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive);
                if (secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisOffset) {
                    return nullishHandledData.map(function (item) {
                        var _a;
                        item.value = item.value - ((_a = secondaryYAxis === null || secondaryYAxis === void 0 ? void 0 : secondaryYAxis.yAxisOffset) !== null && _a !== void 0 ? _a : 0);
                        return item;
                    });
                }
                return nullishHandledData;
            });
            exports_1("getArrowProperty", getArrowProperty = function (property, count, props, defaultArrowConfig) {
                var _a, _b, _c, _d;
                return ((_d = (_b = (_a = props["arrowConfig".concat(count)]) === null || _a === void 0 ? void 0 : _a["".concat(property)]) !== null && _b !== void 0 ? _b : (_c = props["arrowConfig"]) === null || _c === void 0 ? void 0 : _c["".concat(property)]) !== null && _d !== void 0 ? _d : defaultArrowConfig["".concat(property)]);
            });
            exports_1("getAllArrowProperties", getAllArrowProperties = function (props, defaultArrowConfig) {
                var _a, _b, _c, _d, _e, _f;
                var arrowLength1 = getArrowProperty("length", 1, props, defaultArrowConfig);
                var arrowWidth1 = getArrowProperty("width", 1, props, defaultArrowConfig);
                var arrowStrokeWidth1 = getArrowProperty("strokeWidth", 1, props, defaultArrowConfig);
                var arrowStrokeColor1 = getArrowProperty("strokeColor", 1, props, defaultArrowConfig);
                var arrowFillColor1 = getArrowProperty("fillColor", 1, props, defaultArrowConfig);
                var showArrowBase1 = getArrowProperty("showArrowBase", 1, props, defaultArrowConfig);
                var arrowLength2 = getArrowProperty("length", 2, props, defaultArrowConfig);
                var arrowWidth2 = getArrowProperty("width", 2, props, defaultArrowConfig);
                var arrowStrokeWidth2 = getArrowProperty("strokeWidth", 2, props, defaultArrowConfig);
                var arrowStrokeColor2 = getArrowProperty("strokeColor", 2, props, defaultArrowConfig);
                var arrowFillColor2 = getArrowProperty("fillColor", 2, props, defaultArrowConfig);
                var showArrowBase2 = getArrowProperty("showArrowBase", 2, props, defaultArrowConfig);
                var arrowLength3 = getArrowProperty("length", 3, props, defaultArrowConfig);
                var arrowWidth3 = getArrowProperty("width", 3, props, defaultArrowConfig);
                var arrowStrokeWidth3 = getArrowProperty("strokeWidth", 3, props, defaultArrowConfig);
                var arrowStrokeColor3 = getArrowProperty("strokeColor", 3, props, defaultArrowConfig);
                var arrowFillColor3 = getArrowProperty("fillColor", 3, props, defaultArrowConfig);
                var showArrowBase3 = getArrowProperty("showArrowBase", 3, props, defaultArrowConfig);
                var arrowLength4 = getArrowProperty("length", 4, props, defaultArrowConfig);
                var arrowWidth4 = getArrowProperty("width", 4, props, defaultArrowConfig);
                var arrowStrokeWidth4 = getArrowProperty("strokeWidth", 4, props, defaultArrowConfig);
                var arrowStrokeColor4 = getArrowProperty("strokeColor", 4, props, defaultArrowConfig);
                var arrowFillColor4 = getArrowProperty("fillColor", 4, props, defaultArrowConfig);
                var showArrowBase4 = getArrowProperty("showArrowBase", 4, props, defaultArrowConfig);
                var arrowLength5 = getArrowProperty("length", 5, props, defaultArrowConfig);
                var arrowWidth5 = getArrowProperty("width", 5, props, defaultArrowConfig);
                var arrowStrokeWidth5 = getArrowProperty("strokeWidth", 5, props, defaultArrowConfig);
                var arrowStrokeColor5 = getArrowProperty("strokeColor", 5, props, defaultArrowConfig);
                var arrowFillColor5 = getArrowProperty("fillColor", 5, props, defaultArrowConfig);
                var showArrowBase5 = getArrowProperty("showArrowBase", 5, props, defaultArrowConfig);
                var arrowLengthsFromSet = (_a = props.dataSet) === null || _a === void 0 ? void 0 : _a.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : arrowLength1; });
                var arrowWidthsFromSet = (_b = props.dataSet) === null || _b === void 0 ? void 0 : _b.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.arrowWidth) !== null && _b !== void 0 ? _b : arrowWidth1; });
                var arrowStrokeWidthsFromSet = (_c = props.dataSet) === null || _c === void 0 ? void 0 : _c.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.arrowStrokeWidth) !== null && _b !== void 0 ? _b : arrowStrokeWidth1; });
                var arrowStrokeColorsFromSet = (_d = props.dataSet) === null || _d === void 0 ? void 0 : _d.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.arrowStrokeColor) !== null && _b !== void 0 ? _b : arrowStrokeColor1; });
                var arrowFillColorsFromSet = (_e = props.dataSet) === null || _e === void 0 ? void 0 : _e.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.arrowFillColor) !== null && _b !== void 0 ? _b : arrowFillColor1; });
                var showArrowBasesFromSet = (_f = props.dataSet) === null || _f === void 0 ? void 0 : _f.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.arrowConfig) === null || _a === void 0 ? void 0 : _a.showArrowBase) !== null && _b !== void 0 ? _b : showArrowBase1; });
                return {
                    arrowLength1: arrowLength1,
                    arrowWidth1: arrowWidth1,
                    arrowStrokeWidth1: arrowStrokeWidth1,
                    arrowStrokeColor1: arrowStrokeColor1,
                    arrowFillColor1: arrowFillColor1,
                    showArrowBase1: showArrowBase1,
                    arrowLength2: arrowLength2,
                    arrowWidth2: arrowWidth2,
                    arrowStrokeWidth2: arrowStrokeWidth2,
                    arrowStrokeColor2: arrowStrokeColor2,
                    arrowFillColor2: arrowFillColor2,
                    showArrowBase2: showArrowBase2,
                    arrowLength3: arrowLength3,
                    arrowWidth3: arrowWidth3,
                    arrowStrokeWidth3: arrowStrokeWidth3,
                    arrowStrokeColor3: arrowStrokeColor3,
                    arrowFillColor3: arrowFillColor3,
                    showArrowBase3: showArrowBase3,
                    arrowLength4: arrowLength4,
                    arrowWidth4: arrowWidth4,
                    arrowStrokeWidth4: arrowStrokeWidth4,
                    arrowStrokeColor4: arrowStrokeColor4,
                    arrowFillColor4: arrowFillColor4,
                    showArrowBase4: showArrowBase4,
                    arrowLength5: arrowLength5,
                    arrowWidth5: arrowWidth5,
                    arrowStrokeWidth5: arrowStrokeWidth5,
                    arrowStrokeColor5: arrowStrokeColor5,
                    arrowFillColor5: arrowFillColor5,
                    showArrowBase5: showArrowBase5,
                    arrowLengthsFromSet: arrowLengthsFromSet,
                    arrowWidthsFromSet: arrowWidthsFromSet,
                    arrowStrokeWidthsFromSet: arrowStrokeWidthsFromSet,
                    arrowStrokeColorsFromSet: arrowStrokeColorsFromSet,
                    arrowFillColorsFromSet: arrowFillColorsFromSet,
                    showArrowBasesFromSet: showArrowBasesFromSet,
                };
            });
            exports_1("maxAndMinUtil", maxAndMinUtil = function (maxItem, minItem, roundToDigits, showFractionalValues) {
                if (showFractionalValues || roundToDigits) {
                    maxItem *= 10 * (roundToDigits || 1);
                    maxItem = maxItem + (10 - (maxItem % 10));
                    maxItem /= 10 * (roundToDigits || 1);
                    maxItem = parseFloat(maxItem.toFixed(roundToDigits || 1));
                    if (minItem !== 0) {
                        minItem *= 10 * (roundToDigits || 1);
                        minItem = minItem - (10 + (minItem % 10));
                        minItem /= 10 * (roundToDigits || 1);
                        minItem = parseFloat(minItem.toFixed(roundToDigits || 1));
                    }
                }
                else {
                    maxItem = maxItem + (10 - (maxItem % 10));
                    if (minItem !== 0) {
                        minItem = minItem - (10 + (minItem % 10));
                    }
                }
                return { maxItem: maxItem, minItem: minItem };
            });
            exports_1("computeMaxAndMinItems", computeMaxAndMinItems = function (data, roundToDigits, showFractionalValues) {
                if (!(data === null || data === void 0 ? void 0 : data.length)) {
                    return { maxItem: 0, minItem: 0 };
                }
                var maxItem = 0, minItem = 0;
                data.forEach(function (item) {
                    if (item.value > maxItem) {
                        maxItem = item.value;
                    }
                    if (item.value < minItem) {
                        minItem = item.value;
                    }
                });
                return maxAndMinUtil(maxItem, minItem, roundToDigits, showFractionalValues);
            });
            exports_1("getLabelTextUtil", getLabelTextUtil = function (val, index, showFractionalValues, yAxisLabelTexts, yAxisOffset, yAxisLabelPrefix, yAxisLabelSuffix, roundToDigits, formatYLabel) {
                var _a, _b;
                var label = "";
                if (showFractionalValues ||
                    (yAxisLabelTexts && yAxisLabelTexts[index] !== undefined)) {
                    if (yAxisLabelTexts === null || yAxisLabelTexts === void 0 ? void 0 : yAxisLabelTexts[index])
                        return val;
                    if (val) {
                        label = isNaN(Number(val))
                            ? val
                            : (Number(val) + (yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0)).toFixed(roundToDigits);
                    }
                    else {
                        label = (_a = yAxisOffset === null || yAxisOffset === void 0 ? void 0 : yAxisOffset.toString()) !== null && _a !== void 0 ? _a : "0";
                    }
                }
                else {
                    if (val) {
                        label = val.toString().split(".")[0];
                        label = (Number(label) + (yAxisOffset !== null && yAxisOffset !== void 0 ? yAxisOffset : 0)).toString();
                    }
                    else {
                        label = (_b = yAxisOffset === null || yAxisOffset === void 0 ? void 0 : yAxisOffset.toString()) !== null && _b !== void 0 ? _b : "0";
                    }
                }
                return (yAxisLabelPrefix +
                    (formatYLabel ? formatYLabel(label) : label) +
                    yAxisLabelSuffix);
            });
            exports_1("getXForLineInBar", getXForLineInBar = function (index, firstBarWidth, currentBarWidth, yAxisLabelWidth, lineConfig, spacing) {
                var _a;
                return yAxisLabelWidth +
                    firstBarWidth / 2 +
                    lineConfig.initialSpacing +
                    (currentBarWidth + ((_a = lineConfig.spacing) !== null && _a !== void 0 ? _a : spacing)) * index +
                    lineConfig.shiftX -
                    lineConfig.dataPointsWidth / 2 -
                    4;
            });
            exports_1("getYForLineInBar", getYForLineInBar = function (value, shiftY, containerHeight, maxValue) {
                return containerHeight - shiftY - (value * containerHeight) / maxValue;
            });
            exports_1("clone", clone = function (obj) {
                if (obj === null || typeof obj !== "object" || "isActiveClone" in obj)
                    return obj;
                var temp;
                if (obj instanceof Date)
                    temp = new Date(obj);
                else
                    temp = obj.constructor();
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj["isActiveClone"] = null;
                        temp[key] = clone(obj[key]);
                        delete obj["isActiveClone"];
                    }
                }
                return temp;
            });
            exports_1("getLineConfigForBarChart", getLineConfigForBarChart = function (lineConfig, barInitialSpacing) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
                return {
                    initialSpacing: (_b = (_a = lineConfig.initialSpacing) !== null && _a !== void 0 ? _a : barInitialSpacing) !== null && _b !== void 0 ? _b : constants_1.defaultLineConfig.initialSpacing,
                    spacing: lineConfig.spacing,
                    curved: lineConfig.curved || constants_1.defaultLineConfig.curved,
                    curvature: (_c = lineConfig.curvature) !== null && _c !== void 0 ? _c : constants_1.defaultLineConfig.curvature,
                    curveType: (_d = lineConfig.curveType) !== null && _d !== void 0 ? _d : constants_1.defaultLineConfig.curveType,
                    isAnimated: lineConfig.isAnimated || constants_1.defaultLineConfig.isAnimated,
                    animationDuration: lineConfig.animationDuration || constants_1.defaultLineConfig.animationDuration,
                    thickness: lineConfig.thickness || constants_1.defaultLineConfig.thickness,
                    color: lineConfig.color || constants_1.defaultLineConfig.color,
                    hideDataPoints: lineConfig.hideDataPoints || constants_1.defaultLineConfig.hideDataPoints,
                    dataPointsShape: lineConfig.dataPointsShape || constants_1.defaultLineConfig.dataPointsShape,
                    dataPointsHeight: lineConfig.dataPointsHeight || constants_1.defaultLineConfig.dataPointsHeight,
                    dataPointsWidth: lineConfig.dataPointsWidth || constants_1.defaultLineConfig.dataPointsWidth,
                    dataPointsColor: lineConfig.dataPointsColor || constants_1.defaultLineConfig.dataPointsColor,
                    dataPointsRadius: lineConfig.dataPointsRadius || constants_1.defaultLineConfig.dataPointsRadius,
                    textColor: lineConfig.textColor || constants_1.defaultLineConfig.textColor,
                    textFontSize: lineConfig.textFontSize || constants_1.defaultLineConfig.textFontSize,
                    textShiftX: lineConfig.textShiftX || constants_1.defaultLineConfig.textShiftX,
                    textShiftY: lineConfig.textShiftY || constants_1.defaultLineConfig.textShiftY,
                    shiftX: lineConfig.shiftX || constants_1.defaultLineConfig.shiftX,
                    shiftY: lineConfig.shiftY || constants_1.defaultLineConfig.shiftY,
                    delay: lineConfig.delay || constants_1.defaultLineConfig.delay,
                    startIndex: lineConfig.startIndex || constants_1.defaultLineConfig.startIndex,
                    endIndex: lineConfig.endIndex === 0
                        ? 0
                        : lineConfig.endIndex || constants_1.defaultLineConfig.endIndex,
                    showArrow: (_e = lineConfig.showArrow) !== null && _e !== void 0 ? _e : constants_1.defaultLineConfig.showArrow,
                    arrowConfig: {
                        length: (_g = (_f = lineConfig.arrowConfig) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : (_h = constants_1.defaultLineConfig.arrowConfig) === null || _h === void 0 ? void 0 : _h.length,
                        width: (_k = (_j = lineConfig.arrowConfig) === null || _j === void 0 ? void 0 : _j.width) !== null && _k !== void 0 ? _k : (_l = constants_1.defaultLineConfig.arrowConfig) === null || _l === void 0 ? void 0 : _l.width,
                        strokeWidth: (_o = (_m = lineConfig.arrowConfig) === null || _m === void 0 ? void 0 : _m.strokeWidth) !== null && _o !== void 0 ? _o : (_p = constants_1.defaultLineConfig.arrowConfig) === null || _p === void 0 ? void 0 : _p.strokeWidth,
                        strokeColor: (_r = (_q = lineConfig.arrowConfig) === null || _q === void 0 ? void 0 : _q.strokeColor) !== null && _r !== void 0 ? _r : (_s = constants_1.defaultLineConfig.arrowConfig) === null || _s === void 0 ? void 0 : _s.strokeColor,
                        fillColor: (_u = (_t = lineConfig.arrowConfig) === null || _t === void 0 ? void 0 : _t.fillColor) !== null && _u !== void 0 ? _u : (_v = constants_1.defaultLineConfig.arrowConfig) === null || _v === void 0 ? void 0 : _v.fillColor,
                        showArrowBase: (_x = (_w = lineConfig.arrowConfig) === null || _w === void 0 ? void 0 : _w.showArrowBase) !== null && _x !== void 0 ? _x : (_y = constants_1.defaultLineConfig.arrowConfig) === null || _y === void 0 ? void 0 : _y.showArrowBase,
                    },
                    customDataPoint: lineConfig.customDataPoint,
                    isSecondary: (_z = lineConfig.isSecondary) !== null && _z !== void 0 ? _z : constants_1.defaultLineConfig.isSecondary,
                };
            });
            exports_1("getNoOfSections", getNoOfSections = function (noOfSections, maxValue, stepValue) {
                return maxValue && stepValue
                    ? maxValue / stepValue
                    : noOfSections !== null && noOfSections !== void 0 ? noOfSections : constants_1.AxesAndRulesDefaults.noOfSections;
            });
            exports_1("getMaxValue", getMaxValue = function (maxValue, stepValue, noOfSections, maxItem) {
                return maxValue !== null && maxValue !== void 0 ? maxValue : (stepValue ? stepValue * noOfSections : maxItem);
            });
            exports_1("getBarFrontColor", getBarFrontColor = function (isFocused, focusedBarConfig, itemFrontColor, frontColor, isThreeD) {
                var _a;
                if (isFocused) {
                    return ((_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.color) !== null && _a !== void 0 ? _a : (isThreeD
                        ? constants_1.BarDefaults.focusedThreeDBarFrontColor
                        : constants_1.BarDefaults.focusedBarFrontColor));
                }
                return (itemFrontColor ||
                    frontColor ||
                    (isThreeD ? constants_1.BarDefaults.threeDBarFrontColor : constants_1.BarDefaults.frontColor));
            });
            exports_1("getBarSideColor", getBarSideColor = function (isFocused, focusedBarConfig, itemSideColor, sideColor) {
                var _a;
                if (isFocused) {
                    return (_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.sideColor) !== null && _a !== void 0 ? _a : constants_1.BarDefaults.focusedBarSideColor;
                }
                return itemSideColor || sideColor;
            });
            exports_1("getBarTopColor", getBarTopColor = function (isFocused, focusedBarConfig, itemTopColor, topColor) {
                var _a;
                if (isFocused) {
                    return (_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.topColor) !== null && _a !== void 0 ? _a : constants_1.BarDefaults.focusedBarTopColor;
                }
                return itemTopColor || topColor;
            });
            exports_1("getBarWidth", getBarWidth = function (isFocused, focusedBarConfig, itemBarWidth, barWidth) {
                var _a;
                var localBarWidth = itemBarWidth || barWidth || constants_1.BarDefaults.barWidth;
                if (isFocused) {
                    return (_a = focusedBarConfig === null || focusedBarConfig === void 0 ? void 0 : focusedBarConfig.width) !== null && _a !== void 0 ? _a : localBarWidth;
                }
                return localBarWidth;
            });
            exports_1("getInterpolatedData", getInterpolatedData = function (dataParam, showDataPointsForMissingValues, interpolateMissingValues, onlyPositive) {
                if (!interpolateMissingValues) {
                    return dataParam.map(function (item) {
                        if (typeof item.value !== "number") {
                            if (showDataPointsForMissingValues)
                                return __assign(__assign({}, item), { value: 0 });
                            return __assign(__assign({}, item), { value: 0, hideDataPoint: true });
                        }
                        return item;
                    });
                }
                if (!interpolateMissingValues)
                    return dataParam;
                var data = clone(dataParam);
                var n = data.length;
                /**************         PRE-PROCESSING           **************/
                var numericValue;
                var numericValuesLength = data.filter(function (item) {
                    var isNum = typeof item.value === "number";
                    if (isNum) {
                        numericValue = item.value;
                        return true;
                    }
                    return false;
                }).length;
                if (!numericValuesLength)
                    return [];
                if (numericValuesLength === 1) {
                    data.forEach(function (item) {
                        if (!showDataPointsForMissingValues && typeof item.value !== "number") {
                            item.hideDataPoint = true;
                        }
                        item.value = numericValue;
                    });
                    return data;
                }
                /**********************************************************************/
                data.forEach(function (item, index) {
                    if (typeof item.value === "number")
                        return;
                    //  Cut the line in 2 halves-> pre and post
                    //  Now there are 4 possibilities-
                    //    1. Both pre and post have valid values
                    //    2. Only pre has valid value
                    //    3. Only post has valid value
                    //    4. None has valid value -> this is already handled in preprocessing
                    var pre = data.slice(0, index);
                    var post = data.slice(index + 1, n);
                    var preValidIndex = pre.findLastIndex(function (item) { return typeof item.value === "number"; });
                    var postValidInd = post.findIndex(function (item) { return typeof item.value === "number"; });
                    var postValidIndex = postValidInd + index + 1;
                    var count, step;
                    //    1. Both pre and post have valid values
                    if (preValidIndex !== -1 && postValidInd !== -1) {
                        count = postValidIndex - preValidIndex;
                        step = (data[postValidIndex].value - data[preValidIndex].value) / count;
                        data[index].value =
                            data[preValidIndex].value + step * (index - preValidIndex);
                    }
                    //    2. Only pre has valid value
                    else if (preValidIndex !== -1 && postValidInd === -1) {
                        //  Now there are 2 possibilities-
                        //    1. There's only 1 valid value in the pre -> this is already handled in preprocessing
                        //    2. There are more than valid values in pre
                        var secondPre = data.slice(0, preValidIndex);
                        var secondPreIndex = secondPre.findLastIndex(function (item) { return typeof item.value === "number"; });
                        count = preValidIndex - secondPreIndex;
                        step = (data[secondPreIndex].value - data[preValidIndex].value) / count;
                        data[index].value =
                            data[preValidIndex].value - step * (index - preValidIndex);
                    }
                    //    3. Only post has valid value
                    else if (preValidIndex === -1 && postValidInd !== -1) {
                        //  Now there are 2 possibilities-
                        //    1. There's only 1 valid value in the post -> this is already handled in preprocessing
                        //    2. There are more than valid values in post
                        var secondPost = data.slice(postValidIndex + 1, n);
                        var secondPostInd = secondPost.findIndex(function (item) { return typeof item.value === "number"; });
                        var secondPostIndex = secondPostInd + postValidIndex + 1;
                        count = secondPostIndex - postValidIndex;
                        step = (data[secondPostIndex].value - data[postValidIndex].value) / count;
                        data[index].value =
                            data[postValidIndex].value - step * (postValidIndex - index);
                    }
                    // hide data point (since it is interpolated)
                    if (!showDataPointsForMissingValues) {
                        item.hideDataPoint = true;
                    }
                });
                return onlyPositive
                    ? data.map(function (item) { return (__assign(__assign({}, item), { value: Math.max(item.value, 0) })); })
                    : data;
            });
            exports_1("getLineSegmentsForMissingValues", getLineSegmentsForMissingValues = function (data) {
                if (!(data === null || data === void 0 ? void 0 : data.length))
                    return undefined;
                var i, n = data.length;
                var numericValuesLength = data.filter(function (item) { return typeof item.value === "number"; }).length;
                if (!numericValuesLength)
                    return undefined;
                var segments = [];
                for (i = 0; i < n; i++) {
                    if (typeof data[i].value !== "number") {
                        var nextValidInd = data
                            .slice(i + 1, n)
                            .findIndex(function (item) { return typeof item.value === "number"; });
                        if (nextValidInd === -1) {
                            segments.push({
                                startIndex: Math.max(i - 1, 0),
                                endIndex: n,
                                color: "transparent",
                            });
                            break;
                        }
                        var nextValidIndex = nextValidInd + i + 1;
                        segments.push({
                            startIndex: Math.max(i - 1, 0),
                            endIndex: nextValidIndex,
                            color: "transparent",
                        });
                        i = nextValidIndex;
                    }
                }
                return segments;
            });
            exports_1("getTextSizeForPieLabels", getTextSizeForPieLabels = function (textSize, radius) { return (textSize ? Math.min(textSize, radius / 5) : 16); });
        }
    };
});
//# sourceMappingURL=index.js.map