const BASE_URL = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    });
  } catch {
    throw new Error("Network error. Check your internet connection and try again.");
  }

  if (response.status === 404) {
    throw new Error("User not found. Check the username and try again.");
  }
  if (response.status === 401) {
    throw new Error("Invalid GitHub token. Check your .env file.");
  }
  if (response.status === 403 || response.status === 429) {
    throw new Error("GitHub API rate limit reached. Please wait a while and try again.");
  }
  if (!response.ok) {
    throw new Error(`Something went wrong (error ${response.status}).`);
  }

  return response.json();
}

export function fetchUser(username) {
  return request(`/users/${encodeURIComponent(username)}`);
}

export function fetchRepos(username) {
  return request(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  );
}