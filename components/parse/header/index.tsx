"use client"

import { ChevronLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Icons } from "../../shared/icons"
import { ModeToggle } from "../../shared/mode"
import { buttonVariants } from "../../ui/button"
import Auth from "./auth"
import Download from "./download"

export default function Header() {
  const { status: sessionStatus } = useSession()

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost" })}
            >
              <ChevronLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Download/>
            <Auth />
            <ModeToggle />
            <a
              href="https://github.com/thyms-c/cv-builder"
              className="h-5 w-5 mr-2"
            >
              <Icons.gitHub />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
