import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl p-4 flex gap-3 animate-pulse shadow-sm"
    >
      <div className="w-10 h-10 rounded-full bg-hoverBg shrink-0" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-hoverBg rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-hoverBg rounded w-1/2" />
          <div className="h-3 bg-hoverBg rounded w-2/5" />
        </div>
      </div>
    </motion.div>
  );
}
