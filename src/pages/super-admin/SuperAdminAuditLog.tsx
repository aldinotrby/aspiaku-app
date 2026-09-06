import { useState } from "react";
import { auditLogs } from "../../lib/mockData";
import { SearchIcon, FilterIcon, DownloadIcon } from "../../components/shared/Icons";

export default function SuperAdminAuditLog() {
  const [search, setSearch] = useState("");

  const filtered = auditLogs.filter(l =>
    !search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
          <p className="text-slate-400 text-sm mt-0.5">Riwayat aktivitas seluruh pengguna sistem</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <DownloadIcon className="w-4 h-4" />
          Export Log
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pengguna, aksi, atau modul..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
            <FilterIcon className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Alert for failed logins */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-red-700">Peringatan Keamanan</p>
          <p className="text-xs text-red-600 mt-0.5">Terdeteksi 1 percobaan login gagal dari IP mencurigakan (10.0.0.99) pada 18 Des 2024.</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {["Timestamp", "Pengguna", "Aksi", "Modul", "IP / Perangkat", "Status"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((log) => (
              <tr key={log.id} className={`hover:bg-slate-50 transition-colors ${log.status === "Gagal" ? "bg-red-50/30" : ""}`}>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-mono text-slate-600 whitespace-nowrap">{log.timestamp}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                      {log.user.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{log.user}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-700 whitespace-nowrap">{log.action}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg">{log.module}</span>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-xs font-mono text-slate-600">{log.ip}</p>
                  <p className="text-xs text-slate-400">{log.device}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${
                    log.status === "Berhasil"
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-red-50 text-red-600 ring-red-200"
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
