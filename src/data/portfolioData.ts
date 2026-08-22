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
  category: "AI & Tools" | "Full-Stack" | "Social" | "Web";
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
    tagline: "Complete web applications from frontend to database",
    description:
      "Building complete web products with modern frontend frameworks, server-side logic, relational & document databases, secure authentication, and APIs.",
    icon: "Layers",
    accentColor: "#A78BFA",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "ai-tools",
    number: "02",
    title: "AI & Developer Tools",
    tagline: "Local-first AI apps & developer productivity",
    description:
      "Building AI-powered applications, local-first tools, RAG architectures, and custom developer tooling designed to make software more intuitive.",
    icon: "Bot",
    accentColor: "#FEF08A",
    tags: ["Python", "Ollama", "ChromaDB", "LangChain", "RAG", "SQLite"],
  },
  {
    id: "product-building",
    number: "03",
    title: "Product Building",
    tagline: "From concept to deployed, functional software",
    description:
      "Taking an idea from initial concept into a working, usable product and actively iterating on it through practical experimentation.",
    icon: "Sparkles",
    accentColor: "#22D3EE",
    tags: ["0→1 Building", "shadcn/ui", "Framer Motion", "UI Design", "Iteration"],
  },
  {
    id: "research-experimentation",
    number: "04",
    title: "Research & Experimentation",
    tagline: "Exploring modern software architectures & AI",
    description:
      "Exploring applied AI, software architecture patterns, new developer tools, and unconventional product ideas through hands-on builds.",
    icon: "Rocket",
    accentColor: "#4ADE80",
    tags: ["Local AI", "Software Architecture", "Prototyping", "Tooling"],
  },
];

