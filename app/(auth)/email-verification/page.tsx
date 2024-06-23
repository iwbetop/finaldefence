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

import { UserEmailVerification } from "@/backend/action/auth";

export default function EmailVerification(){
    return(
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle className="text-xl">User Email Verification</CardTitle>
                <CardDescription>Enter your email below to verify your account</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserEmailVerification}>
                    <InputParamField name="token"/>
                    <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="examplename@cdd.edu.ph"/>
                    <Submit className="w-full">Verify</Submit>
                </FormState>
                <div className="mt-2">
                    <FormLink className="px-0" variant="link" href="/register">Not yet created an account?</FormLink>
                    <FormLink className="px-0" variant="link" href="/login">Already verified?</FormLink>
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