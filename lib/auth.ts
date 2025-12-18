
import { NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export { authOptions };
export const getServerSession = authOptions.getServerSession;