export const experienceSkillsData: SkillCategory[] = [
  {
    number: "01",
    title: "Languages",
    color: "#A78BFA",
    description:
      "Core programming languages used across full-stack applications, CLI utilities, and AI pipelines.",
    skills: ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    number: "02",
    title: "Frontend & UI",
    color: "#FEF08A",
    description:
      "Modern interface technologies for building responsive, accessible, and animated web applications.",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "Responsive Layouts",
    ],
  },
  {
    number: "03",
    title: "Backend & Databases",
    color: "#22D3EE",
    description:
      "Server runtimes, ORMs, cloud services, and persistent databases for structured data storage.",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Neon",
      "Prisma",
      "Firebase",
      "SQLite",
      "REST APIs",
    ],
  },
  {
    number: "04",
    title: "AI, Tools & Workflow",
    color: "#4ADE80",
    description:
      "Local AI runtimes, RAG pipelines, version control, and developer deployment environments.",
    skills: [
      "Ollama",
      "LangChain",
      "RAG Systems",
      "ChromaDB",
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
    ],
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "codey",
    title: "CodeY",
    subtitle: "Local-First AI Development Companion",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Local Project Memory & Context",
    tags: ["Python", "SQLite", "Ollama", "GitPython", "ChromaDB", "Watchdog", "Typer", "Rich"],
    description:
      "CodeY helps developers understand their codebases by indexing project files, code structure, and Git history into local project memory, then retrieving relevant context when needed.",
    overview:
      "CodeY indexes your repository locally into a vector store and SQLite metadata layer. By tracking Git history and file changes in real-time, it allows developers to query and understand architectural decisions, code flow, and historical context without sending sensitive code to external clouds.",
    clarification:
      "CodeY is a codebase understanding and context retrieval companion. It does not directly rewrite or edit your source code.",
    features: [
      "Local vector embeddings & semantic search with ChromaDB",
      "Git history indexing & commit context retrieval with GitPython",
      "Live filesystem change tracking with Watchdog",
      "Local offline LLM inference powered by Ollama",
      "Interactive Terminal UI built using Typer and Rich formatting",
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
    subtitle: "AI-Powered Research & Multi-Source Discovery",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Multi-Platform Knowledge Aggregation",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon", "AI APIs"],
    description:
      "Intent aggregates information from Reddit, X, YouTube, official documentation, and the wider web, then uses AI to help users discover, summarize, and contextualize relevant information.",
    overview:
      "Instead of manually searching across multiple search engines and forums, Intent pulls discussions, video transcripts, and technical documentation into a unified feed, applying AI summarization to extract clear insights and answers.",
    features: [
      "Multi-source information aggregation across community platforms & docs",
      "AI-assisted synthesis, topic summarization, and key takeaway extraction",
      "Organized research workspaces and saved search collections",
      "Modern dark-mode interface built with Next.js and Tailwind CSS",
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
    accentColor: "#FEF08A",
  },
  {
    id: "threadly",
    title: "ThreadLy",
    subtitle: "Social & Conversation-Focused Web Platform",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Community Conversations & Posts",
    tags: ["Next.js", "TypeScript", "Clerk", "Firebase", "Cloudinary", "Tailwind CSS"],
    description:
      "A social web application designed for active discussions, post sharing, dynamic media uploads, and community interactions.",
    overview:
      "ThreadLy provides an intuitive space for users to create discussion threads, interact with community posts, upload media, and manage user profiles seamlessly.",
    features: [
      "User authentication and profile management via Clerk",
      "Real-time database integration with Firebase",
      "Cloud image storage and optimization with Cloudinary",
      "Responsive post feeds, nested replies, and clean UI components",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Firebase",
      "Cloudinary",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/harshittpanday/threadly",
    accentColor: "#22D3EE",
  },
];

export const projectsData: Project[] = [
  {
    id: "codey",
    title: "CodeY",
    category: "AI & Tools",
    year: "2026",
    role: "Creator / Builder",
    description:
      "Local-first AI development companion that indexes project structure and Git history into local memory.",
    longDescription:
      "CodeY indexes codebases into local vector stores and SQLite to help developers quickly understand architecture, dependencies, and project history without cloud dependency.",
    highlights: [
      "Local offline LLM integration via Ollama",
      "ChromaDB semantic search over repository files",
      "Real-time file change monitoring via Watchdog",
      "Terminal user interface formatted with Rich and Typer",
    ],
    stack: ["Python", "SQLite", "Ollama", "GitPython", "ChromaDB", "Typer"],
    githubUrl: "https://github.com/harshittpanday/codey",
    featured: true,
    accentColor: "#A78BFA",
  },
  {
    id: "intent",
    title: "Intent",
    category: "AI & Tools",
    year: "2026",
    role: "Creator / Builder",
    description:
      "AI-driven multi-source research tool aggregating insights from Reddit, X, YouTube, and web docs.",
    longDescription:
      "Intent simplifies research by aggregating relevant community discussions, videos, and documentation into unified, AI-summarized insights.",
    highlights: [
      "Multi-source information aggregation pipeline",
      "AI summarization and contextual distillation",
      "PostgreSQL and Neon database storage",
      "Responsive UI built with Next.js and Tailwind CSS",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon"],
    githubUrl: "https://github.com/harshittpanday/intent",
    featured: true,
    accentColor: "#FEF08A",
  },
  {
    id: "threadly",
    title: "ThreadLy",
    category: "Social",
    year: "2026",
    role: "Creator / Builder",
    description:
      "Social web application focused on community discussions, media sharing, and conversation threads.",
    longDescription:
      "A complete social platform featuring user authentication, threaded replies, image uploads, and real-time updates.",
    highlights: [
      "Clerk user authentication and profile management",
      "Firebase database synchronization for posts",
      "Cloudinary media upload integration",
      "Clean dark-mode interface with Tailwind CSS",
    ],
    stack: ["Next.js", "TypeScript", "Clerk", "Firebase", "Cloudinary"],
    githubUrl: "https://github.com/harshittpanday/threadly",
    featured: true,
    accentColor: "#22D3EE",
  },
  {
    id: "personal-ai",
    title: "Personal AI",
    category: "AI & Tools",
    year: "2025",
    role: "Creator / Builder",
    description:
      "Personalized assistant exploration with persistent context, document indexing, and conversational memory.",
    longDescription:
      "An experimental local assistant project exploring semantic memory storage, document querying, and custom prompt routing.",
    highlights: [
      "Semantic indexing over notes and documents",
      "Conversational memory with local storage",
      "Modular Python and LangChain pipeline",
    ],
    stack: ["Python", "LangChain", "ChromaDB", "Ollama", "SQLite"],
    githubUrl: "https://github.com/harshittpanday/personal-ai",
    featured: false,
    accentColor: "#4ADE80",
  },
  {
    id: "study-system",
    title: "Study System",
    category: "Full-Stack",
    year: "2025",
    role: "Creator / Builder",
    description:
      "Structured learning workspace designed to organize study materials, concepts, and revision schedules.",
    longDescription:
      "A web tool tailored for students to manage complex subject notes, track study sessions, and structure conceptual learning.",
    highlights: [
      "Subject taxonomy and hierarchical topic breakdown",
      "Clean, distraction-free markdown interface",
      "PostgreSQL and Prisma data layer",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/harshittpanday",
    featured: false,
    accentColor: "#F472B6",
  },
  {
    id: "heliosynctech",
    title: "HelioSyncTech Web",
    category: "Web",
    year: "2025",
    role: "Web Developer",
    description:
      "Modern responsive web application featuring custom layouts, interactive sections, and clean typography.",
    longDescription:
      "Client web build crafted with Next.js and Tailwind CSS, focusing on visual clarity, responsive performance, and modern web standards.",
    highlights: [
      "Fully responsive mobile-to-desktop design",
      "Optimized web performance and image assets",
      "Interactive components with Framer Motion",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/harshittpanday",
    featured: false,
    accentColor: "#38BDF8",
  },
];

export const techStackCategories = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "Terminal", color: "#3776AB" },
      { name: "TypeScript", icon: "Code2", color: "#3178C6" },
      { name: "JavaScript", icon: "FileCode", color: "#F7DF1E" },
      { name: "HTML", icon: "Layout", color: "#E34F26" },
      { name: "CSS", icon: "Palette", color: "#264DE4" },
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "Next.js", icon: "Boxes", color: "#FFFFFF" },
      { name: "React", icon: "Atom", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "Palette", color: "#38BDF8" },
      { name: "Framer Motion", icon: "Sparkles", color: "#F43F5E" },
      { name: "shadcn/ui", icon: "Layers", color: "#A78BFA" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: "Server", color: "#68A063" },
      { name: "PostgreSQL", icon: "Database", color: "#336791" },
      { name: "Neon", icon: "Database", color: "#00E599" },
      { name: "Prisma", icon: "Layers", color: "#5A67D8" },
      { name: "Firebase", icon: "Zap", color: "#FFA611" },
      { name: "SQLite", icon: "Database", color: "#003B57" },
    ],
  },
  {
    category: "AI, Tools & Workflow",
    items: [
      { name: "Ollama", icon: "Bot", color: "#FFFFFF" },
      { name: "LangChain", icon: "GitFork", color: "#4ADE80" },
      { name: "RAG Systems", icon: "Search", color: "#FEF08A" },
      { name: "Git", icon: "GitBranch", color: "#F05032" },
      { name: "GitHub", icon: "Code2", color: "#FFFFFF" },
      { name: "Docker", icon: "Container", color: "#2496ED" },
      { name: "Vercel", icon: "Cloud", color: "#FFFFFF" },
    ],
  },
];
