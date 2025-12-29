import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Job title is required"),
    summary: z.string().optional(),
    photo: z.string().optional(),
  }),

  // NEW: The Experience Array
  experience: z
    .array(
      z.object({
        role: z.string().min(2, "Role is required"),
        company: z.string().min(2, "Company is required"),
        // We allow strings for dates to keep it simple for now
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(), // It's optional because a student might not have experience

  education: z
    .array(
      z.object({
        school: z.string().min(2, "School/University is required"),
        degree: z.string().min(2, "Degree is required"), // e.g., BSc
        date: z.string().optional(), // e.g., "2023"
      })
    )
    .optional(),

  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .optional(),
});
