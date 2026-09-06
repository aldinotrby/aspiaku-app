import { useState } from "react";
import { useNavigate } from "react-router";
import { reports } from "../../lib/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { FilterIcon, LocationIcon, ChevronRightIcon } from "../../components/shared/Icons";

interface MapMarker {
  id: string;
  x: string;
  y: string;
  color: string;
  status: string;
}

const markers: MapMarker[] = [
  { id: "RPT-2024-001", x: "35%", y: "45%", color: "bg-amber-400", status: "Diproses" },
  { id: "RPT-2024-002", x: "50%", y: "38%", color: "bg-sky-400", status: "Dikirim" },
  { id: "RPT-2024-003", x: "60%", y: "52%", color: "bg-blue-500", status: "Diverifikasi" },
  { id: "RPT-2024-004", x: "45%", y: "62%", color: "bg-emerald-400", status: "Selesai" },
  { id: "RPT-2024-005", x: "25%", y: "33%", color: "bg-emerald-400", status: "Selesai" },
  { id: "RPT-2024-006", x: "55%", y: "42%", color: "bg-amber-400", status: "Diproses" },
  { id: "RPT-2024-007", x: "42%", y: "70%", color: "bg-red-400", status: "Ditolak" },
  { id: "RPT-2024-008", x: "28%", y: "55%", color: "bg-amber-400", status: "Diproses" },
];

const legend = [
  { color: "bg-sky-400", label: "Dikirim" },
  { color: "bg-blue-500", label: "Diverifikasi" },
  { color: "bg-amber-400", label: "Diproses" },
  { color: "bg-emerald-400", label: "Selesai" },
  { color: "bg-red-400", label: "Ditolak" },
];

export default function CitizenMap() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);

  const selected = selectedReport ? reports.find(r => r.id === selectedReport) : null;

  return (
    <div className="bg-slate-50 h-full flex flex-col">
      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background map image */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop&auto=format"
          alt="Peta kota"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20" />

        {/* Filter button */}
        <div className="absolute top-3 left-3 right-3 flex gap-2">
          <div className="flex-1 bg-white rounded-xl shadow-md flex items-center gap-2 px-3 py-2">
            <LocationIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-slate-600">Kediri, Jawa Timur</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center">
            <FilterIcon className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Markers */}
        {markers.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedReport(m.id === selectedReport ? null : m.id);
              setShowList(false);
            }}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{ left: m.x, top: m.y }}
          >
            <div className={`flex flex-col items-center`}>
              <div className={`w-4 h-4 ${m.color} rounded-full border-2 border-white shadow-lg transition-transform ${selectedReport === m.id ? "scale-150" : "hover:scale-125"}`} />
              <div className={`w-0.5 h-2 ${m.color} opacity-60`} />
            </div>
          </button>
        ))}

        {/* Selected report popup */}
        {selected && (
          <div
            className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 ring-1 ring-slate-100"
            onClick={() => navigate(`/citizen/report/${selected.id}`)}
          >
            <div className="flex gap-3">
              {selected.photos.length > 0 && (
                <img src={selected.photos[0]} alt={selected.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <StatusBadge status={selected.status} size="sm" />
                <h3 className="font-semibold text-slate-900 text-sm mt-1 line-clamp-2">{selected.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{selected.location}</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-16 right-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-2.5">
          <div className="space-y-1.5">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 ${l.color} rounded-full`} />
                <span className="text-[10px] text-slate-600 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current location button */}
        <button className="absolute bottom-20 right-3 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center">
          <LocationIcon className="w-5 h-5 text-blue-600" />
        </button>

        {/* Show list button */}
        {!selectedReport && (
          <button
            onClick={() => setShowList(!showList)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold"
          >
            {showList ? "Tutup Daftar" : "Lihat Daftar Laporan"}
          </button>
        )}
      </div>

      {/* Bottom sheet */}
      {showList && (
        <div className="bg-white border-t border-slate-100 max-h-64 overflow-y-auto">
          <div className="sticky top-0 bg-white px-4 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Laporan Terdekat</h3>
              <span className="text-xs text-slate-400">{reports.length} laporan</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {reports.slice(0, 5).map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/citizen/report/${r.id}`)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left"
              >
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  r.status === "Selesai" ? "bg-emerald-400" :
                  r.status === "Ditolak" ? "bg-red-400" :
                  r.status === "Diproses" ? "bg-amber-400" :
                  r.status === "Diverifikasi" ? "bg-blue-500" : "bg-sky-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                  <p className="text-xs text-slate-400 truncate">{r.location}</p>
                </div>
                <StatusBadge status={r.status} size="sm" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
