"use client";

import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type FormStateProps = {
    formState: (
        state: any,
        formData: FormData
    ) => Promise<{
        message: any
    }>,
    children: React.ReactNode,
    hasControl?: boolean,
}

export function FormState(props: FormStateProps){

    const { formState, children, hasControl = true } = props;
    const [state, formAction] = useFormState(formState, { message: "" });

    return(
        <form action={formAction}>
            {hasControl && <div className="space-y-4">
                {children}
            </div>}
            {!hasControl && <div>
                {children}
            </div>}
            {(state) && (
                <p className={cn(
                    "mt-4 text-sm",
                    (typeof state !== "string" && `${state.message}`.length > 0) ? "text-destructive" :
                    "text-emerald-500"
                )}>{state.message}</p>
            )}
        </form>
    );
}

export function FormControl({
    children
}: { children: React.ReactNode }){
    return(
        <div className="flex items-center flex-col md:flex-row gap-3 w-full">
            {children}
        </div>
    );
}

interface FormLinkProps extends React.ComponentPropsWithoutRef<typeof Button>{
    href: string
}

export function FormLink(props: FormLinkProps){
    const { push } = useRouter();
    const { href } = props;
    return(
        <div>
            <Button {...props} onClick={() => push(href)}/>
        </div>
    );
}

