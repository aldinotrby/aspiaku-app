interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  inverted?: boolean;
}

export default function Logo({ size = "md", variant = "full", inverted = false }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg", sub: "text-[9px]" },
    md: { icon: 36, text: "text-xl", sub: "text-[10px]" },
    lg: { icon: 52, text: "text-3xl", sub: "text-xs" },
  };
  const s = sizes[size];
  const textColor = inverted ? "text-white" : "text-blue-700";
  const subColor = inverted ? "text-blue-100" : "text-slate-500";

  return (
    <div className="flex items-center gap-2.5">
      <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#1D4ED8" />
        <path d="M24 8C15.163 8 8 14.268 8 22C8 26.418 10.343 30.365 14 33.018V40L21.077 36.461C22.022 36.636 22.999 36.727 24 36.727C32.837 36.727 40 30.459 40 22.727C40 15 32.837 8 24 8Z" fill="white" opacity="0.95" />
        <circle cx="18" cy="22" r="2.5" fill="#1D4ED8" />
        <circle cx="24" cy="22" r="2.5" fill="#1D4ED8" />
        <circle cx="30" cy="22" r="2.5" fill="#1D4ED8" />
        <circle cx="30" cy="12" r="6" fill="#10B981" />
        <path d="M30 9.5L31.5 13H35L32.25 14.75L33.25 18L30 16L26.75 18L27.75 14.75L25 13H28.5L30 9.5Z" fill="white" fillOpacity="0.9" />
      </svg>
      {variant === "full" && (
        <div>
          <div className={`${s.text} font-bold leading-tight tracking-tight ${textColor}`}>AspiAKU</div>
          <div className={`${s.sub} font-medium leading-tight ${subColor} tracking-wide`}>Platform Pengaduan Masyarakat</div>
        </div>
      )}
    </div>
  );
}
