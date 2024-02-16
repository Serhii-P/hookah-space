"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/hookah-logo.jpg";
import User from "../icons/User";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isValidEmail } from "@/utils/emailCheck";
import CartButton from "../CartButton";
import FavButton from "../FavButton";
import { Squash as Hamburger } from "hamburger-react";
import LogoutButton from "../LogoutButton";
import SideMenu from "./SideMenu";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import HeaderMenuItem from "./skeleton/HeaderMenuItem";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/my-account"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <LogoutButton logOut={() => signOut()} />
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link className="uppercase mb-3 block" href={"/login"}>
          Login
        </Link>

        <Link
          href={"/register"}
          className="text-red-500 hover:text-red-700 text-sm	"
        >
          Create new account here &raquo;
        </Link>
      </>
    );
  }
}

export default function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [mobMenuIsOpen, setMobMenuIsOpen] = useState(false);

  useEffect(() => {
    setLoginInProgress(true)
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        setLoginInProgress(false)
      });
    });
  }, []);

  const categoryNamesToDisplay = [
    "E-cigarettes",
    "Tobaccos",
    "E-liquids",
    "Hookas",
    "Coals",
    "Bowls",
  ];

  const displayedCategories = categories.filter((category) => {
    return categoryNamesToDisplay.includes(category.name);
  });

  // async function handleFormSubmit(ev) {
  //   ev.preventDefault();
  //   setLoginInProgress(true);

  //   if (!isValidEmail(email)) {
  //     setErrorMessage("Email is invalid");

  //     return;
  //   }

  //   if (!password || password.length < 5) {
  //     setErrorMessage("Password is invalid. It should be at least 5 digits");

  //     return;
  //   }

  //   await signIn("credentials", { email, password, callbackUrl: "/" });

  //   setLoginInProgress(false);
  // }

  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header
        className="text-white bg-black flex justify-between items-center p-4
      sticky top-0 z-10
      "
      >
        <nav className="flex w-full">
          <Hamburger
            size={21}
            toggled={mobMenuIsOpen}
            toggle={setMobMenuIsOpen}
          />
          <Link
            href="/"
            className="flex items-center lg:mx-auto md:ms-auto md:mr-0"
          >
            <Image src={logo} alt="hookah space" width={200} />
          </Link>
          <div
            className="ms-8 flex gap-8 font-semibold items-center
        2xl:gap-2 text-sm	2xl:text-xs	2xl:ms-4 lg:hidden
        "
          >
            <Link
              href="/"
              className="hover:text-gray-300 
           border-b-2 border-transparent	hover:border-red-500	
           2xl:ms-5"
            >
              HOME
            </Link>
            {loginInProgress && <HeaderMenuItem cards={6}/>}
            {displayedCategories.map((category) => (
              <Link
                key={category._id}
                href={`/products/${category._id}`}
                className="flex items-center gap-1 group"
              >
                <div className="h-7 w-7 2xl:h-5 2xl:w-5">
                  {category.name === "E-cigarettes" && (
                    <Image
                      src="/e-cig-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Tobaccos" && (
                    <Image
                      src="/tobacco-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "E-liquids" && (
                    <Image
                      src="/liquid-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Hookas" && (
                    <Image
                      src="/hookah-icon.webp"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Coals" && (
                    <Image src="/coal-icon.png" alt="" width={30} height={30} />
                  )}
                  {category.name === "Bowls" && (
                    <Image src="/bowl-icon.png" alt="" width={30} height={30} />
                  )}
                </div>
                <span
                  className="group-hover:text-gray-300 uppercase
          border-b-2 border-transparent	group-hover:border-red-500	
          "
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
        <nav className="flex gap-8 2xl:gap-4 lg:hidden">
          <div className="relative cursor-pointer group">
            {status === "authenticated" ? (
              <Link href={"/my-account"}>
                <User />
              </Link>
            ) : (
              <Link href={"/login"}>
                <User />
              </Link>
            )}
            <div
              className="hidden absolute z-50 w-[350px] 
              right-0 mt-4 flex-col bg-gray-900 rounded-sm
    p-6 shadow-xl group-hover:block before:content-[''] 
    before:block before:absolute before:w-full before:h-4 
    before:-top-4 before:bg-transparent text-white"
            >
              <AuthLinks status={status} userName={userName} />
              <hr className="mt-2 mb-4 border-gray-600" />
              <div>
                {status === "authenticated" ? (
                  <Link
                    className="bg-zinc-100 text-center text-black mt-4 px-8 py-2 rounded-full w-auto mx-auto block hover:bg-zinc-200"
                    href={"/my-account"}
                  >
                    My account
                  </Link>
                ) : (
                  <div>
                    <Link
                      className="bg-basicGreen text-center mt-4 px-8 py-2 rounded-full w-auto mx-auto block hover:bg-green-500"
                      href={"/login"}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link href="/favorites">
            <FavButton />
          </Link>
          <Link href="/cart">
            <CartButton />
          </Link>
        </nav>

        {mobMenuIsOpen && (
          <SideMenu
            setMobMenuIsOpen={setMobMenuIsOpen}
            mobMenuIsOpen={mobMenuIsOpen}
          >
            <Link
              href="/"
              className="border-b border-zinc-600 block py-3"
              onClick={() => setMobMenuIsOpen(false)}
            >
              HOME
            </Link>
            {displayedCategories.map((category) => (
              <Link
                key={category._id}
                href={`/products/${category._id}`}
                className="flex items-center gap-2 group border-b border-zinc-600	py-3"
                onClick={() => setMobMenuIsOpen(false)}
              >
                <div className="h-7 w-7 ">
                  {category.name === "E-cigarettes" && (
                    <Image
                      src="/e-cig-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Tobaccos" && (
                    <Image
                      src="/tobacco-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "E-liquids" && (
                    <Image
                      src="/liquid-icon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Hookas" && (
                    <Image
                      src="/hookah-icon.webp"
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  {category.name === "Coals" && (
                    <Image src="/coal-icon.png" alt="" width={30} height={30} />
                  )}
                  {category.name === "Bowls" && (
                    <Image src="/bowl-icon.png" alt="" width={30} height={30} />
                  )}
                </div>
                <span
                  className="group-hover:text-gray-300 uppercase
          border-b-2 border-transparent	group-hover:border-red-500	
          "
                >
                  {category.name}
                </span>
              </Link>
            ))}
            <div className="py-3 border-b border-zinc-600">
              {status === "authenticated" ? (
                <div>
                  <Link
                    href={"/my-account"}
                    onClick={() => setMobMenuIsOpen(false)}
                    className="border-b border-zinc-600 pb-3 flex gap-2"
                  >
                    <User />
                    <span>My profile</span>
                  </Link>

                  <LogoutButton logOut={() => signOut()} />
                </div>
              ) : (
                <Link href={"/login"} onClick={() => setMobMenuIsOpen(false)}>
                  Login/Register
                </Link>
              )}
            </div>
          </SideMenu>
        )}
      </header>
    </>
  );
}
