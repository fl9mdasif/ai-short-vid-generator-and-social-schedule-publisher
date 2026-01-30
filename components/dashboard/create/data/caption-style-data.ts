import { HTMLMotionProps } from "framer-motion";

export interface CaptionStyle {
    id: string;
    name: string;
    description: string;
    // CSS classes for the text container
    containerClassName: string;
    // CSS classes for the text itself
    textClassName: string;
    // Framer Motion variants for the animation
    animation: {
        initial: any;
        animate: any;
        exit?: any;
    };
}

export const CaptionStyles: CaptionStyle[] = [
    {
        id: "netflix",
        name: "Netflix",
        description: "Bold yellow subtitles often used in documentaries.",
        containerClassName: "bg-black/40 px-4 py-2 rounded-sm backdrop-blur-sm",
        textClassName: "text-yellow-400 font-bold text-xl uppercase tracking-wide drop-shadow-md font-sans",
        animation: {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
        }
    },
    {
        id: "youtuber",
        name: "YouTuber",
        description: "High energy, dynamic pop-in effects.",
        containerClassName: "px-2",
        textClassName: "text-white font-black text-2xl stroke-black stroke-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-sans",
        animation: {
            initial: { scale: 0.5, opacity: 0, rotate: -10 },
            animate: {
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { type: "spring", stiffness: 300, damping: 12 }
            },
        }
    },
    {
        id: "minimal",
        name: "Clean & Minimal",
        description: "Simple, elegant, and readable.",
        containerClassName: "bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md",
        textClassName: "text-white font-medium text-lg font-sans",
        animation: {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }
    },
    {
        id: "neon",
        name: "Neon Cyber",
        description: "Glowing text for a futuristic look.",
        containerClassName: "",
        textClassName: "text-cyan-400 font-bold text-xl font-mono drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
        animation: {
            initial: { opacity: 0, filter: "blur(4px)" },
            animate: {
                opacity: 1,
                filter: "blur(0px)",
                textShadow: ["0 0 10px #22d3ee", "0 0 20px #22d3ee", "0 0 10px #22d3ee"],
                transition: { duration: 0.4 }
            },
        }
    },
    {
        id: "comic",
        name: "Comic Book",
        description: "Fun, sketchy look with outlines.",
        containerClassName: "bg-white px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -skew-x-6",
        textClassName: "text-black font-black text-xl uppercase font-sans",
        animation: {
            initial: { scale: 0, opacity: 0 },
            animate: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", bounce: 0.6 }
            },
        }
    },
    {
        id: "typewriter",
        name: "Typewriter",
        description: "Classic typing effect.",
        containerClassName: "bg-zinc-900/80 px-4 py-2 rounded-md border-l-4 border-green-500",
        textClassName: "text-green-400 font-mono text-lg font-bold",
        animation: {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.1 } }, // Simulation handled in component mainly, this is base
        }
    },
];
