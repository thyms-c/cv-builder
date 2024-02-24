import { getSession } from "next-auth/react"

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession()
  const isAuthenticated = !!session

  return <>id</>
}
