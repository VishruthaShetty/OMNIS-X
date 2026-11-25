// ============================================================================
// TechNova Engineering College – Digital Twin · Smart Campus
// All mock data for the frontend prototype lives in this single file.
// ============================================================================

export type HealthStatus = 'healthy' | 'attention' | 'issue';

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  sub: string;
  icon: string; // lucide icon name
  gradient: string; // tailwind gradient classes
  iconColor: string;
}

export const topStats: StatCardData[] = [
  {
    id: 'buildings',
    label: 'Buildings',
    value: 3,
    sub: 'Block A, B, C',
    icon: 'Building2',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-accent-blue',
  },
  {
    id: 'classrooms',
    label: 'Classrooms',
    value: 30,
    sub: '28 available',
    icon: 'DoorOpen',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-status-healthy',
  },
  {
    id: 'labs',
    label: 'Laboratories',
    value: 5,
    sub: '4 available',
    icon: 'FlaskConical',
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-accent-purple',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    value: 100,
    sub: '92 active',
    icon: 'Users',
    gradient: 'from-orange-500/20 to-orange-500/5',
    iconColor: 'text-accent-orange',
  },
  {
    id: 'students',
    label: 'Students',
    value: 2000,
    sub: '1,870 on campus',
    icon: 'GraduationCap',
    gradient: 'from-teal-500/20 to-teal-500/5',
    iconColor: 'text-accent-teal',
  },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const primaryNav: { id: string; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'digital-twin', label: 'Digital Twin', icon: 'Box' },
  { id: 'failure-detection', label: 'Failure Detection', icon: 'AlertTriangle' },
  { id: 'cascading-simulation', label: 'Cascading Simulation', icon: 'Workflow' },
  { id: 'recovery-planner', label: 'Recovery Planner', icon: 'LifeBuoy' },
  { id: 'resource-scheduler', label: 'Resource Scheduler', icon: 'CalendarClock' },
  { id: 'reports', label: 'Reports', icon: 'FileBarChart' },
];

export const subsystemNav: { id: string; label: string; icon: string }[] = [
  { id: 'academic', label: 'Academic', icon: 'BookOpen' },
  { id: 'faculty', label: 'Faculty', icon: 'Users' },
  { id: 'students', label: 'Students', icon: 'GraduationCap' },
  { id: 'laboratories', label: 'Laboratories', icon: 'FlaskConical' },
  { id: 'classrooms', label: 'Classrooms', icon: 'DoorOpen' },
  { id: 'examinations', label: 'Examinations', icon: 'ClipboardCheck' },
  { id: 'transportation', label: 'Transportation', icon: 'Bus' },
  { id: 'hostel', label: 'Hostel', icon: 'Home' },
  { id: 'placement', label: 'Placement', icon: 'Briefcase' },
  { id: 'events', label: 'Events', icon: 'PartyPopper' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'Server' },
  { id: 'administration', label: 'Administration', icon: 'Building' },
];

// ---------------------------------------------------------------------------
// Buildings & Digital Twin
// ---------------------------------------------------------------------------

export interface RoomData {
  name: string;
  type: 'classroom' | 'lab' | 'office' | 'hall';
  capacity: number;
  status: HealthStatus;
}

export interface BuildingData {
  id: string;
  name: string;
  status: HealthStatus;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  floors: number;
  rooms: RoomData[];
  powerStatus: string;
  subsystems: string[];
}

