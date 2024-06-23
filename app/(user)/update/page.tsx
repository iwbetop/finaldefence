import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { GetCourses } from "@/backend/fetch";
import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { FormState, FormControl } from "@/components/form";
import { InputField } from "@/components/field";
import { Submit } from "@/components/form-submit";

import { UpdateUserAccount } from "@/backend/action/profile";

import { auth } from "@/auth";
import { GetUserByID } from "@/backend/fetch";
import { Label } from "@/components/ui/label";

export default async function UpdateAccount(){
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);
    const courses = await GetCourses();
    return(
        <div className="p-10">
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Account</CardTitle>
                <CardDescription>Update your account settings. Set your preferred privacy.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormState formState={UpdateUserAccount}>
                    <InputField 
                    type="email" 
                    name="email" 
                    label="Email"
                    defaultValue={user?.email}/>
                    <InputField 
                    type="password" 
                    name="password" 
                    label="Password" 
                    placeholder="new password"/>
                    <input type="hidden" name="id" value={user?.id} />
                    <div className="grid md:grid-cols-2 gap-3">
                        <InputField 
                        type="text" 
                        name="schoolId" 
                        label="School ID" 
                        placeholder="school id"
                        defaultValue={user?.schoolId}
                        className="w-full"/>
                        <div className="grid gap-3 w-full">
                            <Label>Course</Label>
                            <Select name="courseId" defaultValue={user?.course?.id!}>
                                <SelectTrigger>
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
                    <Submit className="w-full">Update</Submit>
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