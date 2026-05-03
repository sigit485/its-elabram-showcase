import { useApp } from '../../context/AppContext';
import { getTagClass, getAvatarColor, getInitials, STATUS_MAP } from '../../lib/constants';
import UpvoteButton from './UpvoteButton';

export default function ProjectCard({ project, rank, voted, onVote }) {
  const { openDetail } = useApp();
  const { icon, label } = STATUS_MAP[project.status] || { icon: '⚪', label: project.status };
  const tags = (project.tags || []).slice(0, 4);
  const firstMember = (project.members || [])[0] || 'Team';

  return (
    <div
      className={`project-card${project.featured ? ' featured' : ''}`}
      onClick={() => openDetail(project.id)}
    >
      {project.featured && <div className="featured-badge">⭐ Featured</div>}
      <div className="rank-num">{rank}</div>
      <div className="project-logo">{project.emoji}</div>

      <div className="project-body">
        <div className="project-name-row">
          <span className="project-name">{project.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{icon} {label}</span>
        </div>
        <div className="project-tagline">{project.tagline}</div>
        <div className="project-meta">
          {tags.map(t => (
            <span key={t} className={`tag ${getTagClass(t)}`}>{t}</span>
          ))}
          <span style={{ marginLeft: 'auto' }} />
          <span
            className="project-comment-btn"
            onClick={e => { e.stopPropagation(); openDetail(project.id); }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {project.comment_count || 0}
          </span>
          <span className="project-author">
            <span
              className="author-avatar-sm"
              style={{ background: getAvatarColor(firstMember) }}
            >
              {getInitials(firstMember)}
            </span>
            {project.team}
          </span>
        </div>
      </div>

      <div className="project-actions">
        <UpvoteButton
          projectId={project.id}
          votes={project.votes || 0}
          voted={voted}
          onToggle={onVote}
        />
      </div>
    </div>
  );
}
