import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { auth } from "@/auth";
  import { GetUserByID } from "@/backend/fetch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, InfoCircledIcon, PersonIcon, LockOpen1Icon, LockClosedIcon, CheckIcon, Cross2Icon, ArchiveIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormState } from "@/components/form";
import { ArchieveUser, LockUser, VerifyUser } from "@/backend/action/admin";
import { Button } from "@/components/ui/button";
import { DeleteUserForm } from "@/components/tables/deleteuser";
  export default async function ViewUser({params}: {params:{id: string}}){
    const user = await GetUserByID(`${params.id}`)
    return(
        <div className="p-10 max-w-4xl w-full mx-auto">
            <Card id="card">  
            <CardHeader>
                <CardTitle className="text-2xl">User's Data</CardTitle>
                <CardDescription>
                    Personal Information and Credentials
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-8">
                <div className="flex space-x-4 h-40 md:h-fit">
                    <div className="w-fit h-fit relative">
                        {/* avatar */}
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={`${user?.image}`} />
                            <AvatarFallback>
                                <PersonIcon className="w-20 h-20 p-4"/>
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="space-y-2">
                        <p className="text-2xl">{user?.firstName} {user?.lastName}</p>
                        <p className="text-muted-foreground">{user?.course?.name}</p>
                        <p className="text-muted-foreground">{user?.schoolId}</p>
                        {user?.isEmailVerified ? (
                            <p className="flex items-center gap-1 text-emerald-500">
                                <CheckIcon className="w-4 h-4"/>
                                this user is verified
                            </p>
                        ) : (
                            <p>
                                <Cross2Icon className="w-4 h-4"/>
                                this user is not verified yet
                            </p>
                        )}
                        <div className="flex gap-3">
                            <FormState formState={LockUser} hasControl={false}>
                                <input type="hidden" name="id" value={user?.id} />
                                <Button type="submit" variant="ghost" size="none" className="p-1 bg-primary m-0">{user?.lock ? 
                                <>
                                    <LockOpen1Icon className="w-4 h-4"/>
                                    Unlock
                                </>: 
                                <>
                                    <LockClosedIcon className="w-4 h-4"/>
                                    Lock
                                </>
                                }</Button>
                            </FormState>
                            <FormState formState={VerifyUser} hasControl={false}>
                                <input type="hidden" name="id" value={user?.id} />
                                <Button disabled={user?.isEmailVerified} type="submit" variant="ghost" size="none" className="p-1 bg-emerald-500 m-0">
                                    <CheckIcon className="w-4 h-4"/>
                                    Verify user
                                </Button>
                            </FormState>
                            <FormState formState={ArchieveUser} hasControl={false}>
                                <input type="hidden" name="id" value={user?.id} />
                                <Button type="submit" variant="ghost" size="none" className="p-0 m-0">{user?.isArchieved ? (
                                    <span className="bg-emerald-900/3 flex items-center gap-1 p-1 rounded">
                                        <ArchiveIcon className="w-4 h-4"/>
                                        <p>Unarchieve</p>
                                    </span>
                                ) : (
                                    <span className="bg-emerald-900 flex items-center gap-1 p-1 rounded">
                                        <ArchiveIcon className="w-4 h-4"/>
                                        <p>Archieve</p>
                                    </span>
                                )}</Button>
                            </FormState>
                            <DeleteUserForm id={user?.id!}/>
                        </div>
                    </div>
                </div>
                </CardContent>
        </Card>
        </div>
    );
  }