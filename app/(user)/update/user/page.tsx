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

import { InfoCircledIcon,  } from "@radix-ui/react-icons";

import { FormState, FormControl } from "@/components/form";
import { InputField, TextareaField } from "@/components/field";
import { Submit } from "@/components/form-submit";

import { AddUserContact, UpdateUser, UpdateUserAddress, UpdateUserPreference } from "@/backend/action/profile";

import { auth } from "@/auth";
import { GetUserByID } from "@/backend/fetch";
import { Separator } from "@/components/ui/separator";

export default async function UpdateUserPage(){
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);
    return(
        <div className="p-10 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Profile</CardTitle>
                    <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent>
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
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Address</CardTitle>
                    <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={UpdateUserAddress}>
                        <FormControl>
                            <InputField 
                            label="City"
                            name="city"
                            defaultValue={user?.city!}
                            placeholder="city"/>
                            <InputField 
                            label="Province"
                            name="province"
                            defaultValue={user?.province!}
                            placeholder="province"/>
                        </FormControl>
                        <FormControl>
                            <InputField 
                            label="Country"
                            name="country"
                            defaultValue={user?.country!}
                            placeholder="country"/>
                            <InputField 
                            label="Zip Code"
                            name="zip"
                            defaultValue={user?.zip!}
                            placeholder="zip code"/>
                        </FormControl>
                        <InputField type="hidden" name="id" value={user?.id}/>
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
                    <CardTitle className="text-2xl">Contacts</CardTitle>
                    <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={AddUserContact}>
                        <FormControl>
                            <InputField 
                            label="Email"
                            name="email"
                            placeholder="sample@gmail.com"
                            />
                            <InputField 
                            label="Phone"
                            name="phone"
                            placeholder="phone"
                            />
                        </FormControl>
                        <InputField type="hidden" name="userId" value={user?.id}/>
                        <Submit className="w-full">Add</Submit>
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
                    <CardTitle className="text-2xl">Preferences</CardTitle>
                    <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <FormState formState={UpdateUserPreference}>
                            <input type="hidden" name="userId" value={user?.id} />
                            <div className="grid md:grid-cols-2 gap-3">
                                <Select name="privacy" defaultValue={`${user?.preferences?.privacy}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Privacy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PUBLIC">Public</SelectItem>
                                        <SelectItem value="PRIVATE">Private</SelectItem>
                                        <SelectItem value="HIDDEN">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select name="isAlumni" defaultValue={`${user?.isAlumni}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Alumni</SelectItem>
                                        <SelectItem value="false">Student</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        <Submit className="w-full">Update</Submit>
                        </FormState>
                    </div>
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