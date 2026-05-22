import {
  computeAxisSections,
  formatLabel,
  getBubbleMode,
  getNormalizedXAxisLayout,
  getRenderedXValue,
  normalizeAxis,
  normalizeAxisLabelValue,
} from './bubbleChartUtils';

describe('bubbleChartUtils', () => {
  // -------------------------------------------------------------------------
  describe('normalizeAxis', () => {
    it('uses 25-step intervals for mid-range values (highcharts-like)', () => {
      const axis = normalizeAxis(20, 126.4, 5);

      expect(axis.tickInterval).toBe(25);
      expect(axis.min).toBe(0);
      expect(axis.max).toBe(150);
    });
  });

  // -------------------------------------------------------------------------
  describe('computeAxisSections', () => {
    it('returns defaults for empty series', () => {
      const result = computeAxisSections([]);

      expect(result.xSections).toBe(5);
      expect(result.ySections).toBe(5);
      expect(result.dataBounds.x.min).toBe(0);
      expect(result.dataBounds.x.max).toBe(100);
      expect(result.dataBounds.y.min).toBe(0);
      expect(result.dataBounds.y.max).toBe(100);
    });

    it('returns exact raw data bounds for x and y', () => {
      const series = [
        {
          data: [
            { x: 3, y: 10 },
            { x: -5, y: 7 },
            { x: 12, y: -4 },
          ],
        },
        {
          data: [
            { x: 0, y: 20 },
            { x: 8, y: -10 },
          ],
        },
      ];

      const result = computeAxisSections(series);

      expect(result.dataBounds.x.min).toBe(-5);
      expect(result.dataBounds.x.max).toBe(12);
      expect(result.dataBounds.y.min).toBe(-10);
      expect(result.dataBounds.y.max).toBe(20);
    });

    it('increases x sections for wider chart widths', () => {
      const series = [
        {
          data: Array.from({ length: 11 }, (_, i) => ({
            x: i * 10,
            y: i + 1,
          })),
        },
      ];

      const narrowResult = computeAxisSections(series, 220);
      const wideResult = computeAxisSections(series, 620);

      expect(wideResult.xSections).toBeGreaterThan(narrowResult.xSections);
    });

    it('caps x sections at 5 for high-cardinality data', () => {
      const series = [
        {
          data: Array.from({ length: 40 }, (_, i) => ({
            x: i,
            y: i + 1,
          })),
        },
      ];

      const result = computeAxisSections(series, 1200);

      expect(result.xSections).toBeLessThanOrEqual(5);
    });

    it('caps x sections for tight integer domains to avoid repeated integer labels', () => {
      const series = [
        {
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
          ],
        },
      ];

      const result = computeAxisSections(series, 620);

      expect(result.dataBounds.x.min).toBe(1);
      expect(result.dataBounds.x.max).toBe(3);
      expect(result.xSections).toBeLessThanOrEqual(2);
    });

    it('uses unique low-cardinality uniform x buckets to avoid extra trailing section', () => {
      const series = [
        {
          data: [
            { x: 1.0000000001, y: 2 },
            { x: 2, y: 3 },
            { x: 3.0000000002, y: 4 },
          ],
        },
      ];

      const result = computeAxisSections(series, 620);

      expect(result.xSections).toBe(2);
      expect(result.dataBounds.x.min).toBe(1);
      expect(result.dataBounds.x.max).toBe(3);
    });

    it('snaps near-integer x values to integer buckets', () => {
      const series = [
        {
          data: [
            { x: 1.02, y: 2 },
            { x: 2.01, y: 3 },
            { x: 3.1, y: 4 },
          ],
        },
      ];

      const result = computeAxisSections(series, 620);

      expect(result.xSections).toBe(2);
      expect(result.xLabelsAsIntegers).toBe(true);
      expect(result.dataBounds.x.min).toBe(1);
      expect(result.dataBounds.x.max).toBe(3);
    });

    it('uses canonical nice Y intervals instead of odd nearest steps', () => {
      const series = [
        {
          data: [
            { x: 10, y: 30 },
            { x: 40, y: 65 },
            { x: 90, y: 50 },
          ],
        },
      ];

      const result = computeAxisSections(series, 320);

      expect(result.yAxis.tickInterval).toBe(10);
      expect(result.yAxis.min).toBe(30);
      expect(result.yAxis.max).toBe(70);
      expect(result.ySections).toBe(4);
    });
  });

  // -------------------------------------------------------------------------
  describe('getBubbleMode', () => {
    it('respects explicit chart type', () => {
      expect(getBubbleMode([], 'scatter')).toBe(false);
      expect(getBubbleMode([], 'bubble')).toBe(true);
    });

    it('infers bubble mode from point radius when chart type is undefined', () => {
      expect(
        getBubbleMode([
          { data: [{ x: 1, y: 2 }] },
          { data: [{ x: 2, y: 3, r: 12 }] },
        ]),
      ).toBe(true);
      expect(getBubbleMode([{ data: [{ x: 1, y: 2 }] }])).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  describe('formatLabel', () => {
    it('truncates scatter labels longer than 4 chars to first 3 plus ellipsis', () => {
      expect(formatLabel('Organic', 5, false)).toBe('Org...');
      expect(formatLabel('Blue Goose', 5, false)).toBe('Blu...');
    });

    it('keeps short scatter labels unchanged', () => {
      expect(formatLabel('Item', 5, false)).toBe('Item');
      expect(formatLabel('AB', 5, false)).toBe('AB');
    });
  });

  // -------------------------------------------------------------------------
  describe('getRenderedXValue', () => {
    it('returns raw x when integer label mode is disabled', () => {
      expect(getRenderedXValue(2.17, false)).toBe(2.17);
    });

    it('snaps to nearest integer when within tolerance', () => {
      expect(getRenderedXValue(1.02, true)).toBe(1);
      expect(getRenderedXValue(2.01, true)).toBe(2);
      expect(getRenderedXValue(3.1, true)).toBe(3);
    });

    it('keeps raw value when outside integer snap tolerance', () => {
      expect(getRenderedXValue(3.21, true)).toBe(3.21);
    });
  });

  // -------------------------------------------------------------------------
  describe('normalizeAxisLabelValue', () => {
    it('keeps non-numeric values unchanged', () => {
      expect(
        normalizeAxisLabelValue({ value: 'abc', tickInterval: 25 }),
      ).toBe('abc');
    });

    it('uses integer labels when requested', () => {
      expect(
        normalizeAxisLabelValue({
          value: '2.9999',
          tickInterval: 1,
          labelsAsIntegers: true,
        }),
      ).toBe('3');
    });

    it('normalizes very close decimal values with interval-aware precision', () => {
      expect(
        normalizeAxisLabelValue({ value: '1.23444', tickInterval: 0.01 }),
      ).toBe('1.234');
      expect(
        normalizeAxisLabelValue({ value: '1.23555', tickInterval: 0.01 }),
      ).toBe('1.236');
    });
  });

  // -------------------------------------------------------------------------
  describe('getNormalizedXAxisLayout', () => {
    it('returns integer-snapped layout and full-width spacing', () => {
      const normalizedAxes = computeAxisSections(
        [
          {
            data: [
              { x: 1.02, y: 2 },
              { x: 2.01, y: 3 },
              { x: 3.1, y: 4 },
            ],
          },
        ],
        320,
      );

      const layout = getNormalizedXAxisLayout({
        normalizedAxes,
        series: [
          {
            data: [
              { x: 1.02, y: 2, r: 14 },
              { x: 2.01, y: 3, r: 16 },
            ],
          },
        ],
        bubbleMode: true,
        chartWidth: 320,
        minBubbleRadius: 5,
        maxBubbleRadius: 20,
      });

      expect(layout.xAxisMin).toBe(1);
      expect(layout.xAxisMax).toBe(3);
      expect(layout.xNoOfSections).toBe(2);
      expect(layout.initialSpacing).toBe(16);
      expect(layout.endSpacing).toBe(18);
      expect(layout.spacing).toBeCloseTo((320 - 34) / 2);
    });

    it('uses radius-based edge spacing in scatter mode to avoid clipping', () => {
      const series = [
        {
          data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
            { x: 4, y: 40 },
          ],
        },
      ];
      const normalizedAxes = computeAxisSections(series, 120);

      const chartWidth = 120;
      const minBubbleRadius = 5;

      const layout = getNormalizedXAxisLayout({
        normalizedAxes,
        series,
        bubbleMode: false,
        chartWidth,
        minBubbleRadius,
        maxBubbleRadius: 20,
      });

      expect(normalizedAxes.xLabelsAsIntegers).toBe(true);
      expect(layout.initialSpacing).toBe(minBubbleRadius);
      expect(layout.endSpacing).toBe(minBubbleRadius);
      expect(
        layout.spacing * layout.xNoOfSections +
          layout.initialSpacing +
          layout.endSpacing,
      ).toBe(chartWidth);
    });

    it('keeps sparse integer domains on coarse sections (e.g. 5, 15, 25)', () => {
      const series = [
        {
          data: [
            { x: 5, y: 10 },
            { x: 15, y: 30 },
            { x: 25, y: 50 },
          ],
        },
      ];

      const normalizedAxes = computeAxisSections(series, 320);
      const layout = getNormalizedXAxisLayout({
        normalizedAxes,
        series,
        bubbleMode: false,
        chartWidth: 320,
        minBubbleRadius: 5,
        maxBubbleRadius: 20,
      });

      expect(normalizedAxes.xLabelsAsIntegers).toBe(true);
      expect(normalizedAxes.xSections).toBe(2);
      expect(layout.xAxisMin).toBe(5);
      expect(layout.xAxisMax).toBe(25);
      expect(layout.xNoOfSections).toBe(2);
      expect(layout.xStepValue).toBe(10);
    });

    it('uses raw x-domain bounds for dense ranges without artificial rounding', () => {
      const series = [
        {
          data: Array.from({ length: 20 }, (_, i) => ({
            x: i + 1,
            y: (i + 1) * 5,
          })),
        },
      ];

      const normalizedAxes = computeAxisSections(series, 360);
      const layout = getNormalizedXAxisLayout({
        normalizedAxes,
        series,
        bubbleMode: false,
        chartWidth: 360,
        minBubbleRadius: 5,
        maxBubbleRadius: 20,
      });

      expect(normalizedAxes.xLabelsAsIntegers).toBe(false);
      expect(layout.xAxisMin).toBe(1);
      expect(layout.xAxisMax).toBe(20);
      expect(layout.xStepValue).toBe(4.75);
    });

    it('keeps non-uniform sparse x labels on clean intervals without drift', () => {
      const series = [
        {
          data: [
            { x: 20, y: 4, r: 10 },
            { x: 40, y: 6, r: 20 },
            { x: 30, y: 8, r: 60 },
            { x: 120, y: 5, r: 40 },
          ],
        },
      ];

      const normalizedAxes = computeAxisSections(series, 360);
      const layout = getNormalizedXAxisLayout({
        normalizedAxes,
        series,
        bubbleMode: true,
        chartWidth: 360,
        minBubbleRadius: 5,
        maxBubbleRadius: 20,
      });

      expect(layout.xStepValue).toBe(20);
      expect(layout.xAxisMin).toBe(20);
      expect(layout.xAxisMax).toBe(120);
      expect(layout.xNoOfSections).toBe(5);
    });
  });
});
