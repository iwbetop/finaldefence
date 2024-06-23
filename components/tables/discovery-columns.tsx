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
    emaiL: string;
    firstName: string;
    lastName: string;
    courseName: string | undefined;
}


export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
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
                    onClick={() => router.push(`/discover/${user.id}`)}
                  >
                    View User data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
    }
]