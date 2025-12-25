import prisma from "../config/prisma.js";

/**
 * Get student profile (logged-in student)
 */
export const getStudentProfileService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      parents: {
        select: {
          id: true,
          name: true,
          relation: true,
          contact: true,
        },
      },
    },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return student;
};

/**
 * Get student's parents
 */
export const getStudentParentsService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      parents: true,
    },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return student.parents;
};

/**
 * Get student's PTMs
 */
export const getStudentPTMsService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ptm.findMany({
    where: {
      studentId: student.id,
    },
    include: {
      teacher: {
        select: {
          name: true,
          subject: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });
};

/**
 * Get student's timetable
 * (Alternative to timetable.service.js, optional)
 */
export const getStudentTimetableService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.timetable.findMany({
    where: {
      class: student.class,
      section: student.section,
    },
    include: {
      subject: {
        select: { name: true },
      },
      teacher: {
        select: { name: true },
      },
    },
    orderBy: [
      { day: "asc" },
      { startTime: "asc" },
    ],
  });
};
