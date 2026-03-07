export function TopoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 800"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="topo-fade-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A0A0B" stopOpacity="1" />
            <stop offset="25%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="75%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="topo-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A853" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#0A0A0B" />

        <g fill="none" strokeWidth="0.5">
          <path d="M-100 200 C 300 300, 600 -50, 1540 250" stroke="#161618" opacity="0.6" />
          <path d="M-100 230 C 320 330, 620 -20, 1540 280" stroke="#1A1A1E" opacity="0.4" />
          <path d="M-100 260 C 340 360, 640 10, 1540 310" stroke="#161618" opacity="0.5" />
          <path d="M-100 290 C 360 390, 660 40, 1540 340" stroke="#131315" opacity="0.7" />

          <path d="M-100 450 C 400 300, 800 650, 1540 450" stroke="#1A1A1E" opacity="0.3" />
          <path d="M-100 480 C 420 330, 820 680, 1540 480" stroke="#161618" opacity="0.5" />
          <path d="M-100 510 C 440 360, 840 710, 1540 510" stroke="#131315" opacity="0.7" />

          <path d="M-100 350 C 380 450, 680 100, 1540 400" stroke="url(#topo-gold)" strokeWidth="0.8" />
        </g>

        <rect width="100%" height="100%" fill="url(#topo-fade-h)" />
      </svg>
    </div>
  );
}
