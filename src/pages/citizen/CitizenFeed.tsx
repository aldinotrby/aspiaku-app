import { useState } from "react";
import { useNavigate } from "react-router";
import { reports } from "../../lib/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { SearchIcon, FilterIcon, LocationIcon, HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from "../../components/shared/Icons";
import type { ReportStatus } from "../../lib/types";

const filters: { label: string; value: ReportStatus | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Dikirim", value: "Dikirim" },
  { label: "Diverifikasi", value: "Diverifikasi" },
  { label: "Diproses", value: "Diproses" },
  { label: "Selesai", value: "Selesai" },
  { label: "Ditolak", value: "Ditolak" },
];

export default function CitizenFeed() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ReportStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [supported, setSupported] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = reports.filter((r) => {
    const matchesFilter = activeFilter === "all" || r.status === activeFilter;
    const matchesSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-full">
      {/* Search */}
      <div className="bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari laporan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FilterIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`flex-none text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                activeFilter === f.value
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2.5 text-xs text-slate-400 font-medium">
        {filtered.length} laporan ditemukan
      </div>

      {/* Feed */}
      <div className="px-4 pb-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl">🔍</div>
            <p className="font-semibold text-slate-700">Tidak ada laporan</p>
            <p className="text-slate-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          filtered.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
              {/* Image */}
              {report.photos.length > 0 && (
                <button onClick={() => navigate(`/citizen/report/${report.id}`)} className="block w-full">
                  <img
                    src={report.photos[0]}
                    alt={report.title}
                    className="w-full h-48 object-cover"
                  />
                </button>
              )}

              <div className="p-4">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={report.status} />
                  <span className="text-[10px] text-slate-400">·</span>
                  <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{report.category}</span>
                  <span className="ml-auto text-[11px] text-slate-400">{report.date}</span>
                </div>

                {/* Title & desc */}
                <button onClick={() => navigate(`/citizen/report/${report.id}`)} className="text-left block">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{report.title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">{report.description}</p>
                </button>

                {/* Location */}
                <div className="flex items-center gap-1.5 mt-2">
                  <LocationIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">{report.location}</span>
                </div>

                {/* Agency */}
                <div className="mt-2.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full ring-1 ring-blue-200">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {report.agency}
                  </span>
                </div>

                {/* Reporter */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm shrink-0">
                    {report.isAnonymous ? "🎭" : "👤"}
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {report.isAnonymous ? "Anonim" : report.reporter}
                  </span>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className="text-xs text-slate-400">{report.id}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSupported(s => { 
                      const ns = new Set(s); 
                      if (ns.has(report.id)) {
                        ns.delete(report.id);
                      } else {
                        ns.add(report.id);
                      }
                      return ns; 
                    })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      supported.has(report.id) || report.isSupported
                        ? "text-rose-600 bg-rose-50"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                    {report.supportCount + (supported.has(report.id) && !report.isSupported ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => navigate(`/citizen/report/${report.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50"
                  >
                    <CommentIcon className="w-4 h-4" />
                    {report.commentCount}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50">
                    <ShareIcon className="w-4 h-4" />
                    Bagikan
                  </button>
                  <button
                    onClick={() => setSaved(s => { 
                      const ns = new Set(s); 
                      if (ns.has(report.id)) {
                        ns.delete(report.id);
                      } else {
                        ns.add(report.id);
                      }
                      return ns; 
                    })}
                    className={`ml-auto flex items-center gap-1.5 p-1.5 rounded-lg transition-all ${
                      saved.has(report.id) || report.isSaved ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
