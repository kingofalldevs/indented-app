"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  ArrowRight,
  Plus,
  ShieldCheck,
  Zap,
  Flame,
  Award,
  Users,
  Sparkles
} from "lucide-react";

// List of 20 directories you can launch into
const DIRECTORIES = [
  { id: "saashub", name: "SaaSHub", category: "SaaS Alternatives", description: "The independent software marketplace helping you discover new tools and high-authority alternative listings.", domain: "saashub.com" },
  { id: "uneed", name: "Uneed", category: "Tool Discovery", description: "A highly-curated directory showcasing the best and most useful startup tools and creator resources.", domain: "uneed.best" },
  { id: "alternativeto", name: "AlternativeTo", category: "Software Search", description: "The definitive crowdsourced search engine for finding free, paid, or open-source software alternatives.", domain: "alternativeto.net" },
  { id: "producthunt", name: "Product Hunt", category: "SaaS Launchpad", description: "The premier global discovery platform for new technology products, web apps, and tech creations.", domain: "producthunt.com" },
  { id: "betalist", name: "BetaList", category: "Early Stage", description: "Providing early adopters and founders a place to launch, gather feedback, and build initial pre-launch audiences.", domain: "betalist.com" },
  { id: "appsumo", name: "AppSumo", category: "Software Deals", description: "The largest digital marketplace for software deals, helping startups scale with lifetime tech stack offers.", domain: "appsumo.com" },
  { id: "startupbase", name: "Startup Base", category: "Founder Community", description: "A professional platform for tech founders to share their software, gain early adopters, and track growth.", domain: "startupbase.io" },
  { id: "startuppitch", name: "Startup Pitch", category: "Media & Reviews", description: "Pitch your startup directly to tech journalists, developers, and early adopters to secure first reviews.", domain: "startuppitch.co" },
  { id: "pitchwall", name: "PitchWall", category: "Discovery Hub", description: "A beautiful, interactive wall-based showcase designed to put newly launched tools in front of investors.", domain: "pitchwall.co" },
  { id: "stackshare", name: "StackShare", category: "Tech Stack Index", description: "Allows developers and founders to share, explore, and analyze the technology stacks of leading software brands.", domain: "stackshare.io" },
  { id: "g2", name: "G2 Crowd", category: "Software Reviews", description: "The global gold-standard platform for peer-to-peer business software reviews and enterprise comparisons.", domain: "g2.com" },
  { id: "capterra", name: "Capterra", category: "B2B Software", description: "A top-tier search engine and rating index helping businesses compare features and select software systems.", domain: "capterra.com" },
  { id: "sourceforge", name: "SourceForge", category: "Open Source Hub", description: "A massive open-source development and distribution directory attracting millions of active tech searchers.", domain: "sourceforge.net" },
  { id: "trustpilot", name: "Trustpilot", category: "Consumer Trust", description: "The world's most trusted and open review community, providing critical high-domain backlinks for SEO.", domain: "trustpilot.com" },
  { id: "killerstartups", name: "KillerStartups", category: "Startup Directory", description: "A dedicated review platform and pitch directory that reviews newly launched web ventures and apps.", domain: "killerstartups.com" },
  { id: "launchingnext", name: "Launching Next", category: "New Tech Index", description: "A curated digital catalog showcasing the newest startups, products, and online software solutions.", domain: "launchingnext.com" },
  { id: "indiehackers", name: "Indie Hackers", category: "Founder Community", description: "The primary community for developers and designers building highly profitable side-hustles and indie tools.", domain: "indiehackers.com" },
  { id: "hackernews", name: "Hacker News", category: "Tech Aggregator", description: "The premier social network and feed focused on computer science, entrepreneurship, and tech discussions.", domain: "news.ycombinator.com" },
  { id: "reddit", name: "Reddit (r/startups)", category: "Social Community", description: "An incredibly active discussions and review space for startup founders sharing advice, ideas, and feedback.", domain: "reddit.com" },
  { id: "devpost", name: "Devpost", category: "Developer Showcase", description: "The leading global platform for developer portfolios, hackathons, and innovative open-source software.", domain: "devpost.com" }
];

