import { useEffect, useMemo, useState } from 'react'
import {
  AxesAndRulesDefaults,
  LineDefaults,
  SEGMENT_END,
  SEGMENT_START,
  chartTypes,
  defaultArrowConfig,
  defaultPointerConfig
} from '../utils/constants'
import {
  adjustToOffset,
  computeMaxAndMinItems,
  getAllArrowProperties,
  getArrowPoints,
  getAxesAndRulesProps,
  getCurvePathWithSegments,
  getExtendedContainerHeightWithPadding,
  getInterpolatedData,
  getLineSegmentsForMissingValues,
  getMaxValue,
  getNoOfSections,
  getPathWithHighlight,
  getSanitisedData,
  getSecondaryDataWithOffsetIncluded,
  getSegmentString,
  svgPath
} from '../utils'
import {
  type IDataSanitisationProps,
  type LineChartPropsType,
  type lineDataItem
} from './types'
import {
  type BarAndLineChartsWrapperTypes,
  EdgePosition,
  type LineSegment
} from '../utils/types'
import { type Animated } from 'react-native'

export interface extendedLineChartPropsType extends LineChartPropsType {
  animations?: Animated.Value[]
  // heightValue: Animated.Value
  // widthValue: Animated.Value
  // opacValue: Animated.Value
  screenWidth: number
}

