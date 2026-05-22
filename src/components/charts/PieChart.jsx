import { useState, useMemo } from "react";

export default function PieChart({ data, title, colors = [] }) {
  const defaultColors = ["#4a7ba7", "#c5c5c5", "#fbbf24"];
  const chartColors = colors.length > 0 ? colors : defaultColors;

  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const slices = useMemo(() => {
    let currentAngle = -90;
    return data.map((item, index) => {
      const sliceAngle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;

      const pathData = [
        `M 50 50`,
        `L ${x1} ${y1}`,
        `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      return {
        path: pathData,
        color: chartColors[index % chartColors.length],
        label: item.label,
        value: item.value,
        percentage: ((item.value / total) * 100).toFixed(1),
      };
    });
  }, [data, total, chartColors]);

  return (
    <div className="pie-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="pie-chart-wrapper">
        <svg viewBox="0 0 100 100" className="pie-chart-svg">
          {slices.map((slice, index) => (
            <path key={index} d={slice.path} fill={slice.color} />
          ))}
        </svg>
        <div className="pie-chart-legend">
          {slices.map((slice, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: slice.color }}
              />
              <div className="legend-text">
                <span className="legend-label">{slice.label}</span>
                <span className="legend-value">{slice.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
