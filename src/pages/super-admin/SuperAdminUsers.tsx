import { useState } from "react";
import { users } from "../../lib/mockData";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, ShieldIcon } from "../../components/shared/Icons";

const roleLabels: Record<string, { label: string; color: string }> = {
  masyarakat: { label: "Masyarakat", color: "bg-blue-50 text-blue-700 ring-blue-200" },
  admin_instansi: { label: "Admin Instansi", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  super_admin: { label: "Super Admin", color: "bg-violet-50 text-violet-700 ring-violet-200" },
  admin_server: { label: "Admin Server", color: "bg-slate-100 text-slate-700 ring-slate-200" },
  admin_sistem: { label: "Admin Sistem", color: "bg-teal-50 text-teal-700 ring-teal-200" },
};

export default function SuperAdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Pengguna</h1>
          <p className="text-slate-400 text-sm mt-0.5">{users.length} pengguna terdaftar</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 shadow-sm">
          <PlusIcon className="w-4 h-4" />
          Tambah Pengguna
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau nomor HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">Semua Role</option>
            <option value="masyarakat">Masyarakat</option>
            <option value="admin_instansi">Admin Instansi</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin_server">Admin Server</option>
            <option value="admin_sistem">Admin Sistem</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {["Pengguna", "Role", "Instansi", "Status", "Terverifikasi", "Login Terakhir", "Aksi"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((u) => {
              const roleCfg = roleLabels[u.role];
              return (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${roleCfg.color}`}>
                      {roleCfg.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{u.agency ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${
                      u.status === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-red-50 text-red-600 ring-red-200"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {u.isVerified
                      ? <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><span>✓</span> Ya</span>
                      : <span className="text-xs text-slate-400">Belum</span>
                    }
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg">
                        <ShieldIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
