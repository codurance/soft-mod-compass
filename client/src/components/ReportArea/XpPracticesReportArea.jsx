import React from 'react';
import translator from '../../config/translator';
import './styles.scss';

export default function XpPracticesReportArea() {
  return (
    <svg
      className="report-area-icon"
      id="xpPractices"
      viewBox="0 0 100 100"
      role="presentation"
    >
      <g>
        <circle cx="50" cy="50" r="50" fill="white" />
        <circle
          cx="50"
          cy="50"
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
        {`${translator.xpPractices.split(' ')[0]}`}
      </text>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="75.63"
      >
        {`${translator.xpPractices.split(' ')[1]}`}
      </text>
      <path
        d="M59.28 22.9a12.91 12.91 0 00-9.45-4.08.58.58 0 00-.58.57.57.57 0 00.57.57A11.85 11.85 0 1146 43c-.3-3.3.2-5.59 1.52-7s3.24-1.91 6.29-1.92l-.56.41a.57.57 0 00-.12.8.58.58 0 00.78.13L55.89 34a.27.27 0 00.11 0 .48.48 0 00.12-.16.57.57 0 00-.12-.64.27.27 0 00-.08-.07L54 31.68a.58.58 0 00-.8.13.56.56 0 00.12.79l.48.35c-3.34 0-5.6.75-7 2.27s-2.08 4-1.87 7.3a11.63 11.63 0 01-3.63-2.62c-.58-5.58 2.16-8.78 8.61-10l-.35.34a.57.57 0 10.8.82L52 29.41l.07-.08a.51.51 0 00.09-.18.49.49 0 000-.24.57.57 0 00-.22-.38l-.09-.06-2.13-1.1a.57.57 0 00-.54 1l.71.37c-6.53 1.16-9.85 4.41-9.91 9.67a11.66 11.66 0 01-1.34-2.69c0-5.62 3.4-7.75 6.83-9.28l-.36.68a.57.57 0 001 .54l1.1-2.07a.55.55 0 00.07-.54 1.83 1.83 0 01-.13-.16.59.59 0 00-.17-.1h-.1l-2.37-.4a.57.57 0 00-.66.45.57.57 0 00.46.66l.5.08c-2.81 1.23-5.69 3-6.81 6.73v-.51a11.84 11.84 0 013.32-8.22l-.07.78a.57.57 0 001.14.11l.21-2.4v-.19l-.06-.13v-.07a.43.43 0 00-.1-.09l-.07-.06H41.95l-2.42.47a.57.57 0 00-.43.68.58.58 0 00.69.43l.49-.12a12.9 12.9 0 00-2.74 13 1.07 1.07 0 00.07.19 13.19 13.19 0 002.55 4.28.61.61 0 00.22.23 13 13 0 1019.15-17.52z"
        fill="var(--shark)"
      />
    </svg>
  );
}
