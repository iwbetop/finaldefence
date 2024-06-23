"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description:
      "Go back to dashboard.",
  },
  {
    title: "Create User",
    href: "/admin/create",
    description:
      "Create a new user.",
  },
  {
    title: "Create new Items",
    href: "/admin/create/items",
    description:
      "Create items such as new course and skills.",
  }
]

export function AdminNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Welcome</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-5">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="http://cdd.edu.ph/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Universidad de Dagupan
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Over the past 36 years, Colegio de Dagupan has unarguably set the standards in providing quality education to the people of Dagupan and its neighboring towns. it is dedicated to live by its mission statement, stand by its philosophy and, preserve a steadfast commitment to Excellence in Education.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="https://udd.steps.com.ph/login" title="STEP">
                    Student Teacher Educational Portal. Boost Your Learning to New Heights.
              </ListItem>
              <ListItem href="http://mycdd.cdd.edu.ph/PARENTS_STUDENTS/" title="PORTAL">
                    Student Academic Records
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Navigate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
