"use server";

import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

type FormState = {
    message: string;
    type: string
};

const prisma = new PrismaClient();

export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) return null;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

export async function updateUserProfile(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  return {message: "Perfil atualizado com sucesso!", type: "success"};
}
