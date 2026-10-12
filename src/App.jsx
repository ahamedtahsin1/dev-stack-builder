import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Code2, Command, Search, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import TechnologyCard from './components/TechnologyCard.jsx';
import StackPanel from './components/StackPanel.jsx';
import Footer from './components/Footer.jsx';
import heroArt from './assets/banner-stack.png';

const categories = ['All technologies','Frontend','Backend','Database','Language','Styling','DevOps','Tools'];
export default function App() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stack, setStack] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All technologies');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let alive = true;
    fetch(`${import.meta.env.BASE_URL}data/technologies.json`)
      .then(response => { if (!response.ok) throw new Error('Could not load technology data'); return response.json(); })
      .then(data => { if (alive) setTechnologies(data); })
      .catch(() => toast.error('Technology data could not be loaded. Please refresh the page.'))
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const filteredTechnologies = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = technologies.filter(item => (activeCategory === 'All technologies' || item.category === activeCategory) && (!query || `${item.name} ${item.category} ${item.description} ${item.badge}`.toLowerCase().includes(query)));
    if (sortBy === 'rating') return [...filtered].sort((a,b) => b.rating-a.rating);
    if (sortBy === 'name') return [...filtered].sort((a,b) => a.name.localeCompare(b.name));
    return filtered;
  }, [technologies, activeCategory, search, sortBy]);

  function addToStack(technology) {
    if (stack.some(item => item.id === technology.id)) { toast.warning(`${technology.name} is already in your stack.`); return; }
    setStack(current => [...current, technology]);
    toast.success(`${technology.name} added to your stack.`);
  }
  function removeFromStack(technology) {
    setStack(current => current.filter(item => item.id !== technology.id));
    toast.info(`${technology.name} removed from your stack.`);
  }
  function clearStack() {
    if (!stack.length) return;
    setStack([]);
    toast.success('Your stack has been cleared.');
  }

  return <><Navbar/><main>
    <section className="hero" id="home"><div className="hero-grid container"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> THE DEVELOPER TOOLKIT, REIMAGINED</div><h1>Build your stack.<br/>Shape what’s <span className="gradient-text">possible.</span></h1><p className="hero-description">The right tools make ambitious ideas achievable. Explore the technologies powering modern products and curate a toolkit that works for the way you build.</p><div className="hero-actions"><a href="#technologies" className="button gradient-button">Explore technologies <ArrowRight size={17}/></a><a href="#about" className="button outline-button">How it works <ArrowDown size={16}/></a></div><div className="hero-proof"><div className="proof-avatars"><span>JS</span><span>Py</span><span>⚡</span><span>＋</span></div><div><strong>Made for every stage</strong><small>From first project to production</small></div><span className="proof-divider"/><div className="proof-stat"><strong>15</strong><small>curated technologies</small></div></div></div><div className="hero-visual"><div className="visual-glow"/><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="hero-art-frame"><img src={heroArt} alt="Illustration of a developer toolkit made of connected technology blocks"/></div><div className="floating-card floating-card-top"><span className="float-icon"><Zap size={17}/></span><span><strong>Built for momentum</strong><small>Less guesswork, more building</small></span><CheckCircle2 size={17} className="float-check"/></div><div className="floating-card floating-card-bottom"><span className="code-mini"><Code2 size={20}/></span><span><strong>Your tools, your rules</strong><small>A stack tailored to your goals</small></span></div><div className="visual-caption"><span/> CURATE · LEARN · BUILD</div></div></div><div className="hero-bottom container"><span>TOOLS THAT POWER THE WEB</span><div className="tech-wordmarks"><span>React</span><span>Node.js</span><span>TypeScript</span><span>MongoDB</span><span>Docker</span><span>＋ and more</span></div></div></section>
    <section className="technology-section section-pad" id="technologies"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> EXPLORE THE ECOSYSTEM</div><h2>Meet your next <span className="gradient-text">favorite tool.</span></h2><p>Explore trusted technologies, understand what they do, and add the ones that belong in your workflow.</p></div><div className="catalog-count"><strong>{technologies.length.toString().padStart(2,'0')}</strong><span>TECHNOLOGIES<br/>AND COUNTING</span></div></div>
      <div className="catalog-toolbar"><div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search technologies, categories..." aria-label="Search technologies"/><kbd>⌘ K</kbd></div><label className="sort-control"><SlidersHorizontal size={16}/><span>Sort:</span><select value={sortBy} onChange={e=>setSortBy(e.target.value)} aria-label="Sort technologies"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="name">Name A–Z</option></select></label></div>
      <div className="catalog-layout"><div className="catalog-main"><div className="category-tabs" role="group" aria-label="Filter by category">{categories.map(category=><button key={category} className={activeCategory===category?'active':''} onClick={()=>setActiveCategory(category)}>{category}{category==='All technologies'&&<span>{technologies.length}</span>}</button>)}</div><div className="results-line"><span>{loading?'Loading toolkit…':<>Showing <strong>{filteredTechnologies.length}</strong> {filteredTechnologies.length===1?'technology':'technologies'}</>}</span><span className="live-indicator"><span/> CURATED DIRECTORY</span></div>
        {loading ? <div className="loading-state"><span className="loader"/><h3>Preparing your toolkit</h3><p>Loading the technology directory…</p></div> : filteredTechnologies.length ? <div className="tech-grid">{filteredTechnologies.map(technology=><TechnologyCard key={technology.id} technology={technology} added={stack.some(item=>item.id===technology.id)} onAdd={addToStack}/>)}</div> : <div className="no-results"><Search size={28}/><h3>No technologies found</h3><p>Try another search or choose a different category.</p><button onClick={()=>{setSearch('');setActiveCategory('All technologies')}}>Clear filters</button></div>}
      </div><StackPanel stack={stack} onRemove={removeFromStack} onClear={clearStack}/></div>
    </div></section>
    <section className="how-section section-pad" id="about"><div className="container how-layout"><div className="how-copy"><div className="eyebrow"><span className="eyebrow-dot"/> YOUR WORKFLOW, YOUR WAY</div><h2>Build with intention.<br/><span className="gradient-text">Not just trends.</span></h2><p>There is no universal perfect stack. The best toolkit is the one that fits your project, your team, and the problem you want to solve.</p><a className="text-link" href="#technologies">Start curating your stack <ArrowRight size={16}/></a></div><div className="steps-grid"><article className="step-card"><span className="step-number">01 / DISCOVER</span><div className="step-icon"><Search size={20}/></div><h3>Explore the options</h3><p>Browse a curated directory and learn where each technology fits in a modern workflow.</p></article><article className="step-card"><span className="step-number">02 / SELECT</span><div className="step-icon"><Command size={20}/></div><h3>Make it yours</h3><p>Add the tools that match your goals. Your stack stays organized in one handy panel.</p></article><article className="step-card"><span className="step-number">03 / BUILD</span><div className="step-icon"><Sparkles size={20}/></div><h3>Turn plans into products</h3><p>Use your stack as a starting point for learning, planning, and your next project.</p></article><article className="step-card step-highlight"><span className="step-number">A BETTER WAY TO BEGIN</span><div className="highlight-symbol"><Code2 size={25}/></div><h3>Clarity before code.</h3><p>A considered toolkit helps you focus on solving the problem, not collecting tools.</p></article></div></div></section>
    <section className="closing-cta" id="projects"><div className="container closing-inner"><div className="cta-orb"><Code2 size={31}/></div><div><span className="eyebrow">YOUR NEXT IDEA IS WAITING</span><h2>Make your next project <span className="gradient-text">a little clearer.</span></h2><p>Build a stack around what you want to create. One thoughtful choice at a time.</p></div><a className="button gradient-button" href="#technologies">Build my stack <ArrowRight size={17}/></a></div></section>
  </main><Footer/></>;
}