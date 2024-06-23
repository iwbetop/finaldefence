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

import { UserLogin } from "@/backend/action/auth";

export default function Login(){
    return(
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle className="text-xl">User Login</CardTitle>
                <CardDescription>Enter your email below to login your account</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserLogin}>
                    <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="examplename@cdd.edu.ph"/>
                    <InputField 
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"/>
                    <Submit className="w-full">Login</Submit>
                </FormState>
                <div className="mt-2">
                    <FormLink className="px-0" variant="link" href="/register">Not yet created an account?</FormLink>
                    <FormLink className="px-0" variant="link" href="/password-forgot">Forgot your password again?</FormLink>
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