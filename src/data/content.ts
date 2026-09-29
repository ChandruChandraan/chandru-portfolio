/* ------------------------------------------------------------------ */
/*  Single source of truth for every piece of content on the site.     */
/*  Contains verified profile and portfolio data for Chandru Chandran. */
/* ------------------------------------------------------------------ */

export const personal = {
  name: "Chandru Chandran",
  firstName: "CHANDRU",
  lastName: "CHANDRAN",
  title: "Game Developer | VR Developer",
  roles: ["GAME DEVELOPER", "VR DEVELOPER", "SIMULATION ENGINEER"],
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
  heroIntro:
    "Game and VR Developer specializing in real-time 3D development, immersive applications, simulation systems, and interactive experiences.",
  summary: [
    "I am a Game and VR Developer specializing in real-time 3D development, immersive applications, simulation systems, and interactive experiences. My work focuses on building engaging PC and VR applications using Unreal Engine, Blueprint development, VR interaction design, level design, and real-time systems.",
    "I have hands-on experience working across VR simulations, architectural visualization, medical visualization, interactive applications, embedded systems, and real-time 3D software. I enjoy transforming technical concepts into interactive and visually engaging digital experiences.",
    "My professional work includes VR simulation, architectural visualization, medical visualization, interactive kiosks, camera-integrated applications, and real-time 3D environments. I work primarily with Unreal Engine and Blueprint-based development, while also having experience with Python, Dart, Flutter, embedded systems, ESP32, Arduino, and networking.",
  ],
  primaryFocus: ["UNREAL ENGINE", "VR / XR DEVELOPMENT", "REAL-TIME SIMULATION"],
};

export const whatIDo = [
  {
    title: "Game Development",
    desc: "Building interactive real-time 3D experiences, gameplay systems, environments, and simulations.",
    tag: "UNREAL // BLUEPRINTS",
  },
  {
    title: "VR Development",
    desc: "Creating immersive VR applications with interactive environments, controls, physics, and real-time feedback.",
    tag: "OPENXR // IMMERSIVE",
  },
  {
    title: "3D Visualization",
    desc: "Developing architectural, medical, anatomical, and simulation-focused 3D visualization applications.",
    tag: "ARCHVIZ // MEDICAL",
  },
  {
    title: "Interactive Applications",
    desc: "Developing real-time applications, interactive kiosks, camera-integrated systems, and specialized visualization solutions.",
    tag: "KIOSKS // EMBEDDED",
  },
];

