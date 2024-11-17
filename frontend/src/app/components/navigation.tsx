"use client";
import Link from "next/link";
import { useAuthStore } from "../stores/authStore";
import { useState } from "react";

export const Navigation = () => {
  const authenticated = useAuthStore((state) => state.authenticated);
  const user = useAuthStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="flex justify-between">
      <div className="text-left">
        <Link href="/" className="mr-10 font-bold">
          ReadSwap
        </Link>
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/exchanges" className="mr-4">
          Exchanges
        </Link>
      </div>

      <div className="text-right">
        {authenticated ? (
          <>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user?.name}
                </button>
              </div>
              {dropdownOpen ? (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-black"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-sm text-black"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="mr-4">
              Login
            </Link>
            <Link href="/register" className="mr-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
