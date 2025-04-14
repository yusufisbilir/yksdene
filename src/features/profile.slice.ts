import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { Profile, ProfilesUniversityProgramView, ProfileUpdate } from '@/types'

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => API_ROUTES.PROFILE,
      transformResponse: (response: { result: Profile }) => response.result,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Profile, Partial<ProfileUpdate>>({
      query: (profileData) => ({
        url: API_ROUTES.PROFILE,
        method: 'PUT',
        body: profileData,
      }),
      transformResponse: (response: { result: Profile }) => response.result,
      invalidatesTags: ['Profile'],
    }),
    getProfileWithUniversityProgram: builder.query<ProfilesUniversityProgramView, void>({
      query: () => API_ROUTES.PROFILE_WITH_UNIVERSITY_PROGRAM,
      transformResponse: (response: { result: ProfilesUniversityProgramView }) => response.result,
      providesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetProfileWithUniversityProgramQuery,
} = profileSlice
