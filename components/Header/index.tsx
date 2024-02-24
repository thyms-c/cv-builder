"use client"

import { useSession } from "next-auth/react"
import { ModeToggle } from "../shared/mode"
import Auth from "./auth"

export default function Header() {
  const { status: sessionStatus } = useSession()

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-6xl items-center">
          <div className="mr-4 hidden md:flex">asd</div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Auth />
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
