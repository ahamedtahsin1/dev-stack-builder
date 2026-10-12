import { Layers3, X, Trash2, Sparkles } from 'lucide-react';
export default function StackPanel({ stack, onRemove, onClear }) {
  return <aside className="stack-panel" aria-label="Your selected technology stack">
    <div className="stack-heading"><div className="stack-icon"><Layers3 size={19}/></div><div><h3>Your Stack</h3><p>YOUR PERSONAL TOOLKIT</p></div></div>
    <div className="stack-count"><strong>{stack.length.toString().padStart(2, '0')}</strong><span>technology{stack.length === 1 ? '' : 'ies'} selected</span></div>
    {stack.length === 0 ? <div className="empty-stack"><div className="empty-art"><Layers3 size={29}/><Sparkles size={15}/></div><h4>Your stack starts here</h4><p>Add technologies you want to learn or use in your next project. Your toolkit will show up here.</p><span className="empty-hint">Choose a card to get started ↙</span></div> : <>
      <div className="stack-list">{stack.map(item => <div className="stack-item" key={item.id}><div className="stack-item-icon"><img src={item.icon} alt="" loading="lazy"/></div><div className="stack-item-copy"><strong>{item.name}</strong><span>{item.category}</span></div><button className="remove-item" aria-label={`Remove ${item.name}`} title={`Remove ${item.name}`} onClick={() => onRemove(item)}><X size={16}/></button></div>)}</div>
      <div className="stack-summary"><span>Stack completeness</span><strong>{Math.min(100, Math.round(stack.length / 8 * 100))}%</strong><div className="progress-track"><span style={{width: `${Math.min(100, stack.length / 8 * 100)}%`}}/></div><small>{stack.length < 8 ? `Add ${8-stack.length} more to build a balanced toolkit.` : 'A strong toolkit is taking shape.'}</small></div>
      <button className="clear-button" onClick={onClear}><Trash2 size={15}/> Remove all</button>
    </>}
    <div className="stack-tip"><Sparkles size={16}/><p><strong>Stack tip</strong><br/>Start with fundamentals, then add tools that solve a real project need.</p></div>
  </aside>;
}