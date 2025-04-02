import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { Profile } from '@/types'

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => API_ROUTES.PROFILE,
      transformResponse: (response: { result: Profile }) => response.result,
      providesTags: ['Profile'],
    }),
  }),
})

export const { useGetProfileQuery } = profileSlice
