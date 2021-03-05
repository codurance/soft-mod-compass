import React from 'react';
import PropTypes from 'prop-types';

import ContinuousDeliveryReportArea from '../ReportArea/ContinuousDeliveryReportArea';
import OrganisationalMaturityReportArea from '../ReportArea/OrganisationalMaturityReportArea';
import OrganisationalCultureReportArea from '../ReportArea/OrganisationalCultureReportArea';
import TeamEffectivenessReportArea from '../ReportArea/TeamEffectivenessReportArea';
import XpPracticesReportArea from '../ReportArea/XpPracticesReportArea';

export default function ReportAreaIconController({ currentCategory }) {
  switch (currentCategory) {
    case 'organisationalMaturity':
      return <OrganisationalMaturityReportArea />;
    case 'crossFunctionalTeams':
      return <TeamEffectivenessReportArea />;

    case 'continuousDelivery':
      return <ContinuousDeliveryReportArea />;
    case 'xpPractices':
      return <XpPracticesReportArea />;
    case 'culture':
      return <OrganisationalCultureReportArea />;
    default:
      return 0;
  }
}

ReportAreaIconController.propTypes = {
  currentCategory: PropTypes.oneOf([
    'organisationalMaturity',
    'crossFunctionalTeams',
    'continuousDelivery',
    'xpPractices',
    'culture',
  ]).isRequired,
};
