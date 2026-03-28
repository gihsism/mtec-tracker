export const CORE_AREAS = [
  { id: 'general_mgmt', name: 'General Management and Human Resource Management', minCP: 3 },
  { id: 'strategy', name: 'Strategy, Markets and Technology', minCP: 3 },
  { id: 'info_ops', name: 'Information Management and Operations Management', minCP: 3 },
  { id: 'quantitative', name: 'Quantitative and Qualitative Methods', minCP: 3 },
  { id: 'economics', name: 'Micro and Macroeconomics', minCP: 3 },
  { id: 'financial', name: 'Financial Management', minCP: 3 },
];

export const REQUIREMENTS = {
  totalCP: 60,
  minCourseCP: 48,       // min CP from coursework (excl. thesis)
  maxCourseCP: 53,       // max CP from coursework (excl. thesis)
  coreMinCP: 15,
  coreAreasRequired: 5,  // must cover at least 5 of 6 areas
  skillTrainingMin: 2,
  thesisCP: 12,
  thesisMinGrade: 4.0,   // Swiss scale
  maxCoursesPerSemester: 8,
  maxExtradepartmental: 6, // max CP from non-D-MTEC departments
  plagiarismCourseId: '365-1170-00', // must complete in semester 1
  semesters: 4,          // part-time program
};

