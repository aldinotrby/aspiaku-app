import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, EyeIcon, XCircleIcon, CheckCircleIcon, BuildingIcon, ShieldIcon, ServerIcon, SettingsIcon } from "../../components/shared/Icons";

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

type Role = "admin-instansi" | "super-admin" | "admin-server" | "admin-sistem";

interface RoleConfig {
  title: string;
  subtitle: string;
  dashboardPath: string;
  Icon: React.ComponentType<{ className?: string }>;
  accentBg: string;
  accentText: string;
  accentRing: string;
  badge: string;
  demoUser: string;
}

const roleConfig: Record<Role, RoleConfig> = {
  "admin-instansi": {
    title: "Login Admin Instansi",
    subtitle: "Masuk ke panel pengelolaan laporan instansi.",
    dashboardPath: "/admin/dashboard",
    Icon: BuildingIcon,
    accentBg: "bg-emerald-700",
    accentText: "text-emerald-700",
    accentRing: "ring-emerald-200",
    badge: "Portal Instansi",
    demoUser: "admin@pupr.go.id",
  },
  "super-admin": {
    title: "Login Super Admin",
    subtitle: "Masuk ke panel administrasi AspiAKU.",
    dashboardPath: "/super-admin/dashboard",
    Icon: ShieldIcon,
    accentBg: "bg-violet-700",
    accentText: "text-violet-700",
    accentRing: "ring-violet-200",
    badge: "Portal Super Admin",
    demoUser: "superadmin@aspiaku.go.id",
  },
  "admin-server": {
    title: "Login Admin Server",
    subtitle: "Masuk ke panel pengelolaan infrastruktur AspiAKU.",
    dashboardPath: "/admin-server/dashboard",
    Icon: ServerIcon,
    accentBg: "bg-slate-700",
    accentText: "text-slate-700",
    accentRing: "ring-slate-200",
    badge: "Portal Server",
    demoUser: "server@aspiaku.go.id",
  },
  "admin-sistem": {
    title: "Login Admin Sistem",
    subtitle: "Masuk ke panel pengelolaan sistem AspiAKU.",
    dashboardPath: "/admin-sistem/dashboard",
    Icon: SettingsIcon,
    accentBg: "bg-teal-700",
    accentText: "text-teal-700",
    accentRing: "ring-teal-200",
    badge: "Portal Sistem",
    demoUser: "sistem@aspiaku.go.id",
  },
};

type FormState = "idle" | "loading" | "error" | "success";

export default function AdminLogin() {
  const { role } = useParams<{ role: Role }>();
  const navigate = useNavigate();
  const cfg = roleConfig[(role as Role) ?? "admin-instansi"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  const handleLogin = () => {
    if (!username || !password) {
      setFormState("error");
      return;
    }
    setFormState("loading");
    setTimeout(() => {
      if (password === "admin123") {
        setFormState("success");
        setTimeout(() => navigate(cfg.dashboardPath), 900);
      } else {
        setFormState("error");
      }
    }, 1100);
  };

  return (
    <div className="min-h-full bg-slate-100 flex">
      {/* Left panel — branding (desktop) */}
      <div className={`hidden lg:flex flex-col ${cfg.accentBg} w-80 shrink-0 p-10`}>
        <Logo size="md" inverted />
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
              <cfg.Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium">Portal</p>
              <p className="text-white font-bold">{cfg.badge}</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {cfg.subtitle}
          </p>
          <div className="mt-8 space-y-3">
            {["Akses aman & terenkripsi", "Sesi otomatis berakhir", "Aktivitas tercatat di audit log"].map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-white/70 text-xs">
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-xs mt-10">AspiAKU &copy; 2026</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 min-h-full">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="md" />
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Pilih Akses Lain
          </button>

          {/* Role badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 ring-inset ${cfg.accentRing} bg-white mb-4`}>
            <cfg.Icon className={`w-3.5 h-3.5 ${cfg.accentText}`} />
            <span className={`text-xs font-bold ${cfg.accentText}`}>{cfg.badge}</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 leading-tight">{cfg.title}</h1>
          <p className="text-slate-400 text-sm mt-1.5">{cfg.subtitle}</p>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 mt-6 space-y-4">
            {/* Success */}
            {formState === "success" && (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                  <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="font-bold text-slate-900">Berhasil Masuk!</p>
                <p className="text-slate-400 text-sm mt-1">Mengarahkan ke dashboard...</p>
              </div>
            )}

            {formState !== "success" && (
              <>
                {/* Error alert */}
                {formState === "error" && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <XCircleIcon className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">
                      {!username || !password
                        ? "Username/email dan password wajib diisi."
                        : "Username atau password tidak sesuai. Silakan coba lagi."}
                    </p>
                  </div>
                )}

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username atau Email</label>
                  <input
                    type="text"
                    placeholder={cfg.demoUser}
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setFormState("idle"); }}
                    className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      formState === "error" ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Lupa Password?</button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setFormState("idle"); }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className={`w-full bg-slate-50 border rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        formState === "error" ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleLogin}
                  disabled={formState === "loading"}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    formState === "loading"
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-sm shadow-blue-200"
                  }`}
                >
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Memproses...
                    </>
                  ) : "Masuk"}
                </button>

                <p className="text-center text-[11px] text-slate-400 pt-1">
                  Demo: gunakan password <span className="font-mono font-bold">admin123</span>
                </p>
              </>
            )}
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6">
            AspiAKU &copy; 2026 · Akun dibuat oleh administrator yang berwenang
          </p>
        </div>
      </div>
    </div>
  );
}
