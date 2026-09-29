import { useMemo } from "react";

const COLORS = ["#2f81f7", "#3fb950", "#d29922", "#f85149", "#a371f7", "#39c5cf", "#8b949e"];

export default function LanguageChart({ repos }) {
  const data = useMemo(() => {
    const counts = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 6);
    const otherCount = sorted.slice(6).reduce((sum, [, n]) => sum + n, 0);
    if (otherCount > 0) top.push(["Other", otherCount]);
    const total = top.reduce((sum, [, n]) => sum + n, 0);
    return top.map(([name, count], i) => ({
      name,
      count,
      percent: (count / total) * 100,
      color: COLORS[i],
    }));
  }, [repos]);

  if (data.length === 0) return null;

  return (
    <section className="lang-chart">
      <h3 className="section-title">Languages</h3>
      <div className="lang-bar">
        {data.map((d) => (
          <div
            key={d.name}
            style={{ width: `${d.percent}%`, background: d.color }}
            title={`${d.name}: ${d.count} repos`}
          />
        ))}
      </div>
      <ul className="lang-legend">
        {data.map((d) => (
          <li key={d.name}>
            <span className="dot" style={{ background: d.color }} />
            {d.name} <span className="pct">{d.percent.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}