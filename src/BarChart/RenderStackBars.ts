import { useState } from 'react'
import { type StackedBarChartPropsType, type stackDataItem } from './types'

export const useRenderStackBars = (props: StackedBarChartPropsType) => {
  const {
    item,
    index,
    containerHeight,
    maxValue,
    propSpacing,
    initialSpacing,
    stackData,
    isAnimated
  } = props
  const cotainsNegative = item.stacks.some((item) => item.value < 0)
  const noAnimation = cotainsNegative || !isAnimated

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

  const totalHeight = props.item.stacks.reduce(
    (acc, stack) =>
      acc +
      (Math.abs(stack.value) * (containerHeight ?? 200)) / (maxValue || 200),
    0
  )

  const [height, setHeight] = useState(noAnimation ? totalHeight : 1)

  const getBarHeight = (value: number, marginBottom?: number): number => {
    return (
      (Math.abs(value) * (containerHeight ?? 200)) / (maxValue || 200) -
      (marginBottom ?? 0)
    )
  }

  const getPosition = (index: number) => {
    /* Returns bottom position for stack item
           negative values are below origin (-> negative position) */
    const height = getBarHeight(
      item.stacks[index].value,
      item.stacks[index].marginBottom
    )

    const itemValue = item.stacks[index].value
    const isNegative = itemValue <= 0
    let position = isNegative ? -(height || 0) : 0

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
        .map((_, index) => getPosition(index))
        .sort((a, b) => a - b)?.[0] || 0
    )
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

  return {
    cotainsNegative,
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
    getStackBorderRadii
  }
}
