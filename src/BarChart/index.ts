import { useEffect, useMemo, useState } from 'react'
import {
  type lineConfigType,
  type barDataItem,
  type stackDataItem,
  BarChartPropsTypeForWeb
} from './types'
import {
  getArrowPoints,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getLineConfigForBarChart,
  getMaxValue,
  getMostNegativeValue,
  getNoOfSections,
  getXForLineInBar,
  getYForLineInBar,
  indexOfFirstNonZeroDigit,
  maxAndMinUtil,
  svgPath
} from '../utils'
import {
  AxesAndRulesDefaults,
  BarDefaults,
  chartTypes,
  defaultLineConfig,
  defaultPointerConfig
} from '../utils/constants'
import {
  type BarAndLineChartsWrapperTypes,
  type secondaryYAxisType
} from '../utils/types'
import { type Animated } from 'react-native'

export interface extendedBarChartPropsType extends BarChartPropsTypeForWeb {
  parentWidth: number
  heightValue?: Animated.Value
  widthValue?: Animated.Value
  opacityValue?: Animated.Value
  verticalLinesUptoDataPoint?: boolean
  secondaryYAxis?: secondaryYAxisType | boolean
}

export const useBarChart = (props: extendedBarChartPropsType) => {
  const {
    heightValue,
    widthValue,
    opacityValue,
    yAxisOffset,
    adjustToWidth,
    parentWidth,
    labelsDistanceFromXaxis,
    autoShiftLabelsForNegativeStacks,
    focusedBarIndex,
    negativeStepValue,
    autoCenterTooltip
  } = props
  const [points, setPoints] = useState('')
  const [points2, setPoints2] = useState('')
  const [arrowPoints, setArrowPoints] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(focusedBarIndex ?? -1)
  const showLine = props.showLine ?? BarDefaults.showLine

  useEffect(() => {
    setSelectedIndex(focusedBarIndex ?? -1)
  }, [focusedBarIndex])

  const data = useMemo(() => {
    if (!props.data) {
      return []
    }
    if (yAxisOffset) {
      return props.data.map((item) => ({
        ...item,
        value: (item.value ?? 0) - yAxisOffset
      }))
    }
    return props.data
  }, [yAxisOffset, props.data])

  const stackData = useMemo(() => {
    if (!props.stackData) {
      return undefined
    }
    if (yAxisOffset) {
      return props.stackData.map((item) => {
        let cumulativeSum = 0
        return {
          ...item,
          stacks: item.stacks.map((stackItem) => {
            const stack = {
              ...stackItem,
              value: Math.max(
                // yAxisOffset is reduced from stackItems as long as their cumulative sum is less than yAxisOffset
                (stackItem.value ?? 0) -
                  (cumulativeSum < yAxisOffset
                    ? yAxisOffset - cumulativeSum
                    : 0),
                0
              )
            }
            cumulativeSum += stackItem.value
            return stack
          })
        }
      })
    }
    return props.stackData
  }, [yAxisOffset, props.stackData])

  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const autoComputedSectionWidth =
    props.initialSpacing !== undefined
      ? (parentWidth - yAxisLabelWidth) / data.length - props.initialSpacing
      : (parentWidth - yAxisLabelWidth) / (data.length + 0.5)

  const autoComputedBarWidth = autoComputedSectionWidth * 0.6
  const defaultBarWidth = adjustToWidth
    ? autoComputedBarWidth
    : BarDefaults.barWidth
  const barWidth = props.barWidth ?? defaultBarWidth

  const autoComputedSpacing = autoComputedSectionWidth * 0.4

  const spacing =
    props.spacing ?? (adjustToWidth ? autoComputedSpacing : BarDefaults.spacing)
  const initialSpacing = props.initialSpacing ?? spacing
  const endSpacing = props.endSpacing ?? spacing

  const horizontal = props.horizontal ?? BarDefaults.horizontal
  const rtl = props.rtl ?? BarDefaults.rtl
  const yAxisAtTop = props.yAxisAtTop ?? BarDefaults.yAxisAtTop
  const intactTopLabel = props.intactTopLabel ?? BarDefaults.intactTopLabel

  const heightFromProps = horizontal ? props.width : props.height
  const widthFromProps = horizontal ? props.height : props.width

  const isAnimated = props.isAnimated ?? BarDefaults.isAnimated
  const animationDuration =
    props.animationDuration ?? BarDefaults.animationDuration

  // const secondaryData = getSecondaryDataWithOffsetIncluded(
  //   props.secondaryData,
  //   props.secondaryYAxis
  // )

  const lineData = useMemo(() => {
    if (!props.lineData) {
      return stackData ?? data
    }
    if (yAxisOffset) {
      return props.lineData.map((item) => ({
        ...item,
        value: (item.value ?? 0) - (yAxisOffset ?? 0)
      }))
    }
    return props.lineData
  }, [yAxisOffset, props.lineData, data, stackData])

  const lineData2 = props.lineData2

  const lineBehindBars = props.lineBehindBars ?? BarDefaults.lineBehindBars

  defaultLineConfig.initialSpacing = initialSpacing
  defaultLineConfig.endIndex = lineData.length - 1
  defaultLineConfig.animationDuration = animationDuration

  const lineConfig: lineConfigType = props.lineConfig
    ? getLineConfigForBarChart(props.lineConfig, initialSpacing)
    : defaultLineConfig
  const lineConfig2: lineConfigType = props.lineConfig2
    ? getLineConfigForBarChart(props.lineConfig2, initialSpacing)
    : defaultLineConfig
  const noOfSections = getNoOfSections(
    props.noOfSections,
    props.maxValue,
    props.stepValue
  )
  const containerHeight =
    heightFromProps ??
    (props.stepHeight
      ? props.stepHeight * noOfSections
      : AxesAndRulesDefaults.containerHeight)
  const horizSections = [{ value: '0' }]
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections
  const labelWidth = props.labelWidth ?? AxesAndRulesDefaults.labelWidth
  const scrollToEnd = props.scrollToEnd ?? BarDefaults.scrollToEnd
  const scrollAnimation = props.scrollAnimation ?? BarDefaults.scrollAnimation
  const scrollEventThrottle =
    props.scrollEventThrottle ?? BarDefaults.scrollEventThrottle
  const labelsExtraHeight =
    props.labelsExtraHeight ?? AxesAndRulesDefaults.labelsExtraHeight

  let secondaryMaxItem = 0
  let secondaryMinItem = 0

  if (lineConfig.isSecondary) {
    lineData.forEach((item) => {
      if ((item.value ?? 0) > secondaryMaxItem) {
        secondaryMaxItem = item.value ?? 0
      }
      if ((item.value ?? 0) < secondaryMinItem) {
        secondaryMinItem = item.value ?? 0
      }
    })
  }

  let totalWidth = initialSpacing + endSpacing
  let maxItem = 0
  let minItem = 0
  let minPositiveItem = 0
  let secondaryMinPositiveItem = 0
  if (stackData) {
    stackData.forEach((stackItem, index) => {
      const stackSumMax = stackItem.stacks.reduce(
        (acc, stack) => acc + (stack.value >= 0 ? stack.value : 0),
        0
      )
      const stackSumMin = stackItem.stacks.reduce(
        (acc, stack) => acc + (stack.value < 0 ? stack.value : 0),
        0
      )

      if (stackItem.isSecondary) {
        if (stackSumMax > secondaryMaxItem) {
          secondaryMaxItem = stackSumMax
        }

        if (stackSumMin < secondaryMinItem) {
          secondaryMinItem = stackSumMin
          secondaryMinPositiveItem =
            secondaryMinItem > 0 ? secondaryMinItem : secondaryMinPositiveItem
        }
      } else {
        if (stackSumMax > maxItem) {
          maxItem = stackSumMax
        }

        if (stackSumMin < minItem) {
          minItem = stackSumMin
          minPositiveItem = minItem > 0 ? minItem : minPositiveItem
        }
      }
      totalWidth +=
        (stackItem.stacks[0].barWidth ?? props.barWidth ?? defaultBarWidth) +
        (index === data.length - 1 ? 0 : stackItem.spacing ?? spacing)
    })
  } else {
    data.forEach((item: barDataItem, index) => {
      if (item.isSecondary) {
        if (item.value > secondaryMaxItem) {
          secondaryMaxItem = item.value
        }
        if (item.value < secondaryMinItem) {
          secondaryMinItem = item.value
          secondaryMinPositiveItem =
            secondaryMinItem > 0 ? secondaryMinItem : secondaryMinPositiveItem
        }
      } else {
        if (item.value > maxItem) {
          maxItem = item.value
        }
        if (item.value < minItem) {
          minItem = item.value
          minPositiveItem = minItem > 0 ? minItem : minPositiveItem
        }
      }
      totalWidth +=
        (item.barWidth ?? props.barWidth ?? defaultBarWidth) +
        (index === data.length - 1 ? spacing : item.spacing ?? spacing)
    })
  }

  const valuesRange = maxItem - minPositiveItem // Diff bw largest & smallest +ve values
  const showFractionalValues = props.showFractionalValues ?? valuesRange <= 1
  const roundToDigits =
    props.roundToDigits ??
    (showFractionalValues ? indexOfFirstNonZeroDigit(valuesRange) + 1 : 0)

  const maxAndMin = maxAndMinUtil(
    maxItem,
    minItem,
    roundToDigits,
    showFractionalValues
  )

  const maxValue =
    getMaxValue(
      props.maxValue,
      props.stepValue,
      noOfSections,
      maxAndMin.maxItem
    ) || 10

  const secondaryRange = secondaryMaxItem - secondaryMinPositiveItem // Diff bw largest & smallest +ve values
  const showSecondaryFractionalValues =
    (props.secondaryYAxis as secondaryYAxisType)?.showFractionalValues ??
    secondaryRange <= 1
  const secondaryRoundToDigits =
    (props.secondaryYAxis as secondaryYAxisType)?.roundToDigits ??
    (showSecondaryFractionalValues
      ? indexOfFirstNonZeroDigit(secondaryRange) + 1
      : 0)

  const secondaryMaxAndMin = maxAndMinUtil(
    secondaryMaxItem,
    secondaryMinItem,
    secondaryRoundToDigits,
    showSecondaryFractionalValues
  )

  // const secondaryMaxValue = lineConfig.isSecondary
  //   ? typeof props.secondaryYAxis !== 'boolean'
  //     ? (props.secondaryYAxis as secondaryYAxisType).maxValue ??
  //       secondaryMaxAndMin.maxItem
  //     : secondaryMaxAndMin.maxItem
  //   : maxValue

  const secondaryMaxValue =
    (props.secondaryYAxis as secondaryYAxisType)?.maxValue ??
    secondaryMaxAndMin.maxItem

  const mostNegativeValue = getMostNegativeValue(
    props.mostNegativeValue,
    props.negativeStepValue,
    props.noOfSectionsBelowXAxis,
    maxAndMin.minItem
  )

  const stepValue = props.stepValue ?? maxValue / noOfSections

  const effectiveNegativeStepValue = negativeStepValue ?? stepValue

  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ??
    (effectiveNegativeStepValue
      ? Math.round(Math.ceil(-mostNegativeValue / effectiveNegativeStepValue))
      : 0)
  const showScrollIndicator =
    props.showScrollIndicator ?? BarDefaults.showScrollIndicator
  const side = props.side ?? BarDefaults.side
  const rotateLabel = props.rotateLabel ?? AxesAndRulesDefaults.rotateLabel
  const opacity = props.opacity ?? BarDefaults.opacity
  const isThreeD = props.isThreeD ?? BarDefaults.isThreeD

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines
  const xAxisLabelsVerticalShift =
    props.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift
  const horizontalRulesStyle = props.horizontalRulesStyle

  const autoShiftLabels = props.autoShiftLabels ?? false
  const barBorderColor = props.barBorderColor ?? BarDefaults.barBorderColor

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    0
  )

  const axesAndRulesProps = getAxesAndRulesProps(
    props,
    containerHeight,
    stepHeight,
    stepValue,
    noOfSections,
    roundToDigits,
    negativeStepValue ?? stepValue,
    secondaryMaxValue,
    secondaryMinItem,
    showSecondaryFractionalValues,
    secondaryRoundToDigits
  )

  const {
    stepHeight: secondaryStepHeight,
    stepValue: secondaryStepValue,
    negativeStepHeight: secondaryNegativeStepHeight,
    negativeStepValue: secondaryNegativeStepValue,
    noOfSectionsBelowXAxis: secondaryNoOfSectionsBelowXAxis
  } = axesAndRulesProps.secondaryYAxisConfig

  const primary4thQuadrantHeight =
    noOfSectionsBelowXAxis * (props.negativeStepHeight ?? stepHeight)
  const secondary4thQuadrantHeight =
    secondaryNoOfSectionsBelowXAxis * secondaryNegativeStepHeight

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight +
    Math.max(primary4thQuadrantHeight, secondary4thQuadrantHeight)

  const [pointerIndex, setPointerIndex] = useState(-1)
  const [pointerX, setPointerX] = useState(0)
  const [pointerY, setPointerY] = useState(0)
  const [pointerItem, setPointerItem] = useState<barDataItem | stackDataItem>()
  const [responderStartTime, setResponderStartTime] = useState(0)
  const [responderActive, setResponderActive] = useState(false)

  const pointerConfig = props.pointerConfig
  const getPointerProps = props.getPointerProps ?? null
  const pointerHeight = pointerConfig?.height ?? defaultPointerConfig.height
  const pointerWidth = pointerConfig?.width ?? defaultPointerConfig.width
  const pointerRadius = pointerConfig?.radius ?? defaultPointerConfig.radius
  const pointerColor =
    pointerConfig?.pointerColor ?? defaultPointerConfig.pointerColor
  const pointerComponent =
    pointerConfig?.pointerComponent ?? defaultPointerConfig.pointerComponent

  const showPointerStrip =
    pointerConfig?.showPointerStrip === false
      ? false
      : defaultPointerConfig.showPointerStrip
  const pointerStripHeight =
    pointerConfig?.pointerStripHeight ?? defaultPointerConfig.pointerStripHeight
  const pointerStripWidth =
    pointerConfig?.pointerStripWidth ?? defaultPointerConfig.pointerStripWidth
  const pointerStripColor =
    pointerConfig?.pointerStripColor ?? defaultPointerConfig.pointerStripColor
  const pointerStripUptoDataPoint =
    pointerConfig?.pointerStripUptoDataPoint ??
    defaultPointerConfig.pointerStripUptoDataPoint
  const pointerLabelComponent =
    pointerConfig?.pointerLabelComponent ??
    defaultPointerConfig.pointerLabelComponent
  const stripOverPointer =
    pointerConfig?.stripOverPointer ?? defaultPointerConfig.stripOverPointer
  const shiftPointerLabelX =
    pointerConfig?.shiftPointerLabelX ?? defaultPointerConfig.shiftPointerLabelX
  const shiftPointerLabelY =
    pointerConfig?.shiftPointerLabelY ?? defaultPointerConfig.shiftPointerLabelY
  const pointerLabelWidth =
    pointerConfig?.pointerLabelWidth ?? defaultPointerConfig.pointerLabelWidth
  const pointerLabelHeight =
    pointerConfig?.pointerLabelHeight ?? defaultPointerConfig.pointerLabelHeight
  const autoAdjustPointerLabelPosition =
    pointerConfig?.autoAdjustPointerLabelPosition ??
    defaultPointerConfig.autoAdjustPointerLabelPosition
  const pointerVanishDelay =
    pointerConfig?.pointerVanishDelay ?? defaultPointerConfig.pointerVanishDelay
  const activatePointersOnLongPress =
    pointerConfig?.activatePointersOnLongPress ??
    defaultPointerConfig.activatePointersOnLongPress
  const activatePointersDelay =
    pointerConfig?.activatePointersDelay ??
    defaultPointerConfig.activatePointersDelay
  const initialPointerIndex =
    pointerConfig?.initialPointerIndex ??
    defaultPointerConfig.initialPointerIndex
  const initialPointerAppearDelay =
    pointerConfig?.initialPointerAppearDelay ??
    (isAnimated
      ? animationDuration
      : defaultPointerConfig.initialPointerAppearDelay)
  const persistPointer =
    pointerConfig?.persistPointer ?? defaultPointerConfig.persistPointer
  const hidePointer1 =
    pointerConfig?.hidePointer1 ?? defaultPointerConfig.hidePointer1
  const pointerEvents = pointerConfig?.pointerEvents
  const stripBehindBars =
    pointerConfig?.stripBehindBars ?? defaultPointerConfig.stripBehindBars

  const disableScroll =
    props.disableScroll ??
    (pointerConfig
      ? activatePointersOnLongPress
        ? !!responderActive
        : true
      : false)

  const yAxisExtraHeightAtTop = props.trimYAxisAtTop
    ? 0
    : props.yAxisExtraHeight ?? containerHeight / 20

  const barInnerComponent = props.barInnerComponent

  const localYAxisOffset1 = lineConfig.isSecondary
    ? (props.secondaryYAxis as secondaryYAxisType)?.yAxisOffset ?? 0
    : yAxisOffset ?? 0
  const localYAxisOffset2 = lineConfig2.isSecondary
    ? (props.secondaryYAxis as secondaryYAxisType)?.yAxisOffset ?? 0
    : yAxisOffset ?? 0

  useEffect(() => {
    if (showLine) {
      let pp = ''
      let pp2 = ''
      const firstBarWidth =
        (stackData ?? data)?.[0].barWidth ?? props.barWidth ?? defaultBarWidth
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (
            i < (lineConfig.startIndex ?? 0) ||
            i > (lineConfig.endIndex ?? 0)
          ) {
            continue
          }
          const currentBarWidth =
            (stackData ?? data)?.[i]?.barWidth ?? props.barWidth ?? defaultBarWidth
          const currentValue = props.lineData
            ? props.lineData[i].value
            : stackData
            ? stackData[i].stacks.reduce((total, item) => total + item.value, 0)
            : data[i].value
          pp +=
            'L' +
            getXForLineInBar(
              i,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing
            ) +
            ' ' +
            getYForLineInBar(
              currentValue,
              lineConfig.shiftY,
              containerHeight,
              lineConfig.isSecondary ? secondaryMaxValue : maxValue,
              localYAxisOffset1
            ) +
            ' '
        }
        setPoints(pp.replace('L', 'M'))
        if (lineData.length > 1 && lineConfig.showArrow) {
          const ppArray = pp.trim().split(' ')
          const arrowTipY = parseInt(ppArray[ppArray.length - 1])
          const arrowTipX = parseInt(
            ppArray[ppArray.length - 2].replace('L', '')
          )
          const y1 = parseInt(ppArray[ppArray.length - 3])
          const x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''))

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            lineConfig.arrowConfig?.length,
            lineConfig.arrowConfig?.width,
            lineConfig.arrowConfig?.showArrowBase
          )

          setArrowPoints(arrowPoints)
        }
      } else {
        const p1Array: number[][] = []
        for (let i = 0; i < lineData.length; i++) {
          if (
            i < (lineConfig.startIndex ?? 0) ||
            i > (lineConfig.endIndex ?? 0)
          ) {
            continue
          }
          const currentBarWidth =
            data?.[i]?.barWidth ?? props.barWidth ?? defaultBarWidth
          const currentValue = props.lineData
            ? props.lineData[i].value
            : stackData
            ? stackData[i].stacks.reduce((total, item) => total + item.value, 0)
            : data[i].value
          p1Array.push([
            getXForLineInBar(
              i,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing
            ),
            getYForLineInBar(
              currentValue,
              lineConfig.shiftY,
              containerHeight,
              lineConfig.isSecondary ? secondaryMaxValue : maxValue,
              localYAxisOffset1
            )
          ])
          const xx = svgPath(
            p1Array,
            lineConfig.curveType,
            lineConfig.curvature
          )
          setPoints(xx)
        }
      }
      if (lineData2?.length) {
        if (!lineConfig2?.curved) {
          for (let i = 0; i < lineData2.length; i++) {
            if (
              i < (lineConfig2.startIndex ?? 0) ||
              i > (lineConfig2.endIndex ?? 0)
            ) {
              continue
            }
            const currentBarWidth =
              data?.[i]?.barWidth ?? props.barWidth ?? defaultBarWidth
            const currentValue = lineData2[i].value
            pp2 +=
              'L' +
              getXForLineInBar(
                i,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig2,
                spacing
              ) +
              ' ' +
              getYForLineInBar(
                currentValue,
                lineConfig2.shiftY,
                containerHeight,
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue,
                localYAxisOffset2
              ) +
              ' '
          }
          setPoints2(pp2.replace('L', 'M'))
        } else {
          const p2Array: number[][] = []
          for (let i = 0; i < lineData2.length; i++) {
            if (
              i < (lineConfig2.startIndex ?? 0) ||
              i > (lineConfig2.endIndex ?? 0)
            ) {
              continue
            }
            const currentBarWidth =
              data?.[i]?.barWidth ?? props.barWidth ?? defaultBarWidth
            const currentValue = lineData2[i].value
            p2Array.push([
              getXForLineInBar(
                i,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig2,
                spacing
              ),
              getYForLineInBar(
                currentValue,
                lineConfig2.shiftY,
                containerHeight,
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue,
                localYAxisOffset2
              )
            ])
            const xx = svgPath(
              p2Array,
              lineConfig2.curveType,
              lineConfig2.curvature
            )
            setPoints2(xx)
          }
        }
      }
    }
  }, [
    animationDuration,
    containerHeight,
    data,
    lineData,
    initialSpacing,
    lineConfig.initialSpacing,
    lineConfig.curved,
    lineConfig.dataPointsWidth,
    lineConfig.shiftY,
    lineConfig.isAnimated,
    lineConfig.delay,
    lineConfig.startIndex,
    lineConfig.endIndex,
    maxValue,
    props.barWidth,
    showLine,
    spacing,
    yAxisLabelWidth,
    lineConfig.showArrow,
    lineConfig.arrowConfig?.length,
    lineConfig.arrowConfig?.width,
    lineConfig.arrowConfig?.showArrowBase
  ])
  useEffect(() => {
    if (initialPointerIndex !== -1) {
      const item = (stackData ?? data)?.[initialPointerIndex]
      const stackItem = stackData?.[initialPointerIndex]
      const stackSum = stackItem?.stacks?.reduce(
        (acc, stack) => acc + (stack.value ?? 0),
        0
      )
      const x =
        initialSpacing +
        (spacing + barWidth) * initialPointerIndex -
        (pointerRadius ?? pointerWidth / 2) +
        barWidth / 2
      const y =
        containerHeight -
        ((stackSum ?? data[initialPointerIndex].value) * containerHeight) /
          maxValue -
        (pointerRadius ?? pointerHeight / 2) +
        10
      if (initialPointerAppearDelay) {
        setTimeout(() => {
          setPointerConfig(initialPointerIndex, item, x, y)
        }, initialPointerAppearDelay)
      } else {
        setPointerConfig(initialPointerIndex, item, x, y)
      }
    }
  }, [])

  const setPointerConfig = (
    initialPointerIndex: number,
    item: barDataItem | stackDataItem,
    x: number,
    y: number
  ): void => {
    setPointerIndex(initialPointerIndex)
    setPointerItem(item)
    setPointerX(x)
    setPointerY(y)
  }

  const animatedHeight = heightValue?.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  })
  const appearingOpacity = opacityValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const animatedWidth = widthValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, initialSpacing + totalWidth]
  })

  const getPropsCommonForBarAndStack = (item: any, index: number) => {
    return {
      item,
      index,
      containerHeight,
      maxValue,
      spacing: item.spacing ?? spacing,
      propSpacing: spacing,
      xAxisThickness,
      barWidth: props.barWidth ?? defaultBarWidth,
      opacity,
      disablePress: item.disablePress ?? props.disablePress,
      rotateLabel,
      showXAxisIndices,
      xAxisIndicesHeight,
      xAxisIndicesWidth,
      xAxisIndicesColor,
      labelsDistanceFromXaxis:
        item.labelsDistanceFromXaxis ?? labelsDistanceFromXaxis,
      horizontal,
      rtl,
      intactTopLabel,
      showValuesAsTopLabel: props.showValuesAsTopLabel,
      topLabelContainerStyle: props.topLabelContainerStyle,
      topLabelTextStyle: props.topLabelTextStyle,
      barBorderWidth: props.barBorderWidth,
      barBorderColor,
      barBorderRadius: props.barBorderRadius,
      barBorderTopLeftRadius: props.barBorderTopLeftRadius,
      barBorderTopRightRadius: props.barBorderTopRightRadius,
      barBorderBottomLeftRadius: props.barBorderBottomLeftRadius,
      barBorderBottomRightRadius: props.barBorderBottomRightRadius,
      barInnerComponent,
      color: props.color,
      showGradient: props.showGradient,
      gradientColor: props.gradientColor,
      barBackgroundPattern: props.barBackgroundPattern,
      patternId: props.patternId,
      onPress: props.onPress,
      onLongPress: props.onLongPress,
      onPressOut: props.onPressOut,
      onContextMenu: props.onContextMenu,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      focusBarOnPress: props.focusBarOnPress,
      focusedBarConfig: props.focusedBarConfig,
      xAxisTextNumberOfLines,
      xAxisLabelsHeight: props.xAxisLabelsHeight,
      xAxisLabelsVerticalShift,
      renderTooltip: props.renderTooltip,
      leftShiftForTooltip: props.leftShiftForTooltip ?? 0,
      autoCenterTooltip,
      initialSpacing,
      selectedIndex,
      setSelectedIndex,
      activeOpacity: props.activeOpacity ?? 0.2,
      noOfSectionsBelowXAxis,

      leftShiftForLastIndexTooltip: props.leftShiftForLastIndexTooltip ?? 0,
      label:
        item.label ??
        (props.xAxisLabelTexts?.[index] ? props.xAxisLabelTexts[index] : ''),
      secondaryLabel:
        item.secondaryLabel ?? props.secondaryXAxis?.labelTexts?.[index] ?? '',
      labelTextStyle: item.labelTextStyle ?? props.xAxisLabelTextStyle,
      secondaryLabelTextStyle:
        item.secondaryLabelTextStyle ??
        props.secondaryXAxis?.labelsTextStyle ??
        item.labelTextStyle ??
        props.xAxisLabelTextStyle,
      pointerConfig,
      yAxisExtraHeightAtTop,
      yAxisOffset: yAxisOffset ?? 0,
      focusedBarIndex,
      stepHeight,
      stepValue,
      negativeStepHeight: props.negativeStepHeight ?? stepHeight,
      negativeStepValue: props.negativeStepValue ?? stepValue,
      secondaryXAxis: props.secondaryXAxis,
      secondaryYAxis: props.secondaryYAxis,
      secondaryStepHeight,
      secondaryStepValue,
      secondaryNegativeStepHeight,
      secondaryNegativeStepValue,
      secondaryNoOfSectionsBelowXAxis
    }
  }

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.BAR,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    negativeStepHeight: props.negativeStepHeight ?? stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX: props.shiftX ?? 0,
    shiftY: props.shiftY ?? 0,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData: stackData,
    // secondaryData,
    barWidth: props.barWidth ?? defaultBarWidth,
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex: props.scrollToIndex,
    scrollAnimation,
    scrollEventThrottle,
    indicatorColor: props.indicatorColor,
    selectedIndex,
    setSelectedIndex,
    spacing,
    showLine,
    lineConfig,
    lineConfig2,
    maxValue,
    lineData,
    lineData2,
    animatedWidth,
    lineBehindBars,
    points,
    points2,
    arrowPoints,

    // horizSectionProps-
    width: widthFromProps,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    sectionColors: props.sectionColors,
    showFractionalValues,

    axesAndRulesProps,

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: yAxisOffset,
    rotateYAxisTexts: props.rotateYAxisTexts,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,

    onEndReached: props.onEndReached,
    onStartReached: props.onStartReached,
    endReachedOffset: props.endReachedOffset ?? BarDefaults.endReachedOffset,
    onMomentumScrollEnd: props.onMomentumScrollEnd
  }

  return {
    lineConfig,
    hidePointer1,
    pointerItem,
    pointerY,
    pointerConfig,
    pointerColor,
    pointerX,
    pointerComponent,
    pointerHeight,
    pointerRadius,
    pointerWidth,
    autoAdjustPointerLabelPosition,
    pointerLabelWidth,
    activatePointersOnLongPress,
    yAxisLabelWidth,
    shiftPointerLabelX,
    pointerLabelHeight,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    shiftPointerLabelY,
    showPointerStrip,
    pointerStripWidth,
    containerHeight,
    xAxisThickness,
    pointerStripColor,
    pointerEvents,
    setResponderStartTime,
    setPointerY,
    setPointerItem,
    initialSpacing,
    spacing,
    data,
    barWidth,
    setPointerX,
    setPointerIndex,
    maxValue,
    maxItem,
    responderStartTime,
    responderActive,
    setResponderActive,
    activatePointersDelay,
    persistPointer,
    pointerVanishDelay,
    containerHeightIncludingBelowXAxis,
    extendedContainerHeight,
    totalWidth,
    stripBehindBars,
    noOfSectionsBelowXAxis,
    stepHeight,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    stripOverPointer,
    pointerLabelComponent,
    opacity,
    rotateLabel,
    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    autoShiftLabelsForNegativeStacks,
    horizontal,
    rtl,
    intactTopLabel,
    barBorderColor,
    barInnerComponent,
    xAxisTextNumberOfLines,
    selectedIndex,
    setSelectedIndex,
    isAnimated,
    animationDuration,
    side,
    labelWidth,
    isThreeD,
    animatedHeight,
    appearingOpacity,
    autoShiftLabels,
    yAxisAtTop,
    // secondaryData,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollAnimation,
    scrollEventThrottle,
    showLine,
    lineConfig2,
    lineData,
    lineData2,
    animatedWidth,
    lineBehindBars,
    points,
    setPoints,
    points2,
    setPoints2,
    arrowPoints,
    setArrowPoints,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,
    widthFromProps,
    stepValue,
    secondaryMaxValue,
    getPointerProps,
    pointerIndex,
    getPropsCommonForBarAndStack,
    barAndLineChartsWrapperProps,
    yAxisExtraHeightAtTop
  }
}
