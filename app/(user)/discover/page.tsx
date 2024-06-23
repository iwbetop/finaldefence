import { getUsersWithSameCourse } from "@/backend/fetch";
import { GetUserByID } from "@/backend/fetch";
import { auth } from "@/auth";
import { GetUserSkills } from "@/backend/fetch";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {columns} from "@/components/tables/discovery-columns"
import { DataTable } from "@/components/tables/discovery-data";

export default async function Discover(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!);
    const skills = await GetUserSkills(session?.user?.id!);
    const users = await getUsersWithSameCourse(
        user?.id!, user?.courseId!, skills[0].skill.category
    );

    let obj;

  const formatted = users.map(item => {
    obj = {
      id: item.id,
      emaiL: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      courseName: item.course?.name
    }
    return obj
  })
    return(
        <div className="p-10">
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl">People you may want to know</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={formatted}/>
            </CardContent>
            </Card>
        </div>
    );
}