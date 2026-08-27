// Signal Foundry: editorial dark-tech landing page with orange signal accents, asymmetry, and restrained motion.
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronLeft,
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
  Star,
  X,
  XIcon,
} from "lucide-react";

const ORANGE = "#E8571A";

const services = [
  { index: "01", icon: BarChart3, title: "Data Analytics & Power BI", text: "Interactive dashboards, KPI reporting, and DAX models that give teams a clearer operating picture." },
  { index: "02", icon: Code2, title: "Websites, Apps & Software", text: "Company websites, personal portfolios, custom web apps, and business software designed to do real work." },
  { index: "03", icon: Search, title: "Research & Analytical Briefs", text: "Verified data reports, policy briefs, and insight documents that turn evidence into direction." },
  { index: "04", icon: Network, title: "Tech Training & Consulting", text: "Practical Python, SQL, and Power BI instruction paired with hands-on technology advisory." },
];

const projects = [
  { number: "01", title: "Writers Support Services", tools: ["Website build", "Resource store", "Workshop flow"], text: "An academic-services platform that gives researchers a clearer route from service discovery to consultation, resource access, and workshop registration.", href: "https://writerssupportservices.com/", linkLabel: "Visit live website" },
  { number: "02", title: "Universal Skill Academy", tools: ["Website build", "Programme discovery", "Campaign CTA"], text: "A national skills-development website that makes mission, programmes, campaign information, and partnership pathways clear for young people, institutions, and collaborators.", href: "https://universalskillacademy.com/", linkLabel: "Visit live website" },
  { number: "03", title: "Inventory & Debt Tracking Software", tools: ["Inventory control", "Debt tracking", "Business reporting"], text: "A single operating view that helps a client see stock position, sales movement, outstanding debt, staff access, and daily records before they become leaks.", images: [{ src: "/manus-storage/inventory-dashboard_4f3551dc.png", alt: "Inventory software dashboard showing sales, receivables, stock value and product signals" }, { src: "/manus-storage/inventory-reports_79757210.png", alt: "Inventory software reporting view showing revenue, profit, sales, and returns" }, { src: "/manus-storage/inventory-users_c2305533.png", alt: "Inventory software user management view" }] },
  { number: "04", title: "NITDA Digital File Tracking Dashboard", tools: ["Power BI", "DAX", "Python"], text: "A usable audit trail that helps teams see file movement, bottlenecks, and operational throughput with less guesswork.", href: "https://app.powerbi.com/view?r=eyJrIjoiYzQ3MTAyODMtY2NjNC00YjBmLWFiNDAtZjhmMmQzODYxNTFlIiwidCI6ImJiODFhNDdjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9", linkLabel: "View Power BI dashboard" },
  { number: "05", title: "Nigerian Road Traffic Crashes Dashboard", tools: ["Power BI", "NBS/FRSC data", "Visual reporting"], text: "A decision view that surfaces crash patterns in a form stakeholders can compare, interpret, and act on." },
  { number: "06", title: "TopUp Hub VTU Application", tools: ["React", "Supabase", "Paystack"], text: "A dependable operating flow for everyday digital top-ups and payments, designed to keep customer actions clear and moving." },
];

const certifications = ["Microsoft Power BI Data Analyst", "Google Data Analytics", "Microsoft Full-Stack Developer", "NITDA Data Analytics Associate"];

