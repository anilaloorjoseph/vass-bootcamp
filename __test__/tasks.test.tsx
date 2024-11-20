import Tasks from "../src/app/[locale]/components/Tasks";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

describe("Tasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks correctly when tasks are available", async () => {
    const locale = "en";

    const mockTasks = [
      {
        _id: "1",
        title: "Task 1",
        description: "Description 1",
        type: "type 1",
        status: "In Progress",
        assignedTo: "user1",
        group: { groupName: "Group A" },
        createdOn: "2024-11-19",
      },
      {
        _id: "2",
        title: "Task 2",
        description: "Description 2",
        type: "type 2",
        status: "Completed",
        assignedTo: "user2",
        group: { groupName: "Group B" },
        createdOn: "2024-11-18",
      },
    ];

    render(<Tasks locale={locale} initialTasks={mockTasks} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
