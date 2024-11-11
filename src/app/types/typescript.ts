// Define a type for the task data
export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
};

export type Context = {
  tasks: Task[];
  addTask: (task: Task) => string;
  deleteTask: (id: string) => string;
  getTask: (id: string) => Task;
};

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
}

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}
