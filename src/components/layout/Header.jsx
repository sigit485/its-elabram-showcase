import { useApp } from '../../context/AppContext';

export default function Header() {
  const { setFilter, openModal, state } = useApp();

  function handleSearch(e) {
    setFilter({ search: e.target.value.trim().toLowerCase() });
  }

  return (
    <header>
      <div className="header-inner">
        <a href="#" className="logo">
          <div className="logo-icon">🚀</div>
          <div>
            <div className="logo-text">ITS <span>Elabram</span></div>
            <div className="logo-sub">Developer Showcase</div>
          </div>
        </a>

        <div className="search-wrap">
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={state.filter.search}
            onChange={handleSearch}
            placeholder="Cari project, teknologi, atau developer..."
          />
        </div>

        <div className="header-actions">
          <button className="btn btn-ghost" onClick={() => openModal('submit')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Submit Project
          </button>
          <div className="avatar" title="ITS Elabram">IE</div>
        </div>
      </div>
    </header>
  );
}
