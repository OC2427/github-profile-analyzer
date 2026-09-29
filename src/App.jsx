import { useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoFilters from "./components/RepoFilters";
import RepoList from "./components/RepoList";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import LanguageChart from "./components/LanguageChart";
import { fetchUser, fetchRepos } from "./api/github";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("stars");

  async function handleSearch(username) {
    const name = username.trim();
    if (!name) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);
    setSearch("");
    setLanguage("all");
    setSort("stars");

    try {
      const [userData, repoData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))].sort(),
    [repos]
  );

  const visibleRepos = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = repos.filter(
      (r) =>
        r.name.toLowerCase().includes(query) &&
        (language === "all" || r.language === language)
    );

    return [...filtered].sort((a, b) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "name") return a.name.localeCompare(b.name);
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  }, [repos, search, language, sort]);

  return (
    <div className="app">
      <header>
        <h1>GitHub Profile Analyzer</h1>
        <p>Search any GitHub user to explore their profile and repositories.</p>
        <ThemeToggle />
      </header>

      <SearchBar onSearch={handleSearch} loading={loading} />

      <ErrorMessage message={error} />
      {loading && <Loader />}
      {user && <ProfileCard user={user} />}
      {user && <LanguageChart repos={repos} />}

      {user && repos.length === 0 && (
        <p className="status">This user has no public repositories yet.</p>
      )}

      {user && repos.length > 0 && (
        <section>
          <h3 className="section-title">
            Repositories ({visibleRepos.length} of {repos.length})
          </h3>
          <RepoFilters
            search={search}
            onSearchChange={setSearch}
            language={language}
            onLanguageChange={setLanguage}
            sort={sort}
            onSortChange={setSort}
            languages={languages}
          />
          <RepoList repos={visibleRepos} />
        </section>
      )}
    </div>
  );
}