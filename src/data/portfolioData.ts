export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  highlightTag: string;
  tags: string[];
  description: string;
  overview: string;
  clarification?: string;
  features: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Desktop" | "AI & Tools" | "Research" | "Realtime" | "Web";
  year: string;
  role: string;
  description: string;
  longDescription: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
}

export interface Discipline {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  tags: string[];
}

export interface SkillCategory {
  number: string;
  title: string;
  color: string;
  description: string;
  skills: string[];
}

export const disciplinesData: Discipline[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Development",
    tagline: "Web applications from frontend to database",
    description:
      "Building web applications across the interface, server, database, authentication, and APIs.",
    icon: "Layers",
    accentColor: "#22D3EE",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "ai-tools",
    number: "02",
    title: "AI & Developer Tools",
    tagline: "Local-first AI apps and code tools",
    description:
      "Exploring local AI, retrieval, and code tools through practical applications.",
    icon: "Bot",
    accentColor: "#A78BFA",
    tags: ["Python", "Ollama", "ChromaDB", "LangChain", "RAG", "SQLite"],
  },
  {
    id: "product-building",
    number: "03",
    title: "Product Building",
    tagline: "Taking a project from sketch to usable",
    description:
      "Starting with a rough version, then improving it through feedback and testing.",
    icon: "Sparkles",
    accentColor: "#FEF08A",
    tags: ["0→1 Building", "shadcn/ui", "Framer Motion", "UI Design", "Iteration"],
  },
  {
    id: "research-experimentation",
    number: "04",
    title: "Research & Experimentation",
    tagline: "Learning through prototypes and experiments",
    description:
      "Trying new approaches to applied AI and developer tooling through hands-on projects.",
    icon: "Rocket",
    accentColor: "#A78BFA",
    tags: ["Local AI", "Software Architecture", "Prototyping", "Tooling"],
  },
];

