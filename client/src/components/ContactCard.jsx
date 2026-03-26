import { motion } from 'framer-motion';
import { Pin, Trash2, Pencil, Phone, Mail } from 'lucide-react';

const TAG_COLORS = {
  work:     'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  personal: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  family:   'bg-green-500/15 text-green-600 dark:text-green-400',
  other:    'bg-gray-500/15 text-gray-600 dark:text-gray-400',
};

export default function ContactCard({ contact, index, onEdit, onDelete, onPin }) {
  const initials = contact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="bg-card border border-border rounded-xl p-4 card-hover group"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm"
          style={{ background: contact.avatarColor + '20', color: contact.avatarColor }}
        >
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-textMain truncate">{contact.name}</h3>
            {contact.pinned && <Pin size={12} className="text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Mail size={11} className="text-textMuted" />
            <p className="text-xs text-textMuted truncate">{contact.email}</p>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-1 mt-0.5">
              <Phone size={11} className="text-textMuted" />
              <p className="text-xs text-textMuted">{contact.phone}</p>
            </div>
          )}
          <span className={`tag-chip mt-2.5 inline-block ${TAG_COLORS[contact.tag]}`}>
            {contact.tag}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onPin(contact._id, contact.pinned)}
            className="p-1.5 rounded hover:bg-hoverBg text-textMuted hover:text-primary transition-colors">
            <Pin size={13} />
          </button>
          <button onClick={() => onEdit(contact)}
            className="p-1.5 rounded hover:bg-hoverBg text-textMuted hover:text-textMain transition-colors">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(contact._id)}
            className="p-1.5 rounded hover:bg-hoverBg text-textMuted hover:text-red-500 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
