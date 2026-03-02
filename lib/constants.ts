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
  location: "Dubai, United Arab Emirates",
  status: "Open to AI/Data Engineering Roles",
  github: "https://github.com/mercydeez",
  linkedin: "https://www.linkedin.com/in/atharva-soundankar/",
  twitter: "https://x.com/Atharva3895",
  kaggle: "https://www.kaggle.com/atharvasoundankar",
  medium: "https://medium.com/@atharva3895",
  instagram: "https://www.instagram.com/atharva_soundankar/",
  instagramBrand: "https://www.instagram.com/ai.with.atharva/",
  resumeView: "https://drive.google.com/file/d/1jGQImDZQIKfrKM98UwaSmX_P00gK6R-5/view",
  resumeDownload: "https://drive.usercontent.google.com/download?id=1jGQImDZQIKfrKM98UwaSmX_P00gK6R-5&export=download&authuser=0",
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
  "LLMs", "RAG Pipelines", "LangChain",
  "MLOps", "MLflow", "Vector Databases",
]

export const EDUCATION = [
  {
    school: "SP Jain School of Global Management",
    degree: "Master of AI in Business",
    duration: "Sept 2025 – Sept 2027",
    grade: "Admitted ✓",
    monogram: "SPJ",
    logo: "/images/spj.png",
    color: "#FF6B35",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "MSc Computer Application",
    duration: "Sept 2023 – July 2025",
    grade: "A+ Grade",
    monogram: "SPPU",
    logo: "/images/sppu.png",
    color: "#0096FF",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "BSc Computer Science",
    duration: "Sept 2020 – July 2023",
    grade: "A Grade",
    monogram: "SPPU",
    logo: "/images/sppu.png",
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
    logo: "/images/manasvi.png",
    color: "#14B8A6",
    duration: "December 2024 – July 2025",
    description: "Collected, cleaned, and analyzed data to identify trends and patterns. Created dashboards and reports providing actionable insights to improve operational efficiency.",
  },
  {
    role: "Founder & CEO",
    company: "CodeTriumph Technologies",
    monogram: "CT",
    logo: "/images/code_triumph.png",
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
    logo: "/images/goethe.png",
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
    { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/8B8BCD" },
    { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/4DABCF" },
    { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/00A67E" },
    { name: "OpenAI", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z'/%3E%3C/svg%3E" },
    { name: "Claude", logo: "data:image/svg+xml,%3Csvg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23D97757' d='m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'/%3E%3C/svg%3E" },
    { name: "HuggingFace", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
    { name: "MLflow", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
    { name: "Weights & Biases", logo: "https://cdn.simpleicons.org/weightsandbiases/FFBE00" },
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
  ],
  "Cloud & DevOps": [
    { name: "Azure", logo: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" },
    { name: "AWS", logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" },
    { name: "GCP", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
  ],
  "Databases & Vector Stores": [
    { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Redis", logo: "https://cdn.simpleicons.org/redis/FF4438" },
    { name: "Pinecone", logo: "https://avatars.githubusercontent.com/u/54333248?s=200&v=4" },
  ],
  "Web & Frameworks": [
    { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  ],
  "Data Visualization": [
    { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
    { name: "Matplotlib", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Plotly", logo: "https://cdn.simpleicons.org/plotly/7B8EC8" },
  ],
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