export const buildings: BuildingData[] = [
  {
    id: 'block-a',
    name: 'Block A',
    status: 'issue',
    position: [-3.2, 0, -1.5],
    size: [2.4, 2.6, 2.4],
    color: '#FF4D4F',
    floors: 4,
    powerStatus: 'Power Failure – Grid feed down since 10:15 AM',
    subsystems: ['Academic', 'Laboratories', 'Examinations'],
    rooms: [
      { name: 'A-101', type: 'classroom', capacity: 60, status: 'issue' },
      { name: 'A-102', type: 'classroom', capacity: 60, status: 'issue' },
      { name: 'A-201', type: 'lab', capacity: 40, status: 'issue' },
      { name: 'A-202', type: 'lab', capacity: 40, status: 'issue' },
      { name: 'A-301', type: 'hall', capacity: 120, status: 'issue' },
      { name: 'A-FO', type: 'office', capacity: 8, status: 'issue' },
    ],
  },
  {
    id: 'block-b',
    name: 'Block B',
    status: 'healthy',
    position: [0, 0, -1.5],
    size: [2.8, 3.2, 2.8],
    color: '#22D39A',
    floors: 5,
    powerStatus: 'Nominal – 100% on grid, UPS standby',
    subsystems: ['Academic', 'Faculty', 'Infrastructure'],
    rooms: [
      { name: 'B-101', type: 'classroom', capacity: 60, status: 'healthy' },
      { name: 'B-102', type: 'classroom', capacity: 60, status: 'healthy' },
      { name: 'B-201', type: 'lab', capacity: 40, status: 'healthy' },
      { name: 'B-301', type: 'hall', capacity: 150, status: 'healthy' },
      { name: 'B-FO', type: 'office', capacity: 12, status: 'healthy' },
    ],
  },
  {
    id: 'block-c',
    name: 'Block C',
    status: 'attention',
    position: [3.2, 0, -1.5],
    size: [2.2, 2.2, 2.2],
    color: '#F5A524',
    floors: 3,
    powerStatus: 'Maintenance – Generator servicing in progress',
    subsystems: ['Students', 'Hostel', 'Transportation'],
    rooms: [
      { name: 'C-101', type: 'classroom', capacity: 45, status: 'attention' },
      { name: 'C-102', type: 'classroom', capacity: 45, status: 'healthy' },
      { name: 'C-201', type: 'lab', capacity: 30, status: 'attention' },
      { name: 'C-FO', type: 'office', capacity: 6, status: 'healthy' },
    ],
  },
];

// ---------------------------------------------------------------------------
// System Health
// ---------------------------------------------------------------------------

export interface HealthCheck {
  name: string;
  status: HealthStatus;
}

export const systemHealthChecks: HealthCheck[] = [
  { name: 'Academic System', status: 'healthy' },
  { name: 'Faculty Network', status: 'healthy' },
  { name: 'Student Services', status: 'healthy' },
  { name: 'Infrastructure', status: 'issue' },
  { name: 'Transport', status: 'healthy' },
  { name: 'Hostel', status: 'attention' },
];

// ---------------------------------------------------------------------------
// Active Alerts
// ---------------------------------------------------------------------------

export interface AlertData {
  id: string;
  title: string;
  location: string;
  since: string;
  severity: 'High' | 'Medium' | 'Low';
  type: string;
}

export const activeAlerts: AlertData[] = [
  {
    id: 'alert-1',
    title: 'Power Failure – Block A',
    location: 'Block A',
    since: '10:15 AM',
    severity: 'High',
    type: 'Infrastructure',
  },
];

// ---------------------------------------------------------------------------
// Failure Detection
// ---------------------------------------------------------------------------

export const failureDetection = {
  severity: 'High' as const,
  title: 'Power Failure in Block A',
  description: 'Detected via Infrastructure Sensor (feed-monitor #IM-014)',
  detectedAt: '10:15 AM',
  sensor: 'IM-014',
};

// ---------------------------------------------------------------------------
// Cascading Impact (graph) — used on dashboard + simulation page
// ---------------------------------------------------------------------------

export interface CascadeNode {
  id: string;
  label: string;
  category: 'failure' | 'hop1' | 'hop2' | 'hop3';
  hop: number;
  status: HealthStatus;
  reason: string;
  affected: number;
  // position for React Flow
  position: { x: number; y: number };
}

export interface CascadeEdge {
  id: string;
  source: string;
  target: string;
}

