import React from "react";

export default function LoginRegister({
  title,
  label1,
  email,
  setEmail,
  label2,
  password,
  setPassword,
  name,
  errorMessage,
}) {
  return (
    <form
      className=" px-10 border-r border-gray-700"
      onSubmit={handleFormSubmit}
    >
      <h2 className="mb-5">{title}</h2>
      <label className="mb-1">
        {label1} <span className="text-red-500	">*</span>
      </label>
      <input
        type="email"
        name="email"
        value={email}
        // disabled={loginInProgress}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <div className="py-5">
        <label className="mb-1">
          {label2} <span className="text-red-500	">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={password}
          // disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <button
        // disabled={loginInProgress}
        type="submit"
        className="w-full	"
      >
        {name}
      </button>
      <p className="text-red-600 my-2">{errorMessage && errorMessage}</p>
    </form>
  );
}