export const careerFocus = {
  statement:
    "I am looking to continue developing my career in Game Development, VR/XR Development, Real-Time 3D, Simulation, and Interactive Visualization, where I can apply my technical skills to create practical and immersive digital experiences.",
  targetRoles: [
    "GAME DEVELOPER",
    "VR / XR DEVELOPER",
    "REAL-TIME 3D ENGINEER",
    "SIMULATION DEVELOPER",
  ],
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
  tagline:
    "At Deo Verse, I work on real-time 3D, VR, simulation, visualization, and interactive application development.",
  items: [
    {
      id: "2.01",
      title: "VR SIMULATION & PHYSICS CONTROLS",
      desc: "Develop VR simulation experiences with physics-based controls and real-time feedback.",
    },
    {
      id: "2.02",
      title: "ARCHITECTURAL VISUALIZATION",
      desc: "Build architectural visualization applications for PC and VR platforms with dynamic lighting and interactive navigation.",
    },
    {
      id: "2.03",
      title: "INTERACTIVE 3D & GAMEPLAY SYSTEMS",
      desc: "Develop interactive 3D environments and gameplay systems using Unreal Engine and Blueprint development.",
    },
    {
      id: "2.04",
      title: "VR INTERACTION SYSTEMS",
      desc: "Implement VR interaction systems, spatial user experiences, and responsive real-time mechanics.",
    },
    {
      id: "2.05",
      title: "CAMERA APPLICATIONS & KIOSK SYSTEMS",
      desc: "Create camera-integrated applications and interactive kiosk systems for events and specialized environments.",
    },
    {
      id: "2.06",
      title: "LEVEL DESIGN & 3D ENVIRONMENTS",
      desc: "Work on level design, blockouts, spatial composition, and real-time 3D environment development.",
    },
    {
      id: "2.07",
      title: "MEDICAL VISUALIZATION & SIMULATION",
      desc: "Contribute to medical visualization and simulation applications, including DICOM viewing and 3D anatomical models.",
    },
    {
      id: "2.08",
      title: "PERFORMANCE OPTIMIZATION",
      desc: "Work on performance optimization for interactive real-time applications to ensure stable high-framerate rendering.",
    },
    {
      id: "2.09",
      title: "HARDWARE & DEVICE INTEGRATION",
      desc: "Develop and integrate systems across software, VR headsets, embedded devices (ESP32, Arduino), and interactive media.",
    },
    {
      id: "2.10",
      title: "IMMERSIVE TECH COLLABORATION",
      desc: "Collaborate on professional applications involving visualization, simulation, and real-time immersive technology.",
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
    title: "DEO VISION // DICOM VIEWER",
    tag: "VR // MEDICAL 3D VOLUMETRIC RECONSTRUCTION",
    desc: "A medical visualization application focused on viewing and interacting with DICOM medical imaging data in real-time VR. Enables volumetric CT scan inspection, multi-planar reconstruction (axial, coronal, sagittal), and spatial analysis.",
    stack: [
      "UNREAL ENGINE",
      "DICOM 3D DATA",
      "VR MEDICAL",
      "MULTI-PLANAR SLICING",
      "REAL-TIME SHADERS",
    ],
    image: "images/mediscan-dicom-viewer.jpg",
    imageAlt:
      "MediScan VR Pro v4.2 interface displaying 3D thoracic bone volume reconstruction with axial, coronal, and sagittal CT views",
    videoId: "HNVgJfvbqTQ",
    sub: "MEDICAL VISUALIZATION APPLICATION",
  },
  {
    n: "02",
    title: "D-TILER // DIGITAL TILING SOFTWARE",
    tag: "VISUALIZATION // APPLICATION PORTFOLIO",
    desc: "A visualization-focused application developed as part of the Deo Verse professional application portfolio for real-time surface material layout and interactive architectural tiling.",
    stack: [
      "UNREAL ENGINE",
      "MATERIAL SYSTEMS",
      "ARCHVIZ",
      "INTERACTIVE UI",
      "REAL-TIME RENDERING",
    ],
    image: "images/d-tiler-software.jpg",
    imageAlt: "D-Tiler interactive digital surface and tile visualization tool",
    videoId: "61bBNSW0eBQ",
    sub: "VISUALIZATION APPLICATION",
  },
  {
    n: "03",
    title: "DEOVERSE SIMULATOR",
    tag: "SIMULATION // REAL-TIME 3D & INTERACTION",
    desc: "A simulation application involving real-time 3D environments, interaction design, and immersive experiences developed within the Deo Verse professional environment.",
    stack: [
      "UNREAL ENGINE",
      "SIMULATION SYSTEMS",
      "REAL-TIME 3D",
      "PHYSICS MECHANICS",
      "BLUEPRINTS",
    ],
    image: "images/dhaksha-drone-sim.jpg",
    imageAlt: "DeoVerse Simulator real-time 3D simulation environment",
    videoId: "d3XJoURtweA",
    sub: "SIMULATION APPLICATION",
  },
  {
    n: "04",
    title: "ANATOMY // VR ARTERIAL & SURGICAL",
    tag: "VR // MEDICAL & ANATOMICAL VISUALIZATION",
    desc: "A medical and anatomical visualization application focused on interactive 3D visualization. Features spatial examination of the cardiovascular and arterial systems with real-time hemodynamic telemetry.",
    stack: [
      "UNREAL ENGINE",
      "VR ANATOMY",
      "BIOMETRIC HUD",
      "SPATIAL INTERACTION",
      "MEDICAL 3D",
    ],
    image: "images/vr-anatomy-surgery.jpg",
    imageAlt:
      "Surgeon in VR headset interacting with illuminated orange holographic human body and arterial telemetry HUD",
    videoId: "7YMj3YfP8BI",
    sub: "MEDICAL & ANATOMICAL VISUALIZATION",
  },
  {
    n: "05",
    title: "DEO + MED + DEFENCE",
    tag: "DEFENCE // REAL-TIME FIELD MEDICINE",
    desc: "A professional application and workstream combining real-time visualization and interactive technology for specialized trauma care, physiological vitals telemetry, and triage HUD intervention.",
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
    sub: "SPECIALIZED INTERACTIVE WORKSTREAM",
  },
  {
    n: "06",
    title: "DHAKSHA // DRONE SIMULATOR",
    tag: "VR // PHYSICS-DRIVEN FLIGHT SIMULATION",
    desc: "An interactive technology application developed within the Deo Verse professional environment featuring physics-driven flight controls, telemetry feedback, and responsive flight simulation.",
    stack: [
      "UNREAL ENGINE",
      "PHYSICS CONTROLS",
      "VR SIMULATION",
      "TELEMETRY HUD",
      "DRONE SYSTEMS",
    ],
    image: "images/dhaksha-drone-sim.jpg",
    imageAlt: "Dhaksha industrial drone simulator flight telemetry",
    videoId: "d3XJoURtweA",
    sub: "INTERACTIVE TECHNOLOGY APPLICATION",
  },
  {
    n: "07",
    title: "DAC DEVELOPERS ARCHITECTURAL WALKTHROUGH",
    tag: "ARCHVIZ // PC & VR INTERACTIVE WALKTHROUGH",
    desc: "Photorealistic real-time architectural visualization application for luxury penthouses. Built with Unreal Engine dynamic lighting, interactive floor viewpoint navigation, and PC/VR deployment.",
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
    n: "08",
    title: "SELFIE BOOTH APPLICATION",
    tag: "KIOSK // REAL-TIME CAMERA INTEGRATION",
    desc: "Designed and engineered a real-time camera-integrated interactive kiosk system for event environments with automated capture, custom filter overlays, and physical-digital triggers.",
    stack: [
      "INTERACTIVE KIOSK",
      "CAMERA INTEGRATION",
      "REAL-TIME UI",
      "EVENT SYSTEMS",
      "BLUEPRINTS",
    ],
    image: "images/selfie-booth-kiosk.jpg",
    imageAlt:
      "Futuristic event selfie kiosk with an orange glowing ring light on a dark reflective floor",
    sub: "CAMERA-INTEGRATED KIOSK SYSTEM",
  },
  {
    n: "09",
    title: "SMART HOME SYSTEM",
    tag: "IoT // EMBEDDED & AUTOMATION",
    desc: "Developed an IoT automation and telemetry system with ESP32 and Arduino micro-controllers, remote sensor monitoring, and real-time device control.",
    stack: ["ESP32 / ARDUINO", "EMBEDDED SYSTEMS", "REMOTE MONITORING", "DEVICE INTEGRATION"],
    image: "images/smart-home-automation.jpg",
    imageAlt:
      "Wireframe smart home blueprint with orange connection nodes above a dark technical grid",
    sub: "EMBEDDED AUTOMATION SYSTEM",
  },
  {
    n: "10",
    title: "EXPENSES TRACKER",
    tag: "MOBILE // APPLICATION DEVELOPMENT",
    desc: "Built a responsive cross-platform mobile application using Flutter and Dart for personal finance tracking, budget telemetry, and expense categorization.",
    stack: ["FLUTTER", "DART", "MOBILE APP", "DATA ANALYTICS"],
    image: "images/expense-tracker-app.jpg",
    imageAlt:
      "Floating smartphone showing a dark finance dashboard with orange glowing charts",
    sub: "MOBILE APPLICATION",
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

export const technicalExpertise = [
  {
    category: "Game & 3D Development",
    skills: [
      "Unreal Engine",
      "Blueprint Development",
      "Gameplay Systems",
      "Level Design",
      "Real-Time 3D",
      "Interactive Applications",
    ],
  },
  {
    category: "VR / XR Development",
    skills: [
      "VR Application Development",
      "VR Interaction Design",
      "OpenXR Workflows",
      "Immersive Experiences",
      "VR Simulation",
    ],
  },
  {
    category: "Programming & Development",
    skills: [
      "Python",
      "Dart",
      "Flutter",
      "Application Scripting",
      "Technical Prototyping",
    ],
  },
  {
    category: "Embedded Systems",
    skills: [
      "ESP32",
      "Arduino",
      "Embedded Systems",
      "Camera Integration",
      "Device Integration",
    ],
  },
  {
    category: "Other Specialized Areas",
    skills: [
      "Networking",
      "Performance Optimization",
      "Simulation Systems",
      "Medical Visualization",
      "Architectural Visualization",
      "Interactive Kiosks",
    ],
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
  additional: [
    "Python",
    "Dart",
    "Flutter",
    "ESP32",
    "Arduino",
    "Camera Integration",
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
  { label: "Real-Time Simulation", x: 21, y: 24, tier: "secondary" },
  { label: "Interaction Systems", x: 79, y: 24, tier: "secondary" },
  { label: "Performance Optimization", x: 20, y: 86, tier: "secondary" },
  { label: "Networking", x: 80, y: 86, tier: "secondary" },
  { label: "Flutter & Dart", x: 50, y: 5, tier: "outer" },
  { label: "Camera Integration", x: 92, y: 50, tier: "outer" },
  { label: "ESP32 & Arduino", x: 50, y: 97, tier: "outer" },
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
    institution: "Erode Institute of Technology",
    status: "COMPLETED",
    current: false,
  },
  {
    year: "2025 — PRESENT",
    title: "BACHELOR OF COMPUTER APPLICATIONS (BCA)",
    institution: "Computer Applications",
    note: "BCA · COMPUTER APPLICATIONS",
    status: "PRESENT",
    current: true,
  },
];

export const languages = [
  { name: "ENGLISH", level: "FLUENT" },
  { name: "TAMIL", level: "FLUENT" },
];
