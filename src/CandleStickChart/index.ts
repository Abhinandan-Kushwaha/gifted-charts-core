import { useBarChart } from '../BarChart'
import { CandleStickDefaults } from '../utils/constants'
import { CandleStickChartPropsType } from './types'

interface extendedCandleStickChartPropsType extends CandleStickChartPropsType {
  parentWidth: number
}

export const useCandleStickChart = (
  props: extendedCandleStickChartPropsType
) => {
  const spacing = props.spacing ?? CandleStickDefaults.spacing
  const bullishColor = props.bullishColor ?? CandleStickDefaults.bullishColor
  const bearishColor = props.bearishColor ?? CandleStickDefaults.bearishColor
  const bullishBarWidth =
    props.bullishBarWidth ?? props.barWidth ?? CandleStickDefaults.barWidth
  const bearishBarWidth =
    props.bearishBarWidth ?? props.barWidth ?? CandleStickDefaults.barWidth
  const bullishBorderColor =
    props.bullishBorderColor ??
    props.barBorderColor ??
    CandleStickDefaults.bullishBorderColor
  const bearishBorderColor =
    props.bearishBorderColor ??
    props.barBorderColor ??
    CandleStickDefaults.bearishBorderColor
  const bullishBorderWidth =
    props.bullishBorderWidth ??
    props.barBorderWidth ??
    CandleStickDefaults.borderWidth
  const bearishBorderWidth =
    props.bearishBorderWidth ??
    props.barBorderWidth ??
    CandleStickDefaults.borderWidth

  const propsCastedForUseBarChart = {
    ...props,
    data: props.data?.map((item) => {
      const { open, close } = item
      const bigger = Math.max(open, close)

      return {
        ...item,
        value: bigger
      }
    })
  }
  const { stepHeight, stepValue } = useBarChart(propsCastedForUseBarChart)

  const propsCastedToBarChartProps = {
    ...props,
    isCandleStickChart: true,
    spacing,
    data: props.data?.map((item) => {
      const { open, close, high, low } = item
      const bigger = Math.max(open, close)
      const smaller = Math.min(open, close)

      //   const heightFactor = item.isSecondary
      //     ? item.value < 0
      //       ? (secondaryNegativeStepHeight ?? secondaryStepHeight) /
      //         (secondaryNegativeStepValue ?? secondaryStepValue)
      //       : secondaryStepHeight / secondaryStepValue
      //     : item.value < 0
      //       ? negativeStepHeight / negativeStepValue
      //       : stepHeight / stepValue

      const heightFactor = stepHeight / stepValue

      return {
        ...item,
        value: bigger,
        lowerValue: smaller,
        barMarginBottom: smaller * heightFactor,
        showVerticalLine: true,
        verticalLineHeight: (high - low) * heightFactor,
        verticalLineMarginBottom: low * heightFactor,
        verticalLineColor:
          item.verticalLineColor ??
          (bigger === open
            ? (props.bullishVerticalLineColor ?? bullishBorderColor)
            : (props.bearishVerticalLineColor ?? bearishBorderColor)),
        frontColor:
          item.color ?? (bigger === open ? bullishColor : bearishColor),
        barBorderColor:
          item.barBorderColor ??
          (bigger === open ? bullishBorderColor : bearishBorderColor),
        barBorderWidth:
          item.barBorderWidth ??
          (bigger === open ? bullishBorderWidth : bearishBorderWidth),
        barWidth:
          item.barWidth ??
          (bigger === open ? bullishBarWidth : bearishBarWidth),
        spacing: item.spacing ?? spacing,
      }
    })
  }
  return { propsCastedToBarChartProps }
}
