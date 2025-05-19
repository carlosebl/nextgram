import { auth, signOut } from "auth"
import Link from "next/link";

const Navbar = async () => {

    const session = await auth();
  return (
    <nav className="bg-gray-800 text-white flex justify-between p-4 items-center">
        <Link href="/" className="text-white text-lg font-bold">Home</Link>
        <div>
            {session && session.user ? (
                <div className="flex items-center">
                    <p>{session.user.name}</p>
                    <form
                        action={async () => {
                            'use server'
                            await signOut()
                        }}
                    >
                        <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded cursor-pointer ml-2">Sair</button>
                    </form>
                </div>
            ) : (
                <Link href='/signIn' className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded cursor-pointer">Entrar</Link>
            )}
        </div>
    </nav>
  )
}

export default Navbar
