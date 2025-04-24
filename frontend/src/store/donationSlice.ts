import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDonation, getDonations } from "../graphql/donation";


export interface Donation {
  id: string;
  foodType: string;
  description: string;
  quantity: number;
  expiryDate: string;
  location: string;
  status: string;
}

interface DonationsState {
  donations: Donation[];
  loading: boolean;
  error: string | null;
}


const initialState: DonationsState = {
  donations: [],
  loading: false,
  error: null,
};

// ✅ Fetch all donations
export const fetchDonations = createAsyncThunk("donations/fetchAll",
   async (_, { rejectWithValue }) => {
    try {
      return await getDonations();
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data || "Error fetching donations");
    }
  }
);

// ✅ Create a new donation
export const createDonation = createAsyncThunk(
  "donations/create",
  async (donationData: Omit<Donation, "id">, { rejectWithValue }) => {
    try {
      return await addDonation(donationData);
    } catch (error: unknown) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const donationsSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations.push(action.payload); 
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donationsSlice.reducer;
