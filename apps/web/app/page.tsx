"use client"
import { useQuery, Authenticated, Unauthenticated } from "convex/react"
import { api } from "@workspace/backend/convex/_generated/api"
import {SignInButton, UserButton} from "@clerk/nextjs"

export default function Page() {
  const users = useQuery(api.users.getMany)
  return (
    <>
    <Authenticated>
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 p-6">
      <UserButton />
      <p className="text-sm font-medium">web app — Convex connection</p>
      <pre className="max-w-sm overflow-auto rounded-md border p-4 text-xs">
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
    </Authenticated>
    <Unauthenticated>
      <p>User must be authenticated</p>
      <SignInButton>Sign in</SignInButton>
    </Unauthenticated>
    </>
  )
}
