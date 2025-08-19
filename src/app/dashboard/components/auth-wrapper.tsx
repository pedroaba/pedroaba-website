import { auth, signOut } from '@pedroaba/lib/authjs'
import { redirect } from 'next/navigation'

type AuthWrapperProps = {
  children: React.ReactNode | React.ReactNode[]
}

export async function AuthWrapper({ children }: AuthWrapperProps) {
  const session = await auth()
  if (!session?.user) {
    await signOut()

    return redirect('/auth/sign-in')
  }

  return <>{children}</>
}
