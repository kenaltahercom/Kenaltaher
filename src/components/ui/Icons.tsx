import React from "react";

export function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.35.06-.53.25-.19.19-.71.7-.71 1.7 0 1 .73 1.97.83 2.11.1.13 1.41 2.19 3.46 3.06.49.21.87.33 1.17.43.49.16.94.13 1.29.08.4-.06 1.21-.5 1.38-.98.17-.48.17-.9.12-.98-.05-.09-.19-.14-.4-.25s-1.21-.6-1.4-.67c-.19-.07-.33-.1-.47.1-.14.21-.55.7-.67.84-.12.14-.24.16-.45.05s-.89-.33-1.69-1.05c-.63-.56-1.05-1.26-1.17-1.47-.12-.21-.01-.32.09-.43.1-.09.21-.24.32-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.47-1.14-.65-1.56-.17-.41-.35-.35-.48-.36z" />
    </svg>
  );
}

export function VerifiedBadge({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        className="fill-sky-500"
      />
      <path
        d="M9.5 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.6-6.6 1.4 1.4-8 8z"
        className="fill-white"
      />
    </svg>
  );
}

export function Html5Icon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#E34F26" />
      <path d="M12 3.8v16.4l5.6-1.9L19 3.8H12z" fill="#EF652A" />
      <path d="M12 7.7H7.8l.3 3.3h3.9v2.8H8.4l.3 3.3 3.3 1v-2.8l-1.4-.4-.1-1.1h1.8V7.7zm0 0" fill="#EBEBEB" />
      <path d="M12 7.7h4.2l-.4 4.5H12v2.8h2.3l-.2 2.3-2.1.6v2.8l3.7-1.1.6-6.3H12V7.7z" fill="#FFFFFF" />
    </svg>
  );
}

export function Css3Icon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#1572B6" />
      <path d="M12 3.8v16.4l5.6-1.9L19 3.8H12z" fill="#33A9DC" />
      <path d="M12 7.7H7.8l.3 3.3h3.9v2.8H8.4l.3 3.3 3.3 1v-2.8l-1.4-.4-.1-1.1h1.8V7.7zm0 0" fill="#EBEBEB" />
      <path d="M12 7.7h4.2l-.2 2.2H12v2.2h3.8l-.4 4.5-3.4 1v-2.8l1.4-.4.1-1.2H12V7.7z" fill="#FFFFFF" />
    </svg>
  );
}

export function JavascriptIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7.5 18.2c.6.9 1.4 1.5 2.5 1.5 1.3 0 2.1-.7 2.1-2.4v-6.7h-2.1v6.7c0 .7-.3 1-1 1-.4 0-.8-.2-1.1-.5l-.4 1.4zm6.6-.2c.8 1.2 2 1.9 3.6 1.9 2 0 3.3-1.1 3.3-2.7 0-1.6-1-2.3-2.7-2.9l-.7-.3c-.9-.3-1.3-.7-1.3-1.3 0-.7.6-1.2 1.5-1.2.8 0 1.5.3 1.9.9l1.2-1.2c-.8-.9-1.8-1.4-3.1-1.4-2.1 0-3.3 1.2-3.3 2.7 0 1.5 1 2.3 2.5 2.8l.7.3c1 .4 1.5.8 1.5 1.5 0 .8-.7 1.4-1.8 1.4-1.2 0-2-.6-2.5-1.5l-1.6 1.1z"
        fill="#000000"
      />
    </svg>
  );
}

export function TypescriptIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M4.5 10.5h6v1.8H8.5V19H6.5v-6.7H4.5v-1.8zm9.5 5.5c.6.8 1.4 1.3 2.5 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.5l-.6-.2c-1.6-.6-2.4-1.4-2.4-2.7 0-1.7 1.4-2.8 3.3-2.8 1.4 0 2.4.5 3.1 1.4l-1.2 1.2c-.5-.6-1.1-.9-1.9-.9-.9 0-1.4.5-1.4 1.1 0 .6.5.9 1.5 1.3l.6.2c1.8.7 2.7 1.5 2.7 2.9 0 1.8-1.4 2.9-3.5 2.9-1.7 0-2.8-.6-3.7-1.6l1.2-1.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

