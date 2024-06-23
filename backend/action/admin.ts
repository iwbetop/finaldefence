"use server";
import { ErrorFormat } from "@/lib/helper";
import { fromError } from "zod-validation-error";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { GetUserByEMAIL, GetUserByID } from "../fetch";
import { CreateUser } from "../schema/user";
import bcryptjs from "bcryptjs"

import { AddSkill } from "../schema/admin";

// new
import { ChangeRole, DeleteUserSchema, ItemIDSchema, UserCreationSchema } from "@/lib/schema";
import { redirect } from "next/navigation";

export async function LockUser(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;

    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    const locked = existingUser.lock === true ? false : true
    await prisma.user.update({
        where: { id },
        data: { lock: locked }
    });

    revalidatePath("/admin");
    return { message: null }
}

export async function ArchieveUser(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;

    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    const archieved = existingUser.isArchieved === true ? false : true
    await prisma.user.update({
        where: { id },
        data: { isArchieved: archieved, archivedAt: new Date() }
    });

    revalidatePath("/admin");
    return { message: null };
}

export async function DeleteUser(state: any, formData: FormData){
    const validation = DeleteUserSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;

    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "User do not exist" };
    }

    await prisma.user.delete({
        where: { id: existingUser.id },
    });

    redirect("/admin");
    return { message: "Deleted successfully" };
}

export async function VerifyUser(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;

    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    await prisma.user.update({
        where: { id },
        data: { isEmailVerified: true, emailVerified: new Date() }
    });

    revalidatePath("/admin");
    return { message: null }
}

export async function UserRegistrationAdmin(state: any, formData: FormData){
    const validation = UserCreationSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { email, password, ...other } = validation.data;
    const existingUser = await GetUserByEMAIL(email);
    if(existingUser){
        return { message: "User already exist!" };
    }
    const hashed = await bcryptjs.hash(password, 10);
    await prisma.user.create({
        data: { email, password: hashed, ...other, preferences: {
            create: { privacy: "PUBLIC" }
        } }
    });
    revalidatePath("/create");
    return { message: "Created Successfully" };
}

export async function CreateSkill(state: any, formData: FormData){
    const validation = AddSkill.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const {...others} = validation.data
    await prisma.skill.create({
        data: { ...others }
    });
    revalidatePath("/create");
    return { message: "Skill added successfully" }
}

export async function ChangeRoles(state: any, formData: FormData){
    const validation = ChangeRole.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        console.log(validation.error.flatten())
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, role } = validation.data;

    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    await prisma.user.update({
        where: { id },
        data: { role: role }
    });

    revalidatePath("/superadmin");
    return { message: null }
}
