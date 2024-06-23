import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";

export function optional<T extends z.ZodTypeAny>(schema: T){
    return z.union([schema, z.literal("")])
            .transform((value) => (value === "" ? undefined : value))
            .optional();
}

export function boolean<T extends z.ZodTypeAny>(schema: T){
    return z.union([schema, z.literal("")])
            .transform((value) => (value === "true" ? true : false))
            .optional();
}
// Default Schema
export const name = z.string().min(2).max(30).regex(new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/), {
                        message: "Name contains a non character text"
                    });
export const phone  = z.string().min(2).max(12)
                       .refine((phone) => parsePhoneNumber(phone, {defaultCountry: "PH"}), {
                        message: "Phone is not valid"
                       });
export const email = z.string().email().min(8).max(50)
                      .refine((email) => email.endsWith("@cdd.edu.ph"), {
                        message: "Email must end with @cdd.edu.ph"
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
                            message: "Password must contain at least one special character"
                         });
export const date = z.string(z.date().min(new Date("1930-01-01")).max(new Date())
                              .refine((date) => date instanceof Date, {
                                message: "Date is not valid"
                              }));
export const id = z.string();
export const bio = z.string().min(2).max(200);
export const description = z.string().min(2).max(100);
export const achievementType = z.enum(["SCHOOL", "COMMUNITY"]);
export const userPrivacy = z.enum(["PRIVATE", "PUBLIC"]);
export const checkboxes = z.enum(["true", "false"]);

// Create User(registration and for admin user creation)
export const UserCreationSchema = z.object({
    firstName: name,
    lastName: name,
    schoolId: id,
    courseId: id,
    email: email,
    password: password
});

// Update User(user and for admin user update)(all optional)
export const UserInformationUpdateSchema = z.object({
    id: id,
    fistName: name,
    lastName: name,
    middleName: optional(name),
    schoolId: id,
    courseId: id,
    bio: optional(bio),
    birthdate: optional(date)
});

export const UserAccountUpdateSchema = z.object({
    id: id,
    email: optional(email),
    password: optional(password),
    schoolId: optional(z.string().min(2).max(20)),
    courseId: optional(z.string().min(2))
});

export const ItemIDSchema = z.object({ id });

// For Education Add and Update
export const EducationSchema = z.object({
    id: optional(id),
    name: name,
    dateStarted: date,
    dateEnded: optional(date),
    userId: id
});
// For Achievement Add and Update
export const AchievementSchema = z.object({
    id: optional(id),
    name: name,
    dateAchieved: date,
    description: description,
    type: achievementType,
    userId: id
});
// For Project Add and Update
export const ProjectSchema = z.object({
    id: optional(id),
    name: name,
    dateCompleted: date,
    description: description,
    userId: id
});

export const LoginSchema = z.object({
    email: email,
    password: password
});

export const EmailSchema = z.object({email});
export const TokenSchema = z.object({
    email: email,
    token: id
});
export const PasswordResetSchema = z.object({
    token: id,
    password: password,
    confirmPassword: password
});
export const FileType = z.object({
    image: z.instanceof(File),
    id: id
});
export const UserAddressSchema = z.object({
    id: id,
    city: optional(name),
    country: optional(name),
    province: optional(name),
    zip: optional(name)
});
export const UserContactUpdateSchema = z.object({
    id: optional(id),
    userId: id,
    email: optional(email),
    phone: optional(phone)
});
export const UserContactAddSchema = z.object({
    userId: id,
    email: email,
    phone: phone
});
export const UserPreference = z.object({
    id: id,
    privacy: userPrivacy
});
export const CheckboxesUserUpdateSchema = z.object({
    id: id,
    isEmailVerified: optional(boolean(checkboxes)),
    isAlumni: optional(boolean(checkboxes)),
    isLock: optional(boolean(checkboxes)),
});

export const DeleteUserSchema = z.object({
    id: id,
});

export const ChangeRole = z.object({
    id: id,
    role: z.enum(["ADMIN", "SUPERADMIN", "USER"])
});