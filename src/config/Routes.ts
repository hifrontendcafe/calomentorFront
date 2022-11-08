import {
  DocumentTextIcon,
  HomeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';

// ---------- ROUTE CONSTANTS ----------

export const LOGIN = '/';
export const HOME = '/home';
export const UNAUTHORIZED = '/unauthorized';
export const MENTORS = '/mentors';
export const PROFILE = '/profile';
export const SCHEDULE = '/schedule';
export const HISTORY = '/history';
export const WARNINGS = '/warnings';
export const ADMIN_HISTORY = '/admin-history';
export const SELF_HISTORY = '/self-history';
export const SELF_FEEDBACK = '/self-feedback';

// ---------- API ROUTE CONSTANTS ----------

export const USER = '/user';
export const TIMESLOTS = '/timeslots';
export const AWS_TIMESLOT = '/time-slot';
export const MENTORSHIP = '/mentorship';
export const ACTIVATE = '/activate';
export const CONFIRMATION = '/confirmation';
export const FEEDBACK = '/feedback';
export const WARNING = '/warning';
export const MENTORS_API = '/mentor';
export const METRICS = '/metrics';

// ---------- NAVIGATION ROUTES ----------

export const primaryRoutes = [
  { name: 'Inicio', href: HOME, icon: HomeIcon },
  // {
  //   name: 'Perfil',
  //   href: PROFILE,
  //   icon: UserCircleIcon,
  // },
  // {
  //   name: 'Horarios',
  //   href: SCHEDULE,
  //   icon: ClockIcon,
  // },
  // {
  //   name: 'Mi historial',
  //   href: HISTORY,
  //   icon: DocumentTextIcon,
  // },
  {
    name: 'Mentors',
    href: MENTORS,
    icon: UserGroupIcon,
  },
  {
    name: 'Penalizaciones',
    href: WARNINGS,
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Historial',
    href: ADMIN_HISTORY,
    icon: DocumentTextIcon,
  },
];
