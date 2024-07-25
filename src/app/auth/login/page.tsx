"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Adresse mail invalide" }),
  password: z.string().min(8, { message: "Mot de passe invalide" }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginSchema) });

  async function submitHandler(data: TLoginSchema) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(res);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Se Connecter</h1>
          <p className="text-balance text-muted-foreground">
            Entrez vos informations pour vours connecter
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <Link
                href={"/auth/forgot-password"}
                className="ml-auto inline-block text-sm underline"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Connexion
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n&apos;avez pas de compte?{" "}
          <Link href={"/auth/register"} className="underline">
            Inscrivez-vous
          </Link>
        </div>
        <Link href={"/"} className={"text-center text-sm underline"}>
          Page d&apos;Accueil
        </Link>
      </div>
    </div>
  );
}

export default Login;
