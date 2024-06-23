import { columns } from "@/components/tables/user-columns";
import { DataTable } from "@/components/tables/user-data-table";

import { GETALLUSERSBYADMIN } from "@/backend/fetch"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

export default async function UserTablePage() {
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

  return (
    <div className="container mx-auto py-10">
      <Card>
      <CardHeader>
        <CardTitle className="text-2xl">User Table</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <DataTable columns={columns} data={formatted} />
      </CardContent>
    </Card>
    </div>
  )
}
