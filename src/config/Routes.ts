import {
  ClockIcon,
  CogIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

// ---------- ROUTE CONSTANTS ----------

export const LOGIN = "/";
export const HOME = "/home";
export const UNAUTHORIZED = "/unauthorized";
export const SETTINGS = "/settings";
export const PROFILE = "/settings/profile";
export const SCHEDULE = "/settings/schedule";

// ---------- NAVIGATION ROUTES | Home ----------

export const primaryRoutes = [
  { name: "Home", href: HOME, icon: HomeIcon, current: true },
  { name: "History", href: "#", icon: ClockIcon, current: false },
];

export const secondaryNavigation = [
  { name: "Settings", href: SETTINGS, icon: CogIcon },
];

// ---------- NAVIGATION ROUTES | Settings ----------

export const settingsNavigation = [
  {
    name: "Perfil",
    href: PROFILE,
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: "Horarios",
    href: SCHEDULE,
    icon: ClockIcon,
    current: false,
  },
];
