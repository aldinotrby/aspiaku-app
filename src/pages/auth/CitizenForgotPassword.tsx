import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from "../../components/shared/Icons";

type FormState = "idle" | "loading" | "success" | "error";

export default function CitizenForgotPassword() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!value.trim()) {
      setState("error");
      setError("Nomor HP atau email wajib diisi.");
      return;
    }
    const isPhone = /^08\d{8,11}$/.test(value);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isPhone && !isEmail) {
      setState("error");
      setError("Masukkan nomor HP yang valid (cth. 08123456789) atau alamat email yang valid.");
      return;
    }
    setState("loading");
    setTimeout(() => setState("success"), 1200);
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col max-w-[430px] mx-auto">
      {/* Header */}
      <div className="bg-blue-700 px-5 pt-5 pb-20">
        <button onClick={() => navigate("/auth/citizen/login")} className="p-1.5 -ml-1 text-white/70 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="mt-6">
          <Logo size="md" inverted />
          <h1 className="text-white font-bold text-2xl mt-5 leading-tight">Lupa Password?</h1>
          <p className="text-blue-200 text-sm mt-1.5">
            Masukkan nomor HP atau email yang terdaftar untuk mendapatkan kode verifikasi.
          </p>
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
                <p className="font-bold text-slate-900 text-lg">Kode Terkirim!</p>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                  Kode verifikasi telah dikirim ke <span className="font-semibold text-slate-700">{value}</span>. Periksa pesan masuk Anda.
                </p>
              </div>
              <button
                onClick={() => navigate("/auth/citizen/otp")}
                className="w-full bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 active:scale-[0.98] shadow-sm shadow-blue-200"
              >
                Masukkan Kode OTP
              </button>
              <button
                onClick={() => { setState("idle"); setValue(""); }}
                className="text-sm text-slate-500 hover:text-slate-700 font-medium"
              >
                Coba dengan kontak lain
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state === "error" && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <XCircleIcon className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor HP atau Email</label>
                <input
                  type="text"
                  placeholder="cth. 081234567890 atau nama@email.com"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setState("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    state === "error" ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                  }`}
                />
              </div>

              <button
                onClick={handleSend}
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
                ) : "Kirim Kode Verifikasi"}
              </button>

              <p className="text-center">
                <Link to="/auth/citizen/login" className="text-sm font-semibold text-slate-500 hover:text-blue-600">
                  ← Kembali ke Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
