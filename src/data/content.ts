/* ------------------------------------------------------------------ */
/*  Single source of truth for every piece of content on the site.     */
/*  Contains verified profile and portfolio data for Chandru Chandran. */
/* ------------------------------------------------------------------ */

export const personal = {
  name: "Chandru Chandran",
  firstName: "CHANDRU",
  lastName: "CHANDRAN",
  title: "Game Developer | VR Developer",
  roles: ["GAME DEVELOPER", "VR DEVELOPER"],
  location: "Chennai, India",
  nativePlace: "Dharmapuri, Tamil Nadu, India",
  phone: "8270773803",
  phoneHref: "tel:8270773803",
  email: "chandruchandran0712@gmail.com",
  emailHref: "mailto:chandruchandran0712@gmail.com",
  githubLabel: "github.com/ChandruChandraan",
  githubHref: "https://github.com/ChandruChandraan",
  linkedinLabel: "linkedin.com/in/chandru-chandran-b46b312aa",
  linkedinHref: "https://www.linkedin.com/in/chandru-chandran-b46b312aa/",
  portfolioLabel: "chandruchandraan.github.io/chandru-portfolio",
  portfolioHref: "https://chandruchandraan.github.io/chandru-portfolio/",
  resumeLabel: "Download Resume",
  resumeHref: "./Chandru_Chandran_Resume.pdf",
  cvLabel: "Download CV",
  cvHref: "./Chandru_Chandran_CV.pdf",
  heroIntro:
    "Game and VR Developer specializing in real-time 3D development, immersive applications, VR simulation, visualization, and interactive experiences.",
  summary: [
    "I am a Game and VR Developer specializing in real-time 3D development, immersive applications, VR simulation, visualization, and interactive experiences. I have professional experience working with Unreal Engine, Blueprint development, VR interaction design, level design, networking, performance optimization, and real-time 3D systems.",
    "My experience includes VR simulation, architectural visualization, medical visualization, interactive applications, camera-integrated systems, and embedded-device integration. I enjoy transforming technical concepts into interactive and immersive digital experiences.",
  ],
  primaryFocus: ["UNREAL ENGINE", "VR / XR DEVELOPMENT", "REAL-TIME 3D & SIMULATION"],
};

export const whatIDo = [
  {
    title: "Game Development",
    desc: "Building interactive real-time 3D experiences, gameplay systems, environments, and simulations using Unreal Engine.",
    tag: "UNREAL // BLUEPRINTS",
  },
  {
    title: "VR Development",
    desc: "Creating immersive VR applications with interactive environments, controls, physics, and real-time feedback.",
    tag: "OPENXR // IMMERSIVE",
  },
  {
    title: "3D Visualization",
    desc: "Developing architectural, medical, anatomical, and simulation-focused 3D visualization applications with real-time fidelity.",
    tag: "ARCHVIZ // MEDICAL",
  },
  {
    title: "Interactive Applications",
    desc: "Developing real-time applications, interactive kiosks, camera-integrated systems, and specialized hardware-software solutions.",
    tag: "KIOSKS // EMBEDDED",
  },
];

export const nav = [
  { id: "home", label: "HOME", short: "HOME" },
  { id: "about", label: "ABOUT", short: "ABOUT" },
  { id: "experience", label: "EXPERIENCE", short: "EXP." },
  { id: "projects", label: "PROJECTS", short: "PROJ." },
  { id: "work", label: "SELECTED WORK", short: "WORK" },
  { id: "unreal", label: "UNREAL ENGINE", short: "UNREAL" },
  { id: "skills", label: "SKILLS", short: "SKILLS" },
  { id: "education", label: "EDUCATION", short: "EDU." },
  { id: "contact", label: "CONTACT", short: "CONTACT" },
] as const;