export const cascadeNodes: CascadeNode[] = [
  {
    id: 'failure',
    label: 'Power Failure',
    category: 'failure',
    hop: 0,
    status: 'issue',
    reason: 'Grid feed to Block A failed at 10:15 AM. Infrastructure sensor IM-014 triggered.',
    affected: 1,
    position: { x: 0, y: 0 },
  },
  // Hop 1
  {
    id: 'labs',
    label: 'Laboratories',
    category: 'hop1',
    hop: 1,
    status: 'issue',
    reason: 'Lab-1 and Lab-2 in Block A lose power. Running experiments interrupted.',
    affected: 120,
    position: { x: -300, y: -160 },
  },
  {
    id: 'classes',
    label: 'Classes',
    category: 'hop1',
    hop: 1,
    status: 'issue',
    reason: '6 classrooms in Block A go dark. 14 scheduled sessions displaced.',
    affected: 420,
    position: { x: 0, y: -200 },
  },
  {
    id: 'exams',
    label: 'Examinations',
    category: 'hop1',
    hop: 1,
    status: 'issue',
    reason: 'Internal exam (Sem IV, 24 Apr) booked in A-301 hall – now without venue.',
    affected: 80,
    position: { x: 300, y: -160 },
  },
  // Hop 2
  {
    id: 'faculty',
    label: 'Faculty',
    category: 'hop2',
    hop: 2,
    status: 'attention',
    reason: '18 faculty members assigned to Block A sessions need reassignment.',
    affected: 18,
    position: { x: -200, y: 60 },
  },
  {
    id: 'students',
    label: 'Students',
    category: 'hop2',
    hop: 2,
    status: 'attention',
    reason: '520 students have at least one affected class or lab in Block A today.',
    affected: 520,
    position: { x: 200, y: 60 },
  },
  // Hop 3
  {
    id: 'transport',
    label: 'Transport',
    category: 'hop3',
    hop: 3,
    status: 'attention',
    reason: '2 shuttle runs to Block A gate can be skipped; route optimisation needed.',
    affected: 60,
    position: { x: 0, y: 240 },
  },
];

export const cascadeEdges: CascadeEdge[] = [
  { id: 'e1', source: 'failure', target: 'labs' },
  { id: 'e2', source: 'failure', target: 'classes' },
  { id: 'e3', source: 'failure', target: 'exams' },
  { id: 'e4', source: 'classes', target: 'faculty' },
  { id: 'e5', source: 'classes', target: 'students' },
  { id: 'e6', source: 'labs', target: 'students' },
  { id: 'e7', source: 'exams', target: 'students' },
  { id: 'e8', source: 'students', target: 'transport' },
];

export const cascadeSummary = {
  affectedSystems: 5,
  affectedStudents: 520,
  affectedFaculty: 18,
};

// ---------------------------------------------------------------------------
// Recovery Plans
// ---------------------------------------------------------------------------

export interface RecoveryPlan {
  id: string;
  rank: number;
  title: string;
  steps: string[];
  studentsAffected: number;
  workloadFairness: number; // 0-100
  estRestoreMin: number;
}

export const recommendedActions: string[] = [
  'Move classes to Block B (Preferred)',
  'Use Lab-2 for practicals',
  'Reschedule affected exams',
];

export const recoveryPlans: RecoveryPlan[] = [
  {
    id: 'plan-1',
    rank: 1,
    title: 'Relocate to Block B + Lab-2',
    steps: [
      'Move 14 displaced classes to Block B spare rooms',
      'Route practicals to Lab-2 (Block B)',
      'Reschedule Sem IV exam to B-301, 11:30 AM',
    ],
    studentsAffected: 40,
    workloadFairness: 88,
    estRestoreMin: 25,
  },
  {
    id: 'plan-2',
    rank: 2,
    title: 'Split across Block B & C',
    steps: [
      'Move 8 classes to Block B, 6 to Block C',
      'Practicals to Lab-2 and Lab-3',
      'Exam to C-101 (45-seat) in two batches',
    ],
    studentsAffected: 120,
    workloadFairness: 76,
    estRestoreMin: 40,
  },
  {
    id: 'plan-3',
    rank: 3,
    title: 'Remote + staggered',
    steps: [
      'Convert 4 theory classes to online (LMS)',
      'Practicals deferred to next day',
      'Exam moved to 04:00 PM slot',
    ],
    studentsAffected: 520,
    workloadFairness: 64,
    estRestoreMin: 15,
  },
];

// ---------------------------------------------------------------------------
// Resource Availability
// ---------------------------------------------------------------------------

