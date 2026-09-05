import { useState } from "react";
import { agencies } from "../../lib/mockData";
import { SearchIcon, PlusIcon, EditIcon, EyeIcon, TrashIcon } from "../../components/shared/Icons";

export default function SuperAdminAgencies() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = agencies.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Instansi</h1>
          <p className="text-slate-400 text-sm mt-0.5">{agencies.length} instansi terdaftar</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 shadow-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Tambah Instansi
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 text-center">
          <div className="text-2xl font-bold text-blue-700">{agencies.length}</div>
          <div className="text-xs text-slate-400 mt-0.5">Total Instansi</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 text-center">
          <div className="text-2xl font-bold text-emerald-600">{agencies.filter(a => a.status === "Aktif").length}</div>
          <div className="text-xs text-slate-400 mt-0.5">Aktif</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 text-center">
          <div className="text-2xl font-bold text-slate-400">{agencies.filter(a => a.status === "Nonaktif").length}</div>
          <div className="text-xs text-slate-400 mt-0.5">Nonaktif</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100">
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau kode instansi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {["Nama Instansi", "Kode", "Tipe", "Status", "Admin", "Laporan", "Aksi"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-700 text-sm shrink-0">
                      {a.code.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{a.code}</span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{a.type}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${
                    a.status === "Aktif"
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-slate-100 text-slate-500 ring-slate-200"
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">{a.adminCount}</td>
                <td className="px-5 py-4 text-sm font-semibold text-blue-700">{a.reportCount}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg">Tambah Instansi Baru</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: "Nama Instansi", placeholder: "cth. Dinas PUPR" },
                { label: "Kode", placeholder: "cth. PUPR" },
                { label: "Tipe", placeholder: "cth. Teknis" },
                { label: "Deskripsi", placeholder: "Deskripsi singkat instansi" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200">Batal</button>
              <button className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