const dashboardShowcase = [
  { number: "01", title: "Insurance Dashboard", caption: "An operating view for reading insurance performance and portfolio activity in one place.", tools: ["Power BI", "DAX", "Power Query"], image: "/manus-storage/insurance-dashboard_1efc6c96.png", href: "https://app.powerbi.com/view?r=eyJrIjoiYzQ0YjdkZTgtMjExNi00MjU0LTk0YzYtMmM2MDhmYmU1ZGM0IiwidCI6ImJiODFhNDdjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9&embedImagePlaceholder=true&pageName=732b15e505165348cb75" },
  { number: "02", title: "NITDA Dashboard", caption: "A clearer data view for monitoring digital-file activity, operational movement, and programme visibility.", tools: ["Power BI", "DAX", "Python"], image: "/manus-storage/nitda-dashboard_726ea4af.png", href: "https://app.powerbi.com/view?r=eyJrIjoiYzQ3MTAyODMtY2NjNC00YjBmLWFiNDAtZjhmMmQzODYxNTFlIiwidCI6ImJiODFhNDdjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9" },
  { number: "03", title: "UK Accident Dashboard", caption: "A decision view that surfaces road-incident patterns, trends, and priority signals for faster interpretation.", tools: ["Power BI", "DAX", "Power Query"], image: "/manus-storage/uk-accident-dashboard_62038ca2.png", href: "https://app.powerbi.com/view?r=eyJrIjoiMDU3MDAxOGItYjg1MS00NDQ5LTkyNGYtMGRkM2U0MThhOWFhIiwidCI6ImJiODFhNDdjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9" },
  { number: "04", title: "Supermarket Dashboard", caption: "A compact commercial view of sales movement, category performance, and day-to-day retail activity.", tools: ["Power BI", "DAX", "Data Modelling"], image: "/manus-storage/supermarket-dashboard_1d45ef67.png", href: "https://app.powerbi.com/view?r=eyJrIjoiMmI2OTgxZDAtNmVkMi00YTNmLTk3MWMtNjgwZTRlYjM3MWI2IiwidCI6ImJiODFhNDdjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9" },
  { number: "05", title: "Fitness Dashboard", caption: "A visual evidence board for tracking fitness and performance indicators in a usable reporting format.", tools: ["Power BI", "DAX", "Power Query"], image: "/manus-storage/fitness-dashboard_57039e84.png", href: "https://app.powerbi.com/view?r=eyJrIjoiZDc2ZTg3ZmYtYTMyYi00ODkxLTgxMzgtNGIyODAwOGVmOWJlIiwidCI6ImJiODFhNDcjLTJiMzMtNGVkOC05NGZlLTgwM2YwYmJiZjE0OSJ9" },
];

const featuredWebsites = [
  { label: "LIVE WEBSITE / WSS-001", title: "Writers Support Services website preview", image: "/manus-storage/writers-support-services-preview_12802ee6.webp", href: "https://writerssupportservices.com/" },
  { label: "LIVE WEBSITE / USA-002", title: "Universal Skill Academy website preview", image: "/manus-storage/universal-skill-academy-preview_72ca1cd4.webp", href: "https://universalskillacademy.com/" },
];

