import { z } from "zod";

export const userThings = z.object({ 
    id: z.string(),
    userId: z.string().optional() 
});

export const AddSkill = z.object({
    name: z.string().min(2),
    category: z.string()
});

export const deleteUserSuperAdmin = z.object({
    id: z.string(),
    email: z.string()
});