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


import Link from "next/link";

export type Skill = {
    id: string,
    name: string,
    category: string
}

export const columns: ColumnDef<Skill>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const skill = row.original
       
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
                    onClick={() => navigator.clipboard.writeText(skill.name)}
                  >
                    Copy Skill
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
    }
]

