import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tasks.json");

export let tasks = [];

// load tasks prior to handle Routes
const loadTasks = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    tasks = JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks file:", err);
  }
};
loadTasks();

// writing to file /tasks.json
// Ensure directory exists
const saveTasks = (updatedTasks = undefined) => {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(updatedTasks ?? tasks));
  } catch (err) {
    return new Response(`Error: ${err.message}`, {
      status: 500,
    });
  }
};

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  loadTasks();

  const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));

  saveTasks(updatedTasks);

  return new Response(JSON.stringify(id), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  loadTasks();

  const taskDetails = tasks.find((task) => task.id === parseInt(id));

  return new Response(JSON.stringify(taskDetails), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
