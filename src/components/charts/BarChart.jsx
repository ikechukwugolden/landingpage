import { useMemo } from "react";

export default function BarChart({ data, title, colors = [] }) {
  const defaultColors = ["#4a7ba7"];
  const barColor = colors.length > 0 ? colors[0] : defaultColors[0];

  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value)), [data]);

  const topStores = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value).slice(0, 10);
  }, [data]);

  return (
    <div className="bar-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="bar-chart-wrapper">
        {topStores.map((item, index) => (
          <div key={index} className="bar-item">
            <span className="bar-label">{item.label}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: barColor,
                }}
              />
            </div>
            <span className="bar-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
