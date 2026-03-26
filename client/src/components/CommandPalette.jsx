import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette({ contacts, onAddNew }) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState('');
  const inputRef              = useRef(null);
  const navigate              = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  const results = query.length > 0
    ? contacts.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-xs font-medium text-textMuted bg-card border border-border rounded-lg px-3 py-1.5 hover:border-primary/40 hover:text-textMain transition-all shadow-sm">
        <Search size={14} /> Search contacts... <kbd className="ml-2 px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono shadow-sm">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-textMain/20 backdrop-blur-sm z-50" />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface/50">
                <Search size={16} className="text-textMuted" />
                <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm font-medium text-textMain placeholder-textMuted outline-none" />
                {query && <button onClick={() => setQuery('')} className="text-textMuted text-xs hover:text-textMain px-2">Clear</button>}
              </div>

              <div className="p-2 max-h-72 overflow-y-auto">
                {results.length > 0 && results.map(c => (
                  <button key={c._id} onClick={() => { setOpen(false); setQuery(''); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-hoverBg transition-colors text-left group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                      style={{ background: c.avatarColor + '20', color: c.avatarColor }}>
                      {c.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">{c.name}</p>
                      <p className="text-xs text-textMuted">{c.email}</p>
                    </div>
                  </button>
                ))}

                <button onClick={() => { setOpen(false); onAddNew(); }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-hoverBg transition-colors text-left mt-1 border-t border-border group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">Create new contact...</p>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
