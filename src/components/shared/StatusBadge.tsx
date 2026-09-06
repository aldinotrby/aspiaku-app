import type { ReportStatus, Priority } from "@/lib/types";

interface StatusBadgeProps {
  status: ReportStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<ReportStatus, { label: string; classes: string; dot: string }> = {
  Dikirim: { label: "Dikirim", classes: "bg-sky-50 text-sky-700 ring-sky-200", dot: "bg-sky-500" },
  Diverifikasi: { label: "Diverifikasi", classes: "bg-blue-50 text-blue-700 ring-blue-200", dot: "bg-blue-600" },
  Diproses: { label: "Diproses", classes: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
  Selesai: { label: "Selesai", classes: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
  Ditolak: { label: "Ditolak", classes: "bg-red-50 text-red-700 ring-red-200", dot: "bg-red-500" },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  const textSize = size === "sm" ? "text-xs" : "text-xs";
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} rounded-full font-semibold ${textSize} ring-1 ring-inset ${cfg.classes}`}>
      <span className={`${dotSize} rounded-full ${cfg.dot} shrink-0`} />
      {cfg.label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  size?: "sm" | "md";
}

const priorityConfig: Record<Priority, { label: string; classes: string }> = {
  Rendah: { label: "Rendah", classes: "bg-slate-100 text-slate-600 ring-slate-200" },
  Sedang: { label: "Sedang", classes: "bg-blue-50 text-blue-700 ring-blue-200" },
  Tinggi: { label: "Tinggi", classes: "bg-orange-50 text-orange-700 ring-orange-200" },
  Urgent: { label: "Urgent", classes: "bg-red-50 text-red-700 ring-red-200" },
};

export function PriorityBadge({ priority, size = "md" }: PriorityBadgeProps) {
  const cfg = priorityConfig[priority];
  const textSize = size === "sm" ? "text-xs" : "text-xs";
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";

  return (
    <span className={`inline-flex items-center ${padding} rounded-full font-semibold ${textSize} ring-1 ring-inset ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
