"use client";
import GoogleButton from "@/components/GoogleButton";
import Breadcrumbs from "@/components/layout/BreadCrumbs";
import { isValidEmail } from "@/utils/emailCheck";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const crumbs = [{ label: "Home", path: "/" }, { label: "Login" }];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    if (!isValidEmail(email)) {
      setErrorMessage("Email is invalid");

      return;
    }

    if (!password || password.length < 5) {
      setErrorMessage("Password is invalid. It should be at least 5 digits");

      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8 max-w-5xl mx-auto">
      <h1 className="mb-3 text-center uppercase">Login page</h1>
      <Breadcrumbs crumbs={crumbs} />
      <div className="py-20 grid grid-cols-2 md:py-10 md:grid-cols-1">
        <form
          className=" px-10 border-r border-gray-700 md:border-r-0"
          onSubmit={handleFormSubmit}
        >
          <h2 className="mb-5">Login with credentials</h2>
          <label className="mb-1">
            Email <span className="text-red-500	">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div className="py-5">
            <label className="mb-1">
              Password <span className="text-red-500	">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              disabled={loginInProgress}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button disabled={loginInProgress} type="submit" className="w-full	">
            Login
          </button>
          <p className="text-red-600 my-2">{errorMessage && errorMessage}</p>
        </form>
        <div className="md:mt-5 md:pt-5 md:border-t border-zinc-700	">
          <GoogleButton />
          <p className="mt-20 w-96 text-center mx-auto">
            Your personal data will be used to facilitate your work with the
            website and for other purposes described in our privacy policy.
          </p>
          <div className="text-center text-red-600 mt-5  pt-4">
            <Link className="underline hover:text-gray-300" href={"/register"}>
              Or sign up new account here &raquo;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
