const permissions = [
  "Lihat Laporan",
  "Buat Laporan",
  "Verifikasi Laporan",
  "Proses Laporan",
  "Beri Tanggapan",
  "Selesaikan Laporan",
  "Kelola Pengguna",
  "Kelola Instansi",
  "Kelola Kategori",
  "Kelola Routing",
  "Lihat Statistik",
  "Kelola Sistem",
  "Manajemen Server",
  "Kelola Database",
  "Recovery Sistem",
  "Audit Log",
];

const roles = [
  { key: "masyarakat", label: "Masyarakat", color: "bg-blue-600" },
  { key: "admin_instansi", label: "Admin Instansi", color: "bg-emerald-600" },
  { key: "super_admin", label: "Super Admin", color: "bg-violet-600" },
  { key: "admin_server", label: "Admin Server", color: "bg-slate-700" },
  { key: "admin_sistem", label: "Admin Sistem", color: "bg-teal-600" },
];

const matrix: Record<string, string[]> = {
  masyarakat: ["Lihat Laporan", "Buat Laporan", "Lihat Statistik"],
  admin_instansi: ["Lihat Laporan", "Verifikasi Laporan", "Proses Laporan", "Beri Tanggapan", "Selesaikan Laporan", "Lihat Statistik"],
  super_admin: permissions,
  admin_server: ["Lihat Laporan", "Lihat Statistik", "Manajemen Server", "Kelola Database", "Audit Log"],
  admin_sistem: ["Lihat Laporan", "Lihat Statistik", "Kelola Sistem", "Kelola Database", "Recovery Sistem", "Audit Log"],
};

export default function SuperAdminRoles() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Role & Permission</h1>
        <p className="text-slate-400 text-sm mt-0.5">Matriks hak akses per peran pengguna</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
        <strong>Info:</strong> Perubahan pada matriks ini akan mempengaruhi akses seluruh pengguna dengan role terkait. Harap berhati-hati.
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wide min-w-48">Aksi / Permission</th>
                {roles.map((r) => (
                  <th key={r.key} className="px-4 py-4 text-center min-w-28">
                    <div className={`inline-flex px-3 py-1.5 rounded-lg ${r.color} text-white text-xs font-bold`}>
                      {r.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((perm) => (
                <tr key={perm} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-700">{perm}</td>
                  {roles.map((r) => {
                    const has = matrix[r.key].includes(perm);
                    return (
                      <td key={r.key} className="px-4 py-3.5 text-center">
                        <div className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${
                          has ? "bg-emerald-50" : "bg-slate-100"
                        }`}>
                          {has
                            ? <span className="text-emerald-600 text-sm font-bold">✓</span>
                            : <span className="text-slate-300 text-xs">—</span>
                          }
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 text-sm font-bold">✓</span>
          </div>
          <span>Memiliki akses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-slate-300 text-xs">—</span>
          </div>
          <span>Tidak memiliki akses</span>
        </div>
      </div>
    </div>
  );
}
