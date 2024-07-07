import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export const user = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employerLogin = await prisma.employer.findFirst({
      where: { email: email },
    });
    const seekerLogin = await prisma.seeker.findFirst({
      where: { email: email },
    });

    if (employerLogin) {
      const matchedPassword = bcrypt.compareSync(password, employerLogin.password);
      if (matchedPassword) {
        const token =jwt.sign(employerLogin,process.env.JWT_SECRET,{expiresIn :"20m"})
        res.cookie("acess_token",token)
        return res.json({ success: true, message: "Login successful as " });
      } else {
        return res.json({ success: false, message: "Wrong login credentials" });
      }
    }

    if (seekerLogin) {
      const passwordMatch = bcrypt.compareSync(password, seekerLogin.password);
      if (passwordMatch) {
        return res.json({ success: true, message: "Login successful as job seeker" });
      } else {
        return res.json({ success: false, message: "Wrong login credentials" });
      }
    }

    return res.json({ success: false, message: "Wrong login credentials" });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


