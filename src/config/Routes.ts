import {
  ClockIcon,
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

// ---------- ROUTE CONSTANTS ----------

export const LOGIN = '/';
export const HOME = '/home';
export const UNAUTHORIZED = '/unauthorized';
export const MENTORS = '/mentors';
export const SETTINGS = '/settings/profile';
export const PROFILE = '/settings/profile';
export const SCHEDULE = '/settings/schedule';
export const HISTORY = '/history';
export const WARNINGS = '/warnings';

// ---------- API ROUTE CONSTANTS ----------

export const USER = '/user';
export const TIMESLOTS = '/timeslots';
export const AWS_TIMESLOT = '/time-slot';
export const MENTORSHIP = '/mentorship';
export const ACTIVATE = '/activate';
export const CONFIRMATION = '/confirmation';
export const FEEDBACK = '/feedback';
export const WARNING = '/warning';

// ---------- NAVIGATION ROUTES ----------

export const primaryRoutes = [
  { name: 'Inicio', href: HOME, icon: HomeIcon },
  {
    name: 'Historial',
    href: HISTORY,
    icon: DocumentTextIcon,
  },
];

export const secondaryNavigation = [
  { name: 'Configuración', href: SETTINGS, icon: CogIcon },
];

export const adminNavigation = [
  {
    name: 'Mentores',
    href: MENTORS,
    icon: UserGroupIcon,
  },
  {
    name: 'Blacklist',
    href: WARNINGS,
    icon: DocumentTextIcon,
  },
];

// ---------- NAVIGATION ROUTES | Settings ----------

export const settingsNavigation = [
  {
    name: 'Perfil',
    href: PROFILE,
    icon: UserCircleIcon,
  },
  {
    name: 'Horarios',
    href: SCHEDULE,
    icon: ClockIcon,
  },
];
