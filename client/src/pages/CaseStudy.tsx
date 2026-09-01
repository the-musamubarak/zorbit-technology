/** Signal Foundry page: dedicated project case studies, reusing the About/Founder page shell. */
import { ArrowLeft, ArrowUpRight, Check, Network } from "lucide-react";
import { useParams } from "wouter";
import NotFound from "./NotFound";

type CaseStudyData = {
  slug: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  problem: string;
  approach: string;
  result: string;
  tools: string[];
  images?: { src: string; alt: string }[];
  liveUrl?: string;
  liveLabel?: string;
};

const caseStudies: CaseStudyData[] = [
  {
    slug: "writers-support-services",
    eyebrow: "CASE STUDY / ACADEMIC SERVICES",
    title: ["From scattered enquiries", "to a clear front door."],
    intro: "Writers Support Services helps researchers move through academic services — but before this build, that help started with a DM, not a destination.",
    problem: "Enquiries about Writers Support Services' offerings arrived scattered — through direct messages, word of mouth, and one-off conversations. There was no single place a prospective client could go to see what services existed, what a workshop involved, or how to actually start.",
    approach: "We built a website structured around how a researcher actually moves through the service: discover what's offered, browse resources, and register for a workshop, without needing to ask first. The information architecture was shaped around three distinct entry points — service discovery, the resource store, and workshop registration — so each visitor lands on the path that matches what they came for.",
    result: "Writers Support Services now has one canonical destination they can point every enquiry, social post, and referral to. Visitors can move from browsing to booking on their own, instead of the process depending on a reply.",
    tools: ["Website build", "Resource store", "Workshop registration flow"],
    liveUrl: "https://writerssupportservices.com/",
    liveLabel: "Visit the live website",
  },
  {
    slug: "universal-skill-academy",
    eyebrow: "CASE STUDY / SKILLS DEVELOPMENT",
    title: ["Giving a national mission", "a single home."],
    intro: "Universal Skill Academy's mission spans learners, institutions, and partners — three audiences that each needed a different reason to act.",
    problem: "As a national skills-development initiative, Universal Skill Academy's mission, programme structure, and partnership pathways lived across scattered materials. A young person looking for a programme, an institution weighing a partnership, and a collaborator evaluating the campaign each needed different information — and none of it lived in one place.",
    approach: "We built a website organised around those three audiences rather than a single generic message: clear programme discovery for learners, a defined campaign narrative for visibility, and a straightforward path to partnership for institutions and collaborators. Every section carries its own call to action instead of funnelling everyone toward the same generic 'contact us.'",
    result: "Universal Skill Academy now has one hub that carries its mission and programme structure consistently, with each audience able to find their own next step instead of one message trying to serve everyone at once.",
    tools: ["Website build", "Programme discovery", "Campaign CTA"],
    liveUrl: "https://universalskillacademy.com/",
    liveLabel: "Visit the live website",
  },
  {
    slug: "inventory-software",
    eyebrow: "CASE STUDY / BUSINESS SOFTWARE",
    title: ["Turning memory and notebooks", "into one operating view."],
    intro: "A growing retail and communications business was tracking stock, sales, and customer debt the way most small businesses start out — across notebooks, memory, and whoever was on shift.",
    problem: "Stock position, daily sales, and outstanding customer debt were spread across notebooks, informal records, and staff memory. Reconciling what was actually owed, what was in stock, or who had access to what took reconstruction after the fact rather than a quick look.",
    approach: "We built a dedicated desktop system designed to work reliably without depending on a steady internet connection — a real constraint for a business that can't afford downtime over a network issue. It covers role-based staff access, category management, debt tracking against customers, and an audit trail of stock movement, so the business has one operating view instead of several partial ones.",
    result: "The business can now check stock position, sales movement, and outstanding debt in one place, with a record of who did what and when — replacing after-the-fact reconstruction with a live view.",
    tools: ["Inventory control", "Debt tracking", "Business reporting"],
    images: [
      { src: "/images/inventory-app-dashboard.png", alt: "Inventory software dashboard showing sales, receivables, stock value and product signals" },
      { src: "/images/inventory-app-reports.png", alt: "Inventory software reporting view showing revenue, profit, sales, and returns" },
      { src: "/images/inventory-app-users.png", alt: "Inventory software user management view" },
    ],
  },
];

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) return <NotFound />;

  return <div className="about-page">
    <header className="subpage-header"><a className="brand" href="/"><img className="brand-mark" src="/images/logo-mark.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><nav className="subpage-nav"><a href="/">Home</a><a href="/#work">Portfolio</a><a href="/about">About Us</a><a className="nav-cta" href="/#contact">Contact <ArrowUpRight size={15} /></a></nav></header>
    <main>
      <section className="about-page-hero section-shell"><div className="subpage-nodefield" aria-hidden="true"><i /><i /><i /><i /><i /><b /><b /><b /></div><div className="page-return"><ArrowLeft size={15} /><a href="/#work">Back to portfolio</a></div><span className="section-index">{study.eyebrow}</span><div className="about-page-intro"><h1>{study.title[0]}<br /><span>{study.title[1]}</span></h1><p>{study.intro}</p></div><div className="about-page-signal"><Network size={21} /><span>{study.tools.join(" · ")}</span></div></section>

      <section className="company-story section-shell"><div className="story-rule"><span>THE PROBLEM</span><b>01</b></div><div className="company-story-grid"><div><h2>Where things<br /><span>were breaking down.</span></h2></div><div className="company-story-copy"><p>{study.problem}</p></div></div></section>

      <section className="company-story section-shell"><div className="story-rule"><span>OUR APPROACH</span><b>02</b></div><div className="company-story-grid"><div><h2>How we<br /><span>built the fix.</span></h2></div><div className="company-story-copy"><p>{study.approach}</p></div></div></section>

      {study.images && <section className="principles-section section-shell" style={{ display: "block" }}><div className="principles-heading"><span className="section-index">A CLOSER LOOK / 03</span><h2>What it looks<br /><span>like in use.</span></h2></div><div className="project-proof-gallery case-study-gallery" aria-label="Screenshots">{study.images.map((image) => <a href={image.src} target="_blank" rel="noreferrer" key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /></a>)}</div></section>}

      <section className="company-story section-shell"><div className="story-rule"><span>THE RESULT</span><b>{study.images ? "04" : "03"}</b></div><div className="company-story-grid"><div><h2>What changed<br /><span>for the client.</span></h2></div><div className="company-story-copy"><p>{study.result}</p><div className="company-metrics">{study.tools.map((tool) => <div key={tool}><strong>USED</strong><span>{tool}</span></div>)}</div></div></div></section>

      <section className="company-cta section-shell"><div><span className="section-index">NEXT MOVE</span><h2>Have something<br /><em>similar to build?</em></h2></div><div><p>{study.liveUrl ? "See the live result, or tell us what you're trying to make clearer, faster, or more useful." : "Tell us what you are trying to make clearer, faster, or more useful — we'll take it from there."}</p>{study.liveUrl ? <a className="button button-primary" href={study.liveUrl} target="_blank" rel="noreferrer">{study.liveLabel} <ArrowUpRight size={17} /></a> : <a className="button button-primary" href="/#contact">Start a conversation <ArrowUpRight size={17} /></a>}</div></section>
    </main>
    <footer className="subpage-footer section-shell"><a className="brand" href="/"><img className="brand-mark" src="/images/logo-mark.png" alt="Zorbit Technology logo" /><span><b>ZORBIT</b><small>TECHNOLOGY</small></span></a><span>© 2026 Zorbit Technology · Serving clients nationwide</span><a href="/#contact">Start a conversation <Check size={15} /></a></footer>
  </div>;
}
