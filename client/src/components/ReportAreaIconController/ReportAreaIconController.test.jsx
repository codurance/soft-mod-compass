import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import ReportAreaIconController from './ReportAreaIconController';

const categories = {
  organisationalMaturity: 'organisationalMaturity',
  crossFunctionalTeams: 'crossFunctionalTeams',
};

describe('ReportAreaIconController', () => {
  it('should return the correct Report Icon to the given Organisational Maturity as a category', () => {
    render(
      <ReportAreaIconController
        currentCategory={categories.organisationalMaturity}
      />
    );

    expect(screen.getByRole('presentation', { hidden: true }).id).toBe(
      categories.organisationalMaturity
    );
  });

  it('should return the correct Report Icon to the given Cross Functional Teams as a category', () => {
    render(
      <ReportAreaIconController
        currentCategory={categories.crossFunctionalTeams}
      />
    );

    expect(screen.getByRole('presentation', { hidden: true }).id).toBe(
      categories.crossFunctionalTeams
    );
  });
});
