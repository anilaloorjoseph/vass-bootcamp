import { getAllTasks } from "../actions/actions";
import CreateTask from "../components/CreateTask";

export default function page() {
  getAllTasks();

  return <CreateTask />;
}
