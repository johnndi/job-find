import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export const getoneemployee = async (req, res) => {
  const id = req.params.id;
  try {
    const getEmployee = await prisma.seeker.findFirst({
      where: { id: id },
    });
    res.status(200).json(getEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const postsemployee = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newEmployee = await prisma.seeker.create({
      data: {
        fullName: fullName,
        email: email,
        phone: phone,
        password: hashedPassword,
      },
    });
    res.status(201).json({ success: true, message: "employee created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletesemployee = async (req, res) => {
  const id = req.params.id;
  try {
    const delEmployee = await prisma.seeker.delete({
      where: { id: id },
    });
    res.status(200).json({ delEmployee, message: "delete successful" });
  } catch (err) {
    res.status(500).json({ message: "could'nt delete server error" });
  }
};
