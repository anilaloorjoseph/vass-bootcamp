import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "lv"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/create-task": "/create-task",
    "/task-list": "/task-list",
    "/user-list": "/user-list",
    "/user-details/[userId]": "/user-details/[userId]",
    "/group-list": "/group-list",
    "/login": "/login",
    "/register": "/register",
    "/task-details/[id]": "/task-details/[id]",
    "/group-details/[id]": "/group-details/[id]",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
