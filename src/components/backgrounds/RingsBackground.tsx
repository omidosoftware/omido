export function RingsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 800"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#0A0A0B" />

        <g fill="none">
          <circle cx="720" cy="400" r="120" stroke="#131315" strokeWidth="1" />
          <circle cx="720" cy="400" r="240" stroke="#1A1A1E" strokeWidth="0.8" />
          <circle cx="720" cy="400" r="360" stroke="#161618" strokeWidth="0.5" />
          <circle cx="720" cy="400" r="480" stroke="#131315" strokeWidth="0.5" />

          <circle
            cx="720" cy="400" r="300"
            stroke="#D4A853" strokeWidth="0.8"
            opacity="0.12"
          />
          <circle
            cx="720" cy="400" r="200"
            stroke="#1A1A1E" strokeWidth="1.5"
            strokeDasharray="3 10"
            opacity="0.5"
          />

          {/* Accent dots on ring */}
          <circle cx="570" cy="270" r="2.5" fill="#D4A853" opacity="0.5" />
          <circle cx="880" cy="520" r="2" fill="#D4A853" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
