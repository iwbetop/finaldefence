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
    if(user?.preferences?.privacy !== "PRIVATE"){
        return(
            <div className="p-10 max-w-4xl w-full mx-auto">
                <Card id="card">  
                <CardHeader>
                    <CardTitle className="text-2xl">Student's Data</CardTitle>
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
                        </div>
                    </div>
                    </CardContent>
            </Card>
            </div>
        );
    }
    return (
        <div>
            this user is private!
        </div>
    );
  }