export interface ResourceData {
  label: string;
  percent: number;
  used: number;
  total: number;
  color: string;
}

export const resourceAvailability: ResourceData[] = [
  { label: 'Classrooms', percent: 93, used: 28, total: 30, color: 'bg-status-healthy' },
  { label: 'Laboratories', percent: 80, used: 4, total: 5, color: 'bg-accent-blue' },
  { label: 'Hostels', percent: 95, used: 950, total: 1000, color: 'bg-accent-purple' },
  { label: 'Transport Fleet', percent: 90, used: 18, total: 20, color: 'bg-accent-teal' },
];

// ---------------------------------------------------------------------------
// Upcoming Events
// ---------------------------------------------------------------------------

export interface EventData {
  title: string;
  detail: string;
  time: string;
  icon: string;
}

export const upcomingEvents: EventData[] = [
  { title: 'Placement Drive', detail: 'Tech Mahindra', time: '11:00 AM', icon: 'Briefcase' },
  { title: 'Cultural Fest', detail: 'Spectrum', time: '02:00 PM', icon: 'PartyPopper' },
  { title: 'Internal Exam', detail: 'Sem IV', time: 'Apr 24, 09:00 AM', icon: 'ClipboardCheck' },
];

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export type NotificationPriority = 'Urgent' | 'Important' | 'FYI';
export type Role = 'Admin' | 'Faculty' | 'Student';

export interface NotificationData {
  id: string;
  priority: NotificationPriority;
  title: string;
  body: string;
  time: string;
  roles: Role[];
}

export const notifications: NotificationData[] = [
  {
    id: 'n1',
    priority: 'Urgent',
    title: 'Power Failure – Block A',
    body: 'Grid feed down since 10:15 AM. Recovery plan available for approval.',
    time: '2 min ago',
    roles: ['Admin'],
  },
  {
    id: 'n2',
    priority: 'Important',
    title: 'Your DBMS class moved to B-102',
    body: 'Block A power outage. Session relocated to Block B, room B-102.',
    time: '5 min ago',
    roles: ['Faculty', 'Student'],
  },
  {
    id: 'n3',
    priority: 'Important',
    title: 'Lab-1 practical rescheduled',
    body: 'Today’s Lab-1 session moved to Lab-2 (Block B) at 02:00 PM.',
    time: '8 min ago',
    roles: ['Faculty', 'Student'],
  },
  {
    id: 'n4',
    priority: 'FYI',
    title: 'Sem IV exam venue changed',
    body: 'Internal exam moved to B-301 at 11:30 AM. Please arrive 10 min early.',
    time: '12 min ago',
    roles: ['Admin', 'Student'],
  },
  {
    id: 'n5',
    priority: 'FYI',
    title: 'Generator servicing – Block C',
    body: 'Backup generator under maintenance until 01:00 PM. No impact expected.',
    time: '25 min ago',
    roles: ['Admin'],
  },
];

// ---------------------------------------------------------------------------
// Faculty view (role-specific)
// ---------------------------------------------------------------------------

export interface FacultyScheduleItem {
  period: string;
  subject: string;
  room: string;
  status: HealthStatus;
  note?: string;
}

export const facultySchedule: FacultyScheduleItem[] = [
  { period: '09:00 – 10:00', subject: 'DBMS (Sem IV-A)', room: 'A-101', status: 'issue', note: 'Moved to B-102' },
  { period: '10:15 – 11:15', subject: 'DBMS (Sem IV-B)', room: 'A-102', status: 'issue', note: 'Moved to B-104' },
  { period: '11:30 – 12:30', subject: 'Office hours', room: 'B-FO', status: 'healthy' },
  { period: '02:00 – 04:00', subject: 'DBMS Lab', room: 'Lab-2', status: 'healthy' },
];

export const substitutionRequests = [
  { id: 's1', faculty: 'Dr. Rao', subject: 'Networks (Sem V)', reason: 'At conference', status: 'pending' as const },
  { id: 's2', faculty: 'Prof. Iyer', subject: 'Maths (Sem III)', reason: 'Medical leave', status: 'pending' as const },
];

// ---------------------------------------------------------------------------
// Student view (role-specific) — "My Day"
// ---------------------------------------------------------------------------

