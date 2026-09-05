import { auditLogs } from "../../lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const apiData = [
  { time: "09:00", requests: 234, errors: 2 },
  { time: "10:00", requests: 312, errors: 4 },
  { time: "11:00", requests: 289, errors: 1 },
  { time: "12:00", requests: 418, errors: 8 },
  { time: "13:00", requests: 376, errors: 3 },
  { time: "14:00", requests: 401, errors: 5 },
  { time: "15:00", requests: 355, errors: 2 },
];

function HealthIndicator({ label, status, detail }: { label: string; status: "Sehat" | "Peringatan" | "Kritis"; detail: string }) {
  const colors = {
    Sehat: "text-emerald-700 bg-emerald-50 ring-emerald-200",
    Peringatan: "text-amber-700 bg-amber-50 ring-amber-200",
    Kritis: "text-red-700 bg-red-50 ring-red-200",
  };
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-800 flex-1">{label}</span>
      <span className="text-xs text-slate-400">{detail}</span>
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ring-1 ring-inset ${colors[status]}`}>{status}</span>
    </div>
  );
}

export default function AdminSistemDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Admin Sistem</h1>
        <p className="text-slate-400 text-sm mt-0.5">Monitoring teknis dan konfigurasi sistem AspiAKU</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pengguna Aktif", value: "47", sub: "Saat ini online", color: "text-blue-700", icon: "👥" },
          { label: "API Requests", value: "2.8K", sub: "Hari ini", color: "text-slate-900", icon: "🌐" },
          { label: "Error Rate", value: "0.8%", sub: "Di bawah threshold", color: "text-emerald-600", icon: "✅" },
          { label: "Event Sistem", value: "23", sub: "Hari ini", color: "text-amber-600", icon: "📊" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{k.label}</p>
              <span className="text-xl">{k.icon}</span>
            </div>
            <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
            {k.sub && <p className="text-xs text-slate-400 mt-1">{k.sub}</p>}
          </div>
        ))}
      </div>

      {/* API traffic chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Traffic API (Hari Ini)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={apiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
            <Line type="monotone" dataKey="requests" stroke="#1d4ed8" strokeWidth={2.5} dot={false} name="Requests" />
            <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={false} name="Errors" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* System health */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Kesehatan Sistem</h2>
          <HealthIndicator label="Autentikasi & Sesi" status="Sehat" detail="JWT valid" />
          <HealthIndicator label="Queue & Background Jobs" status="Sehat" detail="0 job tertunda" />
          <HealthIndicator label="Cache Layer" status="Peringatan" detail="Hit rate 71%" />
          <HealthIndicator label="File Upload Service" status="Sehat" detail="S3 terhubung" />
          <HealthIndicator label="Notifikasi Service" status="Sehat" detail="Email & SMS aktif" />
          <HealthIndicator label="Search Engine" status="Sehat" detail="Index terkini" />
        </div>

        {/* Security events */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Event Keamanan Terkini</h2>
          <div className="space-y-2">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.status === "Berhasil" ? "bg-emerald-500" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800">{log.action} — {log.user}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{log.timestamp} · {log.ip}</p>
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                  log.status === "Berhasil" ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System configuration summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Konfigurasi Sistem Aktif</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Versi Aplikasi", value: "1.0.0" },
            { label: "Node.js", value: "v20.11.0" },
            { label: "Database", value: "PostgreSQL 15" },
            { label: "Cache", value: "Redis 7.2" },
            { label: "OS", value: "Ubuntu 22.04 LTS" },
            { label: "Timezone", value: "Asia/Jakarta (WIB)" },
            { label: "Mode", value: "Production" },
            { label: "Build", value: "#2024121901" },
          ].map((c) => (
            <div key={c.label} className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{c.label}</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5 font-mono">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
