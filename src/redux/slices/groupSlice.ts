import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createGroupAction,
  updateGroupAction,
  deleteGroupAction,
  getAllGroupsAction,
  getGroupAction,
} from "../../app/[locale]/actions/actions";
import { produce } from "immer";
import { GroupData } from "../../app/[locale]/types/typescript";
import { RootState } from "../store";

type initialState = {
  group: GroupData;
  groups: GroupData[];
  pending: string;
  rejected: string;
  deleteFlag: boolean;
  createGroupId: string;
};

const initialState: initialState = {
  group: {
    _id: "",
    groupName: "",
  },
  groups: [],
  pending: "",
  rejected: "",
  deleteFlag: false,
  createGroupId: "",
};

export const getAllGroups = createAsyncThunk(
  "group/getallgroups",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllGroupsAction();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getGroup = createAsyncThunk(
  "group/getgroup",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getGroupAction(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "group/deletegroup",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteGroupAction(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateGroup = createAsyncThunk(
  "group/updategroup",
  async (
    { id, groupName }: { id: string; groupName: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateGroupAction(id, groupName);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createGroup = createAsyncThunk(
  "group/creategroup",
  async ({ groupName }: { groupName: string }, { rejectWithValue }) => {
    try {
      return await createGroupAction(groupName);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const group = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<GroupData[]>) => {
      return produce(state, (draft) => {
        draft.groups = action.payload;
      });
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllGroups.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        getAllGroups.fulfilled,
        (state, action: PayloadAction<GroupData[]>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.groups = action.payload;
          });
        }
      )
      .addCase(getAllGroups.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong";
        });
      })
      .addCase(getGroup.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        getGroup.fulfilled,
        (state, action: PayloadAction<GroupData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.group = action.payload;
          });
        }
      )
      .addCase(getGroup.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong";
        });
      })
      .addCase(deleteGroup.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
          draft.deleteFlag = false;
        });
      })
      .addCase(
        deleteGroup.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.deleteFlag = action.payload;
          });
        }
      )
      .addCase(deleteGroup.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went";
        });
      })
      .addCase(updateGroup.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
          draft.deleteFlag = false;
        });
      })
      .addCase(
        updateGroup.fulfilled,
        (state, action: PayloadAction<GroupData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.group = action.payload;
          });
        }
      )
      .addCase(updateGroup.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went";
        });
      })
      .addCase(createGroup.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
          draft.deleteFlag = false;
        });
      })
      .addCase(
        createGroup.fulfilled,
        (state, action: PayloadAction<GroupData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.group = action.payload;
          });
        }
      )
      .addCase(createGroup.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went";
        });
      }),
});

export const selectGroup = (state: RootState) => state.group;
export const { setGroups } = group.actions;
export default group.reducer;
