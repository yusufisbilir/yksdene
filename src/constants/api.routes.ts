export const API_ROUTES = {
  EXAM_ATTEMPT_VIEW: '/exam_attempt_view',
  EXAM_ATTEMPT: '/exam_attempt',
  EXAM_ATTEMPT_CREATE: '/exam_attempt',
  EXAM_ATTEMPT_STATISTICS: '/exam_attempt_statistics',
  PROFILE: '/profile',
  YKS_RANKING: '/yks_ranking',
  PROFILE_WITH_UNIVERSITY_PROGRAM: '/profile_with_university_program',
  LEADER_BOARD: '/leader_board',
  // Grup routları
  GROUPS: '/groups',
  GROUP_JOIN: '/groups/join',
  GROUP_MEMBERS: (groupId: string) => `/groups/${groupId}/members`,
  GROUP_LEADERBOARD: (groupId: string) => `/groups/${groupId}/leaderboard`,
  GROUP_LEAVE: (groupId: string) => `/groups/${groupId}/leave`,
  GROUP_MEMBER_ROLE: (groupId: string) => `/groups/${groupId}/member-role`,
  GROUP_MEMBER_REMOVE: (groupId: string) => `/groups/${groupId}/member-remove`,
} as const
