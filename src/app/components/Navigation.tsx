"use client";
import Link from "next/link";
import { useTasks } from "../context/useContext";

export default function Navigation() {
  const { isLoggedIn, logout } = useTasks();
  const isAuthenticated = isLoggedIn && isLoggedIn._id ? isLoggedIn : false;

  return (
    <div className="container w-full mx-auto mt-2 p-4 flex justify-between drop-shadow bg-slate-100">
      {isAuthenticated && isAuthenticated?.roles.includes("admin") && (
        <Link
          href="http://localhost:3000/createtask"
          className="p-2 me-2 font-bold hover:text-sky-600"
        >
          Create Task
        </Link>
      )}
      {isAuthenticated && (
        <Link
          href="http://localhost:3000/tasklist"
          className="p-2 ms-2 font-bold hover:text-sky-600"
        >
          Task List
        </Link>
      )}
      {isAuthenticated && isAuthenticated?.roles.includes("admin") && (
        <Link
          href="http://localhost:3000/userlist"
          className="p-2 ms-2 font-bold hover:text-sky-600"
        >
          Users List
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href="http://localhost:3000/login"
          className="p-2 ms-auto me-2 font-bold hover:text-sky-600"
        >
          Login
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href="http://localhost:3000/register"
          className="p-2  me-2 font-bold hover:text-sky-600"
        >
          Register
        </Link>
      )}
      {isAuthenticated && (
        <div className="ms-auto flex align-middle">
          <small className="p-2 text-base  me-2 font-bold text-green-600">
            {isLoggedIn?.firstname} {isLoggedIn?.lastname}
          </small>
          <small
            onClick={() => logout()}
            className="p-2 me-2 text-base font-bold text-sky-600 cursor-pointer"
          >
            Logout
          </small>
        </div>
      )}
    </div>
  );
}
