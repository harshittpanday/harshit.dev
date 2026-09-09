export const siteConfig = {
  name: "Harshit Pandey",
  siteName: "harshittpanday",
  title: "Harshit Pandey — Student, Developer & Creator",
  description:
    "Harshit Pandey is a student and developer building desktop software, developer tools, AI-assisted research, and web products.",
  url: "https://harshittpanday.is-a.dev",
  email: "harshittpanday@gmail.com",
  location: "Lucknow, India",
  timezone: "Asia/Kolkata",
  status: "Open to opportunities, internships, collaborations & projects",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/harshittpanday",
    linkedin: "https://www.linkedin.com/in/harshit-r-pandey-02842b410/",
    twitter: "https://x.com/harshittpandayy",
  },
  // Centralized intro / preloader configuration
  intro: {
    enabled: true,
    greetingIntervalMs: 220,
    totalDurationMs: 2400,
    greetings: [
      { text: "Hello", lang: "English" },
      { text: "नमस्ते", lang: "Hindi" },
      { text: "Bonjour", lang: "French" },
      { text: "こんにちは", lang: "Japanese" },
      { text: "Hola", lang: "Spanish" },
      { text: "Hallo", lang: "German" },
      { text: "Ciao", lang: "Italian" },
      { text: "Olá", lang: "Portuguese" },
      { text: "Привет", lang: "Russian" },
      { text: "مرحبا", lang: "Arabic" },
    ],
    exitCurveDurationSec: 0.85,
  },
  navItems: [
    { label: "Home", href: "#home", icon: "Home" },
    { label: "About Me", href: "#about", icon: "User" },
    { label: "Projects", href: "#projects", icon: "Briefcase" },
    { label: "Skills", href: "#skills", icon: "Code2" },
  ],
};
