import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { isBefore } from "date-fns";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(201).json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

  // Validate dueDate is before startDate
  if (!isBefore(new Date(startDate), new Date(endDate))) {
    res.status(400).json({ message: "End date must be after the start date." });
    return;
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating projects: ${error.message}` });
  }
};
