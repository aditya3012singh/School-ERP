import prisma from "../config/prisma.js";

/**
 * Create timetable entry (Admin only)
 */
export const createTimetableService = async ({
  className,
  section,
  day,
  startTime,
  endTime,
  subjectId,
  teacherId,
}) => {
  // Validate subject
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
  });

  if (!subject) {
    const err = new Error("Subject not found");
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

  // Optional: prevent same slot duplicate
  const existingSlot = await prisma.timetable.findFirst({
    where: {
      class: className,
      section,
      day,
      startTime,
      endTime,
    },
  });

  if (existingSlot) {
    const err = new Error("Timetable slot already exists");
    err.statusCode = 400;
    throw err;
  }

  // Create timetable entry
  const timetable = await prisma.timetable.create({
    data: {
      class: className,
      section,
      day,
      startTime,
      endTime,
      subjectId,
      teacherId,
    },
  });

  return timetable;
};


export const getStudentTimetableService = async (userId) => {
  // 1. Find student by userId
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  // 2. Fetch timetable for student's class & section
  const timetable = await prisma.timetable.findMany({
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

  // 3. Group by day
  const grouped = {};

  for (const slot of timetable) {
    if (!grouped[slot.day]) {
      grouped[slot.day] = [];
    }

    grouped[slot.day].push({
      startTime: slot.startTime,
      endTime: slot.endTime,
      subject: slot.subject.name,
      teacher: slot.teacher.name,
    });
  }

  return {
    class: student.class,
    section: student.section,
    timetable: grouped,
  };
};


export const getTeacherTimetableService = async (userId) => {
  // 1. Find teacher by userId
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
  });

  if (!teacher) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }

  // 2. Fetch timetable for this teacher
  const timetable = await prisma.timetable.findMany({
    where: {
      teacherId: teacher.id,
    },
    include: {
      subject: {
        select: { name: true },
      },
    },
    orderBy: [
      { day: "asc" },
      { startTime: "asc" },
    ],
  });

  // 3. Group by day
  const grouped = {};

  for (const slot of timetable) {
    if (!grouped[slot.day]) {
      grouped[slot.day] = [];
    }

    grouped[slot.day].push({
      class: slot.class,
      section: slot.section,
      startTime: slot.startTime,
      endTime: slot.endTime,
      subject: slot.subject.name,
    });
  }

  return {
    teacher: {
      id: teacher.id,
      name: teacher.name,
      subject: teacher.subject,
    },
    timetable: grouped,
  };
};