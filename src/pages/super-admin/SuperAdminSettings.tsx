import { useState } from "react";

const sections = [
  {
    id: "general",
    label: "Pengaturan Umum",
    icon: "⚙️",
    fields: [
      { label: "Nama Aplikasi", value: "AspiAKU", type: "text" },
      { label: "Tagline", value: "Platform Pengaduan Masyarakat Berbasis Digital", type: "text" },
      { label: "Pemerintah Daerah", value: "Kota Kediri", type: "text" },
      { label: "Tahun Aktif", value: "2024", type: "text" },
    ],
  },
  {
    id: "report",
    label: "Konfigurasi Laporan",
    icon: "📋",
    fields: [
      { label: "Maks. Foto per Laporan", value: "5", type: "number" },
      { label: "Maks. Ukuran Foto (MB)", value: "10", type: "number" },
      { label: "SLA Verifikasi (jam)", value: "24", type: "number" },
      { label: "SLA Penanganan (hari)", value: "14", type: "number" },
    ],
  },
  {
    id: "notification",
    label: "Notifikasi",
    icon: "🔔",
    toggles: [
      { label: "Email Notifikasi", sub: "Kirim notifikasi via email", enabled: true },
      { label: "SMS Notifikasi", sub: "Kirim OTP dan update via SMS", enabled: true },
      { label: "Push Notifikasi", sub: "Notifikasi push browser", enabled: false },
    ],
  },
  {
    id: "security",
    label: "Keamanan",
    icon: "🔒",
    toggles: [
      { label: "2FA Wajib Admin", sub: "Wajibkan 2FA untuk semua admin", enabled: true },
      { label: "Auto Logout", sub: "Logout otomatis setelah 30 menit tidak aktif", enabled: true },
      { label: "Captcha Login", sub: "Tampilkan captcha di halaman login", enabled: false },
    ],
  },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-all ${enabled ? "bg-blue-700" : "bg-slate-200"}`}
    >
      <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform mx-0.5 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function SuperAdminSettings() {
  const [activeSection, setActiveSection] = useState("general");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Email Notifikasi": true,
    "SMS Notifikasi": true,
    "Push Notifikasi": false,
    "2FA Wajib Admin": true,
    "Auto Logout": true,
    "Captcha Login": false,
  });

  const current = sections.find(s => s.id === activeSection);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Sistem</h1>
        <p className="text-slate-400 text-sm mt-0.5">Konfigurasi umum dan pengaturan aplikasi AspiAKU</p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar navigation */}
        <div className="w-52 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-slate-100 last:border-0 transition-colors ${
                  activeSection === s.id ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="text-sm font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {current && (
          <div className="flex-1 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6 space-y-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <span>{current.icon}</span> {current.label}
            </h2>

            {current.fields && (
              <div className="space-y-4">
                {current.fields.map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.value}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>
                ))}
              </div>
            )}

            {current.toggles && (
              <div className="space-y-4">
                {current.toggles.map((t) => (
                  <div key={t.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{t.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>
                    </div>
                    <Toggle
                      enabled={toggles[t.label]}
                      onChange={() => setToggles(prev => ({ ...prev, [t.label]: !prev[t.label] }))}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button className="px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800">
                Simpan Perubahan
              </button>
              <button className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200">
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
