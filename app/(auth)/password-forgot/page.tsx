import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { FormState, FormLink } from "@/components/form";
import { InputField } from "@/components/field";
import { Submit } from "@/components/form-submit";
import Image from "next/image";
import UDD from "@/public/udd.png";

import { UserForgotPassword } from "@/backend/action/auth";

export default function PasswordForgot(){
    return(
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle className="text-xl">User Forgot Password</CardTitle>
                <CardDescription>Enter your email below to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserForgotPassword}>
                    <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="examplename@cdd.edu.ph"/>
                    <Submit className="w-full">Send Link</Submit>
                </FormState>
                <div className="mt-2">
                    <FormLink className="px-0" variant="link" href="/login">Remembered already?</FormLink>
                </div>
            </CardContent>
            <CardFooter>
                <span className="text-muted inline-flex gap-3">
                    @uddfolio |
                    <span className="relative inline-flex w-6 h-6">
                        <Image src={UDD.src} fill alt="logo"/>
                    </span> 
                    | @universidaddedagupan
                </span>
            </CardFooter>
        </Card>
    );
}