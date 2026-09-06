import { NavLink, Outlet, useNavigate } from "react-router";
import { HomeIcon, ListIcon, MapIcon, BellIcon, UserIcon, PlusIcon } from "../shared/Icons";
import Logo from "../shared/Logo";
import { SearchIcon } from "../shared/Icons";
import { useState } from "react";

const navItems = [
  { to: "/citizen/home", label: "Beranda", Icon: HomeIcon },
  { to: "/citizen/feed", label: "Laporan", Icon: ListIcon },
  { to: "/citizen/map", label: "Peta", Icon: MapIcon },
  { to: "/citizen/notifications", label: "Notif", Icon: BellIcon },
  { to: "/citizen/profile", label: "Profil", Icon: UserIcon },
];

export default function CitizenLayout() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = 2;

  return (
    <div className="h-full flex flex-col bg-slate-50 max-w-[430px] mx-auto relative">
      {/* Mobile header */}
      <header className="bg-blue-700 text-white px-4 pt-3 pb-12 shrink-0">
        <div className="flex items-center justify-between">
          <Logo size="sm" inverted />
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button onClick={() => navigate("/citizen/notifications")} className="p-1.5 rounded-full hover:bg-white/10 relative transition-colors">
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="mt-3 relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari laporan..."
              className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:bg-white/20"
              autoFocus
            />
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto -mt-8 relative z-10">
        <Outlet />
      </main>

      {/* Create report FAB */}
      <button
        onClick={() => navigate("/citizen/create-report")}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-all active:scale-95"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Bottom navigation */}
      <nav className="shrink-0 bg-white border-t border-slate-100 px-2 py-1 safe-area-bottom shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? "text-blue-700" : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-blue-50" : ""}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-semibold ${isActive ? "text-blue-700" : "text-slate-400"}`}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
