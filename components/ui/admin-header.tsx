import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/auth";
import { Button } from "./button";

import { ModeToggle } from "../theme-toggle";

import { AdminNavigation } from "../admin-navigation";

export function AdminHeader(){
    return(
        <div className="flex justify-between px-6 pt-10">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Link href="/">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex w-6 h-6 relative">
                            <Image src="/udd.png" alt="udd" fill/>
                        </span>
                        <span>Universidad de Dagupan</span>
                    </div>
                </Link>
            </div>
            <div className="flex gap-3">
                <div>
                    <AdminNavigation />
                </div>
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