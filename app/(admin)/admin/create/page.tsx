import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { UserRegistration } from "@/backend/action/auth"

import { InputField } from "@/components/field";
import { FormState, FormControl } from "@/components/form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Submit } from "@/components/form-submit";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GetCourses } from "@/backend/fetch";
import { UserRegistrationAdmin } from "@/backend/action/admin";

export default async function CreateUser(){
    const courses = await GetCourses();
    return(
        <div className="p-10 max-w-4xl mx-auto">
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Create User</CardTitle>
                <CardDescription>create user manually</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UserRegistrationAdmin}>
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
                        <div className="grid grid-cols-2 gap-3">
                            <InputField 
                            label="School ID"
                            type="text"
                            name="schoolId"
                            placeholder="school id"/>
                            <div className="grid gap-3 w-full">
                                <Label>Course</Label>
                                <Select name="courseId">
                                    <SelectTrigger className="md:w-full text-ellipsis overflow-hidden ...">
                                        <SelectValue placeholder="courses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem value={course.id} className="truncate">{course.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Submit className="w-full">Create</Submit>
                    </FormState>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4">
                    <span className="py-1 inline-flex gap-2 items-center text-sm text-muted-foreground">
                        <InfoCircledIcon className="w-4 h-4"/>
                        <span>Do not provide any private credentials</span>
                    </span>
            </CardFooter>
            </Card>
        </div>
    );
}