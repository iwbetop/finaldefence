"use client";

import { useFormStatus } from "react-dom";

import { 
    Button, ButtonProps 
} from "@/components/ui/button";

import { Component1Icon } from "@radix-ui/react-icons";

export function Submit(props: ButtonProps){
    const { pending } = useFormStatus();
    const { children } = props;

    return(
        <Button {...props}>
            {pending && <Component1Icon className="w-4 h-4 animate-spin"/>}
            {!pending && children}
        </Button>
    );
}