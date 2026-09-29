export default function RepoFilters({
  search,
  onSearchChange,
  language,
  onLanguageChange,
  sort,
  onSortChange,
  languages,
}) {
  return (
    <div className="repo-filters">
      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search repositories"
      />
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Filter by language"
      >
        <option value="all">All languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort repositories"
      >
        <option value="stars">Most stars</option>
        <option value="updated">Recently updated</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  );
}