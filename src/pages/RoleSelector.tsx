import { useNavigate } from "react-router";
import Logo from "../components/shared/Logo";
import { UserIcon, BuildingIcon, ShieldIcon, ServerIcon, SettingsIcon, ChevronRightIcon } from "../components/shared/Icons";

interface RoleCard {
  label: string;
  description: string;
  loginPath: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  ringColor: string;
  badge: string;
  badgeBg: string;
}

const roles: RoleCard[] = [
  {
    label: "Masyarakat",
    description: "Buat laporan, pantau pengaduan, dan berinteraksi dengan masyarakat.",
    loginPath: "/auth/citizen/login",
    Icon: UserIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    ringColor: "ring-blue-200",
    badge: "Warga",
    badgeBg: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  {
    label: "Admin Instansi",
    description: "Kelola dan tindak lanjuti laporan yang menjadi kewenangan instansi.",
    loginPath: "/auth/admin-instansi/login",
    Icon: BuildingIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    ringColor: "ring-emerald-200",
    badge: "PUPR · DLH · BPBD",
    badgeBg: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    label: "Super Admin",
    description: "Kelola pengguna, instansi, kategori, routing, dan sistem pengaduan.",
    loginPath: "/auth/super-admin/login",
    Icon: ShieldIcon,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-700",
    ringColor: "ring-violet-200",
    badge: "System Wide",
    badgeBg: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  {
    label: "Admin Server",
    description: "Kelola infrastruktur, server, monitoring, dan keamanan sistem.",
    loginPath: "/auth/admin-server/login",
    Icon: ServerIcon,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    ringColor: "ring-slate-200",
    badge: "Infrastructure",
    badgeBg: "bg-slate-100 text-slate-600 ring-slate-200",
  },
  {
    label: "Admin Sistem",
    description: "Kelola konfigurasi, pemeliharaan, dan kesehatan sistem.",
    loginPath: "/auth/admin-sistem/login",
    Icon: SettingsIcon,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-700",
    ringColor: "ring-teal-200",
    badge: "Technical",
    badgeBg: "bg-teal-50 text-teal-700 ring-teal-200",
  },
];

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-700 px-6 pt-10 pb-20">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-5">
            <Logo size="lg" inverted />
          </div>
          <h1 className="text-white font-bold text-xl leading-snug">Selamat Datang di AspiAKU</h1>
          <p className="text-blue-200 text-sm mt-2 leading-relaxed">
            Silakan pilih jenis akses untuk melanjutkan
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 px-4 -mt-10 pb-8 max-w-md mx-auto w-full">
        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.label}
              onClick={() => navigate(role.loginPath)}
              className="w-full bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-slate-300 transition-all duration-200 active:scale-[0.99] group"
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-12 h-12 rounded-xl ${role.iconBg} ring-1 ${role.ringColor} flex items-center justify-center shrink-0`}>
                  <role.Icon className={`w-6 h-6 ${role.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-900 font-semibold text-base">{role.label}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset ${role.badgeBg}`}>
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{role.description}</p>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-5 text-[11px] text-slate-400">
          {["Terenkripsi", "Data Aman", "Resmi Pemerintah"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          AspiAKU v1.0 · Pemerintah Kota Kediri · &copy; 2026
        </p>
      </div>
    </div>
  );
}
