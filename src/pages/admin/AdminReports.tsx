import { useState } from "react";
import { useNavigate } from "react-router";
import { reports } from "../../lib/mockData";
import { StatusBadge, PriorityBadge } from "../../components/shared/StatusBadge";
import { SearchIcon, FilterIcon, DownloadIcon, EyeIcon, CheckIcon, XIcon } from "../../components/shared/Icons";
import type { ReportStatus } from "../../lib/types";

const statusFilters: { label: string; value: ReportStatus | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Dikirim", value: "Dikirim" },
  { label: "Diverifikasi", value: "Diverifikasi" },
  { label: "Diproses", value: "Diproses" },
  { label: "Selesai", value: "Selesai" },
  { label: "Ditolak", value: "Ditolak" },
];

export default function AdminReports() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ReportStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = reports.filter((r) => {
    const matchFilter = activeFilter === "all" || r.status === activeFilter;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const toggleSelect = (id: string) => {
    setSelected(s => { 
      const ns = new Set(s); 
      if (ns.has(id)) {
        ns.delete(id);
      } else {
        ns.add(id);
      }
      return ns; 
    });
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laporan Masuk</h1>
          <p className="text-slate-400 text-sm mt-0.5">{filtered.length} laporan ditemukan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm">
          <DownloadIcon className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Search and filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ID laporan, judul, atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <FilterIcon className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Status filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => { setActiveFilter(f.value); setPage(1); }}
              className={`flex-none text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                activeFilter === f.value
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
          <span className="text-sm font-semibold text-blue-700">{selected.size} dipilih</span>
          <div className="flex gap-2 ml-auto">
            <button className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 flex items-center gap-1">
              <CheckIcon className="w-3.5 h-3.5" /> Verifikasi
            </button>
            <button className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 flex items-center gap-1">
              <XIcon className="w-3.5 h-3.5" /> Tolak
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3.5 text-left">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-700 focus:ring-blue-500" />
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">ID Laporan</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Judul</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Kategori</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Lokasi</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Tanggal</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Prioritas</th>
                <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${selected.has(r.id) ? "bg-blue-50/50" : ""}`}>
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() => toggleSelect(r.id)}
                      className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="text-sm font-semibold text-slate-900 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{r.isAnonymous ? "Anonim" : r.reporter}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-600 whitespace-nowrap">{r.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-500 whitespace-nowrap">{r.district}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-500 whitespace-nowrap">{r.date}</span>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={r.status} size="sm" /></td>
                  <td className="px-4 py-3.5"><PriorityBadge priority={r.priority} size="sm" /></td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => navigate(`/admin/report/${r.id}`)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <EyeIcon className="w-3.5 h-3.5" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} dari {filtered.length} laporan
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  page === i + 1 ? "bg-blue-700 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
