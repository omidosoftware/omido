export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131315" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#grid-sm)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#1A1A1E" strokeWidth="0.8" />
            <path d="M -4 0 L 4 0 M 0 -4 L 0 4" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.3" />
            <path d="M 196 200 L 204 200 M 200 196 L 200 204" fill="none" stroke="#D4A853" strokeWidth="0.8" opacity="0.3" />
          </pattern>
          <linearGradient id="grid-vignette-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A0A0B" stopOpacity="1" />
            <stop offset="20%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="80%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grid-vignette-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0A0B" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="70%" stopColor="#0A0A0B" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#0A0A0B" />
        <rect width="100%" height="100%" fill="url(#grid-lg)" />
        <rect width="100%" height="100%" fill="url(#grid-vignette-v)" />
        <rect width="100%" height="100%" fill="url(#grid-vignette-h)" />
      </svg>
    </div>
  );
}
