import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getall = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getone = async (req, res) => {
  const field = req.params.field;
  try {
    const getJobs = await prisma.job.findFirst({
      where: { field: field },
    });
    res.status(200).json({success:true, getJobs});
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};
export const getones = async (req, res) => {
  const jobType = req.params.jobType;
  try {
    const getJobt = await prisma.job.findFirst({
      where: { jobType: jobType },
    });
    res.status(200).json({success:true, getJobt});
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};
export const posts = async (req, res) => {
  try {
    // const employer=req.employer
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      field,
      salary,
      jobDescription

    } = req.body;
// const employerId= employer.id
    const newJob = await prisma.job.create({
      data: {
        jobTitle:jobTitle,
        companyName:companyName,
        location:location,
        jobType:jobType,
        field:field,
        salary:salary,
        jobDescription:jobDescription,
        employerId:employerId
      },
    });
    res.status(201).json({success:true, message:"created" });
  } catch (error) {
    res.status(500).json({success:false, message: "error in the server" });
  }
};

export const updates = async (req, res) => {
  const id = req.params.id;
  try {
    const {
        jobTitle,
        companyName,
        location,
        jobType,
        field,
        salary,
        jobDescription
    } = req.body;

    const updateJob = await prisma.job.update({
      where: { id: id },
      data: {
        jobTitle,
        companyName,
        location,
        jobType,
        field,
        salary,
        jobDescription
      },
    });
    res.status(200).json(updateJob);
  } catch (error) {
    res.status(500).json({ message: "error in the server" });
  }
};

export const deletes = async (req, res) => {
  const id = req.params.id;
  try {
    const delJob = await prisma.job.delete({
      where: { id: id },
    });
    res.status(200).json({ delJob, message: "delete successful" });
  } catch (err) {
    res.status(500).json({ message: "could'nt delete server error" });
  }
};