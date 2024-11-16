import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../app/[locale]/types/typescript";
import { loginAction } from "../../app/[locale]/actions/actions";
import { RootState } from "../store";
import { produce } from "immer";
import { registerUser } from "./userSlice";

type initialState = {
  isLoggedIn: UserData | null;
  rejected: string;
  pending: string;
};

const initialState: initialState = {
  isLoggedIn: null,
  rejected: "",
  pending: "",
};

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string }) => {
    return await loginAction({ username, password });
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        return produce(state, (draft) => {
          draft.pending = "pending";
        });
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.rejected = "";
          draft.pending = "";
          draft.isLoggedIn = action.payload;
        });
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.rejected = action.payload || "wrong credentials";
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
            draft.isLoggedIn = action.payload;
          });
        }
      ),
});

export const selectAuth = (state: RootState) => state.authReducer;
export const { logout } = auth.actions;
export default auth.reducer;
