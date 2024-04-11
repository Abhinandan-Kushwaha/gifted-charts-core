import { AxesAndRulesDefaults } from '../../utils/constants'
import {
  type HorizSectionsType,
  type horizSectionPropTypes,
  type secondaryYAxisType
} from '../../utils/types'
import { computeMaxAndMinItems, getLabelTextUtil } from '../../utils'

export const getHorizSectionVals = (props: horizSectionPropTypes) => {
  const {
    width,
    noOfSectionsBelowXAxis,
    totalWidth,
    endSpacing,
    yAxisSide,
    noOfSections,
    yAxisLabelWidth,
    yAxisLabelContainerStyle,
    yAxisThickness,
    yAxisColor,
    yAxisExtraHeight,
    trimYAxisAtTop,
    dashWidth,
    dashGap,
    rulesType,
    rulesThickness,
    spacing,
    showYAxisIndices,
    yAxisIndicesHeight,
    yAxisIndicesWidth,
    yAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    showFractionalValues,
    yAxisTextNumberOfLines,
    yAxisLabelPrefix,
    yAxisLabelSuffix,
    yAxisTextStyle,
    containerHeight,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,

    stepValue,
    roundToDigits,

    yAxisOffset,
    formatYLabel,

    secondaryData,
    secondaryYAxis
  } = props

  const yAxisExtraHeightAtTop = trimYAxisAtTop ? 0 : yAxisExtraHeight

  /***********************************************************************************************************************************
   *                                                                                                                                  *
   *****************************               secondary Y Axis related props computations               ******************************
   *                                                                                                                                  *
   ***********************************************************************************************************************************/

  const secondaryYAxisConfig: secondaryYAxisType = {
    noOfSections: secondaryYAxis?.noOfSections ?? noOfSections,
    maxValue: secondaryYAxis?.maxValue,
    mostNegativeValue: secondaryYAxis?.mostNegativeValue,
    stepValue: secondaryYAxis?.stepValue,
    stepHeight: secondaryYAxis?.stepHeight,

    showFractionalValues:
      secondaryYAxis?.showFractionalValues ?? showFractionalValues,
    roundToDigits: secondaryYAxis?.roundToDigits ?? roundToDigits,
    noOfSectionsBelowXAxis:
      secondaryYAxis?.noOfSectionsBelowXAxis ?? noOfSectionsBelowXAxis,

    showYAxisIndices: secondaryYAxis?.showYAxisIndices ?? showYAxisIndices,
    yAxisIndicesHeight:
      secondaryYAxis?.yAxisIndicesHeight ?? yAxisIndicesHeight,
    yAxisIndicesWidth: secondaryYAxis?.yAxisIndicesWidth ?? yAxisIndicesWidth,
    yAxisIndicesColor: secondaryYAxis?.yAxisIndicesColor ?? yAxisIndicesColor,

    yAxisSide: secondaryYAxis?.yAxisSide ?? yAxisSide,
    yAxisOffset: secondaryYAxis?.yAxisOffset,
    yAxisThickness: secondaryYAxis?.yAxisThickness ?? yAxisThickness,
    yAxisColor: secondaryYAxis?.yAxisColor ?? yAxisColor,
    yAxisLabelContainerStyle:
      secondaryYAxis?.yAxisLabelContainerStyle ?? yAxisLabelContainerStyle,
    yAxisLabelTexts: secondaryYAxis?.yAxisLabelTexts ?? yAxisLabelTexts,
    yAxisTextStyle: secondaryYAxis?.yAxisTextStyle ?? yAxisTextStyle,
    yAxisTextNumberOfLines:
      secondaryYAxis?.yAxisTextNumberOfLines ?? yAxisTextNumberOfLines,
    yAxisLabelWidth: secondaryYAxis?.yAxisLabelWidth ?? yAxisLabelWidth,
    hideYAxisText: secondaryYAxis?.hideYAxisText ?? hideYAxisText,
    yAxisLabelPrefix: secondaryYAxis?.yAxisLabelPrefix ?? yAxisLabelPrefix,
    yAxisLabelSuffix: secondaryYAxis?.yAxisLabelSuffix ?? yAxisLabelSuffix,
    hideOrigin: secondaryYAxis?.hideOrigin ?? hideOrigin,
    formatYLabel: secondaryYAxis?.formatYLabel
  }

  const { maxItem, minItem } = computeMaxAndMinItems(
    secondaryData,
    secondaryYAxisConfig.roundToDigits,
    secondaryYAxisConfig.showFractionalValues
  )
  secondaryYAxisConfig.maxValue =
    secondaryYAxisConfig.maxValue ?? (maxItem || maxValue)
  secondaryYAxisConfig.mostNegativeValue =
    secondaryYAxisConfig.mostNegativeValue ?? minItem
  secondaryYAxisConfig.stepValue =
    secondaryYAxisConfig.stepValue ??
    (secondaryYAxisConfig.maxValue ?? 0) /
      (secondaryYAxisConfig.noOfSections ?? noOfSections)
  secondaryYAxisConfig.stepHeight =
    secondaryYAxisConfig.stepHeight ||
    containerHeight / (secondaryYAxisConfig.noOfSections ?? noOfSections)

  const horizSections: HorizSectionsType = []
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i
    if (showFractionalValues || roundToDigits) {
      value = parseFloat(
        value.toFixed(roundToDigits ?? AxesAndRulesDefaults.roundToDigits)
      )
    }

    horizSections.push({
      value: yAxisLabelTexts?.length
        ? yAxisLabelTexts[noOfSections + noOfSectionsBelowXAxis - i] ??
          value.toString()
        : value.toString()
    })
  }

  const horizSectionsBelow: HorizSectionsType = []
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i
      if (showFractionalValues || roundToDigits) {
        value = parseFloat(
          value.toFixed(roundToDigits ?? AxesAndRulesDefaults.roundToDigits)
        )
      }
      horizSectionsBelow.push({
        value: props.yAxisLabelTexts
          ? props.yAxisLabelTexts[noOfSectionsBelowXAxis - i] ??
            value.toString()
          : value.toString()
      })
    }
  }

  const secondaryHorizSections: HorizSectionsType = []
  if (secondaryYAxis) {
    for (
      let i = 0;
      i <= (secondaryYAxisConfig.noOfSections ?? noOfSections);
      i++
    ) {
      let value = secondaryYAxisConfig.stepValue * i
      if (
        secondaryYAxisConfig.showFractionalValues ||
        secondaryYAxisConfig.roundToDigits
      ) {
        value = parseFloat(
          value.toFixed(
            secondaryYAxisConfig.roundToDigits ??
              AxesAndRulesDefaults.roundToDigits
          )
        )
      }
      secondaryHorizSections.push({
        value: secondaryYAxisConfig.yAxisLabelTexts?.length
          ? secondaryYAxisConfig.yAxisLabelTexts[
              i - noOfSectionsBelowXAxis - 1
            ] ?? value.toString()
          : value.toString()
      })
    }
  }

  const secondaryHorizSectionsBelow: HorizSectionsType = []
  if (secondaryYAxisConfig.noOfSectionsBelowXAxis) {
    for (let i = 1; i <= secondaryYAxisConfig.noOfSectionsBelowXAxis; i++) {
      let value =
        secondaryYAxisConfig.stepValue *
        (i - secondaryYAxisConfig.noOfSectionsBelowXAxis - 1)
      if (
        secondaryYAxisConfig.showFractionalValues ||
        secondaryYAxisConfig.roundToDigits
      ) {
        value = parseFloat(
          value.toFixed(
            secondaryYAxisConfig.roundToDigits ??
              AxesAndRulesDefaults.roundToDigits
          )
        )
      }
      secondaryHorizSectionsBelow.push({
        value: secondaryYAxisConfig.yAxisLabelTexts?.length
          ? secondaryYAxisConfig.yAxisLabelTexts[i - 1] ?? value.toString()
          : value.toString()
      })
    }
  }

  /***********************************************************************************************************************************
   ***********************************************************************************************************************************/

  let {
    showReferenceLine1,
    referenceLine1Position,
    referenceLine1Config,

    showReferenceLine2,
    referenceLine2Position,
    referenceLine2Config,

    showReferenceLine3,
    referenceLine3Position,
    referenceLine3Config
  } = referenceLinesConfig

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: (width || totalWidth - spacing) + endSpacing,
    color: 'black',
    type: rulesType,
    dashWidth,
    dashGap,
    labelText: '',
    labelTextStyle: null,
    zIndex: 1
  }

  showReferenceLine1 = referenceLinesConfig.showReferenceLine1 || false
  referenceLine1Position =
    referenceLinesConfig.referenceLine1Position ??
    (referenceLinesConfig.referenceLine1Position || containerHeight / 2)
  referenceLine1Config = referenceLinesConfig.referenceLine1Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine1Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine1Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine1Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine1Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine1Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine1Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine1Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine1Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
        zIndex:
          referenceLinesConfig.referenceLine1Config.zIndex ??
          defaultReferenceConfig.zIndex
      }
    : defaultReferenceConfig

  showReferenceLine2 = referenceLinesConfig.showReferenceLine2 || false
  referenceLine2Position =
    referenceLinesConfig.referenceLine2Position ??
    (referenceLinesConfig.referenceLine2Position || (3 * containerHeight) / 2)
  referenceLine2Config = referenceLinesConfig.referenceLine2Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine2Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine2Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine2Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine2Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine2Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine2Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine2Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine2Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
        zIndex:
          referenceLinesConfig.referenceLine2Config.zIndex ??
          defaultReferenceConfig.zIndex
      }
    : defaultReferenceConfig

  showReferenceLine3 = referenceLinesConfig.showReferenceLine3 || false
  referenceLine3Position =
    referenceLinesConfig.referenceLine3Position ??
    (referenceLinesConfig.referenceLine3Position || containerHeight / 3)
  referenceLine3Config = referenceLinesConfig.referenceLine3Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine3Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine3Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine3Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine3Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine3Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine3Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine3Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine3Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
        zIndex:
          referenceLinesConfig.referenceLine3Config.zIndex ??
          defaultReferenceConfig.zIndex
      }
    : defaultReferenceConfig

  const getLabelTexts = (val: string, index: number): string => {
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
      formatYLabel
    )
  }

  const getLabelTextsForSecondaryYAxis = (val: string, index: number): string => {
    const {
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits,
      formatYLabel
    } = secondaryYAxisConfig
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
      formatYLabel
    )
  }

  return {
    secondaryYAxisConfig,
    horizSections,
    yAxisExtraHeightAtTop,
    secondaryHorizSections,
    showReferenceLine1,
    referenceLine1Config,
    referenceLine1Position,
    showReferenceLine2,
    referenceLine2Config,
    referenceLine2Position,
    showReferenceLine3,
    referenceLine3Config,
    referenceLine3Position,
    horizSectionsBelow,
    secondaryHorizSectionsBelow,
    getLabelTexts,
    getLabelTextsForSecondaryYAxis
  }
}