const testimonials = [
  { name: "Aisha Bello", initials: "AB", role: "Business Owner", avatar: "avatar-sunset", quote: "Working with Zorbit made the whole process much easier than I expected. They took time to understand what I actually needed and delivered a professional website that clearly represents my business. Communication was also straightforward throughout the project.", caseStudy: { href: "#website-case-studies", label: "Read website case study" } },
  { name: "Chinedu Okafor", initials: "CO", role: "Operations Manager", avatar: "avatar-teal", quote: "We needed a better way to understand our business data instead of working with scattered spreadsheets. Zorbit helped us turn the information into a dashboard that is easy to understand and actually useful for decision-making. The results were practical, not unnecessarily complicated.", caseStudy: { href: "#dashboard-case-studies", label: "Read dashboard case study" } },
  { name: "Fatima Ibrahim", initials: "FI", role: "Entrepreneur", avatar: "avatar-violet", quote: "I appreciate the level of professionalism and patience Zorbit brought to my project. They explained the process clearly and made sure the final website was easy for my customers to use. The service felt affordable compared to the value delivered.", caseStudy: { href: "#website-case-studies", label: "Read website case study" } },
  { name: "Tunde Adeyemi", initials: "TA", role: "Business Consultant", avatar: "avatar-sky", quote: "Zorbit helped us develop a digital solution that simplified part of our workflow. What stood out for me was their focus on understanding the problem first instead of immediately jumping into development. The final product was clean and functional." },
  { name: "Blessing Nwosu", initials: "BN", role: "Small Business Owner", avatar: "avatar-rose", quote: "I had been putting off creating a proper online presence because I thought it would be too expensive and complicated. Zorbit made the process simple and delivered something professional that I am genuinely proud to share with my customers.", caseStudy: { href: "#website-case-studies", label: "Read website case study" } },
  { name: "Ibrahim Musa", initials: "IM", role: "Inventory Manager", avatar: "avatar-lime", quote: "The inventory software developed for us helped bring more structure to how we track our products and records. The team listened to our requirements and made adjustments where necessary. It has made day-to-day management much easier.", caseStudy: { href: "#inventory-case-study", label: "Read inventory case study" } },
  { name: "Esther Williams", initials: "EW", role: "Research & Development Professional", avatar: "avatar-gold", quote: "Zorbit's approach to data was refreshing. They didn't just create charts—they helped organise the information in a way that made the findings easier to communicate and understand. The dashboard was clear, professional, and useful for presenting insights to stakeholders.", caseStudy: { href: "#dashboard-case-studies", label: "Read dashboard case study" } },
];

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
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setIsLoading(false), 1350);
    return () => window.clearTimeout(loaderTimer);
  }, []);
  useEffect(() => {
    setShowPrivacyNotice(window.localStorage.getItem("zorbit-privacy-notice") !== "acknowledged");
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsActive(true); }, { threshold: 0.35 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const acknowledgePrivacyNotice = () => {
    window.localStorage.setItem("zorbit-privacy-notice", "acknowledged");
    setShowPrivacyNotice(false);
  };
  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const detail = [
      `Name: ${formData.get("name")}`,
      `Business: ${formData.get("business") || "Not specified"}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || "Not specified"}`,
      `Service needed: ${formData.get("service")}`,
      "",
      "Project details:",
      `${formData.get("details")}`,
    ].join("\n");
    window.location.href = `mailto:hello@zorbittechnology.com?subject=${encodeURIComponent("New Zorbit project inquiry")}&body=${encodeURIComponent(detail)}`;
    setInquirySubmitted(true);
  };
  const updateActiveTestimonial = () => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const nearestIndex = cards.reduce((closestIndex, card, index) => Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[closestIndex].offsetLeft - track.scrollLeft) ? index : closestIndex, 0);
    setActiveTestimonial(nearestIndex);
  };
  const goToTestimonial = (index: number) => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const nextIndex = (index + testimonials.length) % testimonials.length;
    const card = track.children.item(nextIndex) as HTMLElement | null;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveTestimonial(nextIndex);
  };

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
    <header className="site-header"><a className="brand" href="#home" onClick={closeMenu}><img className="brand-mark" src="/manus-storage/zorbit-mark_5e4a6e4a.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? "nav open" : "nav"}><a href="#home" onClick={closeMenu}>Home</a><a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Portfolio</a><a href="/about" onClick={closeMenu}>About</a><a href="#contact" className="nav-cta" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a></nav></header>

    <main>
      <section id="home" className="hero section-shell"><NodeField /><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Nationwide · Accessible technology · Est. 2024</div><h1>Turning data into <em>decisions.</em><br />Building products<br />that work.</h1><p className="hero-lede">Data analysis, visualization, websites, apps, and software for SMEs and businesses that need practical solutions at an affordable price.</p><div className="hero-actions"><a href="#contact" className="button button-primary">Work with us <ArrowUpRight size={17} /></a><a href="#work" className="button button-ghost">View our work <ChevronRight size={17} /></a></div></div><div className="hero-side"><span>01 / INTRODUCTION</span><p>Useful technology should be within reach.</p></div><div className="scroll-cue"><span /> Scroll to explore</div></section>

      <section className="brand-banner" aria-label="Zorbit Technology website and software capabilities"><div className="brand-banner-mark"><img src="/manus-storage/zorbit-mark_5e4a6e4a.png" alt="" /></div><div className="brand-banner-name"><span>ACCESSIBLE DIGITAL SERVICES</span><strong>Practical support for growing businesses</strong></div><p>Data analysis <i /> Data visualization <i /> Websites &amp; apps <i /> Business software</p><a href="#work" aria-label="Explore Zorbit technology projects"><ArrowUpRight size={21} /></a></section>

      <section ref={statsRef} className="stats-bar section-shell"><div className="section-kicker">WHY ZORBIT <span>///</span> THE SIGNAL</div><div className="stats-grid"><Stat value={68} suffix="+" label="Projects delivered" active={statsActive} /><Stat value={98} suffix="%" label="Client satisfaction" active={statsActive} /><Stat value={2} suffix="+" label="Years experience" active={statsActive} /></div></section>

      <section id="services" className="content-section section-shell"><div className="section-heading"><div><span className="section-index">02 / CAPABILITY</span><h2>Technology with<br /><span>an operating point.</span></h2></div><p>From a clear dashboard to a credible website or business tool, we make useful digital services accessible to SMEs, businesses, and individuals nationwide.</p></div><div className="services-grid">{services.map(({ index, icon: Icon, title, text }) => <article className="service-card" key={title}><div className="card-top"><span>{index}</span><Icon size={25} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowUpRight size={18} /></a></article>)}</div></section>

      <section id="dashboard-case-studies" className="dashboard-showcase section-shell" aria-labelledby="dashboard-showcase-title"><div className="dashboard-heading"><div><span className="section-index">03 / DATA EVIDENCE</span><h2 id="dashboard-showcase-title">Dashboards that<br /><span>make the signal useful.</span></h2></div><p>Selected Power BI work showing how dense information can become an operating view for teams, institutions, and businesses.</p></div><div className="dashboard-grid">{dashboardShowcase.map((dashboard) => <article className="dashboard-card" key={dashboard.title}><a className="dashboard-image" href={dashboard.href} target="_blank" rel="noreferrer" aria-label={`Open ${dashboard.title} in Power BI`}><img src={dashboard.image} alt={`${dashboard.title} preview`} loading="lazy" /><span>OPEN DASHBOARD <ArrowUpRight size={15} /></span><div className="dashboard-tools" aria-label={`Tools used: ${dashboard.tools.join(", ")}`}><small>TOOLS USED</small><div>{dashboard.tools.map((tool) => <b key={tool}>{tool}</b>)}</div></div></a><div className="dashboard-copy"><span>{dashboard.number} / POWER BI</span><h3>{dashboard.title}</h3><p>{dashboard.caption}</p><a href={dashboard.href} target="_blank" rel="noreferrer">View dashboard <ArrowUpRight size={14} /></a></div></article>)}</div></section>

      <section id="about" className="about-section section-shell"><div className="about-statement"><span className="section-index">04 / ABOUT ZORBIT</span><h2>Useful technology<br /><span>starts with access.</span></h2><div className="about-profile"><div className="profile-role">COMPANY / OPERATING PRINCIPLE</div><h3>Clarity is<br />the product.</h3><p className="profile-specialism">Data · Digital products · Useful systems</p></div><p>Zorbit is a technology company built to make data and digital tools more accessible to SMEs, businesses, and individuals across all states. We combine data, design, and delivery to help clients move from scattered inputs to practical next steps—without pricing useful technology out of reach.</p><p>Our mission is to offer clear, reliable services at fair and affordable prices. Our work begins with the operating point: the decision to improve, the process to simplify, the audience to reach, or the opportunity to make usable. From there, we build with evidence, clarity, and a focus on what will keep working after launch.</p><div className="about-signals"><span>AFFORDABLE ACCESS</span><span>SMES &amp; BUSINESSES</span><span>NATIONWIDE DELIVERY</span></div><div className="about-links"><a className="text-link" href="/about">About Zorbit <ArrowUpRight size={16} /></a><a className="text-link text-link-muted" href="/founder">Meet the founder <ArrowUpRight size={16} /></a></div></div><div className="credential-card"><div className="credential-head"><ShieldCheck size={20} /><span>COMPANY / PROFILE</span></div><div className="credential-big">Built for<br /><strong>access.</strong></div><dl><div><dt>Status</dt><dd>CAC Registered Business</dd></div><div><dt>Founded</dt><dd>2024</dd></div><div><dt>Focus</dt><dd>Data · Digital · Intelligence</dd></div><div><dt>Reach</dt><dd>All States + Remote</dd></div></dl><div className="credential-seal"><Check size={15} /> VERIFIED OPERATOR</div></div></section>

      <section id="work" className="content-section portfolio-section section-shell"><div className="section-heading"><div><span className="section-index">05 / SELECTED WORK</span><h2>Evidence over<br /><span>empty promises.</span></h2></div><p>Every project is framed as proof of a clearer decision, cleaner operation, or more usable system—across academic services, company websites, business software, and digital commerce.</p></div><div className="portfolio-feature"><div id="website-case-studies" className="portfolio-art">{featuredWebsites.map((website) => <a className="portfolio-website" href={website.href} target="_blank" rel="noreferrer" key={website.label} aria-label={`Visit ${website.title}`}><img src={website.image} alt={website.title} loading="lazy" /><span className="art-label">{website.label} <ArrowUpRight size={13} /></span></a>)}</div><div className="project-list">{projects.map((project) => <article id={project.title === "Inventory & Debt Tracking Software" ? "inventory-case-study" : undefined} className="project" key={project.title}><span className="project-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div>{project.images && <div className="project-proof-gallery" aria-label="Inventory software screenshots">{project.images.map((image) => <a href={image.src} target="_blank" rel="noreferrer" key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /></a>)}</div>}{project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={14} /></a>}</div>{project.href ? <a href={project.href} className="project-arrow" target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight size={20} /></a> : <ArrowUpRight className="project-arrow" size={20} />}</article>)}</div></div></section>

      <section className="cert-section section-shell"><div><span className="section-index">06 / CREDENTIALS</span><h2>Always<br /><span>keep learning.</span></h2></div><div className="cert-list">{certifications.map((cert) => <div className="cert" key={cert}><Sparkles size={16} /><span>{cert}</span><Check size={16} /></div>)}</div></section>

      <section className="feedback-section section-shell"><div className="feedback-heading"><span className="section-index">07 / CLIENT FEEDBACK</span><h2>Real work deserves<br /><span>real words.</span></h2><p>Feedback shared by clients who have worked with Zorbit across websites, dashboards, digital solutions, and business systems.</p></div><div className="feedback-body"><div className="testimonial-carousel" aria-roledescription="carousel" aria-label="Client testimonials"><div ref={testimonialTrackRef} className="testimonial-grid" onScroll={updateActiveTestimonial}>{testimonials.map((testimonial, index) => <article className="testimonial-card" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}: ${testimonial.name}`} key={testimonial.name}><div className="review-rating" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} size={12} fill="currentColor" />)}</div><Quote className="testimonial-quote" size={20} /><blockquote>“{testimonial.quote}”</blockquote><div className="testimonial-author"><div className={`testimonial-avatar ${testimonial.avatar}`} aria-hidden="true">{testimonial.initials}</div><footer><b>{testimonial.name}</b><span>{testimonial.role}</span></footer></div>{testimonial.caseStudy && <a className="testimonial-case-study" href={testimonial.caseStudy.href}>{testimonial.caseStudy.label} <ArrowUpRight size={14} /></a>}</article>)}</div><div className="testimonial-controls" aria-label="Testimonial carousel controls"><button type="button" onClick={() => goToTestimonial(activeTestimonial - 1)} aria-label="Previous testimonial"><ChevronLeft size={17} /></button><div className="testimonial-dots">{testimonials.map((testimonial, index) => <button type="button" key={testimonial.name} className={index === activeTestimonial ? "is-active" : ""} onClick={() => goToTestimonial(index)} aria-label={`Show testimonial ${index + 1}: ${testimonial.name}`} aria-current={index === activeTestimonial ? "true" : undefined} />)}</div><button type="button" onClick={() => goToTestimonial(activeTestimonial + 1)} aria-label="Next testimonial"><ChevronRight size={17} /></button></div></div><div className="feedback-prompt"><Quote size={22} /><h3>Worked with Zorbit?</h3><p>Share the outcome in your own words. We only publish feedback shared by real clients and approved for public use.</p><a className="text-link" href="mailto:hello@zorbittechnology.com?subject=Zorbit%20client%20feedback">Share verified feedback <ArrowUpRight size={16} /></a></div></div></section>

      <section className="contact-section section-shell" id="contact"><div className="contact-copy"><span className="section-index">08 / NEXT MOVE</span><h2>Ready to work<br /><em>with Zorbit?</em></h2><p>Bring us the messy part. We’ll make it usable.</p></div><div className="contact-panel"><div className="contact-line"><Mail size={19} /><a href="mailto:hello@zorbittechnology.com">hello@zorbittechnology.com</a></div><div className="contact-line"><span className="whatsapp-icon">WA</span><a href="https://wa.me/message/46GKY26SZUWDL1" target="_blank" rel="noreferrer">Message us on WhatsApp</a></div><div className="contact-note">Tell us what you are trying to make clearer, faster, or more useful. We’ll take it from there.</div></div></section>

      <section className="inquiry-section section-shell" id="inquiry" aria-labelledby="inquiry-title"><div className="inquiry-heading"><span className="section-index">09 / PROJECT INQUIRY</span><h2 id="inquiry-title">Tell us what<br /><span>you need to move.</span></h2><p>Whether you are building a first website, need a clearer dashboard, or want a tool for daily operations, start with a short brief. We work with SMEs, businesses, and individuals nationwide.</p></div><form className="inquiry-form" onSubmit={handleInquirySubmit}><div className="inquiry-form-top"><span>PROJECT BRIEF</span><i>Required fields *</i></div><div className="inquiry-fields"><label>Full name *<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label><label>Business or organisation<input name="business" type="text" autoComplete="organization" placeholder="Business name" /></label><label>Email address *<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label><label className="field-wide">What do you need? *<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option value="Data analysis or dashboard">Data analysis or dashboard</option><option value="Website or web application">Website or web application</option><option value="Business software">Business software</option><option value="Research or consulting">Research or consulting</option><option value="Training">Training</option><option value="Not sure yet">Not sure yet</option></select></label><label className="field-wide">Tell us about the project *<textarea name="details" required rows={4} placeholder="What is the problem, what would success look like, and when do you hope to start?" /></label></div><div className="inquiry-submit"><p>Submitting opens your email app with the completed brief. You can also contact us directly on WhatsApp.</p><button type="submit" className="button button-primary">Send project inquiry <ArrowUpRight size={17} /></button></div>{inquirySubmitted && <p className="inquiry-status" role="status">Your email app should now be open with your project brief. If it did not open, use the WhatsApp option above.</p>}</form></section>
    </main>

    <footer className="footer section-shell"><a className="brand" href="#home"><img className="brand-mark" src="/manus-storage/zorbit-mark_5e4a6e4a.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><div className="footer-meta"><span>© 2026 Zorbit Technology</span><span>CAC Registered · Serving clients nationwide</span></div><div className="socials"><a href="mailto:hello@zorbittechnology.com" aria-label="Email"><Mail size={17} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#home" aria-label="X"><XIcon size={17} /></a></div></footer>
    {showPrivacyNotice && <aside className="privacy-notice" aria-label="Cookie and privacy notice"><div className="privacy-signal"><span>PRIVACY</span><i /></div><p>We only store your acknowledgement in this browser. No non-essential cookies are used in this version of the site.</p><a href="mailto:hello@zorbittechnology.com?subject=Privacy%20enquiry">Privacy enquiry</a><button type="button" onClick={acknowledgePrivacyNotice}>Understood <Check size={15} /></button></aside>}
  </div>;
}
