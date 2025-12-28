import prisma from "../config/prisma.js";
import { PTM_STATUS } from "../utils/constants.js";

/**
 * Create PTM (Admin / Teacher)
 */
export const createPTMService = async ({
  studentId,
  teacherId,
  date,
  time,
}) => {
  // Validate student
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate teacher
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  // Create PTM
  const ptm = await prisma.ptm.create({
    data: {
      studentId,
      teacherId,
      date: new Date(date),
      time,
      status: PTM_STATUS.SCHEDULED,
    },
  });

  return ptm;
};

/**
 * Get PTMs for Student
 */
export const getStudentPTMService = async (userId) => {
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ptm.findMany({
    where: { studentId: student.id },
    include: {
      teacher: { select: { name: true } },
    },
    orderBy: { date: "desc" },
  });
};

/**
 * Get PTMs for Parent
 */
export const getParentPTMService = async (userId) => {
  const parent = await prisma.parent.findUnique({
    where: { userId },
    include: { student: true },
  });

  if (!parent || !parent.student) {
    const err = new Error("Parent or student not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ptm.findMany({
    where: { studentId: parent.student.id },
    include: {
      teacher: { select: { name: true } },
    },
    orderBy: { date: "desc" },
  });
};

/**
 * Get PTMs for Teacher
 */
export const getTeacherPTMService = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ptm.findMany({
    where: { teacherId: teacher.id },
    include: {
      student: {
        select: { name: true, class: true, section: true },
      },
    },
    orderBy: { date: "desc" },
  });
};

export const getAllPtmService = async () => {
  return prisma.ptm.findMany({
    include: {
      teacher: {
        select:{name:true}
      }
    }
  });
}