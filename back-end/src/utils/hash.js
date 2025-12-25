import bcrypt from "bcrypt";

export const hashedPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}