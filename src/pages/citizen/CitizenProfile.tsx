import { useNavigate } from "react-router";
import { users } from "../../lib/mockData";
import { ChevronRightIcon, LogoutIcon, EditIcon } from "../../components/shared/Icons";

const me = users[0];

const menuItems = [
  { group: "Akun", items: [
    { icon: "✏️", label: "Edit Profil", action: "edit" },
    { icon: "📱", label: "Ubah Nomor HP", action: "phone" },
    { icon: "🔒", label: "Ubah Password", action: "password" },
  ]},
  { group: "Laporan", items: [
    { icon: "📋", label: "Laporan Saya", action: "reports" },
    { icon: "🔖", label: "Laporan Tersimpan", action: "saved" },
  ]},
  { group: "Pengaturan", items: [
    { icon: "🔔", label: "Notifikasi", action: "notifications" },
    { icon: "🛡️", label: "Privasi", action: "privacy" },
    { icon: "❓", label: "Bantuan & FAQ", action: "help" },
    { icon: "📄", label: "Syarat & Ketentuan", action: "terms" },
  ]},
];

export default function CitizenProfile() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-full pb-6">
      {/* Profile header */}
      <div className="bg-white px-4 pt-4 pb-6 text-center">
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-md">
            B
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center shadow-sm">
            <EditIcon className="w-3 h-3 text-white" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-900">{me.name}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{me.phone}</p>

        {/* Verification badge */}
        {me.isVerified && (
          <span className="inline-flex items-center gap-1 mt-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold ring-1 ring-emerald-200">
            <span>✓</span> Terverifikasi
          </span>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{me.totalReports}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Total Laporan</div>
          </div>
          <div className="text-center border-x border-slate-100">
            <div className="text-2xl font-bold text-emerald-600">{me.completedReports}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {(me.totalReports ?? 0) - (me.completedReports ?? 0) - 1}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Aktif</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-4 space-y-4 px-4">
        {menuItems.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{group.group}</p>
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
              {group.items.map((item, i) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left ${
                    i < group.items.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 bg-red-50 border border-red-100 text-red-600 py-3.5 rounded-2xl font-semibold text-sm hover:bg-red-100 transition-colors"
        >
          <LogoutIcon className="w-4 h-4" />
          Keluar dari Akun
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-2">AspiAKU v1.0.0 · 2026</p>
      </div>
    </div>
  );
}
