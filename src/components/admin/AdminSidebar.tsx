import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Code2,
  LogOut,
} from 'lucide-react';
import { useLogout } from '../../modules/auth/hooks/useLogout';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard-admin-xyz' },
  { label: 'All Projects', icon: FolderKanban, path: '/dashboard-admin-xyz/projects' },
  { label: 'Add Project', icon: PlusCircle, path: '/dashboard-admin-xyz/projects/new' },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { mutate: logout, isPending } = useLogout();

  const isActive = (path: string) => {
    if (path === '/dashboard-admin-xyz') return location.pathname === '/dashboard-admin-xyz';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`relative flex flex-col h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${collapsed ? 'justify-center' : ''}`}>
        <div className="shrink-0 p-2 bg-sky-500/10 rounded-xl">
          <Code2 size={20} className="text-sky-400" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-white leading-tight">Mohamed.dev</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        {/* View Portfolio Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? 'View Portfolio' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <ExternalLink size={18} className="shrink-0" />
          {!collapsed && <span>View Portfolio</span>}
        </a>

        {/* Logout */}
        <button
          onClick={() => logout()}
          disabled={isPending}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all disabled:opacity-50 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-10 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
};

export default AdminSidebar;
