import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/auth";
import { Button } from "./ui/button";

import { ModeToggle } from "./theme-toggle";

import { Navigation } from "./ui/navigation";
export function Header(){
    return(
        <div className="flex justify-between px-6 pt-10">
            <div className="space-y-6">
                <Link href="/">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex w-6 h-6 relative">
                            <Image src="/udd.png" alt="udd" fill/>
                        </span>
                        <span>Universidad de Dagupan</span>
                    </div>
                </Link>
                <div>
                    <Navigation />
                </div>
            </div>
            <div className="flex gap-3">
                <ModeToggle />
                <form action={async() => {
                    "use server"
                    await signOut()
                }}>
                    <Button size="sm">
                        SignOut
                    </Button>
                </form>
            </div>
        </div>
    );
}