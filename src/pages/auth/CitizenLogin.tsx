import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, EyeIcon, XCircleIcon, CheckCircleIcon } from "../../components/shared/Icons";

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

type FormState = "idle" | "loading" | "error" | "success";

export default function CitizenLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    if (!phone || !password) {
      setFormState("error");
      setErrorMsg("Nomor HP dan password wajib diisi.");
      return;
    }
    setFormState("loading");
    setTimeout(() => {
      if (phone === "081234567890" && password === "password") {
        setFormState("success");
        setTimeout(() => navigate("/citizen/home"), 1000);
      } else {
        setFormState("error");
        setErrorMsg("Nomor HP atau password tidak sesuai.");
      }
    }, 1200);
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col max-w-[430px] mx-auto">
      {/* Blue header */}
      <div className="bg-blue-700 px-5 pt-5 pb-20">
        <button onClick={() => navigate("/")} className="p-1.5 -ml-1 text-white/70 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="mt-6">
          <Logo size="md" inverted />
          <h1 className="text-white font-bold text-2xl mt-5 leading-tight">Selamat Datang Kembali</h1>
          <p className="text-blue-200 text-sm mt-1.5">Masuk untuk melanjutkan ke AspiAKU</p>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 px-4 -mt-8">
        <div className="bg-white rounded-3xl shadow-lg ring-1 ring-slate-100 p-6">
          {/* Success state */}
          {formState === "success" && (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-9 h-9 text-emerald-500" />
              </div>
              <p className="font-bold text-slate-900">Berhasil Masuk!</p>
              <p className="text-slate-400 text-sm mt-1">Anda akan diarahkan ke halaman utama...</p>
            </div>
          )}

          {formState !== "success" && (
            <div className="space-y-4">
              {/* Error alert */}
              {formState === "error" && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <XCircleIcon className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}

              {/* Nomor HP */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor HP</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">+62</span>
                  <input
                    type="tel"
                    placeholder="8xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setFormState("idle"); }}
                    className={`w-full bg-slate-50 border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      formState === "error" ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link to="/auth/citizen/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFormState("idle"); }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className={`w-full bg-slate-50 border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
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
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2 ${
                  formState === "loading"
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-blue-200"
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

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-400">atau</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-slate-500">
                Belum punya akun?{" "}
                <Link to="/auth/citizen/register" className="font-bold text-blue-700 hover:text-blue-800">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Demo hint */}
        <p className="text-center text-[11px] text-slate-400 mt-5 px-4">
          Demo: nomor <span className="font-mono">081234567890</span> · password <span className="font-mono">password</span>
        </p>
      </div>

      <div className="py-6 text-center">
        <p className="text-[11px] text-slate-400">AspiAKU &copy; 2026 · Pemerintah Kota Kediri</p>
      </div>
    </div>
  );
}