const TESTIMONIALS = [
  {
    quote: "I submitted to 20 directories in under 10 minutes. The backlinks started showing up within 48 hours. Absolutely worth it.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "James K.",
    role: "Founder, Mailblast.io"
  },
  {
    quote: "Every directory has different form fields. FastLaunch handled all of that automatically. Saved me at least 15 hours of tedious work.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Sofia R.",
    role: "Co-founder, Trackflow"
  },
  {
    quote: "Our domain authority jumped noticeably in the first month. This is the smartest $19 I've spent on early-stage growth.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Alex L.",
    role: "Indie Hacker, NoteSync"
  },
  {
    quote: "We went from zero backlinks to a domain authority of 22 in under a month. FastLaunch did all the heavy lifting.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    name: "Tyler D.",
    role: "Founder, DevFlow"
  },
  {
    quote: "Unbelievably simple to use. Just pasted our URL, clicked submit, and watched the entries get created.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Min-Ji K.",
    role: "Growth Lead, Synthetix"
  },
  {
    quote: "The automated Chrome extension worked like magic. It filled out forms on 20 sites with no errors. Absolute game changer.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
    name: "Oliver W.",
    role: "Indie Maker, Habitly"
  },
  {
    quote: "As a solo developer, launching is my least favorite part. FastLaunch saved me days of manual form filling.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Elena M.",
    role: "Creator, PeakFocus"
  },
  {
    quote: "Our Product Hunt launch was great, but the steady flow of high-quality backlinks from FastLaunch keeps our traffic growing daily.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    name: "Marcus L.",
    role: "Co-founder, ShipFast"
  },
  {
    quote: "Excellent customer support and extremely fast indexing. Saw the first directory approvals within 24 hours.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Sarah H.",
    role: "CMO, SaaSify"
  },
  {
    quote: "The pricing is incredibly fair. $19.90 saved me at least 20 hours of painful copy-pasting. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "David G.",
    role: "Indie Hacker, PromptBase"
  }
];

