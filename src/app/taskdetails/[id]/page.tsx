import TaskDetails from "../../components/TaskDetails";
import { use } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <TaskDetails id={id} />;
}
