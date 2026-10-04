import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Database,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Clock,
  Layers,
  CheckCircle,
  Eye,
  MessageSquare,
  RefreshCw,
  PlusCircle,
  FolderOpen,
} from 'lucide-react';
import {
  getApplications,
  updateApplicationStatus,
  exportApplicationsToCSV,
} from '../../services/applicationService';
import { isFirebaseConfigured } from '../../services/firebase';
import type { Application, ApplicationStatus, AdminUser } from '../../types';

interface AdminDashboardPageProps {
  admin: AdminUser;
  onLogout: () => void;
  onOpenApplication: (id: string) => void;
  onOpenFirebaseConfig: () => void;
}

const STATUS_COLUMNS: { key: ApplicationStatus; label: string; color: string }[] = [
  { key: 'NEW', label: 'New', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { key: 'UNDER_REVIEW', label: 'Under Review', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { key: 'CONTACTED', label: 'Contacted', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { key: 'DISCUSSION', label: 'Discussion', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { key: 'SELECTED', label: 'Selected', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { key: 'ONBOARDING', label: 'Onboarding', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { key: 'BUILDING', label: 'Building', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { key: 'LAUNCHED', label: 'Launched', color: 'bg-green-100 text-green-800 border-green-200' },
  { key: 'ON_HOLD', label: 'On Hold', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { key: 'REJECTED', label: 'Rejected', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  admin,
  onLogout,
  onOpenApplication,
  onOpenFirebaseConfig,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Search & Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [degreeFilter, setDegreeFilter] = useState<string>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    await updateApplicationStatus(id, newStatus, admin.email);
    fetchApps();
  };

  // Filter logic
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.whatsapp.includes(search) ||
      app.college.toLowerCase().includes(search.toLowerCase()) ||
      (app.ideaTitle && app.ideaTitle.toLowerCase().includes(search.toLowerCase())) ||
      (app.problemStatement && app.problemStatement.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesDegree = degreeFilter === 'ALL' || app.degree === degreeFilter;
    const matchesState = stateFilter === 'ALL' || app.state === stateFilter;

    return matchesSearch && matchesStatus && matchesDegree && matchesState;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
  });

  // Overview Counts
  const counts = {
    total: applications.length,
    new: applications.filter((a) => a.status === 'NEW').length,
    underReview: applications.filter((a) => a.status === 'UNDER_REVIEW').length,
    contacted: applications.filter((a) => a.status === 'CONTACTED').length,
    selected: applications.filter((a) => a.status === 'SELECTED').length,
    building: applications.filter((a) => a.status === 'BUILDING').length,
    launched: applications.filter((a) => a.status === 'LAUNCHED').length,
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const col = STATUS_COLUMNS.find((c) => c.key === status);
    return (
      <span
        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wider ${
          col?.color || 'bg-slate-100 text-slate-700 border-slate-200'
        }`}
      >
        {col?.label || status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
              Applications Pipeline
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1.5 ${
                isFirebaseConfigured()
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isFirebaseConfigured() ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></span>
              {isFirebaseConfigured() ? 'Cloud Firestore' : 'Local Storage Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong className="text-slate-800">{admin.email}</strong> ({admin.role})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchApps}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Refresh applications"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => exportApplicationsToCSV(applications)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenFirebaseConfig}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Firebase Config</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Total', count: counts.total, color: 'text-slate-900', bg: 'bg-white' },
          { label: 'New', count: counts.new, color: 'text-blue-600', bg: 'bg-blue-50/50' },
          { label: 'Under Review', count: counts.underReview, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
          { label: 'Contacted', count: counts.contacted, color: 'text-sky-600', bg: 'bg-sky-50/50' },
          { label: 'Selected', count: counts.selected, color: 'text-purple-600', bg: 'bg-purple-50/50' },
          { label: 'Building', count: counts.building, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
          { label: 'Launched', count: counts.launched, color: 'text-green-600', bg: 'bg-green-50/50' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border border-slate-200/90 rounded-2xl p-4 shadow-2xs`}
          >
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {stat.label}
            </span>
            <span className={`text-2xl font-black font-mono ${stat.color}`}>{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Control Bar: View Switcher, Search & Filters */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicant, college, idea..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'kanban' ? 'bg-white text-blue-600 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Pipeline Kanban
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              {STATUS_COLUMNS.map((col) => (
                <option key={col.key} value={col.key}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Degree</label>
            <select
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All Degrees</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
            >
              <option value="ALL">All States</option>
              <option value="Bihar">Bihar</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Delhi NCR">Delhi NCR</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sort Date</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">College</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Idea / Project</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedApps.length > 0 ? (
                  sortedApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => onOpenApplication(app.id)}
                    >
                      {/* Applicant */}
                      <td className="py-3.5 px-4">
                        <strong className="block text-slate-900 font-semibold">
                          {app.fullName}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-mono">{app.id}</span>
                      </td>

                      {/* College */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium">{app.college}</span>
                        <span className="block text-[11px] text-slate-400">
                          {app.degree} {app.branch ? `• ${app.branch}` : ''}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {app.city}, {app.state}
                      </td>

                      {/* Idea */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-semibold text-slate-900 block truncate">
                          {app.ideaTitle || 'Untitled / Looking to build'}
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {app.problemStatement || '—'}
                        </span>
                      </td>

                      {/* Stage */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {app.stage || 'Exploration'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          className="px-2 py-1 rounded-md text-[11px] font-semibold border border-slate-200 bg-white focus:outline-hidden"
                        >
                          {STATUS_COLUMNS.map((col) => (
                            <option key={col.key} value={col.key}>
                              {col.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {app.whatsapp && (
                            <a
                              href={`https://wa.me/${app.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hi ${app.fullName}, this is from Startup Junction regarding your application for ${
                                  app.ideaTitle || 'Startup Junction'
                                }. We reviewed your submission and would love to schedule a brief introductory call!`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => onOpenApplication(app.id)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            title="Open Application"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      <FolderOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700">No applications found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Try modifying your search or clearing active filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* KANBAN PIPELINE VIEW */
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start gap-4 min-w-[1200px]">
            {STATUS_COLUMNS.map((col) => {
              const colApps = sortedApps.filter((a) => a.status === col.key);
              return (
                <div
                  key={col.key}
                  className="w-72 shrink-0 bg-slate-100/80 rounded-2xl p-3 border border-slate-200/80 flex flex-col max-h-[75vh]"
                >
                  <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200/60 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      {col.label}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[11px] font-bold flex items-center justify-center shadow-2xs">
                      {colApps.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto pr-1">
                    {colApps.length > 0 ? (
                      colApps.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => onOpenApplication(app.id)}
                          className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400">{app.id}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900">{app.fullName}</h4>

                          <p className="text-[11px] font-medium text-blue-700 line-clamp-2">
                            {app.ideaTitle || 'Untitled Idea'}
                          </p>

                          <div className="text-[10px] text-slate-500 truncate">{app.college}</div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                              {app.stage}
                            </span>
                            <select
                              value={app.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) =>
                                handleStatusChange(app.id, e.target.value as ApplicationStatus)
                              }
                              className="text-[10px] border border-slate-200 rounded-sm px-1 py-0.5 bg-white text-slate-700"
                            >
                              {STATUS_COLUMNS.map((c) => (
                                <option key={c.key} value={c.key}>
                                  Move: {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-[11px] text-slate-400 italic">
                        Empty stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
