// lib/routes.js

// ---------- AUTH ROUTES ----------
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
};

// ---------- DASHBOARD ROOT ----------
export const DASHBOARD_ROOT = "/dashboard";

// ---------- ROLE-BASED DASHBOARD ROUTES ----------
export const DASHBOARD_ROUTES = {
  ADMIN: {
    HOME: "/dashboard/admin",
    TEACHERS: "/dashboard/admin/teachers",
    STUDENTS: "/dashboard/admin/students",
    ATTENDANCE: "/dashboard/admin/attendance",
    TIMETABLE: "/dashboard/admin/timetable",
    PTM: "/dashboard/admin/ptm",
  },

  TEACHER: {
    HOME: "/dashboard/teacher",
    ATTENDANCE: "/dashboard/teacher/attendance",
    TIMETABLE: "/dashboard/teacher/timetable",
    PTM: "/dashboard/teacher/ptm",
  },

  STUDENT: {
    HOME: "/dashboard/student",
    ATTENDANCE: "/dashboard/student/attendance",
    TIMETABLE: "/dashboard/student/timetable",
    PROFILE: "/dashboard/student/profile",
  },

  PARENT: {
    HOME: "/dashboard/parent",
    CHILDREN: "/dashboard/parent/children",
    ATTENDANCE: "/dashboard/parent/attendance",
    PTM: "/dashboard/parent/ptm",
  },
};

// ---------- PUBLIC ROUTES ----------
export const PUBLIC_ROUTES = [
  "/",
  AUTH_ROUTES.LOGIN,
  AUTH_ROUTES.REGISTER,
  AUTH_ROUTES.FORGOT_PASSWORD,
];

// ---------- ROLE → DASHBOARD MAPPING ----------
export const ROLE_REDIRECT = {
  ADMIN: DASHBOARD_ROUTES.ADMIN.HOME,
  TEACHER: DASHBOARD_ROUTES.TEACHER.HOME,
  STUDENT: DASHBOARD_ROUTES.STUDENT.HOME,
  PARENT: DASHBOARD_ROUTES.PARENT.HOME,
};



// ✅ How to Use This (IMPORTANT)
// 🔁 Redirect after login
// import { ROLE_REDIRECT } from "@/lib/routes";

// router.replace(ROLE_REDIRECT[user.role]);



// 🔗 Sidebar Links
// import { DASHBOARD_ROUTES } from "@/lib/routes";

// <Link href={DASHBOARD_ROUTES.ADMIN.TEACHERS}>
//   Manage Teachers
// </Link>