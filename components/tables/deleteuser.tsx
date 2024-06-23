import { DeleteUser } from "@/backend/action/admin";
import { FormState } from "../form";
import { Button } from "../ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { auth } from "@/auth";
export async function DeleteUserForm({id} : {id: string}){
    const session = await auth();
    return(
        <FormState formState={DeleteUser} hasControl={false}>
            <input type="hidden" name="id" value={id} />
            <Button 
            type="submit"
            variant="ghost" 
            size="none" 
            className="p-0 m-0 cursor-pointer"
            disabled={session?.user.role !== "SUPERADMIN"}>
                    <span className="flex items-center gap-1 p-1 bg-destructive rounded">
                        <InfoCircledIcon className="w-4 h-4"/>
                        Delete
                    </span>
            </Button>
        </FormState>
    );
}