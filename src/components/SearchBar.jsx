import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a GitHub username, e.g. torvalds"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="GitHub username"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Analyze"}
      </button>
    </form>
  );
}