export const experience = {
  period: "2022 — PRESENT",
  role: "GAME / VR DEVELOPER",
  company: "DEO VERSE",
  location: "Chennai, India",
  tagline:
    "At Deo Verse, I work on real-time 3D, VR, simulation, visualization, and interactive application development.",
  items: [
    {
      id: "2.1",
      title: "VR SIMULATION & PHYSICS CONTROLS",
      desc: "Developed VR simulation experiences with physics-based controls and real-time feedback using Unreal Engine and Blueprint workflows.",
    },
    {
      id: "2.2",
      title: "ARCHITECTURAL VISUALIZATION",
      desc: "Built architectural visualization applications for PC and VR platforms.",
    },
    {
      id: "2.3",
      title: "GAMEPLAY & VR INTERACTION SYSTEMS",
      desc: "Implemented gameplay and VR interaction systems.",
    },
    {
      id: "2.4",
      title: "SELFIE BOOTH & INTERACTIVE KIOSKS",
      desc: "Created camera-integrated selfie booth and interactive kiosk applications.",
    },
    {
      id: "2.5",
      title: "REAL-TIME 3D & LEVEL DESIGN",
      desc: "Developed real-time 3D environments and level-design workflows.",
    },
    {
      id: "2.6",
      title: "PERFORMANCE OPTIMIZATION",
      desc: "Worked on performance optimization for real-time applications.",
    },
    {
      id: "2.7",
      title: "MEDICAL & ANATOMY VISUALIZATION",
      desc: "Contributed to medical visualization and anatomy-focused interactive 3D applications.",
    },
    {
      id: "2.8",
      title: "PROFESSIONAL PRODUCT SUITE",
      desc: "Worked across professional applications including Deo Vision – DICOM Viewer, D-Tiler, DeoVerse Simulator, Dhaksha, Anatomy, and Deo + Med + Defence.",
    },
  ],
};

export type Project = {
  n: string;
  title: string;
  tag: string;
  desc: string;
  stack: string[];
  image: string;
  imageAlt: string;
  videoId?: string;
  sub?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    title: "DEO VISION – DICOM VIEWER",
    tag: "VR // MEDICAL 3D VOLUMETRIC RECONSTRUCTION",
    desc: "Medical visualization application focused on viewing and interacting with DICOM medical imaging data.",
    stack: [
      "UNREAL ENGINE",
      "DICOM 3D DATA",
      "VR MEDICAL",
      "VOLUMETRIC RECONSTRUCTION",
      "REAL-TIME SHADERS",
    ],
    image: "images/deo-vision-dicom.jpg",
    imageAlt: "Deo Vision DICOM Viewer real-time 3D medical volume reconstruction",
    videoId: "HNVgJfvbqTQ",
    sub: "MEDICAL VISUALIZATION APPLICATION",
  },
  {
    n: "02",
    title: "D-TILER",
    tag: "VISUALIZATION // APPLICATION PORTFOLIO",
    desc: "Visualization-focused application developed within the Deo Verse professional application portfolio.",
    stack: [
      "UNREAL ENGINE",
      "VISUALIZATION",
      "MATERIAL SYSTEMS",
      "INTERACTIVE UI",
      "REAL-TIME 3D",
    ],
    image: "images/d-tiler.jpg",
    imageAlt: "D-Tiler visualization application",
    videoId: "61bBNSW0eBQ",
    sub: "VISUALIZATION APPLICATION",
  },
  {
    n: "03",
    title: "DEOVERSE SIMULATOR",
    tag: "SIMULATION // REAL-TIME 3D & IMMERSIVE",
    desc: "Simulation application involving real-time 3D environments, interaction, and immersive experiences.",
    stack: [
      "UNREAL ENGINE",
      "SIMULATION SYSTEMS",
      "REAL-TIME 3D",
      "VR INTERACTION",
      "PHYSICS MECHANICS",
    ],
    image: "images/deoverse-sim.jpg",
    imageAlt: "DeoVerse Simulator real-time 3D simulation environment",
    videoId: "JUrkHQlcbRo",
    sub: "SIMULATION & 3D WALKTHROUGH",
  },
  {
    n: "04",
    title: "DHAKSHA",
    tag: "INTERACTIVE TECH // PROFESSIONAL APPLICATION",
    desc: "Interactive technology application developed within the Deo Verse professional environment.",
    stack: [
      "UNREAL ENGINE",
      "PHYSICS CONTROLS",
      "VR SIMULATION",
      "REAL-TIME INTERACTION",
      "BLUEPRINTS",
    ],
    image: "images/dhaksha.jpg",
    imageAlt: "Dhaksha interactive technology application",
    videoId: "d3XJoURtweA",
    sub: "INTERACTIVE TECHNOLOGY APPLICATION",
  },
  {
    n: "05",
    title: "ANATOMY",
    tag: "VR // MEDICAL & ANATOMICAL VISUALIZATION",
    desc: "Medical and anatomical visualization application focused on interactive 3D visualization.",
    stack: [
      "UNREAL ENGINE",
      "VR ANATOMY",
      "MEDICAL VISUALIZATION",
      "BIOMETRIC HUD",
      "SPATIAL INTERACTION",
    ],
    image: "images/vr-anatomy.jpg",
    imageAlt: "Anatomy interactive 3D medical visualization",
    sub: "MEDICAL & ANATOMICAL VISUALIZATION",
  },
  {
    n: "06",
    title: "DEO + MED + DEFENCE",
    tag: "SPECIALIZED WORKSTREAM // REAL-TIME TECH",
    desc: "Professional application/workstream involving real-time visualization and interactive technology for specialized use cases.",
    stack: [
      "UNREAL ENGINE",
      "REAL-TIME VISUALIZATION",
      "SIMULATION",
      "TRIAGE HUD",
      "INTERACTIVE TECH",
    ],
    image: "images/deo-med-defence.jpg",
    imageAlt: "Deo + Med + Defence specialized real-time visualization workstream",
    videoId: "HyKbepj3pls",
    sub: "SPECIALIZED INTERACTIVE WORKSTREAM",
  },
];

