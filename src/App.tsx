import { useState, useEffect, useRef } from "react"
import {
  Mail, Phone, MapPin, ExternalLink, FileBadge,
  ChevronDown, ChevronUp, Terminal, Cloud, Database,
  Users, Award, Code2, Layers, Bot, Zap, X, Menu, Link2
} from "lucide-react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Certifications", "Contact"]

const SKILLS = {
  "Generative & Agentic AI": ["RAG", "Agentic AI", "AI Agents", "OpenAI API", "LLM Integration", "LangChain", "LangGraph", "Prompt Engineering", "MongoDB Vector Search", "Semantic Search"],
  "Backend Development": ["Python", "FastAPI", "PHP", "Laravel", "JavaScript", "Django", "REST APIs"],
  "Cloud & DevOps": ["AWS Serverless", "Amazon Lambda", "API Gateway", "CI/CD", "AWS Well-Architected", "AWS DataSync", "AWS SAM", "Docker"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL"],
  "Architecture & Leadership": ["Microservices", "Distributed Systems", "System Design", "API Integration", "Workflow Automation", "Agile/Scrum", "Team Leadership", "Stakeholder Management"],
}

const EXPERIENCE = [
  {
    role: "Software Development Manager",
    company: "MK Themed Attractions Philippines",
    period: "Dec 2024 – Present",
    location: "Angeles, Pampanga",
    highlights: [
      "Architected production-grade GenAI RAG platform integrating OpenAI LLMs and MongoDB Vector Search — implementing embedding generation, vector indexing, and semantic search for factory data analysis.",
      "Built Agentic AI workflows using LangChain and LangGraph automating e-commerce client onboarding, reducing manual customer service workloads by ~70%.",
      "Spearheaded AWS Serverless cloud modernisation using Bref, reducing infrastructure costs to ~USD 30/month.",
      "Led cross-functional team (2 Frontend, 2 Backend, 1 QA) using Agile/Scrum, modernising legacy monolithic systems into distributed microservices using FastAPI and Laravel.",
      "Developed AI-powered marketing agent system generating interactive brochures and automating outbound email campaigns to 127,000+ leads.",
    ],
  },
  {
    role: "API and Automation Specialist",
    company: "MK Themed Attractions Philippines",
    period: "Aug 2024 – Dec 2024",
    location: "Angeles, Pampanga",
    highlights: [
      "Designed API-driven automation solutions integrating multiple platforms into a centralised SaaS ecosystem, streamlining sales and operational workflows.",
      "Developed scalable FastAPI backend services orchestrating ERP, e-commerce, and external partner API workflows with resilient error handling and retry mechanisms.",
      "Implemented automated data exchange pipelines synchronising customers, orders, inventory, and operational records between disparate systems.",
    ],
  },
  {
    role: "Software Developer",
    company: "Temarotech",
    period: "Jan 2024 – Aug 2024",
    location: "Makati, Philippines",
    highlights: [
      "Developed and maintained Laravel (PHP) web applications with Vue.js, JavaScript, and jQuery front-end interfaces.",
      "Debugged legacy codebases and maintained stability of core database operations (MySQL, PostgreSQL).",
    ],
  },
  {
    role: "Lead Web Developer",
    company: "GOCLOUD Inc.",
    period: "May 2019 – Jan 2024",
    location: "San Fernando, Pampanga",
    highlights: [
      "Led Agile engineering team delivering enterprise web applications including e-commerce platforms, school management systems, and hospital information systems.",
      "Architected scalable backend microservices using Python and PHP; guided AWS cloud deployments ensuring environment stability and cost-effective resource allocation.",
      "Mentored junior and mid-level developers through code reviews, workshops, and pair programming.",
    ],
  },
]

const PROJECTS = [
  {
    id: 1,
    title: "AI-Powered E-Commerce Platform",
    role: "Software Development Manager / AI Engineer",
    category: "AI",
    overview: "Designed and developed an AI-powered e-commerce platform for Universal Statues combining customer support, marketing automation, and AI-generated content into a unified cloud-native ecosystem with multiple serverless AI microservices.",
    solution: "Designed the overall AI architecture using FastAPI microservices deployed on AWS Lambda. Built a context-aware AI chatbot using LangChain and LangGraph, implemented RAG using MongoDB Atlas Vector Search, and integrated OpenAI and Google AI services.",
    tech: ["Python", "FastAPI", "AWS Lambda", "AWS SAM", "LangChain", "LangGraph", "LangSmith", "MongoDB Atlas", "OpenAI API", "Google AI Studio", "VoyageAI"],
    url: "https://universalstatues-us.com",
  },
  {
    id: 2,
    title: "AI Marketing Automation Microservice",
    role: "AI Engineer",
    category: "AI",
    overview: "Designed and implemented an autonomous AI Marketing Agent that automatically creates personalised customer follow-up campaigns and integrates directly with Zoho Campaigns, operating as an AWS Lambda microservice triggered by Amazon EventBridge Scheduler.",
    solution: "Developed an AI workflow that generates personalised HTML email campaigns using LLMs, automatically creates Zoho Campaigns, and schedules campaign delivery without manual intervention.",
    tech: ["FastAPI", "OpenAI API", "Zoho Campaign API", "AWS Lambda", "Amazon EventBridge", "LangGraph"],
    url: null,
  },
  {
    id: 3,
    title: "AI Social Media Marketing Agent",
    role: "AI Engineer",
    category: "AI",
    overview: "Developed an AI-powered social media automation platform capable of generating promotional content and publishing posts automatically. The platform retrieves product information through RAG pipelines before generating captions, marketing images, and promotional videos using Google Veo 3.",
    solution: "Designed an autonomous AI agent that retrieves product knowledge through MongoDB Vector Search, generates marketing content using LLMs, creates videos using Google Veo 3, and automatically prepares content for publishing.",
    tech: ["Google AI Studio", "Google Veo 3", "OpenAI", "LangGraph", "FastAPI", "AWS Lambda", "MongoDB Atlas Vector Search"],
    url: null,
  },
  {
    id: 4,
    title: "Enterprise AI Chatbot",
    role: "AI Engineer",
    category: "AI",
    overview: "Developed a production AI chatbot capable of answering customer inquiries using internal company knowledge instead of relying solely on LLM knowledge — part of the Universal Statues e-commerce site.",
    solution: "Designed a RAG architecture that retrieves relevant company knowledge before generating responses, significantly improving response accuracy while reducing hallucinations.",
    tech: ["LangChain", "LangGraph", "MongoDB Atlas Vector Search", "VoyageAI", "OpenAI API", "LangSmith"],
    url: null,
  },
  {
    id: 5,
    title: "Legacy System Modernisation",
    role: "Software Development Manager",
    category: "Cloud",
    overview: "Led the modernisation of an internal factory operations system by migrating a monolithic application into multiple cloud-native microservices, handling ~300 concurrent users.",
    solution: "Redesigned the system into department-specific microservices (Casting, Detailing, Assembly, etc.) deployed on AWS Lambda. Migrated the database to MongoDB Atlas to better support document-oriented workloads and distributed architecture.",
    tech: ["FastAPI", "AWS Lambda", "AWS SAM", "API Gateway", "Docker", "MongoDB Atlas"],
    url: null,
  },
  {
    id: 6,
    title: "Marketplace Integration Platform",
    role: "API Specialist",
    category: "Backend",
    overview: "Developed a cloud-native integration platform that synchronises inventory and orders between Microsoft Dynamics 365 Business Central and multiple online marketplaces (Shopify, Walmart, eBay).",
    solution: "Designed a serverless integration platform that automatically synchronises inventory, orders, pricing, and product information across multiple marketplaces using REST APIs.",
    tech: ["Python", "FastAPI", "REST APIs", "OAuth", "AWS Lambda", "API Gateway", "MongoDB", "MySQL"],
    url: null,
  },
  {
    id: 7,
    title: "AI Email Generation Engine",
    role: "AI Engineer",
    category: "AI",
    overview: "Designed the company's first AI-powered email generation platform, serving as the foundation for the later AI Marketing Agent. The system remains in production for automated lead nurturing and account creation follow-up emails.",
    solution: "Designed a multi-stage AI workflow that first plans email structure before generating production-ready HTML emails using LLMs.",
    tech: ["LangGraph", "LangChain", "OpenAI API", "FastAPI"],
    url: null,
  },
  {
    id: 8,
    title: "Internal AI RAG Knowledge Platform",
    role: "AI Engineer",
    category: "AI",
    overview: "Developed an internal RAG platform integrated into the company's HR Information System (HRIS) to assist HR personnel in interpreting company policies and recommending disciplinary actions.",
    solution: "Designed a RAG platform that retrieves relevant handbook sections, previous policy references, and disciplinary guidelines while allowing HR personnel to make the final decision.",
    tech: ["AWS S3", "LangChain", "LangGraph", "MongoDB Atlas Vector Search", "VoyageAI", "OpenAI API", "LangSmith"],
    url: null,
  },
]

const CERTIFICATIONS = [
  {
    provider: "Amazon Web Services",
    date: "Jun 2026",
    icon: Cloud,
    items: [
      { label: "AWS Well-Architected Proficient", url: "https://www.credly.com/badges/5347fcae-a592-4667-a762-4b8f513d24bb/public_url" },
      { label: "Serverless – Training Badge", url: "https://www.credly.com/badges/62807958-e15e-409c-86cd-550ee8f9cd54/public_url" },
      { label: "Amazon ECS – Training Badge", url: "https://www.credly.com/badges/7351f9fd-76e7-4bef-9002-6940ce9c11c6/public_url" },
      { label: "Amazon EKS – Training Badge", url: "https://www.credly.com/badges/1d6154aa-9acb-4746-b164-3c6509650a62/public_url" },
      { label: "Data Migration – Training Badge", url: "https://www.credly.com/badges/8203afa2-e115-4e2c-bebb-2996d13d6c2d/public_url" },
    ],
  },
  {
    provider: "MongoDB",
    date: "Jun 2026",
    icon: Database,
    items: [
      { label: "Building AI Agents with MongoDB", url: "https://www.credly.com/badges/f3598d12-d324-451d-b9a3-dfa618cd87cb/public_url" },
      { label: "Building RAG Apps Using MongoDB", url: "https://www.credly.com/badges/a91bc81f-1aa4-4d38-a0b6-201b38523f7e/public_url" },
    ],
  },
  {
    provider: "LangChain Academy",
    date: "Jun 2026",
    icon: Bot,
    items: [
      { label: "LangChain Essentials – Python", url: "https://academy.langchain.com/certificates/ev1tn6xgmm" },
      { label: "LangGraph Essentials – Python", url: "https://academy.langchain.com/certificates/miqkudmamp" },
    ],
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-violet-400 border-violet-400/30 bg-violet-400/8",
  Cloud: "text-sky-400 border-sky-400/30 bg-sky-400/8",
  Backend: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
}

const SKILL_CATEGORY_ICONS: Record<string, typeof Bot> = {
  "Generative & Agentic AI": Bot,
  "Backend Development": Code2,
  "Cloud & DevOps": Cloud,
  "Databases": Database,
  "Architecture & Leadership": Users,
}

// ─── Components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: typeof PROJECTS[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-xl border border-[#1e1e2e] bg-[#0f0f16]",
        "p-5 hover:border-violet-500/40 hover:bg-[#12121a]",
        "transition-all duration-300 cursor-pointer"
      )}
      style={{ boxShadow: "0 0 0 0 transparent" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(139,92,246,0.07)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent"
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-semibold text-[#f4f4f6] text-base leading-snug group-hover:text-violet-200 transition-colors">
          {project.title}
        </h3>
        <span className={cn(
          "shrink-0 text-xs font-mono px-2 py-0.5 rounded border",
          CATEGORY_COLORS[project.category]
        )}>
          {project.category}
        </span>
      </div>
      <p className="text-sm text-[#6b6b80] leading-relaxed mb-4 line-clamp-3">
        {project.overview}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map(t => (
          <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a28] text-[#8b7fc8] border border-[#2a2a40]">
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="font-mono text-[10px] px-1.5 py-0.5 text-[#6b6b80]">
            +{project.tech.length - 5} more
          </span>
        )}
      </div>
    </button>
  )
}

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#2a2a40] bg-[#0d0d14] p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 60px rgba(139,92,246,0.12), 0 32px 64px rgba(0,0,0,0.6)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#6b6b80] hover:text-white hover:bg-[#1e1e2e] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className={cn(
            "text-xs font-mono px-2 py-0.5 rounded border",
            CATEGORY_COLORS[project.category]
          )}>
            {project.category}
          </span>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-1">{project.title}</h2>
        <p className="text-sm text-violet-400 font-mono mb-6">{project.role}</p>

        <div className="space-y-5">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#6b6b80] font-mono mb-2">Overview</h4>
            <p className="text-[#c4c4d4] text-sm leading-relaxed">{project.overview}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#6b6b80] font-mono mb-2">Solution</h4>
            <p className="text-[#c4c4d4] text-sm leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#6b6b80] font-mono mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#1a1a28] text-[#a08ee8] border border-[#2a2a40]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <ExternalLink size={14} />
              View Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [openProject, setOpenProject] = useState<typeof PROJECTS[0] | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [expandedExp, setExpandedExp] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const categories = ["All", "AI", "Cloud", "Backend"]
  const filteredProjects = filterCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory)

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-4"
          style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }} />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Navigation ── */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-[#1e1e2e] backdrop-blur-md bg-[#08080d]/80" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-white tracking-tight">
            <span className="text-violet-400 font-mono text-sm">{"<"}</span>
            Carlo
            <span className="text-violet-400 font-mono text-sm">{" />"}</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="px-3 py-1.5 text-sm text-[#6b6b80] hover:text-white transition-colors rounded-md hover:bg-[#1a1a28] font-medium"
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:carloguevarra454@gmail.com"
              className="ml-3 px-4 py-1.5 text-sm font-medium rounded-lg text-white transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#6b6b80] hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1e1e2e] bg-[#08080d] px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left px-3 py-2 text-sm text-[#c4c4d4] hover:text-white rounded-md hover:bg-[#1a1a28]"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section ref={heroRef} id="about" className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 w-full py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-start">
            <div>
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400">Available for opportunities</span>
              </div>

              <h1 className="font-display font-black leading-[0.95] mb-6" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
                <span className="block text-white">Carlo</span>
                <span className="block" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Guevarra
                </span>
              </h1>

              <div className="font-mono text-sm text-[#8b7fc8] mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Terminal size={14} className="shrink-0" />
                <span>Senior Backend Engineer</span>
                <span className="text-violet-500/50 hidden sm:inline">|</span>
                <span className="w-full sm:w-auto">Building AI Platforms & Cloud Architectures</span>
                <span className="text-violet-500/50 hidden sm:inline">|</span>
                <span>FastAPI · AWS</span>
              </div>

              <p className="text-[#9898a8] leading-relaxed max-w-xl mb-10" style={{ fontSize: "1.05rem" }}>
                Senior Backend Engineer with <strong className="text-white font-semibold">7+ years</strong> of experience designing scalable backend systems,
                cloud-native applications, and enterprise integrations. Currently architecting
                <strong className="text-violet-300 font-semibold"> RAG platforms</strong>, integrating OpenAI LLMs, and building
                <strong className="text-violet-300 font-semibold"> Agentic AI workflows</strong> that automate business processes.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
                <a
                  href="mailto:carloguevarra454@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 0 24px rgba(124,58,237,0.3)" }}
                >
                  <Mail size={15} />
                  Get In Touch
                </a>
                <a
                  href="https://linkedin.com/in/carloguevarra-58b694183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#c4c4d4] border border-[#1e1e2e] hover:border-violet-500/40 hover:text-white transition-all"
                >
                  <Link2 size={15} />
                  LinkedIn
                </a>
                <a
                  href="/files/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#c4c4d4] border border-[#1e1e2e] hover:border-violet-500/40 hover:text-white transition-all"
                >
                  <FileBadge size={15} />
                  Download CV
                </a>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5 text-sm text-[#6b6b80]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-violet-400 shrink-0" />
                  <span>Apalit, Pampanga, Philippines</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={13} className="text-violet-400 shrink-0" />
                  +63 942 734 6600
                </span>
              </div>
            </div>

            {/* Stats card */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#0f0f16] p-6 w-64"
                style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }}>
                <div className="font-mono text-xs text-[#6b6b80] mb-4">// at a glance</div>
                {[
                  { label: "Years Experience", value: "7+", icon: Zap },
                  { label: "AI Projects Built", value: "8+", icon: Bot },
                  { label: "Team Size Led", value: "5", icon: Users },
                  { label: "Leads Reached", value: "127K+", icon: Mail },
                  { label: "Cost Reduction", value: "~90%", icon: Cloud },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-[#1a1a28] last:border-0">
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-violet-400" />
                      <span className="text-xs text-[#6b6b80]">{label}</span>
                    </div>
                    <span className="font-display font-bold text-white text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <button onClick={() => scrollTo("Experience")} className="text-[#3a3a50] hover:text-violet-400 transition-colors animate-bounce">
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>Work Experience</SectionLabel>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent" />
          <div className="space-y-3 pl-8">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 top-5 w-2 h-2 rounded-full border border-violet-500/60 bg-[#08080d]"
                  style={{ boxShadow: i === 0 ? "0 0 8px rgba(139,92,246,0.6)" : "none" }}>
                  {i === 0 && <div className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-40" />}
                </div>

                <div
                  className="rounded-xl border border-[#1e1e2e] bg-[#0f0f16] overflow-hidden cursor-pointer hover:border-violet-500/30 transition-colors"
                  onClick={() => setExpandedExp(expandedExp === i ? null : i)}
                >
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display font-semibold text-white text-base mb-1">{exp.role}</div>
                      <div className="font-medium text-violet-400 text-sm mb-1">{exp.company}</div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#6b6b80] font-mono">
                        <span>{exp.period}</span>
                        <span className="hidden sm:inline">·</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-[#3a3a50] hover:text-violet-400 transition-colors mt-1">
                      {expandedExp === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {expandedExp === i && (
                    <div className="px-5 pb-5 border-t border-[#1a1a28]">
                      <ul className="mt-4 space-y-2.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-[#9898a8] leading-relaxed">
                            <span className="text-violet-500 mt-0.5 shrink-0">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>Recent Projects</SectionLabel>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium font-mono transition-all",
                filterCategory === cat
                  ? "text-white border border-violet-500/60 bg-violet-500/15"
                  : "text-[#6b6b80] border border-[#1e1e2e] hover:border-[#2e2e4e] hover:text-[#9898a8]"
              )}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-xs text-[#4a4a60]">
            {filteredProjects.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setOpenProject(project)}
            />
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>Technical Skills</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(SKILLS).map(([category, skills]) => {
            const Icon = SKILL_CATEGORY_ICONS[category] || Layers
            return (
              <div
                key={category}
                className="rounded-xl border border-[#1e1e2e] bg-[#0f0f16] p-5 hover:border-violet-500/25 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded-md bg-violet-500/12 border border-violet-500/20">
                    <Icon size={14} className="text-violet-400" />
                  </div>
                  <h3 className="font-display font-semibold text-[#e8e8f0] text-sm">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2 py-0.5 rounded border text-[#8b7fc8] border-[#2a2a40] bg-[#13131c] hover:border-violet-500/50 hover:text-violet-300 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>Certifications & Credentials</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.icon
            return (
              <div
                key={cert.provider}
                className="rounded-xl border border-[#1e1e2e] bg-[#0f0f16] p-6 hover:border-violet-500/30 transition-colors"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(139,92,246,0.06)"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent"
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Icon size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{cert.provider}</div>
                    <div className="font-mono text-[10px] text-[#6b6b80]">{cert.date}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {cert.items.map(item => (
                    <li key={item.label}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-xs text-[#9898a8] hover:text-violet-300 transition-colors group"
                      >
                        <Award size={11} className="text-violet-400 shrink-0 mt-0.5 group-hover:text-violet-300 transition-colors" />
                        <span className="flex-1">{item.label}</span>
                        <ExternalLink size={10} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Education */}
        <div className="mt-10 rounded-xl border border-[#1e1e2e] bg-[#0f0f16] p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
              <Layers size={16} className="text-violet-400" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#6b6b80] uppercase tracking-widest mb-1">Education</div>
              <div className="font-display font-semibold text-white text-base mb-0.5">
                Bachelor of Science in Information Systems
              </div>
              <div className="text-sm text-[#9898a8]">La Verdad Christian College, Apalit, Pampanga</div>
              <div className="font-mono text-xs text-violet-400 mt-1">2015 – 2019</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
        <SectionLabel>Contact</SectionLabel>

        <div className="rounded-2xl border border-[#1e1e2e] bg-[#0f0f16] overflow-hidden">
          <div className="p-8 sm:p-10 md:p-16 text-center">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
              Let's build something<br />
              <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                intelligent
              </span>
            </h2>
            <p className="text-[#6b6b80] text-base sm:text-lg mb-10 max-w-lg mx-auto">
              Open to Senior Backend, AI Engineering, or Technical Leadership roles. Let's connect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="mailto:carloguevarra454@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 text-sm sm:text-base"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 0 32px rgba(124,58,237,0.25)" }}
              >
                <Mail size={16} />
                <span className="truncate">carloguevarra454@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/carloguevarra-58b694183"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[#c4c4d4] font-semibold border border-[#1e1e2e] hover:border-violet-500/40 hover:text-white transition-all"
              >
                <Link2 size={16} />
                LinkedIn Profile
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-sm text-[#6b6b80]">
              <span className="flex items-center gap-2">
                <Phone size={13} className="text-violet-400" />
                +63 942 734 6600
              </span>
              <span className="text-[#2a2a40] mx-3 hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-violet-400" />
                Apalit, Pampanga, Philippines
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e1e2e] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-[#4a4a60]">
            © 2026 Carlo Guevarra · Software Development Manager
          </div>
          <div className="font-mono text-xs text-[#4a4a60] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Senior Backend Engineer · GenAI · Agentic AI · RAG
          </div>
        </div>
      </footer>

      {/* ── Project Modal ── */}
      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </div>
  )
}
