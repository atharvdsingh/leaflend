// next-auth.d.ts
import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;          // ✅ your custom id
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;            // ✅ your custom id
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;            // ✅ store user id in JWT
  }
}