// Career goal presets with keywords for matching free-text input
export const CAREER_TRACKS = [
  {
    id: 'ai_ml',
    label: 'AI / ML / Data',
    icon: '\u{1F916}',
    description: 'Artificial intelligence, machine learning, data science, tech leadership',
    keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'data', 'deep learning', 'nlp', 'computer vision', 'tech lead', 'data scientist', 'data engineer', 'ai engineer', 'llm', 'generative ai', 'neural', 'automation', 'analytics', 'big data', 'algorithm'],
    courses: [
      { id: '365-1120-00', name: 'AI for Executives', cp: 3, area: 'quantitative', type: 'core', reason: 'Core AI/ML decision-making for leaders' },
      { id: '363-0302-00', name: 'Strategic Talent Management in the Age of AI', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Building and leading AI teams' },
      { id: '365-1173-00', name: 'Fundamentals of Machine Learning for Executives', cp: 1, type: 'elective', reason: 'Hands-on ML literacy for tech leaders' },
      { id: '365-1183-00', name: 'Leveraging Generative AI for Sustainable Business Value', cp: 2, type: 'elective', reason: 'Applying GenAI to real business problems' },
      { id: '365-1143-00', name: 'Digital Transformation: Integrating Cloud and Business', cp: 1, type: 'elective', reason: 'Cloud infrastructure powering AI/ML workloads' },
      { id: '363-0421-00', name: 'Management of Digital Transformation', cp: 3, area: 'info_ops', type: 'core', reason: 'Leading AI-driven digital transformation' },
      { id: '365-1194-00', name: 'Cybersecurity for Business Leaders', cp: 2, type: 'elective', reason: 'Securing AI systems and data pipelines' },
      { id: '363-0305-00', name: 'Empirical Methods in Management', cp: 3, area: 'quantitative', type: 'core', reason: 'Statistical methods essential for data roles' },
      { id: '365-1083-00', name: 'Leading the Technology-Driven Enterprise', cp: 2, type: 'elective', reason: 'Leading orgs where AI is the core product' },
      { id: '363-0389-00', name: 'Technology and Innovation Management', cp: 3, type: 'elective', reason: 'Managing AI/ML innovation pipeline' },
    ],
  },
  {
    id: 'digital_cto',
    label: 'Digital / CTO',
    icon: '\u{1F4BB}',
    description: 'Digital transformation, CTO, CIO, technology leadership',
    keywords: ['cto', 'cio', 'digital', 'technology leader', 'tech lead', 'it director', 'digital transformation', 'cloud', 'cyber', 'software', 'platform', 'devops', 'infrastructure', 'it manag', 'tech strateg', 'quantum'],
    courses: [
      { id: '363-0421-00', name: 'Management of Digital Transformation', cp: 3, area: 'info_ops', type: 'core', reason: 'Core framework for leading digital change' },
      { id: '363-0425-00', name: 'Transformation: Corporate Development and IT', cp: 3, area: 'info_ops', type: 'core', reason: 'Aligning IT strategy with business goals' },
      { id: '365-1120-00', name: 'AI for Executives', cp: 3, area: 'quantitative', type: 'core', reason: 'AI literacy required for technology leaders' },
      { id: '365-1143-00', name: 'Digital Transformation: Integrating Cloud and Business', cp: 1, type: 'elective', reason: 'Cloud architecture and business integration' },
      { id: '365-1194-00', name: 'Cybersecurity for Business Leaders', cp: 2, type: 'elective', reason: 'Security strategy for CTO/CIO roles' },
      { id: '365-1181-00', name: 'Introduction to Quantum Computing', cp: 2, type: 'elective', reason: 'Next-gen computing for tech leaders' },
      { id: '365-1083-00', name: 'Leading the Technology-Driven Enterprise', cp: 2, type: 'elective', reason: 'Direct CTO/CIO leadership skills' },
      { id: '363-0389-00', name: 'Technology and Innovation Management', cp: 3, type: 'elective', reason: 'Managing technology portfolio and R&D' },
      { id: '365-1141-00', name: 'Platform and Ecosystem Strategies', cp: 1, type: 'elective', reason: 'Building and scaling digital platforms' },
      { id: '365-1173-00', name: 'Fundamentals of Machine Learning for Executives', cp: 1, type: 'elective', reason: 'ML understanding for tech decision-making' },
    ],
  },
  {
    id: 'pm_consulting',
    label: 'PM / Consulting',
    icon: '\u{1F4CA}',
    description: 'Project management, strategy consulting, management consulting',
    keywords: ['pm', 'project manag', 'consult', 'mckinsey', 'bcg', 'bain', 'deloitte', 'accenture', 'management consult', 'business analyst', 'transformation', 'change manage', 'agile', 'scrum', 'program manage', 'pmo'],
    courses: [
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Core strategic thinking for consultants' },
      { id: '365-1097-00', name: 'Innovation Management', cp: 3, area: 'strategy', type: 'core', reason: 'Innovation strategy advisory skills' },
      { id: '363-0393-00', name: 'Corporate Strategy', cp: 3, type: 'elective', reason: 'Deep strategy analysis for consulting cases' },
      { id: '365-0881-00', name: 'Mastering Project Management: Classic to Agile', cp: 2, type: 'elective', reason: 'Essential PM methodology and certification' },
      { id: '365-0881-01', name: 'Advanced Project Management: Cases and Coaching', cp: 1, type: 'elective', reason: 'Advanced PM case practice' },
      { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill', reason: 'Human-centered consulting methodology' },
      { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill', reason: 'Client and stakeholder negotiation' },
      { id: '365-1189-00', name: 'Personal Leadership (1/4): Mastering Effective Communication', cp: 1, type: 'skill', reason: 'Client presentation and communication' },
      { id: '365-1059-00', name: 'Practicing Strategy', cp: 1, type: 'elective', reason: 'Hands-on strategy case application' },
      { id: '365-1086-00', name: 'Organizational Change Management', cp: 2, type: 'elective', reason: 'Change management consulting' },
      { id: '363-0305-00', name: 'Empirical Methods in Management', cp: 3, area: 'quantitative', type: 'core', reason: 'Data-driven consulting analysis' },
    ],
  },
  {
    id: 'product',
    label: 'Product Management',
    icon: '\u{1F3AF}',
    description: 'Product management, product strategy, product-led growth',
    keywords: ['product manag', 'product lead', 'product owner', 'product strateg', 'product development', 'product market fit', 'user experience', 'ux', 'growth', 'product-led'],
    courses: [
      { id: '365-1097-00', name: 'Innovation Management', cp: 3, area: 'strategy', type: 'core', reason: 'Product innovation and lifecycle management' },
      { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill', reason: 'User-centered product discovery' },
      { id: '363-0403-00', name: 'Introduction to Marketing', cp: 3, area: 'strategy', type: 'core', reason: 'Understanding market fit and positioning' },
      { id: '365-0881-00', name: 'Mastering Project Management: Classic to Agile', cp: 2, type: 'elective', reason: 'Agile product development process' },
      { id: '365-1141-00', name: 'Platform and Ecosystem Strategies', cp: 1, type: 'elective', reason: 'Platform product strategy' },
      { id: '365-1120-00', name: 'AI for Executives', cp: 3, area: 'quantitative', type: 'core', reason: 'AI-powered product features' },
      { id: '365-1149-00', name: 'Introduction to Personal Branding and Storytelling', cp: 1, type: 'skill', reason: 'Product storytelling and stakeholder buy-in' },
      { id: '363-0389-00', name: 'Technology and Innovation Management', cp: 3, type: 'elective', reason: 'Tech roadmap and product strategy' },
      { id: '363-0790-00', name: 'Technology Entrepreneurship', cp: 2, type: 'elective', reason: 'Building products from zero to one' },
      { id: '365-1183-00', name: 'Leveraging Generative AI for Sustainable Business Value', cp: 2, type: 'elective', reason: 'AI product opportunities' },
    ],
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    icon: '\u{1F680}',
    description: 'Founding a startup, venture building, intrapreneurship',
    keywords: ['startup', 'founder', 'entrepreneur', 'venture', 'ceo', 'co-founder', 'launch', 'own company', 'own business', 'intrapreneur', 'spinoff', 'spin-off', 'bootstrapp'],
    courses: [
      { id: '363-1082-00', name: 'Enabling Entrepreneurship: From Science to Startup', cp: 3, type: 'elective', reason: 'Full startup journey from idea to launch' },
      { id: '363-1077-00', name: 'Entrepreneurship', cp: 3, type: 'elective', reason: 'Core entrepreneurship frameworks' },
      { id: '363-0790-00', name: 'Technology Entrepreneurship', cp: 2, type: 'elective', reason: 'Tech-focused venture building' },
      { id: '363-1028-00', name: 'Entrepreneurial Leadership', cp: 4, type: 'elective', reason: 'Leading as a founder/CEO' },
      { id: '365-1097-00', name: 'Innovation Management', cp: 3, area: 'strategy', type: 'core', reason: 'Innovation frameworks for new ventures' },
      { id: '365-1187-00', name: 'Corporate Entrepreneurship and Innovation', cp: 3, area: 'strategy', type: 'core', reason: 'Intrapreneurship and corporate ventures' },
      { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill', reason: 'Validating ideas through prototyping' },
      { id: '365-1149-00', name: 'Introduction to Personal Branding and Storytelling', cp: 1, type: 'skill', reason: 'Pitching to investors and customers' },
      { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill', reason: 'Fundraising and partnership deals' },
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Strategic thinking for business building' },
      { id: '365-1192-00', name: 'Corporate Finance', cp: 3, area: 'financial', type: 'core', reason: 'Financial planning for startups' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance / FinTech',
    icon: '\u{1F4B0}',
    description: 'Financial management, investment, fintech, banking',
    keywords: ['finance', 'fintech', 'banking', 'investment', 'cfo', 'financial', 'trading', 'asset', 'portfolio', 'venture capital', 'vc', 'private equity', 'pe', 'wealth', 'crypto', 'defi', 'blockchain', 'accounting', 'treasury', 'valuation'],
    courses: [
      { id: '365-1192-00', name: 'Corporate Finance', cp: 3, area: 'financial', type: 'core', reason: 'Core: valuation, capital structure, M&A' },
      { id: '363-0711-00', name: 'Financial Markets', cp: 3, area: 'financial', type: 'core', reason: 'Core: capital markets and instruments' },
      { id: '363-1153-00', name: 'Decentralized Finance', cp: 3, type: 'elective', reason: 'DeFi, blockchain, and crypto finance' },
      { id: '363-0503-00', name: 'Principles of Microeconomics', cp: 3, area: 'economics', type: 'core', reason: 'Economic foundations for financial analysis' },
      { id: '363-0575-00', name: 'Economic Growth, Cycles and Policy', cp: 3, area: 'economics', type: 'core', reason: 'Macro understanding for market cycles' },
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Strategic decision-making for investments' },
      { id: '365-1120-00', name: 'AI for Executives', cp: 3, area: 'quantitative', type: 'core', reason: 'AI in trading and financial modelling' },
      { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill', reason: 'Deal negotiation and term sheets' },
      { id: '365-1176-00', name: 'Resilience - Beyond Risk Management', cp: 2, type: 'elective', reason: 'Risk management frameworks' },
      { id: '363-0305-00', name: 'Empirical Methods in Management', cp: 3, area: 'quantitative', type: 'core', reason: 'Quantitative analysis for finance' },
    ],
  },
  {
    id: 'ops_supply',
    label: 'Operations / Supply Chain',
    icon: '\u{2699}\u{FE0F}',
    description: 'Operations management, supply chain, manufacturing, logistics',
    keywords: ['operations', 'supply chain', 'logistics', 'manufactur', 'production', 'lean', 'six sigma', 'coo', 'ops', 'procurement', 'warehouse', 'inventory', 'industry 4.0', 'factory'],
    courses: [
      { id: '363-0421-00', name: 'Management of Digital Transformation', cp: 3, area: 'info_ops', type: 'core', reason: 'Digitizing operations and supply chains' },
      { id: '363-0448-00', name: 'Global Operations Strategy', cp: 3, type: 'elective', reason: 'Global supply chain design and strategy' },
      { id: '363-1004-00', name: 'Operations Research', cp: 3, area: 'quantitative', type: 'core', reason: 'Optimization methods for operations' },
      { id: '365-1166-00', name: 'Learning Factory: Introduction to Lean and Industry 4.0', cp: 1, type: 'elective', reason: 'Hands-on lean manufacturing and Industry 4.0' },
      { id: '365-0881-00', name: 'Mastering Project Management: Classic to Agile', cp: 2, type: 'elective', reason: 'Managing operational improvement projects' },
      { id: '365-1176-00', name: 'Resilience - Beyond Risk Management', cp: 2, type: 'elective', reason: 'Supply chain resilience and continuity' },
      { id: '363-0389-00', name: 'Technology and Innovation Management', cp: 3, type: 'elective', reason: 'Tech-driven operational improvement' },
      { id: '365-1141-00', name: 'Platform and Ecosystem Strategies', cp: 1, type: 'elective', reason: 'Supply chain platform ecosystems' },
      { id: '363-0861-00', name: 'Alliance Advantage', cp: 3, type: 'elective', reason: 'Supplier and partner alliances' },
      { id: '363-0425-00', name: 'Transformation: Corporate Development and IT', cp: 3, area: 'info_ops', type: 'core', reason: 'IT-enabled operational transformation' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing / Sales',
    icon: '\u{1F4E3}',
    description: 'Marketing management, brand strategy, sales leadership, growth',
    keywords: ['marketing', 'brand', 'sales', 'growth', 'customer', 'market', 'advertis', 'digital marketing', 'content', 'go-to-market', 'cmo', 'revenue', 'b2b', 'b2c', 'ecommerce', 'e-commerce'],
    courses: [
      { id: '363-0403-00', name: 'Introduction to Marketing', cp: 3, area: 'strategy', type: 'core', reason: 'Core marketing strategy and frameworks' },
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Market positioning and competitive strategy' },
      { id: '365-1097-00', name: 'Innovation Management', cp: 3, area: 'strategy', type: 'core', reason: 'New product launches and market innovation' },
      { id: '365-1149-00', name: 'Introduction to Personal Branding and Storytelling', cp: 1, type: 'skill', reason: 'Brand storytelling and narrative' },
      { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill', reason: 'Customer-centered product and campaign design' },
      { id: '363-0503-00', name: 'Principles of Microeconomics', cp: 3, area: 'economics', type: 'core', reason: 'Pricing strategy and market dynamics' },
      { id: '365-1141-00', name: 'Platform and Ecosystem Strategies', cp: 1, type: 'elective', reason: 'Marketplace and platform growth' },
      { id: '365-1183-00', name: 'Leveraging Generative AI for Sustainable Business Value', cp: 2, type: 'elective', reason: 'AI-powered marketing and personalization' },
      { id: '363-0393-00', name: 'Corporate Strategy', cp: 3, type: 'elective', reason: 'Market entry and expansion strategy' },
      { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill', reason: 'Sales negotiation and partnerships' },
    ],
  },
  {
    id: 'hr_leadership',
    label: 'HR / Leadership',
    icon: '\u{1F465}',
    description: 'Human resources, people management, organizational development, leadership',
    keywords: ['hr', 'human resource', 'people', 'talent', 'recruit', 'hiring', 'chro', 'organizational development', 'od', 'culture', 'leadership', 'team lead', 'manager', 'coaching', 'mentoring', 'learning & development', 'l&d', 'diversity', 'inclusion', 'dei'],
    courses: [
      { id: '363-0341-00', name: 'Introduction to Management', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Foundational management and leadership theory' },
      { id: '363-0301-00', name: 'Work Design and Organizational Change', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Designing effective organizations and roles' },
      { id: '365-1195-00', name: 'Organizational Behaviour', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Understanding people and team dynamics' },
      { id: '363-0302-00', name: 'Strategic Talent Management in the Age of AI', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Modern talent strategy and workforce planning' },
      { id: '365-1019-00', name: 'Human Resource Management: Skills in Practice', cp: 2, type: 'skill', reason: 'Hands-on HR skills and tools' },
      { id: '365-1189-00', name: 'Personal Leadership (1/4): Mastering Effective Communication', cp: 1, type: 'skill', reason: 'Communication for people leaders' },
      { id: '365-1193-00', name: 'Personal Leadership (2/4): Building High-Performing Teams', cp: 1, type: 'skill', reason: 'Team building and performance management' },
      { id: '365-1196-00', name: 'Personal Leadership (3/4): Self-Leadership and Conflict Resolution', cp: 1, type: 'skill', reason: 'Workplace conflict resolution' },
      { id: '365-1197-00', name: 'Personal Leadership (4/4): Advanced Leadership Skills', cp: 1, type: 'skill', reason: 'Senior leadership development' },
      { id: '365-1086-00', name: 'Organizational Change Management', cp: 2, type: 'elective', reason: 'Leading organizational transformations' },
      { id: '365-1151-00', name: 'Applied Business Ethics for Managers', cp: 2, type: 'skill', reason: 'Ethical leadership and corporate governance' },
    ],
  },
  {
    id: 'sustainability',
    label: 'Sustainability / ESG',
    icon: '\u{1F331}',
    description: 'Sustainability, ESG, corporate responsibility, climate, circular economy',
    keywords: ['sustainab', 'esg', 'climate', 'green', 'circular', 'carbon', 'environment', 'social impact', 'csr', 'responsible', 'impact', 'clean', 'renewable', 'net zero', 'sdg'],
    courses: [
      { id: '363-1060-00', name: 'Strategies for Sustainable Business', cp: 3, type: 'elective', reason: 'Core sustainability strategy frameworks' },
      { id: '365-1183-00', name: 'Leveraging Generative AI for Sustainable Business Value', cp: 2, type: 'elective', reason: 'AI for sustainability and impact measurement' },
      { id: '365-1176-00', name: 'Resilience - Beyond Risk Management', cp: 2, type: 'elective', reason: 'Climate risk and organizational resilience' },
      { id: '363-0565-00', name: 'Economic Policy Beyond Neoclassical Thinking', cp: 3, area: 'economics', type: 'core', reason: 'Alternative economic models for sustainability' },
      { id: '365-1151-00', name: 'Applied Business Ethics for Managers', cp: 2, type: 'skill', reason: 'Ethical decision-making and CSR' },
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Integrating sustainability into corporate strategy' },
      { id: '363-0503-00', name: 'Principles of Microeconomics', cp: 3, area: 'economics', type: 'core', reason: 'Economics of externalities and regulation' },
      { id: '365-1097-00', name: 'Innovation Management', cp: 3, area: 'strategy', type: 'core', reason: 'Sustainable innovation and green tech' },
      { id: '363-0448-00', name: 'Global Operations Strategy', cp: 3, type: 'elective', reason: 'Sustainable global supply chains' },
      { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill', reason: 'Designing sustainable solutions' },
    ],
  },
  {
    id: 'general_mgmt',
    label: 'General Management',
    icon: '\u{1F3E2}',
    description: 'General management, CEO, executive leadership, broad business',
    keywords: ['general manag', 'ceo', 'executive', 'director', 'vp', 'vice president', 'head of', 'managing director', 'business leader', 'c-suite', 'board', 'senior manag', 'mba', 'broad'],
    courses: [
      { id: '363-0341-00', name: 'Introduction to Management', cp: 3, area: 'general_mgmt', type: 'core', reason: 'Foundation of management practice' },
      { id: '363-0392-00', name: 'Strategic Management', cp: 3, area: 'strategy', type: 'core', reason: 'Strategic leadership and planning' },
      { id: '365-1192-00', name: 'Corporate Finance', cp: 3, area: 'financial', type: 'core', reason: 'Financial acumen for executives' },
      { id: '363-0503-00', name: 'Principles of Microeconomics', cp: 3, area: 'economics', type: 'core', reason: 'Economic reasoning for business decisions' },
      { id: '365-1120-00', name: 'AI for Executives', cp: 3, area: 'quantitative', type: 'core', reason: 'Technology literacy for modern leaders' },
      { id: '363-0421-00', name: 'Management of Digital Transformation', cp: 3, area: 'info_ops', type: 'core', reason: 'Leading digital business transformation' },
      { id: '363-1028-00', name: 'Entrepreneurial Leadership', cp: 4, type: 'elective', reason: 'Executive leadership and intrapreneurship' },
      { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill', reason: 'Executive negotiation and influence' },
      { id: '363-0393-00', name: 'Corporate Strategy', cp: 3, type: 'elective', reason: 'Corporate portfolio and M&A strategy' },
      { id: '363-0861-00', name: 'Alliance Advantage', cp: 3, type: 'elective', reason: 'Strategic partnerships and alliances' },
      { id: '363-0792-00', name: 'Knowledge Management', cp: 1, type: 'elective', reason: 'Organizational knowledge and learning' },
    ],
  },
];

// Keep backward compat — build CAREER_RECOMMENDATIONS from CAREER_TRACKS
export const CAREER_RECOMMENDATIONS = Object.fromEntries(
  CAREER_TRACKS.map(t => [t.id, { label: t.label, icon: t.icon, courses: t.courses }])
);

export const CORE_COURSE_MAP = {
  // General Management and HR
  '363-0341-00': 'general_mgmt',
  '363-0301-00': 'general_mgmt',
  '365-1195-00': 'general_mgmt',
  '363-0302-00': 'general_mgmt',
  '363-1080-00': 'general_mgmt',
  // Strategy, Markets and Technology
  '363-0392-00': 'strategy',
  '365-1097-00': 'strategy',
  '365-1187-00': 'strategy',
  '363-0403-00': 'strategy',
  '363-0387-00': 'strategy',
  '363-0389-00': 'strategy',
  '363-1077-00': 'strategy',
  // Information Management and Operations Management
  '363-0421-00': 'info_ops',
  '363-0425-00': 'info_ops',
  '363-0445-00': 'info_ops',
  '363-0453-00': 'info_ops',
  // Quantitative and Qualitative Methods
  '365-1120-00': 'quantitative',
  '363-0541-00': 'quantitative',
  '363-0305-00': 'quantitative',
  '363-1004-00': 'quantitative',
  '363-0570-00': 'quantitative',
  // Micro and Macroeconomics
  '363-0503-00': 'economics',
  '363-0575-00': 'economics',
  '363-0565-00': 'economics',
  '363-0515-00': 'economics',
  '363-0537-00': 'economics',
  // Financial Management
  '363-0711-00': 'financial',
  '363-0560-00': 'financial',
  '363-0561-00': 'financial',
  '365-1192-00': 'financial',
};

// Semester availability: HS = Autumn (Herbstsemester), FS = Spring (Frühlingssemester)
export const COURSE_SEMESTERS = {
  // Core courses
  '363-0341-00': 'HS',
  '363-0301-00': 'HS',
  '365-1195-00': 'HS',
  '363-0302-00': 'FS',
  '363-1080-00': 'FS',
  '363-0392-00': 'FS+HS',
  '365-1097-00': 'FS',
  '365-1187-00': 'HS',
  '363-0403-00': 'HS',
  '363-0387-00': 'HS',
  '363-0389-00': 'HS',
  '363-1077-00': 'FS',
  '363-0421-00': 'HS',
  '363-0425-00': 'HS',
  '363-0445-00': 'HS',
  '363-0453-00': 'HS',
  '365-1120-00': 'FS',
  '363-0541-00': 'HS',
  '363-0305-00': 'HS',
  '363-1004-00': 'HS',
  '363-0570-00': 'FS',
  '363-0503-00': 'HS',
  '363-0575-00': 'FS',
  '363-0565-00': 'HS',
  '363-0515-00': 'FS',
  '363-0537-00': 'FS',
  '363-0711-00': 'HS',
  '363-0560-00': 'HS',
  '363-0561-00': 'FS',
  '365-1192-00': 'FS',
  // Skill-based courses (365-xxxx)
  '365-1099-00': 'FS+HS',
  '365-1019-00': 'HS',
  '365-1151-00': 'FS',
  '365-1149-00': 'FS+HS',
  '365-1083-00': 'HS',
  '365-1143-00': 'HS',
  '365-1173-00': 'FS',
  '365-1183-00': 'HS',
  '365-1194-00': 'FS',
  '365-1181-00': 'HS',
  '365-0881-00': 'FS',
  '365-0881-01': 'FS',
  '365-1141-00': 'FS',
  '365-1176-00': 'FS',
  '365-1166-00': 'HS',
  '365-0347-00': 'HS',
  '365-1189-00': 'HS',
  '365-1193-00': 'FS',
  '365-1196-00': 'HS',
  '365-1197-00': 'FS',
  '365-1059-00': 'HS',
  '365-1086-00': 'FS',
  '365-1191-00': 'HS',
  '365-1053-00': 'HS',
  '365-1142-00': 'HS',
  '365-1190-00': 'HS',
  '365-1174-00': 'FS',
  '365-1071-00': 'FS',
  '365-1170-00': 'HS',   // Plagiarism course — required in semester 1
  // Elective courses
  '363-0393-00': 'HS',
  '363-1028-00': 'HS',
  '363-0861-00': 'HS',
  '363-1060-00': 'FS',
  '363-0448-00': 'FS',
  '363-1082-00': 'HS',
  '363-0790-00': 'HS',
  '363-1153-00': 'FS',
  '363-0792-00': 'FS',
  '363-1137-00': 'HS',
  '363-1136-00': 'HS',
  '363-1192-00': 'HS',
  '363-1037-00': 'HS',
  '363-1201-00': 'HS',
  '363-0585-00': 'HS',
  '363-1161-00': 'HS',
  '363-1021-00': 'HS',
  '363-1178-00': 'HS',
  '363-1159-00': 'HS',
  '363-1047-00': 'HS',
  '363-1107-00': 'HS',
  '363-1081-00': 'HS',
  '363-1200-00': 'HS',
  '363-0311-00': 'HS',
  '363-1194-00': 'HS',
  '363-1036-00': 'HS',
  '363-1106-00': 'HS',
  '363-1163-00': 'HS',
  '363-1017-00': 'HS',
  '363-1132-00': 'HS',
  '363-1051-00': 'HS',
  '363-1195-01': 'HS',
  '363-0404-00': 'HS',
  '363-0887-00': 'HS',
  '363-1193-00': 'HS',
  '363-0881-00': 'HS',
  '363-0883-00': 'HS',
  '363-1185-00': 'FS',
  '363-1203-00': 'FS',
  '363-0586-00': 'FS',
  '363-0584-00': 'FS',
  '363-1008-00': 'FS',
  '363-1204-00': 'FS',
  '363-1199-00': 'FS',
  '363-1000-00': 'FS',
  '363-1103-00': 'FS',
  '363-0514-00': 'FS',
  '363-1190-00': 'FS',
  '363-1164-00': 'FS',
  '363-1196-00': 'FS',
  '363-1129-00': 'FS',
  '363-0768-00': 'FS',
  '363-0452-00': 'FS',
  '363-1048-00': 'FS',
  '363-1091-00': 'FS',
  '363-1076-00': 'FS',
  '363-1098-00': 'FS',
  '363-1171-00': 'FS',
  '363-1115-00': 'FS',
  '363-1184-00': 'FS',
  '363-1043-00': 'FS',
  '363-1128-00': 'FS',
  '363-0764-00': 'FS',
  '363-1029-00': 'FS',
  '363-1038-00': 'FS',
};

/**
 * All known MAS MTEC courses for the enrollment picker.
 * Deduplicated from career tracks + core course map + additional known courses.
 */
export const ALL_COURSES = (() => {
  const map = new Map();

  // Gather from career tracks
  for (const track of CAREER_TRACKS) {
    for (const c of track.courses) {
      if (!map.has(c.id)) {
        map.set(c.id, { id: c.id, name: c.name, cp: c.cp, type: c.type, area: c.area || CORE_COURSE_MAP[c.id] || null, semester: COURSE_SEMESTERS[c.id] || null });
      }
    }
  }

  // All known MAS MTEC courses (from ETH VVZ HS2025 + FS2026)
  const extra = [
    // ---- Core courses ----
    // General Management and HR
    { id: '363-0341-00', name: 'Introduction to Management', cp: 3, type: 'core', area: 'general_mgmt' },
    { id: '363-0301-00', name: 'Work Design and Organizational Change', cp: 3, type: 'core', area: 'general_mgmt' },
    { id: '365-1195-00', name: 'Organizational Behaviour', cp: 3, type: 'core', area: 'general_mgmt' },
    { id: '363-1080-00', name: 'Responsible Leadership', cp: 3, type: 'core', area: 'general_mgmt' },
    // Strategy, Markets and Technology
    { id: '363-0403-00', name: 'Introduction to Marketing', cp: 3, type: 'core', area: 'strategy' },
    { id: '363-0387-00', name: 'Corporate Sustainability', cp: 3, type: 'core', area: 'strategy' },
    { id: '363-0389-00', name: 'Technology and Innovation Management', cp: 3, type: 'core', area: 'strategy' },
    // Information Management and Operations Management
    { id: '363-0425-00', name: 'Transformation: Corporate Development and IT', cp: 3, type: 'core', area: 'info_ops' },
    { id: '363-0445-00', name: 'Production and Operations Management', cp: 3, type: 'core', area: 'info_ops' },
    { id: '363-0453-00', name: 'Strategic Supply Chain Management', cp: 3, type: 'core', area: 'info_ops' },
    // Quantitative and Qualitative Methods
    { id: '363-0541-00', name: 'Economic Dynamics and Complexity', cp: 3, type: 'core', area: 'quantitative' },
    { id: '363-0305-00', name: 'Empirical Methods in Management', cp: 3, type: 'core', area: 'quantitative' },
    { id: '363-1004-00', name: 'Operations Research', cp: 3, type: 'core', area: 'quantitative' },
    { id: '363-0570-00', name: 'Principles of Econometrics', cp: 3, type: 'core', area: 'quantitative' },
    // Micro and Macroeconomics
    { id: '363-0503-00', name: 'Principles of Microeconomics', cp: 3, type: 'core', area: 'economics' },
    { id: '363-0575-00', name: 'Economic Growth, Cycles and Policy', cp: 3, type: 'core', area: 'economics' },
    { id: '363-0565-00', name: 'Principles of Macroeconomics', cp: 3, type: 'core', area: 'economics' },
    { id: '363-0515-00', name: 'Markets and Games', cp: 3, type: 'core', area: 'economics' },
    { id: '363-0537-00', name: 'Sustainability Economics', cp: 3, type: 'core', area: 'economics' },
    // Financial Management
    { id: '363-0711-00', name: 'Accounting for Managers', cp: 3, type: 'core', area: 'financial' },
    { id: '363-0560-00', name: 'Introduction to Finance', cp: 3, type: 'core', area: 'financial' },
    { id: '363-0561-00', name: 'Advanced Finance', cp: 3, type: 'core', area: 'financial' },

    // ---- Skill-based courses (365-xxxx, MAS-specific) ----
    { id: '365-1189-00', name: 'Personal Leadership (1/4): Mastering Effective Communication', cp: 1, type: 'skill' },
    { id: '365-1193-00', name: 'Personal Leadership (2/4): Building High-Performing Teams', cp: 1, type: 'skill' },
    { id: '365-1196-00', name: 'Personal Leadership (3/4): Self-Leadership and Conflict Resolution', cp: 1, type: 'skill' },
    { id: '365-1197-00', name: 'Personal Leadership (4/4): Advanced Leadership Skills', cp: 1, type: 'skill' },
    { id: '365-0347-00', name: 'Negotiation Skills', cp: 1, type: 'skill' },
    { id: '365-1099-00', name: 'Design Thinking', cp: 2, type: 'skill' },
    { id: '365-1019-00', name: 'Human Resource Management: Skills in Practice', cp: 2, type: 'skill' },
    { id: '365-1151-00', name: 'Applied Business Ethics for Managers', cp: 2, type: 'skill' },
    { id: '365-1149-00', name: 'Introduction to Personal Branding and Storytelling', cp: 1, type: 'skill' },
    { id: '365-1083-00', name: 'Leading the Technology-Driven Enterprise', cp: 2, type: 'skill' },
    { id: '365-1143-00', name: 'Digital Transformation: Integrating Cloud and Business', cp: 1, type: 'skill' },
    { id: '365-1173-00', name: 'Fundamentals of Machine Learning for Executives', cp: 1, type: 'skill' },
    { id: '365-1183-00', name: 'Leveraging Generative AI for Sustainable Business Value', cp: 2, type: 'skill' },
    { id: '365-1194-00', name: 'Cybersecurity for Business Leaders', cp: 2, type: 'skill' },
    { id: '365-1181-00', name: 'Introduction to Quantum Computing', cp: 2, type: 'skill' },
    { id: '365-0881-00', name: 'Mastering Project Management: Classic to Agile', cp: 2, type: 'skill' },
    { id: '365-0881-01', name: 'Advanced Project Management: Cases and Coaching', cp: 1, type: 'skill' },
    { id: '365-1059-00', name: 'Practicing Strategy', cp: 1, type: 'skill' },
    { id: '365-1086-00', name: 'Organizational Change Management', cp: 2, type: 'skill' },
    { id: '365-1141-00', name: 'Platform and Ecosystem Strategies', cp: 1, type: 'skill' },
    { id: '365-1176-00', name: 'Resilience - Beyond Risk Management', cp: 2, type: 'skill' },
    { id: '365-1166-00', name: 'Learning Factory: Introduction to Lean and Industry 4.0', cp: 1, type: 'skill' },
    { id: '365-1192-00', name: 'Corporate Finance', cp: 3, type: 'skill' },
    { id: '365-1191-00', name: 'Corporate Governance', cp: 3, type: 'skill' },
    { id: '365-1053-00', name: 'Innovation, Creativity and Personality Traits', cp: 1, type: 'skill' },
    { id: '365-1142-00', name: 'Understanding Human Behavior - Research and Business Insights', cp: 1, type: 'skill' },
    { id: '365-1190-00', name: 'Climate Risk, Sustainable Business and Finance', cp: 2, type: 'skill' },
    { id: '365-1174-00', name: 'Machine Learning for Industrial Applications', cp: 2, type: 'skill' },
    { id: '365-1071-00', name: 'Course Abroad', cp: 3, type: 'skill' },
    { id: '365-1170-00', name: "Epigeum's Avoiding Plagiarism", cp: 0, type: 'other' },

    // ---- Elective courses (MSc MTEC electives open to MAS) ----
    { id: '363-0393-00', name: 'Corporate Strategy', cp: 3, type: 'elective' },
    { id: '363-1028-00', name: 'Entrepreneurial Leadership', cp: 4, type: 'elective' },
    { id: '363-0861-00', name: 'Alliance Advantage', cp: 3, type: 'elective' },
    { id: '363-1060-00', name: 'Strategies for Sustainable Business', cp: 3, type: 'elective' },
    { id: '363-0448-00', name: 'Global Operations Strategy', cp: 3, type: 'elective' },
    { id: '363-1082-00', name: 'Enabling Entrepreneurship: From Science to Startup', cp: 3, type: 'elective' },
    { id: '363-1077-00', name: 'Entrepreneurship', cp: 3, type: 'elective' },
    { id: '363-0790-00', name: 'Technology Entrepreneurship', cp: 2, type: 'elective' },
    { id: '363-1153-00', name: 'Decentralized Finance', cp: 3, type: 'elective' },
    { id: '363-0792-00', name: 'Knowledge Management', cp: 1, type: 'elective' },
    // Economic Dynamics electives
    { id: '363-1137-00', name: 'Applied Econometrics in Environmental and Energy Economics', cp: 3, type: 'elective' },
    { id: '363-1136-00', name: 'Dynamic Macroeconomics, Innovation and Growth', cp: 3, type: 'elective' },
    { id: '363-1192-00', name: 'Economics, Politics, and Markets', cp: 3, type: 'elective' },
    { id: '363-1037-00', name: 'Fiscal Competition and Multinational Firms', cp: 3, type: 'elective' },
    { id: '363-1201-00', name: 'Health Economics', cp: 3, type: 'elective' },
    { id: '363-0585-00', name: 'Intermediate Econometrics', cp: 3, type: 'elective' },
    { id: '363-1161-00', name: 'Methods of Macroeconomic Forecasting', cp: 3, type: 'elective' },
    { id: '363-1021-00', name: 'Monetary Policy', cp: 3, type: 'elective' },
    { id: '363-1178-00', name: 'Population Ageing and Pension Economics', cp: 3, type: 'elective' },
    { id: '363-1159-00', name: 'The Economics of Work, Wages, and Discrimination', cp: 3, type: 'elective' },
    { id: '363-1047-00', name: 'Urban Systems and Transportation', cp: 3, type: 'elective' },
    { id: '363-1107-00', name: 'Youth Labor Market Outcomes and Governance of Education Systems', cp: 3, type: 'elective' },
    { id: '363-1185-00', name: 'Applied Political Economy', cp: 3, type: 'elective' },
    { id: '363-1203-00', name: 'Climate Economics and Finance', cp: 3, type: 'elective' },
    { id: '363-0586-00', name: 'International Economics: Theory of New Trade and Multinational Firms', cp: 3, type: 'elective' },
    { id: '363-0584-00', name: 'International Monetary Economics', cp: 3, type: 'elective' },
    { id: '363-1008-00', name: 'Public Economics', cp: 3, type: 'elective' },
    { id: '363-1204-00', name: 'The Economics of Inequality and the Environment', cp: 3, type: 'elective' },
    // Finance and Investment electives
    { id: '363-1081-00', name: 'Asset Liability Management and Treasury Risks', cp: 3, type: 'elective' },
    { id: '363-1200-00', name: 'Economics for Actuaries', cp: 3, type: 'elective' },
    { id: '363-1199-00', name: 'Corporate Finance', cp: 3, type: 'elective' },
    { id: '363-1000-00', name: 'Financial Economics', cp: 3, type: 'elective' },
    // Human and Entrepreneurial Behaviour electives
    { id: '363-0311-00', name: 'AI Implementation & Risk: The Human Factor', cp: 3, type: 'elective' },
    { id: '363-1103-00', name: 'Lean Startup Academy - From Idea to Startup', cp: 3, type: 'elective' },
    // Natural Resources electives
    { id: '363-1194-00', name: 'An Introduction to Experiments in Consumer Behavior', cp: 3, type: 'elective' },
    { id: '363-1036-00', name: 'Empirical Innovation Economics', cp: 3, type: 'elective' },
    { id: '363-1106-00', name: 'The Economics of Climate Change', cp: 3, type: 'elective' },
    { id: '363-0514-00', name: 'Energy Economics and Policy', cp: 3, type: 'elective' },
    { id: '363-1190-00', name: 'Macroeconomic Modeling of Climate Change', cp: 3, type: 'elective' },
    { id: '363-1164-00', name: 'Topics in Energy and Climate Policy', cp: 5, type: 'elective' },
    // Supply Chain and Information Systems electives
    { id: '363-1163-00', name: 'Developing Digital Biomarkers', cp: 3, type: 'elective' },
    { id: '363-1196-00', name: 'AI in Production Management', cp: 3, type: 'elective' },
    { id: '363-1129-00', name: 'Humanitarian Operations and Supply Chain Management', cp: 3, type: 'elective' },
    { id: '363-0768-00', name: 'Industrial Perspectives on Operations Management', cp: 3, type: 'elective' },
    { id: '363-0452-00', name: 'Purchasing and Supply Management', cp: 3, type: 'elective' },
    { id: '363-1048-00', name: 'Sustainable Supply Chain Management', cp: 3, type: 'elective' },
    // Systems Design and Risks electives
    { id: '363-1017-00', name: 'Risk and Insurance Economics', cp: 3, type: 'elective' },
    { id: '363-1091-00', name: 'Social Data Science', cp: 2, type: 'elective' },
    // Technology and Innovation electives
    { id: '363-1132-00', name: 'Business Models for a Circular Economy', cp: 3, type: 'elective' },
    { id: '363-1051-00', name: 'Cases in Technology Marketing', cp: 3, type: 'elective' },
    { id: '363-0404-00', name: 'Industry and Competitive Analysis', cp: 3, type: 'elective' },
    { id: '363-0887-00', name: 'Management Research', cp: 1, type: 'elective' },
    { id: '363-1193-00', name: 'Strategic Foresight for Sustainable Futures', cp: 3, type: 'elective' },
    { id: '363-1076-00', name: 'Accelerating Net-Zero Transitions', cp: 3, type: 'elective' },
    { id: '363-1098-00', name: 'Business Analytics', cp: 3, type: 'elective' },
    { id: '363-1171-00', name: 'Business Simulation', cp: 1, type: 'elective' },
    { id: '363-1115-00', name: 'Energy Innovation and Management', cp: 3, type: 'elective' },
    { id: '363-1184-00', name: 'Management Theories for Sustainability', cp: 3, type: 'elective' },
    { id: '363-1043-00', name: 'Marketing Analytics', cp: 3, type: 'elective' },
    { id: '363-1128-00', name: 'Pricing - Theory and Practice', cp: 3, type: 'elective' },
    { id: '363-0764-00', name: 'Project Management', cp: 2, type: 'elective' },
    { id: '363-1029-00', name: 'Sustainability & Financial Markets', cp: 3, type: 'elective' },
    { id: '363-1038-00', name: 'Sustainability Start-Up Seminar', cp: 3, type: 'elective' },
    { id: '363-0881-00', name: 'Semester Project Small', cp: 3, type: 'elective' },
    { id: '363-0883-00', name: 'Semester Project Large', cp: 6, type: 'elective' },
  ];

  for (const c of extra) {
    if (!map.has(c.id)) {
      map.set(c.id, { ...c, semester: COURSE_SEMESTERS[c.id] || null });
    }
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
})();

/**
 * Match a free-text career goal to relevant tracks.
 * Returns track objects with scores sorted by relevance.
 * Matches against keywords, label, and description.
 */
export function matchCareerTracks(goalText) {
  if (!goalText || !goalText.trim()) return CAREER_TRACKS.map(t => ({ id: t.id, score: 0 }));

  const lower = goalText.toLowerCase();
  // Split goal into individual words for partial matching
  const goalWords = lower.split(/\s+/).filter(w => w.length > 2);

  const scored = CAREER_TRACKS.map(track => {
    let score = 0;

    // Keyword matching (strongest signal)
    for (const kw of track.keywords) {
      if (lower.includes(kw)) {
        score += kw.length * 2;
      }
    }

    // Label matching
    if (lower.includes(track.label.toLowerCase())) {
      score += 10;
    }

    // Description word matching
    const descLower = track.description.toLowerCase();
    for (const word of goalWords) {
      if (descLower.includes(word)) {
        score += word.length;
      }
    }

    // Course name matching — if user mentions specific course topics
    for (const course of track.courses) {
      const nameLower = course.name.toLowerCase();
      for (const word of goalWords) {
        if (nameLower.includes(word) && word.length > 3) {
          score += 1;
        }
      }
    }

    return { id: track.id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
