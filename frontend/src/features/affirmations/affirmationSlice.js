import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { Services } from '../../utils/Services'

const affirmationsAdapter = createEntityAdapter()

const initialState = affirmationsAdapter.getInitialState({
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
})

export const createAffirmation = createAsyncThunk(
  'affirmations/create',
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
  'affirmations/get',
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
  'affirmations/delete',
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
  'affirmations/update',
  async (affirmation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
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
  name: 'affirmations',
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

export const {
  selectEntities: selectAffirmationEntities,
  selectIds: selectAffirmationIds,
  selectTotal: selectTotalAffirmations,
  selectAll: selectAllEntities,
  selectById: selectAffirmationEntityById,
} = affirmationsAdapter.getSelectors((state) => state.affirmations)

export const selectEntitiesIds = createSelector(selectAllEntities, (entities) =>
  entities.map((entity) => entity.id),
)
export const selectAffirmationsMetadata = (state) => state.affirmations

export const { reset } = affirmationSlice.actions
export default affirmationSlice.reducer
