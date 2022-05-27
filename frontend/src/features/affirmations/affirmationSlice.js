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
      const token = thunkAPI.getState().auth.user.token; // pulling out token from the current state (using getState()) of the auth state which contains the user with the auth token
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
  // takes in no data as this is just plain get request. So, in Redux Toolkit, the first arg is an underscore
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; // pulling out token from the current state (using getState()) of the auth state which contains the user with the auth token
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
      return await services.affirmations.delete(affirmation._id, token); // this action should in turn return the ID of the deleted affirmation in the end
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
        state.affirmations.push(action.payload); // add the newly created affirmation to our state (this comes from line 16 above)
      })
      .addCase(createAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload; // error message that is returned on line 24 as a rejectWithValue
      })
      .addCase(deleteAffirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAffirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.affirmations = state.affirmations.filter(
          (aff) => aff._id !== action.payload, // action.payload contains the ID of the removed affirmation coming from the backend
        );
      })
      .addCase(deleteAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload; // error message as a rejectWithValue
      })
      .addCase(getAffirmations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAffirmations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.affirmations = action.payload; // add all returned affirmations to state
      })
      .addCase(getAffirmations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload; // error message that is returned on line 24 as a rejectWithValue
      });
  },
});

export const { reset } = affirmationSlice.actions;
export default affirmationSlice.reducer;
