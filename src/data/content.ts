/* ------------------------------------------------------------------ */
/*  Single source of truth for every piece of content on the site.     */
/*  Contains only verified, supplied information.                      */
/* ------------------------------------------------------------------ */

export const personal = {
  name: "Chandru Chandran",
  firstName: "CHANDRU",
  lastName: "CHANDRAN",
  title: "Game Developer | VR Developer | IoT Engineer",
  roles: ["GAME DEVELOPER", "VR DEVELOPER", "IoT ENGINEER"],
  location: "Chennai, India",
  nativePlace: "Dharmapuri, Tamil Nadu, India",
  phone: "8270773803",
  phoneHref: "tel:8270773803",
  email: "chandruchandran0712@gmail.com",
  emailHref: "mailto:chandruchandran0712@gmail.com",
  githubLabel: "github.com/ChandruChandraan",
  githubHref: "https://github.com/ChandruChandraan",
  heroIntro:
    "Game and VR Developer with 3.5+ years of experience developing real-time simulations, immersive applications, and interactive systems.",
  summary: [
    "Game and VR Developer with 3.5+ years of experience developing real-time simulations, immersive applications, and interactive systems.",
    "Specialized in Unreal Engine, VR development, gameplay systems, and real-time performance optimization, with additional experience across embedded systems, networking, and application development.",
    "Focused on building responsive, technically driven experiences that combine real-time 3D, interaction design, and practical engineering.",
  ],
  primaryFocus: ["UNREAL ENGINE", "VR DEVELOPMENT", "REAL-TIME SIMULATION"],
};

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
  items: [
    {
      id: "2.1",
      title: "VR DRONE SIMULATION",
      desc: "Developed a physics-driven VR drone simulation with interactive controls and real-time feedback.",
    },
    {
      id: "2.2",
      title: "ARCHITECTURAL VISUALIZATION",
      desc: "Developed real-time architectural visualization experiences for PC and VR platforms.",
    },
    {
      id: "2.3",
      title: "SELFIE BOOTH SYSTEM",
      desc: "Developed a camera-integrated interactive kiosk system for event environments.",
    },
    {
      id: "2.4",
      title: "GAMEPLAY SYSTEMS",
      desc: "Implemented gameplay systems and interactive mechanics using Unreal Engine Blueprints.",
    },
    {
      id: "2.5",
      title: "PERFORMANCE",
      desc: "Optimized rendering and runtime performance for real-time applications.",
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
    title: "MEDISCAN VR PRO // DICOM VIEWER",
    tag: "VR // MEDICAL 3D VOLUMETRIC RECONSTRUCTION",
    desc: "Real-time volumetric medical imaging system built in Unreal Engine. Enables clinical CT scan review through multi-planar reconstruction (axial, coronal, sagittal) and interactive 3D bone, soft tissue, and vascular spatial inspection in VR.",
    stack: [
      "UNREAL ENGINE",
      "VR MEDICAL",
      "DICOM 3D VOLUMETRIC",
      "MULTI-PLANAR SLICING",
      "REAL-TIME SHADERS",
    ],
    image: "images/mediscan-dicom-viewer.jpg",
    imageAlt:
      "MediScan VR Pro v4.2 interface displaying 3D thoracic bone volume reconstruction with axial, coronal, and sagittal CT views",
    videoId: "HNVgJfvbqTQ",
    sub: "VR MEDICAL IMAGING & 3D RECONSTRUCTION",
  },
  {
    n: "02",
    title: "VR ANATOMY & SURGICAL TELEMETRY",
    tag: "VR // INTERACTIVE BIOMEDICAL SIMULATION",
    desc: "Interactive medical training simulation featuring a holographic human body in VR. Provides spatial examination of the cardiovascular and arterial systems, real-time hemodynamic telemetry, and interactive surgical procedural steps.",
    stack: [
      "UNREAL ENGINE",
      "VR SURGERY",
      "BIOMETRIC HUD",
      "SPATIAL INTERACTION",
      "ANATOMY SYSTEMS",
    ],
    image: "images/vr-anatomy-surgery.jpg",
    imageAlt:
      "Surgeon in VR headset interacting with illuminated orange holographic human body and arterial telemetry HUD",
    videoId: "7YMj3YfP8BI",
    sub: "INTERACTIVE BIOMEDICAL SIMULATION",
  },
  {
    n: "03",
    title: "TACTICAL COMBAT MEDIC SIMULATION",
    tag: "DEFENCE // REAL-TIME FIELD MEDICINE",
    desc: "High-intensity battlefield casualty care simulator developed with real-time physiological vitals telemetry. Operators diagnose critical trauma injuries, manage airway and hemorrhage triage through floating holographic HUDs, and perform time-sensitive interventions.",
    stack: [
      "REAL-TIME SIMULATION",
      "TACTICAL TELEMETRY",
      "TRIAGE HUD",
      "UNREAL BLUEPRINTS",
      "DEFENCE TECH",
    ],
    image: "images/combat-medic-defence.jpg",
    imageAlt:
      "Combat medic in tactical uniform treating casualty with glowing orange holographic patient vitals HUD",
    videoId: "HyKbepj3pls",
    sub: "DEO + MED + DEFENCE TACTICAL SIM",
  },
  {
    n: "04",
    title: "D-CINEMA VIRTUAL EXPERIENCE",
    tag: "VR // IMMERSIVE SCREENING AUDITORIUM",
    desc: "Next-generation virtual cinema platform featuring an ultra-wide curved panoramic screen, theater acoustics with spatial audio, synchronized multi-user playback, and customized viewing environments for premier VR screenings.",
    stack: [
      "VR AUDITORIUM",
      "SPATIAL AUDIO",
      "CURVED DISPLAY SHADER",
      "SYNCHRONIZED PLAYBACK",
      "PC VR",
    ],
    image: "images/d-cinema-vr.jpg",
    imageAlt:
      "Audience seated in modern luxury cinema wearing VR headsets watching Stellar Odyssey on a massive curved screen",
    videoId: "02_cyWb3ghM",
    sub: "VIRTUAL CINEMA EXPERIENCE",
  },
  {
    n: "05",
    title: "DAC DEVELOPERS ARCHITECTURAL WALKTHROUGH",
    tag: "ARCHVIZ // PC & VR INTERACTIVE WALKTHROUGH",
    desc: "Photorealistic real-time architectural walkthrough of high-end luxury penthouses. Built with Unreal Engine Lumen dynamic lighting, interactive floor viewpoint navigation, material customization, and optimized cross-platform deployment.",
    stack: [
      "UNREAL ENGINE",
      "LUMEN & NANITE",
      "ARCHITECTURAL VISUALIZATION",
      "VR TELEPORT SYSTEM",
      "PC & VR",
    ],
    image: "images/dac-architectural-walkthrough.jpg",
    imageAlt:
      "Modern luxury penthouse at night overlooking city skyline with interactive navigational teleportation markers",
    videoId: "QMjHcGO7C_Q",
    sub: "PC & VR ARCHITECTURAL WALKTHROUGH",
  },
  {
    n: "06",
    title: "SMART HOME SYSTEM",
    tag: "IoT // AUTOMATION & EMBEDDED",
    desc: "Developed an IoT automation and telemetry system with remote sensor monitoring, device control, and embedded micro-controller integration.",
    stack: ["IOT SYSTEM", "REMOTE MONITORING", "EMBEDDED", "REMOTE CONTROL"],
    image: "images/smart-home-automation.jpg",
    imageAlt:
      "Wireframe smart home blueprint with orange connection nodes above a dark technical grid",
    sub: "IoT AUTOMATION SYSTEM",
  },
  {
    n: "07",
    title: "EXPENSES TRACKER",
    tag: "MOBILE // APPLICATION",
    desc: "Built a responsive cross-platform mobile application for tracking and managing personal finances, budget visualization, and expense categorization.",
    stack: ["MOBILE APP", "FLUTTER & DART", "PERSONAL FINANCE", "DATA ANALYTICS"],
    image: "images/expense-tracker-app.jpg",
    imageAlt:
      "Floating smartphone showing a dark finance dashboard with orange glowing charts",
    sub: "MOBILE APPLICATION",
  },
  {
    n: "08",
    title: "SELFIE BOOTH APPLICATION",
    tag: "KIOSK // REAL-TIME CAMERA",
    desc: "Designed and engineered a real-time camera-integrated interactive kiosk system for live event environments with automated capture and custom filters.",
    stack: ["EVENT KIOSK", "REAL-TIME CAMERA", "INTERACTIVE UI", "C++ / BLUEPRINTS"],
    image: "images/selfie-booth-kiosk.jpg",
    imageAlt:
      "Futuristic event selfie kiosk with an orange glowing ring light on a dark reflective floor",
    sub: "EVENT KIOSK APPLICATION",
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

/* YouTube titles verified via the official oEmbed API. */
export const selectedWork: WorkItem[] = [
  {
    n: "01",
    title: "DEO VISION DICOM VIEWER",
    sub: "MEDISCAN VR PRO",
    videoId: "HNVgJfvbqTQ",
    image: "images/mediscan-dicom-viewer.jpg",
    span: "md:col-span-2 lg:col-span-8",
    aspect: "aspect-[16/9]",
  },
  {
    n: "02",
    title: "D-TILER",
    sub: "DIGITAL TILING SOFTWARE",
    videoId: "61bBNSW0eBQ",
    image: "images/d-tiler-software.jpg",
    span: "lg:col-span-4",
    aspect: "aspect-[16/9] md:aspect-[16/10]",
    tall: true,
  },
  {
    n: "03",
    title: "DHAKSHA",
    sub: "DRONE SIMULATOR",
    videoId: "d3XJoURtweA",
    image: "images/dhaksha-drone-sim.jpg",
    span: "lg:col-span-6",
    aspect: "aspect-[16/10]",
  },
  {
    n: "04",
    title: "ANATOMY",
    sub: "VR ARTERIAL & SURGICAL SYSTEM",
    videoId: "7YMj3YfP8BI",
    image: "images/vr-anatomy-surgery.jpg",
    span: "lg:col-span-6",
    aspect: "aspect-[16/10]",
  },
  {
    n: "05",
    title: "DEO + MED + DEFENCE",
    sub: "TACTICAL COMBAT MEDIC",
    videoId: "HyKbepj3pls",
    image: "images/combat-medic-defence.jpg",
    span: "md:col-span-2 lg:col-span-7",
    aspect: "aspect-[16/9]",
  },
  {
    n: "06",
    title: "D-CINEMA",
    sub: "VIRTUAL CINEMA EXPERIENCE",
    videoId: "02_cyWb3ghM",
    image: "images/d-cinema-vr.jpg",
    span: "lg:col-span-5",
    aspect: "aspect-[16/9]",
  },
  {
    n: "07",
    title: "DAC DEVELOPERS",
    sub: "PC & VR WALKTHROUGH",
    videoId: "QMjHcGO7C_Q",
    image: "images/dac-architectural-walkthrough.jpg",
    span: "md:col-span-2 lg:col-span-12",
    aspect: "aspect-[16/9] lg:aspect-[21/8]",
  },
];

export const skills = {
  primary: "UNREAL ENGINE",
  core: ["Blueprints", "Level Design", "VR Development"],
  supporting: [
    "Real-Time Simulation",
    "Interaction Systems",
    "Performance Optimization",
    "Networking",
  ],
  additional: ["Python", "Dart", "Embedded Systems", "Flutter & Web Applications"],
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
  { label: "Real-Time Simulation", x: 21, y: 24, tier: "secondary" },
  { label: "Interaction Systems", x: 79, y: 24, tier: "secondary" },
  { label: "Performance Optimization", x: 20, y: 86, tier: "secondary" },
  { label: "Networking", x: 80, y: 86, tier: "secondary" },
  { label: "Flutter & Web Apps", x: 50, y: 5, tier: "outer" },
  { label: "Dart", x: 92, y: 50, tier: "outer" },
  { label: "Embedded Systems", x: 50, y: 97, tier: "outer" },
  { label: "Python", x: 8, y: 50, tier: "outer" },
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
    year: "2020",
    title: "DIPLOMA IN MECHANICAL ENGINEERING",
    status: "COMPLETED",
    current: false,
  },
  {
    year: "2025 — PRESENT",
    title: "BACHELOR OF COMPUTER APPLICATIONS",
    note: "BCA",
    status: "PRESENT",
    current: true,
  },
];

export const languages = [
  { name: "ENGLISH", level: "FLUENT" },
  { name: "TAMIL", level: "FLUENT" },
];
