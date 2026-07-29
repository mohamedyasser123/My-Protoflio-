import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderKanban, Star, Eye, EyeOff, RefreshCw, Github } from 'lucide-react';
import { ProjectsTable } from '../components/ProjectsTable';
import { useProjects } from '../hooks/useProjects';
import { useSyncGitHub } from '../hooks/useSyncGitHub';
import { formatDate } from '../utils/project.utils';

const StatCard: React.FC<{
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}> = ({ label, value, icon, color, loading }) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
    <div className={`shrink-0 p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      {loading ? (
        <div className="mt-1 h-6 w-12 rounded-md bg-slate-800 animate-pulse" />
      ) : (
        <p className="text-2xl font-bold text-white leading-tight">{value}</p>
      )}
    </div>
  </div>
);

export const AdminDashboardPage: React.FC = () => {
  const { data: allData, isLoading } = useProjects({ limit: 1000 });

  const total = allData?.total ?? 0;
  const featured = allData?.data.filter((p) => p.featured).length ?? 0;
  const visible = allData?.data.filter((p) => p.visible).length ?? 0;
  const hidden = allData?.data.filter((p) => !p.visible).length ?? 0;
  
  const { mutate: syncGitHub, isPending: isSyncing } = useSyncGitHub();
  
  const lastSyncTime = allData?.data
    .filter((p) => p.lastSyncTime)
    .sort((a, b) => new Date(b.lastSyncTime!).getTime() - new Date(a.lastSyncTime!).getTime())[0]?.lastSyncTime;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage and organize all your portfolio projects
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {lastSyncTime && (
            <span className="text-xs text-slate-500">
              Last sync: {new Date(lastSyncTime).toLocaleString()}
            </span>
          )}
          <button
            onClick={() => syncGitHub()}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin text-sky-400' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync with GitHub'}
          </button>
          <Link
            to="/dashboard-admin-xyz/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          >
            <Plus size={16} />
            Add Project
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total"
          value={total}
          icon={<FolderKanban size={20} className="text-sky-400" />}
          color="bg-sky-500/10"
          loading={isLoading}
        />
        <StatCard
          label="Featured"
          value={featured}
          icon={<Star size={20} className="text-amber-400" fill="currentColor" />}
          color="bg-amber-500/10"
          loading={isLoading}
        />
        <StatCard
          label="Visible"
          value={visible}
          icon={<Eye size={20} className="text-emerald-400" />}
          color="bg-emerald-500/10"
          loading={isLoading}
        />
        <StatCard
          label="Hidden"
          value={hidden}
          icon={<EyeOff size={20} className="text-slate-400" />}
          color="bg-slate-500/10"
          loading={isLoading}
        />
      </div>

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">All Projects</h2>
          <Link
            to="/dashboard-admin-xyz/projects/new"
            className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
          >
            <Plus size={12} />
            Add new
          </Link>
        </div>
        <ProjectsTable />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
