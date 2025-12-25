import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/* ======================
   HELPER
====================== */
async function createUserIfNotExists({ email, password, role }) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`⚠️ ${role} already exists: ${email}`);
    return existing;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  console.log(`✅ ${role} created: ${email}`);
  return user;
}

async function main() {
  /* ======================
     1️⃣ ADMIN
  ====================== */
  await createUserIfNotExists({
    email: "admin@school.com",
    password: "admin123",
    role: Role.ADMIN,
  });

  /* ======================
     2️⃣ TEACHER
  ====================== */
  const teacherUser = await createUserIfNotExists({
    email: "teacher@school.com",
    password: "teacher123",
    role: Role.TEACHER,
  });

  let teacher = await prisma.teacher.findUnique({
    where: { userId: teacherUser.id },
  });

  if (!teacher) {
    teacher = await prisma.teacher.create({
      data: {
        name: "Amit Sharma",
        subject: "Mathematics",
        userId: teacherUser.id,
      },
    });
    console.log("✅ Teacher profile created");
  }

  /* ======================
     3️⃣ STUDENT
  ====================== */
  const studentUser = await createUserIfNotExists({
    email: "student@school.com",
    password: "student123",
    role: Role.STUDENT,
  });

  let student = await prisma.student.findUnique({
    where: { userId: studentUser.id },
  });

  if (!student) {
    student = await prisma.student.create({
      data: {
        name: "Rahul Verma",
        rollNo: "23",
        class: "10",
        section: "A",
        dob: new Date("2009-05-12"),
        address: "Lucknow, UP",
        userId: studentUser.id,
      },
    });
    console.log("✅ Student profile created");
  }

  /* ======================
     4️⃣ PARENT
  ====================== */
  const parentUser = await createUserIfNotExists({
    email: "parent@school.com",
    password: "parent123",
    role: Role.PARENT,
  });

  const existingParent = await prisma.parent.findUnique({
    where: { userId: parentUser.id },
  });

  if (!existingParent) {
    await prisma.parent.create({
      data: {
        name: "Suresh Verma",
        relation: "Father",
        contact: "9876543210",
        userId: parentUser.id,
        studentId: student.id,
      },
    });
    console.log("✅ Parent profile created");
  }

  /* ======================
     5️⃣ SUBJECTS
  ====================== */
  const subjects = ["Mathematics", "Science", "English"];

  for (const name of subjects) {
    const exists = await prisma.subject.findFirst({
      where: { name, class: "10" },
    });

    if (!exists) {
      await prisma.subject.create({
        data: {
          name,
          class: "10",
        },
      });
      console.log(`✅ Subject created: ${name}`);
    }
  }

  const mathSubject = await prisma.subject.findFirst({
    where: { name: "Mathematics", class: "10" },
  });

  /* ======================
     6️⃣ TIMETABLE
  ====================== */
  const existingSlot = await prisma.timetable.findFirst({
    where: {
      class: "10",
      section: "A",
      day: "Monday",
      startTime: "09:00",
    },
  });

  if (!existingSlot) {
    await prisma.timetable.create({
      data: {
        class: "10",
        section: "A",
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
        subjectId: mathSubject.id,
        teacherId: teacher.id,
      },
    });
    console.log("✅ Timetable slot created");
  }

  /* ======================
     7️⃣ PTM
  ====================== */
  const existingPTM = await prisma.ptm.findFirst({
    where: {
      studentId: student.id,
      teacherId: teacher.id,
    },
  });

  if (!existingPTM) {
    await prisma.ptm.create({
      data: {
        studentId: student.id,
        teacherId: teacher.id,
        date: new Date("2025-02-10"),
        time: "10:30 AM",
        status: "SCHEDULED",
      },
    });
    console.log("✅ Demo PTM created");
  }

  console.log("🎉 FULL DATABASE SEED COMPLETED");
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
