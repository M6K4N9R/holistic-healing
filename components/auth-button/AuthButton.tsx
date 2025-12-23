"use client";

import { signOut, signIn, useSession } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AuthButton({ className, ...props }: AuthButtonProps) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button onClick={() => signOut()} className="btn-logout" {...props}>
        Sign out
      </button>
    );
  }

  return (
    <button onClick={() => signIn()} className="btn-login" {...props}>
      Sign in
    </button>
  );
}
