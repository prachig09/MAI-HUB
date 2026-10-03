'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function StudentDashboard() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

const todayClasses = [
  { time: '9:00–10:00 AM', subject: 'Machine Learning', faculty: 'Dr. Priya Nair', room: 'Room 201', type: 'Lecture' },
  { time: '10:00–11:00 AM', subject: 'Natural Language Processing', faculty: 'Dr. Suresh Menon', room: 'Room 202', type: 'Lecture' },
  { time: '11:00–11:15 AM', subject: 'Short Break', faculty: '', room: '', type: 'Break' },
  { time: '11:15 AM–1:00 PM', subject: 'Deep Learning Lab', faculty: 'Prof. Anita Desai', room: 'Lab 3', type: 'Lab' },
  { time: '2:00–3:00 PM', subject: 'Research Methodology', faculty: 'Dr. Vikram Rao', room: 'Room 204', type: 'Seminar' },
]

const tasks = [
  { subject: 'Machine Learning', title: 'Assignment 2 — Regression & Classification', due: 'Oct 3, 2026', workload: 'High', status: 'Pending' },
  { subject: 'NLP', title: 'Presentation — Transformer Architectures', due: 'Oct 5, 2026', workload: 'Medium', status: 'In Progress' },
  { subject: 'Deep Learning', title: 'Lab Report 3', due: 'Oct 7, 2026', workload: 'Medium', status: 'Pending' },
  { subject: 'Computer Vision', title: 'Project Proposal', due: 'Oct 12, 2026', workload: 'Low', status: 'Pending' },
]

const notifications = [
  { text: 'New notice: Internal Assessment Schedule Released', time: '2 hours ago', type: 'notice' },
  { text: 'ML Assignment 2 has been added to your tasks', time: '5 hours ago', type: 'assignment' },
  { text: 'Timetable updated: DL Lab moved to Lab 3', time: 'Yesterday', type: 'timetable' },
  { text: 'AI Workshop registration closes on Oct 3', time: 'Yesterday', type: 'event' },
]

const events = [
  { title: 'Applied AI Workshop', date: 'Oct 5–6', type: 'Workshop' },
  { title: 'Guest Lecture: LLMs in Industry', date: 'Oct 10', type: 'Lecture' },
  { title: 'Research Seminar', date: 'Oct 18', type: 'Seminar' },
]

const workloadDays = [
  { day: 'Mon', pct: 85, label: 'High' },
  { day: 'Tue', pct: 55, label: 'Moderate' },
  { day: 'Wed', pct: 90, label: 'High' },
  { day: 'Thu', pct: 70, label: 'Moderate' },
  { day: 'Fri', pct: 40, label: 'Low' },
]

const typeStyle: Record<string, string> = {
  Lecture: 'bg-blue-100 text-blue-700',
  Lab: 'bg-indigo-100 text-indigo-700',
  Seminar: 'bg-purple-100 text-purple-700',
  Break: 'bg-slate-100 text-slate-500',
}

const workloadColor = (pct: number) =>
  pct >= 80 ? 'bg-red-400' : pct >= 60 ? 'bg-amber-400' : 'bg-green-400'

const workloadLabel = (label: string) =>
  label === 'High' ? 'text-red-600 bg-red-50' : label === 'Moderate' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Dashboard header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{greeting}, Rahul Sharma</h1>
              <p className="text-sm text-slate-500 mt-0.5">Monday, 29 September 2026 · Semester I, Academic Year 2026–27</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-wrap gap-2">
                {[
                  { label: 'Student ID', value: 'AI2026001' },
                  { label: 'Programme', value: 'MSc AI' },
                  { label: 'Part / Sem', value: 'Part I / Sem I' },
                  { label: 'Batch', value: '2026–28' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#f0f4ff] border border-blue-100 rounded-lg px-3 py-1.5 text-center">
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-xs font-semibold text-[#1e3a8a]">{value}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('student-profile')} className="text-sm px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors font-medium">
                My Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Today's Classes</h2>
              <button onClick={() => navigate('timetable')} className="text-xs text-[#2563eb] font-medium">Full Timetable →</button>
            </div>
            <div className="space-y-2">
              {todayClasses.map((c) => (
                c.type === 'Break' ? (
                  <div key={c.time} className="flex items-center gap-3 py-1.5 px-3 border border-dashed border-slate-200 rounded-lg">
                    <span className="text-xs text-slate-400 w-32 flex-shrink-0">{c.time}</span>
                    <span className="text-xs text-slate-400">Short Break</span>
                  </div>
                ) : (
                  <div key={c.subject} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                    <div className="text-xs text-slate-500 w-32 flex-shrink-0 font-medium">{c.time}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{c.subject}</p>
                      <p className="text-xs text-slate-500">{c.faculty} · {c.room}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${typeStyle[c.type]}`}>{c.type}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Notifications</h2>
              <button onClick={() => navigate('notifications')} className="text-xs text-[#2563eb] font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-800 leading-snug">{n.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Tasks */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Upcoming Tasks</h2>
              <button onClick={() => navigate('calendar')} className="text-xs text-[#2563eb] font-medium">View Calendar →</button>
            </div>
            <div className="space-y-3">
              {tasks.map((t) => (
                <div key={t.title} className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className="w-1 h-full min-h-10 rounded-full bg-[#2563eb] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-blue-600 font-medium mb-0.5">{t.subject}</p>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">{t.title}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold flex-shrink-0 ${
                        t.workload === 'High' ? 'bg-red-100 text-red-600' : t.workload === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>{t.workload}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500">Due: {t.due}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{t.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workload + Events */}
          <div className="space-y-5">
            {/* Weekly workload */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">My Workload</h2>
                <button onClick={() => navigate('workload')} className="text-xs text-[#2563eb] font-medium">Details →</button>
              </div>
              <div className="space-y-2">
                {workloadDays.map((d) => (
                  <div key={d.day} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-7 font-medium">{d.day}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${workloadColor(d.pct)}`}
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium w-16 text-center ${workloadLabel(d.label)}`}>{d.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800 font-medium">⚠ High workload on Monday & Wednesday</p>
                <p className="text-xs text-amber-600 mt-0.5">Multiple tasks scheduled in the same period.</p>
              </div>
            </div>

            {/* Upcoming events */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Upcoming Events</h2>
                <button onClick={() => navigate('events')} className="text-xs text-[#2563eb] font-medium">View All</button>
              </div>
              <div className="space-y-2">
                {events.map((e) => (
                  <div key={e.title} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50/50 transition-colors">
                    <div className="w-9 h-9 bg-[#eff6ff] border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-[#2563eb]">{e.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{e.title}</p>
                      <p className="text-[10px] text-slate-400">{e.type} · {e.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
