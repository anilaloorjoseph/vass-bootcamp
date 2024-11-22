// Define a type for the task data
export type TaskData = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
  assignedTo?: any;
  group?: any;
};

export type AddGroupFormData = {
  _id: string;
};

export type UserData = {
  _id?: string;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  roles?: string[];
  group?: any;
};

export type LanguageData = {
  _id?: string;
  language: string;
  translations: object;
};

export type GroupData = {
  _id?: string;
  groupName: string;
};
