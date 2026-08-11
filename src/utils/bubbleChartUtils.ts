/**
 * bubbleChartUtils.ts
 *
 * Pure chart-math utilities for bubble and scatter charts.
 * No React, no React Native, no external dependencies.
 *
 * Public API
 * ----------
 * normalizeAxis           – "nice" tick intervals for a single axis
 * computeAxisSections     – scan multi-series data → stable X/Y bounds + tick counts
 * getNormalizedXAxisLayout– turn axis bounds into explicit BubbleChart layout props
 * normalizeAxisLabelValue – round a label string to interval-aware precision
 * getBubbleMode           – infer bubble vs scatter from data or explicit prop
 * getRenderedXValue       – integer-snap a point's X when the domain is categorical
 * formatLabel             – radius-proportional label truncation for in-bubble text
 */

// ---------------------------------------------------------------------------
// Internal configuration
// ---------------------------------------------------------------------------

const CHART_CONFIG = {
  label: {
    minChars: 3,
    charsPerRadiusUnit: 0.3,
    radiusBuffer: 5,
  },
  axis: {
    defaultSections: 5,
    minYSections: 2,
    minXSections: 1,
    maxSections: 5,
    defaultTickPixelInterval: 100,
    floatTolerance: 1e-6,
    integerSnapTolerance: 0.15,
  },
  spacing: {
    bubbleBuffer: 2,
  },
} as const;

const MAX_X_TICKS_FROM_SECTION_CAP = CHART_CONFIG.axis.maxSections + 1;
const DEFAULT_TICK_COUNT = CHART_CONFIG.axis.defaultSections + 1;

// Canonical "nice number" progression for stable axis steps (Highcharts-style).
const CANONICAL_TICK_MULTIPLES = [1, 2, 2.5, 5, 10] as const;

const getCeilCanonicalMultiple = (value: number): number =>
  CANONICAL_TICK_MULTIPLES.find((m) => m >= value) ??
  CANONICAL_TICK_MULTIPLES[CANONICAL_TICK_MULTIPLES.length - 1];

const getNearestCanonicalMultiple = (value: number): number =>
  CANONICAL_TICK_MULTIPLES.reduce((best, candidate) =>
    Math.abs(candidate - value) < Math.abs(best - value) ? candidate : best,
  );

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const getTargetTickCountByWidth = (
  axisLengthPx: number,
  tickPixelInterval: number = CHART_CONFIG.axis.defaultTickPixelInterval,
): number => {
  if (!Number.isFinite(axisLengthPx) || axisLengthPx <= 0) {
    return DEFAULT_TICK_COUNT;
  }
  return Math.max(2, Math.ceil(axisLengthPx / tickPixelInterval) + 1);
};

const getIntegerDomainSectionCap = (min: number, max: number): number => {
  const roundedMin = Math.round(min);
  const roundedMax = Math.round(max);
  const minIsIntegerLike =
    Math.abs(min - roundedMin) <= CHART_CONFIG.axis.floatTolerance;
  const maxIsIntegerLike =
    Math.abs(max - roundedMax) <= CHART_CONFIG.axis.floatTolerance;

  if (!minIsIntegerLike || !maxIsIntegerLike) return Number.POSITIVE_INFINITY;

  const span = Math.abs(roundedMax - roundedMin);
  if (span === 0) return CHART_CONFIG.axis.minXSections;

  return Math.max(CHART_CONFIG.axis.minXSections, Math.floor(span));
};

const isNearUniformSpacing = (sortedValues: number[]): boolean => {
  if (sortedValues.length < 3) return true;

  const deltas: number[] = [];
  for (let i = 1; i < sortedValues.length; i++) {
    deltas.push(sortedValues[i] - sortedValues[i - 1]);
  }

  const minDelta = Math.min(...deltas);
  const maxDelta = Math.max(...deltas);

  if (minDelta <= 0) return false;
  return maxDelta / minDelta <= 1.2;
};

