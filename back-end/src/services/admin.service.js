import prisma from "../config/prisma.js";
import { ROLES } from "../utils/constants.js";
import { hashedPassword, hashedPassword } from "../utils/hash.js";
import crypto from "crypto";
import { sendEmail } from "../utils/mailer.js";
/**
 * Create Teacher (Admin only)
 */
export const createTeacherService = async ({
  name,
  email,
  password,
  subject,
}) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const err = new Error("User with this email already exists");
    err.statusCode = 400;
    throw err;
  }

  // Hash password
  const hashedPassword = await hashedPassword(password);

  // Create user + teacher in transaction
  const teacher = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: ROLES.TEACHER,
      },
    });

    return await tx.teacher.create({
      data: {
        name,
        subject,
        userId: user.id,
      },
    });
  });

  return {
    id: teacher.id,
    name: teacher.name,
    subject: teacher.subject,
  };
};



export const createStudentService = async ({
  name,
  email,
  password,
  rollNo,
  className,
  section,
  dob,
  address,
}) => {
  // Check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const err = new Error("User with this email already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await hashedPassword(password);

  const student = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: ROLES.STUDENT,
      },
    });

    return await tx.student.create({
      data: {
        name,
        rollNo,
        class: className,
        section,
        dob: new Date(dob),
        address,
        userId: user.id,
      },
    });
  });

  return {
    id: student.id,
    name: student.name,
    rollNo: student.rollNo,
    class: student.class,
    section: student.section,
  };
};



export const addParentToStudentService = async ({
  studentId,
  name,
  email,
  password,
  contact,
  relation,
}) => {
  // 1. Check student exists
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  // 2. Check parent user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const err = new Error("User with this email already exists");
    err.statusCode = 400;
    throw err;
  }

  // 3. Hash password
  const hashedPassword = await hashedPassword(password);

  // 4. Transaction: create user + parent
  const parent = await prisma.$transaction(async (tx) => {
    const user = await tx.user.creeate({
      data: {
        email,
        password: hashedPassword,
        role: ROLES.PARENT,
      },
    });

    return await tx.parent.create({
      data: {
        name,
        contact,
        relation,
        userId: user.id,
        studentId: student.id,
      },
    });
  });

  return {
    id: parent.id,
    name: parent.name,
    relation: parent.relation,
    contact: parent.contact,
  };
};


export const createAdminService = async ({ name, email, password }) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const err = new Error("User with this email already exists");
    err.statusCode = 400;
    throw err;
  }

  // Hash password
  const hashedPassword = await hashedPassword(password);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: ROLES.ADMIN,
    },
  });

  return {
    id: admin.id,
    email: admin.email,
    role: admin.role,
  };
};


export const getAdminDashboardStatsService = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalStudents,
    totalTeachers,
    totalParents,
    totalSubjects,
    totalAttendance,
    todayAttendance,
    upcomingPTMs,
    totalTimetableSlots,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.parent.count(),
    prisma.subject.count(),
    prisma.attendance.count(),
    prisma.attendance.count({
      where: { date: today },
    }),
    prisma.ptm.count({
      where: {
        date: {
          gte: today,
        },
      },
    }),
    prisma.timetable.count(),
  ]);

  return {
    users: {
      students: totalStudents,
      teachers: totalTeachers,
      parents: totalParents,
    },
    academics: {
      subjects: totalSubjects,
      timetableSlots: totalTimetableSlots,
    },
    attendance: {
      total: totalAttendance,
      today: todayAttendance,
    },
    ptm: {
      upcoming: upcomingPTMs,
    },
  };
};

export const inviteParentService = async (email, studentId) => {
  const token = crypto.randomUUID();

  await prisma.parentInvite.create({
    data: {
      email,
      token,
      studentId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const link = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

  await sendEmail(
    email,
    "Parent Invitation",
    `<p>You are invited as a parent.</p>
     <a href="${link}">Set Password</a>`
  );
};
