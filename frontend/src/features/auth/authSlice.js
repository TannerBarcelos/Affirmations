import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../utils/services';

// Get JWT from Local Storage - Contains user data + JWT which is necessary to make api calls to protected endpoints!
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await services.auth.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // dispatch a built in rejection action that returns errrors (the error message from API, react error, reduc, etc.)
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Register User
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await services.auth.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
  await services.auth.logout();
});

export const authSlice = createSlice({
  // Name of this slice of state
  name: 'auth',
  // The initial state this slice starts with
  initialState: initialState,
  // Non async reducers go here
  reducers: {
    // Resets state
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  // Async reducer loading lifecycle stuff goes here (pending [loadng], fulfilled [success], rejected [40* error from abckend with message])
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // payload that came back from the async register function (register action return payload of response data)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload; // the rejected with value message from the async register function (register action retuns a reject action with message from our backend for fails)
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Export actions to use for dispatching in components
export const { reset } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
