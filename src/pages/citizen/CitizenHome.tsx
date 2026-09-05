import { useNavigate } from "react-router";
import { reports, categories } from "../../lib/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { LocationIcon, HeartIcon, CommentIcon, ChevronRightIcon, PlusIcon } from "../../components/shared/Icons";

const categoryIcons: Record<string, string> = {
  "Jalan & Infrastruktur": "🛣️",
  "Kebersihan & Sampah": "♻️",
  "Penerangan Jalan": "💡",
  "Drainase & Banjir": "🌊",
  "Pohon & Taman": "🌳",
  "Trotoar & Fasilitas": "🚶",
  "Bencana Alam": "⚠️",
  "Lingkungan & Polusi": "🌿",
};

function ReportCard({ report }: { report: (typeof reports)[0] }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/citizen/report/${report.id}`)}
      className="flex-none w-72 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden text-left hover:shadow-md transition-shadow active:scale-[0.99]"
    >
      {report.photos.length > 0 && (
        <div className="h-36 overflow-hidden">
          <img src={report.photos[0]} alt={report.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <StatusBadge status={report.status} size="sm" />
          <span className="text-[10px] text-slate-400 shrink-0">{report.date.slice(5).replace("-", " ")}</span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">{report.title}</h3>
        <div className="flex items-center gap-1 mt-1.5 text-slate-400">
          <LocationIcon className="w-3 h-3 shrink-0" />
          <span className="text-[11px] truncate">{report.location}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <HeartIcon className="w-3 h-3" /> {report.supportCount}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <CommentIcon className="w-3 h-3" /> {report.commentCount}
          </span>
          <span className="ml-auto text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{report.agency}</span>
        </div>
      </div>
    </button>
  );
}

export default function CitizenHome() {
  const navigate = useNavigate();
  const latestReports = reports.slice(0, 4);
  const popularReports = [...reports].sort((a, b) => b.supportCount - a.supportCount).slice(0, 3);

  return (
    <div className="pb-4">
      {/* Hero greeting card */}
      <div className="mx-4 bg-white rounded-2xl shadow-md p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-xl">👤</div>
          <div>
            <div className="text-slate-500 text-xs">Selamat pagi,</div>
            <div className="font-bold text-slate-900">Anonim7283640192</div>
          </div>
          <div className="ml-auto bg-blue-50 rounded-xl px-3 py-1.5 text-center">
            <div className="text-blue-700 font-bold text-lg leading-none">8</div>
            <div className="text-blue-500 text-[10px]">Laporan</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
          {[
            { label: "Diproses", count: 2, color: "text-amber-600" },
            { label: "Selesai", count: 5, color: "text-emerald-600" },
            { label: "Ditolak", count: 1, color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className={`font-bold text-xl ${s.color}`}>{s.count}</div>
              <div className="text-slate-400 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Buat Laporan CTA */}
      <div className="mx-4 mb-5">
        <button
          onClick={() => navigate("/citizen/create-report")}
          className="w-full bg-blue-700 text-white rounded-2xl py-4 px-5 flex items-center gap-4 shadow-md shadow-blue-200 hover:bg-blue-800 transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-bold text-base">Buat Laporan</div>
            <div className="text-blue-200 text-xs">Laporkan masalah di sekitarmu</div>
          </div>
          <ChevronRightIcon className="ml-auto w-5 h-5 text-blue-300" />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-slate-900 text-base">Kategori</h2>
          <button className="text-blue-600 text-xs font-semibold">Lihat Semua</button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/citizen/feed?category=${cat.id}`)}
              className="flex-none flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 w-20 shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow active:scale-95"
            >
              <span className="text-2xl">{categoryIcons[cat.name] || "📋"}</span>
              <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">{cat.name.split(" ")[0]}</span>
              <span className="text-[9px] text-slate-400">{cat.reportCount} laporan</span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest reports */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-slate-900 text-base">Terbaru</h2>
          <button onClick={() => navigate("/citizen/feed")} className="text-blue-600 text-xs font-semibold">Lihat Semua</button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {latestReports.map((r) => <ReportCard key={r.id} report={r} />)}
        </div>
      </div>

      {/* Popular reports */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-slate-900 text-base">Paling Banyak Didukung</h2>
        </div>
        <div className="px-4 space-y-3">
          {popularReports.map((r, i) => (
            <button
              key={r.id}
              onClick={() => navigate(`/citizen/report/${r.id}`)}
              className="w-full bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-3 flex items-center gap-3 text-left hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{r.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{r.location}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-rose-500">
                  <HeartIcon className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold">{r.supportCount}</span>
                </div>
                <StatusBadge status={r.status} size="sm" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map teaser */}
      <div className="mx-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900 text-base">Laporan di Sekitarmu</h2>
          <button onClick={() => navigate("/citizen/map")} className="text-blue-600 text-xs font-semibold">Buka Peta</button>
        </div>
        <button
          onClick={() => navigate("/citizen/map")}
          className="w-full h-36 rounded-2xl overflow-hidden relative shadow-sm ring-1 ring-slate-100"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop&auto=format"
            alt="Peta laporan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center">
            <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
              <span className="text-blue-700 font-bold text-sm">Lihat Peta Interaktif</span>
            </div>
          </div>
          {/* Fake markers */}
          {[
            { x: "30%", y: "40%", color: "bg-amber-500" },
            { x: "55%", y: "55%", color: "bg-red-500" },
            { x: "70%", y: "35%", color: "bg-emerald-500" },
          ].map((m, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 ${m.color} rounded-full border-2 border-white shadow-sm`}
              style={{ left: m.x, top: m.y }}
            />
          ))}
        </button>
      </div>
    </div>
  );
}
