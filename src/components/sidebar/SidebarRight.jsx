import { getAvatarColor, getInitials } from '../../lib/constants';
import { useActivities } from '../../hooks/useActivities';
import { useApp } from '../../context/AppContext';

function deriveLeaderboard(projects) {
  const map = {};
  projects.forEach(p => {
    (p.members || []).forEach(m => {
      if (!map[m]) map[m] = { name: m, team: p.team, projects: 0, votes: 0 };
      map[m].projects++;
      map[m].votes += p.votes || 0;
    });
  });
  return Object.values(map)
    .map(c => ({ ...c, points: c.projects * 100 + c.votes }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);
}

function deriveTrendingTags(projects) {
  const tagCounts = {};
  projects.flatMap(p => p.tags || []).forEach(t => {
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  });
  return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);
}

function formatTime(isoStr) {
  if (!isoStr) return '';
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export default function SidebarRight({ projects }) {
  const { setFilter } = useApp();
  const { activities } = useActivities();

  const leaderboard = deriveLeaderboard(projects);
  const trendingTags = deriveTrendingTags(projects);
  const rankIcons = ['🥇', '🥈', '🥉'];
  const rankClasses = ['gold', 'silver', 'bronze'];

  return (
    <aside className="sidebar-right">
      <div className="sidebar-card">
        <div className="sidebar-title">🏆 Top Kontributor</div>
        <div className="leaderboard-list">
          {leaderboard.map((c, i) => (
            <div key={c.name} className="leaderboard-item">
              <span className={`lb-rank${rankClasses[i] ? ' ' + rankClasses[i] : ''}`}>
                {rankIcons[i] || i + 1}
              </span>
              <span
                className="author-avatar-sm"
                style={{
                  background: getAvatarColor(c.name),
                  width: 28, height: 28, fontSize: 11,
                  borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700,
                }}
              >
                {getInitials(c.name)}
              </span>
              <div className="lb-info">
                <div className="lb-name">{c.name}</div>
                <div className="lb-dept">{c.team}</div>
              </div>
              <span className="lb-points">{c.points}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-title">🏷️ Trending Tags</div>
        <div className="trending-tags">
          {trendingTags.map(([tag, count]) => (
            <button
              key={tag}
              className="trending-tag"
              onClick={() => setFilter({ search: tag })}
            >
              #{tag} <small style={{ opacity: 0.6 }}>{count}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-title">⚡ Aktivitas Terbaru</div>
        <div className="activity-feed">
          {activities.map(a => (
            <div key={a.id} className="activity-item">
              <div className="activity-dot" />
              <div>
                <div dangerouslySetInnerHTML={{ __html: a.text }} />
                <div className="activity-time">{formatTime(a.created_at)}</div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>
              Belum ada aktivitas.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
