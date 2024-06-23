"use client";

import * as React from "react"
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label";

type Category = {
    category: string
}[]


export function SkillCategoryComboBox({category}: {category: Category}){
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return(
        <div className="grid gap-3 w-full">
            <Label>Category</Label>
            <Popover open={open} onOpenChange={setOpen}>
            <input type="hidden" name="category" value={value} />
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full relative"
                            >
                           <span className="w-[94%] text-start text-ellipsis overflow-hidden ...">
                            {value
                                    ? category.find((category) => category.category === value)?.category
                                    : "Select category..."}
                           </span>
                            <ChevronDownIcon className="absolute top-2 right-2 ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                            <CommandInput placeholder="Search course..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {category.map((item) => (
                                    <CommandItem
                                        key={item.category}
                                        value={item.category}
                                        onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        }}
                                    >
                                        <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.category ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {item.category}
                                    </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                            </Command>
                        </PopoverContent>
            </Popover>
        </div>
    );
}