/* ─────────────────────────────────────────────
   constants.ts — Single source of truth for all
   personal data used across the portfolio.
   ───────────────────────────────────────────── */

export const PERSONAL = {
  name: "Atharva Soundankar",
  monogram: "AS",
  githubUsername: "mercydeez",
  roles: [
    "AI Engineer",
    "Data Scientist",
    "Big Data Engineer",
    "ML Practitioner",
    "Data Analyst",
  ],
  tagline: "A Digital Detective, Solving Mysteries One Dataset at a Time.",
  bio: `Data Analyst & AI Practitioner with expertise in Python, SQL, Power BI, and Machine Learning. I turn raw data into actionable insights and build scalable, end-to-end AI solutions that automate processes and solve real business challenges. Currently pursuing Master of AI in Business at SP Jain School of Global Management.`,
  status: "Open for Opportunities",
  location: "Dubai, United Arab Emirates",
  email: "atharva3895@gmail.com",
  phone: ["+971-542238813", "+91-7798884495"],
  resumeDriveView:
    "https://drive.google.com/file/d/1BpRqrxAIG7yWJ7Av0qY5q5kFB3fYgty2/view?usp=sharing",
  resumeDirectDownload:
    "https://drive.google.com/uc?export=download&id=1BpRqrxAIG7yWJ7Av0qY5q5kFB3fYgty2",
} as const;

/* ─── Social Links ─────────────────────────── */

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // react-icons identifier resolved in component
  brandColor: string;
}

export const SOCIALS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/mercydeez",
    icon: "FaGithub",
    brandColor: "#ffffff",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/atharva-soundankar/",
    icon: "FaLinkedin",
    brandColor: "#0A66C2",
  },
  {
    name: "Twitter",
    url: "https://x.com/Atharva3895",
    icon: "FaXTwitter",
    brandColor: "#ffffff",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/atharva_soundankar/",
    icon: "FaInstagram",
    brandColor: "#E4405F",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/atharva.soundankar.7/",
    icon: "FaFacebook",
    brandColor: "#1877F2",
  },
  {
    name: "Medium",
    url: "https://medium.com/@atharva3895/",
    icon: "FaMedium",
    brandColor: "#ffffff",
  },
  {
    name: "Kaggle",
    url: "https://www.kaggle.com/atharvasoundankar",
    icon: "FaKaggle",
    brandColor: "#20BEFF",
  },
  {
    name: "Gmail",
    url: "mailto:atharva3895@gmail.com",
    icon: "SiGmail",
    brandColor: "#EA4335",
  },
];

/* ─── Stats ────────────────────────────────── */

export const STATS = [
  { label: "Projects", value: 10, suffix: "+" },
  { label: "Certifications", value: 5, suffix: "+" },
  { label: "Years Learning", value: 2, suffix: "+" },
  { label: "Research Paper Published", value: 1, suffix: "" },
];

/* ─── Currently Learning Ticker ────────────── */

export const LEARNING_ITEMS = [
  "LLMs",
  "RAG Pipelines",
  "Apache Kafka",
  "MLOps",
  "AWS SageMaker",
  "LangChain",
  "Vector Databases",
];

/* ─── Education ────────────────────────────── */

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export const EDUCATION: Education[] = [
  {
    institution: "SP Jain School of Global Management",
    degree: "Master of AI in Business",
    period: "Sept 2025 – Sept 2027",
    grade: "Admitted",
  },
  {
    institution: "Savitribai Phule Pune University",
    degree: "MSc Computer Application",
    period: "Sept 2023 – July 2025",
    grade: "A+ Grade",
  },
  {
    institution: "Savitribai Phule Pune University",
    degree: "BSc Computer Science",
    period: "Sept 2020 – July 2023",
    grade: "A Grade",
  },
];

/* ─── Skills ───────────────────────────────── */

export interface Skill {
  name: string;
  icon: string; // URL to logo
  category: string;
}

const cdnIcon = (name: string, color?: string) =>
  color
    ? `https://cdn.simpleicons.org/${name}/${color}`
    : `https://cdn.simpleicons.org/${name}`;

export const SKILL_CATEGORIES = [
  "Core Languages",
  "Data & ML",
  "Big Data",
  "Visualization",
  "Cloud & DevOps",
  "Databases",
];

