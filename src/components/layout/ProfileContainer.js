import React from "react";
import Breadcrumbs from "./BreadCrumbs";
import UserTabs from "./UserTabs";
const crumbs = [{ label: "Home", path: "/" }, { label: "My profile" }];

export default function ProfileContainer({ children, isAdmin }) {
  return (
    <div className="mt-10">
      <h1 className=" text-center">My Profile</h1>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex mt-20 md:flex-col" >
        <div className="w-1/4	py-2.5	px-8 md:w-full md:mb-8 md:pb-5 md:border-b  border-gray-700">
          <h4 className="uppercase ps-4	">My account</h4>
          <hr className="mt-2 mb-4 border-gray-600" />

          <UserTabs isAdmin={isAdmin} />
        </div>
        <div className="border-s border-gray-700 w-full">{children}</div>
      </div>
    </div>
  );
}
