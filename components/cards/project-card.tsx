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
import { Separator } from "@/components/ui/separator";

import { FormState, FormControl } from "../form";
import { InputField, TextareaField } from "../field";
import { Submit } from "../form-submit";

import { PlusCircledIcon, Pencil1Icon, MinusCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import { auth } from "@/auth";
import { GetUserByID } from "@/backend/fetch";
import { AddUserProject, DeleteUserProject, UpdateUserProject } from "@/backend/action/profile";

import Image from "next/image";

export async function ProjectCard(){
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);
    return(
        <Card className="relative">
            <CardHeader>
                <CardTitle className="text-2xl">My Project</CardTitle>
                <CardDescription>
                    fill up your project
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
                        <DialogTitle>Add project here</DialogTitle>
                        <DialogDescription>
                            past project history
                        </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className="py-2">
                            <FormState formState={AddUserProject}>
                                <InputField 
                                label="Project Name"
                                name="name"
                                type="text"/>
                                <TextareaField name="description" label="Description"/>
                               <InputField 
                                    label="Date Completed"
                                    name="dateCompleted"
                                    type="date"/>
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
                {(user?.project && user.project.length > 0) && (
                        <>
                            {user.project.map((project) => (
                                <div className="relative">
                                    <div className="flex items-center gap-4">
                                        <span className="relative inline-flex w-8 h-8">
                                            <Image src="/udd.png" alt="udd" fill/>
                                        </span>
                                        <div>
                                            <p>{project.name}</p>
                                            <span>{project.dateCompleted.toISOString().slice(0,4)}</span>
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
                                            <FormState formState={UpdateUserProject}>
                                                <InputField 
                                                label="Project name"
                                                name="name"
                                                type="text"
                                                defaultValue={project.name}/>
                                                <TextareaField name="description" label="Description" defaultValue={project.description}/>
                                                <InputField     
                                                label="Date Completed"
                                                name="dateCompleted"
                                                type="date"
                                                defaultValue={project.dateCompleted.toISOString().slice(0,10)}/>
                                                <input 
                                                    name="userId"
                                                    type="hidden"
                                                    className="hidden"
                                                    value={user?.id}/>
                                                <input 
                                                    name="id"
                                                    type="hidden"
                                                    className="hidden"
                                                    value={project.id}/>
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
                                            <FormState formState={DeleteUserProject}>
                                                <input type="hidden" value={project.id} name="id" />
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
                {(user?.project && user.project.length === 0) && (
                    <span className="text-muted-foreground">No project has been added yet!😥</span>
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