export const SKILLS: Skill[] = [
  // Core Languages
  { name: "Python", icon: cdnIcon("python", "3776AB"), category: "Core Languages" },
  { name: "SQL", icon: cdnIcon("sqlite", "003B57"), category: "Core Languages" },
  { name: "R", icon: cdnIcon("r", "276DC3"), category: "Core Languages" },
  { name: "HTML5", icon: cdnIcon("html5", "E34F26"), category: "Core Languages" },
  { name: "CSS3", icon: cdnIcon("css3", "1572B6"), category: "Core Languages" },

  // Data & ML
  { name: "Scikit-learn", icon: cdnIcon("scikitlearn", "F7931E"), category: "Data & ML" },
  { name: "TensorFlow", icon: cdnIcon("tensorflow", "FF6F00"), category: "Data & ML" },
  { name: "Keras", icon: cdnIcon("keras", "D00000"), category: "Data & ML" },
  { name: "XGBoost", icon: cdnIcon("xgboost", "2C5BB4"), category: "Data & ML" },
  { name: "Pandas", icon: cdnIcon("pandas", "150458"), category: "Data & ML" },
  { name: "NumPy", icon: cdnIcon("numpy", "013243"), category: "Data & ML" },
  { name: "Matplotlib", icon: cdnIcon("matplotlib", "ffffff"), category: "Data & ML" },
  { name: "Seaborn", icon: cdnIcon("python", "3776AB"), category: "Data & ML" },

  // Big Data
  { name: "Apache Spark", icon: cdnIcon("apachespark", "E25A1C"), category: "Big Data" },
  { name: "Hadoop", icon: cdnIcon("apachehadoop", "66CCFF"), category: "Big Data" },
  { name: "Apache Kafka", icon: cdnIcon("apachekafka", "231F20"), category: "Big Data" },
  {
    name: "Apache Airflow",
    icon: cdnIcon("apacheairflow", "017CEE"),
    category: "Big Data",
  },
  { name: "Hive", icon: cdnIcon("apachehive", "FDEE21"), category: "Big Data" },
  { name: "Snowflake", icon: cdnIcon("snowflake", "29B5E8"), category: "Big Data" },

  // Visualization
  { name: "Power BI", icon: cdnIcon("powerbi", "F2C811"), category: "Visualization" },
  { name: "Tableau", icon: cdnIcon("tableau", "E97627"), category: "Visualization" },
  { name: "Plotly", icon: cdnIcon("plotly", "3F4F75"), category: "Visualization" },

  // Cloud & DevOps
  {
    name: "AWS",
    icon: cdnIcon("amazonaws", "FF9900"),
    category: "Cloud & DevOps",
  },
  { name: "Google Cloud", icon: cdnIcon("googlecloud", "4285F4"), category: "Cloud & DevOps" },
  {
    name: "Microsoft Azure",
    icon: cdnIcon("microsoftazure", "0078D4"),
    category: "Cloud & DevOps",
  },
  { name: "Docker", icon: cdnIcon("docker", "2496ED"), category: "Cloud & DevOps" },
  { name: "Git", icon: cdnIcon("git", "F05032"), category: "Cloud & DevOps" },
  { name: "GitHub", icon: cdnIcon("github", "ffffff"), category: "Cloud & DevOps" },

  // Databases
  { name: "MySQL", icon: cdnIcon("mysql", "4479A1"), category: "Databases" },
  { name: "PostgreSQL", icon: cdnIcon("postgresql", "4169E1"), category: "Databases" },
  { name: "MongoDB", icon: cdnIcon("mongodb", "47A248"), category: "Databases" },
];

export const PROFICIENCY_BARS = [
  { label: "Programming & Scripting", value: 60 },
  { label: "Data Analysis & Visualization", value: 65 },
  { label: "Machine Learning & Statistics", value: 50 },
  { label: "Leadership & Soft Skills", value: 70 },
];

/* ─── Projects ─────────────────────────────── */

export type ProjectCategory =
  | "All"
  | "Machine Learning"
  | "Data Analysis"
  | "Big Data"
  | "Full Stack"
  | "AI/ML";

export interface Project {
  title: string;
  description: string;
  impactNumber: string;
  fullDescription?: string;
  techTags: string[];
  metricBadge: string;
  keyMetrics?: string[];
  featureList?: string[];
  architectureDiagram?: string;
  liveDemo?: string;
  readmeUrl?: string;
  github: string;
  category: ProjectCategory;
  categories?: ProjectCategory[];
  featured?: boolean;
  flagship?: boolean;
}

