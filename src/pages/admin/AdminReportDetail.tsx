import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { reports } from "../../lib/mockData";
import { StatusBadge, PriorityBadge } from "../../components/shared/StatusBadge";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, LocationIcon, CheckIcon } from "../../components/shared/Icons";

export default function AdminReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reports.find((r) => r.id === id) ?? reports[0];
  const [activeTab, setActiveTab] = useState<"detail" | "verify" | "process" | "respond" | "complete">("detail");
  const [responseText, setResponseText] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [verifyChecks, setVerifyChecks] = useState<Record<string, boolean>>({});
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const verifyItems = [
    "Data laporan lengkap dan jelas",
    "Foto valid dan relevan",
    "Lokasi teridentifikasi dengan benar",
    "Kategori sesuai dengan permasalahan",
    "Laporan sesuai kewenangan instansi ini",
  ];

  const tabs = [
    { key: "detail", label: "Detail Laporan" },
    { key: "verify", label: "Verifikasi" },
    { key: "process", label: "Proses" },
    { key: "respond", label: "Tanggapan" },
    { key: "complete", label: "Selesaikan" },
  ] as const;

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/admin/reports")} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{report.title}</h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{report.id}</span>
            <StatusBadge status={report.status} />
            <PriorityBadge priority={report.priority} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-none px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Detail tab */}
      {activeTab === "detail" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Photos */}
            {report.photos.length > 0 && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-100">
                <img src={report.photos[0]} alt={report.title} className="w-full h-64 object-cover" />
                {report.photos.length > 1 && (
                  <div className="flex gap-2 p-3">
                    {report.photos.slice(1).map((p, i) => (
                      <img key={i} src={p} alt="" className="w-16 h-16 object-cover rounded-xl" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-bold text-slate-800 mb-3">Deskripsi</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{report.description}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Timeline</h3>
              <div className="space-y-3">
                {report.timeline.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-slate-700">{item.description}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.date} · {item.time}{item.actor ? ` · ${item.actor}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal notes */}
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-bold text-slate-800 mb-3">Catatan Internal</h3>
              <textarea
                value={internalNote || report.internalNotes || ""}
                onChange={(e) => setInternalNote(e.target.value)}
                rows={3}
                placeholder="Tambahkan catatan internal (tidak terlihat oleh pelapor)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button className="mt-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg">Simpan Catatan</button>
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100 space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Informasi Laporan</h3>
              {[
                { label: "Kategori", value: report.category },
                { label: "Instansi", value: report.agency },
                { label: "Tanggal", value: report.date },
                { label: "Pelapor", value: report.isAnonymous ? "Anonim" : report.reporter },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-2">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-xs font-semibold text-slate-700 text-right">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Lokasi</h3>
              <div className="h-28 bg-slate-100 rounded-xl overflow-hidden relative mb-2">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop" alt="map" className="w-full h-full object-cover opacity-70" />
              </div>
              <div className="flex items-start gap-2">
                <LocationIcon className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600">{report.location}</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Tindakan Cepat</h3>
              <button onClick={() => setActiveTab("verify")} className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800">
                <CheckIcon className="w-4 h-4" /> Verifikasi Laporan
              </button>
              <button onClick={() => setShowRejectForm(true)} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100">
                <XCircleIcon className="w-4 h-4" /> Tolak Laporan
              </button>
              <button onClick={() => setActiveTab("respond")} className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 border border-slate-200 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-100">
                Beri Tanggapan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify tab */}
      {activeTab === "verify" && (
        <div className="max-w-xl space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Checklist Verifikasi</h3>
            <div className="space-y-3">
              {verifyItems.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifyChecks[item] || false}
                    onChange={(e) => setVerifyChecks(c => ({ ...c, [item]: e.target.checked }))}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{item}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-4 h-4" /> Verifikasi
              </button>
              <button
                onClick={() => setShowRejectForm(!showRejectForm)}
                className="flex-1 bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl text-sm font-bold hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <XCircleIcon className="w-4 h-4" /> Tolak
              </button>
            </div>

            {showRejectForm && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Alasan Penolakan <span className="text-red-500">*</span></label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan alasan penolakan laporan ini..."
                  className="w-full border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                />
                <button className="mt-2 w-full bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700">
                  Konfirmasi Penolakan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Respond tab */}
      {activeTab === "respond" && (
        <div className="max-w-xl space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Tanggapan Pemerintah</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jenis Tanggapan</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Konfirmasi Penerimaan</option>
                  <option>Update Progress</option>
                  <option>Tanggapan Final</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Tanggapan</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={5}
                  placeholder="Tulis tanggapan resmi pemerintah kepada pelapor..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800">
                Kirim Tanggapan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete tab */}
      {activeTab === "complete" && (
        <div className="max-w-xl space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Form Penyelesaian</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Penyelesaian</label>
                <textarea rows={3} placeholder="Jelaskan tindakan yang telah dilakukan..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Foto Sebelum</label>
                  <div className="h-28 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium cursor-pointer hover:border-blue-400">
                    + Upload Foto
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Foto Sesudah</label>
                  <div className="h-28 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium cursor-pointer hover:border-blue-400">
                    + Upload Foto
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tanggal Penyelesaian</label>
                <input type="date" defaultValue="2024-12-19" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-5 h-5" /> Tandai Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
