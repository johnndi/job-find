import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export const getoneemployer = async (req, res) => {
  const id = req.params.id;
  try {
    const getEmployer = await prisma.employer.findFirst({
      where: { id: id },
    
    });
    res.status(200).json(getEmployer);
  } catch (err) {
    res.status(500).json({ message:err.message });
  }
};

export const postsemployer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password

    } = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    const newEmployer = await prisma.employer.create({
      data: {
      fullName,
      email,
      phone,
      password:hashedPassword
      },
    });
    res.status(201).json({success:true, message:"create successful"});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

export const deletesemployer = async (req, res) => {
  const id = req.params.id;
  try {
    const delEmployer = await prisma.employer.delete({
      where: { id: id},
    });
    res.status(200).json({ delEmployer, message: "delete successful" });
  } catch (err) {
    res.status(500).json({ message: "could'nt delete server error" });
  }
};