"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser } from "@/actions/UsersActions";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const RegisterUserSchema = z
  .object({
    first_name: z.string().min(3, { message: "Champ requis" }),
    last_name: z.string().min(3, { message: "Champ requis" }),
    phone: z.string().min(8, { message: "Numéro de téléphone invalide" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    confirm_password: z.string(),
    has_accepted: z.boolean({ required_error: "Veuillez accepter pardon" }),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Les mots de passe doivent être identique",
    path: ["confirm_password"],
  })
  .refine(({ has_accepted }) => has_accepted, {
    message: "Veuillez accepter pardon",
    path: ["has_accepted"],
  });

export type TRegisterUserSchema = z.infer<typeof RegisterUserSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterUserSchema>({
    resolver: zodResolver(RegisterUserSchema),
  });
  const { pending } = useFormStatus();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function submitHandler(data: TRegisterUserSchema) {
    setIsLoading(true);
    RegisterUser(data)
      .then(() => router.push("/auth/login"))
      .catch((e) => toast.error(e.message));
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Créer un Compte</h1>
            <p className="text-balance text-muted-foreground">
              Entrez vos informations pour créer un compte
            </p>
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Prénom</Label>
                <Input
                  id="first-name"
                  className={`${errors.first_name && "border-red-500"}`}
                  placeholder="Doe"
                  {...register("first_name")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nom de famille</Label>
                <Input
                  id="last-name"
                  className={`${errors.last_name && "border-red-500"}`}
                  placeholder="John"
                  {...register("last_name")}
                />
              </div>
              {(errors.last_name || errors.first_name) && (
                <span className="text-red-500 text-xs">Champ requis</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telephone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={"22228888"}
                className={`${errors.phone && "border-red-500"}`}
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className={`${errors.email && "border-red-500"}`}
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
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                className={`${errors.password && "border-red-500"}`}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">
                Vérifiez votre mot de passe
              </Label>
              <Input
                id="confirm_password"
                type="password"
                className={`${errors.confirm_password && "border-red-500"}`}
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-xs">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            <div>
              <div className="items-top flex space-x-2">
                <input
                  type={"checkbox"}
                  id={"has_accepted"}
                  {...register("has_accepted")}
                />
                {/*<Checkbox id="terms1"  />*/}
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="has_accepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    J&apos;accepte les termes et conditions
                  </label>
                  <label
                    htmlFor={"has_accepted"}
                    className="text-sm text-muted-foreground"
                  >
                    En acceptant, vous reconnaissez avoir compris et accepté la
                    politique de confidentialité d&apos;Evenlify.
                  </label>
                </div>
              </div>
              {errors.has_accepted && (
                <span className="text-red-500 text-xs">
                  {errors.has_accepted.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              disabled={pending}
              className="w-full disabled:bg-red-600"
            >
              Créer un compte
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte?{" "}
            <Link href={"/auth/login"} className="underline">
              Connexion
            </Link>
          </div>
          <Link href={"/"} className={"text-center text-sm underline"}>
            Page d&apos;Accueil
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