export type WorkItem = {
  n: string;
  title: string;
  sub?: string;
  videoId: string;
  span: string;
  aspect: string;
  image: string;
  tall?: boolean;
};

/* Verified project demo videos matching the 6 professional projects */
export const selectedWork: WorkItem[] = [
  {
    n: "01",
    title: "DEO VISION – DICOM VIEWER",
    sub: "MEDICAL 3D VISUALIZATION",
    videoId: "HNVgJfvbqTQ",
    image: "images/deo-vision-dicom.jpg",
    span: "md:col-span-2 lg:col-span-8",
    aspect: "aspect-[16/9]",
  },
  {
    n: "02",
    title: "D-TILER",
    sub: "VISUALIZATION APPLICATION",
    videoId: "61bBNSW0eBQ",
    image: "images/d-tiler.jpg",
    span: "lg:col-span-4",
    aspect: "aspect-[16/9] md:aspect-[16/10]",
    tall: true,
  },
  {
    n: "03",
    title: "DEOVERSE SIMULATOR",
    sub: "REAL-TIME 3D SIMULATION",
    videoId: "JUrkHQlcbRo",
    image: "images/deoverse-sim.jpg",
    span: "lg:col-span-6",
    aspect: "aspect-[16/10]",
  },
  {
    n: "04",
    title: "DHAKSHA",
    sub: "INTERACTIVE TECHNOLOGY",
    videoId: "d3XJoURtweA",
    image: "images/dhaksha.jpg",
    span: "lg:col-span-6",
    aspect: "aspect-[16/10]",
  },
  {
    n: "05",
    title: "DEO + MED + DEFENCE",
    sub: "REAL-TIME VISUALIZATION & INTERACTION",
    videoId: "HyKbepj3pls",
    image: "images/deo-med-defence.jpg",
    span: "md:col-span-2 lg:col-span-7",
    aspect: "aspect-[16/9]",
  },
  {
    n: "06",
    title: "SWARNABHOOMI 3D WALKTHROUGH",
    sub: "REAL-TIME ARCHITECTURAL VISUALIZATION",
    videoId: "JUrkHQlcbRo",
    image: "images/archviz-walkthrough.jpg",
    span: "lg:col-span-5",
    aspect: "aspect-[16/9]",
  },
];

