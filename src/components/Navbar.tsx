import { getUserByEmail } from "@/actions";
import { auth, signOut } from "auth"
import Link from "next/link";

const Navbar = async () => {

    const session = await auth();

    const user = await getUserByEmail(session?.user?.email);

  return (
    <nav className="bg-gray-800 text-white px-10 py-5 flex justify-between p-4 items-center">
        <Link href="/" className="text-white hover:text-zinc-200 text-lg font-bold">
            NextGram
        </Link>
        <div>
            {user ? (
                <div className="flex gap-4 items-center">
                    <p>{user.name}</p>
                    <form
                        action={async () => {
                            'use server'
                            await signOut()
                        }}
                    >
                        <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded cursor-pointer">Sair</button>
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
