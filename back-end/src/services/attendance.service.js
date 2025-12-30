import prisma from "../config/prisma.js";
import { ATTENDANCE_STATUS } from "../utils/constants.js"; 

export const markAttendanceService = async ({
  teacherId,
  subjectId,
  date,
  records,
}) => {
  // Optional: verify subject exists
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
  });

  if (!subject) {
    const err = new Error("Subject not found");
    err.statusCode = 404;
    throw err;
  }

  const attendanceDate = new Date(date);
  
  // Mark attendance in transaction
  const result = await prisma.$transaction(
    records.map((record) =>
      prisma.attendance.upsert({
        where: {
          studentId_subjectId_date: {
            studentId: record.studentId,
            subjectId,
            date: attendanceDate,
          },
        },
        update: {
          status: record.status,
        },
        create: {
          studentId: record.studentId,
          subjectId,
          date: attendanceDate,
          status: record.status || ATTENDANCE_STATUS.PRESENT,
        },
      })
    )
  );

  return {
    date: attendanceDate,
    subjectId,
    total: result.length,
  };
};


export const getStudentAttendanceService = async (userId, subjectId) => {
  // 1. Find student by userId
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  // 2. Build filter
  const whereClause = {
    studentId: student.id,
    ...(subjectId && { subjectId }),
  };

  // 3. Fetch attendance
  const attendance = await prisma.attendance.findMany({
    where: whereClause,
    include: {
      subject: {
        select: { name: true },
      },
    },
    orderBy: { date: "desc" },
  });

  // 4. Calculate summary
  const summary = {};

  for (const record of attendance) {
    const subjectName = record.subject.name;

    if (!summary[subjectName]) {
      summary[subjectName] = {
        total: 0,
        present: 0,
        percentage: 0,
      };
    }

    summary[subjectName].total += 1;
    if (record.status === "PRESENT") {
      summary[subjectName].present += 1;
    }
  }

  // 5. Calculate percentage
  Object.keys(summary).forEach((sub) => {
    summary[sub].percentage =
      ((summary[sub].present / summary[sub].total) * 100).toFixed(2);
  });

  return {
    records: attendance,
    summary,
  };
};

export const getParentStudentAttendanceService = async (
  parentUserId,
  subjectId
) => {
  // 1. Find parent
  const parent = await prisma.parent.findUnique({
    where: { userId: parentUserId },
    include: {
      student: true,
    },
  });

  if (!parent || !parent.student) {
    const err = new Error("Parent or linked student not found");
    err.statusCode = 404;
    throw err;
  }

  const studentId = parent.student.id;

  // 2. Build filter
  const whereClause = {
    studentId,
    ...(subjectId && { subjectId }),
  };

  // 3. Fetch attendance
  const attendance = await prisma.attendance.findMany({
    where: whereClause,
    include: {
      subject: {
        select: { name: true },
      },
    },
    orderBy: { date: "desc" },
  });

  // 4. Calculate summary
  const summary = {};

  for (const record of attendance) {
    const subjectName = record.subject.name;

    if (!summary[subjectName]) {
      summary[subjectName] = {
        total: 0,
        present: 0,
        percentage: 0,
      };
    }

    summary[subjectName].total += 1;
    if (record.status === "PRESENT") {
      summary[subjectName].present += 1;
    }
  }

  // 5. Calculate percentage
  Object.keys(summary).forEach((sub) => {
    summary[sub].percentage =
      ((summary[sub].present / summary[sub].total) * 100).toFixed(2);
  });

  return {
    student: {
      id: parent.student.id,
      name: parent.student.name,
      class: parent.student.class,
      section: parent.student.section,
    },
    records: attendance,
    summary,
  };
};