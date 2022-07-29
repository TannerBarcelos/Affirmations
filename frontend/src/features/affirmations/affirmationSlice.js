import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"

import { Services } from "../../utils/Services"

// Normalizing state
const affirmationsAdapter = createEntityAdapter()

const initialState = affirmationsAdapter.getInitialState({
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
})

// Use RTK Query for next project - this is an exercise for using thunks
export const createAffirmation = createAsyncThunk(
  "affirmations/create",
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await Services.affirmations.create(affirmation, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const fetchAffirmations = createAsyncThunk(
  "affirmations/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await Services.affirmations.getAll(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteAffirmation = createAsyncThunk(
  "affirmations/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await Services.affirmations.delete(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateAffirmation = createAsyncThunk(
  "affirmations/update",
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(affirmation)
      return await Services.affirmations.update(
        affirmation.id,
        affirmation,
        token,
      )
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const affirmationSlice = createSlice({
  name: "affirmations",
  initialState,
  reducers: {
    reset: (_) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAffirmation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAffirmation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        affirmationsAdapter.addOne(state, action.payload)
      })
      .addCase(createAffirmation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updateAffirmation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAffirmation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        affirmationsAdapter.upsertOne(state, action.payload)
      })
      .addCase(updateAffirmation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteAffirmation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAffirmation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        affirmationsAdapter.removeOne(state, action.payload.id)
      })
      .addCase(deleteAffirmation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(fetchAffirmations.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAffirmations.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        affirmationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchAffirmations.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = true
        state.message = action.payload
      })
  },
})

// getSelectors returns 5 selectors (selectAll, selectById, selectTotal, selectEntities, selectIds)
// Note that this only works on stores that are normalized. In normalized state, we work with ids and entities to do a table lookup rather than using arrays
// of objects, etc. See here https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#normalizing-state
export const {
  selectEntities: selectAffirmationEntities, // selects all entities in entity object
  selectIds: selectAffirmationIds, // returns all ids in id array
  selectTotal: selectTotalAffirmations, // returns total number of entities in table
  selectAll: selectAllEntities, // maps over ids array and returns array of the entities in the lookup table found from the ID's in exact same order
  selectById: selectAffirmationEntityById, // selects a specific entity from the lookup table via the given ID
} = affirmationsAdapter.getSelectors((state) => state.affirmations)

// Memoize selector - memoize selecting all entity IDs
export const selectEntitiesIds = createSelector(selectAllEntities, (entities) =>
  entities.map((entity) => entity.id),
)

export const selectAffirmationsMetadata = (state) => state.affirmations

export const { reset } = affirmationSlice.actions
export default affirmationSlice.reducer
