import { useState } from "react";
import { useNavigate } from "react-router";
import { categories } from "../../lib/mockData";
import { ArrowLeftIcon, CameraIcon, LocationIcon, CheckCircleIcon, UploadIcon } from "../../components/shared/Icons";

const totalSteps = 4;

const stepLabels = ["Judul & Kategori", "Deskripsi & Foto", "Lokasi", "Tinjau & Kirim"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center px-4 py-3 bg-white border-b border-slate-100">
      {stepLabels.map((label, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center" style={{ flex: "0 0 auto" }}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-emerald-500 text-white"
                : i === current
                ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                : "bg-slate-100 text-slate-400"
            }`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-[9px] mt-1 font-semibold hidden sm:block ${i === current ? "text-blue-700" : "text-slate-400"}`}>
              {label}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className={`flex-1 h-0.5 mx-1 ${i < current ? "bg-emerald-400" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CitizenCreateReport() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("Jl. Raya Banyakan No. 12, Kediri");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-full bg-white flex flex-col items-center justify-center px-6 py-12">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-slate-900 text-center">Laporan Berhasil Dikirim!</h1>
        <p className="text-slate-500 text-center mt-2 text-sm leading-relaxed">
          Laporan Anda sedang diproses oleh sistem dan akan diteruskan ke instansi terkait.
        </p>

        <div className="mt-6 bg-slate-50 rounded-2xl p-4 w-full max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">ID Laporan</span>
            <span className="text-xs font-mono font-bold text-slate-700">RPT-2024-009</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Status</span>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">Dikirim</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Tanggal</span>
            <span className="text-xs text-slate-600">19 Des 2024</span>
          </div>
        </div>

        <div className="mt-8 space-y-3 w-full max-w-xs">
          <button
            onClick={() => navigate("/citizen/report/RPT-2024-001")}
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-800"
          >
            Lihat Detail Laporan
          </button>
          <button
            onClick={() => navigate("/citizen/home")}
            className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold text-sm hover:bg-slate-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <button onClick={() => step === 0 ? navigate(-1) : setStep(s => s - 1)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="font-bold text-slate-900 text-base">Buat Laporan</h1>
          <span className="ml-auto text-xs text-slate-400">Langkah {step + 1} dari {totalSteps}</span>
        </div>
        <StepIndicator current={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">
        {/* Step 1: Title & Category */}
        {step === 0 && (
          <div className="px-4 py-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="cth. Jalan berlubang di depan sekolah..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">{title.length}/100 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                      selectedCategory === cat.id
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xl leading-none">
                      {["🛣️","♻️","💡","🌊","🌳","🚶","⚠️","🌿"][parseInt(cat.id) - 1]}
                    </span>
                    <div>
                      <div className={`text-xs font-semibold ${selectedCategory === cat.id ? "text-blue-700" : "text-slate-700"}`}>
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{cat.agency.split(" ").slice(-1)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Description & Photos */}
        {step === 1 && (
          <div className="px-4 py-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Deskripsi Masalah <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Jelaskan permasalahan secara detail: kondisi, dampak yang ditimbulkan, dan sudah berapa lama terjadi..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">{description.length}/1000 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Foto Laporan <span className="text-slate-400 font-normal">(wajib, maks. 5 foto)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* Uploaded placeholder */}
                <div className="aspect-square bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
                    alt="foto"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Add photo button */}
                <button className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <CameraIcon className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] text-slate-400">Tambah</span>
                </button>
                <button className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <UploadIcon className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] text-slate-400">Galeri</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Format: JPG, PNG. Maks. 10MB per foto.</p>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 2 && (
          <div className="px-4 py-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Kejadian</label>

              {/* Map placeholder */}
              <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative mb-3">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop&auto=format"
                  alt="Peta"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-red-500">
                    <LocationIcon className="w-8 h-8" />
                  </div>
                </div>
                <button className="absolute top-2 right-2 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 shadow-sm">
                  Gunakan Lokasi Saat Ini
                </button>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Alamat</label>
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Kelurahan</label>
                  <input type="text" placeholder="Banyakan" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Kecamatan</label>
                  <input type="text" placeholder="Banyakan" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="px-4 py-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 space-y-3 ring-1 ring-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Tinjau Laporan</h3>

              {[
                { label: "Judul", value: title || "Jalan Berlubang di Jalan Raya Banyakan" },
                { label: "Kategori", value: "Jalan & Infrastruktur" },
                { label: "Lokasi", value: locationText },
                { label: "Instansi Tujuan", value: "Dinas PUPR (otomatis)" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-xs text-slate-400 w-28 shrink-0">{item.label}</span>
                  <span className="text-sm text-slate-900 font-medium">{item.value}</span>
                </div>
              ))}

              <div className="flex gap-3">
                <span className="text-xs text-slate-400 w-28 shrink-0">Deskripsi</span>
                <span className="text-sm text-slate-900 line-clamp-3">{description || "Terdapat lubang besar di tengah jalan..."}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Perhatian:</strong> Pastikan laporan Anda akurat dan berdasarkan fakta. Laporan palsu atau tidak valid dapat ditolak.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="bg-white border-t border-slate-100 px-4 py-4">
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Kembali
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Kirim Laporan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
