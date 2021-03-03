import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ReportCover from './ReportCover';

let reportAreas;
let reportAreaMap;

function setupTest() {
  reportAreas = screen.getAllByRole(/presentation/);

  reportAreaMap = {
    ORGANISATIONAL_MATURITY: reportAreas.find((x) => {
      return x.id === 'organisationalMaturity';
    }),
    TEAM_EFFECTIVENESS: reportAreas.find((x) => x.id === 'teamEffectiveness'),
    CONTINUOUS_DELIVERY: reportAreas.find((x) => x.id === 'continuousDelivery'),
    XP_PRACTICES: reportAreas.find((x) => x.id === 'xpPractices'),
    ORGANISATIONAL_CULTURE: reportAreas.find((x) => x.id === 'culture'),
  };
}

describe('ReportCover', () => {
  it("should render default styles for report area if not yet on or passed the report area's category", () => {
    render(<ReportCover />);

    setupTest(reportAreas, reportAreaMap);

    expect(reportAreaMap.ORGANISATIONAL_MATURITY.dataset.status).toBe('');
  });

  it("should render current styles for report area if on the report area's category", () => {
    render(<ReportCover />);

    setupTest(reportAreas, reportAreaMap);

    expect(reportAreaMap.ORGANISATIONAL_MATURITY.dataset.status).toBe(
      /current/
    );
  });

  it("should render compeleted styles for a report area once passed the report area's category", () => {
    render(<ReportCover />);

    setupTest(reportAreas, reportAreaMap);

    expect(reportAreaMap.ORGANISATIONAL_MATURITY.dataset.status).toBe(
      /complete/
    );
  });
});
