import { useState } from "react";
import { useNavigate } from "react-router";
import { reports } from "../../lib/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ChevronRightIcon, ClockIcon } from "../../components/shared/Icons";
import type { ReportStatus } from "../../lib/types";

const tabs: { label: string; value: ReportStatus | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Dikirim", value: "Dikirim" },
  { label: "Diverifikasi", value: "Diverifikasi" },
  { label: "Diproses", value: "Diproses" },
  { label: "Selesai", value: "Selesai" },
  { label: "Ditolak", value: "Ditolak" },
];

const myReports = reports.filter((r) => !r.isAnonymous && (r.reporter === "Budi Santoso" || true)).slice(0, 6);

export default function CitizenMyReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ReportStatus | "all">("all");

  const filtered = myReports.filter((r) => activeTab === "all" || r.status === activeTab);

  return (
    <div className="bg-slate-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-0">
        <h1 className="text-lg font-bold text-slate-900">Laporan Saya</h1>
        <p className="text-sm text-slate-400 mt-0.5">Pantau status laporan yang telah Anda buat</p>

        {/* Tabs */}
        <div className="flex gap-1 mt-3 overflow-x-auto pb-0" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => {
            const count = myReports.filter((r) => tab.value === "all" || r.status === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-none px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === tab.value
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.value ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reports list */}
      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-semibold text-slate-700">Belum ada laporan</p>
            <p className="text-slate-400 text-sm mt-1">Laporan dengan status ini tidak ditemukan</p>
          </div>
        ) : (
          filtered.map((report) => (
            <button
              key={report.id}
              onClick={() => navigate(`/citizen/report/${report.id}`)}
              className="w-full bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-4 text-left hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                {report.photos.length > 0 && (
                  <img
                    src={report.photos[0]}
                    alt={report.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={report.status} size="sm" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">{report.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-slate-400 font-mono">{report.id}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] text-slate-400">{report.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">{report.agency}</span>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
              </div>

              {/* Latest update */}
              {report.timeline.length > 0 && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500 truncate">
                    {report.timeline[report.timeline.length - 1].description}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-auto">
                    {report.timeline[report.timeline.length - 1].date}
                  </span>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
