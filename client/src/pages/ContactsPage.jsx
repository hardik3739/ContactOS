import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ContactCard from '../components/ContactCard';
import ContactSlideOver from '../components/ContactSlideOver';
import CommandPalette from '../components/CommandPalette';
import StatsBar from '../components/StatsBar';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { useContacts } from '../hooks/useContacts';
import { useDebounce } from '../hooks/useDebounce';

const TAGS = ['all', 'work', 'personal', 'family', 'other'];

export default function ContactsPage() {
  const [search, setSearch]   = useState('');
  const [tag, setTag]         = useState('all');
  const [isSlideOpen, setOpen]= useState(false);
  const [editContact, setEdit]= useState(null);

  const debouncedSearch = useDebounce(search, 300);
  const { contacts, loading, total, createContact, updateContact, deleteContact, pinContact } = useContacts(debouncedSearch, tag);

  const tagStats = useMemo(() => {
    return contacts.reduce((acc, c) => {
      acc[c.tag] = (acc[c.tag] || 0) + 1;
      return acc;
    }, {});
  }, [contacts]);

  const sortedContacts = [...contacts].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const handleAddNew = () => { setEdit(null); setOpen(true); };
  const handleEdit   = (c) => { setEdit(c); setOpen(true); };

  const handleFormSubmit = async (data) => {
    if (editContact) await updateContact(editContact._id, data);
    else await createContact(data);
  };

  return (
    <div className="flex h-screen w-full bg-surface text-textMain max-w-[1400px] mx-auto transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Header */}
        <header className="px-8 py-5 flex items-center justify-between border-b border-border bg-surface/80 backdrop-blur top-0 z-10 sticky">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-textMain">All Contacts</h1>
            <p className="text-xs text-textMuted mt-0.5 font-medium">Manage your network intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <CommandPalette contacts={contacts} onAddNew={handleAddNew} />
            <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> New Contact
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="px-8 py-4 border-b border-border flex flex-col gap-4 bg-surface z-10 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                className={`text-xs px-3 py-1.5 rounded-full capitalize font-medium transition-all shadow-sm ${
                  tag === t ? 'bg-primary text-white' : 'bg-card border border-border text-textMuted hover:text-textMain hover:border-textMuted/40'
                }`}>
                {t}
              </button>
            ))}
          </div>
          <StatsBar total={total} tags={tagStats} />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : sortedContacts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedContacts.map((c, i) => (
                  <ContactCard 
                    key={c._id} contact={c} index={i}
                    onDelete={deleteContact} onEdit={handleEdit} onPin={pinContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <ContactSlideOver 
        isOpen={isSlideOpen} onClose={() => setOpen(false)}
        onSubmit={handleFormSubmit} editContact={editContact}
      />
    </div>
  );
}
