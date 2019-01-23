module.exports = [
  {
    name: 'Organisational Maturity',
    subCategoryNames: ['DevSecOps', 'Delivering Value', 'Technical Debt', 'Well Defined Methodology'],
    low: '<section>'
    +'<p>Your ability to get changes and new features into the hands of your users quickly and confidently seems to be compromised. Finding bugs in production environments is treated as a major emergency, with frantic rework and long deployments required before they are resolved. Compounding this, the manual deployment process itself is error prone and largely not repeatable.</p>'
    +'<p>Developers in these situations are often risk averse, and lack the confidence to get feature releases and bug fixes built and deployed quickly.</p>'
    +'</section>'
    +'<section>'
    +'<p>Some major consequences of this situation are missed opportunities owing to slow time to market in development cycles, and major reputational risk from system faults that appear and then take an age to resolve. </p>'
    +'<p>You also open yourself up to both financial and legal risk, as high-impact defects which have a direct, negative effect on your customers are shipped  to production systems. You will find that recovery from these unplanned situations is hard to manage and largely unrepeatable.</p>'
    +'<p>Financially, wasted time and resources (as well as missed business goals) owing to slow processes add a burden to your bottom line. You will find the need to employ large quality-assurance teams to ensure that defects don’t slip through the cracks.</p>'
    +'</section>'
    +'<section>'
    +'<p>A good first step is to allocate the time and resources to create an integration testing environment that exactly mirrors your production environment. Foster a culture of collaboration and mutual understanding between operations and development team members by bringing them together to build this environment.</p>'
    +'<p>The next step is to analyse and understand you existing deployment processes and to choose an automation toolset that is most compatible with it. Consider the use of cloud-based solutions for this purpose, and eventually for replacing any on-premises hosting infrastructure.</p>'
    +'<p>To prevent defects from making it out of production environments, we recommend both strongly defining your quality-assurance strategy and training your development teams in test-driven development (TDD) approaches. You will need to ensure that you have created a permissive environment for developers to both learn and apply TDD principles. Tie this in with your automated deployment processes so that a full suite of tests is automatically run every time a code check-in occurs or a deployment is kicked off. Once a codebase is satisfactorily under test, consider analyzing it to find areas where strongly-coupled components can be broken apart and separated into units of single responsibility.</p>'
    +'</section>',
    medium: 'medium - organisatonal maturity',
    high: 'high - organisatonal maturity'
  },
  {
    name: 'Continuous Deployment',
    subCategoryNames: ['Deployment cadence', 'Rework', 'Automated Pipeline', 'Confidence to develop without side effects'],
    low: 'low - CD',
    medium: 'medium - CD',
    high: 'high - CD'
  },
  {
    name: 'Culture',
    subCategoryNames: ['Transparency', 'Learning', 'Failure Is An opportunity to learn', 'Career Path'],
    low: 'low - culture',
    medium: 'medium - culture',
    high: 'high - culture'
  },
  {
    name: 'Cross-Functional Teams',
    subCategoryNames: ['Diversity', 'Autonomy', 'Whole Team', 'Bus factor'],
    low: 'low -  cross functional teams',
    medium: 'medium - cross functional teams',
    high: 'high - cross functional teams'
  },
  {
    name: 'XP Practices',
    subCategoryNames: ['TDD', 'Sustainable Pace', 'Pairing', 'Peer Review'],
    low: 'low -  XP',
    medium: 'medium - XP',
    high: 'high - XP'
  }
]
