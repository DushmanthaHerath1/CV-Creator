import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Job title is required"),
    summary: z.string().optional(),
    photo: z.string().optional(),

    // --- 🧱 NEW BRICK 6 FIELDS ---
    // Location
    address: z.string().optional(),
    city: z.string().optional(),

    // Socials (Modern CV)
    linkedin: z.string().optional(),
    github: z.string().optional(),

    // Bio Details (Regional/SL Standard)
    dob: z.string().optional(),
    gender: z.string().optional(),
    nationality: z.string().optional(),
    maritalStatus: z.string().optional(),
    idNumber: z.string().optional(), // NIC or Passport
  }),
  // ... rest of the schema (experience, education, etc) remains the same
  experience: z
    .array(
      z.object({
        role: z.string().min(2, "Role required"),
        company: z.string().min(2, "Company required"),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School required"),
        degree: z.string().min(2, "Degree required"),
        date: z.string().optional(),
        description: z.string().optional(),
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

  certificates: z
    .array(
      z.object({
        name: z.string().min(2, "Certificate name required"),
        issuer: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  references: z
    .array(
      z.object({
        name: z.string().min(2, "Name required"),
        position: z.string().optional(), // New
        company: z.string().optional(),
        location: z.string().optional(), // New
        phone: z.string().optional(),
        email: z.string().email("Invalid email").or(z.literal("")).optional(),
      })
    )
    .optional(),

  languages: z
    .array(
      z.object({
        language: z.string().min(2, "Language required"),
        proficiency: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        title: z.string().min(2, "Title required"),
        link: z.string().optional(),
        technologies: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  achievements: z
    .array(
      z.object({
        title: z.string().min(2, "Title required"),
        date: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  extracurricular: z
    .array(
      z.object({
        role: z.string().min(2, "Role required"),
        organization: z.string().optional(),
        date: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
});
