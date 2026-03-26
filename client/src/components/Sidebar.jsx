import { NavLink } from 'react-router-dom';
import { Users, Trash2, LogOut, Zap, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const NAV = [
  { to: '/',      icon: Users,  label: 'Contacts' },
  { to: '/trash', icon: Trash2, label: 'Trash' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="glass w-56 shrink-0 flex flex-col h-screen sticky top-0 p-4">
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-semibold text-textMain tracking-tight">ContactOS</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
              ${isActive ? 'bg-primary/10 text-primary font-medium shadow-sm' : 'text-textMuted hover:bg-hoverBg hover:text-textMain'}`
            }>
            <Icon size={16} />{label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-border pt-4 mt-4 flex flex-col gap-2">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn-ghost w-full flex items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />} Theme
          </span>
          <span className="text-[10px] uppercase text-textMuted font-medium">{theme}</span>
        </button>

        {user ? (
          <>
            <div className="flex items-center gap-2 px-1 py-1">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                {user.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-textMuted truncate font-medium">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="btn-ghost w-full flex items-center gap-2 text-xs">
              <LogOut size={14} /> Sign out
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 px-1 py-1">
              <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-textMuted">
                G
              </div>
              <span className="text-xs text-textMuted truncate font-medium">Guest User</span>
            </div>
            <button onClick={() => navigate('/login')} className="btn-primary w-full flex items-center justify-center gap-2 text-xs">
              Sign in
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
