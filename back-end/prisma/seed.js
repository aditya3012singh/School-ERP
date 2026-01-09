import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/* ======================
   HELPER FUNCTIONS
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

// Subject configuration for each class
const getSubjectsForClass = (classNum) => {
  const baseSubjects = ["Mathematics", "English", "Hindi"];
  
  if (classNum <= 5) {
    return [...baseSubjects, "Social Science" , "Sanskrit", "Science"];
  } else if (classNum <= 8) {
    return [...baseSubjects, "History & Civics", "Geography", "Sanskrit", "Science"];
  } else if (classNum <= 10) {
    return [...baseSubjects, "History & Civics", "Geography", "Physics", "Chemistry", "Biology"];
  }
  return baseSubjects;
};

// Student names pool
const studentNames = [
  "Rahul Sharma", "Priya Singh", "Amit Kumar", "Anjali Verma", "Rohan Gupta",
  "Sneha Patel", "Vikram Rao", "Pooja Reddy", "Arjun Nair", "Kavya Desai",
  "Aditya Mehta", "Divya Joshi", "Karan Shah", "Riya Malhotra", "Varun Kapoor",
  "Neha Agarwal", "Siddharth Pillai", "Tanvi Kulkarni", "Aryan Choudhary", "Ishita Bhat",
  "Harsh Pandey", "Sakshi Iyer", "Nikhil Mishra", "Aditi Saxena", "Yash Trivedi",
  "Shreya Bansal", "Aarav Sinha", "Diya Ghosh", "Rohan Khanna", "Meera Dubey",
  "Kunal Thakur", "Ananya Sen", "Vivek Yadav", "Radhika Bhatt", "Arnav Jain",
  "Nisha Soni", "Gaurav Rathi", "Simran Kaur", "Mohit Tiwari", "Kriti Goyal",
  "Devesh Chauhan", "Pallavi Nambiar", "Sanjay Menon", "Vidya Hegde", "Akash Saini",
  "Ritu Bajaj", "Pranav Sethi", "Lakshmi Murthy", "Manish Rawal", "Bhavna Arora"
];

// Teacher data - Subject teachers who will also be class teachers
const teachersData = [
  { name: "Amit Sharma", subject: "Mathematics", classTeacherFor: "9" },
  { name: "Sunita Rao", subject: "English", classTeacherFor: "1" },
  { name: "Rajesh Kumar", subject: "Hindi", classTeacherFor: "2" },
  { name: "Priya Verma", subject: "History & Civics", classTeacherFor: "7" },
  { name: "Manoj Singh", subject: "Geography", classTeacherFor: "8" },
  { name: "Kavita Desai", subject: "Sanskrit", classTeacherFor: "3" },
  { name: "Ravi Patel", subject: "Science", classTeacherFor: "5" },
  { name: "Deepak Gupta", subject: "Physics", classTeacherFor: "10" },
  { name: "Anjali Reddy", subject: "Chemistry", classTeacherFor: "6" },
  { name: "Vikram Nair", subject: "Biology", classTeacherFor: "4" },
  { name: "Neha Joshi", subject: "Social Science", classTeacherFor: null },
  { name: "Arun Mehta", subject: "Mathematics", classTeacherFor: null },
  { name: "Pooja Shah", subject: "English", classTeacherFor: null },
  { name: "Suresh Pillai", subject: "Hindi", classTeacherFor: null },
  { name: "Rekha Malhotra", subject: "Science", classTeacherFor: null },
  { name: "Vinod Kapoor", subject: "Physics", classTeacherFor: null },
  { name: "Seema Agarwal", subject: "Chemistry", classTeacherFor: null },
  { name: "Ramesh Choudhary", subject: "Biology", classTeacherFor: null },
  { name: "Sonal Bhat", subject: "Geography", classTeacherFor: null },
  { name: "Harish Pandey", subject: "Sanskrit", classTeacherFor: null },
];

async function main() {
  console.log("🌱 Starting database seed...\n");

  /* ======================
     1️⃣ ADMIN
  ====================== */
  await createUserIfNotExists({
    email: "admin@school.com",
    password: "admin123",
    role: Role.ADMIN,
  });

  /* ======================
     2️⃣ SUBJECTS
  ====================== */
  console.log("\n📚 Creating subjects...");
  const subjectData = [];
  
  for (let classNum = 1; classNum <= 10; classNum++) {
    const subjects = getSubjectsForClass(classNum);
    subjects.forEach((subject) => {
      subjectData.push({ name: subject, class: classNum.toString() });
    });
  }

  await prisma.subject.createMany({
    data: subjectData,
    skipDuplicates: true,
  });
  console.log("✅ Subjects created for classes 1-10");

  /* ======================
     3️⃣ TEACHERS
  ====================== */
  console.log("\n👨‍🏫 Creating teachers...");
  const createdTeachers = {};

  for (const teacherData of teachersData) {
    const teacherUser = await createUserIfNotExists({
      email: `${teacherData.name.toLowerCase().replace(/\s+/g, ".")}@school.com`,
      password: "teacher123",
      role: Role.TEACHER,
    });

    let teacher = await prisma.teacher.findUnique({
      where: { userId: teacherUser.id },
    });

    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: {
          name: teacherData.name,
          subject: teacherData.subject,
          classTeacherFor: teacherData.classTeacherFor,
          userId: teacherUser.id,
        },
      });
      const classInfo = teacherData.classTeacherFor 
        ? ` - Class Teacher of ${teacherData.classTeacherFor}` 
        : '';
      console.log(`✅ Teacher created: ${teacherData.name} (${teacherData.subject})${classInfo}`);
    }

    // Store teacher by subject and also by class if they're a class teacher
    if (!createdTeachers[teacherData.subject]) {
      createdTeachers[teacherData.subject] = teacher;
    }
    if (teacherData.classTeacherFor) {
      createdTeachers[`classTeacher${teacherData.classTeacherFor}`] = teacher;
    }
  }

  /* ======================
     4️⃣ STUDENTS & PARENTS
  ====================== */
  console.log("\n👨‍🎓 Creating students and parents...");
  const createdStudents = [];
  let nameIndex = 0;

  for (let classNum = 1; classNum <= 10; classNum++) {
    for (let studentNum = 1; studentNum <= 5; studentNum++) {
      const studentName = studentNames[nameIndex % studentNames.length];
      const rollNo = `${classNum}${studentNum.toString().padStart(2, "0")}`;
      
      // Create student user
      const studentUser = await createUserIfNotExists({
        email: `${studentName.toLowerCase().replace(/\s+/g, ".")}.${rollNo}@school.com`,
        password: "student123",
        role: Role.STUDENT,
      });

      let student = await prisma.student.findUnique({
        where: { userId: studentUser.id },
      });

      if (!student) {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - (5 + classNum); // Age = 5 + class number
        
        student = await prisma.student.create({
          data: {
            name: studentName,
            rollNo: rollNo,
            class: classNum.toString(),
            section: "A",
            dob: new Date(`${birthYear}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`),
            address: `${Math.floor(Math.random() * 500) + 1}, Sector ${Math.floor(Math.random() * 50) + 1}, Delhi`,
            userId: studentUser.id,
          },
        });
        console.log(`✅ Student created: ${studentName} (Class ${classNum})`);
        createdStudents.push(student);

        // Create parent for each student
        const parentName = `Parent of ${studentName}`;
        const parentUser = await createUserIfNotExists({
          email: `parent.${studentName.toLowerCase().replace(/\s+/g, ".")}.${rollNo}@school.com`,
          password: "parent123",
          role: Role.PARENT,
        });

        const existingParent = await prisma.parent.findUnique({
          where: { userId: parentUser.id },
        });

        if (!existingParent) {
          await prisma.parent.create({
            data: {
              name: parentName,
              relation: studentNum % 2 === 0 ? "Father" : "Mother",
              contact: `98765${(43210 + nameIndex).toString().padStart(5, "0")}`,
              userId: parentUser.id,
              studentId: student.id,
            },
          });
          console.log(`✅ Parent created: ${parentName}`);
        }
      } else {
        createdStudents.push(student);
      }

      nameIndex++;
    }
  }

  /* ======================
     5️⃣ TIMETABLE
  ====================== */
  console.log("\n📅 Creating timetable entries...");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    { start: "08:00", end: "09:00" },
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:30", end: "12:30" },
    { start: "12:30", end: "13:30" },
  ];

  let timetableCount = 0;
  for (let classNum = 1; classNum <= 10; classNum++) {
    const subjects = getSubjectsForClass(classNum);
    const classSubjects = await prisma.subject.findMany({
      where: {
        class: classNum.toString(),
        name: { in: subjects },
      },
    });

    for (const day of days) {
      for (let i = 0; i < Math.min(subjects.length, timeSlots.length); i++) {
        const subject = classSubjects[i % classSubjects.length];
        const teacher = createdTeachers[subject.name];
        
        if (teacher && subject) {
          const existingSlot = await prisma.timetable.findFirst({
            where: {
              class: classNum.toString(),
              section: "A",
              day: day,
              startTime: timeSlots[i].start,
            },
          });

          if (!existingSlot) {
            await prisma.timetable.create({
              data: {
                class: classNum.toString(),
                section: "A",
                day: day,
                startTime: timeSlots[i].start,
                endTime: timeSlots[i].end,
                subjectId: subject.id,
                teacherId: teacher.id,
              },
            });
            timetableCount++;
          }
        }
      }
    }
  }
  console.log(`✅ Created ${timetableCount} timetable entries`);

  /* ======================
     6️⃣ SAMPLE PTM
  ====================== */
  console.log("\n📆 Creating sample PTM meetings...");
  let ptmCount = 0;
  for (let i = 0; i < Math.min(10, createdStudents.length); i++) {
    const student = createdStudents[i];
    const classNum = parseInt(student.class);
    const subjects = getSubjectsForClass(classNum);
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const teacher = createdTeachers[randomSubject] || createdTeachers[subjects[0]];

    if (teacher) {
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
            date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
            time: `${10 + Math.floor(Math.random() * 4)}:${Math.random() > 0.5 ? "00" : "30"} AM`,
            status: "SCHEDULED",
          },
        });
        ptmCount++;
      }
    }
  }
  console.log(`✅ Created ${ptmCount} PTM meetings`);

  console.log("\n🎉 FULL DATABASE SEED COMPLETED!");
  console.log(`\n📊 Summary:`);
  console.log(`   - Classes: 1-10`);
  console.log(`   - Students: ${createdStudents.length} (5 per class)`);
  console.log(`   - Teachers: ${teachersData.length}`);
  console.log(`   - Subjects: ${subjectData.length}`);
  console.log(`   - Timetable entries: ${timetableCount}`);
  console.log(`   - PTM meetings: ${ptmCount}`);
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
