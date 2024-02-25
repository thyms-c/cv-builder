import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Workspace from "../../components/workspace"

export default async function Page() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <>
      <Workspace />
    </>
  )
}
