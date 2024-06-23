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
} from "@/components/ui/dialog"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PersonIcon, CameraIcon, InfoCircledIcon, TriangleRightIcon, MinusIcon } from "@radix-ui/react-icons";

import { FormState } from "@/components/form";
import { InputField } from "@/components/field";
import { Submit } from "@/components/form-submit";
import { UpdateUserAvatar } from "@/backend/action/profile";
import { DeleteUserContact } from "@/backend/action/profile";

import { auth } from "@/auth";
import { GetUserByID } from "@/backend/fetch";
import Link from "next/link";

export async function ProfileCard(){
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);

    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">My Profile</CardTitle>
                <CardDescription>
                    Personal Information and Credentials
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-8">
                <div className="flex space-x-4 h-40 md:h-32">
                    <div className="w-fit h-fit relative">
                        {/* avatar */}
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={`${user?.image}`} />
                            <AvatarFallback>
                                <PersonIcon className="w-20 h-20 p-4"/>
                            </AvatarFallback>
                        </Avatar>
                        {/* update avatar */}
                        <Dialog>
                            <DialogTrigger className="absolute right-0 bottom-0 cursor-pointer bg-primary/60 text-primary-foreground rounded-full p-1" asChild>
                                <CameraIcon className="w-10 h-10"/>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="space-y-2">
                                    <DialogTitle>Do you want to change your avatar?</DialogTitle>
                                    <DialogDescription className="space-x-2">
                                        <InfoCircledIcon className="w-5 h-5 inline"/>
                                        <span>Image size must be lesser than 5mb</span>
                                    </DialogDescription>
                                </DialogHeader>
                                {/* Form */}
                               <div className="py-2">
                                    <FormState formState={UpdateUserAvatar}>
                                        <InputField type="hidden" name="id" value={user?.id!} />
                                        <InputField
                                        label="Upload an image" 
                                        type="file" 
                                        accept="image/png, image/jpeg"
                                        name="image"/>
                                        <Submit className="w-full">Update</Submit>
                                    </FormState>
                               </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="space-y-2">
                        <p className="text-2xl">{user?.firstName} {user?.lastName}</p>
                        <p className="text-muted-foreground">{user?.course?.name}</p>
                        <p className="text-muted-foreground">{user?.schoolId}</p>
                        <div className="flex gap-4 h-9">
                            <Button asChild>
                                <Link href="/update/user">
                                    Edit info
                                </Link>
                            </Button>
                            <Popover>
                            <PopoverTrigger>Contacts</PopoverTrigger>
                            <PopoverContent>
                                {(user?.contact && user.contact.length > 0) && (
                                    <>
                                        {user.contact.map((contact) => (
                                            <>
                                                <Separator />
                                                    <div className="py-2 relative">
                                                        <p className="text-muted-foreground">{contact.email}</p>
                                                        <p className="text-muted-foreground">{contact.phone}</p>
                                                        {/* delete contact */}
                                                        <AlertDialog>
                                                        <AlertDialogTrigger className="absolute top-4 right-4 cursor-pointer" asChild>
                                                            <MinusIcon className="w-6 h-6"/>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete your account
                                                                and remove your data from our servers.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <FormState formState={DeleteUserContact}>
                                                                <input type="hidden" name="id" value={contact.id} />
                                                                <AlertDialogFooter>
                                                                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                                                <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </FormState>
                                                        </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                <Separator />
                                            </>
                                        ))}
                                    </>
                                )}
                                {(user?.contact && user.contact.length === 0) && (
                                    <p>No contacts added yet 😔</p>
                                )}
                            </PopoverContent>
                            </Popover>
                            <Separator orientation="vertical"/>
                            <Popover>
                            <PopoverTrigger>More</PopoverTrigger>
                            <PopoverContent>
                                {user?.city && (
                                    <div className="flex gap-3">
                                        <TriangleRightIcon className="w-4 h-4"/>
                                        <span>{user?.city} {user?.province} {user?.country}</span>
                                    </div>
                                )}
                                {user?.birthdate && (
                                    <div className="flex gap-3">
                                        <TriangleRightIcon className="w-4 h-4"/>
                                        <span>{user?.birthdate?.toISOString().slice(0, 10)}</span>
                                    </div>
                                )}
                                {user?.bio && (
                                    <div className="flex gap-3">
                                        <TriangleRightIcon className="w-4 h-4"/>
                                        <span>{user?.bio}</span>
                                    </div>
                                )}
                                {(user?.bio && user.city &&  user.birthdate) && (
                                    <p>No data has been added yet! 😔</p>
                                )}
                            </PopoverContent>
                            </Popover>
                        </div>
                    </div>
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