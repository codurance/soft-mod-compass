import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import stages from './mockStages';

import ReportCover from './ReportCover';

const categories = {
  organisationalMaturity: 'organisationalMaturity',
  crossFunctionalTeams: 'crossFunctionalTeams',
  continuousDelivery: 'continuousDelivery',
  xpPractices: 'xpPractices',
  culture: 'culture',
};

const progressThroughStages = ({ indexToProgressTo = 1 } = {}) => {
  const updatedStages = stages.slice();

  for (let i = 0; i < indexToProgressTo; i += 1) {
    updatedStages[i].questions.forEach((question) => {
      // eslint-disable-next-line no-param-reassign
      question.isCompleted = true;
    });
  }

  return updatedStages;
};

describe('ReportCover', () => {
  it("should set data-status of incomplete report areas to 'incomplete' ", () => {
    render(
      <ReportCover
        currentCategory={categories.organisationalMaturity}
        stages={stages}
      />
    );

    const reportAreas = screen.getAllByRole('presentation');

    for (let i = 1; i < reportAreas.length; i += 1) {
      expect(reportAreas[i].dataset.status).toBe('incomplete');
    }
  });

  it("should set the data-status of the report area matching the current question category to 'current' ", () => {
    const currentCategory = categories.organisationalMaturity;

    render(<ReportCover currentCategory={currentCategory} stages={stages} />);

    const currentReportArea = screen
      .getAllByRole('presentation')
      .find((x) => x.id === currentCategory);

    expect(currentReportArea.dataset.status).toBe('current');
  });

  it("should set the data-status of completed report areas to 'complete' ", () => {
    const currentCategory = categories.crossFunctionalTeams;
    const updatedStages = progressThroughStages({ indexToProgressTo: 1 });

    render(
      <ReportCover currentCategory={currentCategory} stages={updatedStages} />
    );

    const reportAreas = screen.getAllByRole('presentation');
    const previousReportArea = reportAreas.find(
      (x) => x.id === categories.organisationalMaturity
    );
    const currentReportArea = reportAreas.find((x) => x.id === currentCategory);
    const nextReportArea = reportAreas.find(
      (x) => x.id === categories.continuousDelivery
    );

    expect(previousReportArea.dataset.status).toBe('complete');
    expect(currentReportArea.dataset.status).toBe('current');
    expect(nextReportArea.dataset.status).toBe('incomplete');
  });
});
