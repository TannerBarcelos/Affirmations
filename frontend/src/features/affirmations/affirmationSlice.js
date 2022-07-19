import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { Services } from '../../utils/Services';

// Normalizing state - use entity adapater. Now every state interaction, update etc. will be done via entity ids
const affirmationsAdapter = createEntityAdapter();

const initialState = affirmationsAdapter.getInitialState({
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
});

export const createAffirmation = createAsyncThunk(
  'affirmations/create',
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Services.affirmations.create(affirmation, token);
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
      return await Services.affirmations.getAll(token);
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
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Services.affirmations.delete(id, token);
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

export const updateAffirmation = createAsyncThunk(
  'affirmations/update',
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(affirmation);
      return await Services.affirmations.update(
        affirmation.id,
        affirmation,
        token,
      );
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
  name: 'affirmations',
  initialState,
  reducers: {
    reset: (_) => initialState,
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
        affirmationsAdapter.addOne(state, action.payload);
      })
      .addCase(createAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateAffirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAffirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        affirmationsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateAffirmation.rejected, (state, action) => {
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
        affirmationsAdapter.removeOne(state, action.payload.id);
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
        affirmationsAdapter.setAll(state, action.payload);
      })
      .addCase(getAffirmations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

// getSelectors returns 5 selectors (selectAll, selectById, selectTotal, selectEntities, selectIds)
// Note that this only works on stores that are normalized. In normalized state, we work with ids and entities to do a table lookup rather than using arrays
// of objects, etc. See here https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#normalizing-state
export const {
  selectAll: selectAllEntities,
  selectById: selectEntityById,
} = affirmationsAdapter.getSelectors((state) => state.affirmations);

// Memoize selector - memoize selecting all entity IDs
export const selectEntities = createSelector(selectAllEntities, (entities) =>
  entities.map((entity) => entity.id),
);

// Common practice to create our selectors in the slice and then export them to be imported into useSelector where needed
export const metaSelector = (state) => state.affirmations;

export const { reset } = affirmationSlice.actions;
export default affirmationSlice.reducer;