export const PROJECT_FILTERS: ProjectCategory[] = [
  "All",
  "Machine Learning",
  "Data Analysis",
  "Big Data",
  "Full Stack",
  "AI/ML",
];

export const PROJECTS: Project[] = [
  {
    title: "Lulu Sales Intelligence Dashboard",
    description:
      "Enterprise-grade real-time sales analytics platform for Lulu Hypermarket UAE.",
    impactNumber: "15+", // Number of technologies
    fullDescription:
      "Production-grade, full-stack analytics platform featuring live streaming data via Server-Sent Events, AI-powered natural language assistant with OpenAI integration, role-based access control (RBAC) with JWT auth, predictive analytics, inventory management, employee performance tracking, and a promotions engine. Built for large-scale retail operations.",
    techTags: [
      "Next.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
      "TypeScript",
      "TailwindCSS",
      "OpenAI",
      "JWT",
      "SSE",
      "NGINX",
      "GitHub Actions",
      "REST API",
      "RBAC",
    ],
    metricBadge: "Full-Stack Analytics Platform",
    keyMetrics: [
      "Real-time SSE Streaming",
      "4-Tier RBAC System",
      "AI Chat + Voice Interface",
      "CI/CD via GitHub Actions",
      "Full Docker Compose Deployment",
    ],
    featureList: [
      "Real-time SSE streaming dashboard",
      "AI assistant with voice interface",
      "JWT auth + row-level security",
      "Inventory, promotions, employee modules",
      "pytest suite + GitHub Actions CI",
    ],
    architectureDiagram: `NGINX → Next.js Frontend + FastAPI Backend\n             ↓              ↓\n        PostgreSQL 15    Redis 7\n        (Sales/RBAC)  (PubSub/Cache)`,
    readmeUrl:
      "https://github.com/mercydeez/lulu-sales-intelligence-dashboard#readme",
    github:
      "https://github.com/mercydeez/lulu-sales-intelligence-dashboard",
    category: "Big Data",
    categories: ["Big Data", "Full Stack", "AI/ML"],
    featured: true,
    flagship: true,
  },
  {
    title: "Forest Fire Risk Prediction",
    description:
      "ML project predicting forest fire risk from environmental factors. Built with Streamlit, provides real-time predictions and visualizations.",
    impactNumber: "Real-time",
    techTags: ["Python", "Scikit-learn", "Streamlit", "Machine Learning"],
    metricBadge: "Risk Classification Model",
    liveDemo:
      "https://forest-fire-risk-prediction-d9vmff5zuuvjvgoyjqjvpr.streamlit.app/",
    github: "https://github.com/mercydeez/forest-fire-risk-prediction",
    category: "Machine Learning",
  },
  {
    title: "Lung Cancer Risk Prediction App",
    description:
      "Streamlit ML web app predicting lung cancer risk from symptoms using Random Forest. Features real-time prediction, clean UI, visual insights.",
    impactNumber: "RFC",
    techTags: ["Python", "Random Forest", "Scikit-learn", "Streamlit"],
    metricBadge: "Random Forest Classifier",
    liveDemo:
      "https://mercydeez-lung-cancer-predictor-app-cc7nc0.streamlit.app/",
    github: "https://github.com/mercydeez/lung_cancer_predictor",
    category: "Machine Learning",
  },
  {
    title: "Insurance Analysis Dashboard (Murphy BI)",
    description:
      "Power BI dashboard with insights into policy sales, claims, customer demographics, and revenue trends for Murphy Insurance Pvt. Ltd.",
    impactNumber: "BI 360°",
    techTags: ["Power BI", "DAX", "Data Analysis", "Business Intelligence"],
    metricBadge: "Business Intelligence Dashboard",
    liveDemo:
      "https://app.powerbi.com/groups/me/reports/2c40c8c8-4d2a-4568-8764-8c3940130c99/553669a642656e9f145a?ctid=d0d192ac-6b94-47ea-b38c-5bb83fd8c443&experience=power-bi",
    github: "https://github.com/mercydeez/Murphy_Insurance",
    category: "Data Analysis",
  },
  {
    title: "Google Play Store Analysis",
    description:
      "Analysis of Play Store data uncovering trends in app categories, ratings, and installations using Python, Pandas, Seaborn, Matplotlib.",
    impactNumber: "913K+",
    techTags: ["Python", "Pandas", "Seaborn", "Matplotlib", "EDA"],
    metricBadge: "Exploratory Data Analysis",
    github: "https://github.com/mercydeez/Google-Play-Analysis",
    category: "Data Analysis",
  },
];

