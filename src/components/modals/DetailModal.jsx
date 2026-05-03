import { useApp } from '../../context/AppContext';
import { getAvatarColor, getInitials } from '../../lib/constants';
import { useVotes } from '../../hooks/useVotes';
import ModalOverlay from './ModalOverlay';
import CommentSection from './CommentSection';
import { useState } from 'react';

export default function DetailModal({ projects }) {
  const { state, closeModal, showToast } = useApp();
  const { activeDetailId } = state;
  const { votedSet, toggleVote } = useVotes();
  const [localVotes, setLocalVotes] = useState({});

  const project = projects.find(p => p.id === activeDetailId);
  if (!project) return <ModalOverlay modalId="detail" maxWidth={640}><div /></ModalOverlay>;

  const votes = localVotes[project.id] !== undefined ? localVotes[project.id] : (project.votes || 0);
  const voted = votedSet.has(project.id);

  async function handleVote(e) {
    e.stopPropagation();
    const result = await toggleVote(project.id, votes, (id, newCount) => {
      setLocalVotes(prev => ({ ...prev, [id]: newCount }));
    });
    showToast(result?.voted ? '🔥 Vote diberikan!' : 'Vote dihapus');
  }

  return (
    <ModalOverlay modalId="detail" maxWidth={640}>
      <div className="modal-header" style={{ padding: 0, margin: 0 }}>
        <div className="detail-modal-header" style={{ width: '100%' }}>
          <button
            className="modal-close"
            onClick={closeModal}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >×</button>
          <div className="detail-logo">{project.emoji}</div>
          <div className="detail-name">{project.name}</div>
          <div className="detail-tagline">{project.tagline}</div>
          <div className="detail-stats-row">
            <div className="detail-stat">
              <div className="detail-stat-num">{votes}</div>
              <div className="detail-stat-label">Votes</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-num">{project.comment_count || 0}</div>
              <div className="detail-stat-label">Komentar</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-num">
                {project.created_at
                  ? new Date(project.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                  : project.date || '-'}
              </div>
              <div className="detail-stat-label">Tanggal Submit</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-section-title">Tentang Project</div>
        <div className="detail-desc">{project.description || project.desc}</div>

        <div className="detail-section-title">Teknologi</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {(project.tech || []).map(t => (
            <span key={t} className="tag tag-blue">{t}</span>
          ))}
        </div>

        <div className="detail-section-title">Tim Developer</div>
        <div className="detail-team">
          {(project.members || []).map(m => (
            <div key={m} className="detail-member">
              <span
                className="author-avatar-sm"
                style={{
                  background: getAvatarColor(m),
                  width: 24, height: 24, fontSize: 10,
                  borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700,
                }}
              >
                {getInitials(m)}
              </span>
              {m}
            </div>
          ))}
        </div>

        <div className="detail-links" style={{ marginBottom: 8 }}>
          {project.url && project.url !== '#' && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ height: 38, borderRadius: 10, fontSize: 13 }}
            >
              🔗 Buka Project
            </a>
          )}
          <button
            className={`btn${voted ? ' btn-primary' : ' btn-ghost'}`}
            style={{ height: 38, borderRadius: 10, fontSize: 13 }}
            onClick={handleVote}
          >
            {voted ? '▲ Voted' : '△ Vote'}
          </button>
        </div>

        <CommentSection projectId={activeDetailId} />
      </div>
    </ModalOverlay>
  );
}
