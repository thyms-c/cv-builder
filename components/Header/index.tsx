"use client"

import { useSession } from "next-auth/react"
import { Icons } from "../shared/icons"
import { ModeToggle } from "../shared/mode"
import Auth from "./auth"

export default function Header() {
  const { status: sessionStatus } = useSession()

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-6xl items-center">
          <div className="mr-4 hidden md:flex">
            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-transparent text-xl font-bold">
              CV-Builder
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
