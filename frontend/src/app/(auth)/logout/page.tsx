"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "next/navigation";

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      logout();
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error?.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>{errorMessage ? <div>{errorMessage}</div> : null}</div>;
}
