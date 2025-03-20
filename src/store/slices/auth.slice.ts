import { User } from '@supabase/supabase-js'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createClient } from '@/lib/supabase/client'

interface AuthState {
  user: User | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
}

const supabase = createClient()

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await supabase.auth.signOut()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { setUser, setLoading } = authSlice.actions
export default authSlice.reducer
