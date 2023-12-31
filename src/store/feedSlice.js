// feedSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedData: [],
  loading: false,
  error: null,
};

const token = window.localStorage.getItem('access-token') || null;

export const fetchUserFeed = createAsyncThunk(
  "feed/fetchUserFeed",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/user/feed",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user feed");
      }

      const data = await response.json();

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const feedSlice = createSlice({
  name: "feed",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feedData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserFeed.rejected, (state, action) => {
      state.loading = false;
      state.feedData = [];
      state.error = action.payload;
    });
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
