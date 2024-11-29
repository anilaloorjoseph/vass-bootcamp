import DetailsTask from "../../components/DetailsTask";
import { use } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DetailsTask id={id} />;
}
