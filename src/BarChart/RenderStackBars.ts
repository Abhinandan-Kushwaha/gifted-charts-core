import { useState } from 'react'
import { type StackedBarChartPropsType, type stackDataItem } from './types'
import { TooltipProps } from '../utils/types'
import { BarDefaults } from '../utils/constants'

interface IStackedBarChartPropsType extends StackedBarChartPropsType {
  renderTooltipConditions?: string[]
}
export const useRenderStackBars = (props: IStackedBarChartPropsType) => {
  const {
    item,
    index,
    containerHeight = 200,
    containerHeightIncludingBelowXAxis,
    maxValue,
    propSpacing,
    initialSpacing,
    stackData,
    isAnimated,
    xAxisThickness,
    renderTooltip,
    leftShiftForTooltip,
    leftShiftForLastIndexTooltip,
    autoCenterTooltip,
    horizontal,
    stepHeight,
    stepValue,
    negativeStepHeight,
    negativeStepValue: nsv,
    secondaryStepHeight,
    secondaryStepValue,
    secondaryNegativeStepHeight,
    secondaryNegativeStepValue
  } = props
  const negativeStepValue = Math.abs(nsv)
  const containsNegativeValue = item.stacks.some((item) => item.value < 0)
  const anyStackContainsNegativeValue = stackData.some((item) =>
    item.stacks.some((stack) => stack.value < 0)
  )
  const noAnimation = containsNegativeValue || !isAnimated

  const localBarInnerComponent =
    item.barInnerComponent ?? props.barInnerComponent

  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius
  } = item

  let leftSpacing = initialSpacing
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (stackData[i].spacing ?? propSpacing ?? 0) +
      (stackData[i].stacks[0].barWidth ?? props.barWidth ?? 30)
  }
  const disablePress = props.disablePress ?? false

  const heightFactor = item.isSecondary
    ? secondaryStepHeight / secondaryStepValue
    : stepHeight / stepValue

  const negativeHeightFactor = item.isSecondary
    ? secondaryNegativeStepHeight / secondaryNegativeStepValue
    : negativeStepHeight / negativeStepValue

  const totalHeight = props.item.stacks.reduce(
    (acc, stack) =>
      acc +
      Math.abs(stack.value) *
        (stack.value < 0 ? negativeHeightFactor : heightFactor),
    0
  )

  const [height, setHeight] = useState(noAnimation ? totalHeight : 1)

  const getBarHeight = (value: number, marginBottom?: number): number => {
    return (
      Math.abs(value) * (value < 0 ? negativeHeightFactor : heightFactor) -
      (marginBottom ?? 0)
    )
  }

  const getPosition = (index: number, height: number) => {
    /* Returns bottom position for stack item
           negative values are below origin (-> negative position) */

    const itemValue = item.stacks[index].value
    const isNegative = itemValue <= 0
    let position = isNegative ? -(height || 0) - xAxisThickness : 0

    for (let i = 0; i < index; i++) {
      const valueOnIndex = item.stacks[i].value
      if (isNegative && valueOnIndex <= 0) {
        position +=
          (valueOnIndex * (containerHeight ?? 200)) / (maxValue || 200)
      } else if (!isNegative && valueOnIndex >= 0) {
        position +=
          (valueOnIndex * (containerHeight ?? 200)) / (maxValue || 200)
      }
    }
    return position
  }

  const getLowestPosition = (): number => {
    return (
      item.stacks
        .map((_, index) =>
          getPosition(index, getBarHeight(_.value, _.marginBottom))
        )
        .sort((a, b) => a - b)?.[0] || 0
    )
  }
  const getPositiveBoxesHeightSum = (): number => {
    let sum = 0
    item.stacks.forEach((_, ind) => {
      const value = _.value
      sum += value > 0 ? getBarHeight(value, _.marginBottom) : 0
    })
    return sum
  }

  const lowestBarPosition = getLowestPosition()

  const getStackBorderRadii = (item: stackDataItem, index: number) => {
    const stackItem = item.stacks[index]
    const borderRadii = {
      borderTopLeftRadius:
        stackItem.borderTopLeftRadius ??
        stackItem.borderRadius ??
        props.barBorderTopLeftRadius ??
        props.barBorderRadius ??
        0,
      borderTopRightRadius:
        stackItem.borderTopRightRadius ??
        stackItem.borderRadius ??
        props.barBorderTopRightRadius ??
        props.barBorderRadius ??
        0,
      borderBottomLeftRadius:
        stackItem.borderBottomLeftRadius ??
        stackItem.borderRadius ??
        props.barBorderBottomLeftRadius ??
        props.barBorderRadius ??
        0,
      borderBottomRightRadius:
        stackItem.borderBottomRightRadius ??
        stackItem.borderRadius ??
        props.barBorderBottomRightRadius ??
        props.barBorderRadius ??
        0
    }
    return borderRadii
  }

  const chartHeightBelowXAxis =
    containerHeightIncludingBelowXAxis - containerHeight
  const barHeight = totalHeight

  const getBotomForTooltip = () => {
    if (anyStackContainsNegativeValue) {
      // If any of the stacks has a negative value
      if (item.stacks.some((stack: any) => stack.value > 0)) {
        // if a box in the current stack has a +ve value
        return chartHeightBelowXAxis + (getPositiveBoxesHeightSum() ?? 0) - 8
      } else return chartHeightBelowXAxis - barHeight - 34
    } else {
      return barHeight + 2
    }
  }

  const tooltipProps: TooltipProps = {
    barHeight,
    barWidth: item.barWidth || props.barWidth || 30,
    item,
    index,
    isLast: index === stackData.length - 1,
    leftSpacing,
    leftShiftForLastIndexTooltip,
    leftShiftForTooltip: item.leftShiftForTooltip ?? leftShiftForTooltip ?? 0,
    renderTooltip,
    autoCenterTooltip,
    horizontal,
    bottom: getBotomForTooltip()
  }

  return {
    containsNegativeValue,
    noAnimation,
    localBarInnerComponent,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    leftSpacing,
    disablePress,
    totalHeight,
    height,
    setHeight,
    getBarHeight,
    getPosition,
    getLowestPosition,
    lowestBarPosition,
    getStackBorderRadii,
    tooltipProps,
    renderTooltipConditions:
      props.renderTooltipConditions ?? BarDefaults.renderTooltipConditions
  }
}
