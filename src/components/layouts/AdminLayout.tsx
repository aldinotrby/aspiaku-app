import { NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../shared/Logo";
import {
  GridIcon, ListIcon, BarChartIcon, BellIcon, UserIcon, LogoutIcon,
  CheckCircleIcon, BuildingIcon, TagIcon, RouteIcon, UsersIcon,
  ShieldIcon, LayersIcon, DatabaseIcon, ServerIcon, ActivityIcon,
  SettingsIcon, KeyIcon,
} from "../shared/Icons";
import { useState } from "react";

interface NavItem {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface AdminLayoutProps {
  role: "admin_instansi" | "super_admin" | "admin_server" | "admin_sistem";
  agencyName?: string;
}

const adminNavItems: NavItem[] = [
  { to: "dashboard", label: "Dashboard", Icon: GridIcon },
  { to: "reports", label: "Laporan Masuk", Icon: ListIcon },
  { to: "processed", label: "Laporan Diproses", Icon: ActivityIcon },
  { to: "completed", label: "Laporan Selesai", Icon: CheckCircleIcon },
  { to: "stats", label: "Statistik", Icon: BarChartIcon },
  { to: "notifications", label: "Notifikasi", Icon: BellIcon },
  { to: "profile", label: "Profil", Icon: UserIcon },
];

const superAdminNavItems: NavItem[] = [
  { to: "dashboard", label: "Dashboard", Icon: GridIcon },
  { to: "reports", label: "Laporan", Icon: ListIcon },
  { to: "agencies", label: "Instansi", Icon: BuildingIcon },
  { to: "categories", label: "Kategori", Icon: TagIcon },
  { to: "routing", label: "Routing", Icon: RouteIcon },
  { to: "users", label: "Pengguna", Icon: UsersIcon },
  { to: "roles", label: "Role & Permission", Icon: ShieldIcon },
  { to: "stats", label: "Statistik", Icon: BarChartIcon },
  { to: "audit-log", label: "Audit Log", Icon: LayersIcon },
  { to: "settings", label: "Pengaturan", Icon: SettingsIcon },
];

const adminServerNavItems: NavItem[] = [
  { to: "dashboard", label: "Dashboard", Icon: GridIcon },
  { to: "server-status", label: "Status Server", Icon: ServerIcon },
  { to: "infrastructure", label: "Infrastruktur", Icon: LayersIcon },
  { to: "backup", label: "Backup", Icon: DatabaseIcon },
  { to: "security", label: "Keamanan", Icon: ShieldIcon },
  { to: "logs", label: "System Logs", Icon: ListIcon },
  { to: "monitoring", label: "Monitoring", Icon: ActivityIcon },
  { to: "profile", label: "Profil", Icon: UserIcon },
];

const adminSistemNavItems: NavItem[] = [
  { to: "dashboard", label: "Dashboard", Icon: GridIcon },
  { to: "system-config", label: "Konfigurasi Sistem", Icon: SettingsIcon },
  { to: "user-access", label: "User & Akses", Icon: KeyIcon },
  { to: "app-settings", label: "Pengaturan App", Icon: LayersIcon },
  { to: "database", label: "Database", Icon: DatabaseIcon },
  { to: "recovery", label: "Recovery", Icon: RefreshIcon },
  { to: "audit-log", label: "Audit Log", Icon: ListIcon },
  { to: "system-health", label: "System Health", Icon: ActivityIcon },
  { to: "profile", label: "Profil", Icon: UserIcon },
];

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

function getNavItems(role: string) {
  switch (role) {
    case "super_admin": return superAdminNavItems;
    case "admin_server": return adminServerNavItems;
    case "admin_sistem": return adminSistemNavItems;
    default: return adminNavItems;
  }
}

function getRoleLabel(role: string) {
  switch (role) {
    case "super_admin": return "Super Admin";
    case "admin_server": return "Admin Server";
    case "admin_sistem": return "Admin Sistem";
    default: return "Admin Instansi";
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case "super_admin": return "bg-violet-700";
    case "admin_server": return "bg-slate-800";
    case "admin_sistem": return "bg-teal-700";
    default: return "bg-blue-700";
  }
}

function getBasePath(role: string) {
  switch (role) {
    case "super_admin": return "/super-admin";
    case "admin_server": return "/admin-server";
    case "admin_sistem": return "/admin-sistem";
    default: return "/admin";
  }
}

export default function AdminLayout({ role, agencyName }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = getNavItems(role);
  const basePath = getBasePath(role);
  const bgColor = getRoleColor(role);

  return (
    <div className="h-full flex bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} ${bgColor} flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo */}
        <div className={`px-4 py-5 border-b border-white/10 ${collapsed ? "px-3" : ""}`}>
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="text-white">
              <Logo size="sm" variant="icon" inverted />
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <Logo size="sm" inverted />
              <button onClick={() => setCollapsed(true)} className="text-white/60 hover:text-white p-1 rounded transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-white/10">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <div className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Portal</div>
              <div className="text-white font-semibold text-sm truncate">{getRoleLabel(role)}</div>
              {agencyName && <div className="text-white/70 text-xs truncate">{agencyName}</div>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-0.5 px-2">
            {navItems.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={`${basePath}/${to}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                  title={collapsed ? label : undefined}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => navigate("/")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm font-medium transition-all ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogoutIcon className="w-4.5 h-4.5 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-slate-900 font-semibold text-base">Portal {getRoleLabel(role)}</h1>
            {agencyName && <p className="text-slate-500 text-xs">{agencyName}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold text-sm">A</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-slate-900">Admin PUPR</div>
                <div className="text-xs text-slate-500">{getRoleLabel(role)}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
