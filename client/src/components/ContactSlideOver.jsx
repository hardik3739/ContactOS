import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

const TAGS = ['work', 'personal', 'family', 'other'];

export default function ContactSlideOver({ isOpen, onClose, onSubmit, editContact }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    reset(editContact || { name: '', email: '', phone: '', tag: 'other', notes: '' });
  }, [editContact, reset]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-textMain/20 backdrop-blur-sm z-40"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card">
              <h2 className="text-sm font-semibold text-textMain">
                {editContact ? 'Edit contact' : 'New contact'}
              </h2>
              <button onClick={onClose} className="btn-ghost p-1.5 bg-hoverBg"><X size={16} /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col flex-1 overflow-y-auto">
              <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                {/* Name */}
                <div>
                  <label className="text-xs font-medium text-textMuted mb-1.5 block">Name *</label>
                  <input {...register('name', { required: 'Name is required' })}
                    className="input" placeholder="Full name" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-textMuted mb-1.5 block">Email *</label>
                  <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    className="input" placeholder="email@example.com" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-textMuted mb-1.5 block">Phone</label>
                  <input {...register('phone')} className="input" placeholder="+91 98XXX XXXXX" />
                </div>
                {/* Tag */}
                <div>
                  <label className="text-xs font-medium text-textMuted mb-1.5 block">Tag</label>
                  <select {...register('tag')} className="input cursor-pointer">
                    {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {/* Notes */}
                <div>
                  <label className="text-xs font-medium text-textMuted mb-1.5 block">Notes</label>
                  <textarea {...register('notes')} rows={3}
                    className="input resize-none" placeholder="Optional notes..." />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-card flex gap-3">
                <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
                  {isSubmitting ? 'Saving...' : editContact ? 'Save changes' : 'Add contact'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
