import React from 'react';
import translator from '../../config/translator';
import './styles.scss';

export default function OrganisationalMaturityReportArea() {
  return (
    <svg className="report-area-icon" viewBox="0 0 100 100">
      <g id="Cross Functional Teams">
        <circle cx="49.96" cy="50.19" r="50" fill="white" />
        <circle
          cx="49.96"
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
        {`${translator.organisationalMaturity.split(' ')[0]}`}
      </text>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="75.63"
      >
        {`${translator.organisationalMaturity.split(' ')[1]}`}
      </text>
      <path
        d="M58.15 36.47a2.25 2.25 0 00-2.33-.8 8.68 8.68 0 00-3.18 1.14 9.09 9.09 0 00-2.13 1.67v-5.59a2.91 2.91 0 00.92.15 4.07 4.07 0 00.5 0 7.87 7.87 0 002.29-.68c.27-.13.55-.26.82-.42h.06l.16-.1c2.32-1.4 3.57-3.31 2.89-4.5a2.21 2.21 0 00-2.32-.79 8.36 8.36 0 00-3.18 1.13 9.35 9.35 0 00-2.14 1.67V19l3.63 3.63a.55.55 0 00.81-.73l.06-.06-4.59-4.59a.66.66 0 00-.92 0l-4.58 4.59.06.06a.55.55 0 00.81.73L49.41 19v14.87a8.84 8.84 0 00-2.13-1.67 8.55 8.55 0 00-3.18-1.14 2.23 2.23 0 00-2.32.8c-.68 1.19.56 3.1 2.89 4.49l.15.1h.07c.27.15.54.29.82.42a7.89 7.89 0 002.28.68 4.36 4.36 0 00.51 0 2.8 2.8 0 00.91-.15v9.18h1.1v-4.49a2.91 2.91 0 00.92.15h.51a7.89 7.89 0 002.28-.68c.28-.13.55-.27.82-.42h.07l.15-.1c2.33-1.4 3.57-3.31 2.89-4.5zm-7.64-5c0-.61.91-1.85 2.68-2.87a7.38 7.38 0 012.76-1h.37c.45 0 .77.11.88.29.28.48-.61 1.93-2.64 3.1a7.33 7.33 0 01-2.75 1c-.63.07-1.12 0-1.25-.26a.34.34 0 01-.05-.22zm-1.1 4.64a.41.41 0 010 .19c-.13.23-.62.34-1.25.26a7.33 7.33 0 01-2.75-1c-2-1.17-2.92-2.62-2.64-3.1.11-.18.43-.28.88-.28h.37a7.56 7.56 0 012.76 1c1.74 1 2.64 2.23 2.68 2.85zm5.15 4.06a7.53 7.53 0 01-2.75 1c-.63.07-1.12 0-1.25-.26a.36.36 0 01-.05-.22c0-.62.92-1.86 2.69-2.88a7.27 7.27 0 012.75-1 2.3 2.3 0 01.37 0c.45 0 .78.1.88.28.28.41-.61 1.91-2.64 3.03z"
        fill="var(--shark)"
      />
    </svg>
  );
}
