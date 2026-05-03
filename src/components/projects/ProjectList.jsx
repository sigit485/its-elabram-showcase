import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { applyFilters } from '../../hooks/useProjects';
import { useVotes } from '../../hooks/useVotes';
import ProjectCard from './ProjectCard';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import EmptyState from '../ui/EmptyState';

export default function ProjectList({ projects, loading }) {
  const { state, setFilter, showToast } = useApp();
  const { filter } = state;
  const { votedSet, toggleVote } = useVotes();
  const [localVotes, setLocalVotes] = useState({});

  const filtered = applyFilters(projects, filter);

  function getVotes(p) {
    return localVotes[p.id] !== undefined ? localVotes[p.id] : (p.votes || 0);
  }

  async function handleVote(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const currentVotes = getVotes(project);

    const result = await toggleVote(projectId, currentVotes, (id, newCount) => {
      setLocalVotes(prev => ({ ...prev, [id]: newCount }));
    });

    if (result?.voted) {
      showToast('🔥 Vote diberikan!');
    } else {
      showToast('Vote dihapus');
    }
  }

  return (
    <div>
      <div className="content-header">
        <div className="period-tabs">
          {['today', 'week', 'month', 'all'].map((p, i) => {
            const labels = ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Semua'];
            return (
              <button
                key={p}
                className={`period-tab${filter.period === p ? ' active' : ''}`}
                onClick={() => setFilter({ period: p })}
              >
                {labels[i]}
              </button>
            );
          })}
        </div>
        <select
          className="sort-select"
          value={filter.sort}
          onChange={e => setFilter({ sort: e.target.value })}
        >
          <option value="votes">🔥 Trending</option>
          <option value="newest">🆕 Terbaru</option>
          <option value="name">🔤 A–Z</option>
        </select>
      </div>

      <div className="project-list">
        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={{ ...project, votes: getVotes(project) }}
              rank={i + 1}
              voted={votedSet.has(project.id)}
              onVote={handleVote}
            />
          ))
        )}
      </div>
    </div>
  );
}
