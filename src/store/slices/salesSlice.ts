import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockSalesData, Sale } from "@/lib/mockData";

interface SalesState {
  data: Sale[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SalesState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchSalesData = createAsyncThunk(
  "sales/fetchSalesData",
  async () => {
    const promise = new Promise<Sale[]>((resolve) => {
      setTimeout(() => {
        resolve(mockSalesData);
      }, 1000);
    });
    const data = await promise;
    return data;
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default salesSlice.reducer;
