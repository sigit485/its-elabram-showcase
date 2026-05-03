import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../lib/constants';

export default function SidebarLeft({ projects }) {
  const { state, setFilter } = useApp();
  const { filter } = state;

  const categoryCounts = {};
  projects.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <aside className="sidebar-left">
      <div className="sidebar-card">
        <div className="sidebar-title">Kategori</div>
        <nav className="category-list">
          <button
            className={`category-item${filter.category === 'all' ? ' active' : ''}`}
            onClick={() => setFilter({ category: 'all' })}
          >
            <span className="category-item-left">
              <span className="category-dot" style={{ background: '#6b7280' }} /> Semua
            </span>
            <span className="category-count">{projects.length}</span>
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.name}
              className={`category-item${filter.category === c.name ? ' active' : ''}`}
              onClick={() => setFilter({ category: c.name })}
            >
              <span className="category-item-left">
                <span className="category-dot" style={{ background: c.color }} /> {c.name}
              </span>
              {categoryCounts[c.name] && (
                <span className="category-count">{categoryCounts[c.name]}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-title">Status Project</div>
        <nav className="category-list">
          {[
            { value: 'all', color: '#6b7280', label: 'Semua' },
            { value: 'live', color: '#10b981', label: 'Live / Production' },
            { value: 'beta', color: '#f59e0b', label: 'Beta / Testing' },
            { value: 'dev', color: '#3b82f6', label: 'In Development' },
          ].map(s => (
            <button
              key={s.value}
              className={`category-item${filter.status === s.value ? ' active' : ''}`}
              onClick={() => setFilter({ status: s.value })}
            >
              <span className="category-item-left">
                <span className="category-dot" style={{ background: s.color }} /> {s.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
