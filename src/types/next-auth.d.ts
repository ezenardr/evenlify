import { type UserAuth } from "@/types/UserAuth";

declare module "next-auth" {
  interface Session {
    user: UserAuth;
  }
}
declare module "next-auth/jwt" {
  type JWT = UserAuth;
}
