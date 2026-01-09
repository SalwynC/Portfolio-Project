export const personalInfo = {
  name: "Salwyn Christopher",
  title: "Full Stack Developer",
  tagline: "Final year CSE student at KL University, passionate about building scalable web applications and cloud-powered solutions.",
  email: "22000326868cser@gmail.com",
  location: "Guntur, India",
  social: {
    github: "https://github.com/salwync",
    linkedin: "https://linkedin.com/in/salwyn-christopher",
  },
}

export const skills = {
  languages: ["Java", "Python", "TypeScript", "JavaScript", "C", "SQL"],
  frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "React Native", "Tailwind CSS"],
  tools: ["Git", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Docker"],
  concepts: ["REST APIs", "Data Structures", "Algorithms", "OOP", "WebSocket", "Cloud Computing", "Agile"],
}

export const experience = [
  {
    id: 1,
    title: "Python Full Stack Developer",
    company: "AICTE (Google Virtual Internship)",
    companyUrl: "https://www.aicte-india.org/",
    location: "Remote",
    period: "Cohort 12",
    description: [
      "Developed full-stack web applications using Python and Django, implementing frontend views and backend business logic",
      "Designed and consumed RESTful APIs, performing CRUD operations with relational databases",
      "Ensured efficient data flow across application layers with proper architecture design",
    ],
    technologies: ["Python", "Django", "REST APIs", "PostgreSQL", "Git"],
  },
  {
    id: 2,
    title: "Cloud Engineering Intern",
    company: "AICTE (Google Virtual Internship)",
    companyUrl: "https://www.aicte-india.org/",
    location: "Remote",
    period: "Cohort 11",
    description: [
      "Built scalable web applications using React.js with dynamic data handling through REST APIs",
      "Deployed applications on AWS, developed backend services using Node.js and Express.js",
      "Collaborated with teams using Git for version control and project management",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "AWS", "REST APIs", "Git"],
  },
  {
    id: 3,
    title: "Android Development Intern",
    company: "AICTE (Google Virtual Internship)",
    companyUrl: "https://www.aicte-india.org/",
    location: "Remote",
    period: "Cohort 8",
    description: [
      "Developed Android applications using Jetpack Compose to build modern and responsive user interfaces",
      "Integrated backend services using REST APIs, optimized application performance with Kotlin",
      "Managed projects using Android Studio and Git for efficient development workflow",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Android Studio", "REST APIs", "Git"],
  },
]

export const projects = [
  {
    id: 1,
    title: "Nimbus: Cloud-Powered Study Hub",
    description:
      "A cloud-based academic platform where engineering students can access study resources like notes, past exams, videos, and guides from any device with real-time doubt resolution and dark mode support.",
    image: "/collaboration-platform-dashboard-dark-modern.jpg",
    technologies: ["Node.js", "Firebase", "AWS S3", "React Native", "Firestore"],
    category: "Cloud",
    github: "https://github.com/salwync",
    demo: "",
    featured: true,
  },
  {
    id: 2,
    title: "SkyBook: Airline Reservation System",
    description:
      "A full-stack flight booking platform enabling users to search, book, and manage flight reservations with admin functionality for managing schedules, seats, and secure database operations.",
    image: "/code-editor-with-ai-suggestions-dark-theme.jpg",
    technologies: ["Python", "Django", "PostgreSQL", "MySQL", "REST APIs"],
    category: "Python Full Stack",
    github: "https://github.com/salwync",
    demo: "",
    featured: true,
  },
  {
    id: 3,
    title: "CanvasVerse: Online Art Gallery",
    description: "A dynamic platform for artists and buyers to display, sell, bid on, and discover artwork with a scalable backend using MongoDB and Express.js and responsive React.js interface.",
    image: "/machine-learning-platform-interface.jpg",
    technologies: ["Node.js", "MongoDB", "Express.js", "React.js", "Git"],
    category: "MERN Full Stack",
    github: "https://github.com/salwync",
    demo: "",
    featured: true,
  },
]

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Information Technology",
    school: "KL University",
    location: "Guntur, India",
    period: "August 2022 — June 2026",
    gpa: "8.02/10.0",
    coursework: [
      "Operating Systems",
      "Data Structures",
      "Analysis of Algorithms",
      "Software Engineering",
      "Networking",
      "Databases",
      "Cloud Computing",
      "Full Stack Web Development",
    ],
    achievements: [
      "AWS Cloud Practitioner Certified",
      " AZ -900: Microsoft Azure Fundamentals Certified",
      "RPA Essentials Certified",
    ],
  },
]

export const categories = ["All", "Full Stack"]
