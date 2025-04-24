import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../graphql/user";

interface UserProfile {
  address: string;
  phone: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserProfile();
      return data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch profile"
      );
    }
  }
);

// Update user profile
export const updateUser = createAsyncThunk(
  "user/updateProfile",
  async (
    {
      name,
      phone,
      address,
    }: { name?: string;phone?: string; address?: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateUserProfile(
        name ?? "",
        phone ?? "",
        address ?? "",
      );
      return data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error).message || "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
