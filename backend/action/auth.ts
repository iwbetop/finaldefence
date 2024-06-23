"use server";

import { 
    GetEmailTokenByEMAIL, 
    GetEmailTokenByTOKEN, 
    GetPasswordTokenByEMAIL, 
    GetPasswordTokenByTOKEN 
} from "@/backend/fetch";

import { ErrorFormat } from "@/lib/helper";
import { fromError } from "zod-validation-error";
import { GetUserByEMAIL } from "@/backend/fetch";

import { transporter } from "@/backend/mailer";
import { revalidatePath } from "next/cache";
import { prisma } from "@/backend/prisma";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { v4 } from "uuid";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";

import { EmailSchema, LoginSchema, PasswordResetSchema, TokenSchema, UserCreationSchema } from "@/lib/schema";

export async function UserRegistration(state: any, formData: FormData){
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
    revalidatePath("/register");
    return { message: "Email Verification has been successfully sent" };
}

export async function UserLogin(state: any, formData: FormData){
    const validation = LoginSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { email, password } = validation.data;
    const existingUser = await GetUserByEMAIL(email);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    if(existingUser.lock){
        return { message: "Something went wrong" }
    }
    if(existingUser.isArchieved){
        return { message: "Something went wrong" };
    }
    if(!existingUser.isEmailVerified){
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
        return { message: "Email Verification has been successfully sent" }
    }
    // TODO:: AUTH Signin
    try {
        await signIn("credentials", {
            email, 
            password, 
            redirectTo: "/", 
            role: existingUser.role
        });
    } catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { message: "Credentials are not valid" };
                default:
                    return { message: "Something went wrong" };
            }
        }
        throw error;
    }
    redirect("/");
    return { message: "User login successfully" };
}

export async function UserForgotPassword(state: any, formData: FormData){
    const validation = EmailSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { email } = validation.data;
    const existingUser = await GetUserByEMAIL(email);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    const existingToken = await GetPasswordTokenByEMAIL(email);
    if(existingToken){
        await prisma.passwordToken.delete({ where: { id: existingToken.id } });
    }
    const token = v4();
    const expiration = new Date(new Date().getTime() + 3600 * 1000);
    const newToken = await prisma.passwordToken.create({
        data: { email, token, expires: expiration  }
    });
    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: "Password Reset By UDD",
        text: "received a reset link",
        html: `click <a href="http://localhost:3000/password-reset?token=${newToken.token}">here</a> to reset your password!`
    });
    return { message: "Password Reset Link has been successfully sent" }
}

export async function UserResetPassword(state: any, formData: FormData){
    const validation = PasswordResetSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { token, password } = validation.data;
    const existingToken = await GetPasswordTokenByTOKEN(token);
    if(!existingToken){
        return { message: "Something went wrong" };
    }
    const existingUser = await GetUserByEMAIL(existingToken.email);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    if(new Date(existingToken.expires) < new Date()){
        return { message: "Link has been expired" }
    }
    const hashed = await bcryptjs.hash(password, 10);
    await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashed }
    });
    await prisma.passwordToken.delete({ where: { id: existingToken.id } });
    // AUTH: TODO : SIGNIN
    try {
        await signIn("credentials", {
            email: existingUser.email, password, redirectTo: "/"
        });
    } catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { message: "Credentials are not valid" };
                default:
                    return { message: "Something went wrong" };
            }
        }
        throw error;
    }
    redirect("/");
    return { message: "Your password has been reset" };
}

export async function UserEmailVerification(state: any, formData: FormData){
    const validation = TokenSchema.safeParse(Object.fromEntries(formData));
    if(!validation.success){
        return { message: ErrorFormat(fromError(validation.error).message)[0] }
    }
    const { token, email } = validation.data;
    const existingToken = await GetEmailTokenByTOKEN(token);
    if(!existingToken){
        return { message: "Something went wrong" };
    }
    const existingUser = await GetUserByEMAIL(existingToken.email);
    if(!existingUser){
        return { message: "User do not exist" };
    }
    if(new Date(existingToken.expires) < new Date()){
        return { message: "Link has been expired!" }
    }
    await prisma.user.update({
         where: { id: existingUser.id },
         data: { email, emailVerified: new Date(), isEmailVerified: true }
    });
    await prisma.emailToken.delete({ where: { id: existingToken.id } });
    // TODO :: AUTH :: SIGNIN
    try {
        await signIn("credentials", {
            email, password: existingToken.password, redirectTo: "/"
        });
    } catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { message: "Credentials are not valid" };
                default:
                    return { message: "Something went wrong" };
            }
        }
        throw error;
    }
    redirect("/");
    return { message: "Email verification successfully sent" };
}