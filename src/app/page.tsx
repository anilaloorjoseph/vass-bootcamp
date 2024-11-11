"use client";
import Link from "next/link";
import { getDummyUsers, importDummyUsers } from "./actions/actions";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function run() {
      await importDummyUsers();
      await getDummyUsers();
    }
    run();
  }, []);

  return (
    <div className="container mx-auto mt-2 w-2/4 p-4 drop-shadow bg-slate-100">
      <Link
        href="/createtask"
        className="p-2 me-2 font-bold hover:text-sky-600"
      >
        Create Task
      </Link>
      <Link href="tasklist" className="p-2 me-2 font-bold hover:text-sky-600">
        Task List
      </Link>
    </div>
  );
}
