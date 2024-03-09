import { Permission } from "@prisma/client";

export type Route = {
  label: string,
  path: string,
  permissions: Permission[]
}

export type Routes = Record<string, Route>;

export const routes: Routes = {
  // General Routes
  ROOT: {
    label: "Welcome",
    path: "/",
    permissions: [],
  },
  LOGIN: {
    label: "Login",
    path: "/login",
    permissions: [],
  },
  LOGOUT: {
    label: "Logout",
    path: "/logout",
    permissions: [],
  },
  PASSWORD_RESET: {
    label: "Password Reset",
    path: "/password-reset",
    permissions: [],
  },
  // User Routes
  ANNOUNCEMENTS: {
    label: "Announcements",
    path: "/announcements",
    permissions: [Permission.ANNOUNCEMENTS_READ, Permission.ANNOUNCEMENTS_MANAGE],
  },
  ATTENDANCE: {
    label: "Attendance",
    path: "/attendance",
    permissions: [Permission.ATTENDANCE_READ, Permission.ATTENDANCE_MANAGE],
  },
  EVENTS: {
    label: "Events",
    path: "/events",
    permissions: [Permission.EVENT_READ, Permission.EVENT_MANAGE],
  },
  EVENTS_CREATE: {
    label: "Create Event",
    path: "/events/create",
    permissions: [Permission.EVENT_MANAGE],
  },
  MEMBERS: {
    label: "Members",
    path: "/members",
    permissions: [Permission.MEMBER_READ, Permission.MEMBER_MANAGE],
  },
  MEMBERS_CREATE: {
    label: "Create Member",
    path: "/members/create",
    permissions: [Permission.MEMBER_MANAGE],
  },
  TEAMS: {
    label: "Teams",
    path: "/teams",
    permissions: [Permission.TEAM_READ, Permission.TEAM_MANAGE],
  },
  TEAMS_CREATE: {
    label: "Create Team",
    path: "/teams/create",
    permissions: [Permission.TEAM_MANAGE],
  },
  STATS: {
    label: "Stats",
    path: "/stats",
    permissions: [Permission.STATS_READ, Permission.STATS_MANAGE],
  },
  // Admin routes
  ASSESSMENTS: {
    label: "Assessments",
    path: "/assessments",
    permissions: [Permission.ASSESSMENT_READ, Permission.ASSESSMENT_MANAGE],
  },
  ASSESSMENTS_CREATE: {
    label: "Create Assessment",
    path: "/assessments/create",
    permissions: [Permission.ASSESSMENT_MANAGE],
  },
  GROUPS: {
    label: "Groups",
    path: "/groups",
    permissions: [Permission.GROUP_READ, Permission.GROUP_MANAGE],
  },
  GROUPS_CREATE: {
    label: "Create Group",
    path: "/groups/create",
    permissions: [Permission.GROUP_MANAGE],
  },
  SETTINGS: {
    label: "Settings",
    path: "/settings",
    permissions: [Permission.SETTING_READ, Permission.SETTING_MANAGE],
  },
};

export const navigationRoutes: Route[] = [
  routes.ATTENDANCE,
  routes.EVENTS,
  routes.MEMBERS,
  routes.TEAMS,
  routes.STATS,
];

export const adminRoutes: Route[] = [
  routes.ASSESSMENTS,
  routes.GROUPS,
  routes.SETTINGS,
];

export const filterRoutes = (permissions: Permission[], routeList: Route[]) =>
  routeList.filter(r => r.permissions.length === 0 || r.permissions.find(p => permissions.includes(p)));