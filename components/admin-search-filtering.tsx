"use client";
// SchoolID, UserisEmailVerified, Userisarchieved, UserisLock, email, alumni, course

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon, InfoCircledIcon, MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Course = {
    id: string,
    name: string,
    image: string | null
}

export function SearchFiltering({courses} : {courses: Course[]}){
    // for courseId
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("");
    const [course, setCourse] = useState("dump");
    // for others
    const [ isEmailVerified, setIsEmailVerified ] = useState(false);
    const [ isArchieved, setIsArchieved ] = useState(false);
    const [ isLock, setIsLock ] = useState(false);
    const [ isAlumni, setIsAlumni ] = useState(false);
    const [ idOrEmail, setidOrEmail ] = useState("dump");

    const router = useRouter();

    const handleEmailVerifiedChange = () => {
        setIsEmailVerified(!isEmailVerified);
    }

    const handleSetIdOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setidOrEmail(e.target.value);
    }

    const handleArchieved = () => {
        setIsEmailVerified(!isArchieved);
    }

    const handleLock = () => {
        setIsLock(!isLock);
    }

    const handleAlumni = () => {
        setIsAlumni(!isAlumni);
    }
    
    const handleClick = () => {
        if(idOrEmail.length === 0){
            setidOrEmail("dump")
        }
        if(course.length === 0){
            setCourse("dump")
        }
        router.push(`/admin/${idOrEmail}/${course}/${isEmailVerified}/${isArchieved}/${isLock}/${isAlumni}`);
    }

    return(
        <div>
            <div className="space-y-2">
                {/* School ID */}
                <Input placeholder="Search via School ID or their CDD Email" onChange={handleSetIdOrEmail}/>
                {/* course params */}
                <div className="flex items-center gap-5 py-2">
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[400px] relative"
                            >
                           <span className="w-[94%] text-start text-ellipsis overflow-hidden ...">
                            {value
                                    ? courses.find((course) => course.name === value)?.name
                                    : "Select course..."}
                           </span>
                            <ChevronDownIcon className="absolute top-2 right-2 ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-6/12 p-0">
                            <Command>
                            <CommandInput placeholder="Search course..." />
                            <CommandEmpty>No course found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {courses.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item.name}
                                        onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setCourse(currentValue === value ? "" : item.id)
                                        setOpen(false)
                                        }}
                                    >
                                        <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.name ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {item.name}
                                    </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                            </Command>
                        </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        {/* Email Verified */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isEmailVerified" onClick={handleEmailVerifiedChange}/>
                            <label
                                htmlFor="isEmailVerified"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate ..."
                            >
                                Email Verified
                            </label>
                        </div>
                        {/* Archieved */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isArchieved" onClick={handleArchieved}/>
                            <label
                                htmlFor="isArchieved"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Archieved
                            </label>
                        </div>
                    </div>
                     <div className="space-y-2">
                        {/* Lock */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isLock" onClick={handleLock}/>
                            <label
                                htmlFor="isLock"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Lock
                            </label>
                        </div>
                        {/* Alumni */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isAlumni" onClick={handleAlumni}/>
                            <label
                                htmlFor="isAlumni"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Alumni
                            </label>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Button onClick={handleClick} variant="default" size="icon" asChild>
                            <MagnifyingGlassIcon className="w-6 h-6 p-1 cursor-pointer" />
                        </Button>
                        <Button onClick={() => router.push("/admin")} variant="default" size="icon" asChild>
                            <ReloadIcon className="w-6 h-6 p-2 cursor-pointer"/>
                        </Button>
                     </div>
                </div>
                <span className="py-1 inline-flex gap-2 items-center text-sm text-muted-foreground">
                    <InfoCircledIcon className="w-4 h-4"/>
                    <span>You can leave other inputs empty to select specific attribute</span>
                </span>
            </div>
        </div>
    );
}