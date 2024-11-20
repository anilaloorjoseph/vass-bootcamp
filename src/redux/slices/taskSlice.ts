import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTaskAction,
  deleteTaskAction,
  getAllTasksAction,
  getTaskAction,
  searchTasksAction,
  updateTaskAction,
} from "../../app/[locale]/actions/actions";
import { produce } from "immer";
import { TaskData } from "../../app/[locale]/types/typescript";
import { RootState } from "../store";

type initialState = {
  task: TaskData;
  tasks: TaskData[];
  pending: string;
  rejected: string;
  deleteFlag: boolean;
  createTaskId: string;
};

const initialState: initialState = {
  task: {
    _id: "",
    title: "",
    description: "",
    type: "",
    createdOn: "",
    status: "",
  },
  tasks: [],
  pending: "",
  rejected: "",
  deleteFlag: false,
  createTaskId: "",
};

export const getAllTasks = createAsyncThunk("task/getalltasks", async () => {
  return await getAllTasksAction();
});

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteTaskAction(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createtask",
  async (task: TaskData, { rejectWithValue }) => {
    try {
      return await createTaskAction(task);
    } catch (error: any) {
      return rejectWithValue(error || "Error at creating task");
    }
  }
);

export const getTask = createAsyncThunk(
  "task/gettask",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getTaskAction(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updatetask",
  async (task: TaskData, { rejectWithValue }) => {
    try {
      return await updateTaskAction(task);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchTasks = createAsyncThunk(
  "user/searchtasks",
  async (
    { keyword, sort }: { keyword: string; sort: string },
    { rejectWithValue }
  ) => {
    try {
      return await searchTasksAction(keyword, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskData[]>) => {
      return produce(state, (draft) => {
        draft.tasks = action.payload;
      });
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllTasks.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        getAllTasks.fulfilled,
        (state, action: PayloadAction<TaskData[]>) => {
          return produce(state, (draft) => {
            draft.rejected = "";
            draft.pending = "";
            draft.tasks = action.payload;
          });
        }
      )
      .addCase(getAllTasks.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(deleteTask.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
          draft.deleteFlag = false;
        });
      })
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.deleteFlag = action.payload;
          });
        }
      )
      .addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(createTask.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<string>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = "";
          draft.createTaskId = action.payload;
        });
      })
      .addCase(createTask.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(getTask.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(getTask.fulfilled, (state, action: PayloadAction<TaskData>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = "";
          draft.task = action.payload;
        });
      })
      .addCase(getTask.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(updateTask.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        updateTask.fulfilled,
        (state, action: PayloadAction<TaskData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.task = action.payload;
          });
        }
      )
      .addCase(updateTask.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(searchTasks.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        searchTasks.fulfilled,
        (state, action: PayloadAction<TaskData[]>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.tasks = action.payload;
          });
        }
      )
      .addCase(searchTasks.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.rejected = action.payload || "something went wrong";
        });
      }),
});

export const selectTask = (state: RootState) => state.taskReducer;
export const { setTasks } = task.actions;
export default task.reducer;
