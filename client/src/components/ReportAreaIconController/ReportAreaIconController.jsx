import React from 'react';
import ContinuousDeliveryReportArea from '../ReportArea/ContinuousDeliveryReportArea';
import OrganisationalMaturityReportArea from '../ReportArea/OrganisationalMaturityReportArea';
import OrganisationalCultureReportArea from '../ReportArea/OrganisationalCultureReportArea';
import TeamEffectivenessReportArea from '../ReportArea/TeamEffectivenessReportArea';
import XpPracticesReportArea from '../ReportArea/XpPracticesReportArea';

export default function ReportAreaIconController() {
  return (
    <>
      <ContinuousDeliveryReportArea />
      <OrganisationalMaturityReportArea />
      <OrganisationalCultureReportArea />
      <TeamEffectivenessReportArea />
      <XpPracticesReportArea />
    </>
  );
}
