import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { FormState } from "@/components/form";
import { InputField } from "@/components/field";
import { Submit } from "@/components/form-submit";
import { CreateSkill } from "@/backend/action/admin";
import { SkillCategoryComboBox } from "@/components/skill-category-combobox";
import { GetSkillsCategory } from "@/backend/fetch";

import { DataTable } from "@/components/tables/skill-data-table";
import { columns } from "@/components/tables/skill-column";
import { GetSkills } from "@/backend/fetch";

  export default async function CreateItemPage(){
    const skills = await GetSkills();
    const categories = await GetSkillsCategory();
    return(
       <div className="p-10 max-w-4xl mx-auto">
            <div>
                <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Skill Management</CardTitle>
                    <CardDescription>add many skills for students to choose from</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={CreateSkill}>
                        <div className="flex gap-3">
                            <InputField label="Skill name" type="text" name="name" placeholder=" name"/>
                            <SkillCategoryComboBox category={categories} />
                        </div>
                        <Submit className="w-full">Create</Submit>
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
            <div>
                <DataTable columns={columns} data={skills}/>
            </div>
       </div>
    );
  }