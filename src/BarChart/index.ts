import { useEffect, useMemo, useState } from 'react'
import {
  type lineConfigType,
  type BarChartPropsType,
  type barDataItem,
  type stackDataItem
} from './types'
import {
  getArrowPoints,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getLineConfigForBarChart,
  getMaxValue,
  getNoOfSections,
  getSecondaryDataWithOffsetIncluded,
  getXForLineInBar,
  getYForLineInBar,
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

export interface extendedBarChartPropsType extends BarChartPropsType {
  heightValue?: Animated.Value
  widthValue?: Animated.Value
  opacValue?: Animated.Value
  verticalLinesUptoDataPoint?: boolean
  secondaryYAxis?: secondaryYAxisType | boolean
}

export const useBarChart = (props: extendedBarChartPropsType) => {
  const { heightValue, widthValue, opacValue, yAxisOffset } = props
  const [points, setPoints] = useState('')
  const [points2, setPoints2] = useState('')
  const [arrowPoints, setArrowPoints] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const showLine = props.showLine ?? BarDefaults.showLine
  const spacing = props.spacing ?? BarDefaults.spacing
  const initialSpacing = props.initialSpacing ?? spacing
  const endSpacing = props.endSpacing ?? spacing
  const showFractionalValues =
    props.showFractionalValues ?? AxesAndRulesDefaults.showFractionalValues

  const horizontal = props.horizontal ?? BarDefaults.horizontal
  const rtl = props.rtl ?? BarDefaults.rtl
  const yAxisAtTop = props.yAxisAtTop ?? BarDefaults.yAxisAtTop
  const intactTopLabel = props.intactTopLabel ?? BarDefaults.intactTopLabel

  const heightFromProps = horizontal ? props.width : props.height
  const widthFromProps = horizontal ? props.height : props.width

  const isAnimated = props.isAnimated ?? BarDefaults.isAnimated
  const animationDuration =
    props.animationDuration ?? BarDefaults.animationDuration

  const data = useMemo(() => {
    if (!props.data) {
      return []
    }
    if (yAxisOffset) {
      return props.data.map((item) => ({
        ...item,
        value: (item.value ?? 0) - (yAxisOffset ?? 0)
      }))
    }
    return props.data
  }, [yAxisOffset, props.data])

  const secondaryData = getSecondaryDataWithOffsetIncluded(
    props.secondaryData,
    props.secondaryYAxis
  )

  const lineData = useMemo(() => {
    if (!props.lineData) {
      return props.stackData ?? data
    }
    if (yAxisOffset) {
      return props.lineData.map((item) => ({
        ...item,
        value: (item.value ?? 0) - (yAxisOffset ?? 0)
      }))
    }
    return props.lineData
  }, [yAxisOffset, props.lineData, data, props.stackData])

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

  let totalWidth = initialSpacing
  let maxItem = 0
  let minItem = 0
  if (props.stackData) {
    props.stackData.forEach((stackItem) => {
      const stackSumMax = stackItem.stacks.reduce(
        (acc, stack) => acc + (stack.value >= 0 ? stack.value : 0),
        0
      )
      const stackSumMin = stackItem.stacks.reduce(
        (acc, stack) => acc + (stack.value < 0 ? stack.value : 0),
        0
      )

      if (stackSumMax > maxItem) {
        maxItem = stackSumMax
      }

      if (stackSumMin < minItem) {
        minItem = stackSumMin
      }
      totalWidth +=
        (stackItem.stacks[0].barWidth ??
          props.barWidth ??
          BarDefaults.barWidth) + spacing
    })
  } else {
    data.forEach((item: barDataItem) => {
      if (item.value > maxItem) {
        maxItem = item.value
      }
      if (item.value < minItem) {
        minItem = item.value
      }
      totalWidth +=
        (item.barWidth ?? props.barWidth ?? BarDefaults.barWidth) +
        (item.spacing ?? spacing)
    })
  }

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

  const maxAndMin = maxAndMinUtil(
    maxItem,
    minItem,
    props.roundToDigits,
    props.showFractionalValues
  )

  const secondaryMaxAndMin = maxAndMinUtil(
    secondaryMaxItem,
    secondaryMinItem,
    props.roundToDigits,
    props.showFractionalValues
  )

  const maxValue = getMaxValue(
    props.maxValue,
    props.stepValue,
    noOfSections,
    maxAndMin.maxItem
  )
  const secondaryMaxValue = lineConfig.isSecondary
    ? secondaryMaxAndMin.maxItem
    : maxValue
  const mostNegativeValue = props.mostNegativeValue ?? maxAndMin.minItem

  const stepValue = props.stepValue ?? maxValue / noOfSections
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ?? -mostNegativeValue / stepValue
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
  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const autoShiftLabels = props.autoShiftLabels ?? false

  const barWidth = props.barWidth ?? BarDefaults.barWidth
  const barBorderColor = props.barBorderColor ?? BarDefaults.barBorderColor

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    0
  )

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight

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

  useEffect(() => {
    if (showLine) {
      let pp = ''
      let pp2 = ''
      const firstBarWidth =
        (props.stackData ?? data)?.[0].barWidth ?? props.barWidth ?? 30
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (
            i < (lineConfig.startIndex ?? 0) ||
            i > (lineConfig.endIndex ?? 0)
          ) {
            continue
          }
          const currentBarWidth =
            data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth
          const currentValue = props.lineData
            ? props.lineData[i].value
            : props.stackData
            ? props.stackData[i].stacks.reduce(
                (total, item) => total + item.value,
                0
              )
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
              lineConfig.isSecondary ? secondaryMaxValue : maxValue
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
            data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth
          const currentValue = props.lineData
            ? props.lineData[i].value
            : props.stackData
            ? props.stackData[i].stacks.reduce(
                (total, item) => total + item.value,
                0
              )
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
              lineConfig.isSecondary ? secondaryMaxValue : maxValue
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
              data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth
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
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue
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
              data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth
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
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue
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
      const item = (props.stackData ?? data)?.[initialPointerIndex]
      const stackItem = props.stackData?.[initialPointerIndex]
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
  const appearingOpacity = opacValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const animatedWidth = widthValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, initialSpacing + totalWidth + endSpacing]
  })

  const getPropsCommonForBarAndStack = (item: any, index: number) => {
    return {
      key: index,
      item,
      index,
      containerHeight,
      maxValue,
      spacing: item.spacing ?? spacing,
      propSpacing: spacing,
      xAxisThickness,
      barWidth: props.barWidth,
      opacity,
      disablePress: item.disablePress ?? props.disablePress,
      rotateLabel,
      showXAxisIndices,
      xAxisIndicesHeight,
      xAxisIndicesWidth,
      xAxisIndicesColor,
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
      focusBarOnPress: props.focusBarOnPress,
      focusedBarConfig: props.focusedBarConfig,
      xAxisTextNumberOfLines,
      xAxisLabelsHeight: props.xAxisLabelsHeight,
      xAxisLabelsVerticalShift,
      renderTooltip: props.renderTooltip,
      leftShiftForTooltip: props.leftShiftForTooltip ?? 0,
      initialSpacing,
      selectedIndex,
      setSelectedIndex,
      activeOpacity: props.activeOpacity ?? 0.2,
      noOfSectionsBelowXAxis,

      leftShiftForLastIndexTooltip: props.leftShiftForLastIndexTooltip ?? 0,
      label:
        item.label ??
        (props.xAxisLabelTexts?.[index] ? props.xAxisLabelTexts[index] : ''),
      labelTextStyle: item.labelTextStyle ?? props.xAxisLabelTextStyle,
      pointerConfig,
      yAxisExtraHeightAtTop,
      yAxisOffset: yAxisOffset ?? 0
    }
  }

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.BAR,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX: props.shiftX ?? 0,
    shiftY: props.shiftY ?? 0,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData: props.stackData,
    secondaryData,
    barWidth: props.barWidth ?? BarDefaults.barWidth,
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex: props.scrollToIndex,
    scrollAnimation,
    scrollEventThrottle,
    indicatorColor: props.indicatorColor,
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
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(
      props,
      stepValue,
      secondaryMaxValue
    ),

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
    endReachedOffset: props.endReachedOffset ?? BarDefaults.endReachedOffset
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
    secondaryData,
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
