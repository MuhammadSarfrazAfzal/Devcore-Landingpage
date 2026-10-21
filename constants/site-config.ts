/**
 * DevCore — Centralized Site & Brand Configuration
 * All company details, taglines, contact information, and external links are centralized here.
 */

export const BRAND_NAME = "DevCore";
export const BRAND_LABEL = "DEVCORE / DIGITAL ENGINEERING";
export const BUSINESS_CATEGORY = "Software Development & Digital Experiences";
export const BUSINESS_EMAIL = "devcore@devcore.com";
export const EMAIL_MAILTO = "mailto:devcore@devcore.com";

export const PRIMARY_TAGLINE = "We Build Digital Experiences Beyond Ordinary.";
export const SHORT_TAGLINE = "Building Things That Matter.";

export const BRAND_DESCRIPTION =
  "DevCore engineers high-performance web applications and immersive digital experiences for ambitious businesses. We combine thoughtful design, reliable engineering, and modern technology to turn ideas into impactful digital products.";

export const ABOUT_DEVCORE = {
  heading: "Engineering Ideas Into Reality",
  description:
    "DevCore is a software development company focused on building meaningful digital products. We bring together software engineering, modern interface design, and interactive technologies to create experiences that look exceptional and work reliably. From responsive websites to full-stack applications and immersive 3D experiences, our approach combines technical precision with practical business thinking. We believe great software should do more than look impressive. It should solve real problems, simplify workflows, and help businesses move forward.",
};

/**
 * External Links & Social Profiles
 * NOTE: The external URLs below are company placeholders as specified in brand guidelines.
 * They are not verified production accounts and are marked isPlaceholder: true.
 */
export const GITHUB_URL = "https://github.com/your-username";
export const LINKEDIN_URL = "https://www.linkedin.com/company/your-company";
export const INSTAGRAM_URL = "https://www.instagram.com/your-brand";
export const PORTFOLIO_URL = "https://your-website-domain.com";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: GITHUB_URL,
    isPlaceholder: true,
  },
  {
    name: "LinkedIn",
    url: LINKEDIN_URL,
    isPlaceholder: true,
  },
  {
    name: "Instagram",
    url: INSTAGRAM_URL,
    isPlaceholder: true,
  },
  {
    name: "Email",
    url: EMAIL_MAILTO,
    isPlaceholder: false,
  },
];

export const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Responsive, accessible, and high-performance websites designed to deliver a polished experience across devices.",
  },
  {
    id: "02",
    title: "Full-Stack Development",
    description:
      "End-to-end web applications built with reliable frontend architecture, secure backend systems, and maintainable code.",
  },
  {
    id: "03",
    title: "UI/UX Engineering",
    description:
      "Thoughtful digital interfaces that combine intuitive user journeys, visual clarity, and practical functionality.",
  },
  {
    id: "04",
    title: "Immersive 3D Experiences",
    description:
      "Interactive 3D websites, motion-driven storytelling, and immersive digital experiences for modern brands.",
  },
  {
    id: "05",
    title: "API & System Integration",
    description:
      "Reliable integrations that connect applications, services, and business workflows.",
  },
  {
    id: "06",
    title: "AI-Powered Solutions",
    description:
      "Practical AI integrations and intelligent workflows designed around real business requirements.",
  },
];

export const WORKING_PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We understand the business requirements, target users, and goals behind every project.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We plan the experience, structure the interface, and define the technical approach.",
  },
  {
    step: "03",
    title: "Engineer",
    description:
      "We build, integrate, and test the solution with attention to performance and maintainability.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "We validate the result and prepare the product for deployment and future improvement.",
  },
];

export const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Three.js",
  "GSAP",
];

export const SITE_CONFIG = {
  name: BRAND_NAME,
  brandLabel: BRAND_LABEL,
  category: BUSINESS_CATEGORY,
  email: BUSINESS_EMAIL,
  emailMailto: EMAIL_MAILTO,
  tagline: PRIMARY_TAGLINE,
  shortTagline: SHORT_TAGLINE,
  description: BRAND_DESCRIPTION,
  githubUrl: GITHUB_URL,
  linkedinUrl: LINKEDIN_URL,
  instagramUrl: INSTAGRAM_URL,
  portfolioUrl: PORTFOLIO_URL,
  about: ABOUT_DEVCORE,
  services: SERVICES,
  process: WORKING_PROCESS,
  stack: TECH_STACK,
};
