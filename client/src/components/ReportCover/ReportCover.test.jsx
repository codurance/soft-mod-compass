import { describe, expect, it } from '@jest/globals';
import { render, screen, rere } from '@testing-library/react';
import React from 'react';

import ReportCover from './ReportCover';

describe('ReportCover', () => {
  it('should render different styles based on different states of completedness', () => {
    const { rerender } = render(<ReportCover />);

    const reportAreas = screen.getAllByRole(/presentation/);

    const reportAreaMap = {
      ORGANISATIONAL_MATURITY: reportAreas.find(
        (x) => x.id === 'rganisationalMaturity'
      ),
      TEAM_EFFECTIVENESS: reportAreas.find((x) => x.id === 'teamEffectiveness'),
      CONTINUOUS_DELIVERY: reportAreas.find(
        (x) => x.id === 'continuousDelivery'
      ),
      XP_PRACTICES: reportAreas.find((x) => x.id === 'xpPractices'),
      ORGANISATIONAL_CULTURE: reportAreas.find((x) => x.id === 'culture'),
    };

    expect(reportAreaMap.ORGANISATIONAL_MATURITY.dataset.status).toBe('');

    rerender(<ReportCover />);
  });
});
