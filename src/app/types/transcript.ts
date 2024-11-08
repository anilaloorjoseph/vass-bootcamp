// Define a type for the task data
export type Task = {
  id: number;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
};

export type Context = {
  tasks: Task[];
  addTask: (task: Task) => number;
  deleteTask: (id: number) => number;
  getTask: (id: number) => Task;
};
