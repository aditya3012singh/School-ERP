import prisma from "../config/prisma.js";

/**
 * Get parent profile with linked student basic info
 */
export const getParentProfileService = async (userId) => {
  const parent = await prisma.parent.findUnique({
    where: { userId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          class: true,
          section: true,
          rollNo: true,
        },
      },
    },
  });

  if (!parent) {
    const err = new Error("Parent not found");
    err.statusCode = 404;
    throw err;
  }

  return parent;
};

/**
 * Get child attendance (parent view)
 */
export const getParentChildAttendanceService = async (userId) => {
  const parent = await prisma.parent.findUnique({
    where: { userId },
    include: { student: true },
  });

  if (!parent || !parent.student) {
    const err = new Error("Student not linked to parent");
    err.statusCode = 404;
    throw err;
  }

  return prisma.attendance.findMany({
    where: {
      studentId: parent.student.id,
    },
    include: {
      subject: {
        select: { name: true },
      },
    },
    orderBy: { date: "desc" },
  });
};

/**
 * Get child timetable (parent view)
 */
export const getParentChildTimetableService = async (userId) => {
  const parent = await prisma.parent.findUnique({
    where: { userId },
    include: { student: true },
  });

  if (!parent || !parent.student) {
    const err = new Error("Student not linked to parent");
    err.statusCode = 404;
    throw err;
  }

  return prisma.timetable.findMany({
    where: {
      class: parent.student.class,
      section: parent.student.section,
    },
    include: {
      subject: { select: { name: true } },
      teacher: { select: { name: true } },
    },
    orderBy: [
      { day: "asc" },
      { startTime: "asc" },
    ],
  });
};

/**
 * Get child PTMs (parent view)
 */
export const getParentChildPTMsService = async (userId) => {
  const parent = await prisma.parent.findUnique({
    where: { userId },
    include: { student: true },
  });

  if (!parent || !parent.student) {
    const err = new Error("Student not linked to parent");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ptm.findMany({
    where: {
      studentId: parent.student.id,
    },
    include: {
      teacher: {
        select: { name: true, subject: true },
      },
    },
    orderBy: { date: "desc" },
  });
};

export const updateParentProfileService = async (userId, data) => {
  return prisma.parent.update({
    where: { userId },
    data: {
      name: data.name,
      contact: data.contact,
    },
  });
};

export const getAllParentService = async () =>{
  return prisma.parent.findMany({
    select:{
      id:true,
      name:true,
      contact:true,
      student:true,
      relation:true
    }
  })
}