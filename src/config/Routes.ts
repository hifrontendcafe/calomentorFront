import { INavigationRoute, IRoute } from '@/interfaces/router.interface';
import {
  DocumentTextIcon,
  HomeIcon,
  ExclamationIcon,
} from '@heroicons/react/outline';

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
  // {
  //   name: 'Mentores',
  //   href: MENTORS,
  //   icon: UserGroupIcon,
  // },
  {
    name: 'Penalizaciones',
    href: WARNINGS,
    icon: ExclamationIcon,
  },
  {
    name: 'Historial',
    href: ADMIN_HISTORY,
    icon: DocumentTextIcon,
  },
];

export const adminNavigation: IRoute[] = [];
