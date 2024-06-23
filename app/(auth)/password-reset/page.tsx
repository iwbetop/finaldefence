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
import { InputParamField } from "@/components/field-param";
import { Submit } from "@/components/form-submit";
import Image from "next/image";
import UDD from "@/public/udd.png";

import { UserResetPassword } from "@/backend/action/auth";

export default function PasswordReset(){
    return(
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle className="text-xl">User Reset Password</CardTitle>
                <CardDescription>Enter your new password</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserResetPassword}>
                    <InputParamField name="token"/>
                    <InputField 
                    label="New Password"
                    type="password"
                    name="password"
                    placeholder="new password"/>
                    <InputField 
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"/>
                    <Submit className="w-full">Reset</Submit>
                </FormState>
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