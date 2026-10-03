'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function FacultyDashboard() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

const todayClasses = [
  { time: '9:00–10:00 AM', subject: 'Machine Learning', batch: 'MSc AI Part I', room: 'Room 201', students: 28 },
  { time: '11:00 AM–1:00 PM', subject: 'Deep Learning Lab', batch: 'MSc AI Part II', room: 'Lab 3', students: 24 },
  { time: '2:00–3:00 PM', subject: 'Research Methodology', batch: 'MSc AI Part I', room: 'Room 204', students: 30 },
]

const tasks = [
  { title: 'Grade ML Assignment 2 submissions', due: 'Oct 5', priority: 'High' },
  { title: 'Submit IA marks for Part I — Semester I', due: 'Oct 8', priority: 'High' },
  { title: 'Prepare Deep Learning Lab report rubric', due: 'Oct 7', priority: 'Medium' },
  { title: 'Review dissertation proposals — Part II', due: 'Oct 15', priority: 'Medium' },
]

const notices = [
  { title: 'Internal Assessment Schedule Released', time: '2 hours ago', category: 'Examination' },
  { title: 'Department Meeting — Oct 3 at 3:00 PM', time: 'Yesterday', category: 'Department' },
  { title: 'Research Grant Application Deadline', time: '2 days ago', category: 'Academic' },
]

const events = [
  { title: 'Applied AI Workshop', date: 'Oct 5–6', type: 'Workshop' },
  { title: 'Guest Lecture: LLMs in Industry', date: 'Oct 10', type: 'Lecture' },
  { title: 'Research Seminar', date: 'Oct 18', type: 'Seminar' },
]

const workloadData = [
  { day: 'Mon', pct: 88 },
  { day: 'Tue', pct: 55 },
  { day: 'Wed', pct: 92 },
  { day: 'Thu', pct: 78 },
  { day: 'Fri', pct: 42 },
]

const barColor = (pct: number) =>
  pct >= 80 ? 'bg-red-400' : pct >= 60 ? 'bg-amber-400' : 'bg-green-400'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Faculty</span>
                <span className="text-xs text-slate-500">Department of Computer Science & Technology</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">{greeting}, Dr. Priya Nair</h1>
              <p className="text-sm text-slate-500 mt-0.5">Monday, 29 September 2026 · MSc AI Coordinator</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('notices')} className="text-sm px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:border-blue-400 hover:text-[#2563eb] transition-colors font-medium">
                + Create Notice
              </button>
              <button onClick={() => navigate('calendar')} className="text-sm px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors font-medium">
                + Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Classes Today', value: '3', icon: '📚' },
            { label: 'Pending Tasks', value: '4', icon: '✅' },
            { label: 'Students (Part I)', value: '30', icon: '👤' },
            { label: 'Open Notices', value: '2', icon: '📋' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-2xl font-bold text-[#1e3a8a]">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Today's Classes</h2>
              <button onClick={() => navigate('timetable')} className="text-xs text-[#2563eb] font-medium">Full Timetable →</button>
            </div>
            <div className="space-y-3">
              {todayClasses.map((c) => (
                <div key={c.subject} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                  <div className="text-xs text-slate-500 w-32 flex-shrink-0 font-medium">{c.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{c.subject}</p>
                    <p className="text-xs text-slate-500">{c.batch} · {c.room}</p>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <p className="text-lg font-bold text-[#1e3a8a]">{c.students}</p>
                    <p className="text-[10px] text-slate-400">students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Notices</h2>
              <button onClick={() => navigate('notices')} className="text-xs text-[#2563eb] font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {notices.map((n, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{n.title}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                    <span className="text-[10px] text-blue-600 font-medium">{n.category}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('notices')} className="mt-4 w-full py-2 text-xs font-semibold border border-dashed border-blue-300 text-[#2563eb] rounded-lg hover:bg-blue-50 transition-colors">
              + Create New Notice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Upcoming Tasks</h2>
              <button onClick={() => navigate('calendar')} className="text-xs text-[#2563eb] font-medium">Calendar →</button>
            </div>
            <div className="space-y-3">
              {tasks.map((t) => (
                <div key={t.title} className="flex items-center gap-3 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.priority === 'High' ? 'bg-red-400' : 'bg-amber-400'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{t.title}</p>
                    <p className="text-xs text-slate-500">Due: {t.due}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${t.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workload + Events */}
          <div className="space-y-5">
            {/* Student Workload Overview */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-slate-900">Student Workload</h2>
                <button onClick={() => navigate('workload')} className="text-xs text-[#2563eb] font-medium">Details →</button>
              </div>
              <p className="text-xs text-slate-500 mb-3">MSc AI Part II · Average: 72%</p>

              <div className="space-y-2 mb-4">
                {workloadData.map((d) => (
                  <div key={d.day} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-7 font-medium">{d.day}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full ${barColor(d.pct)}`} style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-600 w-8 text-right">{d.pct}%</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs font-semibold text-amber-800">⚠ High workload detected</p>
                <p className="text-xs text-amber-600 mt-0.5">Multiple academic tasks are scheduled within the same period on Monday and Wednesday.</p>
              </div>
            </div>

            {/* Events */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Upcoming Events</h2>
                <button onClick={() => navigate('events')} className="text-xs text-[#2563eb] font-medium">View All</button>
              </div>
              <div className="space-y-2">
                {events.map((e) => (
                  <div key={e.title} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50/50 transition-colors">
                    <div className="w-8 h-8 bg-[#eff6ff] border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-[#2563eb]">{e.date.split(' ')[0]}</span>
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
