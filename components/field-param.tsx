"use client";

import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";

export function InputParamField({name}: {name: string}){
    const params = useSearchParams();
    return(
        <Input 
        type="hidden" 
        name={name} 
        className="hidden" 
        value={params.get(name)!}/>
    );
}