import { useEffect, useState } from "react";

export default function ContributionGraph({ username }) {
  const [days, setDays] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setDays(null);
    setFailed(false);

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
    )
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setDays(data.contributions);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (failed) return null;
  if (!days) return <p className="status">Loading contributions...</p>;
  if (days.length === 0) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();

  return (
    <section className="contrib">
      <h3 className="section-title">
        {total.toLocaleString()} contributions in the last year
      </h3>
      <div className="contrib-scroll">
        <div className="contrib-grid">
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`pad-${i}`} className="cell pad" />
          ))}
          {days.map((d) => (
            <span
              key={d.date}
              className={`cell level-${d.level}`}
              title={`${d.count} contributions on ${d.date}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}