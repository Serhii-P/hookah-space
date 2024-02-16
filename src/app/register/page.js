"use client";
import GoogleButton from "@/components/GoogleButton";
import Breadcrumbs from "@/components/layout/BreadCrumbs";
import { isValidEmail } from "@/utils/emailCheck";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const crumbs = [{ label: "Home", path: "/" }, { label: "Register" }];

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    if (!isValidEmail(email)) {
      setErrorMessage("Email is invalid");
      setCreatingUser(false);

      return;
    }

    if (!password || password.length < 5) {
      setErrorMessage("Password is invalid. It should be at least 5 digits");
      setCreatingUser(false);

      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.status === 500) {
        setErrorMessage("This email is already registered");
      }
      if (response.status === 200) {
        setErrorMessage("");
        setUserCreated(true);

        router.push("/");
      }

      setCreatingUser(false);
    } catch (error) {
      setErrorMessage("Error, try again");
      setError(true);

      console.log(error);
    }
  }

  return (
    <section className="mt-8 max-w-5xl mx-auto">
      <h1 className="mb-3 text-center uppercase">Register</h1>
      <Breadcrumbs crumbs={crumbs} />

      <div className="py-20 grid grid-cols-2 md:py-10 md:grid-cols-1">
        <form
          className=" px-10 border-r border-gray-700 md:border-r-0"
          onSubmit={handleFormSubmit}
        >
          <h2 className="mb-5">Register new user</h2>

          {userCreated && (
            <div className="my-4 text-center">
              User created.
              <br />
              Now you can{" "}
              <Link className="underline" href={"/login"}>
                Login &raquo;
              </Link>
            </div>
          )}
          {error && (
            <div className="my-2 text-center text-red-500">
              An error has occurred.
              <br />
              Please try again later
            </div>
          )}
          <label className="mb-1">
            Email <span className="text-red-500	">*</span>
          </label>
          <input
            type="email"
            placeholder="email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div className="py-5">
            <label className="mb-1">
              Password <span className="text-red-500	">*</span>
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              disabled={creatingUser}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button type="submit" disabled={creatingUser} className="w-full	">
            Register
          </button>
          <p className="text-red-600 my-2">{errorMessage && errorMessage}</p>
        </form>
        <div className="md:mt-5 md:pt-5 md:border-t border-zinc-700	">
          <GoogleButton />

          <div className="text-center mt-20 md:mt-10  pt-4">
            Existing account?{" "}
            <Link className="underline hover:text-gray-300" href={"/login"}>
              Login here &raquo;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
