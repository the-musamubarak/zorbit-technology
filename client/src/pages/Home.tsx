// Signal Foundry: editorial dark-tech landing page with orange signal accents, asymmetry, and restrained motion.
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  Database,
  Linkedin,
  Mail,
  Menu,
  Network,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  XIcon,
} from "lucide-react";

const ORANGE = "#E8571A";

const services = [
  { index: "01", icon: BarChart3, title: "Data Analytics & Power BI", text: "Interactive dashboards, KPI reporting, and DAX models that give teams a clearer operating picture." },
  { index: "02", icon: Code2, title: "Web Design & Development", text: "Responsive websites and React products designed mobile-first and built to earn trust." },
  { index: "03", icon: Search, title: "Research & Analytical Briefs", text: "Verified data reports, policy briefs, and insight documents that turn evidence into direction." },
  { index: "04", icon: Network, title: "Tech Training & Consulting", text: "Practical Python, SQL, and Power BI instruction paired with hands-on technology advisory." },
];

const projects = [
  { number: "01", title: "NITDA Digital File Tracking Dashboard", tools: ["Power BI", "DAX", "Python"], text: "A visibility layer for tracking digital files, bottlenecks, and operational throughput." },
  { number: "02", title: "Nigerian Road Traffic Crashes Dashboard", tools: ["Power BI", "NBS", "FRSC data"], text: "A public-data lens that makes crash patterns easier to read, compare, and act on." },
  { number: "03", title: "TopUp Hub VTU Application", tools: ["React", "Supabase", "Paystack"], text: "A dependable mobile-first experience for everyday digital top-ups and payments." },
];

const certifications = ["Microsoft Power BI Data Analyst", "Google Data Analytics", "Microsoft Full-Stack Developer", "NITDA Data Analytics Associate"];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);
  return value;
}

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return <div className="stat"><span className="stat-number">{count}{suffix}</span><span className="stat-label">{label}</span></div>;
}

