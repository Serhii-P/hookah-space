"use client";
import Breadcrumbs from "@/components/layout/BreadCrumbs";
import UserForm from "@/components/layout/forms/UserForm";
import ProfileContainer from "@/components/layout/ProfileContainer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const crumbs = [{ label: "Home", path: "/" }, { label: "My profile" }];

const MyAccountPage = () => {
  const session = useSession();
  const { status } = session;
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  return (
    <ProfileContainer isAdmin={isAdmin}>
      <UserForm user={user} onSave={handleProfileInfoUpdate} />
    </ProfileContainer>
  );
};

export default MyAccountPage;
