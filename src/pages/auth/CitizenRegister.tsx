import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Logo from "../../components/shared/Logo";
import { ArrowLeftIcon, EyeIcon, XCircleIcon, CheckIcon } from "../../components/shared/Icons";

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function getPasswordStrength(pw: string): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pw) return { level: 0, label: "", color: "" };
  const strong = pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
  const medium = pw.length >= 8 && (/[A-Z]/.test(pw) || /[0-9]/.test(pw));
  if (strong) return { level: 3, label: "Kuat", color: "bg-emerald-500" };
  if (medium) return { level: 2, label: "Sedang", color: "bg-amber-400" };
  return { level: 1, label: "Lemah", color: "bg-red-400" };
}

interface FieldError {
  nama?: string;
  phone?: string;
  email?: string;
  password?: string;
  konfirmasi?: string;
  terms?: string;
}

// Move Field component outside of the main component
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
          <XCircleIcon className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

// Move inputClass function outside of the main component
function getInputClass(hasErr?: string): string {
  return `w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
    hasErr ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
  }`;
}

export default function CitizenRegister() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const validate = (): boolean => {
    const e: FieldError = {};
    if (!nama.trim()) e.nama = "Nama lengkap wajib diisi.";
    if (!phone.trim()) e.phone = "Nomor HP wajib diisi.";
    else if (!/^08\d{8,11}$/.test(phone)) e.phone = "Format nomor HP tidak valid. Contoh: 08123456789";
    if (!email.trim()) e.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Format email tidak valid.";
    if (!password) e.password = "Password wajib diisi.";
    else if (strength.level < 2) e.password = "Password terlalu lemah. Gunakan minimal 8 karakter dengan huruf kapital dan angka.";
    if (!konfirmasi) e.konfirmasi = "Konfirmasi password wajib diisi.";
    else if (password !== konfirmasi) e.konfirmasi = "Password tidak cocok.";
    if (!terms) e.terms = "Anda harus menyetujui syarat dan ketentuan.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/citizen/otp");
    }, 1200);
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
          <h1 className="text-white font-bold text-2xl mt-5 leading-tight">Buat Akun AspiAKU</h1>
          <p className="text-blue-200 text-sm mt-1.5">Daftarkan akun untuk membuat dan memantau laporan.</p>
        </div>
      </div>

      {/* Form card */}
      <div className="px-4 -mt-8 pb-8">
        <div className="bg-white rounded-3xl shadow-lg ring-1 ring-slate-100 p-6 space-y-4">
          <Field label="Nama Lengkap" error={errors.nama}>
            <input
              type="text"
              placeholder="cth. Budi Santoso"
              value={nama}
              onChange={(e) => { setNama(e.target.value); setErrors(v => ({ ...v, nama: undefined })); }}
              className={getInputClass(errors.nama)}
            />
          </Field>

          <Field label="Nomor HP" error={errors.phone}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">+62</span>
              <input
                type="tel"
                placeholder="8xxxxxxxxxx"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: undefined })); }}
                className={`${getInputClass(errors.phone)} pl-12`}
              />
            </div>
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              placeholder="cth. nama@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(v => ({ ...v, email: undefined })); }}
              className={getInputClass(errors.email)}
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(v => ({ ...v, password: undefined })); }}
                className={`${getInputClass(errors.password)} pr-12`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
              </button>
            </div>
            {/* Password strength */}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength.level ? strength.color : "bg-slate-100"}`} />
                  ))}
                </div>
                <p className={`text-[11px] font-semibold ${
                  strength.level === 3 ? "text-emerald-600" : strength.level === 2 ? "text-amber-600" : "text-red-500"
                }`}>
                  Kekuatan password: {strength.label}
                </p>
              </div>
            )}
          </Field>

          <Field label="Konfirmasi Password" error={errors.konfirmasi}>
            <div className="relative">
              <input
                type={showKonfirmasi ? "text" : "password"}
                placeholder="Ulangi password"
                value={konfirmasi}
                onChange={(e) => { setKonfirmasi(e.target.value); setErrors(v => ({ ...v, konfirmasi: undefined })); }}
                className={`${getInputClass(errors.konfirmasi)} pr-12`}
              />
              <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showKonfirmasi ? <EyeOffIcon className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
              </button>
              {konfirmasi && password === konfirmasi && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <CheckIcon className="w-4.5 h-4.5 text-emerald-500" />
                </div>
              )}
            </div>
          </Field>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => { setTerms(!terms); setErrors(v => ({ ...v, terms: undefined })); }}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  terms ? "bg-blue-700 border-blue-700" : errors.terms ? "border-red-400" : "border-slate-300"
                }`}
              >
                {terms && <CheckIcon className="w-3 h-3 text-white" />}
              </div>
              <span className="text-xs text-slate-600 leading-relaxed">
                Saya menyetujui{" "}
                <span className="text-blue-600 font-semibold">Syarat &amp; Ketentuan</span>
                {" "}dan{" "}
                <span className="text-blue-600 font-semibold">Kebijakan Privasi</span>
                {" "}AspiAKU.
              </span>
            </label>
            {errors.terms && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 ml-8">
                <XCircleIcon className="w-3.5 h-3.5 shrink-0" /> {errors.terms}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
              loading ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98] shadow-blue-200"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Memproses...
              </>
            ) : "Daftar"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link to="/auth/citizen/login" className="font-bold text-blue-700 hover:text-blue-800">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
