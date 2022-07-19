import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import Services from '../../utils/Services';

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
      return await Services.affirmations.update(
        affirmation._id,
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
        const newAffirmation = {
          ...action.payload,
          id: action.payload._id,
        };
        affirmationsAdapter.addOne(state, newAffirmation);
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
        const updatedAffirmation = {
          ...action.payload,
          id: action.payload._id,
        };
        affirmationsAdapter.upsertOne(state, updatedAffirmation);
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
        affirmationsAdapter.removeOne(state, action.payload._id);
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
        const adjustedAffirmations = action.payload.map((action) => {
          return {
            ...action,
            id: action._id,
          };
        });
        affirmationsAdapter.setAll(state, adjustedAffirmations);
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
// of objects, etc.
export const {
  selectAll: selectEntityIds,
  selectById: selectEntityById,
} = affirmationsAdapter.getSelectors((state) => state.affirmations);

// Memoize selector - memoize selecting all entity IDs
export const selectAffirmations = createSelector(selectEntityIds, (entities) =>
  entities.map((entity) => entity.id),
);

// Common practice to create our selectors in the slice and then import them
// where needed and use useSelector(). Meta data stuff (loading, error, message)
// do not need to be memoriezed however things that do not change often like
// affirmations list (can change but a lot of times it is more of consumption - read heavy)
// we can memoize the selector that way it can instantl return the data rather than re-select it all and cause re-renders
export const metaSelector = (state) => state.affirmations;

export const { reset } = affirmationSlice.actions;
export default affirmationSlice.reducer;
