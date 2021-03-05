import React from 'react';
import translator from '../../config/translator';
import './styles.scss';

export default function ContinuousDeliveryReportArea() {
  return (
    <svg className="report-area-icon" viewBox="0 0 100 100">
      <g id="Cross_Functional_Teams">
        <g id="background">
          <circle cx="50.06" cy="50" r="50" fill="white" />
          <circle
            cx="50.06"
            cy="50"
            r="48.5"
            fill="none"
            stroke="var(--picton-blue)"
            strokeWidth="3"
          />
        </g>
      </g>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="62.61"
      >
        {`${translator.continuousDelivery.split(' ')[0]}`}
      </text>
      <text
        textAnchor="middle"
        fill="var(--shark)"
        fontSize="10"
        x="50"
        y="75.63"
      >
        {`${translator.continuousDelivery.split(' ')[1]}`}
      </text>
      <g>
        <g>
          <path
            fill="var(--shark)"
            d="M57.2 21.92a9.24 9.24 0 00-5.2 1.6.55.55 0 00-.14.76.56.56 0 00.76.15A8.11 8.11 0 0157.2 23a8.66 8.66 0 018.43 8.84 8.65 8.65 0 01-8.43 8.83 8.53 8.53 0 01-8.2-6.74h1.88l-2.53-4.38-2.52 4.38h2a9.51 9.51 0 0018.86-2.07 9.76 9.76 0 00-9.49-9.94z"
          />
          <path d="M48.39 39.28a8.05 8.05 0 01-4.56 1.41 8.64 8.64 0 01-8.43-8.83A8.65 8.65 0 0143.83 23 8.54 8.54 0 0152 29.78h-1.87l2.53 4.38 2.53-4.38h-2a9.66 9.66 0 00-9.32-7.86 9.76 9.76 0 00-9.54 9.94 9.76 9.76 0 009.54 9.93A9.28 9.28 0 0049 40.2a.55.55 0 00-.62-.92z" />
        </g>
      </g>
    </svg>
  );
}
