/** Signal Foundry page: charcoal editorial field, orange signal rules, left-anchored company narrative. */
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Network, ShieldCheck } from "lucide-react";

const principles = [
  ["01", "Clarity before complexity", "We start by understanding the decision, operation, or audience that needs to move forward."],
  ["02", "Evidence over assumption", "We use data, research, and practical testing to make the next step more defensible."],
  ["03", "Useful by design", "Every dashboard, website, and software product is shaped around real people doing real work."],
  ["04", "Build for the next move", "We create systems that can keep helping after the first delivery is complete."],
];

export default function AboutUs() {
  return <div className="about-page">
    <header className="subpage-header"><a className="brand" href="/"><img className="brand-mark" src="/manus-storage/zorbit-mark_5e4a6e4a.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><nav className="subpage-nav"><a href="/">Home</a><a href="/#services">Services</a><a href="/#work">Portfolio</a><a href="/about" aria-current="page">About Us</a><a className="nav-cta" href="/#contact">Contact <ArrowUpRight size={15} /></a></nav></header>
    <main>
      <section className="about-page-hero section-shell"><div className="subpage-nodefield" aria-hidden="true"><i /><i /><i /><i /><i /><b /><b /><b /></div><div className="page-return"><ArrowLeft size={15} /><a href="/">Back to home</a></div><span className="section-index">ABOUT US / 01</span><div className="about-page-intro"><h1>Technology that<br /><span>moves the work.</span></h1><p>Zorbit Technology is a Nigerian technology company built for teams, institutions, entrepreneurs, and individuals who need a clearer operating picture and a more useful digital presence.</p></div><div className="about-page-signal"><Network size={21} /><span>ABUJA / NIGERIA</span><i /><span>CAC REGISTERED</span></div></section>

      <section className="company-story section-shell"><div className="story-rule"><span>OUR OPERATING POINT</span><b>01</b></div><div className="company-story-grid"><div><h2>From scattered<br /><span>inputs to useful systems.</span></h2></div><div className="company-story-copy"><p>Zorbit combines data analytics, visualization, websites, applications, research, and business software to help people see what matters and act on it. We work where information is fragmented, processes are unclear, or a digital idea needs a dependable path to launch.</p><p>Our work is deliberately practical. A website should earn trust. A dashboard should improve a decision. An application should make a task easier. We bring these disciplines together so that technology becomes an operating advantage rather than another layer of noise.</p><div className="company-metrics"><div><strong>DATA</strong><span>Insight &amp; visualization</span></div><div><strong>DIGITAL</strong><span>Websites &amp; applications</span></div><div><strong>SYSTEMS</strong><span>Software &amp; workflow</span></div></div></div></div></section>

      <section className="principles-section section-shell"><div className="principles-heading"><span className="section-index">HOW WE WORK / 02</span><h2>Built for the<br /><span>next move.</span></h2></div><div className="principles-list">{principles.map(([number, title, copy]) => <article className="principle" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Check size={17} /></article>)}</div></section>

      <section className="company-cta section-shell"><div><span className="section-index">THE PEOPLE BEHIND THE WORK / 03</span><h2>Meet the founder<br /><em>behind Zorbit.</em></h2></div><div><p>Learn more about the technical perspective, education, and mission that shape the company’s approach.</p><a className="button button-primary" href="/founder">Meet Musa Mubarak <ArrowUpRight size={17} /></a></div></section>
    </main>
    <footer className="subpage-footer section-shell"><a className="brand" href="/"><img className="brand-mark" src="/manus-storage/zorbit-mark_5e4a6e4a.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><span>© 2026 Zorbit Technology · Abuja, Nigeria</span><a href="/#contact">Start a conversation <ChevronRight size={15} /></a></footer>
  </div>;
}
