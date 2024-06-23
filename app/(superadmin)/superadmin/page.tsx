import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { DataTable } from "@/components/tables/admin-data-table";
  import {columns} from "@/components/tables/admin-columns"
  import { GETALLUSERSBYADMIN, GETALLUSERSBYSUPERADMIN } from "@/backend/fetch";
import { Separator } from "@/components/ui/separator";

import {columns as usercolumn} from "@/components/tables/user-columns"

export default async function SuperAdminPage(){
    const users = await GETALLUSERSBYSUPERADMIN();

    const data = await GETALLUSERSBYADMIN();

    let obj;
  
    const formatted = data.map(item => {
      obj = {
        id: item.id,
        emaiL: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        schoolId: item.schoolId,
        isAlumni: item.isAlumni,
        isArchieved: item.isArchieved,
        isEmailVerified: item.isEmailVerified,
        updatedAt: item.updatedAt,
        courseName: item.course?.name
      }
      return obj
    })
  

    return(
        <div className="p-10">
            <Card>
                <CardHeader>
                    <CardTitle>SUPER ADMIN | User role management</CardTitle>
                    <CardDescription>control who manages the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={users}/>
                </CardContent>
            </Card>
        </div>
    );
}