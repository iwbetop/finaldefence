"use client"
 
import { ColumnDef } from "@tanstack/react-table";

import { DotsHorizontalIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FormState } from "../form";
import { ArchieveUser, DeleteUser, LockUser } from "@/backend/action/admin";
import { DeleteUserForm } from "./deleteuser";
import { useRouter } from "next/navigation";

import Link from "next/link";

export type User = {
    id: string;
    emaiL: string;
    firstName: string;
    lastName: string;
    schoolId: string;
    isAlumni: boolean;
    isArchieved: boolean;
    isEmailVerified: boolean;
    updatedAt: Date;
    courseName: string | undefined;
}


export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "emaiL",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "schoolId",
      header: "School ID",
    },
    {
      accessorKey: "isEmailVerified",
      header: "verified",
    },
    {
      accessorKey: "courseName",
      header: "Course",
    },
    {
      accessorKey: "isAlumni",
      header: "Alumni?",
    },
    {
      accessorKey: "updatedAt",
      header: ({column}) => {
        return(
          <div>
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated At
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        if(row.getValue("updatedAt") instanceof Date){
          const updatedAt = new Date(row.getValue("updatedAt"));
          const formatted = updatedAt.toDateString()
          return <div className="font-medium">{formatted}</div>
        }
        return <div className="text-right font-medium">N/A</div>
      },

    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            const router = useRouter();
       
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/view/${user.id}`)}
                  >
                    View Students data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/admin/update/${user.id}`}>
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                      <FormState formState={ArchieveUser} hasControl={false}>
                          <input type="hidden" name="id" value={user.id} />
                         <Button type="submit" variant="ghost" size="none">{user.isArchieved ? "Unarchieve" : "Archieve"}</Button>
                      </FormState>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
    }
]