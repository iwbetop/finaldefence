import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { FormState, FormLink, FormControl } from "@/components/form";
import { InputField } from "@/components/field";
import { Submit } from "@/components/form-submit";
import Image from "next/image";
import UDD from "@/public/udd.png";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import { UserRegistration } from "@/backend/action/auth";
import { GetCourses } from "@/backend/fetch";

export default async function Register(){
    const courses = await GetCourses();
    return(
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle className="text-xl">Create an account</CardTitle>
                <CardDescription>Enter your credentials below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserRegistration}>
                    <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="examplename@cdd.edu.ph"/>
                    <span className="py-1 inline-flex gap-2 items-center text-sm text-muted-foreground">
                        <InfoCircledIcon className="w-4 h-4"/>
                        <span>use your school domain account(@cdd.edu.ph)</span>
                    </span>
                    <InputField 
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"/>
                    <FormControl>
                        <InputField 
                        label="First Name"
                        type="text"
                        name="firstName"
                        placeholder="first name"/>
                        <InputField 
                        label="Last Name"
                        type="text"
                        name="lastName"
                        placeholder="last name"/>
                    </FormControl>
                    <FormControl>
                        <InputField 
                        label="School ID"
                        type="text"
                        name="schoolId"
                        placeholder="school id"/>
                        <div className="grid gap-3 w-full">
                            <Label>Course</Label>
                            <Select name="courseId">
                                <SelectTrigger className="md:w-[190px]">
                                    <SelectValue placeholder="courses" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem value={course.id} className="truncate">{course.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </FormControl>
                    <Submit className="w-full">Create</Submit>
                </FormState>
                <div className="mt-2">
                    <FormLink className="px-0" variant="link" href="/login">Already have an account?</FormLink>
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