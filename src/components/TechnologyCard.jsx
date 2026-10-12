import { Plus, Check, Star, ArrowUpRight } from 'lucide-react';
export default function TechnologyCard({ technology, added, onAdd }) {
  const { name, icon, badge, description, category, difficulty, rating } = technology;
  return <article className="tech-card">
    <div className="card-top"><div className="tech-icon"><img src={icon} alt={`${name} logo`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.textContent = name.slice(0,2); }}/></div><span className="badge">{badge}</span><span className="card-arrow"><ArrowUpRight size={16}/></span></div>
    <h3>{name}</h3><p className="tech-description">{description}</p>
    <div className="card-meta"><span className="category-chip">{category}</span><span className="rating"><Star size={14} fill="currentColor"/> {rating.toFixed(1)}</span></div>
    <div className="card-bottom"><span className="difficulty"><span className={`difficulty-dot ${difficulty === 'Advanced' ? 'advanced' : difficulty === 'Intermediate' ? 'intermediate' : ''}`}></span>{difficulty}</span><button className={`add-button ${added ? 'added' : ''}`} onClick={() => onAdd(technology)} disabled={added}>{added ? <><Check size={15}/> Added</> : <><Plus size={15}/> Add to Stack</>}</button></div>
  </article>;
}