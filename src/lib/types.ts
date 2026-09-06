export type ReportStatus = "Dikirim" | "Diverifikasi" | "Diproses" | "Selesai" | "Ditolak";
export type Priority = "Rendah" | "Sedang" | "Tinggi" | "Urgent";
export type UserRole = "masyarakat" | "admin_instansi" | "super_admin" | "admin_server" | "admin_sistem";

export interface Agency {
  id: string;
  name: string;
  code: string;
  type: string;
  status: "Aktif" | "Nonaktif";
  adminCount: number;
  reportCount: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  agency: string;
  priority: Priority;
  status: "Aktif" | "Nonaktif";
  reportCount: number;
  color: string;
}

export interface TimelineItem {
  status: ReportStatus;
  date: string;
  time: string;
  description: string;
  actor?: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Report {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  location: string;
  district: string;
  date: string;
  status: ReportStatus;
  priority: Priority;
  agency: string;
  agencyCode: string;
  reporter: string;
  reporterPhone?: string;
  isAnonymous: boolean;
  photos: string[];
  supportCount: number;
  commentCount: number;
  isSupported: boolean;
  isSaved: boolean;
  lat: number;
  lng: number;
  timeline: TimelineItem[];
  governmentResponse?: string;
  responseDate?: string;
  resolutionEvidence?: string;
  internalNotes?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  agency?: string;
  agencyCode?: string;
  status: "Aktif" | "Nonaktif";
  lastLogin: string;
  totalReports?: number;
  completedReports?: number;
  isVerified: boolean;
}

export interface Notification {
  id: string;
  type: "received" | "verified" | "processing" | "response" | "completed" | "rejected";
  title: string;
  message: string;
  reportId: string;
  timestamp: string;
  isRead: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  ip: string;
  device: string;
  status: "Berhasil" | "Gagal";
}

export interface RoutingRule {
  id: string;
  category: string;
  agency: string;
  priority: Priority;
  status: "Aktif" | "Nonaktif";
}
