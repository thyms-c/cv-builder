"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

export default function Auth() {
  const [localOpen, setLocalOpen] = useState(false)
  const { data: session, status: sessionStatus } = useSession()

  useHotkeys(
    "u",
    () => setLocalOpen((prev) => !prev),
    {
      enabled: sessionStatus === "authenticated",
      preventDefault: true,
    },
    [sessionStatus],
  )

  useHotkeys(
    "q",
    () => signOut(),
    {
      enabled: sessionStatus === "authenticated" && localOpen,
      preventDefault: true,
    },
    [sessionStatus, localOpen],
  )

  useHotkeys(
    "l",
    () => signIn("google"),
    {
      enabled: sessionStatus === "unauthenticated",
      preventDefault: true,
    },
    [sessionStatus],
  )

  if (session && sessionStatus === "authenticated") {
    return <>is Auth</>
  }

  return <>is not Auth</>
}
