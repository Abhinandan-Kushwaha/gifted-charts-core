import { AxesAndRulesDefaults } from '../utils/constants'
import { TooltipProps } from '../utils/types'
import { RenderBarsPropsType, barDataItemNullSafe } from './types'

export const useRenderBars = (props: RenderBarsPropsType) => {
  const {
    data,
    item,
    index,
    barWidth,
    initialSpacing,
    propSpacing,
    secondaryNegativeStepHeight,
    secondaryStepHeight,
    secondaryNegativeStepValue,
    secondaryStepValue,
    negativeStepHeight,
    negativeStepValue,
    stepHeight,
    stepValue,
    minHeight,
    xAxisThickness = AxesAndRulesDefaults.xAxisThickness,
    leftShiftForLastIndexTooltip,
    leftShiftForTooltip,
    renderTooltip,
    autoCenterTooltip,
    horizontal,
    containerHeight,
    containerHeightIncludingBelowXAxis
  } = props

  const heightFactor = item.isSecondary
    ? item.value < 0
      ? (secondaryNegativeStepHeight ?? secondaryStepHeight) /
        (secondaryNegativeStepValue ?? secondaryStepValue)
      : secondaryStepHeight / secondaryStepValue
    : item.value < 0
    ? negativeStepHeight / negativeStepValue
    : stepHeight / stepValue

  const barHeight = Math.max(
    minHeight,
    Math.abs(item.value) * heightFactor - xAxisThickness
  )

  let leftSpacing = initialSpacing
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (data[i].spacing ?? propSpacing) + (data[i].barWidth || barWidth)
  }

  const containsNegativeValue = data.some(
    (item: barDataItemNullSafe) => item.value < 0
  )

  const chartHeightBelowXAxis =
    containerHeightIncludingBelowXAxis - containerHeight

  const getBotomForTooltip = () => {
    if (item.value < 0) {
      return chartHeightBelowXAxis - barHeight - 34
    } else {
      return (
        (containsNegativeValue
          ? barHeight + chartHeightBelowXAxis - 8
          : barHeight) + 2
      )
    }
  }

  const tooltipProps: TooltipProps = {
    barHeight,
    barWidth: item.barWidth || barWidth,
    item,
    index,
    isLast: index === data.length - 1,
    leftSpacing,
    leftShiftForLastIndexTooltip,
    leftShiftForTooltip: item.leftShiftForTooltip ?? leftShiftForTooltip ?? 0,
    renderTooltip,
    autoCenterTooltip,
    horizontal,
    bottom: getBotomForTooltip()
  }

  return {
    heightFactor,
    barHeight,
    leftSpacing,
    tooltipProps
  }
}
