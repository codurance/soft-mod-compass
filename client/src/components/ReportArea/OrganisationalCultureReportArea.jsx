import React from 'react';
import translator from '../../config/translator';
import './styles.scss';

export default function OrganisationalCultureReportArea() {
  return (
    <svg viewBox="0 0 100 100">
      <g id="Cross Functional Teams">
        <circle cx="49.9" cy="50" r="50" fill="white" />
        <circle
          cx="49.9"
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
        {`${translator.companyCulture.split(' ')[0]}`}
      </text>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="75.63"
      >
        {`${translator.companyCulture.split(' ')[1]}`}
      </text>
      <path
        d="M62.34 19.48A9.31 9.31 0 0055.43 17 9.18 9.18 0 0046 23.78a9.39 9.39 0 00-1.59-.05 9.35 9.35 0 00-6.95 2.48 8.32 8.32 0 00-2.24 5.5v13.67a.56.56 0 001.11 0V31.7a7.15 7.15 0 011.92-4.7c1.39-1.42 3.47-2.15 6.19-2.15a8.54 8.54 0 011.34 0c0 .24-.06.47-.08.71L43 31.8a.54.54 0 00.28.72.59.59 0 00.22 0h2.23v4.75a2.63 2.63 0 00.68 1.81 3.1 3.1 0 002.37.86.55.55 0 000-1.1 2.07 2.07 0 01-1.56-.51 1.5 1.5 0 01-.39-1V32a.54.54 0 00-.55-.55H44.3l2.45-5.54a1 1 0 000-.24c0-.21 0-.43.07-.64a8.12 8.12 0 016.18 7.4.59.59 0 000 .23l2.44 5.54h-1.89a.55.55 0 00-.55.54v5.36a1.49 1.49 0 01-.38 1 2.06 2.06 0 01-1.56.5.56.56 0 000 1.11 3.11 3.11 0 002.37-.87 2.57 2.57 0 00.67-1.77v-4.78h2.24a.55.55 0 00.55-.55.59.59 0 000-.22L54.1 32.3a9.21 9.21 0 00-7-8.33 8.08 8.08 0 018.3-5.86c2.68 0 4.76.71 6.15 2.13A7.29 7.29 0 0163.48 25v13.66a.55.55 0 00.55.55.55.55 0 00.55-.55V25a8.31 8.31 0 00-2.24-5.52z"
        fill="var(--shark)"
      />
    </svg>
  );
}
