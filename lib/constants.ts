export const PERSONAL = { email: "atharva3895@gmail.com" }; // Preserved for CommandBar

export const SOCIALS = [
  { name: "GitHub", url: "https://github.com/mercydeez" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/atharva-soundankar/" },
  { name: "Kaggle", url: "https://www.kaggle.com/atharvasoundankar" },
  { name: "Instagram", url: "https://www.instagram.com/atharva_soundankar/" },
]; // Preserved for CommandBar

export const PERSONAL_INFO = {
  name: "Atharva Soundankar",
  title: "AI & Big Data Engineer",
  roles: [
    "AI & Big Data Engineer",
    "Data Scientist",
    "ML Practitioner",
    "Data Analyst",
  ],
  subtitle: "Building scalable data pipelines and intelligent ML systems — from raw data to production-ready AI solutions.",
  email: "atharva3895@gmail.com",
  phone: "+91-7798884495",
  location: "India → Global",
  status: "Open to AI/Data Engineering Roles",
  github: "https://github.com/mercydeez",
  linkedin: "https://www.linkedin.com/in/atharva-soundankar/",
  twitter: "https://x.com/Atharva3895",
  kaggle: "https://www.kaggle.com/atharvasoundankar",
  medium: "https://medium.com/@atharva3895",
  instagram: "https://www.instagram.com/atharva_soundankar/",
  instagramBrand: "https://www.instagram.com/ai.with.atharva/",
  resumeView: "https://drive.google.com/file/d/1BpRqrxAIG7yWJ7Av0qY5q5kFB3fYgty2/view",
  resumeDownload: "https://drive.google.com/uc?export=download&id=1BpRqrxAIG7yWJ7Av0qY5q5kFB3fYgty2",
}

export const BIO = [
  "I'm an AI & Data Engineer who transforms raw data into decisions that matter — and documents the journey to make AI accessible for everyone.",
  "Proficient in Python, SQL, and Machine Learning, I build end-to-end systems from data ingestion to production deployment. Currently pursuing Master of AI in Business at SP Jain School of Global Management, Mumbai.",
  "I also run @ai.with.atharva on Instagram & Threads — simplifying AI concepts for students and early-career professionals.",
]

export const BIO_HIGHLIGHTED_WORDS = [
  "Python", "SQL", "Machine Learning",
  "SP Jain School of Global Management",
  "@ai.with.atharva"
]

export const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "913K+", label: "Records Analyzed" },
  { value: "5+", label: "Certifications" },
  { value: "1", label: "Research Paper" },
]

export const CURRENTLY_LEARNING = [
  "LLMs", "RAG Pipelines", "LangChain", "Vector Databases",
  "AWS SageMaker", "MLOps", "LlamaIndex", "Prompt Engineering",
  "Apache Kafka Streams", "Fine-tuning LLMs", "Apache Flink",
]

export const EDUCATION = [
  {
    school: "SP Jain School of Global Management",
    degree: "Master of AI in Business",
    duration: "Sept 2025 – Sept 2027",
    grade: "Admitted ✓",
    monogram: "SPJ",
    color: "#FF6B35",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "MSc Computer Application",
    duration: "Sept 2023 – July 2025",
    grade: "A+ Grade",
    monogram: "SPPU",
    color: "#0096FF",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "BSc Computer Science",
    duration: "Sept 2020 – July 2023",
    grade: "A Grade",
    monogram: "SPPU",
    color: "#0096FF",
  },
]

export type ProjectCategory = "All" | "Machine Learning" | "Data Analysis" | "Big Data" | "Full Stack" | "AI/ML";

export const PROJECT_FILTERS: ProjectCategory[] = [
  "All",
  "Machine Learning",
  "Data Analysis",
  "Big Data",
  "Full Stack",
  "AI/ML",
];

