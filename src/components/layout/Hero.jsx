export default function Hero({ projects }) {
  const totalVotes = projects.reduce((s, p) => s + (p.votes || 0), 0);
  const uniqueMembers = new Set(projects.flatMap(p => p.members || [])).size;
  const uniqueTeams = new Set(projects.map(p => p.team).filter(Boolean)).size;

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">✨ ITS Elabram — Internal IT Developer Community</div>
        <h1>Discover Amazing Projects<br/>Built by Our <span>Team</span></h1>
        <p>
          Platform showcase untuk semua project internal yang dibuat oleh tim IT Elabram.
          Vote, comment, dan berikan apresiasi untuk karya terbaik rekan-rekan developer!
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{projects.length}</div>
            <div className="hero-stat-label">Projects</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{totalVotes}</div>
            <div className="hero-stat-label">Total Votes</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{uniqueMembers || 24}</div>
            <div className="hero-stat-label">Developers</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{uniqueTeams || 8}</div>
            <div className="hero-stat-label">Divisi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
