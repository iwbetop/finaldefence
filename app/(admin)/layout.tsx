import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import { AdminHeader } from "@/components/ui/admin-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFiltering } from "@/components/admin-search-filtering";
import { GetCourses, GetUsers } from "@/backend/fetch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <div className="max-w-6xl w-full mx-auto">
            <AdminHeader />
            {children}
          </div>  
        </ThemeProvider>
      </body>
    </html>
  );
}