export function NextjsIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 14.6l-5.8-7.7V16H8V8h1.8l5.7 7.6V8h1.5v8.6h-1.7z" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6c-2.7 0-4.3 1.3-4.8 4 1-.7 2.1-.9 3.3-.7 1 .2 1.8.9 2.6 1.7 1.3 1.3 2.8 2.8 6.4 2.8 2.7 0 4.3-1.3 4.8-4-1 .7-2.1.9-3.3.7-1-.2-1.8-.9-2.6-1.7-1.3-1.3-2.8-2.8-6.4-2.8zm-7.5 6c-2.7 0-4.3 1.3-4.8 4 1-.7 2.1-.9 3.3-.7 1 .2 1.8.9 2.6 1.7 1.3 1.3 2.8 2.8 6.4 2.8 2.7 0 4.3-1.3 4.8-4-1 .7-2.1.9-3.3.7-1-.2-1.8-.9-2.6-1.7-1.3-1.3-2.8-2.8-6.4-2.8z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function NodejsIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z"
        fill="#339933"
      />
      <path
        d="M12 5.5l6.5 3.8v7.4L12 20.5l-6.5-3.8V9.3L12 5.5z"
        fill="#66CC33"
      />
      <path
        d="M12 9.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PythonIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.9 2c-3.1 0-5 .7-5 2.8v2.1h5.1v.7H4.9C3.1 7.6 2 9.1 2 11.5c0 2.6 1.4 3.7 3.3 3.7h1.4v-1.8c0-1.9 1.6-3.4 3.5-3.4h5.2c1.6 0 2.8-1.2 2.8-2.8V4.8C18.2 2.8 15.1 2 11.9 2zm-1.8 1.7c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22c3.1 0 5-.7 5-2.8v-2.1H12v-.7h7.1c1.8 0 2.9-1.5 2.9-3.9 0-2.6-1.4-3.7-3.3-3.7h-1.4v1.8c0 1.9-1.6 3.4-3.5 3.4H8.6c-1.6 0-2.8 1.2-2.8 2.8v2.3c0 2 3.1 2.9 6.3 2.9zm1.8-1.7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function PhpIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4" />
      <path
        d="M7 10h1.8c.8 0 1.3.4 1.3 1.1 0 .7-.5 1.1-1.3 1.1H8l-.5 2H6.5L7 10zm1.7 1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H8l-.2.9h.9zm3.5-1.5h1.1l-.8 3.5-.1.7h-1.1l.3-1.3h-.9l-.3 1.3H9.3L10.2 10h1.1l-.3 1.3h.9l.3-1.3zm3.5 0h1.8c.8 0 1.3.4 1.3 1.1 0 .7-.5 1.1-1.3 1.1h-.8l-.5 2h-1.1L15.7 10zm1.7 1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H17l-.2.9h.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GitIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.7 10.7l-8.4-8.4c-.8-.8-2.2-.8-3 0L8.6 4l2.8 2.8c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.7 2.7c.6-.2 1.3 0 1.8.5.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.6-.6-.7-1.4-.4-2.1L12.3 9.7v5.2c.2.2.4.4.5.6.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3 .3-.3.8-.5 1.2-.5V9.4c-.4 0-.9-.2-1.2-.5-.6-.6-.7-1.4-.4-2.1L6.7 4.1 2.3 8.5c-.8.8-.8 2.2 0 3l8.4 8.4c.8.8 2.2.8 3 0l8-8c.8-.8.8-2.2 0-3.2z"
        fill="#F05032"
      />
    </svg>
  );
}

export function FigmaIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
      <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
      <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
      <path d="M12 7h4a2.5 2.5 0 1 1 0 5h-4V7z" fill="#1ABCFE" />
      <path d="M8 12h4v4.5A2.5 2.5 0 1 1 8 12z" fill="#0ACF83" />
    </svg>
  );
}

export function PostgresqlIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c-3.1 0-5.5-1.8-5.5-4 0-.4.1-.7.2-1.1l1.5.5c-.1.2-.2.4-.2.6 0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5c0-.9-.7-1.7-1.8-2.1l.6-1.4c1.6.6 2.7 1.9 2.7 3.5 0 2.2-2.4 4-5.5 4zm3.5-6.8l-1.3-.7c.5-.9.8-1.9.8-3 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.1.3 2.1.8 3l-1.3.7C5.3 10.4 5 9.2 5 8c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.2-.3 2.4-1 3.4l-1.5.3z"
        fill="#336791"
      />
    </svg>
  );
}

export function VercelIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 19.5h20L12 2z" />
    </svg>
  );
}

export function VscodeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M17.5 2.5L7.8 10.3 3.5 7 1.5 8.2v7.6l2 1.2 4.3-3.3 9.7 7.8 4.5-2.2V4.7l-4.5-2.2zm0 4.8v9.4L10.3 12 17.5 7.3z" fill="#007ACC" />
    </svg>
  );
}
