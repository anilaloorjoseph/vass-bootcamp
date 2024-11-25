import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import Tasks from "./Tasks";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import task from "../../../redux/slices/taskSlice";
import auth from "../../../redux/slices/authSlice";
import { isAdmin, isManager, isUser } from "../../constants/constants";

const initialTasks = [
  {
    _id: "1",
    title: "Group A Task",
    description: "Description 1",
    type: "Type 1",
    createdOn: "2024-01-01",
    status: "Active",
    assignedTo: "user1",
    group: { _id: "groupA", groupName: "Group A" },
  },
  {
    _id: "2",
    title: "Group B Task",
    description: "Description 2",
    type: "Type 2",
    createdOn: "2024-01-02",
    status: "Pending",
    assignedTo: "user2",
    group: { _id: "groupB", groupName: "Group B" },
  },
];

jest.mock("../actions/actions", () => ({
  getAllTasksAction: jest.fn(() => Promise.resolve(initialTasks)),
  deleteTaskAction: jest.fn(() => Promise.resolve(true)),
}));

// Mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    locale: "en",
  }),
  usePathname: () => "/tasks",
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

describe("Tasks Component - Group access control", () => {
  const createStore = (userRole, userId = "user1", userGroup = "groupA") => {
    return configureStore({
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
            _id: userId,
            roles: [userRole],
            group: userGroup,
          },
          pending: "",
          rejected: "",
        },
      },
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("admin should see all tasks", async () => {
    const store = createStore(isAdmin);
    await act(async () => {
      render(
        <Provider store={store}>
          <Tasks
            locale="en"
            initialTasks={initialTasks}
            authorisedUser={true}
            admin={true}
          />
        </Provider>
      );
    });

    await waitFor(async () => {
      expect(screen.getByText("Group A Task")).toBeInTheDocument();
      expect(screen.getByText("Group B Task")).toBeInTheDocument();
    });
  });

  it("manager should see all tasks", async () => {
    const store = createStore(isManager);

    await act(async () => {
      render(
        <Provider store={store}>
          <Tasks
            locale="en"
            initialTasks={initialTasks}
            authorisedUser={true}
            admin={false}
          />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Group A Task")).toBeInTheDocument();
      expect(screen.getByText("Group B Task")).toBeInTheDocument();
    });
  });

  it("regular user should only see tasks from their group", async () => {
    const store = createStore(isUser, "user1", "groupA");

    await act(async () => {
      render(
        <Provider store={store}>
          <Tasks
            locale="en"
            initialTasks={initialTasks}
            authorisedUser={true}
            admin={false}
          />
        </Provider>
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Group A Task")).toBeInTheDocument();
      expect(screen.queryByText("Group B Task")).not.toBeInTheDocument();
    });
  });

  it("should show no tasks message when user has no access to any tasks", async () => {
    const store = createStore(isUser, "user3", "groupC");

    await act(async () => {
      render(
        <Provider store={store}>
          <Tasks
            locale="en"
            initialTasks={initialTasks}
            authorisedUser={true}
            admin={false}
          />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("No_tasks")).toBeInTheDocument();
    });
  });

  it("non-logged in user should see no tasks", async () => {
    const store = configureStore({
      reducer: { task, auth },
      preloadedState: {
        task: {
          tasks: initialTasks,
          deleteFlag: false,
          pending: "",
          rejected: "",
          task: {},
          createTaskId: "",
        },
        auth: { isLoggedIn: null, pending: "", rejected: "" },
      },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Tasks
            locale="en"
            initialTasks={initialTasks}
            authorisedUser={false}
            admin={false}
          />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Group A Task")).not.toBeInTheDocument();
      expect(screen.queryByText("Group B Task")).not.toBeInTheDocument();
    });
  });
});
