import { UpdateUser, UpdateUserAccount } from "@/backend/action/profile";
import { InputField, TextareaField } from "@/components/field";
import { FormState } from "@/components/form";
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

  import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { GetUserByID } from "@/backend/fetch";
import { Submit } from "@/components/form-submit";
import { GetCourses } from "@/backend/fetch";
export default async function UserUpdate({params}: {params: {id: string}}){
    const user = await GetUserByID(`${params.id}`);
    const courses = await GetCourses();
    return(
        <div className="p-10 max-w-4xl mx-auto space-y-4">
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Update User Account</CardTitle>
                <CardDescription>update user here</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
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
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Update User Details</CardTitle>
                <CardDescription>update user here</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
            <FormState formState={UpdateUser}>
                        <InputField 
                        label="First Name"
                        type="text"
                        name="firstName"
                        defaultValue={user?.firstName}
                        placeholder="this is required"/>
                        <InputField 
                        label="Last Name"
                        type="text"
                        name="lastName"
                        defaultValue={user?.lastName}
                        placeholder="this is required"/>
                        <span className="py-1 inline-flex gap-2 items-center text-sm text-muted-foreground">
                            <InfoCircledIcon className="w-4 h-4"/>
                            <span>First and Last name are required</span>
                        </span>
                        <InputField 
                        label="Middle Name"
                        type="text"
                        name="middleName"
                        defaultValue={user?.middleName!}
                        placeholder="middle name"/>
                        <InputField 
                        label="Birthdate"
                        type="date"
                        name="birthdate"
                        defaultValue={user?.birthdate?.toISOString().slice(0, 10)}/>
                        <TextareaField 
                        label="Biography" 
                        name="bio"
                        typeof="text"
                        defaultValue={user?.bio!}/>
                        <span className="py-1 inline-flex gap-2 items-center text-sm text-muted-foreground">
                            <InfoCircledIcon className="w-4 h-4"/>
                            <span>Biography must not exceed 200 characters above</span>
                        </span>
                        <InputField type="hidden" name="id" value={user?.id}/>
                        <div>
                            <Submit className="w-full">Update</Submit>
                        </div>
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