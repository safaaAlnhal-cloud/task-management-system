import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().optional(),

  priority: z.enum(["low", "medium", "high"]),

  dueDate: z.string().optional(),
});