/**
 * MAS MTEC Course Schedules — HS2025 + FS2026
 * Source: ETH Zurich Course Catalogue (VVZ), fetched 2026-03-20
 *
 * HS2025: ~Sep 2025 – Feb 2026 (some block courses outside official dates)
 * FS2026: 16 Feb 2026 – 29 May 2026. Easter break: 06–10 Apr 2026.
 */

// Each session: { date: 'YYYY-MM-DD', start: 'HH:MM', end: 'HH:MM', room: string }
export const COURSE_SCHEDULES = {
  '365-1120-00': {
    name: 'AI for Executives',
    type: 'block',
    sessions: [
      { date: '2026-02-20', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-03-20', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-03-21', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-04-15', start: '18:00', end: '20:00', room: 'Online' },
    ],
  },
  '363-0302-00': {
    name: 'Strategic Talent Management in the Age of AI',
    type: 'block',
    sessions: [
      { date: '2026-03-06', start: '09:15', end: '17:00', room: 'HG D 7.1' },
      { date: '2026-03-07', start: '09:15', end: '17:00', room: 'HG D 7.1' },
      { date: '2026-05-08', start: '09:15', end: '17:00', room: 'HG D 7.1' },
      { date: '2026-05-09', start: '09:15', end: '17:00', room: 'HG D 7.1' },
    ],
  },
  '365-1173-00': {
    name: 'Fundamentals of Machine Learning for Executives',
    type: 'block',
    sessions: [
      { date: '2026-01-26', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-02-09', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '365-1194-00': {
    name: 'Cybersecurity for Business Leaders',
    type: 'block',
    sessions: [
      { date: '2026-04-16', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-04-17', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-04-18', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '363-0392-00': {
    name: 'Strategic Management',
    type: 'weekly',
    weekday: 4, // Thursday
    start: '16:15',
    end: '20:00',
    room: 'CAB G 51',
    sessions: [
      { date: '2026-02-19', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-02-26', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-03-05', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-03-12', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-03-19', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-03-26', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-04-02', start: '16:00', end: '20:00', room: 'Online' },
      { date: '2026-04-09', start: '16:15', end: '20:00', room: 'CAB G 11' },
      { date: '2026-04-16', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-04-23', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-04-30', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-05-14', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-05-21', start: '16:15', end: '20:00', room: 'CAB G 51' },
      { date: '2026-05-28', start: '16:15', end: '20:00', room: 'CAB G 51' },
    ],
  },
  '365-1097-00': {
    name: 'Innovation Management',
    type: 'block',
    sessions: [
      { date: '2026-02-27', start: '09:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-02-28', start: '09:15', end: '16:45', room: 'HG D 16.2' },
      { date: '2026-03-13', start: '09:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '365-0881-00': {
    name: 'Mastering Project Management',
    type: 'block',
    sessions: [
      { date: '2026-04-23', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-04-24', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-04-25', start: '08:15', end: '16:45', room: 'WEV F 109' },
    ],
  },
  '365-1099-00': {
    name: 'Design Thinking',
    type: 'block',
    sessions: [
      { date: '2026-07-02', start: '09:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-07-03', start: '09:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-07-04', start: '09:15', end: '16:45', room: 'WEV F 109' },
    ],
  },
  '365-1193-00': {
    name: 'Personal Leadership (2/4): Building High-Performing Teams',
    type: 'block',
    sessions: [
      { date: '2026-02-13', start: '08:30', end: '17:00', room: 'WEV F 109' },
      { date: '2026-02-14', start: '08:30', end: '16:45', room: 'WEV F 109' },
    ],
  },
  '365-1197-00': {
    name: 'Personal Leadership (4/4): Advanced Leadership Skills',
    type: 'block',
    sessions: [
      { date: '2026-02-06', start: '08:30', end: '17:00', room: 'HG G 26.3' },
      { date: '2026-02-07', start: '08:30', end: '16:45', room: 'HG G 26.3' },
    ],
  },
  '365-1086-00': {
    name: 'Organizational Change Management',
    type: 'block',
    sessions: [
      { date: '2026-02-05', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-02-06', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-02-07', start: '08:15', end: '16:45', room: 'WEV F 109' },
    ],
  },
  '365-1192-00': {
    name: 'Corporate Finance',
    type: 'block',
    sessions: [
      { date: '2026-03-26', start: '09:15', end: '18:00', room: 'HG D 16.2' },
      { date: '2026-03-27', start: '09:15', end: '18:00', room: 'HG D 16.2' },
      { date: '2026-03-28', start: '09:15', end: '16:45', room: 'HG D 16.2' },
    ],
  },
  '365-1151-00': {
    name: 'Applied Business Ethics for Managers',
    type: 'block',
    sessions: [
      { date: '2026-06-13', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-06-26', start: '09:15', end: '18:00', room: 'HG D 16.2' },
      { date: '2026-06-27', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '365-0881-01': {
    name: 'Advanced Project Management',
    type: 'block',
    sessions: [
      { date: '2026-04-24', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-04-25', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '365-1141-00': {
    name: 'Platform and Ecosystem Strategies',
    type: 'block',
    sessions: [
      { date: '2026-05-29', start: '09:15', end: '18:00', room: 'WEV F 109' },
      { date: '2026-05-30', start: '08:15', end: '17:00', room: 'WEV F 109' },
    ],
  },
  '365-1176-00': {
    name: 'Resilience - Beyond Risk Management',
    type: 'block',
    sessions: [
      { date: '2026-06-18', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-06-19', start: '08:00', end: '17:00', room: 'HG D 16.2' },
      { date: '2026-06-25', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '363-1060-00': {
    name: 'Strategies for Sustainable Business',
    type: 'block',
    sessions: [
      { date: '2026-03-06', start: '09:15', end: '17:00', room: 'LFW B 3' },
      { date: '2026-03-13', start: '09:15', end: '17:00', room: 'LFW B 3' },
      { date: '2026-03-27', start: '09:15', end: '17:00', room: 'LFW B 3' },
    ],
  },
  '363-0448-00': {
    name: 'Global Operations Strategy',
    type: 'weekly',
    weekday: 3, // Wednesday
    start: '16:15',
    end: '18:00',
    room: 'CAB G 61',
    sessions: [
      { date: '2026-02-18', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-02-25', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-03-04', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-03-11', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-03-18', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-03-25', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-04-01', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-04-15', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-04-22', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-04-29', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-05-06', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-05-13', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-05-20', start: '16:15', end: '18:00', room: 'CAB G 61' },
      { date: '2026-05-27', start: '16:15', end: '18:00', room: 'CAB G 61' },
    ],
  },
  '363-1077-00': {
    name: 'Entrepreneurship',
    type: 'weekly',
    weekday: 3, // Wednesday
    start: '16:15',
    end: '20:00',
    room: 'WEV / RZ',
    sessions: [
      { date: '2026-02-18', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-02-25', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-03-04', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-03-11', start: '16:15', end: '20:00', room: 'RZ D 8' },
      { date: '2026-03-18', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-03-25', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-04-01', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-04-15', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-04-22', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-04-29', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-05-06', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-05-13', start: '16:15', end: '20:00', room: 'WEV F 111' },
      { date: '2026-05-20', start: '16:15', end: '20:00', room: 'WEV F 111' },
    ],
  },
  '363-0792-00': {
    name: 'Knowledge Management',
    type: 'block',
    sessions: [
      { date: '2026-03-20', start: '09:15', end: '17:00', room: 'HG E 33.3' },
      { date: '2026-03-21', start: '09:15', end: '17:00', room: 'HG E 33.3' },
    ],
  },
  '365-1149-00': {
    name: 'Introduction to Personal Branding and Storytelling',
    type: 'block',
    sessions: [
      { date: '2026-05-15', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2026-05-16', start: '08:15', end: '17:00', room: 'WEV F 109' },
    ],
  },
  '363-0575-00': {
    name: 'Economic Growth, Cycles and Policy',
    type: 'weekly',
    weekday: 1, // Monday
    start: '12:15',
    end: '14:00',
    room: 'HG E 1.2',
    sessions: [],
  },

  // ---- HS2025 courses ----

  '365-1183-00': {
    name: 'Leveraging Generative AI for Sustainable Business Value',
    type: 'block',
    sessions: [
      { date: '2025-11-13', start: '09:15', end: '17:00', room: 'HG F 26.3' },
      { date: '2025-11-14', start: '09:15', end: '17:00', room: 'HG F 26.3' },
      { date: '2025-11-15', start: '09:15', end: '17:00', room: 'HG F 26.3' },
    ],
  },
  '365-1143-00': {
    name: 'Digital Transformation: Integrating Cloud and Business',
    type: 'block',
    sessions: [
      { date: '2025-08-30', start: '08:15', end: '17:00', room: 'HG E 22' },
      { date: '2025-09-13', start: '08:15', end: '17:00', room: 'HG E 22' },
    ],
  },
  '363-0421-00': {
    name: 'Management of Digital Transformation',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '14:15',
    end: '16:00',
    room: 'HG G 3',
    sessions: [],
  },
  '365-1181-00': {
    name: 'Introduction to Quantum Computing',
    type: 'block',
    sessions: [
      { date: '2025-10-02', start: '08:45', end: '17:30', room: 'HIT F 13' },
      { date: '2025-10-03', start: '09:15', end: '18:00', room: 'HG E 33.5' },
      { date: '2025-10-04', start: '09:15', end: '17:00', room: 'HG E 33.5' },
    ],
  },
  '363-0389-00': {
    name: 'Technology and Innovation Management',
    type: 'weekly',
    weekday: 1, // Monday
    start: '14:15',
    end: '16:00',
    room: 'NO C 60',
    sessions: [],
  },
  '365-0347-00': {
    name: 'Negotiation Skills',
    type: 'block',
    sessions: [
      { date: '2025-10-17', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-10-18', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-11-28', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-11-29', start: '08:15', end: '17:00', room: 'WEV F 109' },
    ],
  },
  '365-1189-00': {
    name: 'Personal Leadership (1/4): Mastering Effective Communication',
    type: 'block',
    sessions: [
      { date: '2025-08-22', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-08-23', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-09-26', start: '08:15', end: '17:00', room: 'HG E 42' },
      { date: '2025-09-27', start: '08:15', end: '17:00', room: 'HG E 42' },
    ],
  },
  '365-1059-00': {
    name: 'Practicing Strategy',
    type: 'block',
    sessions: [
      { date: '2025-08-29', start: '10:15', end: '19:00', room: 'WEV F 109' },
      { date: '2025-09-26', start: '10:15', end: '19:00', room: 'WEV F 109' },
    ],
  },
  '363-1028-00': {
    name: 'Entrepreneurial Leadership',
    type: 'block',
    sessions: [
      { date: '2025-09-24', start: '10:00', end: '13:00', room: 'External' },
      { date: '2025-10-01', start: '10:15', end: '13:00', room: 'HG D 5.1' },
      { date: '2025-11-12', start: '10:15', end: '13:00', room: 'HG D 5.1' },
      { date: '2025-12-05', start: '10:15', end: '13:00', room: 'HG F 26.1' },
    ],
  },
  '363-0341-00': {
    name: 'Introduction to Management',
    type: 'weekly',
    weekday: 4, // Thursday
    start: '12:15',
    end: '14:00',
    room: 'HG F 5',
    sessions: [],
  },
  '363-0301-00': {
    name: 'Work Design and Organizational Change',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '10:15',
    end: '12:00',
    room: 'LFW C 5',
    sessions: [],
  },
  '365-1195-00': {
    name: 'Organisational Behaviour',
    type: 'block',
    sessions: [
      { date: '2025-09-04', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2025-09-05', start: '08:15', end: '17:00', room: 'HG D 16.2' },
      { date: '2025-09-06', start: '08:15', end: '17:00', room: 'HG D 16.2' },
    ],
  },
  '363-0403-00': {
    name: 'Introduction to Marketing',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '08:15',
    end: '10:00',
    room: 'ML H 44',
    sessions: [],
  },
  '363-0425-00': {
    name: 'Transformation: Corporate Development and IT',
    type: 'block',
    sessions: [
      { date: '2025-09-22', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-10-20', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-10-27', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-11-03', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-11-10', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-12-01', start: '12:00', end: '18:00', room: 'Online' },
      { date: '2025-12-15', start: '12:00', end: '14:00', room: 'Online' },
    ],
  },
  '363-0541-00': {
    name: 'Economic Dynamics and Complexity',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '10:15',
    end: '12:00',
    room: 'ML H 44',
    sessions: [],
  },
  '363-0305-00': {
    name: 'Empirical Methods in Management',
    type: 'weekly',
    weekday: 3, // Wednesday
    start: '14:15',
    end: '16:00',
    room: 'HG E 1.1',
    sessions: [],
  },
  '363-1004-00': {
    name: 'Operations Research',
    type: 'weekly',
    weekday: 1, // Monday
    start: '08:15',
    end: '10:00',
    room: 'ML F 39',
    sessions: [],
  },
  '363-0503-00': {
    name: 'Principles of Microeconomics',
    type: 'weekly',
    weekday: 4, // Thursday
    start: '08:15',
    end: '10:00',
    room: 'ML D 28',
    sessions: [],
  },
  '363-0565-00': {
    name: 'Economic Policy Beyond Neoclassical Thinking',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '16:15',
    end: '18:00',
    room: 'ETA F 5',
    sessions: [],
  },
  '363-0711-00': {
    name: 'Financial Markets',
    type: 'weekly',
    weekday: 4, // Thursday
    start: '10:15',
    end: '12:00',
    room: 'HG F 3',
    sessions: [],
  },
  '365-1019-00': {
    name: 'Human Resource Management: Skills in Practice',
    type: 'block',
    sessions: [
      { date: '2025-10-25', start: '08:00', end: '17:00', room: 'Online' },
      { date: '2025-12-05', start: '08:15', end: '17:00', room: 'HG E 23' },
      { date: '2025-12-06', start: '08:15', end: '17:00', room: 'HG E 23' },
    ],
  },
  '365-1083-00': {
    name: 'Leading the Technology-Driven Enterprise',
    type: 'block',
    sessions: [
      { date: '2025-10-31', start: '09:15', end: '18:00', room: 'HG E 33.1' },
      { date: '2025-11-01', start: '08:15', end: '17:00', room: 'HG E 33.1' },
      { date: '2025-11-21', start: '09:15', end: '18:00', room: 'HG E 33.3' },
    ],
  },
  '365-1196-00': {
    name: 'Personal Leadership (3/4): Self-Leadership and Conflict Resolution',
    type: 'block',
    sessions: [
      { date: '2025-08-15', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-08-16', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-09-19', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-09-20', start: '08:15', end: '17:00', room: 'WEV F 109' },
    ],
  },
  '365-1166-00': {
    name: 'Learning Factory: Introduction to Lean and Industry 4.0',
    type: 'block',
    sessions: [
      { date: '2025-11-07', start: '09:15', end: '16:00', room: 'WEV F 109' },
      { date: '2025-11-14', start: '09:15', end: '16:00', room: 'WEV F 109' },
    ],
  },
  '363-0861-00': {
    name: 'Alliance Advantage',
    type: 'block',
    sessions: [
      { date: '2025-09-20', start: '08:15', end: '17:00', room: 'WEV H 326' },
      { date: '2025-10-25', start: '08:15', end: '17:00', room: 'WEV F 109' },
      { date: '2025-12-06', start: '08:15', end: '17:00', room: 'WEV F 109' },
    ],
  },
  '363-1082-00': {
    name: 'Enabling Entrepreneurship: From Science to Startup',
    type: 'block',
    sessions: [
      { date: '2025-10-01', start: '14:15', end: '18:00', room: 'HG F 26.1' },
      { date: '2025-10-08', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-10-15', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-10-22', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-10-29', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-11-05', start: '14:15', end: '18:00', room: 'LFW B 3' },
      { date: '2025-11-12', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-11-19', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-12-03', start: '16:00', end: '18:00', room: 'Online' },
      { date: '2025-12-10', start: '14:15', end: '18:00', room: 'HG F 26.1' },
    ],
  },
  '363-0790-00': {
    name: 'Technology Entrepreneurship',
    type: 'weekly',
    weekday: 2, // Tuesday
    start: '18:15',
    end: '20:00',
    room: 'HG G 3',
    sessions: [],
  },
  '365-1187-00': {
    name: 'Corporate Entrepreneurship and Innovation',
    type: 'block',
    sessions: [
      { date: '2025-11-06', start: '09:15', end: '18:00', room: 'WEV F 109' },
      { date: '2025-11-07', start: '09:15', end: '18:00', room: 'RZ D 8' },
      { date: '2025-11-08', start: '09:15', end: '18:00', room: 'WEV F 109' },
    ],
  },
  '363-0393-00': {
    name: 'Corporate Strategy',
    type: 'block',
    sessions: [
      { date: '2025-10-13', start: '09:15', end: '17:00', room: 'HG F 26.3' },
      { date: '2025-10-14', start: '09:15', end: '17:00', room: 'HG F 26.3' },
      { date: '2025-10-15', start: '09:15', end: '17:00', room: 'HG F 26.3' },
    ],
  },
};
