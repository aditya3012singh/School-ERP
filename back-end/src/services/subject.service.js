import prisma from "../config/prisma.js";

export const getAllSubjectsService = async () => {
  return prisma.subject.findMany({
    select: {
      id: true,
      name: true,
      class: true,
    },
    orderBy: [
      { class: "asc" },
      { name: "asc" },
    ],
  });
};
