import prisma from "../config/prisma.js";

/**
 * Get teacher profile
 */
export const getTeacherProfileService = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  return teacher;
};

/**
 * Get classes assigned to teacher (from timetable)
 */
export const getTeacherClassesService = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  const classes = await prisma.timetable.findMany({
    where: {
      teacherId: teacher.id,
    },
    select: {
      class: true,
      section: true,
      subject: {
        select: { name: true },
      },
    },
    distinct: ["class", "section", "subjectId"],
  });

  return classes;
};

/**
 * Get attendance summary for a class (teacher view)
 */
export const getTeacherClassAttendanceSummaryService = async (
  userId,
  className,
  section
) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  // Find students in class
  const students = await prisma.student.findMany({
    where: {
      class: className,
      section,
    },
    select: { id: true, name: true },
  });

  const studentIds = students.map((s) => s.id);

  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: { in: studentIds },
    },
  });

  const summary = students.map((student) => {
    const records = attendance.filter(
      (a) => a.studentId === student.id
    );

    const total = records.length;
    const present = records.filter(
      (r) => r.status === "PRESENT"
    ).length;

    return {
      studentId: student.id,
      studentName: student.name,
      totalClasses: total,
      present,
      percentage: total
        ? ((present / total) * 100).toFixed(2)
        : "0.00",
    };
  });

  return {
    class: className,
    section,
    summary,
  };
};

/**
 * Get today's classes for teacher
 */
export const getTeacherTodayClassesService = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  return prisma.timetable.findMany({
    where: {
      teacherId: teacher.id,
      day: today,
    },
    include: {
      subject: { select: { name: true } },
    },
    orderBy: { startTime: "asc" },
  });
};

export const getAllTeacherService = async ()=>{
  return prisma.teacher.findMany({
    select:{
      id:true,
      name:true,
      subject:true,
      user:{
        select:{
          email:true,
        }
      }
    }
  })
}


/**
 * Teacher Dashboard Service
 */
export const getTeacherDashboardService = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    select: {
      id: true,
      name: true,
      subject: true,
    },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  // Get today's day
  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  // Fetch assigned classes
  const assignedClasses = await prisma.timetable.findMany({
    where: { teacherId: teacher.id },
    select: {
      class: true,
      section: true,
    },
    distinct: ["class", "section"],
  });

  // Students taught by teacher
  const students = await prisma.student.findMany({
    where: {
      OR: assignedClasses.map((c) => ({
        class: c.class,
        section: c.section,
      })),
    },
    select: { id: true },
  });

  const studentIds = students.map((s) => s.id);

  // Attendance stats
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: { in: studentIds },
    },
  });

  const totalClasses = attendance.length;
  const present = attendance.filter(
    (a) => a.status === "PRESENT"
  ).length;

  // Today's classes
  const todayClasses = await prisma.timetable.findMany({
    where: {
      teacherId: teacher.id,
      day: today,
    },
    include: {
      subject: { select: { name: true } },
    },
    orderBy: { startTime: "asc" },
  });

  return {
    teacher,
    stats: {
      totalAssignedClasses: assignedClasses.length,
      totalStudents: students.length,
      totalAttendanceRecords: totalClasses,
      presentPercentage: totalClasses
        ? ((present / totalClasses) * 100).toFixed(2)
        : "0.00",
    },
    todayClasses,
  };
};
