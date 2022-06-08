import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../utils/services';

const initialState = {
  affirmations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createAffirmation = createAsyncThunk(
  'affirmations/create',
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await services.affirmations.create(affirmation, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getAffirmations = createAsyncThunk(
  'affirmations/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await services.affirmations.getAll(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteAffirmation = createAsyncThunk(
  'affirmations/delete',
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await services.affirmations.delete(affirmation._id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAffirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAffirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.affirmations.push(action.payload);
      })
      .addCase(createAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteAffirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAffirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.affirmations = state.affirmations.filter(
          (aff) => aff._id !== action.payload._id,
        );
      })
      .addCase(deleteAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getAffirmations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAffirmations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.affirmations = action.payload;
      })
      .addCase(getAffirmations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = affirmationSlice.actions;
export default affirmationSlice.reducer;
