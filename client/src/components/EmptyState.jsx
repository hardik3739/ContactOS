import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-12 text-center h-64 border border-dashed border-border rounded-xl bg-surface/30">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary shadow-glow">
        <Users size={20} />
      </div>
      <h3 className="text-sm font-semibold text-textMain mb-1">No contacts found</h3>
      <p className="text-xs text-textMuted max-w-xs leading-relaxed">
        Get started by creating a new contact or try a different search.
      </p>
    </motion.div>
  );
}