export interface TimetableItem {
  period: string;
  subject: string;
  room: string;
  status: HealthStatus;
  change?: string;
}

export const studentTimetable: TimetableItem[] = [
  { period: '09:00 – 10:00', subject: 'DBMS', room: 'A-101', status: 'issue', change: 'Moved to B-102' },
  { period: '10:15 – 11:15', subject: 'Data Structures', room: 'B-201', status: 'healthy' },
  { period: '11:30 – 12:30', subject: 'Maths', room: 'B-102', status: 'healthy' },
  { period: '02:00 – 04:00', subject: 'DBMS Lab', room: 'Lab-1', status: 'attention', change: 'Moved to Lab-2' },
];

// ---------------------------------------------------------------------------
// Inject-failure modal options
// ---------------------------------------------------------------------------

export interface FailureTypeOption {
  id: string;
  label: string;
  icon: string;
}

export const failureTypes: FailureTypeOption[] = [
  { id: 'faculty-absent', label: 'Faculty absent', icon: 'UserX' },
  { id: 'power-cut', label: 'Power cut', icon: 'Zap' },
  { id: 'lab-equipment', label: 'Lab equipment', icon: 'FlaskConical' },
  { id: 'bus-breakdown', label: 'Bus breakdown', icon: 'Bus' },
  { id: 'exam-double-booked', label: 'Exam hall double-booked', icon: 'CalendarX' },
  { id: 'network-outage', label: 'Network outage', icon: 'Wifi' },
];

export const failureTargets = ['Block A', 'Block B', 'Block C', 'Dr. Rao', 'Prof. Iyer', 'Dr. Khan'];

// ---------------------------------------------------------------------------
// Page-shell content for subsystem pages
// ---------------------------------------------------------------------------

export interface PageShellContent {
  id: string;
  title: string;
  subtitle: string;
  cards: { title: string; value: string; detail: string; icon: string; tone: HealthStatus }[];
}

