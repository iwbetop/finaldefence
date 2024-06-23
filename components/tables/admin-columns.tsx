"use client"
 
import { ColumnDef } from "@tanstack/react-table";

import { DotsHorizontalIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChangeRoles } from "@/backend/action/admin";
import { FormState } from "../form";
import { ArchieveUser, DeleteUser, LockUser } from "@/backend/action/admin";
import { DeleteUserForm } from "./deleteuser";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link";
import { Submit } from "../form-submit";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "SUPERADMIN" | "USER"
}


export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
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
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        )
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
                    View User data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/admin/update/${user.id}`}>
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Sheet>
                  <SheetTrigger>Change role</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Manage who has access</SheetTitle>
                    </SheetHeader>
                    <FormState formState={ChangeRoles}>
                      <input type="hidden" name="id" value={user.id} />
                      <Select name="role" defaultValue={user.role}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                    <Submit>Update</Submit>
                    </FormState>
                  </SheetContent>
                </Sheet>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
    }
]