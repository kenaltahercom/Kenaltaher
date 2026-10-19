export type MascotPose =
  | "intro"
  | "happy"
  | "excited"
  | "curious"
  | "playful"
  | "thinking"
  | "loading"
  | "shoulder"
  | "navbar";

export interface MascotMessagePair {
  id: string;
  en: string;
  icon?: string;
}

export interface MascotPoseData {
  key: MascotPose;
  title: {
    id: string;
    en: string;
  };
  imagePng: string;
  imageWebp: string;
  alt: {
    id: string;
    en: string;
  };
  textPair: MascotMessagePair;
  subtext?: {
    id: string;
    en: string;
  };
}

export const MASCOT_POSES: Record<MascotPose, MascotPoseData> = {
  intro: {
    key: "intro",
    title: {
      id: "Keno Menyapa",
      en: "Keno Greeting",
    },
    imagePng: "/mascot/keno-intro.png",
    imageWebp: "/mascot/keno-intro.webp",
    alt: {
      id: "Maskot Keno mengedipkan mata dan melambaikan tangan menyapa pengunjung",
      en: "Mascot Keno winking and waving hand greeting visitors",
    },
    textPair: {
      id: "Selamat datang di portofolio Kenaltaher!",
      en: "Welcome to Kenaltaher's portfolio!",
      icon: "✨",
    },
  },
  happy: {
    key: "happy",
    title: {
      id: "Keno Senang",
      en: "Keno Happy",
    },
    imagePng: "/mascot/keno-happy.png",
    imageWebp: "/mascot/keno-happy.webp",
    alt: {
      id: "Maskot Keno tersenyum bahagia dan mengacungkan dua jempol",
      en: "Mascot Keno smiling happily with two thumbs up",
    },
    textPair: {
      id: "Hai! Senang bertemu denganmu!",
      en: "Hi! Nice to meet you!",
      icon: "❤️",
    },
  },
  excited: {
    key: "excited",
    title: {
      id: "Keno Antusias",
      en: "Keno Excited",
    },
    imagePng: "/mascot/keno-excited.png",
    imageWebp: "/mascot/keno-excited.webp",
    alt: {
      id: "Maskot Keno sangat antusias membuka tangan dengan mata ceria",
      en: "Mascot Keno excited with open arms and cheerful eyes",
    },
    textPair: {
      id: "Wah, keren banget!",
      en: "Wow, that's awesome!",
      icon: "✨",
    },
  },
  curious: {
    key: "curious",
    title: {
      id: "Keno Penasaran",
      en: "Keno Curious",
    },
    imagePng: "/mascot/keno-curious.png",
    imageWebp: "/mascot/keno-curious.webp",
    alt: {
      id: "Maskot Keno penasaran memegang dagu dengan ikon tanda tanya",
      en: "Mascot Keno curious touching chin with question mark glow",
    },
    textPair: {
      id: "Hmm.... menarik nih!",
      en: "Hmm... that's interesting!",
      icon: "❓",
    },
  },
  playful: {
    key: "playful",
    title: {
      id: "Keno Usil",
      en: "Keno Playful",
    },
    imagePng: "/mascot/keno-playful.png",
    imageWebp: "/mascot/keno-playful.webp",
    alt: {
      id: "Maskot Keno bermain dan menunjuk ceria",
      en: "Mascot Keno playful pointing happily",
    },
    textPair: {
      id: "Hehe, jangan serius terus!",
      en: "Hehe, don't be too serious!",
      icon: "😃",
    },
  },
  thinking: {
    key: "thinking",
    title: {
      id: "Keno Berpikir",
      en: "Keno Thinking",
    },
    imagePng: "/mascot/keno-thinking.png",
    imageWebp: "/mascot/keno-thinking.webp",
    alt: {
      id: "Maskot Keno sedang berpikir mendalam",
      en: "Mascot Keno deep in thought with hand on chin",
    },
    textPair: {
      id: "Coba kita pikirkan dulu...",
      en: "Let's think about this...",
      icon: "💡",
    },
  },
  loading: {
    key: "loading",
    title: {
      id: "Keno Memuat",
      en: "Keno Loading",
    },
    imagePng: "/mascot/keno-loading.png",
    imageWebp: "/mascot/keno-loading.webp",
    alt: {
      id: "Maskot Keno melayang di cincin hologram sambil mengetik laptop",
      en: "Mascot Keno floating on holographic ring typing on laptop",
    },
    textPair: {
      id: "Memuat portofolio Kenaltaher...",
      en: "Loading Kenaltaher's portfolio...",
      icon: "⚡",
    },
  },
  shoulder: {
    key: "shoulder",
    title: {
      id: "Keno di Pundak Hero",
      en: "Keno on Hero Shoulder",
    },
    imagePng: "/mascot/keno-shoulder.png",
    imageWebp: "/mascot/keno-shoulder.webp",
    alt: {
      id: "Maskot Keno duduk di pundak Taher sambil menggunakan laptop",
      en: "Mascot Keno sitting on Taher's shoulder typing on laptop",
    },
    textPair: {
      id: "Yuk, jelajahi karyaku!",
      en: "Let's explore my work!",
      icon: "✨",
    },
  },
  navbar: {
    key: "navbar",
    title: {
      id: "Keno di Navbar",
      en: "Keno on Navbar",
    },
    imagePng: "/mascot/keno-navbar.png",
    imageWebp: "/mascot/keno-navbar.webp",
    alt: {
      id: "Maskot Keno berukuran ringkas di samping logo Kenaltaher",
      en: "Compact Mascot Keno next to Kenaltaher brand logo",
    },
    textPair: {
      id: "Hai, saya Keno! Klik saya untuk ekspresi lain!",
      en: "Hi, I'm Keno! Click me for more expressions!",
      icon: "👋",
    },
  },
};

export const HERO_SHOULDER_MESSAGES: MascotMessagePair[] = [
  {
    id: "Yuk, jelajahi karyaku!",
    en: "Let's explore my work!",
    icon: "✨",
  },
  {
    id: "Punya ide proyek?",
    en: "Got a project in mind?",
    icon: "💡",
  },
  {
    id: "Siap membangun sesuatu?",
    en: "Ready to build something?",
    icon: "🚀",
  },
];

export const INTERACTIVE_EXPRESSIONS: MascotPose[] = [
  "happy",
  "excited",
  "curious",
  "playful",
  "thinking",
];
