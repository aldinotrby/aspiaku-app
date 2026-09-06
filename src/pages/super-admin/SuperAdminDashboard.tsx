import { reports, agencies, users, statusDistribution, agencyPerformance } from "../../lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatusBadge } from "../../components/shared/StatusBadge";

function Kpi({ label, value, sub, color, icon }: { label: string; value: string | number; sub?: string; color: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function SuperAdminDashboard() {
  const totalUsers = users.length;
  const activeReports = reports.filter(r => r.status !== "Selesai" && r.status !== "Ditolak").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Super Admin</h1>
        <p className="text-slate-400 text-sm mt-0.5">Monitoring sistem AspiAKU secara keseluruhan</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total Pengguna" value={totalUsers} sub="Terdaftar" color="text-blue-700" icon="👥" />
        <Kpi label="Total Instansi" value={agencies.length} sub={`${agencies.filter(a => a.status === "Aktif").length} aktif`} color="text-violet-700" icon="🏛️" />
        <Kpi label="Total Laporan" value={reports.length} sub="All time" color="text-slate-900" icon="📋" />
        <Kpi label="Laporan Aktif" value={activeReports} sub="Dalam proses" color="text-amber-600" icon="⚙️" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Laporan Selesai" value={reports.filter(r => r.status === "Selesai").length} color="text-emerald-600" icon="✅" />
        <Kpi label="Laporan Ditolak" value={reports.filter(r => r.status === "Ditolak").length} color="text-red-500" icon="❌" />
        <Kpi label="Uptime Sistem" value="99.8%" sub="30 hari terakhir" color="text-emerald-600" icon="💚" />
        <Kpi label="Aktivitas Hari Ini" value="47" sub="Event sistem" color="text-blue-600" icon="📊" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Agency performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Laporan per Instansi</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={agencyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="instansi" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="total" fill="#1d4ed8" radius={[6, 6, 0, 0]} name="Total" />
              <Bar dataKey="selesai" fill="#10b981" radius={[6, 6, 0, 0]} name="Selesai" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Distribusi Status Global</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                  {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {statusDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                  <span className="text-xs font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent reports & Active agencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent reports */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Laporan Terbaru</h2>
          <div className="space-y-3">
            {reports.slice(0, 4).map(r => (
              <div key={r.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.agency} · {r.date}</p>
                </div>
                <StatusBadge status={r.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Agency status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Status Instansi</h2>
          <div className="space-y-3">
            {agencies.map(a => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                  {a.code.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                  <p className="text-xs text-slate-400">{a.reportCount} laporan · {a.adminCount} admin</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  a.status === "Aktif" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
