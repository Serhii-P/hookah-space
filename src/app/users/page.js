"use client";
import ProfileContainer from "@/components/layout/ProfileContainer";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <ProfileContainer isAdmin={true}>
      <section className="max-w-2xl mx-auto mt-8 px-4">
        <div className="mt-8">
          {users?.length > 0 &&
            users.map((user) => (
              <div
                key={user._id}
                className="border border-slate-400	 rounded-xl p-2 px-4 mb-2 flex items-center gap-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 grow sm:gap-8">
                  <div>
                    {!!user.name && <span>{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div>
                  <Link className="button" href={"/users/" + user._id}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </ProfileContainer>
  );
}