export default function Home() {
  // FAQ State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Indented FastLaunch speed up my SEO?",
      a: "By launching automatically to 20+ top-tier product directories, FastLaunch builds high-quality, relevant context backlinks to your domain. Search crawlers prioritize these verified directories, rapidly boosting your initial domain authority and indexing speed in minutes instead of months."
    },
    {
      q: "Which 20 directories are included in the launch?",
      a: "Our curated selection includes high-ranking platforms: SaaSHub, Uneed, AlternativeTo, Product Hunt, BetaList, AppSumo, StackShare, G2, Capterra, SourceForge, Trustpilot, Indie Hackers, Devpost, hacker communities, and relevant sub-directories tailored for premium reach."
    },
    {
      q: "Can I update my product details after submission?",
      a: "Absolutely. With our premium plans, you get lifetime sync utilities. If you pivot or update your screenshots, descriptions, or pricing on Indented FastLaunch, our API pushes synchronous updates across all connected directories automatically."
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes! If for any reason your startup submissions fail to index or go live on the designated platforms, we offer a full 100% money-back guarantee, no questions asked. We are a premium service committed to your success."
    }
  ];

  return (
    <>
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            INDENTED
          </a>

          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#directories" className="nav-link">Directories</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfuvPq7rPASFY0wUuVDJT2iivYEtle29wrTK1gGoNeR6o_nuw/viewform" className="nav-cta" target="_blank" rel="noopener noreferrer">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-deco-box-1" />
        <div className="hero-deco-box-2" />
        <div className="container">
          <div className="hero-tag">
            <span className="hero-tag-pulse"></span>
            Introducing FastLaunch — Agentic Launching
          </div>

          <h1 className="hero-title">
            Submit your SaaS to different directories with AI <span>seamlessly</span>.
          </h1>

          <p className="hero-subtitle">
            The premium launchpad for high-velocity founders. Automatically submit your startup to 20+ top-tier directories including SaaSHub, Uneed, and AlternativeTo. Save 40+ hours of manual labor in 1 click.
          </p>

          <div className="hero-actions">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfuvPq7rPASFY0wUuVDJT2iivYEtle29wrTK1gGoNeR6o_nuw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join our waitlist — automate up to 40+ launches for free <ArrowRight size={18} />
            </a>
          </div>


        </div>
      </header>

      {/* Directories 2-Column Grid Showcase */}
      <section className="directories-section" id="directories">
        <div className="container">

          <h2 className="directories-heading">Launch effortlessly to top platforms</h2>
          <div className="directories-grid">
            {DIRECTORIES.map(dir => (
              <div
                key={dir.id}
                className="directory-card"
              >
                <div className="dir-card-header">
                  <div className="dir-logo-wrapper">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${dir.domain}&sz=64`}
                      alt={`${dir.name} logo`}
                      className="dir-logo-img"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="dir-meta">
                    <h3 className="dir-name">{dir.name}</h3>
                    <span className="dir-category">{dir.category}</span>
                  </div>
                </div>
                <p className="dir-description">{dir.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Value Propositions / Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="features-header">
            <h2 className="features-heading">AI-assisted <span>submission</span></h2>
            <p className="features-description">
              FastLaunch is an autonomous submission engine that launches your SaaS to dozens of high-authority platforms in minutes. By crawling your landing page, our AI agent extracts key product details and automatically fills out the custom submission forms required by each platform—securing high-quality backlinks and early SEO momentum without the manual grind.
            </p>
            <div className="features-subcaption">
              Three simple steps to automate your product launch sequence entirely
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-step-card">
              <span className="feature-step-num">01 <span>//</span> Submit</span>
              <h3 className="feature-step-title">Provide Your Website Link</h3>
              <p className="feature-step-desc">
                Begin your product launch sequence by simply providing your primary website URL. No complicated forms or tedious data entry required to kick off your startup directory submission campaign.
              </p>
            </div>

            <div className="feature-step-card">
              <span className="feature-step-num">02 <span>//</span> Extract</span>
              <h3 className="feature-step-title">Intelligent Agent Data Retrieval</h3>
              <p className="feature-step-desc">
                Our advanced AI agent crawls your site to autonomously retrieve essential product data, value propositions, and SEO metadata, structuring it perfectly for high-authority backlinks.
              </p>
            </div>

            <div className="feature-step-card">
              <span className="feature-step-num">03 <span>//</span> Launch</span>
              <h3 className="feature-step-title">Lightning-Fast Extension Autofill</h3>
              <p className="feature-step-desc">
                Our proprietary Chrome extension instantly autofills complex submission forms across the web. Save tons of hours of manual labor while distributing your product more effectively to maximize SEO growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="manifesto-section">
        <div className="container">
          <div className="manifesto-content">
            <h2 className="manifesto-title">Why we built FastLaunch</h2>
            <p className="manifesto-text">
              As serial founders, we spent hundreds of hours tailoring different product descriptions and manually filling out completely different submission forms for every single directory platform, only to wait weeks for approvals just to get our first 100 users.
            </p>
            <p className="manifesto-text">
              We realized that the initial distribution phase of a startup is incredibly tedious but absolutely necessary for early SEO momentum. We built FastLaunch to automate this entirely. One click, instant authority, and zero wasted time.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-label">Investment</div>
          <h2 className="pricing-title">Simple transparent pricing</h2>
          <p className="pricing-subtitle">
            Automate your launch sequence completely. Choose a plan tailored to your execution scale.
          </p>

          <div className="pricing-testimonials-layout">
            {/* Pricing Cards */}
            <div className="pricing-grid">
              {/* Free Trial Card */}
              <div className="pricing-card">
                <span className="pricing-name">Founding Member</span>
                <p className="pricing-desc">Free launch access for early beta supporters (limited to first 100 signups).</p>
                <div className="pricing-price-box">
                  <span className="pricing-price">$0</span>
                  <span className="pricing-term">/ beta phase</span>
                </div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfuvPq7rPASFY0wUuVDJT2iivYEtle29wrTK1gGoNeR6o_nuw/viewform" className="pricing-btn pricing-btn-secondary" target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                </a>
                <div className="pricing-features">
                  <div className="pricing-feature"><Check size={14} /><span>100% Free Launch</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>30+ High-Authority Directories</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>AI-Powered Auto-Fill</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>Backlink Report Included</span></div>
                </div>
              </div>

              {/* $30 Per Launch Card */}
              <div className="pricing-card premium">
                <span className="pricing-badge">Most Popular</span>
                <span className="pricing-name">Pay Per Launch</span>
                <p className="pricing-desc">Submit your SaaS to 30+ high-authority sites instantly with our AI agent.</p>
                <div className="pricing-price-box">
                  <span className="pricing-price">$30</span>
                  <span className="pricing-term">/ launch</span>
                </div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfuvPq7rPASFY0wUuVDJT2iivYEtle29wrTK1gGoNeR6o_nuw/viewform" className="pricing-btn pricing-btn-primary" target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                </a>
                <div className="pricing-features">
                  <div className="pricing-feature"><Check size={14} /><span className="pricing-feature-bold">30+ High-Authority Sites</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>AI-Powered Form Autofill</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>Priority Submission Queue</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>SEO Backlink Report</span></div>
                  <div className="pricing-feature"><Check size={14} /><span>Dedicated Launch Support</span></div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="pricing-testimonials-column">
              <div className="pricing-testimonials-wrapper">
                <p className="pricing-testimonials-label">What founders say</p>
                <div className="pricing-testimonials">
                  <div className="testimonials-track">
                    {/* Group 1 */}
                    {TESTIMONIALS.map((t, idx) => (
                      <div key={`g1-${idx}`} className="testimonial-card">
                        <p className="testimonial-quote">"{t.quote}"</p>
                        <div className="testimonial-author">
                          <div className="testimonial-avatar">
                            <img src={t.avatar} alt={`${t.name}'s avatar`} className="testimonial-avatar-img" width={36} height={36} />
                          </div>
                          <div>
                            <p className="testimonial-name">{t.name}</p>
                            <p className="testimonial-role">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Group 2 (seamless clone) */}
                    {TESTIMONIALS.map((t, idx) => (
                      <div key={`g2-${idx}`} className="testimonial-card">
                        <p className="testimonial-quote">"{t.quote}"</p>
                        <div className="testimonial-author">
                          <div className="testimonial-avatar">
                            <img src={t.avatar} alt={`${t.name}'s avatar`} className="testimonial-avatar-img" width={36} height={36} />
                          </div>
                          <div>
                            <p className="testimonial-name">{t.name}</p>
                            <p className="testimonial-role">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="section-label">Questions</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Everything you need to know about FastLaunch automated indexing.</p>

          <div className="faq-grid">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <div key={index} className={`faq-item ${isActive ? "active" : ""}`}>
                  <button className="faq-question" onClick={() => setActiveFaq(isActive ? null : index)}>
                    <span>{faq.q}</span>
                    <Plus size={18} className="faq-icon" />
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">
                INDENTED
              </a>
              <p className="footer-desc">
                Building premium, high-speed deployment software systems for elite modern entrepreneurs.
              </p>
            </div>

            <div className="footer-links-grid">
              <div>
                <div className="footer-column-title">Product</div>
                <ul className="footer-links">
                  <li><a href="#simulator" className="footer-link">Simulator</a></li>
                  <li><a href="#directories" className="footer-link">Directories</a></li>
                  <li><a href="#pricing" className="footer-link">Pricing</a></li>
                </ul>
              </div>

              <div>
                <div className="footer-column-title">Resources</div>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Docs</a></li>
                  <li><a href="#" className="footer-link">SEO Strategy</a></li>
                  <li><a href="#" className="footer-link">Support</a></li>
                </ul>
              </div>

              <div>
                <div className="footer-column-title">Legal</div>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Privacy</a></li>
                  <li><a href="#" className="footer-link">Terms</a></li>
                  <li><a href="#" className="footer-link">Refunds</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              © {new Date().getFullYear()} Indented Inc. All rights reserved. Premium Product Automation.
            </span>
            <div className="footer-socials">
              <a href="#" className="social-link"><Users size={18} /></a>
              <a href="#" className="social-link"><Sparkles size={18} /></a>
              <a href="#" className="social-link"><Award size={18} /></a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
