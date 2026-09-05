import { agencyPerformance, monthlyStats, statusDistribution, categoryDistribution } from "../../lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

function Kpi({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1.5 ${color ?? "text-slate-900"}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

const lineData = [
  { date: "13 Des", laporan: 12 },
  { date: "14 Des", laporan: 18 },
  { date: "15 Des", laporan: 9 },
  { date: "16 Des", laporan: 14 },
  { date: "17 Des", laporan: 21 },
  { date: "18 Des", laporan: 16 },
  { date: "19 Des", laporan: 8 },
];

export default function AdminStats() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Statistik</h1>
        <p className="text-slate-400 text-sm mt-0.5">Analitik performa penanganan laporan</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total Laporan" value="142" sub="All time" />
        <Kpi label="Selesai" value="91" sub="64% tingkat penyelesaian" color="text-emerald-600" />
        <Kpi label="Rata-rata Penanganan" value="2.3 hari" sub="Per laporan" color="text-blue-700" />
        <Kpi label="Tingkat Respons" value="94%" sub="Bulan ini" color="text-violet-600" />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Tren Bulanan</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="laporan" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Total" />
              <Bar dataKey="selesai" fill="#10b981" radius={[6, 6, 0, 0]} name="Selesai" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily trend */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Tren Harian (7 Hari Terakhir)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Line type="monotone" dataKey="laporan" stroke="#1d4ed8" strokeWidth={2.5} dot={{ fill: "#1d4ed8", r: 4 }} name="Laporan" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status dist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Distribusi Status</h2>
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
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                  <span className="text-xs font-bold text-slate-900">{s.value}</span>
                  <span className="text-xs text-slate-400">{Math.round(s.value / 3.27)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category dist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Laporan per Kategori</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryDistribution} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none" }} />
              <Bar dataKey="laporan" fill="#1d4ed8" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agency performance */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Performa Instansi</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 rounded-xl">
              <tr>
                {["Instansi", "Total Laporan", "Selesai", "Tingkat Selesai", "Avg. Waktu Respons"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agencyPerformance.map((a) => {
                const rate = Math.round((a.selesai / a.total) * 100);
                return (
                  <tr key={a.instansi} className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-semibold text-sm text-slate-900">{a.instansi}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700">{a.total}</td>
                    <td className="px-4 py-3.5 text-sm text-emerald-600 font-semibold">{a.selesai}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-10 text-right">{rate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">{a.responsTime} hari</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
