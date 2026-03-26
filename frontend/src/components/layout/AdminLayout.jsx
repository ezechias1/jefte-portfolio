import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Images, Calendar, FileText, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/portfolio', icon: Images, label: 'Portfolio' },
  { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/admin/quotes', icon: FileText, label: 'Quotes' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const sidebar = (
    <>
      <div className="mb-10 px-2">
        <p className="font-display text-xl text-ivory tracking-widest">JEFTE</p>
        <p className="text-mist text-xs mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-sm ${isActive ? 'bg-graphite text-gold' : 'text-silver hover:text-ivory hover:bg-graphite/50'}`
            }
          >
            <Icon size={15} />
            <span className="tracking-wide">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ash/40 pt-4 mt-4">
        <p className="text-mist text-xs px-3 mb-3 truncate">{user?.name}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-silver hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-obsidian flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 border-r border-ash/40 flex-col py-8 px-4 fixed inset-y-0 left-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-obsidian/80 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed inset-y-0 left-0 w-56 border-r border-ash/40 bg-obsidian flex flex-col py-8 px-4 z-50 transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-mist hover:text-ivory">
          <X size={18} />
        </button>
        {sidebar}
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-56 p-6 md:p-8 min-h-screen">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <button onClick={() => setSidebarOpen(true)} className="text-ivory p-1">
            <Menu size={20} />
          </button>
          <p className="font-display text-lg text-ivory tracking-widest">JEFTE</p>
          <div className="w-7" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