export const experienceSkillsData: SkillCategory[] = [
  {
    number: "01",
    title: "Languages",
    color: "#22D3EE",
    description:
      "Programming languages I use across web applications, command-line tools, and AI projects.",
    skills: ["Python", "Rust", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    number: "02",
    title: "Web",
    color: "#22D3EE",
    description:
      "Frameworks and tools I use to build web interfaces and APIs.",
    skills: [
      "Next.js",
      "React",
      "Tauri",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "Node.js",
      "REST APIs",
    ],
  },
  {
    number: "03",
    title: "AI / Developer Tools",
    color: "#A78BFA",
    description:
      "Tools I use for local AI, retrieval, code projects, and version control.",
    skills: [
      "Ollama",
      "LangChain",
      "RAG Systems",
      "ChromaDB",
      "Git",
      "GitHub",
    ],
  },
  {
    number: "04",
    title: "Databases / Infrastructure",
    color: "#22D3EE",
    description:
      "Databases, containers, and deployment services used in my projects.",
    skills: [
      "PostgreSQL",
      "Neon",
      "Prisma",
      "Firebase",
      "SQLite",
      "Docker",
      "Vercel",
    ],
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "flint",
    title: "Flint",
    subtitle: "A cleaner way to launch and manage Minecraft",
    role: "Creator / Builder",
    year: "",
    highlightTag: "Desktop launcher",
    tags: ["Rust", "Tauri", "Minecraft", "Fabric"],
    description:
      "Flint brings launching, profiles, mods, and settings into a focused desktop experience built specifically for Minecraft.",
    overview:
      "Flint is an actively developed Minecraft launcher built with Rust and Tauri. It handles authentication, Java discovery, profiles, mods, presets, and the launch lifecycle for Vanilla and Fabric installations.",
    features: [
      "Microsoft and Minecraft authentication workflow",
      "Vanilla and Fabric version launching",
      "Java discovery with version, architecture, and duplicate-home checks",
      "Profile, mod, preset, and launcher settings management",
      "Shared Windows child-process behavior with hidden release consoles",
      "Launch progress, accessible controls, and reduced-motion support",
    ],
    stack: ["Rust", "Tauri", "Minecraft", "Fabric", "Java"],
    githubUrl: "https://github.com/harshittpanday/Flint",
    accentColor: "#C7F04B",
  },
  {
    id: "codey",
    title: "CodeY",
    subtitle: "Local codebase search and project memory",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Local project context",
    tags: ["Python", "SQLite", "Ollama", "GitPython", "ChromaDB", "Watchdog", "Typer", "Rich"],
    description:
      "CodeY helps developers understand unfamiliar codebases. It indexes project files, code structure, and Git history locally, then retrieves relevant context for a question.",
    overview:
      "CodeY stores repository embeddings in ChromaDB and metadata in SQLite. It tracks Git history and file changes so developers can ask about code flow, past decisions, and project context without sending the repository to a cloud service.",
    clarification:
      "CodeY answers questions about a codebase. It does not rewrite or edit source files.",
    features: [
      "Local embeddings and semantic search with ChromaDB",
      "Git history indexing and commit retrieval with GitPython",
      "Filesystem change tracking with Watchdog",
      "Offline model inference with Ollama",
      "Terminal interface built with Typer and Rich",
    ],
    stack: [
      "Python",
      "SQLite",
      "Ollama",
      "GitPython",
      "ChromaDB",
      "Watchdog",
      "Typer",
      "Rich",
    ],
    githubUrl: "https://github.com/harshittpanday/codey",
    accentColor: "#A78BFA",
  },
  {
    id: "intent",
    title: "Intent",
    subtitle: "Research across sources in one place",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Multi-source research",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon", "AI APIs"],
    description:
      "Intent gathers results from Reddit, X, YouTube, official documentation, and the wider web, then summarizes the material around a research question.",
    overview:
      "Intent helps with research across different sources without jumping between a bunch of tabs. It collects discussions, video transcripts, and documentation in one feed, then uses AI to summarize the useful parts.",
    features: [
      "Results from community platforms, videos, the web, and documentation",
      "AI summaries and key-point extraction",
      "Research workspaces and saved search collections",
      "Interface built with Next.js and Tailwind CSS",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Neon",
      "AI APIs",
    ],
    githubUrl: "https://github.com/harshittpanday/intent",
    accentColor: "#A78BFA",
  },
  {
    id: "relay",
    title: "Relay",
    subtitle: "Realtime messaging across desktop and mobile",
    role: "Creator / Builder",
    year: "",
    highlightTag: "Realtime chat",
    tags: ["TypeScript", "React", "Firebase", "PWA"],
    description:
      "Relay is a realtime chat application focused on responsive messaging, clear profiles, and a stronger everyday experience than its earlier iteration.",
    overview:
      "Relay uses React, TypeScript, and Firebase to provide authenticated realtime messaging across desktop and mobile. Its frontend is organized around typed Firebase services, reusable hooks, predictable listener cleanup, and safe React rendering.",
    features: [
      "Firebase Authentication and realtime messaging",
      "Typed Firebase services and immutable data interfaces",
      "Reusable hooks and reliable listener cleanup",
      "Profile, notification, and toast interfaces",
      "Responsive desktop and mobile layouts",
      "Progressive Web App setup and Firebase database rules",
    ],
    stack: ["TypeScript", "React", "Firebase", "PWA"],
    githubUrl: "https://github.com/harshittpanday/Relay",
    accentColor: "#FEF08A",
  },
];