export const technicalExpertise = [
  {
    category: "Game / 3D Development",
    skills: [
      "Unreal Engine",
      "Blueprint Development",
      "Gameplay Systems",
      "Level Design",
      "Real-Time 3D",
    ],
  },
  {
    category: "VR / XR",
    skills: [
      "VR Development",
      "VR Interaction Design",
      "OpenXR",
      "VR Simulation",
      "Immersive Applications",
    ],
  },
  {
    category: "Programming",
    skills: [
      "Python",
      "Dart",
      "C++ (Intermediate)",
      "Application Scripting",
      "Technical Prototyping",
    ],
  },
  {
    category: "Applications",
    skills: [
      "Flutter",
      "Web Applications",
      "UI Integration",
      "Camera-Based Systems",
    ],
  },
  {
    category: "Embedded",
    skills: [
      "ESP32",
      "Arduino",
      "Embedded Systems",
      "Camera and Device Integration",
    ],
  },
  {
    category: "Other",
    skills: [
      "Networking",
      "Performance Optimization",
      "Simulation",
      "Real-Time Interaction",
    ],
  },
  {
    category: "Version Control",
    skills: [
      "GitHub",
    ],
  },
];

export const skills = {
  primary: "UNREAL ENGINE",
  core: ["Blueprints", "Level Design", "VR Development"],
  supporting: [
    "Real-Time 3D",
    "VR Interaction Design",
    "OpenXR",
    "Simulation",
  ],
  additional: [
    "Python",
    "Dart",
    "C++ (Intermediate)",
    "Flutter",
    "ESP32",
    "Arduino",
    "GitHub",
  ],
};

/* Node-map geometry (percent positions inside a square stage) */
export type SkillNode = {
  label: string;
  x: number;
  y: number;
  tier: "core" | "secondary" | "outer";
};

export const skillNodes: SkillNode[] = [
  { label: "Blueprints", x: 50, y: 21, tier: "core" },
  { label: "Level Design", x: 26, y: 64, tier: "core" },
  { label: "VR Development", x: 74, y: 64, tier: "core" },
  { label: "Real-Time 3D", x: 21, y: 24, tier: "secondary" },
  { label: "VR Interaction", x: 79, y: 24, tier: "secondary" },
  { label: "Performance Optimization", x: 20, y: 86, tier: "secondary" },
  { label: "Networking", x: 80, y: 86, tier: "secondary" },
  { label: "Flutter & Dart", x: 50, y: 5, tier: "outer" },
  { label: "OpenXR", x: 92, y: 50, tier: "outer" },
  { label: "ESP32 & Arduino", x: 50, y: 97, tier: "outer" },
  { label: "Python & C++", x: 8, y: 50, tier: "outer" },
];

export const skillLinks: Array<{
  from: [number, number];
  to: [number, number];
  tier: "core" | "secondary" | "outer";
}> = [
  { from: [50, 50], to: [50, 21], tier: "core" },
  { from: [50, 50], to: [26, 64], tier: "core" },
  { from: [50, 50], to: [74, 64], tier: "core" },
  { from: [50, 50], to: [21, 24], tier: "secondary" },
  { from: [50, 50], to: [79, 24], tier: "secondary" },
  { from: [50, 50], to: [20, 86], tier: "secondary" },
  { from: [50, 50], to: [80, 86], tier: "secondary" },
  { from: [21, 24], to: [50, 5], tier: "outer" },
  { from: [79, 24], to: [92, 50], tier: "outer" },
  { from: [80, 86], to: [50, 97], tier: "outer" },
  { from: [20, 86], to: [8, 50], tier: "outer" },
];

export const education = [
  {
    year: "2025 — PRESENT",
    title: "BACHELOR OF COMPUTER APPLICATIONS (BCA)",
    institution: "Amrita Vishwa Vidyapeetham",
    note: "Expected Graduation: 2028",
    status: "PRESENT",
    current: true,
  },
  {
    year: "2020",
    title: "DIPLOMA IN MECHANICAL ENGINEERING",
    institution: "Erode Institute of Technology",
    note: "Completed: 2020",
    status: "COMPLETED",
    current: false,
  },
];

export const languages = [
  { name: "ENGLISH", level: "FLUENT" },
  { name: "TAMIL", level: "FLUENT" },
];
