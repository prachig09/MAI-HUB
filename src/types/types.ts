export type Page =
  | 'home'
  | 'login'
  | 'student-dashboard'
  | 'student-profile'
  | 'faculty-dashboard'
  | 'calendar'
  | 'workload'
  | 'timetable'
  | 'notices'
  | 'events'
  | 'faculty-directory'
  | 'faculty-profile'
  | 'community'
  | 'notifications'
  | 'search'

export type UserRole = 'visitor' | 'student' | 'faculty'

export const ROUTE_MAP: Record<Page, string> = {
  'home': '/',
  'login': '/login',
  'student-dashboard': '/student/dashboard',
  'student-profile': '/student/profile',
  'faculty-dashboard': '/faculty/dashboard',
  'faculty-directory': '/faculty/directory',
  'faculty-profile': '/faculty/profile',
  'timetable': '/timetable',
  'notices': '/notices',
  'events': '/events',
  'calendar': '/calendar',
  'workload': '/workload',
  'notifications': '/notifications',
  'community': '/community',
  'search': '/search',
}