import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Home from "../components/home"

export default async function Page() {
  const session = await getSession()

  if (session) {
    redirect("/workspace")
  }
  return (
    <>
      <Home />
    </>
  )
}
