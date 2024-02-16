import React from "react";
import Close from "../icons/Close";

export default function SideMenu({ children, setMobMenuIsOpen, mobMenuIsOpen }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={() => setMobMenuIsOpen(false)}
      ></div>

      <div
        className="z-20	p-4 absolute top-0 left-[-100%] h-full w-[300px] bg-stone-900  transition-left duration-300"
        style={{ left: mobMenuIsOpen ? 0 : "-100%" }}
      >
        <div
          onClick={() => setMobMenuIsOpen(false)}
          className="text-white w-8 ms-auto"
        >
          <Close />
        </div>
        {children}
      </div>
    </>
  );
}
