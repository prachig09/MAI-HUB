'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP} from '@/src/types/types'

export default function NotificationCenter() {
  const router = useRouter()

interface Notif {
  id: number; text: string; detail: string; time: string; type: 'notice' | 'assignment' | 'timetable' | 'event' | 'deadline'; read: boolean
}

const initialNotifs: Notif[] = [
  { id: 1, text: 'New assignment posted: ML Assignment 2', detail: 'Machine Learning — Dr. Priya Nair', time: '2 hours ago', type: 'assignment', read: false },
  { id: 2, text: "Tomorrow's ML lecture room changed to Room 203", detail: 'Machine Learning — Room change effective from Sep 30', time: '3 hours ago', type: 'timetable', read: false },
  { id: 3, text: 'AI Workshop registration is now open', detail: 'Oct 5–6, 2026 · Seminar Hall A · Limited seats', time: '5 hours ago', type: 'event', read: false },
  { id: 4, text: 'ML Assignment 2 deadline in 4 days', detail: 'Due: October 3, 2026 · Estimated: High workload', time: 'Yesterday', type: 'deadline', read: true },
  { id: 5, text: 'New department notice published', detail: 'Internal Assessment Schedule Released — DCST', time: 'Yesterday', type: 'notice', read: true },
  { id: 6, text: 'DL Lab rescheduled to Wednesday 2:00 PM', detail: 'Deep Learning Lab — Prof. Anita Desai · Lab 3', time: '2 days ago', type: 'timetable', read: true },
  { id: 7, text: 'Guest Lecture registration opens tomorrow', detail: 'Dr. Aryan Kapoor — LLMs in Industry · Oct 10', time: '2 days ago', type: 'event', read: true },
]

const typeIcon: Record<string, { icon: string; color: string }> = {
  notice: { icon: '📋', color: 'bg-blue-100' },
  assignment: { icon: '📝', color: 'bg-indigo-100' },
  timetable: { icon: '📅', color: 'bg-purple-100' },
  event: { icon: '🎓', color: 'bg-green-100' },
  deadline: { icon: '⚠️', color: 'bg-red-100' },
}

  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markRead = (id: number) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))
  const unreadCount = notifs.filter(n => !n.read).length

  const displayed = filter === 'unread' ? notifs.filter(n => !n.read) : notifs

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Notification Centre</h1>
              <p className="text-sm text-slate-500">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All notifications read'}
              </p>
            </div>
            <button onClick={markAllRead} className="text-sm text-[#2563eb] font-medium hover:underline">
              Mark All as Read
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-[#1e3a8a] text-white' : 'bg-white border border-slate-300 text-slate-600 hover:border-blue-400'}`}
              >
                {f === 'all' ? `All (${notifs.length})` : `Unread (${unreadCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {displayed.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-slate-700 font-medium">No notifications</p>
            <p className="text-sm text-slate-400 mt-1">You're all caught up. Check back later.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((n) => {
              const { icon, color } = typeIcon[n.type]
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${n.read ? 'bg-white border-slate-200' : 'bg-[#f0f4ff] border-blue-200'}`}
                >
                  <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center flex-shrink-0 text-lg`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm leading-snug ${n.read ? 'text-slate-700' : 'font-semibold text-slate-900'}`}>{n.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.detail}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 bg-[#2563eb] rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400">{n.time}</span>
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="text-xs text-[#2563eb] hover:underline font-medium">
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
