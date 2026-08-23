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
    skills: ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
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
    id: "threadly",
    title: "ThreadLy",
    subtitle: "A web app for posts and discussions",
    role: "Creator / Builder",
    year: "2026",
    highlightTag: "Threads, replies, and media",
    tags: ["Next.js", "TypeScript", "Clerk", "Firebase", "Cloudinary", "Tailwind CSS"],
    description:
      "ThreadLy is a social web app for creating posts, joining discussions, sharing media, and replying in threads.",
    overview:
      "ThreadLy combines discussion threads, replies, media uploads, and user profiles. Clerk handles authentication, Firebase stores post data, and Cloudinary handles images.",
    features: [
      "User authentication and profile management via Clerk",
      "Real-time database integration with Firebase",
      "Cloud image storage and optimization with Cloudinary",
      "Responsive post feeds and nested replies",
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
    accentColor: "#FEF08A",
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
      "A local tool for understanding unfamiliar codebases. It indexes code structure and Git history, then retrieves context for questions.",
    longDescription:
      "CodeY stores repository embeddings in ChromaDB and metadata in SQLite. It tracks files and Git history locally so developers can ask about code flow, dependencies, and past changes.",
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
      "A research tool that gathers material from Reddit, X, YouTube, documentation, and the web in one place.",
    longDescription:
      "Intent collects discussions, video transcripts, and documentation around a question, then uses AI to summarize the relevant material.",
    highlights: [
      "Multi-source information aggregation pipeline",
      "AI summaries and key-point extraction",
      "PostgreSQL and Neon database storage",
      "Responsive UI built with Next.js and Tailwind CSS",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon"],
    githubUrl: "https://github.com/harshittpanday/intent",
    featured: true,
    accentColor: "#A78BFA",
  },
  {
    id: "threadly",
    title: "ThreadLy",
    category: "Social",
    year: "2026",
    role: "Creator / Builder",
    description:
      "A social web app for posts, threaded discussions, media sharing, and user profiles.",
    longDescription:
      "ThreadLy uses Clerk for authentication, Firebase for post data, and Cloudinary for image uploads. Posts support threaded replies and live updates.",
    highlights: [
      "Clerk user authentication and profile management",
      "Firebase database synchronization for posts",
      "Cloudinary media upload integration",
      "Clean dark-mode interface with Tailwind CSS",
    ],
    stack: ["Next.js", "TypeScript", "Clerk", "Firebase", "Cloudinary"],
    githubUrl: "https://github.com/harshittpanday/threadly",
    featured: true,
    accentColor: "#FEF08A",
  },
  {
    id: "personal-ai",
    title: "Personal AI",
    category: "AI & Tools",
    year: "2025",
    role: "Creator / Builder",
    description:
      "An experiment with a local assistant that remembers context and answers questions about indexed documents.",
    longDescription:
      "This project tests semantic memory, document retrieval, and custom prompt routing with a local model.",
    highlights: [
      "Semantic indexing over notes and documents",
      "Conversational memory with local storage",
      "Modular Python and LangChain pipeline",
    ],
    stack: ["Python", "LangChain", "ChromaDB", "Ollama", "SQLite"],
    githubUrl: "https://github.com/harshittpanday/personal-ai",
    featured: false,
    accentColor: "#A78BFA",
  },
  {
    id: "study-system",
    title: "Study System",
    category: "Full-Stack",
    year: "2025",
    role: "Creator / Builder",
    description:
      "A workspace for organizing study material, concepts, sessions, and revision schedules.",
    longDescription:
      "Study System groups notes by subject and topic, tracks study sessions, and keeps revision plans in one place.",
    highlights: [
      "Subject taxonomy and hierarchical topic breakdown",
      "Clean, distraction-free markdown interface",
      "PostgreSQL and Prisma data layer",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/harshittpanday",
    featured: false,
    accentColor: "#FEF08A",
  },
  {
    id: "heliosynctech",
    title: "HelioSyncTech Web",
    category: "Web",
    year: "2025",
    role: "Web Developer",
    description:
      "A responsive client website with custom layouts, interactive sections, and motion.",
    longDescription:
      "A client website built with Next.js and Tailwind CSS, with responsive layouts and Framer Motion interactions.",
    highlights: [
      "Responsive mobile-to-desktop layouts",
      "Optimized image assets",
      "Interactive components with Framer Motion",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/harshittpanday",
    featured: false,
    accentColor: "#22D3EE",
  },
];

export const techStackCategories = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "Terminal", color: "#22D3EE" },
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
