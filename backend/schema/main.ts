import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";

export const email = z.string().email().min(8).max(50).superRefine((email, ctx) => {
    if(!email.endsWith("@cdd.edu.ph")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "email required"
        });
    }
});

export const password = z.string().min(8).max(32)
                         .refine((password) => password.length === password.trim().length, {
                            message: "Password cannot contain leading/trailing spaces"
                         })
                         .refine((password) => /[A-Z]/.test(password), {
                            message: "Password must contain at least one uppercase letter"
                         })
                         .refine((password) => /[a-z]/.test(password), {
                            message: "Password must contain at least one lowercase letter"
                         })
                         .refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
                            message: "Password must contain at least one special character",
                         });

export const date = z.string(
                        z.date().min(new Date("1930-01-01")).max(new Date("2025-01-01"))
                        .superRefine((date, ctx) => {
                            if(date !instanceof Date){
                                ctx.addIssue({
                                    code: z.ZodIssueCode.custom,
                                    message: "Date is required"
                                });
                            }
                        })
                    );

export const privacy = z.enum(["PUBLIC", "PRIVATE", "HIDDEN"], {
                        message: "Selected option is invalid"
                    });
            
export const name = z.string().min(1).max(50).regex(new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/), {
                        message: "Name(s) is invalid"
                    }).superRefine((name, ctx) => {
                        if(name.length === 0){
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Name(s) is empty"
                            });
                        }
                    });
                
export const shortText = z.string().min(1).min(20).transform((shortText) => {
                        const data = shortText.length > 0 ? shortText : null;
                        return data;
                    });
export const longText = z.string().min(1).min(200);

export const phone = z.string().transform((phone, ctx) => {
                        if(phone.length > 0 && phone.length < 12){
                            const validation = parsePhoneNumber(phone, { defaultCountry: "PH" })
                            if(!validation.isValid()){
                                ctx.addIssue({
                                    code: z.ZodIssueCode.custom,
                                    message: "Phone is not valid"
                                });
                            }
                        }
                        if(phone.length > 12){
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Phone is not valid"
                            });
                        }
                        const data = phone.length === 0 ? `` : phone;
                        return data;
                    });

export const id = z.string().min(1);