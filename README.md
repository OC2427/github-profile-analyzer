# GitHub Profile Analyzer

Search any GitHub username to see their profile, repositories, and language breakdown.

**Live demo:** <https://github-profile-analyzer-9ixc.vercel.app/>

## Features
- Profile picture, name, bio, and followers
- Repository list with stars and languages
- Search by repo name, filter by language, sort by stars, last update, or name
- Language chart (share of repos per language)
- Error handling for invalid usernames, network failures, and rate limits
- Loading state, responsive layout, and light/dark theme

## Tech stack
React, Vite, GitHub REST API

## Run locally
1. `npm install`
2. Optional: create a `.env` file with `VITE_GITHUB_TOKEN=your_token` to raise the API rate limit
3. `npm run dev`

## Notes
- Fetches up to 100 repositories per user.
- The language chart shows the share of repos per language, not lines of code.
- The app works without a token, but is limited to 60 API requests per hour.