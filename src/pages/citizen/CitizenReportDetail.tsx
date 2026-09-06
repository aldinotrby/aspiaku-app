import { useParams, useNavigate } from "react-router";
import { reports } from "../../lib/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import {
  ArrowLeftIcon, LocationIcon, HeartIcon, ShareIcon, BookmarkIcon,
  CheckCircleIcon, ClockIcon, CheckIcon, XCircleIcon,
} from "../../components/shared/Icons";
import { useState } from "react";
import type { ReportStatus } from "../../lib/types";

const comments = [
  { id: "1", user: "Anonim3847562910", avatar: "A", text: "Saya juga sudah laporkan ini bulan lalu. Semoga cepat ditangani!", time: "3 jam lalu", likes: 12 },
  { id: "2", user: "Anonim6192847305", avatar: "A", text: "Bahaya banget ini buat pengendara malam. Sudah ada korban juga.", time: "5 jam lalu", likes: 8 },
  { id: "3", user: "Anonim4728301956", avatar: "A", text: "Sudah menjadi masalah sejak 3 bulan lalu. Harap segera ditangani Dinas terkait.", time: "1 hari lalu", likes: 5 },
];

const statusIcons: Record<ReportStatus, React.ReactNode> = {
  Dikirim: <ClockIcon className="w-4 h-4 text-sky-500" />,
  Diverifikasi: <CheckIcon className="w-4 h-4 text-blue-600" />,
  Diproses: <ClockIcon className="w-4 h-4 text-amber-500" />,
  Selesai: <CheckCircleIcon className="w-4 h-4 text-emerald-500" />,
  Ditolak: <XCircleIcon className="w-4 h-4 text-red-500" />,
};

const statusOrder: ReportStatus[] = ["Dikirim", "Diverifikasi", "Diproses", "Selesai"];

export default function CitizenReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);

  const report = reports.find((r) => r.id === id) ?? reports[0];

  return (
    <div className="bg-slate-50 min-h-full pb-20">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </button>

      {/* Photo gallery */}
      {report.photos.length > 0 && (
        <div className="relative bg-slate-900">
          <img
            src={report.photos[activePhoto]}
            alt={report.title}
            className="w-full h-64 object-cover opacity-90"
          />
          {report.photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {report.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-6 h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-4 relative pt-5 px-4">
        {/* Status & ID */}
        <div className="flex items-center gap-2 mb-3">
          <StatusBadge status={report.status} />
          <span className="text-xs text-slate-400 font-mono">{report.id}</span>
          <span className="ml-auto text-xs text-slate-400">{report.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-slate-900 leading-tight">{report.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mt-2.5">
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-medium ring-1 ring-blue-200">
            {report.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full font-medium">
            {report.agency}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-3 p-3 bg-slate-50 rounded-xl">
          <LocationIcon className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-sm text-slate-700">{report.location}</span>
        </div>

        {/* Reporter */}
        <div className="flex items-center gap-3 mt-3 p-3 bg-slate-50 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-base shrink-0">
            {report.isAnonymous ? "🎭" : "👤"}
          </div>
          <div>
            <div className="text-xs text-slate-400">Dilaporkan oleh</div>
            <div className="text-sm font-semibold text-slate-800">
              {report.isAnonymous ? "Pelapor Anonim" : report.reporter}
            </div>
          </div>
          {report.isAnonymous && (
            <span className="ml-auto text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Anonim</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="font-bold text-slate-900 mb-2">Deskripsi</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{report.description}</p>
      </div>

      {/* Status Timeline */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="font-bold text-slate-900 mb-4">Timeline Status</h2>

        {/* Progress bar */}
        <div className="flex items-center gap-0 mb-6">
          {statusOrder.map((s, i) => {
            const idx = statusOrder.indexOf(report.status === "Ditolak" ? "Dikirim" : report.status);
            const done = i <= idx;
            const isLast = i === statusOrder.length - 1;
            return (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex flex-col items-center ${i > 0 ? "" : ""}`} style={{ flex: "0 0 auto" }}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${
                    done ? "bg-blue-700 shadow-md shadow-blue-200" : "bg-slate-200"
                  }`}>
                    {done ? <CheckIcon className="w-3.5 h-3.5" /> : <span className="text-slate-400">{i + 1}</span>}
                  </div>
                  <span className={`text-[9px] mt-1 font-semibold ${done ? "text-blue-700" : "text-slate-400"}`}>{s}</span>
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < idx ? "bg-blue-700" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline items */}
        <div className="space-y-4">
          {report.timeline.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 ring-2 ring-blue-100 flex items-center justify-center shrink-0">
                  {statusIcons[item.status]}
                </div>
                {i < report.timeline.length - 1 && <div className="w-0.5 flex-1 bg-blue-100 mt-1" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} size="sm" />
                </div>
                <p className="text-sm text-slate-700 mt-1">{item.description}</p>
                {item.actor && <p className="text-xs text-slate-400 mt-0.5">oleh {item.actor}</p>}
                <p className="text-xs text-slate-400 mt-1">{item.date} · {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Response */}
      {report.governmentResponse && (
        <div className="bg-white mt-2 px-4 py-4">
          <h2 className="font-bold text-slate-900 mb-3">Tanggapan Pemerintah</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                <CheckIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-700">{report.agency}</span>
              <span className="ml-auto text-xs text-slate-400">{report.responseDate}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{report.governmentResponse}</p>
          </div>
        </div>
      )}

      {/* Resolution Evidence */}
      {report.resolutionEvidence && (
        <div className="bg-white mt-2 px-4 py-4">
          <h2 className="font-bold text-slate-900 mb-3">Bukti Penyelesaian</h2>
          <img
            src={report.resolutionEvidence}
            alt="Bukti penyelesaian"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Comments */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="font-bold text-slate-900 mb-3">Komentar ({report.commentCount})</h2>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-800">{c.user}</span>
                  <span className="text-[10px] text-slate-400 ml-auto">{c.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500">
                    <HeartIcon className="w-3 h-3" /> {c.likes}
                  </button>
                  <button className="text-xs text-slate-400 hover:text-blue-600">Balas</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">B</div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Tulis komentar..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-800">
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-slate-100 p-4 flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-sm font-semibold">
          <HeartIcon className="w-4 h-4" />
          {report.supportCount}
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-semibold">
          <ShareIcon className="w-4 h-4" />
          Bagikan
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-semibold">
          <BookmarkIcon className="w-4 h-4" />
          Simpan
        </button>
      </div>
    </div>
  );
}
