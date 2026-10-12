import { useState } from 'react';
import { Menu, X, Code2, ArrowUpRight } from 'lucide-react';

const links = [
  ['Home', '#home'], ['Technologies', '#technologies'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <nav className="navbar container" aria-label="Main navigation">
      <button className="mobile-menu icon-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      <a className="brand" href="#home" aria-label="Dev Stack home"><span className="brand-mark"><Code2 size={21}/></span><span>dev<span className="gradient-text">stack</span><small>BUILDER</small></span></a>
      <div className={`nav-links ${open ? 'nav-open' : ''}`}>{links.map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div>
      <div className="nav-actions"><a className="signin" href="#contact">Sign in</a><a className="button button-small gradient-button" href="#technologies">Get started <ArrowUpRight size={15}/></a></div>
    </nav>
  </header>;
}