function NodeField() {
  const nodes = [
    [72, 21], [87, 13], [92, 33], [78, 44], [64, 38], [84, 62], [95, 75], [68, 77], [55, 61], [87, 89], [45, 27], [98, 50],
  ];
  return <div className="node-field" aria-hidden="true"><div className="hero-glow" />{nodes.map(([x, y], i) => <span key={i} className="node" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.18}s` }} />)}<svg className="node-lines" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M45 27 L64 38 L72 21 L87 13 L92 33 L78 44 L84 62 L95 75 L68 77 L55 61 L84 62 M78 44 L98 50 M68 77 L87 89" /></svg></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setIsLoading(false), 1350);
    return () => window.clearTimeout(loaderTimer);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsActive(true); }, { threshold: 0.35 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);

  return <div className="zorbit-page">
    <div className={isLoading ? "site-loader" : "site-loader site-loader-exit"} role="status" aria-live="polite" aria-label="Loading Zorbit Technology">
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-signal">
        <div className="loader-ring loader-ring-one" /><div className="loader-ring loader-ring-two" />
        <span className="loader-z">Z</span>
      </div>
      <div className="loader-copy"><b>ZORBIT</b><span>TECHNOLOGY / INITIALIZING</span></div>
      <div className="loader-bar"><span /></div>
    </div>
    <header className="site-header"><a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">Z</span><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? "nav open" : "nav"}><a href="#home" onClick={closeMenu}>Home</a><a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Portfolio</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" className="nav-cta" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a></nav></header>

    <main>
      <section id="home" className="hero section-shell"><NodeField /><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Abuja · Nigeria · Est. 2024</div><h1>Turning data into <em>decisions.</em><br />Building products<br />that work.</h1><p className="hero-lede">Data analytics, digital products, and research intelligence for teams ready to move with clarity.</p><div className="hero-actions"><a href="#contact" className="button button-primary">Work with us <ArrowUpRight size={17} /></a><a href="#work" className="button button-ghost">View our work <ChevronRight size={17} /></a></div></div><div className="hero-side"><span>01 / INTRODUCTION</span><p>We make the messy part usable.</p></div><div className="scroll-cue"><span /> Scroll to explore</div></section>

      <section ref={statsRef} className="stats-bar section-shell"><div className="section-kicker">WHY ZORBIT <span>///</span> THE SIGNAL</div><div className="stats-grid"><Stat value={68} suffix="+" label="Projects delivered" active={statsActive} /><Stat value={98} suffix="%" label="Client satisfaction" active={statsActive} /><Stat value={2} suffix="+" label="Years experience" active={statsActive} /></div></section>

      <section id="services" className="content-section section-shell"><div className="section-heading"><div><span className="section-index">02 / CAPABILITY</span><h2>Technology with<br /><span>an operating point.</span></h2></div><p>We pair analytical depth with practical execution. No theatre, no black boxes—just useful work that moves the brief forward.</p></div><div className="services-grid">{services.map(({ index, icon: Icon, title, text }) => <article className="service-card" key={title}><div className="card-top"><span>{index}</span><Icon size={25} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowUpRight size={18} /></a></article>)}</div></section>

      <section id="about" className="about-section section-shell"><div className="about-statement"><span className="section-index">03 / ABOUT ZORBIT</span><h2>Useful technology<br /><span>starts with listening.</span></h2><p>We are a Nigerian technology company for organisations that need better visibility, better digital experiences, and better decisions. Zorbit sits at the intersection of data, design, and delivery.</p><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div><div className="credential-card"><div className="credential-head"><ShieldCheck size={20} /><span>REGISTRATION / PROFILE</span></div><div className="credential-big">Built in<br /><strong>Abuja.</strong></div><dl><div><dt>Status</dt><dd>CAC Registered Business</dd></div><div><dt>Founded</dt><dd>2024</dd></div><div><dt>Reach</dt><dd>Nigeria + Remote</dd></div><div><dt>Focus</dt><dd>Data · Digital · Intelligence</dd></div></dl><div className="credential-seal"><Check size={15} /> VERIFIED OPERATOR</div></div></section>

      <section id="work" className="content-section portfolio-section section-shell"><div className="section-heading"><div><span className="section-index">04 / SELECTED WORK</span><h2>Evidence over<br /><span>empty promises.</span></h2></div><p>Selected work across public-sector visibility, mobility, and everyday digital commerce.</p></div><div className="portfolio-feature"><div className="portfolio-art"><img src="/manus-storage/zorbit-portfolio-grid_37f649cb.png" alt="Abstract orange data grid" /><span className="art-label">DATA / SYSTEM / 001</span></div><div className="project-list">{projects.map((project) => <article className="project" key={project.title}><span className="project-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div><ArrowUpRight className="project-arrow" size={20} /></article>)}</div></div></section>

      <section className="cert-section section-shell"><div><span className="section-index">05 / CREDENTIALS</span><h2>Always<br /><span>keep learning.</span></h2></div><div className="cert-list">{certifications.map((cert) => <div className="cert" key={cert}><Sparkles size={16} /><span>{cert}</span><Check size={16} /></div>)}</div></section>

      <section className="contact-section section-shell" id="contact"><div className="contact-copy"><span className="section-index">06 / NEXT MOVE</span><h2>Ready to work<br /><em>with Zorbit?</em></h2><p>Bring us the messy part. We’ll make it usable.</p></div><div className="contact-panel"><div className="contact-line"><Mail size={19} /><a href="mailto:hello@zorbittechnology.com">hello@zorbittechnology.com</a></div><div className="contact-line"><span className="whatsapp-icon">WA</span><a href="https://wa.me/message/46GKY26SZUWDL1" target="_blank" rel="noreferrer">Message us on WhatsApp</a></div><div className="contact-note">Tell us what you are trying to make clearer, faster, or more useful. We’ll take it from there.</div></div></section>
    </main>

    <footer className="footer section-shell"><a className="brand" href="#home"><span className="brand-mark">Z</span><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><div className="footer-meta"><span>© 2026 Zorbit Technology</span><span>CAC Registered · Abuja, Nigeria</span></div><div className="socials"><a href="mailto:hello@zorbittechnology.com" aria-label="Email"><Mail size={17} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#home" aria-label="X"><XIcon size={17} /></a></div></footer>
  </div>;
}
