import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addUserGroupAction,
  addUserRoleAction,
  deleteUserRoleAction,
  getUserAction,
  getUsersAction,
  registerUserAction,
  searchUsersAction,
} from "../../app/[locale]/actions/actions";
import { RootState } from "../store";
import { UserData } from "../../app/[locale]/types/typescript";
import { produce } from "immer";

type initialState = {
  user: UserData;
  users: UserData[];
  pending: string;
  rejected: string;
};

const initialState: initialState = {
  user: {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
  },
  users: [],
  pending: "",
  rejected: "",
};

export const getUser = createAsyncThunk(
  "user/getuser",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getUserAction(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getusers",
  async (_, { rejectWithValue }) => {
    try {
      return await getUsersAction();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registeruser",
  async (user: UserData, { rejectWithValue }) => {
    try {
      return await registerUserAction(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addUserRole = createAsyncThunk(
  "user/adduserrole",
  async (
    { userId, role }: { userId: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      return await addUserRoleAction(userId, role);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserRole = createAsyncThunk(
  "user/deleteuserrole",
  async ({ id, role }: { id: string; role: string }, { rejectWithValue }) => {
    try {
      return await deleteUserRoleAction(id, role);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "user/searchusers",
  async (
    { keyword, sort }: { keyword: string; sort: string },
    { rejectWithValue }
  ) => {
    try {
      return await searchUsersAction(keyword, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addUserGroup = createAsyncThunk(
  "user/addusergroup",
  async (
    { groupId, userId }: { groupId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      return await addUserGroupAction(groupId, userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      return produce(state, (draft) => {
        draft.users = action.payload;
      });
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = "";
          draft.user = action.payload;
        });
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(getUsers.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.users = action.payload;
          });
        }
      )
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(registerUser.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.user = action.payload;
          });
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(addUserRole.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        addUserRole.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.user = action.payload;
          });
        }
      )
      .addCase(addUserRole.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(deleteUserRole.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        deleteUserRole.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.user = action.payload;
          });
        }
      )
      .addCase(deleteUserRole.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.pending = "";
          draft.rejected = action.payload || "something went wrong!";
        });
      })
      .addCase(searchUsers.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        searchUsers.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.users = action.payload;
          });
        }
      )
      .addCase(searchUsers.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.rejected = action.payload || "something went wrong";
        });
      })
      .addCase(addUserGroup.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(
        addUserGroup.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          return produce(state, (draft) => {
            draft.pending = "";
            draft.rejected = "";
            draft.user = action.payload;
          });
        }
      )
      .addCase(addUserGroup.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.rejected = action.payload || "something went wrong";
        });
      }),
});

export const selectUser = (state: RootState) => state.userReducer;
export const { setUsers } = user.actions;
export default user.reducer;
