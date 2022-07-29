import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import affirmationReducer from "../features/affirmations/affirmationSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    affirmations: affirmationReducer,
  },
})
