import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  admin: 'Dashboard',
  projects: 'Projects',
  new: 'Add Project',
  edit: 'Edit Project',
};

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const label = breadcrumbMap[seg] || seg;
    const isLast = i === segments.length - 1;
    return { label, path, isLast };
  });

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-6 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current" />
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        <Link to="/admin" className="text-slate-500 hover:text-white transition-colors">
          <Home size={14} />
        </Link>
        {crumbs.map(({ label, path, isLast }) => (
          <React.Fragment key={path}>
            <ChevronRight size={14} className="text-slate-700" />
            {isLast ? (
              <span className="text-white font-medium">{label}</span>
            ) : (
              <Link to={path} className="text-slate-500 hover:text-white transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Live indicator */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-emerald-400">API Live</span>
      </div>
    </header>
  );
};

export default AdminHeader;
