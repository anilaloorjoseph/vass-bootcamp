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
const saveTasks = () => {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks));
  } catch (err) {
    return new Response(`Error: ${err.message}`, {
      status: 500,
    });
  }
};

// get request
export async function GET() {
  try {
    loadTasks();
    return new Response(JSON.stringify(tasks), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, {
      status: 500,
    });
  }
}

// post request
export async function POST(request: Request) {
  const task = await request.json();

  const taskWithId = {
    id: tasks.length + 1,
    ...task,
  };

  tasks.push(taskWithId);

  saveTasks();

  return new Response(JSON.stringify(taskWithId), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
