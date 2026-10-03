'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function TimetablePage() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

interface Props { navigate: (p: Page) => void }

const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

interface ClassEntry {
  subject: string; faculty: string; room: string; type: 'Lecture' | 'Lab' | 'Seminar' | 'Break'
}

const timetable: Record<string, Record<string, ClassEntry | null>> = {
  '9:00 AM': {
    Monday: { subject: 'Machine Learning', faculty: 'Dr. Priya Nair', room: 'Room 201', type: 'Lecture' },
    Tuesday: { subject: 'Computer Vision', faculty: 'Dr. Vikram Rao', room: 'Room 203', type: 'Lecture' },
    Wednesday: { subject: 'Machine Learning', faculty: 'Dr. Priya Nair', room: 'Room 201', type: 'Lecture' },
    Thursday: { subject: 'NLP', faculty: 'Dr. Suresh Menon', room: 'Room 202', type: 'Lecture' },
    Friday: { subject: 'Research Methodology', faculty: 'Dr. Vikram Rao', room: 'Room 204', type: 'Seminar' },
  },
  '10:00 AM': {
    Monday: { subject: 'Natural Language Processing', faculty: 'Dr. Suresh Menon', room: 'Room 202', type: 'Lecture' },
    Tuesday: { subject: 'Deep Learning', faculty: 'Prof. Anita Desai', room: 'Room 203', type: 'Lecture' },
    Wednesday: { subject: 'NLP Lab', faculty: 'Dr. Suresh Menon', room: 'Lab 2', type: 'Lab' },
    Thursday: { subject: 'Computer Vision', faculty: 'Dr. Vikram Rao', room: 'Room 203', type: 'Lecture' },
    Friday: { subject: 'Deep Learning', faculty: 'Prof. Anita Desai', room: 'Room 205', type: 'Lecture' },
  },
  '11:00 AM': {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
  },
  '12:00 PM': {
    Monday: { subject: 'Deep Learning Lab', faculty: 'Prof. Anita Desai', room: 'Lab 3', type: 'Lab' },
    Tuesday: { subject: 'ML Lab', faculty: 'Dr. Priya Nair', room: 'Lab 1', type: 'Lab' },
    Wednesday: { subject: 'Deep Learning Lab', faculty: 'Prof. Anita Desai', room: 'Lab 3', type: 'Lab' },
    Thursday: null,
    Friday: null,
  },
  '1:00 PM': {
    Monday: { subject: 'Deep Learning Lab (cont.)', faculty: 'Prof. Anita Desai', room: 'Lab 3', type: 'Lab' },
    Tuesday: { subject: 'ML Lab (cont.)', faculty: 'Dr. Priya Nair', room: 'Lab 1', type: 'Lab' },
    Wednesday: { subject: 'Deep Learning Lab (cont.)', faculty: 'Prof. Anita Desai', room: 'Lab 3', type: 'Lab' },
    Thursday: null,
    Friday: null,
  },
  '2:00 PM': {
    Monday: { subject: 'Research Methodology', faculty: 'Dr. Vikram Rao', room: 'Room 204', type: 'Seminar' },
    Tuesday: { subject: 'Computer Vision Lab', faculty: 'Dr. Vikram Rao', room: 'Lab 2', type: 'Lab' },
    Wednesday: { subject: 'NLP', faculty: 'Dr. Suresh Menon', room: 'Room 202', type: 'Lecture' },
    Thursday: { subject: 'Deep Learning', faculty: 'Prof. Anita Desai', room: 'Room 205', type: 'Lecture' },
    Friday: { subject: 'Machine Learning', faculty: 'Dr. Priya Nair', room: 'Room 201', type: 'Lecture' },
  },
  '3:00 PM': {
    Monday: null,
    Tuesday: { subject: 'Computer Vision Lab (cont.)', faculty: 'Dr. Vikram Rao', room: 'Lab 2', type: 'Lab' },
    Wednesday: null,
    Thursday: { subject: 'Research Seminar', faculty: 'Faculty Panel', room: 'Seminar Hall', type: 'Seminar' },
    Friday: null,
  },
  '4:00 PM': {
    Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null,
  },
}

const typeStyle: Record<string, string> = {
  Lecture: 'bg-blue-100 border-blue-300 text-blue-900',
  Lab: 'bg-indigo-100 border-indigo-300 text-indigo-900',
  Seminar: 'bg-purple-100 border-purple-300 text-purple-900',
  Break: 'bg-slate-100 border-slate-200 text-slate-500',
}

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Academic Timetable</h1>
              <p className="text-sm text-slate-500">MSc Artificial Intelligence · Part I, Semester I · 2026–27</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Last updated: Sep 27, 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {Object.entries(typeStyle).map(([type, style]) => (
            <div key={type} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${style}`}>
              <span className="font-medium">{type}</span>
            </div>
          ))}
        </div>

        {/* Desktop timetable */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="py-3 px-4 text-left text-xs font-semibold w-24">Time</th>
                  {days.map((d) => (
                    <th key={d} className="py-3 px-2 text-center text-xs font-semibold">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time, ti) => (
                  <tr key={time} className={ti % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2 px-4 text-xs font-semibold text-slate-500 border-r border-slate-100 w-24 align-top pt-3">
                      {time}
                    </td>
                    {days.map((day) => {
                      const entry = timetable[time]?.[day]
                      if (!entry) {
                        return (
                          <td key={day} className="py-2 px-2 border-r border-slate-100 last:border-r-0">
                            <div className="h-14 flex items-center justify-center">
                              <span className="text-xs text-slate-300">—</span>
                            </div>
                          </td>
                        )
                      }
                      return (
                        <td key={day} className="py-2 px-2 border-r border-slate-100 last:border-r-0">
                          <div className={`rounded-lg border p-2.5 min-h-14 ${typeStyle[entry.type]}`}>
                            <p className="text-[11px] font-bold leading-snug mb-1">{entry.subject}</p>
                            <p className="text-[10px] opacity-80">{entry.faculty}</p>
                            <p className="text-[10px] opacity-70 font-medium">{entry.room}</p>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile timetable */}
        <div className="md:hidden space-y-4">
          {days.map((day) => (
            <div key={day} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-[#1e3a8a] px-4 py-2.5">
                <h3 className="text-white font-semibold text-sm">{day}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {times.map((time) => {
                  const entry = timetable[time]?.[day]
                  if (!entry) return null
                  return (
                    <div key={time} className="flex items-start gap-3 p-3">
                      <span className="text-xs text-slate-500 font-medium w-20 flex-shrink-0 pt-0.5">{time}</span>
                      <div className={`flex-1 rounded-lg border px-3 py-2 ${typeStyle[entry.type]}`}>
                        <p className="text-xs font-bold">{entry.subject}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{entry.faculty} · {entry.room}</p>
                        <span className="text-[9px] font-semibold opacity-70">{entry.type}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0114 0z" />
          </svg>
          <p className="text-xs text-blue-800">
            This timetable is for <strong>MSc AI Part I, Semester I</strong>. The 11:00 AM slot is a break period. Lab sessions are scheduled for 2 hours. For changes and updates, refer to the Notices section.
          </p>
        </div>
      </div>
    </div>
  )
}
