import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../config/jwt.js";
import { HTTP_STATUS } from "../utils/constants.js";


export const loginService= async (email, password) => {

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    
    if(!user){
        const error= new Error("Invalid email or password");
        error.statuscode= 401;
        throw error;
    }

    const isPasswordValid= await comparePassword(password, user.password);

    if(!isPasswordValid){
        const error= new Error("Invalid email or password");
        error.statuscode= 401;
        throw error;
    }

    const token=generateToken({
        id: user.id,
        role: user.role,
    });

    

    return {
        token,
        user:{
            id: user.id,
            email: user.email,
            role: user.role,
        }
    }
}


export const acceptParentInviteService = async (token, password) => {
  const invite = await prisma.parentInvite.findUnique({ where: { token } });

  if (!invite || invite.used || invite.expiresAt < new Date()) {
    throw new Error("Invalid or expired invite");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: invite.email,
      password: hashed,
      role: "PARENT",
    },
  });

  await prisma.parent.create({
    data: {
      name: "Parent",
      relation: "Guardian",
      contact: "",
      userId: user.id,
      studentId: invite.studentId,
    },
  });

  await prisma.parentInvite.update({
    where: { token },
    data: { used: true },
  });
};


export const forgotPasswordService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const token = crypto.randomUUID();

  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(email, "Reset Password", `<a href="${link}">Reset</a>`);
};

export const resetPasswordService = async (token, password) => {
  const reset = await prisma.passwordReset.findUnique({ where: { token } });

  if (!reset || reset.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: reset.userId },
    data: { password: hashed },
  });

  await prisma.passwordReset.delete({ where: { token } });
};
