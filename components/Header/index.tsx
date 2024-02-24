"use client"

import { useSession } from "next-auth/react"
import Auth from "./auth"

export default function Header() {
  const { status: sessionStatus } = useSession()

  return (
    <>
      {sessionStatus !== "loading" && (
        <div>
          <Auth />
        </div>
      )}
    </>
  )
}
