"use server";

import { ErrorFormat } from "@/lib/helper";
import { fromError } from "zod-validation-error";
import { prisma } from "@/backend/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transporter } from "@/backend/mailer";
import { v4 } from "uuid";
import fs from "node:fs";
import bcryptjs from "bcryptjs";

import { 
    GetUserByID,
    GetEmailTokenByEMAIL 
} from "@/backend/fetch";
import { 
    UpdateUserPreference as UpdateUserPreferenceData,
    AddSkillItem
} from "@/backend/schema/user";
import { AchievementSchema, EducationSchema, ItemIDSchema, ProjectSchema, UserAccountUpdateSchema, UserAddressSchema, UserContactAddSchema, UserContactUpdateSchema, UserInformationUpdateSchema, FileType } from "@/lib/schema";

export async function UpdateUser(state: any, formData: FormData){
    const validation = UserInformationUpdateSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, ...other } = validation.data;
    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.user.update({
        where: { id },
        data: { ...other }
    });
    revalidatePath("/");
    redirect("/");
}

export async function UpdateUserAddress(state: any, formData: FormData){
    const validation = UserAddressSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, ...other } = validation.data;
    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.user.update({
        where: { id },
        data: { ...other }
    });
    revalidatePath("/");
    redirect("/");
}

export async function AddUserContact(state: any, formData: FormData){
    const validation = UserContactAddSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.contacts.create({
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Contact successfully added" };
}

export async function UpdateUserContact(state: any, formData: FormData){
    const validation = UserContactUpdateSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.contacts.update({
        where: { id },
        data: { ...other }
    });
    revalidatePath("/");
    return { message: "Contact successfully updated" };
}

export async function DeleteUserContact(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;
    await prisma.contacts.delete({
        where: { id }
    });
    revalidatePath("/");
    return { message: "Contact successfully deleted" };
}

export async function UpdateUserAccount(state: any, formData: FormData){
    const whereClause: Record<string, any> = {}
    const validation = UserAccountUpdateSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    let { id, email, password, schoolId, courseId } = validation.data;
    const existingUser = await GetUserByID(id);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    if(email){
        if(email !== existingUser.email){
            const token = v4();
            const expiration = new Date(new Date().getTime() + 3600 * 1000);
            const existingToken = await GetEmailTokenByEMAIL(email);
            if(existingToken){
                await prisma.emailToken.delete({
                    where: { id: existingToken.id }
                });
            }
            const newToken = await prisma.emailToken.create({
                data: { token, expires: expiration, email, password }
            });
            await transporter.sendMail({
                from: process.env.USER,
                to: email,
                subject: "Email Verification by UDD",
                text: "For you to signin, you must verify that you own the google account",
                html: `click <a href="http://localhost:3000/email-verification?token=${newToken.token}">here</a> to verify your email!`
            });
        }
        whereClause.email = email
    }

    if(password && password.trim().length > 0){
        const hashed = await bcryptjs.hash(password, 10);
        whereClause.password = hashed;
    }

    if(schoolId){
        whereClause.schoolId = schoolId
    }

    if(courseId){
        whereClause.courseId = courseId
    }

    await prisma.user.update({
        where: { id },
        data: whereClause
    });
    revalidatePath("/");
    return { message: "Updated changes successfully" }
}

export async function AddUserEducation(state: any, formData: FormData){
    const validation = EducationSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        console.log(validation.error.flatten())
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.education.create({
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Education added successfully" };
}

export async function UpdateUserEducation(state: any, formData: FormData){
    const validation = EducationSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.education.update({
        where: { id },
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Education updated successfully" };
}

export async function DeleteUserEducation(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;
    await prisma.education.delete({
        where: { id }
    });
    revalidatePath("/");
    return { message: "Education deleted successfully" };
}

export async function AddUserAchievement(state: any, formData: FormData){
    const validation = AchievementSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId, dateAchieved, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    const formatted = dateAchieved.length > 5 ? new Date(dateAchieved) : undefined;
    if(!formatted){
        return { message: "Date achieved is invalid" }
    }
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.achievement.create({
        data: { userId, dateAchieved: formatted, ...other }
    });
    revalidatePath("/");
    return { message: "Achievement added successfully" };
}

export async function UpdateUserAchievement(state: any, formData: FormData){
    const validation = AchievementSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId, dateAchieved, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    const datee = dateAchieved.length > 2 ? new Date(dateAchieved) : null;
    if(!datee){
        return { message: "Date achivement is required" }
    }
    await prisma.achievement.update({
        where: { id },
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Achievement updated successfully" };
}

export async function DeleteUserAchievement(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;
    await prisma.achievement.delete({
        where: { id }
    });
    revalidatePath("/");
    return { message: "Achievement deleted successfully" };
}

export async function AddUserProject(state: any, formData: FormData){
    const validation = ProjectSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.project.create({
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Project added successfully" };
}

export async function UpdateUserProject(state: any, formData: FormData){
    const validation = ProjectSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId, ...other } = validation.data;
    const existingUser = await GetUserByID(userId);
    if(!existingUser){
        return { message: "Something went wrong!" };
    }
    await prisma.project.update({
        where: { id },
        data: { userId, ...other }
    });
    revalidatePath("/");
    return { message: "Project updated successfully" };
}

export async function DeleteUserProject(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;
    await prisma.project.delete({
        where: { id }
    });
    revalidatePath("/");
    return { message: "Project deleted successfully" };
}

export async function UpdateUserAvatar(state: any, formData: FormData){
    const validation = FileType.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    let { image, id } = validation.data;
    const extension = image.name.split(".").pop();
    if(extension === "undefined"){
        return { message: "Image is invalid!" };
    }
    const fileName = `${id}.${extension}`;
    const stream = fs.createWriteStream(`public/avatar/${fileName}`);
    const bufferedImage = await image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            return { message: "Something went wrong!" };
        }
    });
    const imageLink = `/avatar/${fileName}`;
    await prisma.user.update({
        where: { id: `${id}` },
        data: { image: imageLink }
    });
    revalidatePath("/");
    redirect("/");
}

export async function UpdateUserPreference(state: any, formData: FormData){
    const validation = UpdateUserPreferenceData.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const {userId, isAlumni, privacy} = validation.data;
    await prisma.preferences.update({
        where: { userId },
        data: {
             privacy, user: {
                update: {
                    where: { id: userId },
                    data: { isAlumni }
                }
             }
        }
    });
    revalidatePath("/");
    return { message: "Preferences updated successfully" };
}

export async function AddUserSkill(state: any, formData: FormData){
    const validation = AddSkillItem.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id, userId } = validation.data
    try{
        await prisma.userSkill.create({
            data: {
                skillId: id, userId
            }
        });
    }catch{
        return { message: "This Skill has already been added!" }
    }
    revalidatePath("/");
    return { message: "Skill added successfully" };
}

export async function DeleteUserSkill(state: any, formData: FormData){
    const validation = ItemIDSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { id } = validation.data;
    await prisma.userSkill.delete({
        where: { id }
    });
    revalidatePath("/");
    return { message: "Deleted successfully" };
}