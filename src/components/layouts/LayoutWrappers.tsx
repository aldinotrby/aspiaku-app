import AdminLayout from "./AdminLayout";

// Admin Layout Wrappers
export function AdminLayoutWrapper() {
  return <AdminLayout role="admin_instansi" agencyName="Dinas PUPR · Kota Kediri" />;
}

export function SuperAdminLayoutWrapper() {
  return <AdminLayout role="super_admin" />;
}

export function AdminServerLayoutWrapper() {
  return <AdminLayout role="admin_server" />;
}

export function AdminSistemLayoutWrapper() {
  return <AdminLayout role="admin_sistem" />;
}

// Placeholder component
export function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-64">
      <div className="text-5xl mb-4">🚧</div>
      <h2 className="text-xl font-bold text-slate-700">{title}</h2>
      <p className="text-slate-400 text-sm mt-1">Halaman ini sedang dalam pengembangan</p>
    </div>
  );
}