export const projectsData: Project[] = [
  {
    id: "flint",
    title: "Flint",
    category: "Desktop",
    year: "",
    role: "Creator / Builder",
    description:
      "A modern Minecraft launcher built around fast setup, profiles, mods, and a cleaner way to get into the game.",
    longDescription:
      "Flint is an actively developed desktop launcher built with Rust and Tauri. It manages Microsoft authentication, Java discovery, profiles, mods, and launching both Vanilla and Fabric Minecraft.",
    highlights: [
      "Microsoft and Minecraft authentication workflow",
      "Vanilla and Fabric Minecraft launching",
      "Java discovery with version, architecture, and duplicate-home checks",
      "Profiles, mods, settings, presets, and launch progress",
      "Accessible controls and reduced-motion support",
    ],
    stack: ["Rust", "Tauri", "Minecraft", "Fabric"],
    githubUrl: "https://github.com/harshittpanday/Flint",
    featured: true,
    accentColor: "#C7F04B",
  },
  {
    id: "codey",
    title: "CodeY",
    category: "AI & Tools",
    year: "2026",
    role: "Creator / Builder",
    description:
      "Local-first project memory that indexes code, structure, and Git history so returning to a project never means starting from zero.",
    longDescription:
      "CodeY stores project context locally and provides a CLI for indexing files, code structure, symbols, and Git history. Ollama support lets developers ask about a codebase without sending it to a hosted model.",
    highlights: [
      "Local-first indexing for files, structure, and symbols",
      "Git history and commit indexing",
      "CLI workflows for indexing and inspecting project context",
      "Local AI support through Ollama",
    ],
    stack: ["Python", "SQLite", "Ollama", "Git", "Typer", "Rich"],
    githubUrl: "https://github.com/harshittpanday/codey",
    featured: true,
    accentColor: "#A78BFA",
  },
  {
    id: "intent",
    title: "Intent",
    category: "Research",
    year: "2026",
    role: "Creator / Builder",
    description:
      "AI-assisted research across multiple sources, turning scattered results into useful summaries, source previews, and saved collections.",
    longDescription:
      "Intent brings material from sources such as Reddit, X, YouTube, and documentation into one research workflow, with AI summaries, source previews, and saved collections.",
    highlights: [
      "Multi-source research and discovery",
      "AI-assisted summaries and source previews",
      "Saved research collections",
      "Responsive product interface",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon"],
    githubUrl: "https://github.com/harshittpanday/intent",
    featured: true,
    accentColor: "#A78BFA",
  },
  {
    id: "relay",
    title: "Relay",
    category: "Realtime",
    year: "",
    role: "Creator / Builder",
    description:
      "Realtime chat shaped around Firebase-backed messaging, profiles, and a clean experience across desktop and mobile.",
    longDescription:
      "Relay is a TypeScript and React chat application with Firebase-backed authentication and realtime messaging, reusable typed services, profiles, notifications, and responsive layouts.",
    highlights: [
      "Realtime Firebase messaging and authentication",
      "Typed services, reusable hooks, and listener cleanup",
      "Profile and notification interfaces",
      "Responsive desktop and mobile layouts with PWA support",
    ],
    stack: ["TypeScript", "React", "Firebase", "PWA"],
    githubUrl: "https://github.com/harshittpanday/Relay",
    featured: true,
    accentColor: "#FEF08A",
  },
  {
    id: "heliosynctech",
    title: "HelioSyncTech",
    category: "Web",
    year: "2026",
    role: "Freelance / Client Work",
    description:
      "Production website designed, built, and deployed for a real client, with a responsive interface and polished interactions.",
    longDescription:
      "Designed and built a production website for HelioSyncTech, including frontend development, deployment, domain configuration, and DNS setup.",
    highlights: [
      "Responsive production interface",
      "Polished interactions with Framer Motion",
      "Deployment, domain configuration, and DNS setup",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://heliosynctech.com",
    featured: false,
    accentColor: "#22D3EE",
  },
];

export const techStackCategories = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "Terminal", color: "#22D3EE" },
      { name: "Rust", icon: "Code2", color: "#22D3EE" },
      { name: "TypeScript", icon: "Code2", color: "#22D3EE" },
      { name: "JavaScript", icon: "FileCode", color: "#22D3EE" },
      { name: "HTML", icon: "Layout", color: "#22D3EE" },
      { name: "CSS", icon: "Palette", color: "#22D3EE" },
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "Next.js", icon: "Boxes", color: "#22D3EE" },
      { name: "React", icon: "Atom", color: "#22D3EE" },
      { name: "Tauri", icon: "Boxes", color: "#22D3EE" },
      { name: "Tailwind CSS", icon: "Palette", color: "#22D3EE" },
      { name: "Framer Motion", icon: "Sparkles", color: "#22D3EE" },
      { name: "shadcn/ui", icon: "Layers", color: "#22D3EE" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: "Server", color: "#22D3EE" },
      { name: "PostgreSQL", icon: "Database", color: "#22D3EE" },
      { name: "Neon", icon: "Database", color: "#22D3EE" },
      { name: "Prisma", icon: "Layers", color: "#22D3EE" },
      { name: "Firebase", icon: "Zap", color: "#22D3EE" },
      { name: "SQLite", icon: "Database", color: "#22D3EE" },
    ],
  },
  {
    category: "AI & Tooling",
    items: [
      { name: "Ollama", icon: "Bot", color: "#A78BFA" },
      { name: "LangChain", icon: "GitFork", color: "#A78BFA" },
      { name: "RAG Systems", icon: "Search", color: "#A78BFA" },
      { name: "Git", icon: "GitBranch", color: "#22D3EE" },
      { name: "GitHub", icon: "Code2", color: "#22D3EE" },
      { name: "Docker", icon: "Container", color: "#22D3EE" },
      { name: "Vercel", icon: "Cloud", color: "#22D3EE" },
    ],
  },
];