export const PROJECTS = [
  {
    id: "lulu",
    featured: true,
    name: "Lulu Sales Intelligence Dashboard",
    badge: "⭐ ENTERPRISE",
    badgeColor: "#FFB800",
    impact: "15+",
    impactLabel: "Technologies",
    description: "Enterprise real-time analytics platform for Lulu Hypermarket UAE. Event-driven architecture with SSE streaming, AI chat assistant with OpenAI integration, 4-tier RBAC, Docker Compose deployment, and CI/CD pipeline.",
    problem: "Large retail operations lack real-time visibility across distributed stores.",
    approach: "Built event-driven architecture with SSE streaming, Redis pub/sub, JWT RBAC, and AI-powered natural language querying.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "OpenAI", "JWT", "SSE", "NGINX", "GitHub Actions"],
    architecture: "NGINX → Next.js + FastAPI → PostgreSQL + Redis",
    github: "https://github.com/mercydeez/lulu-sales-intelligence-dashboard",
    category: ["Big Data", "Full Stack"],
  },
  {
    id: "forest-fire",
    featured: false,
    name: "Forest Fire Risk Prediction",
    impact: "Real-time",
    impactLabel: "Predictions",
    description: "End-to-end ML pipeline predicting forest fire risk from environmental sensors. Deployed on Streamlit Cloud with real-time risk scoring.",
    problem: "Environmental monitoring needs automated early warning systems.",
    approach: "Data ingestion, feature engineering, Random Forest classification, deployed via Streamlit.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    live: "https://forest-fire-risk-prediction-d9vmff5zuuvjvgoyjqjvpr.streamlit.app/",
    github: "https://github.com/mercydeez/forest-fire-risk-prediction",
    category: ["Machine Learning"],
  },
  {
    id: "lung-cancer",
    featured: false,
    name: "Lung Cancer Risk Prediction",
    impact: "RFC",
    impactLabel: "Classifier",
    description: "Clinical symptom classification using Random Forest. End-to-end ML pipeline with feature selection, model evaluation, deployed on Streamlit Cloud.",
    problem: "Clinical symptom data needs fast ML-based risk screening.",
    approach: "Supervised classification pipeline with feature selection and model evaluation.",
    tech: ["Python", "Random Forest", "Scikit-learn", "Streamlit"],
    live: "https://mercydeez-lung-cancer-predictor-app-cc7nc0.streamlit.app/",
    github: "https://github.com/mercydeez/lung_cancer_predictor",
    category: ["Machine Learning"],
  },
  {
    id: "insurance",
    featured: false,
    name: "Insurance Analysis Dashboard",
    impact: "BI",
    impactLabel: "Dashboard",
    description: "Multi-page Power BI dashboard covering policy sales, claims analysis, customer demographics, and revenue trends for Murphy Insurance.",
    problem: "Insurance data siloed with no unified analytics view.",
    approach: "Data modeling and DAX measures for full policy lifecycle analytics.",
    tech: ["Power BI", "DAX", "Data Modeling"],
    github: "https://github.com/mercydeez/Murphy_Insurance",
    category: ["Data Analysis"],
  },
  {
    id: "google-play",
    featured: false,
    name: "Google Play Store Analysis",
    impact: "913K+",
    impactLabel: "Records",
    description: "Full EDA pipeline analyzing 913,000+ app records. Data cleaning, transformation, statistical analysis, and multi-variable visualization.",
    problem: "App market trends hidden in unstructured store listing data.",
    approach: "Complete EDA pipeline — cleaning, transformation, statistical analysis, visualization.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    github: "https://github.com/mercydeez/Google-Play-Analysis",
    category: ["Data Analysis"],
  },
]

export const EXPERIENCE = [
  {
    role: "Jr. Data Analyst",
    company: "Manasvi Tech Solutions Pvt. Ltd.",
    monogram: "MT",
    color: "#14B8A6",
    duration: "December 2024 – July 2025",
    description: "Collected, cleaned, and analyzed data to identify trends and patterns. Created dashboards and reports providing actionable insights to improve operational efficiency.",
  },
  {
    role: "Founder & CEO",
    company: "CodeTriumph Technologies",
    monogram: "CT",
    color: "#FF6B35",
    duration: "February 2025 – June 2025",
    description: "Led company vision and strategy, overseeing all operations and delivery of high-quality tech solutions to clients.",
  },
]

