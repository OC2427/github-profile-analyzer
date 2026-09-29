export default function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="status">No repositories match your filters.</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <article className="repo-card" key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
          <p className="repo-desc">{repo.description || "No description."}</p>
          <div className="repo-meta">
            <span>★ {repo.stargazers_count}</span>
            <span className="lang-badge">{repo.language || "No language"}</span>
          </div>
        </article>
      ))}
    </div>
  );
}