const getDecimalsFromInterval = (tickInterval: number): number => {
  if (
    !Number.isFinite(tickInterval) ||
    tickInterval <= 0 ||
    tickInterval >= 1
  ) {
    return 0;
  }
  // Preserve one extra decimal over interval precision to avoid collapsing
  // close labels while still removing floating-point noise.
  const intervalDecimals = Math.ceil(-Math.log10(tickInterval));
  return clamp(intervalDecimals + 1, 1, 6);
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Minimal series shape consumed by these utilities. */
type TSeriesPoint = { x: number; y: number; r?: number };
type TSeries = { data: TSeriesPoint[] };

/** Normalised axis metadata returned by computeAxisSections. */
export type TAxisSections = {
  xSections: number;
  ySections: number;
  yAxis: { min: number; max: number; tickInterval: number; tickCount: number };
  xLabelsAsIntegers: boolean;
  dataBounds: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
};

/** Input for getNormalizedXAxisLayout. */
type TXAxisLayoutInput = {
  normalizedAxes: TAxisSections;
  series: TSeries[];
  bubbleMode: boolean;
  chartWidth: number;
  minBubbleRadius: number;
  maxBubbleRadius: number;
};

/** Explicit BubbleChart layout props produced by getNormalizedXAxisLayout. */
export type TXAxisLayout = {
  xAxisMin: number;
  xAxisMax: number;
  xNoOfSections: number;
  xStepValue: number;
  xAxisOffset: number;
  initialSpacing: number;
  endSpacing: number;
  spacing: number;
};

type TAxisLabelNormalizationInput = {
  value: string;
  tickInterval: number;
  labelsAsIntegers?: boolean;
};

// ---------------------------------------------------------------------------
// Default result (used when series is empty)
// ---------------------------------------------------------------------------

const DEFAULT_AXIS_RESULT: TAxisSections = {
  xSections: CHART_CONFIG.axis.defaultSections,
  ySections: CHART_CONFIG.axis.defaultSections,
  yAxis: {
    min: 0,
    max: 100,
    tickInterval: 100 / (DEFAULT_TICK_COUNT - 1),
    tickCount: DEFAULT_TICK_COUNT,
  },
  xLabelsAsIntegers: false,
  dataBounds: {
    x: { min: 0, max: 100 },
    y: { min: 0, max: 100 },
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compute "nice" min/max bounds and a stable tick interval for one axis.
 *
 * Uses the canonical 1 / 2 / 2.5 / 5 / 10 progression so that step values
 * are always human-readable (e.g. 25 instead of 26.8).
 */
export const normalizeAxis = (
  min: number,
  max: number,
  targetTickCount: number = DEFAULT_TICK_COUNT,
  options?: { preferLargerInterval?: boolean },
): { min: number; max: number; tickInterval: number; tickCount: number } => {
  if (min === max) {
    const padding = Math.abs(min) * 0.1 || 1;
    return {
      min: min - padding,
      max: max + padding,
      tickInterval: padding * 0.4,
      tickCount: DEFAULT_TICK_COUNT,
    };
  }

  const range = max - min;
  const roughInterval = range / (targetTickCount - 1);

  // Guard against near-zero roughInterval caused by floating-point precision.
  if (roughInterval < 1e-10) {
    return { min: min - 1, max: max + 1, tickInterval: 0.5, tickCount: 4 };
  }

  const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
  const normalized = roughInterval / magnitude;

  const preferLargerInterval = options?.preferLargerInterval ?? false;
  let selectedMultiple = preferLargerInterval
    ? getCeilCanonicalMultiple(normalized)
    : getNearestCanonicalMultiple(normalized);

  // For the default 6-tick target (5 sections), stay in the 1/2/2.5
  // progression for improved readability.
  if (targetTickCount === DEFAULT_TICK_COUNT && normalized <= 2.5) {
    selectedMultiple = getCeilCanonicalMultiple(normalized);
  }

  const niceInterval = selectedMultiple * magnitude;
  const niceMin = Math.floor(min / niceInterval) * niceInterval;
  const niceMax = Math.ceil(max / niceInterval) * niceInterval;
  const actualTickCount = Math.round((niceMax - niceMin) / niceInterval) + 1;

  return { min: niceMin, max: niceMax, tickInterval: niceInterval, tickCount: actualTickCount };
};

/**
 * Scan all series data to derive stable X/Y axis bounds and section counts.
 *
 * Key behaviours:
 * - Caps X sections at 5 regardless of chart width to stay readable.
 * - Detects low-cardinality near-uniform X domains and uses unique bucket
 *   count instead of tick math (avoids a trailing empty section).
 * - Snaps near-integer X values (tolerance 0.15) into integer domains for
 *   categorical-like scatter data.
 * - Applies float tolerance (1e-6) to prevent precision noise creating
 *   phantom buckets.
 * - Uses preferLargerInterval for Y to avoid odd steps (e.g. 26/52/78).
 */
export const computeAxisSections = (
  series: TSeries[],
  chartWidthPx?: number,
): TAxisSections => {
  if (!series || series.length === 0) return { ...DEFAULT_AXIS_RESULT };

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  const xValues: number[] = [];

  for (const s of series) {
    for (const point of s.data) {
      if (point.x < minX) minX = point.x;
      if (point.x > maxX) maxX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.y > maxY) maxY = point.y;
      xValues.push(point.x);
    }
  }

  // Deduplicate with float-tolerance normalisation.
  const uniqueSortedXValues = Array.from(
    new Set(
      xValues.map((v) => {
        const rounded = Math.round(v);
        return (Math.abs(v - rounded) <= CHART_CONFIG.axis.floatTolerance
          ? rounded
          : v
        ).toFixed(6);
      }),
    ),
  )
    .map(Number)
    .sort((a, b) => a - b);

  // Integer-snap pass (wider tolerance 0.15).
  const integerSnappedXValues = xValues.map((v) => {
    const nearest = Math.round(v);
    return Math.abs(v - nearest) <= CHART_CONFIG.axis.integerSnapTolerance
      ? nearest
      : v;
  });
  const allNearIntegers = integerSnappedXValues.every(
    (snapped, i) =>
      Math.abs(snapped - xValues[i]) <= CHART_CONFIG.axis.integerSnapTolerance,
  );
  const uniqueSortedSnapped = Array.from(new Set(integerSnappedXValues)).sort(
    (a, b) => a - b,
  );

  const isLowCardinalityUniform =
    uniqueSortedXValues.length >= 2 &&
    uniqueSortedXValues.length <= CHART_CONFIG.axis.maxSections + 1 &&
    isNearUniformSpacing(uniqueSortedXValues);

  const useIntegerSnappedDomain =
    allNearIntegers &&
    uniqueSortedSnapped.length >= 2 &&
    uniqueSortedSnapped.length <= CHART_CONFIG.axis.maxSections + 1 &&
    isNearUniformSpacing(uniqueSortedSnapped);

  const xDomainMin = useIntegerSnappedDomain
    ? uniqueSortedSnapped[0]
    : isLowCardinalityUniform
      ? uniqueSortedXValues[0]
      : minX;

  const xDomainMax = useIntegerSnappedDomain
    ? uniqueSortedSnapped[uniqueSortedSnapped.length - 1]
    : isLowCardinalityUniform
      ? uniqueSortedXValues[uniqueSortedXValues.length - 1]
      : maxX;

  // Cap tick-count estimation to the same section cap used for rendering so
  // wide screens don't request more ticks than will be rendered.
  const xTargetTickCount = Math.min(
    getTargetTickCountByWidth(chartWidthPx ?? 0),
    MAX_X_TICKS_FROM_SECTION_CAP,
  );

  const xAxis = normalizeAxis(xDomainMin, xDomainMax, xTargetTickCount);
  const yAxis = normalizeAxis(minY, maxY, CHART_CONFIG.axis.maxSections + 1, {
    preferLargerInterval: true,
  });

  const xRawSections = useIntegerSnappedDomain
    ? uniqueSortedSnapped.length - 1
    : isLowCardinalityUniform
      ? uniqueSortedXValues.length - 1
      : Math.max(
          CHART_CONFIG.axis.minXSections,
          Math.min(CHART_CONFIG.axis.maxSections, xAxis.tickCount - 1),
        );

  const xSections = Math.max(
    CHART_CONFIG.axis.minXSections,
    Math.min(xRawSections, getIntegerDomainSectionCap(xDomainMin, xDomainMax)),
  );

  const ySections = Math.max(
    CHART_CONFIG.axis.minYSections,
    Math.min(CHART_CONFIG.axis.maxSections, yAxis.tickCount - 1),
  );

  return {
    xSections,
    ySections,
    yAxis,
    xLabelsAsIntegers: useIntegerSnappedDomain,
    dataBounds: {
      x: { min: xDomainMin, max: xDomainMax },
      y: { min: minY, max: maxY },
    },
  };
};

/**
 * Convert TAxisSections into the explicit layout props that BubbleChart
 * expects: minX, maxX, xNoOfSections, xStepValue, initialSpacing,
 * endSpacing, spacing.
 *
 * Edge spacings are sized to the first/last bubble radius so bubbles are
 * never clipped at the chart boundary.
 */
export const getNormalizedXAxisLayout = ({
  normalizedAxes,
  series,
  bubbleMode,
  chartWidth,
  minBubbleRadius,
  maxBubbleRadius,
}: TXAxisLayoutInput): TXAxisLayout => {
  const xNoOfSections = Math.max(1, normalizedAxes.xSections);

  const domain = normalizedAxes.xLabelsAsIntegers
    ? {
        min: Math.round(normalizedAxes.dataBounds.x.min),
        max: Math.round(normalizedAxes.dataBounds.x.max),
        tickInterval: Math.max(
          1,
          (Math.round(normalizedAxes.dataBounds.x.max) -
            Math.round(normalizedAxes.dataBounds.x.min)) /
            xNoOfSections,
        ),
      }
    : {
        min: normalizedAxes.dataBounds.x.min,
        max: normalizedAxes.dataBounds.x.max,
        tickInterval:
          (normalizedAxes.dataBounds.x.max - normalizedAxes.dataBounds.x.min) /
          xNoOfSections,
      };

  const xAxisMin = domain.min;
  const xStepValue = domain.tickInterval;
  const xAxisMax = xAxisMin + xStepValue * xNoOfSections;

  const edgeSpacing = getEdgeSpacing(
    series,
    bubbleMode,
    minBubbleRadius,
    maxBubbleRadius,
  );

  const spacing =
    xNoOfSections > 0
      ? Math.max(
          0,
          (chartWidth - edgeSpacing.initialSpacing - edgeSpacing.endSpacing) /
            xNoOfSections,
        )
      : chartWidth;

  return {
    xAxisMin,
    xAxisMax,
    xNoOfSections,
    xStepValue,
    xAxisOffset: xAxisMin,
    initialSpacing: edgeSpacing.initialSpacing,
    endSpacing: edgeSpacing.endSpacing,
    spacing,
  };
};

// ---------------------------------------------------------------------------
// Edge-spacing helpers (used by getNormalizedXAxisLayout)
// ---------------------------------------------------------------------------

const getFirstBubbleRadius = (
  series: TSeries[],
  minBubbleRadius: number,
  maxBubbleRadius: number,
): number => {
  for (const s of series) {
    const first = s.data[0];
    if (!first) continue;
    const raw = first.r ?? minBubbleRadius;
    return Math.max(minBubbleRadius, Math.min(maxBubbleRadius, raw));
  }
  return minBubbleRadius;
};

const getEdgeSpacing = (
  series: TSeries[],
  bubbleMode: boolean,
  minBubbleRadius: number,
  maxBubbleRadius: number,
): { initialSpacing: number; endSpacing: number } => {
  if (!bubbleMode) {
    return { initialSpacing: minBubbleRadius, endSpacing: minBubbleRadius };
  }

  const initialSpacing =
    getFirstBubbleRadius(series, minBubbleRadius, maxBubbleRadius) +
    CHART_CONFIG.spacing.bubbleBuffer;

  const reversedSeries: TSeries[] = [...series]
    .reverse()
    .map((s) => ({ ...s, data: [...s.data].reverse() }));

  const endSpacing =
    getFirstBubbleRadius(reversedSeries, minBubbleRadius, maxBubbleRadius) +
    CHART_CONFIG.spacing.bubbleBuffer;

  return { initialSpacing, endSpacing };
};

// ---------------------------------------------------------------------------
// Remaining public utilities
// ---------------------------------------------------------------------------

/**
 * Prevent floating-point noise in axis label strings by rounding to a
 * precision derived from the tick interval (one extra decimal beyond
 * interval precision). Rounds to integer when the domain is integer-like.
 */
export const normalizeAxisLabelValue = ({
  value,
  tickInterval,
  labelsAsIntegers = false,
}: TAxisLabelNormalizationInput): string => {
  const parsed = parseFloat(value);
  if (!Number.isFinite(parsed)) return value;
  if (labelsAsIntegers) return String(Math.round(parsed));

  const decimals = getDecimalsFromInterval(tickInterval);
  return decimals === 0 ? String(Math.round(parsed)) : parsed.toFixed(decimals);
};

/**
 * Determine whether the chart renders in bubble mode (variable radius) or
 * scatter mode (fixed-size dots).
 *
 * An explicit `chartType` prop takes precedence; otherwise the mode is
 * inferred from whether any data point carries an `r` property.
 */
export const getBubbleMode = (
  series: TSeries[],
  chartType?: 'bubble' | 'scatter',
): boolean => {
  if (chartType) return chartType === 'bubble';
  return (
    Array.isArray(series) &&
    series.some((s) => s.data.some((p) => p.r !== undefined))
  );
};

/**
 * Snap a point's X coordinate to the nearest integer when the domain was
 * detected as integer-like, ensuring placement stays aligned with integer
 * axis ticks.
 */
export const getRenderedXValue = (
  x: number,
  xLabelsAsIntegers: boolean,
): number => {
  if (!xLabelsAsIntegers) return x;
  const nearest = Math.round(x);
  return Math.abs(x - nearest) <= CHART_CONFIG.axis.integerSnapTolerance
    ? nearest
    : x;
};

/**
 * Radius-aware label truncation for in-bubble text.
 *
 * In bubble mode the maximum character count scales with the bubble radius
 * so labels never overflow the bubble boundary.  In scatter mode a fixed
 * compact rule is applied (first 3 chars + "…").  Returns an empty string
 * if the bubble is too small to show any meaningful label.
 */
export const formatLabel = (
  label: string,
  radius: number,
  isBubbleMode: boolean,
): string => {
  if (!isBubbleMode) {
    return label.length > 4 ? `${label.substring(0, 3)}...` : label;
  }

  const effectiveRadius = radius + CHART_CONFIG.label.radiusBuffer;
  const maxChars = Math.max(
    CHART_CONFIG.label.minChars,
    Math.floor(effectiveRadius * CHART_CONFIG.label.charsPerRadiusUnit),
  );

  if (label.length <= maxChars) return label;

  const truncateAt = maxChars - 3;
  if (truncateAt < CHART_CONFIG.label.minChars) return '';

  return `${label.substring(0, truncateAt)}...`;
};