export const useLineChart = (props: extendedLineChartPropsType) => {
  const {
    animations,
    showDataPointsForMissingValues,
    interpolateMissingValues = true,
    onlyPositive,
    yAxisOffset,
    screenWidth
  } = props
  const curvature = props.curvature ?? LineDefaults.curvature
  const curveType = props.curveType ?? LineDefaults.curveType
  const [scrollX, setScrollX] = useState(0)
  const [arrow1Points, setArrow1Points] = useState('')
  const [arrow2Points, setArrow2Points] = useState('')
  const [arrow3Points, setArrow3Points] = useState('')
  const [arrow4Points, setArrow4Points] = useState('')
  const [arrow5Points, setArrow5Points] = useState('')
  const [secondaryArrowPoints, setSecondaryArrowPoints] = useState('')
  const [pointerIndex, setPointerIndex] = useState(-1)
  const [pointerX, setPointerX] = useState(0)
  const [pointerY, setPointerY] = useState(0)
  const [pointerItem, setPointerItem] = useState<lineDataItem>()

  const [pointerY2, setPointerY2] = useState(0)
  const [pointerItem2, setPointerItem2] = useState<lineDataItem>()
  const [pointerY3, setPointerY3] = useState(0)
  const [pointerItem3, setPointerItem3] = useState<lineDataItem>()
  const [pointerY4, setPointerY4] = useState(0)
  const [pointerItem4, setPointerItem4] = useState<lineDataItem>()
  const [pointerY5, setPointerY5] = useState(0)
  const [pointerItem5, setPointerItem5] = useState<lineDataItem>()
  const [secondaryPointerY, setSecondaryPointerY] = useState(0)
  const [secondaryPointerItem, setSecondaryPointerItem] = useState()

  const [responderStartTime, setResponderStartTime] = useState(0)
  const [responderActive, setResponderActive] = useState(false)
  const [points, setPoints] = useState('')
  const [points2, setPoints2] = useState('')
  const [points3, setPoints3] = useState('')
  const [points4, setPoints4] = useState('')
  const [points5, setPoints5] = useState('')
  const [secondaryPoints, setSecondaryPoints] = useState('')
  const [fillPoints, setFillPoints] = useState('')
  const [fillPoints2, setFillPoints2] = useState('')
  const [fillPoints3, setFillPoints3] = useState('')
  const [fillPoints4, setFillPoints4] = useState('')
  const [fillPoints5, setFillPoints5] = useState('')
  const [secondaryFillPoints, setSecondaryFillPoints] = useState('')

  const [pointsFromSet, setPointsFromSet] = useState<string[]>([])
  const [fillPointsFromSet, setFillPointsFromSet] = useState<string[]>([])
  const [arrowPointsFromSet, setArrowPointsFromSet] = useState<string[]>([])

  const [selectedIndex, setSelectedIndex] = useState(-1)

  const noOfSections = getNoOfSections(
    props.noOfSections,
    props.maxValue,
    props.stepValue
  )
  const containerHeight =
    props.height ??
    ((props.stepHeight ?? 0) * noOfSections ||
      AxesAndRulesDefaults.containerHeight)

  const dataSanitisationProps: IDataSanitisationProps = {
    showDataPointsForMissingValues,
    interpolateMissingValues,
    onlyPositive,
    yAxisOffset
  }
  const data = useMemo(
    () => getSanitisedData(props.data, dataSanitisationProps),
    [yAxisOffset, props.data]
  )
  const data2 = useMemo(
    () => getSanitisedData(props.data2, dataSanitisationProps),
    [yAxisOffset, props.data2]
  )
  const data3 = useMemo(
    () => getSanitisedData(props.data3, dataSanitisationProps),
    [yAxisOffset, props.data3]
  )
  const data4 = useMemo(
    () => getSanitisedData(props.data4, dataSanitisationProps),
    [yAxisOffset, props.data4]
  )
  const data5 = useMemo(
    () => getSanitisedData(props.data5, dataSanitisationProps),
    [yAxisOffset, props.data5]
  )

  const secondaryData =
    getSecondaryDataWithOffsetIncluded(
      props.secondaryData,
      props.secondaryYAxis,
      showDataPointsForMissingValues,
      interpolateMissingValues,
      onlyPositive
    ) ?? []

  let dataSet = props.dataSet
  if (dataSet?.length) {
    dataSet = useMemo(() => {
      return dataSet?.map((dataSetItem) => {
        const nullishHandledDataItem = getInterpolatedData(
          dataSetItem.data,
          showDataPointsForMissingValues,
          interpolateMissingValues,
          onlyPositive
        )
        return {
          ...dataSetItem,
          data: adjustToOffset(nullishHandledDataItem, yAxisOffset)
        }
      })
    }, [yAxisOffset, dataSet])
  }

  const data0 = dataSet?.[0]?.data

  const scrollToEnd = props.scrollToEnd ?? LineDefaults.scrollToEnd
  const scrollAnimation = props.scrollAnimation ?? LineDefaults.scrollAnimation
  const scrollEventThrottle =
    props.scrollEventThrottle ?? LineDefaults.scrollEventThrottle

  const labelsExtraHeight = props.labelsExtraHeight ?? 0

  const animationDuration =
    props.animationDuration ?? LineDefaults.animationDuration
  const onDataChangeAnimationDuration =
    props.onDataChangeAnimationDuration ?? 400
  const animateTogether = props.animateTogether ?? LineDefaults.animateTogether
  const animateOnDataChange = yAxisOffset
    ? false
    : props.animateOnDataChange ?? false

  const startIndex1 = props.startIndex1 ?? props.startIndex ?? 0

  let endIndex1: number
  if (props.endIndex1 === undefined || props.endIndex1 === null) {
    if (props.endIndex === undefined || props.endIndex === null) {
      endIndex1 = data.length - 1
    } else {
      endIndex1 = props.endIndex
    }
  } else {
    endIndex1 = props.endIndex1
  }

  const startIndex2 = props.startIndex2 ?? 0
  const endIndex2 = props.endIndex2 ?? data2.length - 1

  const startIndex3 = props.startIndex3 ?? 0
  const endIndex3 = props.endIndex3 ?? data3.length - 1
  const startIndex4 = props.startIndex4 ?? 0
  const endIndex4 = props.endIndex4 ?? data4.length - 1
  const startIndex5 = props.startIndex5 ?? 0
  const endIndex5 = props.endIndex5 ?? data5.length - 1

  const lineSegments = !interpolateMissingValues
    ? getLineSegmentsForMissingValues(props.data)
    : props.lineSegments
  const lineSegments2 = !interpolateMissingValues
    ? getLineSegmentsForMissingValues(props.data2)
    : props.lineSegments2
  const lineSegments3 = !interpolateMissingValues
    ? getLineSegmentsForMissingValues(props.data3)
    : props.lineSegments3
  const lineSegments4 = !interpolateMissingValues
    ? getLineSegmentsForMissingValues(props.data4)
    : props.lineSegments4
  const lineSegments5 = !interpolateMissingValues
    ? getLineSegmentsForMissingValues(props.data5)
    : props.lineSegments5

  const highlightedRange = props.highlightedRange

  let newPoints = ''
  let newFillPoints = ''
  let counter = 0

  const adjustToWidth = props.adjustToWidth ?? false

  const initialSpacing = props.initialSpacing ?? LineDefaults.initialSpacing
  const endSpacing =
    props.endSpacing ?? (adjustToWidth ? 0 : LineDefaults.endSpacing)

  const thickness = props.thickness ?? LineDefaults.thickness

  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth)

  const spacing =
    props.spacing ??
    (adjustToWidth
      ? ((props.width ?? screenWidth - yAxisLabelWidth) - initialSpacing) /
        Math.max((data0 ?? data).length - 1, 1)
      : LineDefaults.spacing)

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness
  const dataPointsHeight1 =
    props.dataPointsHeight1 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight
  const dataPointsWidth1 =
    props.dataPointsWidth1 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth
  const dataPointsRadius1 =
    props.dataPointsRadius1 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius
  const dataPointsColor1 =
    props.dataPointsColor1 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor
  const dataPointsShape1 =
    props.dataPointsShape1 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape

  const dataPointsHeight2 =
    props.dataPointsHeight2 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight
  const dataPointsWidth2 =
    props.dataPointsWidth2 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth
  const dataPointsRadius2 =
    props.dataPointsRadius2 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius
  const dataPointsColor2 =
    props.dataPointsColor2 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor2
  const dataPointsShape2 =
    props.dataPointsShape2 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape

  const dataPointsHeight3 =
    props.dataPointsHeight3 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight
  const dataPointsWidth3 =
    props.dataPointsWidth3 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth
  const dataPointsRadius3 =
    props.dataPointsRadius3 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius
  const dataPointsColor3 =
    props.dataPointsColor3 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor3
  const dataPointsShape3 =
    props.dataPointsShape3 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape

  const dataPointsHeight4 =
    props.dataPointsHeight4 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight
  const dataPointsWidth4 =
    props.dataPointsWidth4 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth
  const dataPointsRadius4 =
    props.dataPointsRadius4 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius
  const dataPointsColor4 =
    props.dataPointsColor4 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor
  const dataPointsShape4 =
    props.dataPointsShape4 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape

  const dataPointsHeight5 =
    props.dataPointsHeight5 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight
  const dataPointsWidth5 =
    props.dataPointsWidth5 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth
  const dataPointsRadius5 =
    props.dataPointsRadius5 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius
  const dataPointsColor5 =
    props.dataPointsColor5 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor
  const dataPointsShape5 =
    props.dataPointsShape5 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape

  const areaChart = props.areaChart ?? false
  const areaChart1 = props.areaChart1 ?? false
  const areaChart2 = props.areaChart2 ?? false
  const areaChart3 = props.areaChart3 ?? false
  const areaChart4 = props.areaChart4 ?? false
  const areaChart5 = props.areaChart5 ?? false

  const atLeastOneAreaChart =
    dataSet?.some((set) => set.areaChart) ??
    areaChart ??
    areaChart1 ??
    areaChart2 ??
    areaChart3 ??
    areaChart4 ??
    areaChart5

  const getIsNthAreaChart = (n: number): boolean => {
    if (areaChart) return true
    if (!dataSet?.length) {
      switch (n) {
        case 0:
          return areaChart1
        case 1:
          return areaChart2
        case 2:
          return areaChart3
        case 3:
          return areaChart4
        case 4:
          return areaChart5
      }
    }
    return false
  }

  const stepChart = props.stepChart ?? false
  const stepChart1 = props.stepChart1 ?? false
  const stepChart2 = props.stepChart2 ?? false
  const stepChart3 = props.stepChart3 ?? false
  const stepChart4 = props.stepChart4 ?? false
  const stepChart5 = props.stepChart5 ?? false

  const edgePosition = props.edgePosition ?? LineDefaults.edgePosition

  const textFontSize1 =
    props.textFontSize1 ?? props.textFontSize ?? LineDefaults.textFontSize
  const textFontSize2 =
    props.textFontSize2 ?? props.textFontSize ?? LineDefaults.textFontSize
  const textFontSize3 =
    props.textFontSize3 ?? props.textFontSize ?? LineDefaults.textFontSize
  const textFontSize4 =
    props.textFontSize4 ?? props.textFontSize ?? LineDefaults.textFontSize
  const textFontSize5 =
    props.textFontSize5 ?? props.textFontSize ?? LineDefaults.textFontSize
  const textColor1 =
    props.textColor1 ?? props.textColor ?? LineDefaults.textColor
  const textColor2 =
    props.textColor2 ?? props.textColor ?? LineDefaults.textColor
  const textColor3 =
    props.textColor3 ?? props.textColor ?? LineDefaults.textColor
  const textColor4 =
    props.textColor4 ?? props.textColor ?? LineDefaults.textColor
  const textColor5 =
    props.textColor5 ?? props.textColor ?? LineDefaults.textColor

  const totalWidth = initialSpacing + spacing * (data0 ?? data).length

  const { maxItem, minItem } = computeMaxAndMinItems(
    data0 ?? data,
    props.roundToDigits,
    props.showFractionalValues
  )

  const maxValue = getMaxValue(
    props.maxValue,
    props.stepValue,
    noOfSections,
    maxItem
  )

  const mostNegativeValue = props.mostNegativeValue ?? minItem

  const overflowTop = props.overflowTop ?? 0

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    overflowTop
  )
  const getX = (index: number): number => initialSpacing + spacing * index - 1
  const getY = (value: number): number =>
    extendedContainerHeight - (value * containerHeight) / maxValue

  const { maxItem: secondaryMaxItem } = computeMaxAndMinItems(
    secondaryData,
    props.secondaryYAxis?.roundToDigits,
    props.secondaryYAxis?.showFractionalValues
  )
  const secondaryMaxValue =
    props.secondaryYAxis?.maxValue ?? (secondaryMaxItem || maxValue)
  const getSecondaryY = (value: number): number =>
    extendedContainerHeight - (value * containerHeight) / secondaryMaxValue
  const heightUptoXaxis = extendedContainerHeight - xAxisThickness

  if (animateOnDataChange && animations) {
    animations.forEach((item, index) => {
      item.addListener((val) => {
        const temp = data[index]?.value ?? 0
        data[index].value = val.value
        let pp = ''
        let ppp = ''
        if (!(dataSet?.[0].curved ?? props.curved)) {
          for (let i = 0; i < (data0 ?? data).length; i++) {
            pp += 'L' + getX(i) + ' ' + getY((data0 ?? data)[i].value) + ' '
          }
          if (dataSet?.[0]?.areaChart ?? areaChart) {
            ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp += pp
            ppp +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
          }
          newPoints = pp
          newFillPoints = ppp
          setPointsOnChange()
        }
        counter++
        data[index].value = temp
      })
    })
  }

  const setPointsOnChange = (): void => {
    if (counter === data.length) {
      if (!props.curved) {
        setPoints(newPoints.replace('L', 'M'))
        if (areaChart) {
          setFillPoints(newFillPoints.replace('L', 'M'))
        }
      }
    }
  }

  const showValuesAsDataPointsText =
    props.showValuesAsDataPointsText ?? LineDefaults.showValuesAsDataPointsText

  const thickness1 =
    props.thickness1 ?? props.thickness ?? LineDefaults.thickness
  const thickness2 =
    props.thickness2 ?? props.thickness ?? LineDefaults.thickness
  const thickness3 =
    props.thickness3 ?? props.thickness ?? LineDefaults.thickness
  const thickness4 =
    props.thickness4 ?? props.thickness ?? LineDefaults.thickness
  const thickness5 =
    props.thickness5 ?? props.thickness ?? LineDefaults.thickness

  const zIndex1 = props.zIndex1 ?? 0
  const zIndex2 = props.zIndex2 ?? 0
  const zIndex3 = props.zIndex3 ?? 0
  const zIndex4 = props.zIndex4 ?? 0
  const zIndex5 = props.zIndex5 ?? 0

  const strokeDashArray1 = props.strokeDashArray1 ?? props.strokeDashArray
  const strokeDashArray2 = props.strokeDashArray2 ?? props.strokeDashArray
  const strokeDashArray3 = props.strokeDashArray3 ?? props.strokeDashArray
  const strokeDashArray4 = props.strokeDashArray4 ?? props.strokeDashArray
  const strokeDashArray5 = props.strokeDashArray5 ?? props.strokeDashArray

  const rotateLabel = props.rotateLabel ?? false
  const isAnimated = props.isAnimated ?? false
  const hideDataPoints1 = props.hideDataPoints ?? props.hideDataPoints1 ?? false
  const hideDataPoints2 = props.hideDataPoints ?? props.hideDataPoints2 ?? false
  const hideDataPoints3 = props.hideDataPoints ?? props.hideDataPoints3 ?? false
  const hideDataPoints4 = props.hideDataPoints ?? props.hideDataPoints4 ?? false
  const hideDataPoints5 = props.hideDataPoints ?? props.hideDataPoints5 ?? false

  const color1 = props.color1 ?? props.color ?? LineDefaults.color
  const color2 = props.color2 ?? props.color ?? LineDefaults.color
  const color3 = props.color3 ?? props.color ?? LineDefaults.color
  const color4 = props.color4 ?? props.color ?? LineDefaults.color
  const color5 = props.color5 ?? props.color ?? LineDefaults.color

  const startFillColor1 =
    props.startFillColor1 ?? props.startFillColor ?? LineDefaults.startFillColor
  const endFillColor1 =
    props.endFillColor1 ?? props.endFillColor ?? LineDefaults.endFillColor
  const startOpacity = props.startOpacity ?? LineDefaults.startOpacity
  const endOpacity = props.endOpacity ?? LineDefaults.endOpacity
  const startOpacity1 = props.startOpacity1 ?? startOpacity
  const endOpacity1 = props.endOpacity1 ?? endOpacity

  const startFillColor2 =
    props.startFillColor2 ?? props.startFillColor ?? LineDefaults.startFillColor
  const endFillColor2 =
    props.endFillColor2 ?? props.endFillColor ?? LineDefaults.endFillColor
  const startOpacity2 = props.startOpacity2 ?? startOpacity
  const endOpacity2 = props.endOpacity2 ?? endOpacity

  const startFillColor3 =
    props.startFillColor3 ?? props.startFillColor ?? LineDefaults.startFillColor
  const endFillColor3 =
    props.endFillColor3 ?? props.endFillColor ?? LineDefaults.endFillColor
  const startOpacity3 = props.startOpacity3 ?? startOpacity
  const endOpacity3 = props.endOpacity3 ?? endOpacity

  const startFillColor4 =
    props.startFillColor4 ?? props.startFillColor ?? LineDefaults.startFillColor
  const endFillColor4 =
    props.endFillColor4 ?? props.endFillColor ?? LineDefaults.endFillColor
  const startOpacity4 = props.startOpacity4 ?? startOpacity
  const endOpacity4 = props.endOpacity4 ?? endOpacity

  const startFillColor5 =
    props.startFillColor5 ?? props.startFillColor ?? LineDefaults.startFillColor
  const endFillColor5 =
    props.endFillColor5 ?? props.endFillColor ?? LineDefaults.endFillColor
  const startOpacity5 = props.startOpacity5 ?? startOpacity
  const endOpacity5 = props.endOpacity5 ?? endOpacity

  defaultArrowConfig.strokeWidth = dataSet?.[0]?.thickness ?? thickness1
  defaultArrowConfig.strokeColor = dataSet?.[0]?.color ?? color1
  const {
    arrowLength1,
    arrowWidth1,
    arrowStrokeWidth1,
    arrowStrokeColor1,
    arrowFillColor1,
    showArrowBase1,
    arrowLength2,
    arrowWidth2,
    arrowStrokeWidth2,
    arrowStrokeColor2,
    arrowFillColor2,
    showArrowBase2,
    arrowLength3,
    arrowWidth3,
    arrowStrokeWidth3,
    arrowStrokeColor3,
    arrowFillColor3,
    showArrowBase3,
    arrowLength4,
    arrowWidth4,
    arrowStrokeWidth4,
    arrowStrokeColor4,
    arrowFillColor4,
    showArrowBase4,
    arrowLength5,
    arrowWidth5,
    arrowStrokeWidth5,
    arrowStrokeColor5,
    arrowFillColor5,
    showArrowBase5,
    arrowLengthsFromSet,
    arrowWidthsFromSet,
    arrowStrokeWidthsFromSet,
    arrowStrokeColorsFromSet,
    arrowFillColorsFromSet,
    showArrowBasesFromSet
  } = getAllArrowProperties(props, defaultArrowConfig)

  const secondaryLineConfig = {
    zIndex: props.secondaryLineConfig?.zIndex ?? zIndex1,
    curved: props.secondaryLineConfig?.curved ?? props.curved,
    curvature: props.secondaryLineConfig?.curvature ?? curvature,
    curveType: props.secondaryLineConfig?.curveType ?? curveType,
    areaChart: props.secondaryLineConfig?.areaChart ?? areaChart,
    color: props.secondaryLineConfig?.color ?? color1,
    thickness: props.secondaryLineConfig?.thickness ?? thickness1,
    zIndex1: props.secondaryLineConfig?.zIndex1 ?? zIndex1,
    strokeDashArray:
      props.secondaryLineConfig?.strokeDashArray ?? strokeDashArray1,
    startIndex: props.secondaryLineConfig?.startIndex ?? startIndex1,
    endIndex: props.secondaryLineConfig?.endIndex ?? endIndex1,
    hideDataPoints:
      props.secondaryLineConfig?.hideDataPoints ?? hideDataPoints1,
    dataPointsHeight:
      props.secondaryLineConfig?.dataPointsHeight ?? dataPointsHeight1,
    dataPointsWidth:
      props.secondaryLineConfig?.dataPointsWidth ?? dataPointsWidth1,
    dataPointsRadius:
      props.secondaryLineConfig?.dataPointsRadius ?? dataPointsRadius1,
    dataPointsColor:
      props.secondaryLineConfig?.dataPointsColor ?? dataPointsColor1,
    dataPointsShape:
      props.secondaryLineConfig?.dataPointsShape ?? dataPointsShape1,
    showValuesAsDataPointsText:
      props.secondaryLineConfig?.showValuesAsDataPointsText ??
      showValuesAsDataPointsText,
    startFillColor:
      props.secondaryLineConfig?.startFillColor ?? startFillColor1,
    endFillColor: props.secondaryLineConfig?.endFillColor ?? endFillColor1,
    startOpacity: props.secondaryLineConfig?.startOpacity ?? startOpacity1,
    endOpacity: props.secondaryLineConfig?.endOpacity ?? endOpacity1,
    textFontSize: props.secondaryLineConfig?.textFontSize ?? textFontSize1,
    textColor: props.secondaryLineConfig?.textColor ?? textColor1,
    showArrow: props.secondaryLineConfig?.showArrow ?? props.showArrows,
    arrowConfig: props.secondaryLineConfig?.arrowConfig ?? props.arrowConfig
  }

  const yAxisExtraHeightAtTop = props.trimYAxisAtTop
    ? 0
    : props.yAxisExtraHeight ?? containerHeight / 20

  const addLeadingAndTrailingPathForAreaFill = (
    initialPath: string,
    value: number,
    dataLength: number
  ): string => {
    return (
      'M ' +
      initialSpacing +
      ',' +
      heightUptoXaxis +
      ' ' +
      'L ' +
      initialSpacing +
      ',' +
      getY(value) +
      ' ' +
      initialPath +
      ' ' +
      'L ' +
      (initialSpacing + spacing * (dataLength - 1)) +
      ',' +
      heightUptoXaxis +
      ' ' +
      'L ' +
      initialSpacing +
      ',' +
      heightUptoXaxis +
      ' '
    )
  }

  const getNextPoint = (
    data: lineDataItem[],
    index: number,
    around: boolean,
    before: boolean
  ): string => {
    const isLast = index === data.length - 1
    return isLast && !(around || before)
      ? ' '
      : ' L' +
          (getX(index) +
            (around ? (isLast ? 0 : spacing / 2) : before ? 0 : spacing)) +
          ' ' +
          getY(data[index].value) +
          ' '
  }
  const getStepPath = (data: lineDataItem[], i: number): string => {
    const around = edgePosition === EdgePosition.AROUND_DATA_POINT
    const before = edgePosition === EdgePosition.BEFORE_DATA_POINT
    return (
      'L' +
      (getX(i) -
        (around && i > 0 ? spacing / 2 : before && i > 0 ? spacing : 0)) +
      ' ' +
      getY(data[i].value) +
      getNextPoint(data, i, around, before)
    )
  }

  const getSegmentPath = (
    data: lineDataItem[],
    i: number,
    lineSegment: LineSegment[] | undefined,
    startIndex: number,
    endIndex: number,
    isSecondary?: boolean
  ): string => {
    let path =
      'L' +
      getX(i) +
      ' ' +
      (isSecondary ? getSecondaryY(data[i].value) : getY(data[i].value)) +
      ' ' +
      getSegmentString(lineSegment, i, SEGMENT_START, SEGMENT_END)

    if (highlightedRange) {
      path += getPathWithHighlight(
        data,
        i,
        highlightedRange,
        startIndex,
        endIndex,
        getX,
        getY
      )
    }
    return path
  }

  useEffect(() => {
    if (dataSet) {
      const pointsArray: string[] = []
      const arrowPointsArray: string[] = []
      const fillPointsArray: string[] = []
      dataSet.map((set, index) => {
        if (set.curved ?? props.curved) {
          const pArray: number[][] = []
          for (let i = 0; i < set.data.length; i++) {
            if (
              i >= (set.startIndex ?? 0) &&
              i <= (set.endIndex ?? set.data.length - 1)
            ) {
              pArray.push([
                getX(i),
                set.isSecondary
                  ? getSecondaryY(set.data[i].value)
                  : getY(set.data[i].value)
              ])
            }
          }
          let xx = svgPath(
            pArray,
            set.curveType ?? curveType,
            set.curvature ?? curvature
          )
          pointsArray.push(
            getCurvePathWithSegments(
              xx,
              set.lineSegments,
              SEGMENT_START,
              SEGMENT_END
            )
          )

          // For Arrow-
          if (set.data.length > 1 && (set.showArrow ?? props.showArrows)) {
            const arrowTipY = pArray[pArray.length - 1][1]
            const arrowTipX = pArray[pArray.length - 1][0]
            const y1 = pArray[pArray.length - 2][1]
            const x1 = pArray[pArray.length - 2][0]

            const arrowPoints = getArrowPoints(
              arrowTipX,
              arrowTipY,
              x1,
              y1,
              arrowLengthsFromSet?.[index],
              arrowWidthsFromSet?.[index],
              showArrowBasesFromSet?.[index]
            )

            arrowPointsArray.push(arrowPoints)
          }

          // For Area charts-
          if ((set.areaChart ?? areaChart) && set.data.length > 0) {
            xx = addLeadingAndTrailingPathForAreaFill(
              xx,
              set.data[0].value,
              set.data.length
            )
            fillPointsArray.push(xx)
          }
        } else {
          let pp = ''
          for (let i = 0; i < set.data.length; i++) {
            if (
              i >= (set.startIndex ?? 0) &&
              i <= (set.endIndex ?? set.data.length - 1)
            ) {
              if (set.stepChart ?? stepChart) {
                pp += getStepPath(set.data, i)
              } else {
                pp += getSegmentPath(
                  set.data,
                  i,
                  set.lineSegments,
                  set.startIndex ?? 0,
                  set.endIndex ?? set.data.length - 1,
                  set.isSecondary
                )
              }
            }
          }
          pointsArray.push(pp.replace('L', 'M'))

          // For Arrow-
          if (set.data.length > 1 && (set.showArrow ?? props.showArrows)) {
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
              arrowLengthsFromSet?.[index],
              arrowWidthsFromSet?.[index],
              showArrowBasesFromSet?.[index]
            )

            arrowPointsArray.push(arrowPoints)
          }

          // For Area charts-
          if ((set.areaChart ?? areaChart) && set.data.length > 0) {
            let ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp += pp
            ppp +=
              'L' +
              (initialSpacing + spacing * (set.data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            fillPointsArray.push(ppp.replace('L', 'M'))
          }
        }

        return null
      })

      setPointsFromSet(pointsArray)
      setArrowPointsFromSet(arrowPointsArray)
      setFillPointsFromSet(fillPointsArray)
    } else {
      let pp = ''
      let pp2 = ''
      let pp3 = ''
      let pp4 = ''
      let pp5 = ''
      if (!props.curved) {
        for (let i = 0; i < data.length; i++) {
          if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
            if (stepChart ?? stepChart1) {
              pp += getStepPath(data, i)
            } else {
              pp += getSegmentPath(
                data,
                i,
                lineSegments,
                startIndex1,
                endIndex1
              )
            }
          }
          if (data2.length > 0 && i >= startIndex2 && i <= endIndex2) {
            if (stepChart ?? stepChart2) {
              pp2 += getStepPath(data2, i)
            } else {
              pp2 += getSegmentPath(
                data2,
                i,
                lineSegments2,
                startIndex2,
                endIndex2
              )
            }
          }
          if (data3.length > 0 && i >= startIndex3 && i <= endIndex3) {
            if (stepChart ?? stepChart3) {
              pp3 += getStepPath(data3, i)
            } else {
              pp3 += getSegmentPath(
                data3,
                i,
                lineSegments3,
                startIndex3,
                endIndex3
              )
            }
          }
          if (data4.length > 0 && i >= startIndex4 && i <= endIndex4) {
            if (stepChart ?? stepChart4) {
              pp4 += getStepPath(data4, i)
            } else {
              pp4 += getSegmentPath(
                data4,
                i,
                lineSegments4,
                startIndex4,
                endIndex4
              )
            }
          }
          if (data5.length > 0 && i >= startIndex5 && i <= endIndex5) {
            if (stepChart ?? stepChart5) {
              pp5 += getStepPath(data5, i)
            } else {
              pp5 += getSegmentPath(
                data5,
                i,
                lineSegments5,
                startIndex5,
                endIndex5
              )
            }
          }
        }
        setPoints2(pp2.replace('L', 'M'))
        setPoints3(pp3.replace('L', 'M'))
        setPoints4(pp4.replace('L', 'M'))
        setPoints5(pp5.replace('L', 'M'))

        setPoints(pp.replace('L', 'M'))

        if (data.length > 1 && (props.showArrow1 ?? props.showArrows)) {
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
            arrowLength1,
            arrowWidth1,
            showArrowBase1
          )

          setArrow1Points(arrowPoints)
        }

        if (data2.length > 1 && (props.showArrow2 ?? props.showArrows)) {
          const ppArray = pp2.trim().split(' ')
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
            arrowLength2,
            arrowWidth2,
            showArrowBase2
          )

          setArrow2Points(arrowPoints)
        }

        if (data3.length > 1 && (props.showArrow3 ?? props.showArrows)) {
          const ppArray = pp3.trim().split(' ')
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
            arrowLength3,
            arrowWidth3,
            showArrowBase3
          )

          setArrow3Points(arrowPoints)
        }

        if (data4.length > 1 && (props.showArrow4 ?? props.showArrows)) {
          const ppArray = pp4.trim().split(' ')
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
            arrowLength4,
            arrowWidth4,
            showArrowBase4
          )

          setArrow4Points(arrowPoints)
        }

        if (data5.length > 1 && (props.showArrow5 ?? props.showArrows)) {
          const ppArray = pp5.trim().split(' ')
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
            arrowLength5,
            arrowWidth5,
            showArrowBase5
          )

          setArrow5Points(arrowPoints)
        }

        /** *************************          For Area Charts          *************************/
        if (atLeastOneAreaChart) {
          let ppp = ''
          let ppp2 = ''
          let ppp3 = ''
          let ppp4 = ''
          let ppp5 = ''

          if (
            (areaChart ?? areaChart1) &&
            data.length > 0 &&
            !animateOnDataChange
          ) {
            ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp += pp
            ppp +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            setFillPoints(ppp.replace('L', 'M'))
          }

          if ((areaChart ?? areaChart2) && data2.length > 0) {
            ppp2 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp2 += pp2
            ppp2 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp2 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            setFillPoints2(ppp2.replace('L', 'M'))
          }

          if ((areaChart ?? areaChart3) && data3.length > 0) {
            ppp3 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp3 += pp3
            ppp3 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp3 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            setFillPoints3(ppp3.replace('L', 'M'))
          }
          if ((areaChart ?? areaChart4) && data4.length > 0) {
            ppp4 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp4 += pp4
            ppp4 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp4 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            setFillPoints4(ppp4.replace('L', 'M'))
          }

          if ((areaChart ?? areaChart5) && data5.length > 0) {
            ppp5 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            ppp5 += pp5
            ppp5 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis
            ppp5 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
            setFillPoints5(ppp5.replace('L', 'M'))
          }
        }

        /*************************************************************************************/
      } else {
        const p1Array: number[][] = []
        const p2Array: number[][] = []
        const p3Array: number[][] = []
        const p4Array: number[][] = []
        const p5Array: number[][] = []
        for (let i = 0; i < data.length; i++) {
          if (i >= startIndex1 && i <= endIndex1) {
            p1Array.push([getX(i), getY(data[i].value)])
          }
          if (data2.length > 0 && i >= startIndex2 && i <= endIndex2) {
            p2Array.push([getX(i), getY(data2[i].value)])
          }
          if (data3.length > 0 && i >= startIndex3 && i <= endIndex3) {
            p3Array.push([getX(i), getY(data3[i].value)])
          }
          if (data4.length > 0 && i >= startIndex4 && i <= endIndex4) {
            p4Array.push([getX(i), getY(data4[i].value)])
          }
          if (data5.length > 0 && i >= startIndex5 && i <= endIndex5) {
            p5Array.push([getX(i), getY(data5[i].value)])
          }
        }

        let xx = svgPath(p1Array, curveType, curvature)
        let xx2 = svgPath(p2Array, curveType, curvature)
        let xx3 = svgPath(p3Array, curveType, curvature)
        let xx4 = svgPath(p4Array, curveType, curvature)
        let xx5 = svgPath(p5Array, curveType, curvature)

        setPoints(
          getCurvePathWithSegments(xx, lineSegments, SEGMENT_START, SEGMENT_END)
        )
        setPoints2(
          getCurvePathWithSegments(
            xx2,
            lineSegments2,
            SEGMENT_START,
            SEGMENT_END
          )
        )
        setPoints3(
          getCurvePathWithSegments(
            xx3,
            lineSegments3,
            SEGMENT_START,
            SEGMENT_END
          )
        )
        setPoints4(
          getCurvePathWithSegments(
            xx4,
            lineSegments4,
            SEGMENT_START,
            SEGMENT_END
          )
        )
        setPoints5(
          getCurvePathWithSegments(
            xx5,
            lineSegments5,
            SEGMENT_START,
            SEGMENT_END
          )
        )

        if (data.length > 1 && (props.showArrow1 ?? props.showArrows)) {
          const arrowTipY = p1Array[p1Array.length - 1][1]
          const arrowTipX = p1Array[p1Array.length - 1][0]
          const y1 = p1Array[p1Array.length - 2][1]
          const x1 = p1Array[p1Array.length - 2][0]

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            arrowLength1,
            arrowWidth1,
            showArrowBase1
          )

          setArrow1Points(arrowPoints)
        }

        if (data2.length > 1 && (props.showArrow2 ?? props.showArrows)) {
          const arrowTipY = p2Array[p2Array.length - 1][1]
          const arrowTipX = p2Array[p2Array.length - 1][0]
          const y1 = p2Array[p2Array.length - 2][1]
          const x1 = p2Array[p2Array.length - 2][0]

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            arrowLength2,
            arrowWidth2,
            showArrowBase2
          )

          setArrow2Points(arrowPoints)
        }

        if (data3.length > 1 && (props.showArrow3 ?? props.showArrows)) {
          const arrowTipY = p3Array[p3Array.length - 1][1]
          const arrowTipX = p3Array[p3Array.length - 1][0]
          const y1 = p3Array[p3Array.length - 2][1]
          const x1 = p3Array[p3Array.length - 2][0]

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            arrowLength3,
            arrowWidth3,
            showArrowBase3
          )

          setArrow2Points(arrowPoints)
        }

        if (data4.length > 1 && (props.showArrow4 ?? props.showArrows)) {
          const arrowTipY = p4Array[p4Array.length - 1][1]
          const arrowTipX = p4Array[p4Array.length - 1][0]
          const y1 = p4Array[p4Array.length - 2][1]
          const x1 = p4Array[p4Array.length - 2][0]

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            arrowLength4,
            arrowWidth4,
            showArrowBase4
          )

          setArrow2Points(arrowPoints)
        }

        if (data5.length > 1 && (props.showArrow5 ?? props.showArrows)) {
          const arrowTipY = p5Array[p5Array.length - 1][1]
          const arrowTipX = p5Array[p5Array.length - 1][0]
          const y1 = p5Array[p5Array.length - 2][1]
          const x1 = p5Array[p5Array.length - 2][0]

          const arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            arrowLength5,
            arrowWidth5,
            showArrowBase5
          )

          setArrow2Points(arrowPoints)
        }

        /** *************************          For Area Charts          *************************/

        if (atLeastOneAreaChart) {
          if ((areaChart ?? areaChart1) && data.length > 0) {
            xx = addLeadingAndTrailingPathForAreaFill(
              xx,
              data[0].value,
              data.length
            )
            setFillPoints(xx)
          }

          if ((areaChart ?? areaChart2) && data2.length > 0) {
            xx2 = addLeadingAndTrailingPathForAreaFill(
              xx2,
              data2[0].value,
              data2.length
            )
            setFillPoints2(xx2)
          }

          if ((areaChart ?? areaChart3) && data3.length > 0) {
            xx3 = addLeadingAndTrailingPathForAreaFill(
              xx3,
              data3[0].value,
              data3.length
            )
            setFillPoints3(xx3)
          }

          if ((areaChart ?? areaChart4) && data4.length > 0) {
            xx4 = addLeadingAndTrailingPathForAreaFill(
              xx4,
              data4[0].value,
              data4.length
            )
            setFillPoints4(xx4)
          }

          if ((areaChart ?? areaChart5) && data5.length > 0) {
            xx5 = addLeadingAndTrailingPathForAreaFill(
              xx5,
              data5[0].value,
              data5.length
            )
            setFillPoints5(xx5)
          }
        }

        /*************************************************************************************/
      }
    }
  }, [
    animateOnDataChange,
    areaChart,
    areaChart1,
    areaChart2,
    containerHeight,
    data,
    data2,
    data3,
    data4,
    data5,
    // data0,
    dataPointsWidth1,
    dataPointsWidth2,
    dataPointsWidth3,
    dataPointsWidth4,
    dataPointsWidth5,
    initialSpacing,
    maxValue,
    props.curved,
    spacing,
    xAxisThickness,
    startIndex1,
    endIndex1,
    startIndex2,
    endIndex2,
    startIndex3,
    endIndex3,
    startIndex4,
    endIndex4,
    startIndex5,
    endIndex5,
    arrowLength1,
    arrowWidth1,
    showArrowBase1,
    props.showArrow1,
    props.showArrows,
    props.showArrow2,
    props.showArrow3,
    props.showArrow4,
    props.showArrow5,
    arrowLength2,
    arrowWidth2,
    showArrowBase2,
    arrowLength3,
    arrowWidth3,
    showArrowBase3,
    arrowLength4,
    arrowWidth4,
    showArrowBase4,
    arrowLength5,
    arrowWidth5,
    showArrowBase5
  ])

  useEffect(() => {
    let pp = ''
    if (!secondaryLineConfig.curved) {
      for (let i = 0; i < secondaryData.length; i++) {
        if (
          i >= secondaryLineConfig.startIndex &&
          i <= secondaryLineConfig.endIndex &&
          !animateOnDataChange
        ) {
          pp +=
            'L' + getX(i) + ' ' + getSecondaryY(secondaryData[i].value) + ' '
        }
      }

      setSecondaryPoints(pp.replace('L', 'M'))

      if (secondaryData.length > 1 && secondaryLineConfig.showArrow) {
        const ppArray = pp.trim().split(' ')
        const arrowTipY = parseInt(ppArray[ppArray.length - 1])
        const arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''))
        const y1 = parseInt(ppArray[ppArray.length - 3])
        const x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''))

        const arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          secondaryLineConfig.arrowConfig?.length,
          secondaryLineConfig.arrowConfig?.width,
          secondaryLineConfig.arrowConfig?.showArrowBase
        )

        setSecondaryArrowPoints(arrowPoints)
      }

      /** *************************          For Area Chart          *************************/
      if (secondaryLineConfig.areaChart) {
        let ppp = ''

        if (secondaryData.length > 0 && !animateOnDataChange) {
          ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
          ppp += pp
          ppp +=
            'L' +
            (initialSpacing + spacing * (secondaryData.length - 1)) +
            ' ' +
            heightUptoXaxis
          ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' '
          setSecondaryFillPoints(ppp.replace('L', 'M'))
        }
      }
    } else {
      /** *************************          For Curved Charts         *************************/
      const p1Array: number[][] = []
      for (let i = 0; i < secondaryData.length; i++) {
        if (
          i >= secondaryLineConfig.startIndex &&
          i <= secondaryLineConfig.endIndex
        ) {
          p1Array.push([getX(i), getSecondaryY(secondaryData[i].value)])
        }
      }

      let xx = svgPath(
        p1Array,
        secondaryLineConfig.curveType,
        secondaryLineConfig.curvature
      )

      setSecondaryPoints(xx)

      if (secondaryData.length > 1 && (props.showArrow1 ?? props.showArrows)) {
        const arrowTipY = p1Array[p1Array.length - 1][1]
        const arrowTipX = p1Array[p1Array.length - 1][0]
        const y1 = p1Array[p1Array.length - 2][1]
        const x1 = p1Array[p1Array.length - 2][0]

        const arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength1,
          arrowWidth1,
          showArrowBase1
        )

        setSecondaryArrowPoints(arrowPoints)
      }

      /** *************************          For Curved Area Charts          *************************/

      if (secondaryLineConfig.areaChart) {
        if (secondaryData.length > 0) {
          xx = addLeadingAndTrailingPathForAreaFill(
            xx,
            secondaryData[0].value,
            secondaryData.length
          )
          setSecondaryFillPoints(xx)
        }
      }
    }
  }, [secondaryData, secondaryLineConfig])

  const gradientDirection = props.gradientDirection ?? 'vertical'
  const horizSections = [{ value: '0' }]
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections
  const stepValue = props.stepValue ?? maxValue / noOfSections
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ?? -mostNegativeValue / (stepValue || 1)

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines
  const xAxisLabelsVerticalShift =
    props.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift
  const horizontalRulesStyle = props.horizontalRulesStyle
  const showFractionalValues =
    props.showFractionalValues ?? AxesAndRulesDefaults.showFractionalValues

  const horizontal = false
  const yAxisAtTop = false

  defaultPointerConfig.pointerStripHeight = containerHeight

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
  const hidePointer2 =
    pointerConfig?.hidePointer2 ?? defaultPointerConfig.hidePointer2
  const hidePointer3 =
    pointerConfig?.hidePointer3 ?? defaultPointerConfig.hidePointer3
  const hidePointer4 =
    pointerConfig?.hidePointer4 ?? defaultPointerConfig.hidePointer4
  const hidePointer5 =
    pointerConfig?.hidePointer5 ?? defaultPointerConfig.hidePointer5
  const hideSecondaryPointer =
    pointerConfig?.hideSecondaryPointer ??
    defaultPointerConfig.hideSecondaryPointer
  const resetPointerOnDataChange =
    pointerConfig?.resetPointerOnDataChange ??
    defaultPointerConfig.resetPointerOnDataChange
  const pointerEvents = pointerConfig?.pointerEvents
  const disableScroll =
    props.disableScroll ??
    (pointerConfig
      ? activatePointersOnLongPress
        ? !!responderActive
        : true
      : false)
  const showScrollIndicator =
    props.showScrollIndicator ?? LineDefaults.showScrollIndicator

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled
  const showDataPointOnFocus =
    props.showDataPointOnFocus ?? LineDefaults.showDataPointOnFocus
  const showStripOnFocus =
    props.showStripOnFocus ?? LineDefaults.showStripOnFocus
  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus
  const stripHeight = props.stripHeight
  const stripWidth = props.stripWidth ?? LineDefaults.stripWidth
  const stripColor = props.stripColor ?? color1
  const stripOpacity = props.stripOpacity ?? (startOpacity1 + endOpacity1) / 2
  const unFocusOnPressOut =
    props.unFocusOnPressOut ?? LineDefaults.unFocusOnPressOut
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus ?? LineDefaults.delayBeforeUnFocus

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight

  const lineGradient = props.lineGradient ?? LineDefaults.lineGradient
  const lineGradientDirection = props.lineGradientDirection ?? 'vertical'
  const lineGradientStartColor =
    props.lineGradientStartColor ?? LineDefaults.lineGradientStartColor
  const lineGradientEndColor =
    props.lineGradientEndColor ?? LineDefaults.lineGradientEndColor

  const getPointerY = (value: number): number =>
    value
      ? containerHeight -
        (value * containerHeight) / maxValue -
        (pointerRadius || pointerHeight / 2) +
        10
      : 0

  const initialisePointers = (): void => {
    if (initialPointerIndex !== -1) {
      const item = (data0 ?? data)[initialPointerIndex]
      const x =
        initialSpacing +
        spacing * initialPointerIndex -
        (pointerRadius || pointerWidth / 2) -
        1
      const y = getPointerY(item.value)
      const y2 = getPointerY(data2?.[initialPointerIndex]?.value)
      const y3 = getPointerY(data3?.[initialPointerIndex]?.value)
      const y4 = getPointerY(data4?.[initialPointerIndex]?.value)
      const y5 = getPointerY(data5?.[initialPointerIndex]?.value)

      if (initialPointerAppearDelay) {
        setTimeout(() => {
          setPointerConfig(initialPointerIndex, item, x, y, y2, y3, y4, y5)
        }, initialPointerAppearDelay)
      } else {
        setPointerConfig(initialPointerIndex, item, x, y, y2, y3, y4, y5)
      }
    }
  }

  useEffect(() => {
    initialisePointers()
  }, [])

  useEffect(() => {
    if (resetPointerOnDataChange) {
      initialisePointers()
    }
  }, [data])

  const setPointerConfig = (
    initialPointerIndex: number,
    item: lineDataItem,
    x: number,
    y: number,
    y2: number,
    y3: number,
    y4: number,
    y5: number
  ): void => {
    setPointerIndex(initialPointerIndex)
    setPointerItem(item)
    setPointerX(x)
    setPointerY(y)
    setPointerY2(y2)
    setPointerY3(y3)
    setPointerY4(y4)
    setPointerY5(y5)
  }

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.LINE,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl: false,
    shiftX: 0,
    shiftY: 0,
    yAxisAtTop,
    initialSpacing,
    data: data0 ?? data,
    stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    secondaryData,
    barWidth: 0, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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
    showLine: false,
    lineConfig: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineConfig2: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    maxValue,
    lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineData2: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineBehindBars: false,
    points,
    points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)

    // horizSectionProps-
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset,
    rotateYAxisTexts: 0,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,

    onEndReached: props.onEndReached,
    onStartReached: props.onStartReached,
    endReachedOffset: props.endReachedOffset ?? LineDefaults.endReachedOffset
  }

  return {
    curvature,
    curveType,
    scrollX,
    setScrollX,
    arrow1Points,
    setArrow1Points,
    arrow2Points,
    setArrow2Points,
    arrow3Points,
    setArrow3Points,
    arrow4Points,
    setArrow4Points,
    arrow5Points,
    setArrow5Points,
    secondaryArrowPoints,
    setSecondaryArrowPoints,
    pointerIndex,
    setPointerIndex,
    pointerX,
    setPointerX,
    pointerY,
    setPointerY,
    pointerItem,
    setPointerItem,
    pointerY2,
    setPointerY2,
    pointerItem2,
    setPointerItem2,
    pointerY3,
    setPointerY3,
    pointerItem3,
    setPointerItem3,
    pointerY4,
    setPointerY4,
    pointerItem4,
    setPointerItem4,
    pointerY5,
    setPointerY5,
    pointerItem5,
    setPointerItem5,
    secondaryPointerY,
    setSecondaryPointerY,
    secondaryPointerItem,
    setSecondaryPointerItem,
    responderStartTime,
    setResponderStartTime,
    responderActive,
    setResponderActive,
    points,
    setPoints,
    points2,
    setPoints2,
    points3,
    setPoints3,
    points4,
    setPoints4,
    points5,
    setPoints5,
    secondaryPoints,
    setSecondaryPoints,
    fillPoints,
    setFillPoints,
    fillPoints2,
    setFillPoints2,
    fillPoints3,
    setFillPoints3,
    fillPoints4,
    setFillPoints4,
    fillPoints5,
    setFillPoints5,
    secondaryFillPoints,
    setSecondaryFillPoints,
    pointsFromSet,
    setPointsFromSet,
    fillPointsFromSet,
    setFillPointsFromSet,
    arrowPointsFromSet,
    setArrowPointsFromSet,
    selectedIndex,
    setSelectedIndex,
    noOfSections,
    containerHeight,
    data,
    data2,
    data3,
    data4,
    data5,
    secondaryData,
    dataSet,
    data0,
    scrollToEnd,
    scrollAnimation,
    scrollEventThrottle,
    labelsExtraHeight,
    animationDuration,
    onDataChangeAnimationDuration,
    animateTogether,
    animateOnDataChange,
    startIndex1,
    startIndex2,
    endIndex1,
    endIndex2,
    startIndex3,
    endIndex3,
    startIndex4,
    endIndex4,
    startIndex5,
    endIndex5,
    lineSegments,
    lineSegments2,
    lineSegments3,
    lineSegments4,
    lineSegments5,
    highlightedRange,
    adjustToWidth,
    initialSpacing,
    endSpacing,
    thickness,
    yAxisLabelWidth,
    spacing,
    xAxisThickness,
    dataPointsHeight1,
    dataPointsWidth1,
    dataPointsRadius1,
    dataPointsColor1,
    dataPointsShape1,
    dataPointsHeight2,
    dataPointsWidth2,
    dataPointsRadius2,
    dataPointsColor2,
    dataPointsShape2,
    dataPointsHeight3,
    dataPointsWidth3,
    dataPointsRadius3,
    dataPointsColor3,
    dataPointsShape3,
    dataPointsHeight4,
    dataPointsWidth4,
    dataPointsRadius4,
    dataPointsColor4,
    dataPointsShape4,
    dataPointsHeight5,
    dataPointsWidth5,
    dataPointsRadius5,
    dataPointsColor5,
    dataPointsShape5,
    areaChart,
    areaChart1,
    areaChart2,
    areaChart3,
    areaChart4,
    areaChart5,
    atLeastOneAreaChart,
    getIsNthAreaChart,
    stepChart,
    stepChart1,
    stepChart2,
    stepChart3,
    stepChart4,
    stepChart5,
    edgePosition,
    textFontSize1,
    textFontSize2,
    textFontSize3,
    textFontSize4,
    textFontSize5,
    textColor1,
    textColor2,
    textColor3,
    textColor4,
    textColor5,
    totalWidth,
    maxValue,
    mostNegativeValue,
    overflowTop,
    extendedContainerHeight,
    getX,
    getY,
    secondaryMaxValue,
    getSecondaryY,
    heightUptoXaxis,
    setPointsOnChange,
    showValuesAsDataPointsText,
    thickness1,
    thickness2,
    thickness3,
    thickness4,
    thickness5,
    zIndex1,
    zIndex2,
    zIndex3,
    zIndex4,
    zIndex5,
    strokeDashArray1,
    strokeDashArray2,
    strokeDashArray3,
    strokeDashArray4,
    strokeDashArray5,
    rotateLabel,
    isAnimated,
    hideDataPoints1,
    hideDataPoints2,
    hideDataPoints3,
    hideDataPoints4,
    hideDataPoints5,
    color1,
    color2,
    color3,
    color4,
    color5,
    startFillColor1,
    endFillColor1,
    startOpacity,
    endOpacity,
    startOpacity1,
    endOpacity1,
    startFillColor2,
    endFillColor2,
    startOpacity2,
    endOpacity2,
    startFillColor3,
    endFillColor3,
    startOpacity3,
    endOpacity3,
    startFillColor4,
    endFillColor4,
    startOpacity4,
    endOpacity4,
    startFillColor5,
    endFillColor5,
    startOpacity5,
    endOpacity5,
    arrowLength1,
    arrowWidth1,
    arrowStrokeWidth1,
    arrowStrokeColor1,
    arrowFillColor1,
    showArrowBase1,
    arrowLength2,
    arrowWidth2,
    arrowStrokeWidth2,
    arrowStrokeColor2,
    arrowFillColor2,
    showArrowBase2,
    arrowLength3,
    arrowWidth3,
    arrowStrokeWidth3,
    arrowStrokeColor3,
    arrowFillColor3,
    showArrowBase3,
    arrowLength4,
    arrowWidth4,
    arrowStrokeWidth4,
    arrowStrokeColor4,
    arrowFillColor4,
    showArrowBase4,
    arrowLength5,
    arrowWidth5,
    arrowStrokeWidth5,
    arrowStrokeColor5,
    arrowFillColor5,
    showArrowBase5,
    arrowLengthsFromSet,
    arrowWidthsFromSet,
    arrowStrokeWidthsFromSet,
    arrowStrokeColorsFromSet,
    arrowFillColorsFromSet,
    showArrowBasesFromSet,
    secondaryLineConfig,
    addLeadingAndTrailingPathForAreaFill,
    getNextPoint,
    getStepPath,
    getSegmentPath,
    gradientDirection,
    horizSections,
    stepHeight,
    stepValue,
    noOfSectionsBelowXAxis,
    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    horizontalRulesStyle,
    showFractionalValues,
    horizontal,
    yAxisAtTop,
    pointerConfig,
    getPointerProps,
    pointerHeight,
    pointerWidth,
    pointerRadius,
    pointerColor,
    pointerComponent,
    showPointerStrip,
    pointerStripHeight,
    pointerStripWidth,
    pointerStripColor,
    pointerStripUptoDataPoint,
    pointerLabelComponent,
    stripOverPointer,
    shiftPointerLabelX,
    shiftPointerLabelY,
    pointerLabelWidth,
    pointerLabelHeight,
    autoAdjustPointerLabelPosition,
    pointerVanishDelay,
    activatePointersOnLongPress,
    activatePointersDelay,
    initialPointerIndex,
    initialPointerAppearDelay,
    persistPointer,
    hidePointer1,
    hidePointer2,
    hidePointer3,
    hidePointer4,
    hidePointer5,
    hideSecondaryPointer,
    resetPointerOnDataChange,
    pointerEvents,
    disableScroll,
    showScrollIndicator,
    focusEnabled,
    showDataPointOnFocus,
    showStripOnFocus,
    showTextOnFocus,
    stripHeight,
    stripWidth,
    stripColor,
    stripOpacity,
    unFocusOnPressOut,
    delayBeforeUnFocus,
    containerHeightIncludingBelowXAxis,
    lineGradient,
    lineGradientDirection,
    lineGradientStartColor,
    lineGradientEndColor,
    getPointerY,
    initialisePointers,
    setPointerConfig,
    barAndLineChartsWrapperProps,
    yAxisExtraHeightAtTop
  }
}
