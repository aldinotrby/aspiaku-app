import { createBrowserRouter, Navigate } from "react-router";

import RoleSelector from "./pages/RoleSelector";

// Auth pages
import CitizenLogin from "./pages/auth/CitizenLogin";
import CitizenRegister from "./pages/auth/CitizenRegister";
import CitizenOTP from "./pages/auth/CitizenOTP";
import CitizenForgotPassword from "./pages/auth/CitizenForgotPassword";
import CitizenResetPassword from "./pages/auth/CitizenResetPassword";
import AdminLogin from "./pages/auth/AdminLogin";

// Citizen
import CitizenLayout from "./components/layouts/CitizenLayout";
import CitizenHome from "./pages/citizen/CitizenHome";
import CitizenFeed from "./pages/citizen/CitizenFeed";
import CitizenReportDetail from "./pages/citizen/CitizenReportDetail";
import CitizenCreateReport from "./pages/citizen/CitizenCreateReport";
import CitizenMyReports from "./pages/citizen/CitizenMyReports";
import CitizenMap from "./pages/citizen/CitizenMap";
import CitizenNotifications from "./pages/citizen/CitizenNotifications";
import CitizenProfile from "./pages/citizen/CitizenProfile";

// Layout wrappers and placeholder
import {
  AdminLayoutWrapper,
  SuperAdminLayoutWrapper,
  AdminServerLayoutWrapper,
  AdminSistemLayoutWrapper,
  Placeholder
} from "./components/layouts/LayoutWrappers";

// Admin Instansi
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import AdminReportDetail from "./pages/admin/AdminReportDetail";
import AdminStats from "./pages/admin/AdminStats";

// Super Admin
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminAgencies from "./pages/super-admin/SuperAdminAgencies";
import SuperAdminUsers from "./pages/super-admin/SuperAdminUsers";
import SuperAdminRoles from "./pages/super-admin/SuperAdminRoles";
import SuperAdminAuditLog from "./pages/super-admin/SuperAdminAuditLog";
import SuperAdminSettings from "./pages/super-admin/SuperAdminSettings";

// Admin Server
import AdminServerDashboard from "./pages/admin-server/AdminServerDashboard";

// Admin Sistem
import AdminSistemDashboard from "./pages/admin-sistem/AdminSistemDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleSelector />,
  },

  // Auth routes — citizen
  { path: "/auth/citizen/login", element: <CitizenLogin /> },
  { path: "/auth/citizen/register", element: <CitizenRegister /> },
  { path: "/auth/citizen/otp", element: <CitizenOTP /> },
  { path: "/auth/citizen/forgot-password", element: <CitizenForgotPassword /> },
  { path: "/auth/citizen/reset-password", element: <CitizenResetPassword /> },

  // Auth routes — admin (shared component, role via param)
  { path: "/auth/:role/login", element: <AdminLogin /> },

  // Citizen routes
  {
    path: "/citizen",
    element: <CitizenLayout />,
    children: [
      { index: true, element: <Navigate to="/citizen/home" replace /> },
      { path: "home", element: <CitizenHome /> },
      { path: "feed", element: <CitizenFeed /> },
      { path: "my-reports", element: <CitizenMyReports /> },
      { path: "map", element: <CitizenMap /> },
      { path: "notifications", element: <CitizenNotifications /> },
      { path: "profile", element: <CitizenProfile /> },
    ],
  },
  {
    path: "/citizen/report/:id",
    element: <CitizenReportDetail />,
  },
  {
    path: "/citizen/create-report",
    element: <CitizenCreateReport />,
  },

  // Admin Instansi routes
  {
    path: "/admin",
    element: <AdminLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "reports", element: <AdminReports /> },
      { path: "report/:id", element: <AdminReportDetail /> },
      { path: "processed", element: <Placeholder title="Laporan Diproses" /> },
      { path: "completed", element: <Placeholder title="Laporan Selesai" /> },
      { path: "stats", element: <AdminStats /> },
      { path: "notifications", element: <Placeholder title="Notifikasi Admin" /> },
      { path: "profile", element: <Placeholder title="Profil Admin" /> },
    ],
  },

  // Super Admin routes
  {
    path: "/super-admin",
    element: <SuperAdminLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/super-admin/dashboard" replace /> },
      { path: "dashboard", element: <SuperAdminDashboard /> },
      { path: "reports", element: <AdminReports /> },
      { path: "agencies", element: <SuperAdminAgencies /> },
      { path: "categories", element: <Placeholder title="Manajemen Kategori" /> },
      { path: "routing", element: <Placeholder title="Konfigurasi Routing" /> },
      { path: "users", element: <SuperAdminUsers /> },
      { path: "roles", element: <SuperAdminRoles /> },
      { path: "stats", element: <AdminStats /> },
      { path: "audit-log", element: <SuperAdminAuditLog /> },
      { path: "settings", element: <SuperAdminSettings /> },
    ],
  },

  // Admin Server routes
  {
    path: "/admin-server",
    element: <AdminServerLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/admin-server/dashboard" replace /> },
      { path: "dashboard", element: <AdminServerDashboard /> },
      { path: "server-status", element: <Placeholder title="Status Server" /> },
      { path: "infrastructure", element: <Placeholder title="Infrastruktur" /> },
      { path: "backup", element: <Placeholder title="Manajemen Backup" /> },
      { path: "security", element: <Placeholder title="Keamanan Server" /> },
      { path: "logs", element: <Placeholder title="System Logs" /> },
      { path: "monitoring", element: <Placeholder title="Monitoring" /> },
      { path: "profile", element: <Placeholder title="Profil Admin Server" /> },
    ],
  },

  // Admin Sistem routes
  {
    path: "/admin-sistem",
    element: <AdminSistemLayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/admin-sistem/dashboard" replace /> },
      { path: "dashboard", element: <AdminSistemDashboard /> },
      { path: "system-config", element: <Placeholder title="Konfigurasi Sistem" /> },
      { path: "user-access", element: <Placeholder title="User & Akses" /> },
      { path: "app-settings", element: <Placeholder title="Pengaturan Aplikasi" /> },
      { path: "database", element: <Placeholder title="Database" /> },
      { path: "recovery", element: <Placeholder title="Recovery" /> },
      { path: "audit-log", element: <SuperAdminAuditLog /> },
      { path: "system-health", element: <Placeholder title="System Health" /> },
      { path: "profile", element: <Placeholder title="Profil Admin Sistem" /> },
    ],
  },

  // 404
  {
    path: "*",
    element: (
      <div className="min-h-full flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-400 mt-2">Halaman yang Anda cari tidak ada.</p>
        <a href="/" className="mt-4 text-blue-600 font-semibold hover:underline">Kembali ke Beranda</a>
      </div>
    ),
  },
]);
