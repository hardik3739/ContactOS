import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useContacts = (search = '', tag = '') => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal]   = useState(0);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    if (!user) {
      // Guest mode
      const localContacts = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      let filtered = localContacts.filter(c => !c.isDeleted);
      if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
      if (tag && tag !== 'all') filtered = filtered.filter(c => c.tag === tag);
      
      setContacts(filtered);
      setTotal(filtered.length);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/contacts', { params: { search, tag } });
      setContacts(data.contacts);
      setTotal(data.total);
    } catch { toast.error('Failed to load contacts'); }
    finally  { setLoading(false); }
  }, [search, tag, user]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const createContact = async (formData) => {
    if (!user) {
      const newContact = { ...formData, _id: Date.now().toString(), avatarColor: '#7F77DD', isDeleted: false, pinned: false };
      const local = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      localStorage.setItem('guest_contacts', JSON.stringify([newContact, ...local]));
      setContacts(prev => [newContact, ...prev]);
      setTotal(t => t + 1);
      toast.success('Contact added locally (Guest Mode)');
      return newContact;
    }

    const { data } = await api.post('/contacts', formData);
    setContacts(prev => [data.contact, ...prev]);
    setTotal(t => t + 1);
    toast.success('Contact added');
    return data.contact;
  };

  const updateContact = async (id, formData) => {
    if (!user) {
      const local = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      const updated = local.map(c => c._id === id ? { ...c, ...formData } : c);
      localStorage.setItem('guest_contacts', JSON.stringify(updated));
      setContacts(prev => prev.map(c => c._id === id ? { ...c, ...formData } : c));
      toast.success('Contact updated locally');
      return;
    }

    const { data } = await api.put(`/contacts/${id}`, formData);
    setContacts(prev => prev.map(c => c._id === id ? data.contact : c));
    toast.success('Contact updated');
  };

  const deleteContact = async (id) => {
    if (!user) {
      const local = JSON.parse(localStorage.getItem('guest_contacts') || '[]');
      const updated = local.map(c => c._id === id ? { ...c, isDeleted: true } : c);
      localStorage.setItem('guest_contacts', JSON.stringify(updated));
      setContacts(prev => prev.filter(c => c._id !== id));
      setTotal(t => t - 1);
      toast.success('Moved to trash (Guest Mode)');
      return;
    }

    await api.delete(`/contacts/${id}`);
    setContacts(prev => prev.filter(c => c._id !== id));
    setTotal(t => t - 1);
    toast.success('Moved to trash');
  };

  const pinContact = async (id, pinned) => {
    const contact = contacts.find(c => c._id === id);
    if (!contact) return;
    await updateContact(id, { ...contact, pinned: !pinned });
  };

  return { contacts, loading, total, createContact, updateContact, deleteContact, pinContact, refetch: fetchContacts };
};
