import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { Group, GroupLeaderboard, GroupMember } from '@/types'

export const groupSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyGroups: builder.query<Group[], void>({
      query: () => `${API_ROUTES.GROUPS}?type=my`,
      transformResponse: (response: { results: Group[] }) => response.results ?? [],
      providesTags: ['Groups'],
    }),

    getPublicGroups: builder.query<Group[], void>({
      query: () => `${API_ROUTES.GROUPS}?type=public`,
      transformResponse: (response: { results: Group[] }) => response.results ?? [],
      providesTags: ['Groups'],
    }),

    getGroupById: builder.query<Group, string>({
      query: (groupId) => `${API_ROUTES.GROUPS}/${groupId}`,
      transformResponse: (response: { result: Group }) => response.result,
      providesTags: (result, error, groupId) => [{ type: 'Groups', id: groupId }],
    }),

    createGroup: builder.mutation<
      Group,
      { name: string; description?: string; isPublic?: boolean; joinCode?: string }
    >({
      query: (groupData) => ({
        url: API_ROUTES.GROUPS,
        method: 'POST',
        body: groupData,
      }),
      transformResponse: (response: { result: Group }) => response.result,
      invalidatesTags: ['Groups'],
    }),

    updateGroup: builder.mutation<
      Group,
      {
        groupId: string
        name?: string
        description?: string
        isPublic?: boolean
        joinCode?: string
      }
    >({
      query: ({ groupId, ...groupData }) => ({
        url: `${API_ROUTES.GROUPS}/${groupId}`,
        method: 'PATCH',
        body: groupData,
      }),
      transformResponse: (response: { result: Group }) => response.result,
      invalidatesTags: (result, error, { groupId }) => [{ type: 'Groups', id: groupId }, 'Groups'],
    }),

    joinGroup: builder.mutation<GroupMember, { groupId: string; joinCode?: string }>({
      query: (joinData) => ({
        url: API_ROUTES.GROUP_JOIN,
        method: 'POST',
        body: joinData,
      }),
      transformResponse: (response: { result: GroupMember }) => response.result,
      invalidatesTags: ['Groups'],
    }),

    leaveGroup: builder.mutation<void, string>({
      query: (groupId) => ({
        url: API_ROUTES.GROUP_LEAVE(groupId),
        method: 'POST',
      }),
      invalidatesTags: ['Groups'],
    }),

    getGroupMembers: builder.query<GroupMember[], string>({
      query: (groupId) => API_ROUTES.GROUP_MEMBERS(groupId),
      transformResponse: (response: { results: GroupMember[] }) => response.results ?? [],
      providesTags: (result, error, groupId) => [{ type: 'GroupMembers', id: groupId }],
    }),

    changeGroupMemberRole: builder.mutation<
      GroupMember,
      { groupId: string; targetUserId: string; role: 'admin' | 'member' }
    >({
      query: ({ groupId, ...data }) => ({
        url: API_ROUTES.GROUP_MEMBER_ROLE(groupId),
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { result: GroupMember }) => response.result,
      invalidatesTags: (result, error, { groupId }) => [{ type: 'GroupMembers', id: groupId }],
    }),

    removeGroupMember: builder.mutation<void, { groupId: string; targetUserId: string }>({
      query: ({ groupId, ...data }) => ({
        url: API_ROUTES.GROUP_MEMBER_REMOVE(groupId),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { groupId }) => [{ type: 'GroupMembers', id: groupId }],
    }),

    getGroupLeaderboard: builder.query<GroupLeaderboard[], string>({
      query: (groupId) => API_ROUTES.GROUP_LEADERBOARD(groupId),
      transformResponse: (response: { results: GroupLeaderboard[] }) => response.results ?? [],
      providesTags: (result, error, groupId) => [{ type: 'GroupLeaderboard', id: groupId }],
    }),
  }),
})

export const {
  useGetMyGroupsQuery,
  useGetPublicGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useGetGroupMembersQuery,
  useChangeGroupMemberRoleMutation,
  useRemoveGroupMemberMutation,
  useGetGroupLeaderboardQuery,
} = groupSlice
