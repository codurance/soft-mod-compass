import React from 'react';

export default function TeamEffectivenessReportArea() {
  return (
    <svg className="report-area-icon" viewBox="0 0 100 100">
      <g id="background-2">
        <circle cx="50" cy="50.19" r="50" fill="white" />
        <circle
          cx="50"
          cy="50.19"
          r="48.5"
          fill="none"
          stroke="var(--picton-blue)"
          strokeWidth="3"
        />
      </g>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="62.61"
      >
        Team
      </text>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="75.63"
      >
        Effectiveness
      </text>
      <g>
        <path
          fill="var(--shark)"
          d="M58.64 36.32a.57.57 0 00-.79.2 9.18 9.18 0 01-3.3 3.28.58.58 0 00.58 1 10.23 10.23 0 003.72-3.7.57.57 0 00-.21-.78z"
        />
        <path
          fill="var(--shark)"
          d="M54.54 24.09a9.13 9.13 0 013.36 3.37.57.57 0 00.77.27.58.58 0 00.27-.78 10.24 10.24 0 00-3.79-3.8.58.58 0 00-.57 1z"
        />
        <path
          fill="var(--shark)"
          d="M45 23.07a10.19 10.19 0 00-3.79 3.81.57.57 0 00.21.78.6.6 0 00.29.08.57.57 0 00.5-.29 9 9 0 013.37-3.38.58.58 0 00.21-.79.57.57 0 00-.76-.23z"
        />
        <path
          fill="var(--shark)"
          d="M45.51 39.82a9.21 9.21 0 01-3.32-3.3.58.58 0 00-1 .58 10.37 10.37 0 003.75 3.72.58.58 0 00.57-1z"
        />
        <path
          fill="var(--shark)"
          d="M50.17 21.54a1.77 1.77 0 10-.54 0 3.52 3.52 0 00-3.26 3.57h7.08V25a3.54 3.54 0 00-3.28-3.46z"
        />
        <path
          fill="var(--shark)"
          d="M50.18 42.12a1.78 1.78 0 10-.55 0 3.53 3.53 0 00-3.26 3.57h7.08v-.11a3.53 3.53 0 00-3.27-3.46z"
        />
        <path
          fill="var(--shark)"
          d="M60.48 31.86a1.77 1.77 0 10-.55 0 3.54 3.54 0 00-3.26 3.57h7.08v-.11a3.52 3.52 0 00-3.27-3.46z"
        />
        <path
          fill="var(--shark)"
          d="M43.33 35.32a3.52 3.52 0 00-3.27-3.46 1.77 1.77 0 10-.54 0 3.53 3.53 0 00-3.26 3.57h7.07z"
        />
      </g>
    </svg>
  );
}
