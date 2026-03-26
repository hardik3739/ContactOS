import { useState, useEffect } from 'react';
import { RefreshCcw, Mail, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SkeletonCard from '../components/SkeletonCard';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function TrashPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    setLoading(true);
    if (!user) {
      const local = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      setContacts(local.filter(c => c.isDeleted));
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/contacts/trash');
      setContacts(data.contacts);
    } catch {
      toast.error('Failed to load trash');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrash(); }, [user]);

  const restoreContact = async (id) => {
    if (!user) {
      const local = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      const updated = local.map(c => c._id === id ? { ...c, isDeleted: false } : c);
      localStorage.setItem('guest_contacts', JSON.stringify(updated));
      setContacts(prev => prev.filter(c => c._id !== id));
      toast.success('Contact restored (Guest Mode)');
      return;
    }

    try {
      await api.post(`/contacts/${id}/restore`);
      setContacts(prev => prev.filter(c => c._id !== id));
      toast.success('Contact restored');
    } catch {
      toast.error('Failed to restore');
    }
  };

  return (
    <div className="flex h-screen w-full bg-surface text-textMain max-w-[1400px] mx-auto transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <header className="px-8 py-5 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-10 shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-textMain">Trash</h1>
          <p className="text-xs text-textMuted mt-0.5 font-medium">Deleted contacts will remain here</p>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : contacts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-xl bg-surface/30">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500 shadow-sm">
                  <Trash2 size={20} />
                </div>
                <h3 className="text-sm font-semibold text-textMain mb-1">Trash is empty</h3>
                <p className="text-xs text-textMuted">No recently deleted contacts.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((c, i) => (
                  <motion.div
                    key={c._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="bg-card border border-border rounded-xl p-4 flex flex-col hover:border-textMuted/40 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                        style={{ background: c.avatarColor + '20', color: c.avatarColor }}>
                        {c.name[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-textMain truncate">{c.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5 text-textMuted">
                          <Mail size={11} />
                          <p className="text-xs truncate">{c.email}</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => restoreContact(c._id)}
                      className="btn-ghost flex items-center justify-center gap-2 mt-4 text-xs font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 shadow-sm transition-all py-2 rounded-lg py-1.5 w-full">
                      <RefreshCcw size={14} /> Restore
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
