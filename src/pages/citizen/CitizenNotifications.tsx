import { useState } from "react";
import { useNavigate } from "react-router";
import { notifications } from "../../lib/mockData";
import { CheckIcon } from "../../components/shared/Icons";

const typeConfig = {
  received: { emoji: "📨", bg: "bg-sky-50", border: "border-sky-100", dot: "bg-sky-500" },
  verified: { emoji: "✅", bg: "bg-blue-50", border: "border-blue-100", dot: "bg-blue-500" },
  processing: { emoji: "⚙️", bg: "bg-amber-50", border: "border-amber-100", dot: "bg-amber-500" },
  response: { emoji: "💬", bg: "bg-violet-50", border: "border-violet-100", dot: "bg-violet-500" },
  completed: { emoji: "🎉", bg: "bg-emerald-50", border: "border-emerald-100", dot: "bg-emerald-500" },
  rejected: { emoji: "❌", bg: "bg-red-50", border: "border-red-100", dot: "bg-red-500" },
};

export default function CitizenNotifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="bg-slate-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Notifikasi</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-slate-400 mt-0.5">{unreadCount} notifikasi belum dibaca</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <CheckIcon className="w-3.5 h-3.5" />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-5xl mb-4">🔔</div>
          <p className="font-semibold text-slate-700">Tidak ada notifikasi</p>
          <p className="text-slate-400 text-sm mt-1">Anda akan mendapat notifikasi saat laporan diperbarui</p>
        </div>
      ) : (
        <div className="py-2">
          {notifs.map((notif) => {
            const cfg = typeConfig[notif.type];
            return (
              <button
                key={notif.id}
                onClick={() => {
                  markRead(notif.id);
                  navigate(`/citizen/report/${notif.reportId}`);
                }}
                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${
                  !notif.isRead ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 ${cfg.bg} border ${cfg.border} rounded-full flex items-center justify-center text-lg shrink-0`}>
                  {cfg.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-snug ${!notif.isRead ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                      {notif.title}
                    </p>
                    {!notif.isRead && (
                      <div className={`w-2 h-2 ${cfg.dot} rounded-full shrink-0 mt-1`} />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{notif.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5">{notif.timestamp}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
