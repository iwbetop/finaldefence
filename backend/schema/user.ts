import { z } from "zod";
import { 
    email, password, phone, name, shortText, longText, date, privacy, id
} from "@/backend/schema/main";

export const CreateUser = z.object({
    email,
    password,
    schoolId : id,
    firstName: name,
    lastName: name,
    courseId: id
});

export const DeleteUser = z.object({ id });

export const UpdateUser = z.object({
    id,
    firstName: name,
    lastName: name,
    middleName: z.optional(z.string()),
    birthdate: z.string({
        required_error: "Date is required!",
        invalid_type_error: "Date must be a valid type!",
      })
      .trim()
      .transform((value) => {
        const date = value.length === 0 ? null : new Date(value);
        return date;
      }),
    bio: z.optional(z.string())
});

export const UpdateUserAddress = z.object({
    id,
    city: z.optional(z.string()),
    country: z.optional(z.string()),
    province: z.optional(z.string()),
    zip: z.optional(z.string())
});

export const AddUserContact = z.object({
    userId: id,
    email: z.string().email(),
    phone
});

export const UpdateUserContact = z.object({
    id,
    email: email.optional(),
    phone: phone.optional(),
    userId: id
});

export const DeleteUserContact = z.object({ id });

export const UpdateUserAccount = z.object({
    id,
    email: email,
    password: z.optional(password).or(z.literal(``)),
    schoolId: id,
    courseId: id
});

export const UserEducation = z.object({
    id: z.optional(z.string()),
    name,
    dateStarted: z.string(z.date({
        required_error: "Date is required!",
        invalid_type_error: "Date must be a valid type!",
      })
      .min(new Date("1930-01-01"), { 
          message: "Brah? You time travelled or somethin?!" 
      })
      .max(new Date("2025-01-01"), {
          message: "Brah, Did you time travelled in future tense or somethin?!" 
      })).transform(value => {
        if(value) return new Date(value)
        return value;
      }),
    dateEnded: z.string({
        required_error: "Date is required!",
        invalid_type_error: "Date must be a valid type!",
      })
      .trim()
      .transform((value) => {
        const date = value.length === 0 ? null : new Date(value);
        return date;
      }),
    userId: id
});

export const DeleteUserEducation = z.object({ id });

export const UserAchievement = z.object({
    id: id.optional(),
    name,
    dateAchieved: z.string(z.date({
        required_error: "Date is required!",
        invalid_type_error: "Date must be a valid type!",
      })
      .min(new Date("1930-01-01"), { 
          message: "Brah? You time travelled or somethin?!" 
      })
      .max(new Date("2025-01-01"), {
          message: "Brah, Did you time travelled in future tense or somethin?!" 
      })).transform(value => {
        if(value) return new Date(value)
        return value;
      }),
    description: z.string().min(2).max(200),
    userId: id
});

export const DeleteUserAchievement = z.object({ id });

export const UserProject = z.object({
    id: id.optional(),
    name,
    dateCompleted: z.string(z.date({
        required_error: "Date is required!",
        invalid_type_error: "Date must be a valid type!",
      })
      .min(new Date("1930-01-01"), { 
          message: "Brah? You time travelled or somethin?!" 
      })
      .max(new Date("2025-01-01"), {
          message: "Brah, Did you time travelled in future tense or somethin?!" 
      })).transform(value => {
        if(value) return new Date(value)
        return value;
      }),
    description: z.string().min(2).max(200),
    userId: id
});

export const DeleteUserProject = z.object({ id });

export const UserSignIn = z.object({
    email,
    password
});

export const Token = z.object({
    token: id,
    email
});

export const UserResetPassword = z.object({
    token: id,
    password,
    confirmPassword: password
})
.superRefine((token, ctx) => {
    if(token.password !== token.confirmPassword){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match"
        });
    }
});

export const UserForgotPassword = z.object({ email });

export const FileType = z.object({
    image: z.instanceof(File),
    id
});

export const UpdateUserPreference = z.object({
    privacy: z.enum(["PUBLIC", "PRIVATE", "HIDDEN"], {
        message: "You selected invalid option!"
    }),
    isAlumni: z.string().transform((isAlumni) => {
        const data = isAlumni === "true" ? true : false;
        return data;
    }),
    userId: id
});

export const AddSkillItem = z.object({
    id,
    userId: id
});

export const DeleteSkillItem = z.object({
    id
});
