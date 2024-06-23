import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";

import { FormState } from "../form";
import { InputField, TextareaField } from "../field";
import { Submit } from "../form-submit";

import { PlusCircledIcon, Pencil1Icon, MinusCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import { auth } from "@/auth";
import { GetUserByID } from "@/backend/fetch";
import { AddUserAchievement, DeleteUserAchievement, DeleteUserEducation, UpdateUserAchievement, UpdateUserEducation } from "@/backend/action/profile";

import Image from "next/image";

export async function AchievementCard(){
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);
    return(
        <Card className="relative">
            <CardHeader>
                <CardTitle className="text-2xl">My Achievement</CardTitle>
                <CardDescription>
                    fill up your achievement history
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-8 pb-10">
                {/* Add */}
                <Dialog>
                    <DialogTrigger asChild>
                        <PlusCircledIcon className="w-10 h-10 absolute top-8 right-8 cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add Achievement here</DialogTitle>
                        <DialogDescription>
                            past achievement history
                        </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className="py-2">
                            <FormState formState={AddUserAchievement}>
                                <InputField 
                                label="Achievement Name"
                                name="name"
                                type="text"/>
                                <TextareaField name="description" label="Description"/>
                               <div className="md:grid md:grid-cols-2">
                                    <InputField 
                                        label="Date Achieved"
                                        name="dateAchieved"
                                        type="date"/>
                                    <div>
                                        <Label>Achievement type</Label>
                                        <Select name="type">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SCHOOL">School</SelectItem>
                                                <SelectItem value="COMMUNITY">Community</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                               </div>
                               <InputField 
                                        name="userId"
                                        type="hidden"
                                        className="hidden"
                                        value={user?.id}/>
                                <Submit className="w-full">Add</Submit>
                            </FormState>
                        </div>
                    </DialogContent>
                </Dialog>
               <div className="space-y-4">
                {(user?.achievement && user.achievement.length > 0) && (
                        <>
                            {user.achievement.map((achievement) => (
                                <div className="relative">
                                    <div className="flex items-start gap-4">
                                        <span className="relative inline-flex w-8 h-8">
                                            <Image src="/udd.png" alt="udd" fill/>
                                        </span>
                                        <div>
                                            <p className="text-lg">{achievement.name}</p>
                                            <p>{achievement.description}</p>
                                            <span className="text-sm">{achievement.dateAchieved.toISOString().slice(0,4)}</span>
                                        </div>
                                    </div>
                                {/* Update and Delete */}
                                <div className="absolute right-4 top-2 space-x-6">
                                        <Dialog>
                                        <DialogTrigger className="">
                                            <Pencil1Icon className="w-6 h-6"/>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Update Item?</DialogTitle>
                                            </DialogHeader>
                                            <Separator />
                                            <FormState formState={UpdateUserAchievement}>
                                                <InputField 
                                                label="School name"
                                                name="name"
                                                type="text"
                                                defaultValue={achievement.name}/>
                                                <TextareaField name="description" label="Description"/>
                                                <InputField 
                                                label="Date Achieved"
                                                name="dateAchieved"
                                                type="date"
                                                defaultValue={achievement.dateAchieved.toISOString().slice(0,10)}/>
                                                <div>
                                                <Label>Achievement type</Label>
                                                <Select name="type">
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SCHOOL">School</SelectItem>
                                                        <SelectItem value="COMMUNITY">Community</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                                <input 
                                                    name="userId"
                                                    type="hidden"
                                                    className="hidden"
                                                    value={user?.id}/>
                                                <input 
                                                    name="id"
                                                    type="hidden"
                                                    className="hidden"
                                                    value={achievement.id}/>
                                                    <Submit className="w-full">Update</Submit>
                                            </FormState>
                                        </DialogContent>
                                        </Dialog>
                                        {/* delete */}
                                        <AlertDialog>
                                        <AlertDialogTrigger>
                                            <MinusCircledIcon className="w-6 h-6"/>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <FormState formState={DeleteUserAchievement}>
                                                <input type="hidden" value={achievement.id} name="id" />
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </FormState>
                                        </AlertDialogContent>
                                        </AlertDialog>
                                </div>
                                </div>
                            ))}
                        </>
                )}
                {(user?.achievement && user.achievement.length === 0) && (
                    <span className="text-muted-foreground">No achievement has been added yet!😥</span>
                )}
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
    );
}

