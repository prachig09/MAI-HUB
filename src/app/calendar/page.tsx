'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

// 1. Declare interface OUTSIDE the component function
interface CalendarPageProps {
  userRole?: UserRole
}

export default function CalendarPage({ userRole = 'student' }: CalendarPageProps) {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  // 2. Define roles allowed to view the timetable
  const allowedRoles: UserRole[] = ['student', 'faculty']
  const canEditSchedule = userRole === 'faculty'

  // Access guard check
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-lg font-bold">Access Denied</h2>
        <p className="text-sm text-slate-500 mt-1">
          You do not have permission to view the class timetable.
        </p>
      </div>
    )
  }


type CalView = 'month' | 'week' | 'day'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface CalEvent {
  date: number; month: number; title: string; type: string; subject?: string; time?: string
}

const events: CalEvent[] = [
  { date: 29, month: 9, title: 'Machine Learning Lecture', type: 'Lecture', subject: 'ML', time: '9:00 AM' },
  { date: 29, month: 9, title: 'NLP Lecture', type: 'Lecture', subject: 'NLP', time: '10:00 AM' },
  { date: 29, month: 9, title: 'Deep Learning Lab', type: 'Lab', subject: 'DL', time: '11:15 AM' },
  { date: 3, month: 10, title: 'ML Assignment 2 Due', type: 'Deadline', subject: 'ML' },
  { date: 5, month: 10, title: 'NLP Presentation', type: 'Presentation', subject: 'NLP' },
  { date: 5, month: 10, title: 'AI Workshop', type: 'Workshop' },
  { date: 6, month: 10, title: 'AI Workshop Day 2', type: 'Workshop' },
  { date: 7, month: 10, title: 'DL Lab Report Due', type: 'Deadline', subject: 'DL' },
  { date: 10, month: 10, title: 'Guest Lecture: LLMs', type: 'Lecture' },
  { date: 15, month: 10, title: 'Dissertation Proposal Deadline', type: 'Deadline' },
  { date: 18, month: 10, title: 'Research Seminar', type: 'Seminar' },
  { date: 20, month: 10, title: 'Computer Vision Exam', type: 'Exam' },
]

const typeStyle: Record<string, string> = {
  Lecture: 'bg-blue-200 text-blue-900',
  Lab: 'bg-indigo-200 text-indigo-900',
  Deadline: 'bg-red-200 text-red-900',
  Presentation: 'bg-purple-200 text-purple-900',
  Workshop: 'bg-green-200 text-green-900',
  Exam: 'bg-orange-200 text-orange-900',
  Seminar: 'bg-teal-200 text-teal-900',
  Assignment: 'bg-amber-200 text-amber-900',
  Event: 'bg-emerald-200 text-emerald-900',
}

function AddTaskModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Add Academic Task</h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Task Title', type: 'text', placeholder: 'e.g. Machine Learning Assignment 3' },
            { label: 'Subject', type: 'text', placeholder: 'e.g. Machine Learning' },
          ].map(({ label, type, placeholder }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-slate-700 block mb-1">{label}</label>
              <input type={type} placeholder={placeholder} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Batch</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                <option>MSc AI Part I</option>
                <option>MSc AI Part II</option>
                <option>All Batches</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Task Type</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                <option>Assignment</option>
                <option>Presentation</option>
                <option>Lab</option>
                <option>Exam</option>
                <option>Workshop</option>
                <option>Seminar</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea rows={2} placeholder="Brief description of the task…" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Assigned Date</label>
              <input type="date" defaultValue="2026-09-29" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Due Date</label>
              <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Estimated Workload</label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map((w) => (
                <label key={w} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="workload" value={w} className="accent-[#2563eb]" />
                  <span className="text-sm text-slate-700">{w}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={onClose} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af] transition-colors">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  )
}

  const [view, setView] = useState<CalView>('month')
  const [year] = useState(2026)
  const [month, setMonth] = useState(10) // October
  const [showModal, setShowModal] = useState(false)

  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const getEventsForDate = (d: number) =>
    events.filter(e => e.date === d && e.month === month)

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const today = 29

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Academic Calendar</h1>
              <p className="text-sm text-slate-500">Tasks, classes, exams, and events · MSc AI</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                {(['month', 'week', 'day'] as CalView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${view === v ? 'bg-[#1e3a8a] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {userRole === 'faculty' && (
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                  + Add Task
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">{MONTHS[month - 1]} {year}</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setMonth(m => Math.max(1, m - 1))} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => setMonth(10)} className="text-xs px-2 py-1 text-slate-500 hover:bg-slate-100 rounded transition-colors">Today</button>
                <button onClick={() => setMonth(m => Math.min(12, m + 1))} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7">
              {DAYS.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-semibold text-slate-500 border-b border-slate-100">
                  {d}
                </div>
              ))}
              {cells.map((cell, i) => {
                const dayEvents = cell ? getEventsForDate(cell) : []
                return (
                  <div
                    key={i}
                    className={`min-h-[5.5rem] p-1.5 border-b border-r border-slate-100 transition-colors ${
                      !cell ? 'bg-slate-50/50' : cell === today && month === 9 ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    {cell && (
                      <>
                        <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${cell === today && month === 9 ? 'bg-[#1e3a8a] text-white' : 'text-slate-700'}`}>
                          {cell}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 3).map((e, j) => (
                            <div key={j} className={`text-[9px] px-1 py-0.5 rounded truncate font-medium ${typeStyle[e.type] || 'bg-slate-200 text-slate-700'}`}>
                              {e.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[9px] text-slate-400 px-1">+{dayEvents.length - 3} more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Legend */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Event Types</h3>
              <div className="space-y-1.5">
                {Object.entries(typeStyle).map(([type, style]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${style.split(' ')[0]}`} />
                    <span className="text-xs text-slate-600">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming deadlines */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Upcoming Deadlines</h3>
              <div className="space-y-2">
                {events.filter(e => e.type === 'Deadline').slice(0, 5).map((e, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-red-50 border border-red-100 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-800 leading-snug">{e.title}</p>
                      <p className="text-[10px] text-slate-500">Oct {e.date}, {year}</p>
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