export const subsystemPageContent: Record<string, PageShellContent> = {
  academic: {
    id: 'academic',
    title: 'Academic',
    subtitle: 'Curriculum, timetabling and academic calendar',
    cards: [
      { title: 'Active Courses', value: '142', detail: 'across 8 departments', icon: 'BookOpen', tone: 'healthy' },
      { title: 'Sessions Today', value: '186', detail: '14 relocated due to outage', icon: 'CalendarDays', tone: 'attention' },
      { title: 'Pending Syllabus', value: '3', detail: 'units awaiting approval', icon: 'ClipboardList', tone: 'healthy' },
    ],
  },
  faculty: {
    id: 'faculty',
    title: 'Faculty',
    subtitle: 'Faculty roster, workload and substitutions',
    cards: [
      { title: 'Faculty Strength', value: '100', detail: '92 active today', icon: 'Users', tone: 'healthy' },
      { title: 'On Leave', value: '8', detail: '2 substitution requests open', icon: 'UserMinus', tone: 'attention' },
      { title: 'Avg Workload', value: '18 hrs', detail: 'within fair band', icon: 'Gauge', tone: 'healthy' },
    ],
  },
  students: {
    id: 'students',
    title: 'Students',
    subtitle: 'Enrolment, attendance and student services',
    cards: [
      { title: 'Enrolled Students', value: '2,000', detail: '1,870 on campus now', icon: 'GraduationCap', tone: 'healthy' },
      { title: 'Affected Today', value: '520', detail: 'due to Block A outage', icon: 'AlertTriangle', tone: 'issue' },
      { title: 'Attendance', value: '94.2%', detail: 'rolling 7-day average', icon: 'TrendingUp', tone: 'healthy' },
    ],
  },
  laboratories: {
    id: 'laboratories',
    title: 'Laboratories',
    subtitle: 'Lab availability, equipment and bookings',
    cards: [
      { title: 'Total Labs', value: '5', detail: '4 available', icon: 'FlaskConical', tone: 'healthy' },
      { title: 'Lab-1 (Block A)', value: 'Offline', detail: 'power failure', icon: 'PowerOff', tone: 'issue' },
      { title: 'Equipment Health', value: '97%', detail: '2 items flagged', icon: 'Wrench', tone: 'attention' },
    ],
  },
  classrooms: {
    id: 'classrooms',
    title: 'Classrooms',
    subtitle: 'Room utilisation and booking',
    cards: [
      { title: 'Total Rooms', value: '30', detail: '28 available', icon: 'DoorOpen', tone: 'healthy' },
      { title: 'Block A Rooms', value: '6 offline', detail: 'power failure', icon: 'PowerOff', tone: 'issue' },
      { title: 'Utilisation', value: '93%', detail: 'peak 11 AM – 1 PM', icon: 'BarChart3', tone: 'healthy' },
    ],
  },
  examinations: {
    id: 'examinations',
    title: 'Examinations',
    subtitle: 'Exam scheduling, halls and invigilation',
    cards: [
      { title: 'Ongoing Exams', value: '1', detail: 'Sem IV internal – venue moved', icon: 'ClipboardCheck', tone: 'attention' },
      { title: 'Halls Booked', value: '3', detail: 'A-301 unavailable', icon: 'DoorClosed', tone: 'issue' },
      { title: 'Invigilators', value: '12', detail: 'all assigned', icon: 'Users', tone: 'healthy' },
    ],
  },
  transportation: {
    id: 'transportation',
    title: 'Transportation',
    subtitle: 'Bus fleet, routes and schedules',
    cards: [
      { title: 'Fleet', value: '20 buses', detail: '18 running', icon: 'Bus', tone: 'healthy' },
      { title: 'On-time Rate', value: '96%', detail: 'route 7 delayed 4 min', icon: 'Clock', tone: 'healthy' },
      { title: 'Route Optimisation', value: '2 skips', detail: 'Block A gate – low demand', icon: 'Route', tone: 'attention' },
    ],
  },
  hostel: {
    id: 'hostel',
    title: 'Hostel',
    subtitle: 'Occupancy, mess and maintenance',
    cards: [
      { title: 'Occupancy', value: '950 / 1000', detail: '95% capacity', icon: 'Home', tone: 'healthy' },
      { title: 'Maintenance Tickets', value: '7 open', detail: '3 plumbing, 4 electrical', icon: 'Wrench', tone: 'attention' },
      { title: 'Mess Satisfaction', value: '4.2 / 5', detail: 'rolling 30-day', icon: 'Utensils', tone: 'healthy' },
    ],
  },
  placement: {
    id: 'placement',
    title: 'Placement',
    subtitle: 'Drives, offers and recruiter relations',
    cards: [
      { title: 'Placement Rate', value: '87%', detail: '2026 batch so far', icon: 'Briefcase', tone: 'healthy' },
      { title: 'Drive Today', value: 'Tech Mahindra', detail: '11:00 AM – auditorium', icon: 'CalendarDays', tone: 'healthy' },
      { title: 'Offers', value: '342', detail: 'avg package 6.8 LPA', icon: 'TrendingUp', tone: 'healthy' },
    ],
  },
  events: {
    id: 'events',
    title: 'Events',
    subtitle: 'Campus events, fests and bookings',
    cards: [
      { title: 'Today', value: '2 events', detail: 'Placement drive + Spectrum fest', icon: 'PartyPopper', tone: 'healthy' },
      { title: 'This Week', value: '8 events', detail: '2 requiring AV setup', icon: 'CalendarDays', tone: 'healthy' },
      { title: 'Conflicts', value: '1', detail: 'auditorium double-booked Apr 26', icon: 'CalendarX', tone: 'attention' },
    ],
  },
  infrastructure: {
    id: 'infrastructure',
    title: 'Infrastructure',
    subtitle: 'Power, HVAC, network and sensors',
    cards: [
      { title: 'Grid Status', value: 'Block A down', detail: 'since 10:15 AM', icon: 'PowerOff', tone: 'issue' },
      { title: 'UPS / Generator', value: 'Standby', detail: 'Block C generator servicing', icon: 'BatteryCharging', tone: 'attention' },
      { title: 'Network Uptime', value: '99.2%', detail: '30-day rolling', icon: 'Wifi', tone: 'healthy' },
    ],
  },
  administration: {
    id: 'administration',
    title: 'Administration',
    subtitle: 'HR, finance and compliance',
    cards: [
      { title: 'Staff', value: '140', detail: 'incl. 100 faculty', icon: 'Building', tone: 'healthy' },
      { title: 'Open Approvals', value: '6', detail: '2 leave, 4 purchase', icon: 'ClipboardList', tone: 'attention' },
      { title: 'Compliance', value: '100%', detail: 'all audits current', icon: 'ShieldCheck', tone: 'healthy' },
    ],
  },
  'digital-twin': {
    id: 'digital-twin',
    title: 'Campus Digital Twin',
    subtitle: 'Real-time 3D view of campus buildings and systems',
    cards: [
      { title: 'Buildings', value: '3', detail: '1 issue, 1 maintenance', icon: 'Building2', tone: 'attention' },
      { title: 'Sensors', value: '248', detail: 'all reporting', icon: 'Radio', tone: 'healthy' },
      { title: 'Last Sync', value: 'just now', detail: 'streaming live', icon: 'RefreshCw', tone: 'healthy' },
    ],
  },
  'failure-detection': {
    id: 'failure-detection',
    title: 'Failure Detection',
    subtitle: 'Real-time anomaly detection across campus systems',
    cards: [
      { title: 'Active Failures', value: '1', detail: 'Block A power', icon: 'AlertTriangle', tone: 'issue' },
      { title: 'Sensors Online', value: '248 / 250', detail: '2 in calibration', icon: 'Radio', tone: 'healthy' },
      { title: 'MTTR (avg)', value: '23 min', detail: 'last 30 days', icon: 'Timer', tone: 'healthy' },
    ],
  },
  'cascading-simulation': {
    id: 'cascading-simulation',
    title: 'Cascading Impact Simulation',
    subtitle: 'How a single failure spreads across campus subsystems',
    cards: [
      { title: 'Affected Systems', value: '5', detail: 'Labs, Classes, Exams, Faculty, Transport', icon: 'Workflow', tone: 'issue' },
      { title: 'Affected Students', value: '520', detail: 'reducible to 40 with plan', icon: 'Users', tone: 'attention' },
      { title: 'Cascade Depth', value: '3 hops', detail: 'max propagation', icon: 'GitBranch', tone: 'healthy' },
    ],
  },
  'recovery-planner': {
    id: 'recovery-planner',
    title: 'Recovery Planner',
    subtitle: 'AI-assisted recovery plan generation and approval',
    cards: [
      { title: 'Recommended Plan', value: 'Plan 1', detail: '40 students affected, 88% fairness', icon: 'LifeBuoy', tone: 'healthy' },
      { title: 'Approval Status', value: 'Pending', detail: 'awaiting admin approval', icon: 'ClipboardCheck', tone: 'attention' },
      { title: 'Est. Restore', value: '25 min', detail: 'after approval', icon: 'Timer', tone: 'healthy' },
    ],
  },
  'resource-scheduler': {
    id: 'resource-scheduler',
    title: 'Resource Scheduler',
    subtitle: 'Room, lab and fleet scheduling across campus',
    cards: [
      { title: 'Room Utilisation', value: '93%', detail: '28 / 30 in use', icon: 'DoorOpen', tone: 'healthy' },
      { title: 'Lab Utilisation', value: '80%', detail: '4 / 5 booked', icon: 'FlaskConical', tone: 'healthy' },
      { title: 'Fleet Utilisation', value: '90%', detail: '18 / 20 running', icon: 'Bus', tone: 'healthy' },
    ],
  },
  reports: {
    id: 'reports',
    title: 'Reports',
    subtitle: 'Operational, incident and compliance reports',
    cards: [
      { title: 'Incident Reports', value: '14', detail: 'this month', icon: 'FileBarChart', tone: 'healthy' },
      { title: 'Uptime Report', value: '99.2%', detail: '30-day rolling', icon: 'Activity', tone: 'healthy' },
      { title: 'Compliance', value: '100%', detail: 'audits current', icon: 'ShieldCheck', tone: 'healthy' },
    ],
  },
};
