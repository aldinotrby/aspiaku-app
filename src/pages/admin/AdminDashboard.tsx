import { useNavigate } from "react-router";
import { reports, monthlyStats, statusDistribution, categoryDistribution } from "../../lib/mockData";
import { StatusBadge, PriorityBadge } from "../../components/shared/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function StatCard({
  label, value, delta, color, bg, icon,
}: { label: string; value: string | number; delta?: string; color: string; bg: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {delta && <p className="text-xs text-emerald-600 mt-1 font-medium">{delta}</p>}
        </div>
        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center text-xl`}>{icon}</div>
      </div>
    </div>
  );
}

const urgentReports = reports.filter(r => r.priority === "Tinggi" || r.priority === "Urgent").slice(0, 3);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Laporan", value: 142, delta: "+12 bulan ini", color: "text-blue-700", bg: "bg-blue-50", icon: "📋" },
    { label: "Laporan Baru", value: 8, delta: "Hari ini", color: "text-sky-600", bg: "bg-sky-50", icon: "📨" },
    { label: "Perlu Diverifikasi", value: 12, color: "text-amber-600", bg: "bg-amber-50", icon: "⏳" },
    { label: "Sedang Diproses", value: 31, color: "text-orange-600", bg: "bg-orange-50", icon: "⚙️" },
    { label: "Selesai", value: 91, delta: "64% tingkat penyelesaian", color: "text-emerald-600", bg: "bg-emerald-50", icon: "✅" },
    { label: "Ditolak", value: 8, color: "text-red-500", bg: "bg-red-50", icon: "❌" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-0.5">Dinas PUPR · Kota Kediri · 19 Desember 2024</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Tren Laporan Bulanan</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyStats} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="laporan" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Total Laporan" />
              <Bar dataKey="selesai" fill="#10b981" radius={[6, 6, 0, 0]} name="Selesai" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" /> Total Laporan</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block" /> Selesai</span>
          </div>
        </div>

        {/* Status distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Distribusi Status</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusDistribution} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {statusDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusDistribution.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                <span className="text-xs font-bold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category distribution */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Laporan per Kategori</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={categoryDistribution} layout="vertical" barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={130} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            <Bar dataKey="laporan" fill="#1d4ed8" radius={[0, 6, 6, 0]} name="Laporan" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Urgent reports */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Laporan Prioritas Tinggi</h2>
          <button onClick={() => navigate("/admin/reports")} className="text-xs text-blue-600 font-semibold hover:text-blue-700">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="text-xs font-semibold text-slate-400 pb-3 pr-4">ID</th>
                <th className="text-xs font-semibold text-slate-400 pb-3 pr-4">Judul</th>
                <th className="text-xs font-semibold text-slate-400 pb-3 pr-4">Kategori</th>
                <th className="text-xs font-semibold text-slate-400 pb-3 pr-4">Status</th>
                <th className="text-xs font-semibold text-slate-400 pb-3 pr-4">Prioritas</th>
                <th className="text-xs font-semibold text-slate-400 pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {urgentReports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-xs font-mono text-slate-500">{r.id}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-sm font-medium text-slate-900 max-w-xs truncate">{r.title}</p>
                    <p className="text-xs text-slate-400">{r.location}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-xs text-slate-500">{r.category}</span>
                  </td>
                  <td className="py-3 pr-4"><StatusBadge status={r.status} size="sm" /></td>
                  <td className="py-3 pr-4"><PriorityBadge priority={r.priority} size="sm" /></td>
                  <td className="py-3">
                    <button
                      onClick={() => navigate(`/admin/report/${r.id}`)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
