import CreateTask from "./components/CreateTask";
import DisplayTask from "./components/DisplayTask";

// Define a type for the task data
export type Task = {
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
};

export default function Home() {
  const Tasks = {};

  return (
    <div>
      <CreateTask Task={Task} />
      <DisplayTask />
    </div>
  );
}
