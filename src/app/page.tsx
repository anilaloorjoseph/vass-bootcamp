"use client";
import Link from "next/link";

export default function Home() {
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
