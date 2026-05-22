import { useMemo } from "react";

export default function LineChart({ data, title, lines = [] }) {
  const defaultLines = [
    { key: "value1", stroke: "#fbbf24", label: "Revenue" },
    { key: "value2", stroke: "#4a7ba7", label: "Expenses" },
  ];
  const chartLines = lines.length > 0 ? lines : defaultLines;

  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 600;
  const height = 300;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = useMemo(() => {
    let max = 0;
    data.forEach((item) => {
      chartLines.forEach((line) => {
        if (item[line.key]) {
          max = Math.max(max, item[line.key]);
        }
      });
    });
    return max;
  }, [data, chartLines]);

  const points = useMemo(() => {
    const x_step = chartWidth / (data.length - 1 || 1);
    const y_step = chartHeight / maxValue || 1;

    return chartLines.map((line) => {
      const pathPoints = data.map((item, i) => {
        const x = padding.left + i * x_step;
        const y = padding.top + chartHeight - (item[line.key] / maxValue) * chartHeight;
        return `${x},${y}`;
      });
      return {
        ...line,
        path: `M ${pathPoints.join(" L ")}`,
        points: pathPoints,
      };
    });
  }, [data, chartLines, chartWidth, chartHeight, maxValue, padding]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const line = points[0];
    const pointsArray = line.points;
    const moveTo = `M ${pointsArray[0]}`;
    const lineTo = pointsArray.slice(1).map((p) => `L ${p}`).join(" ");
    const closeBottom = ` L ${padding.left + chartWidth},${padding.top + chartHeight} L ${padding.left},${padding.top + chartHeight} Z`;
    return moveTo + " " + lineTo + closeBottom;
  }, [points, padding, chartWidth, chartHeight]);

  return (
    <div className="line-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="line-chart-wrapper">
        <svg width={width} height={height} className="line-chart-svg">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`grid-${i}`}
              x1={padding.left}
              y1={padding.top + (i * chartHeight) / 4}
              x2={padding.left + chartWidth}
              y2={padding.top + (i * chartHeight) / 4}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
          ))}

          {/* Area fill */}
          {points.length > 0 && (
            <path d={areaPath} fill={points[0].stroke} opacity="0.1" />
          )}

          {/* Lines */}
          {points.map((line, idx) => (
            <path
              key={`line-${idx}`}
              d={line.path}
              stroke={line.stroke}
              strokeWidth="2"
              fill="none"
            />
          ))}

          {/* X-axis labels */}
          {data.map((item, i) => (
            <text
              key={`label-${i}`}
              x={padding.left + (i / (data.length - 1 || 1)) * chartWidth}
              y={height - 10}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {item.label}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="chart-legend">
          {chartLines.map((line, idx) => (
            <div key={idx} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: line.stroke }}
              />
              <span>{line.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
