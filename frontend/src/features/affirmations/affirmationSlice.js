import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  affirmations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = affirmationSlice.actions;
export default affirmationSlice.reducer;
