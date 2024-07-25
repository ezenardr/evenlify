"use server";
import { type TRegisterUserSchema } from "@/app/auth/register/page";
import { database } from "@/database/databaseConnection";
import { users } from "@/database/schema";
import { v4 as uuid } from "uuid";
import { hash } from "argon2";

export async function RegisterUser(formData: TRegisterUserSchema) {
  try {
    await database.insert(users).values({
      user_id: uuid(),
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: await hash(formData.password),
    });
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la création de votre compte.",
    );
  }
}
