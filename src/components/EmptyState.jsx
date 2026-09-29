const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj"];

const FEATURES = [
  { icon: "👤", title: "Profile", text: "Avatar, bio, followers and more." },
  { icon: "📦", title: "Repositories", text: "Search, filter by language, and sort." },
  { icon: "📊", title: "Languages", text: "See which languages they use most." },
];

export default function EmptyState({ onPick }) {
  return (
    <section className="empty-state">
      <div className="empty-icon">🔍</div>
      <h2>Explore any developer</h2>
      <p className="empty-sub">
        Type a GitHub username above, or try one of these:
      </p>

      <div className="chips">
        {EXAMPLES.map((name) => (
          <button key={name} className="chip" onClick={() => onPick(name)}>
            @{name}
          </button>
        ))}
      </div>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <strong>{f.title}</strong>
            <span>{f.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}