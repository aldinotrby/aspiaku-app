import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, EyeIcon, CheckCircleIcon, XCircleIcon } from "../../components/shared/Icons";

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function getStrength(pw: string) {
  if (!pw) return { level: 0, label: "", color: "" };
  const strong = pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
  const medium = pw.length >= 8 && (/[A-Z]/.test(pw) || /[0-9]/.test(pw));
  if (strong) return { level: 3, label: "Kuat", color: "bg-emerald-500" };
  if (medium) return { level: 2, label: "Sedang", color: "bg-amber-400" };
  return { level: 1, label: "Lemah", color: "bg-red-400" };
}

export default function CitizenResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; konfirmasi?: string }>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const strength = getStrength(password);

  const handleSave = () => {
    const e: typeof errors = {};
    if (!password) e.password = "Password baru wajib diisi.";
    else if (strength.level < 2) e.password = "Password terlalu lemah.";
    if (!konfirmasi) e.konfirmasi = "Konfirmasi password wajib diisi.";
    else if (password !== konfirmasi) e.konfirmasi = "Password tidak cocok.";
    if (Object.keys(e).length) { setErrors(e); return; }
    setState("loading");
    setTimeout(() => setState("success"), 1200);
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col max-w-[430px] mx-auto">
      {/* Header */}
      <div className="bg-blue-700 px-5 pt-5 pb-20">
        <button onClick={() => navigate("/auth/citizen/forgot-password")} className="p-1.5 -ml-1 text-white/70 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="mt-6">
          <Logo size="md" inverted />
          <h1 className="text-white font-bold text-2xl mt-5 leading-tight">Buat Password Baru</h1>
          <p className="text-blue-200 text-sm mt-1.5">Buat password baru yang kuat untuk akun Anda.</p>
        </div>
      </div>

      {/* Card */}
      <div className="px-4 -mt-8 pb-8">
        <div className="bg-white rounded-3xl shadow-lg ring-1 ring-slate-100 p-6">
          {state === "success" ? (
            <div className="flex flex-col items-center py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-9 h-9 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Password Berhasil Diperbarui!</p>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                  Gunakan password baru Anda untuk masuk ke AspiAKU.
                </p>
              </div>
              <button
                onClick={() => navigate("/auth/citizen/login")}
                className="w-full bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 active:scale-[0.98] shadow-sm shadow-blue-200"
              >
                Masuk Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Password baru */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password Baru</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(v => ({ ...v, password: undefined })); }}
                    className={`w-full bg-slate-50 border rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.password ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPw ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength.level ? strength.color : "bg-slate-100"}`} />
                      ))}
                    </div>
                    <p className={`text-[11px] font-semibold ${strength.level === 3 ? "text-emerald-600" : strength.level === 2 ? "text-amber-600" : "text-red-500"}`}>
                      Kekuatan password: {strength.label}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                    <XCircleIcon className="w-3.5 h-3.5 shrink-0" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Konfirmasi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <input
                    type={showKonfirmasi ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    value={konfirmasi}
                    onChange={(e) => { setKonfirmasi(e.target.value); setErrors(v => ({ ...v, konfirmasi: undefined })); }}
                    className={`w-full bg-slate-50 border rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.konfirmasi ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                  <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showKonfirmasi ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {errors.konfirmasi && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                    <XCircleIcon className="w-3.5 h-3.5 shrink-0" /> {errors.konfirmasi}
                  </p>
                )}
              </div>

              <button
                onClick={handleSave}
                disabled={state === "loading"}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  state === "loading"
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-blue-200"
                }`}
              >
                {state === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </>
                ) : "Simpan Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
