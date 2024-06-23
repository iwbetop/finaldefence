import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
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
import { Separator } from "../ui/separator";
import { InfoCircledIcon, MinusIcon } from "@radix-ui/react-icons";

import { GetSkills, GetUserByID } from "@/backend/fetch";

import { SkilLComboBox } from "../skill-combobox";
import { FormState } from "../form";
import { AddUserSkill, DeleteUserSkill } from "@/backend/action/profile";
import { Label } from "../ui/label";
import { Submit } from "../form-submit";

import { auth } from "@/auth";
import { GetUserSkills } from "@/backend/fetch";

export async function SkillCard(){
    const skills = await GetSkills();
    const session = await auth();
    const user = await GetUserByID(`${session?.user.id}`);
    const skill = await GetUserSkills(`${session?.user.id}`);
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">My Skill</CardTitle>
                <CardDescription>Personalize your skill set to showcase around the campus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">   
                <div>
                    <FormState formState={AddUserSkill}>
                        <div className="grid gap-3">
                            <Label>Select a skill</Label>
                            <SkilLComboBox props={skills}/>
                        </div>
                        <input type="hidden" name="userId" value={user?.id} />
                        <Submit>Add</Submit>
                    </FormState>
                </div>
                <div className="grid md:grid-cols-2 gap-3 p-6 border border-border rounded-lg">
                    {(skill && skill.length > 0) && (
                        <>
                            {skill.map((skill) => (
                                <div className="relative bg-accent p-1 rounded-sm">
                                    <span>{skill.skill.name}</span>
                                    <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <MinusIcon className="w-6 h-6 absolute top-1 right-4 cursor-pointer"/>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <FormState formState={DeleteUserSkill}>
                                        <AlertDialogFooter>

                                            <input type="hidden" name="id" value={skill.id} />
                                            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                            <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                        </FormState>
                                    </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ))}
                        </>
                    )}
                    {(skill && skill.length === 0) && (
                        <p className="text-sm text-muted-foreground">No skill has been added yet! 🥲</p>
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