export default function StatsBar({ total, tags }) {
  return (
    <div className="flex items-center gap-6 py-3 border-b border-border bg-surface/50 px-1 text-xs text-textMuted overflow-x-auto whitespace-nowrap">
      <div className="flex gap-2 items-center text-textMain font-medium">
        <span className="text-textMuted">Total Contacts:</span> <span className="text-primary">{total}</span>
      </div>
      
      {Object.entries(tags).map(([tag, count]) => (
        <div key={tag} className="flex gap-2 items-center text-textMain font-medium">
          <span className="capitalize text-textMuted">{tag}:</span> <span>{count}</span>
        </div>
      ))}
    </div>
  );
}
