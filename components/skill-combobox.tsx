"use client"
 
import * as React from "react"

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SkillBox = {
    id: string,
    name: string,
    category: string
}[]

export function SkilLComboBox({props}: {props: SkillBox}){
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <input type="hidden" value={data} name="id"/>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-1/2 justify-between"
            >
              {value
                ? props.find((skill) => skill.name === value)?.name
                : "Select skill..."}
              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Skill..." />
              <CommandList>
                <CommandEmpty>No skill found.</CommandEmpty>
                <CommandGroup>
                  {props.map((skill) => (
                    <CommandItem
                      key={skill.id}
                      value={skill.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        setData(skill.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === skill.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {skill.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
}