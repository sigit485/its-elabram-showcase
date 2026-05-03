import './App.css';
import { AppProvider } from './context/AppContext';
import { useProjects } from './hooks/useProjects';
import { useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import SidebarLeft from './components/sidebar/SidebarLeft';
import SidebarRight from './components/sidebar/SidebarRight';
import ProjectList from './components/projects/ProjectList';
import DetailModal from './components/modals/DetailModal';
import SubmitModal from './components/modals/SubmitModal';
import ToastContainer from './components/ui/Toast';

function AppInner() {
  const { projects, loading, addProject } = useProjects();

  return (
    <>
      <Header />
      <Hero projects={projects} />

      <div className="main-layout">
        <SidebarLeft projects={projects} />
        <main className="content-area">
          <ProjectList projects={projects} loading={loading} />
        </main>
        <SidebarRight projects={projects} />
      </div>

      <footer>
        <strong>ITS Elabram</strong> — IT Solutions &amp; Services &nbsp;·&nbsp;
        Developer Showcase &nbsp;·&nbsp;
        <span>© {new Date().getFullYear()} ITS Elabram. All rights reserved.</span>
      </footer>

      <DetailModal projects={projects} />
      <SubmitModal onSubmit={addProject} />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
