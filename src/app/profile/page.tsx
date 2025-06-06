import { getUserByEmail } from "@/actions";
import ProfileForm from "@/components/ProfileForm";
import { auth } from "auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user?.email) return redirect("/");

  const user = await getUserByEmail(session.user.email);

  if (!user) return redirect("/");

  return (
    <div className="w-[35rem] mx-auto my-10 p-4">
      <h1 className="text-[2rem] leading-10 font-semibold text-center">Perfil de {user.name}</h1>
      {user.image && (
        <div className="w-full flex justify-center my-6">
          <Image
            src={user.image}
            alt={`Perfil de ${user.name}`}
            width={320}
            height={320}
            className="w-80 h-80 p-4 object-cover"
          />
        </div>
      )}
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
