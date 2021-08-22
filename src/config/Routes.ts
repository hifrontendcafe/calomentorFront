import { ClockIcon, CogIcon, HomeIcon } from "@heroicons/react/outline";

// ---------- ROUTE CONSTANTS ----------

export const LOGIN = "/";
export const HOME = "/home";
export const UNAUTHORIZED = "/unauthorized";
export const SETTINGS = "/settings";

// ---------- NAVIGATION ROUTES ----------

export const primaryRoutes = [
  { name: "Home", href: HOME, icon: HomeIcon, current: true },
  { name: "History", href: "#", icon: ClockIcon, current: false },
];

export const secondaryNavigation = [
  { name: "Settings", href: SETTINGS, icon: CogIcon },
];
