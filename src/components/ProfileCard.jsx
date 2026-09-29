export default function ProfileCard({ user }) {
  return (
    <section className="profile-card">
      <img className="avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        <a href={user.html_url} target="_blank" rel="noreferrer">
          @{user.login}
        </a>
        <p className="bio">{user.bio || "This user has no bio."}</p>
        <div className="stats">
          <div><strong>{user.followers}</strong><span>Followers</span></div>
          <div><strong>{user.following}</strong><span>Following</span></div>
          <div><strong>{user.public_repos}</strong><span>Repos</span></div>
        </div>
      </div>
    </section>
  );
}