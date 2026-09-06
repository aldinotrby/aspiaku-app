import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cpuData = [
  { time: "09:00", cpu: 42, mem: 61 },
  { time: "10:00", cpu: 55, mem: 63 },
  { time: "11:00", cpu: 38, mem: 62 },
  { time: "12:00", cpu: 71, mem: 65 },
  { time: "13:00", cpu: 49, mem: 64 },
  { time: "14:00", cpu: 58, mem: 67 },
  { time: "15:00", cpu: 44, mem: 66 },
];

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

function ServiceStatus({ name, status, uptime }: { name: string; status: "Online" | "Offline" | "Warning"; uptime: string }) {
  const colors = {
    Online: { dot: "bg-emerald-500", badge: "text-emerald-700 bg-emerald-50 ring-emerald-200" },
    Offline: { dot: "bg-red-500", badge: "text-red-700 bg-red-50 ring-red-200" },
    Warning: { dot: "bg-amber-500", badge: "text-amber-700 bg-amber-50 ring-amber-200" },
  };
  const cfg = colors[status];
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className={`w-2.5 h-2.5 ${cfg.dot} rounded-full animate-pulse`} />
      <span className="text-sm font-medium text-slate-800 flex-1">{name}</span>
      <span className="text-xs text-slate-400">{uptime}</span>
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ring-1 ring-inset ${cfg.badge}`}>{status}</span>
    </div>
  );
}

export default function AdminServerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Admin Server</h1>
        <p className="text-slate-400 text-sm mt-0.5">Monitoring infrastruktur dan server AspiAKU</p>
      </div>

      {/* Server health */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">💚</div>
        <div>
          <p className="font-bold text-emerald-800">Semua Sistem Normal</p>
          <p className="text-sm text-emerald-600 mt-0.5">Tidak ada insiden yang dilaporkan · Uptime 99.8% (30 hari)</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-bold text-emerald-700">19 Des 2024</p>
          <p className="text-xs text-emerald-500">08:45 WIB</p>
        </div>
      </div>

      {/* Resource usage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "CPU Usage", value: 44, color: "bg-blue-500", detail: "4 core / 8 thread" },
          { label: "Memory", value: 66, color: "bg-violet-500", detail: "10.6 GB / 16 GB" },
          { label: "Storage", value: 72, color: "bg-amber-500", detail: "360 GB / 500 GB" },
          { label: "Bandwidth", value: 35, color: "bg-teal-500", detail: "350 Mbps / 1 Gbps" },
        ].map((r) => (
          <div key={r.label} className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-500">{r.label}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                r.value > 80 ? "text-red-700 bg-red-50" : r.value > 60 ? "text-amber-700 bg-amber-50" : "text-emerald-700 bg-emerald-50"
              }`}>
                {r.value}%
              </span>
            </div>
            <ProgressBar value={r.value} color={r.color} />
            <p className="text-xs text-slate-400 mt-2">{r.detail}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* CPU & Memory trend */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">CPU & Memory (Hari Ini)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="CPU" />
              <Line type="monotone" dataKey="mem" stroke="#8b5cf6" strokeWidth={2.5} dot={false} name="Memory" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> CPU</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-0.5 bg-violet-500 inline-block rounded" /> Memory</span>
          </div>
        </div>

        {/* Service status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-bold text-slate-800 mb-4">Status Layanan</h2>
          <ServiceStatus name="Web Server (Nginx)" status="Online" uptime="99.9%" />
          <ServiceStatus name="API Server (Node.js)" status="Online" uptime="99.8%" />
          <ServiceStatus name="Database (PostgreSQL)" status="Online" uptime="99.9%" />
          <ServiceStatus name="Redis Cache" status="Online" uptime="100%" />
          <ServiceStatus name="File Storage" status="Warning" uptime="98.1%" />
          <ServiceStatus name="Email Service" status="Online" uptime="99.5%" />
          <ServiceStatus name="SMS Gateway" status="Online" uptime="99.7%" />
        </div>
      </div>

      {/* Backup status */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Status Backup</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Backup Harian", last: "Hari ini 02:00 WIB", status: "Berhasil", size: "2.4 GB" },
            { label: "Backup Mingguan", last: "15 Des 2024 02:00 WIB", status: "Berhasil", size: "16.8 GB" },
            { label: "Backup Bulanan", last: "01 Des 2024 02:00 WIB", status: "Berhasil", size: "48.2 GB" },
          ].map((b) => (
            <div key={b.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-800">{b.label}</p>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{b.status}</span>
              </div>
              <p className="text-xs text-slate-500">{b.last}</p>
              <p className="text-xs font-medium text-slate-700 mt-1">Ukuran: {b.size}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800">
          Jalankan Backup Manual
        </button>
      </div>
    </div>
  );
}
