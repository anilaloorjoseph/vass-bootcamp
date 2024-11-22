import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Tasks from "./Tasks";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import task from "../../../redux/slices/taskSlice";
import auth from "../../../redux/slices/authSlice";
import { ROLE } from "../../constants/constants";

jest.mock("../actions/actions", () => ({
  getAllTasksAction: jest.fn(() => Promise.resolve(initialTasks)),
  deleteTaskAction: jest.fn(() => Promise.resolve(true)),
}));

// Mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/link", () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key) => key,
}));

describe("Tasks Component", () => {
  const initialTasks = [
    {
      _id: "1",
      title: "Task 1",
      description: "Description 1",
      type: "Type 1",
      createdOn: "2024-01-01",
      status: "Active",
      assignedTo: "user1",
      group: { _id: "group1", groupName: "Group 1" },
    },
    {
      _id: "2",
      title: "Task 2",
      description: "Description 2",
      type: "Type 2",
      createdOn: "2024-01-02",
      status: "Pending",
      assignedTo: "user2",
      group: { _id: "group2", groupName: "Group 2" },
    },
  ];

  it("show tasks", async () => {
    let store = configureStore({
      reducer: {
        task,
        auth,
      },
      preloadedState: {
        task: {
          tasks: initialTasks,
          deleteFlag: false,
          pending: "",
          rejected: "",
          task: {},
          createTaskId: "",
        },
        auth: {
          isLoggedIn: {
            _id: "user1",
            roles: [ROLE.ADMIN],
          },
          pending: "",
          rejected: "",
        },
      },
    });
    render(
      <Provider store={store}>
        <Tasks locale="en" initialTasks={initialTasks} />
      </Provider>
    );

    // await waitFor(async () => {
    //   expect(screen.getByText("Task 1")).toBeInTheDocument();
    //   expect(screen.getByText("Description 1")).toBeInTheDocument();
    //   expect(screen.getByText("Type 1")).toBeInTheDocument();
    //   expect(screen.getByText("Active")).toBeInTheDocument();
    //   expect(screen.getByText("Delete:")).toBeInTheDocument();
    //   expect(screen.getByText("Edit:")).toBeInTheDocument();
    // });
  });
});