/* ─── Experience ───────────────────────────── */

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const EXPERIENCES: Experience[] = [
  {
    role: "Jr. Data Analyst",
    company: "Manasvi Tech Solutions Pvt. Ltd.",
    duration: "December 2024 – July 2025",
    description:
      "Collected, cleaned, and analyzed data to identify trends and patterns, created reports and dashboards, and provided actionable insights to support business decisions and improve operational efficiency.",
  },
  {
    role: "Founder & CEO",
    company: "CodeTriumph Technologies",
    duration: "February 2025 – June 2025",
    description:
      "Led the company's vision and strategy, overseeing all operations and ensuring delivery of high-quality tech solutions to clients.",
  },
];

/* ─── Certifications ───────────────────────── */

export interface Certification {
  title: string;
  description: string;
  verifyUrl?: string;
  paperUrl?: string;
  certificateUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Goethe Institute A2 Certification",
    description:
      "Passed Goethe Institute A2 Exam — proficiency in basic German language skills (reading, writing, listening, speaking).",
    verifyUrl:
      "https://drive.google.com/file/d/19TwlmV_o3cNUJFYVjbYromEMSkZASjqE/view?usp=drive_link",
  },
  {
    title: "Google Cloud Data Analytics Certificate",
    description:
      "Cloud-based data analytics including SQL, data cleaning, visualization, and business intelligence.",
    verifyUrl:
      "https://www.credly.com/badges/1b182445-2b1c-4b40-8dc4-467fe4ba4433/public_url",
  },
  {
    title: "HackerRank SQL Certified",
    description:
      "HackerRank Basic SQL Certificate — querying databases, filtering, joins, and aggregations.",
    verifyUrl:
      "https://www.hackerrank.com/certificates/iframe/55fe6e819027",
  },
  {
    title: "Snowflake Hands-On Essentials — Data Warehouse",
    description:
      "Workshop covering identity/access management, data containers, ETL processes, and semi-structured data in Snowflake.",
    verifyUrl:
      "https://achieve.snowflake.com/4dce4d1a-5fc0-46a0-89f4-3d1d993d0185#acc.f3hSnZGQ",
  },
  {
    title: "Research Paper Published — AI Revolution in VR Industry",
    description:
      "Published in IJCRT Vol-10, Issue-1, Jan-June 2025. Explores how AI is transforming VR through AI-driven avatars, enhanced realism, and healthcare simulations.",
    paperUrl:
      "https://drive.google.com/file/d/1xk20KhieetT-3ELAabTpBuZrNOR6HiXj/view?usp=drive_link",
    certificateUrl:
      "https://drive.google.com/file/d/1hVYyRinfadoW7OdbZ0QVBBMjI15oUE4x/view?usp=drive_link",
  },
];

/* ─── Blogs ────────────────────────────────── */

export interface BlogPost {
  title: string;
  description: string;
  url: string;
}

export const BLOGS: BlogPost[] = [
  {
    title:
      "Timeless Leadership Lessons from Chhatrapati Shivaji Maharaj for Data Science & AI",
    description:
      "Explore how the strategic brilliance of Chhatrapati Shivaji Maharaj aligns with key principles in Data Science and AI — from data-driven decision-making to cybersecurity, adaptability, and innovation.",
    url: "https://medium.com/@atharva3895/chhatrapati-shivaji-maharaj-the-ultimate-strategist-a-lesson-for-data-science-5ddcc18d18de",
  },
  {
    title:
      "How Lanka Naresh Ravan's Mindset is Used in AI Today — And Its Vision for the Future",
    description:
      "As the world builds Artificial Intelligence, we are knowingly or unknowingly adopting the same mindset Ravan lived by — powerful, intelligent, and dangerously capable.",
    url: "https://medium.com/@atharva3895/how-lanka-naresh-ravans-mindset-is-used-in-ai-today-and-its-vision-for-the-future-85fb6731f792",
  },
];

/* ─── Navigation ───────────────────────────── */

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