export const CERTIFICATIONS = [
  {
    id: "research-paper",
    featured: true,
    title: "AI Revolution in the Virtual Reality Industry",
    issuer: "IJCRT (International Journal)",
    badge: "PUBLISHED",
    badgeColor: "#FFB800",
    description: "Published in IJCRT Vol-10, Issue-1, Jan-June 2025. Explores AI transforming VR through AI-driven avatars, enhanced realism, and healthcare simulations.",
    citation: 'Soundankar, A. (2025). "AI Revolution in the Virtual Reality Industry." International Journal of Computer Research & Technology (IJCRT), Vol-10, Issue-1.',
    paperUrl: "https://drive.google.com/file/d/1xk20KhieetT-3ELAabTpBuZrNOR6HiXj/view",
    certUrl: "https://drive.google.com/file/d/1hVYyRinfadoW7OdbZ0QVBBMjI15oUE4x/view",
  },
  {
    id: "google-cloud",
    title: "Google Cloud Data Analytics Certificate",
    issuer: "Google Cloud",
    logo: "https://cdn.simpleicons.org/googlecloud/4285F4",
    description: "Cloud-based data analytics including SQL, data cleaning, visualization, and business intelligence.",
    verifyUrl: "https://www.credly.com/badges/1b182445-2b1c-4b40-8dc4-467fe4ba4433/public_url",
  },
  {
    id: "hackerrank",
    title: "HackerRank SQL Certified",
    issuer: "HackerRank",
    logo: "https://cdn.simpleicons.org/hackerrank/2EC866",
    description: "SQL fundamentals — querying, filtering, joins, and aggregations.",
    verifyUrl: "https://www.hackerrank.com/certificates/iframe/55fe6e819027",
  },
  {
    id: "snowflake",
    title: "Snowflake Hands-On Essentials — Data Warehouse",
    issuer: "Snowflake",
    logo: "https://cdn.simpleicons.org/snowflake/29B5E8",
    description: "IAM, data containers, ETL processes, and semi-structured data in Snowflake.",
    verifyUrl: "https://achieve.snowflake.com/4dce4d1a-5fc0-46a0-89f4-3d1d993d0185",
  },
  {
    id: "goethe",
    title: "Goethe Institute A2 Certification",
    issuer: "Goethe Institut",
    monogram: "G",
    color: "#DC2626",
    description: "German language proficiency — reading, writing, listening, and speaking.",
    verifyUrl: "https://drive.google.com/file/d/19TwlmV_o3cNUJFYVjbYromEMSkZASjqE/view",
  },
]

export const BLOGS = [
  {
    title: "Timeless Leadership Lessons from Chhatrapati Shivaji Maharaj for Data Science & AI",
    tag: "AI Philosophy",
    readTime: "5 min read",
    excerpt: "How Shivaji Maharaj's strategic brilliance aligns with data-driven decision-making, cybersecurity, adaptability, and innovation in AI.",
    url: "https://medium.com/@atharva3895/chhatrapati-shivaji-maharaj-the-ultimate-strategist-a-lesson-for-data-science-5ddcc18d18de",
  },
  {
    title: "How Lanka Naresh Ravan's Mindset is Used in AI Today — And Its Vision for the Future",
    tag: "AI Ethics",
    readTime: "4 min read",
    excerpt: "Building AI mirrors Ravan's mindset — powerful, intelligent, and dangerously capable.",
    url: "https://medium.com/@atharva3895/how-lanka-naresh-ravans-mindset-is-used-in-ai-today-and-its-vision-for-the-future-85fb6731f792",
  },
  {
    title: "Next Article Coming Soon...",
    tag: "In Progress",
    readTime: "",
    excerpt: "Follow on Medium to get notified when the next article drops.",
    url: "https://medium.com/@atharva3895",
    comingSoon: true,
  },
]

export const SKILLS = {
  "ML / AI": [
    { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
    { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
    { name: "Scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/150458" },
    { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
    { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/00C4B4" },
    { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/FFFFFF" },
    { name: "HuggingFace", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  ],
  "Big Data": [
    { name: "Apache Spark", logo: "https://cdn.simpleicons.org/apachespark/E25A1C" },
    { name: "Kafka", logo: "https://cdn.simpleicons.org/apachekafka/FFFFFF" },
    { name: "Airflow", logo: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
    { name: "Snowflake", logo: "https://cdn.simpleicons.org/snowflake/29B5E8" },
    { name: "Databricks", logo: "https://cdn.simpleicons.org/databricks/FF3621" },
  ],
  "Languages & Core": [
    { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "SQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "R", logo: "https://cdn.simpleicons.org/r/276DC3" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
    { name: "GCP", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
    { name: "Azure", logo: "https://cdn.simpleicons.org/microsoftazure/0078D4" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
  ],
  "Databases": [
    { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
  ],
  "Visualization": [
    { name: "Power BI", logo: "https://cdn.simpleicons.org/powerbi/F2C811" },
    { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau/E97627" },
    { name: "Plotly", logo: "https://cdn.simpleicons.org/plotly/3F4F75" },
    { name: "Matplotlib", logo: "https://cdn.simpleicons.org/matplotlib/11557C" },
  ],
  "Web & Frameworks": [
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
    { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  ],
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
