import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from "../../components/shared/Icons";

type OTPState = "idle" | "error" | "expired" | "success" | "resent";

const COUNTDOWN_START = 60;

export default function CitizenOTP() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [state, setState] = useState<OTPState>("idle");
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Derive canResend from countdown instead of using state
  const canResend = useMemo(() => countdown === 0, [countdown]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleDigit = (i: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setState("idle");
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
    if (!v && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length < 6) return;
    if (code === "123456") {
      setState("success");
      setTimeout(() => navigate("/citizen/home"), 1200);
    } else {
      setState("error");
      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(COUNTDOWN_START);
    setDigits(["", "", "", "", "", ""]);
    setState("resent");
    inputRefs.current[0]?.focus();
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const isComplete = digits.every(Boolean);

  return (
    <div className="min-h-full bg-slate-50 flex flex-col max-w-[430px] mx-auto">
      {/* Header */}
      <div className="bg-blue-700 px-5 pt-5 pb-20">
        <button onClick={() => navigate("/auth/citizen/register")} className="p-1.5 -ml-1 text-white/70 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="mt-6">
          <Logo size="md" inverted />
          <h1 className="text-white font-bold text-2xl mt-5 leading-tight">Verifikasi Nomor HP</h1>
          <p className="text-blue-200 text-sm mt-1.5">Masukkan kode OTP yang dikirim ke nomor HP Anda.</p>
        </div>
      </div>

      {/* Card */}
      <div className="px-4 -mt-8 pb-8">
        <div className="bg-white rounded-3xl shadow-lg ring-1 ring-slate-100 p-6">
          {/* Success */}
          {state === "success" && (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-9 h-9 text-emerald-500" />
              </div>
              <p className="font-bold text-slate-900 text-lg">Verifikasi Berhasil!</p>
              <p className="text-slate-400 text-sm mt-1">Berhasil. Anda akan diarahkan ke halaman utama.</p>
            </div>
          )}

          {state !== "success" && (
            <div className="space-y-5">
              {/* Phone hint */}
              <div className="text-center">
                <p className="text-slate-500 text-sm">Kode dikirim ke</p>
                <p className="font-bold text-slate-900 mt-0.5">+62 8xx-xxxx-xxxx</p>
              </div>

              {/* State alerts */}
              {state === "error" && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <XCircleIcon className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">Kode OTP tidak valid. Periksa kembali dan coba lagi.</p>
                </div>
              )}
              {state === "expired" && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <XCircleIcon className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">Kode OTP sudah kedaluwarsa. Silakan kirim ulang.</p>
                </div>
              )}
              {state === "resent" && (
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <CheckCircleIcon className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">Kode OTP baru telah dikirim ke nomor Anda.</p>
                </div>
              )}

              {/* OTP inputs */}
              <div className="flex gap-2 justify-center">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all ${
                      d
                        ? state === "error"
                          ? "border-red-400 bg-red-50 text-red-700"
                          : "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-400 focus:bg-white"
                    }`}
                  />
                ))}
              </div>

              {/* Countdown */}
              <div className="text-center">
                {canResend ? (
                  <button onClick={handleResend} className="text-sm font-bold text-blue-700 hover:text-blue-800">
                    Kirim Ulang Kode OTP
                  </button>
                ) : (
                  <p className="text-sm text-slate-400">
                    Kirim ulang dalam{" "}
                    <span className="font-mono font-semibold text-slate-700">
                      {pad(Math.floor(countdown / 60))}:{pad(countdown % 60)}
                    </span>
                  </p>
                )}
              </div>

              {/* Verify button */}
              <button
                onClick={handleVerify}
                disabled={!isComplete}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                  isComplete
                    ? "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-sm shadow-blue-200"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Verifikasi
              </button>

              {/* Change phone */}
              <p className="text-center">
                <Link to="/auth/citizen/register" className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline underline-offset-2">
                  Ubah Nomor HP
                </Link>
              </p>

              <p className="text-center text-[11px] text-slate-400">Demo: gunakan kode <span className="font-mono font-bold">123456</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
