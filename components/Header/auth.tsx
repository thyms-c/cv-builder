"use client"

import { Avatar } from "@radix-ui/react-avatar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

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
    return (
      <>
        <div className="flex justify-center items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={session.user.image!}
              className="h-8 w-8 rounded-lg"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            onClick={() => signOut()}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => signIn("google")}
        variant="outline"
      >
        Join us!
      </Button>
    </>
  )
}
