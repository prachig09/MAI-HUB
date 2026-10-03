'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

export default function StudentProfile() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  const userRole: UserRole = 'student'

const subjects = [
  { code: 'CSAI601', name: 'Machine Learning', credits: 4, grade: 'A' },
  { code: 'CSAI602', name: 'Natural Language Processing', credits: 4, grade: 'A+' },
  { code: 'CSAI603', name: 'Deep Learning', credits: 4, grade: 'B+' },
  { code: 'CSAI604', name: 'Computer Vision', credits: 3, grade: '—' },
  { code: 'CSAI605', name: 'Research Methodology', credits: 2, grade: '—' },
]

const tasks = [
  { title: 'ML Assignment 2 — Regression & Classification', due: 'Oct 3', status: 'Pending', subject: 'Machine Learning' },
  { title: 'NLP Presentation — Transformer Architectures', due: 'Oct 5', status: 'In Progress', subject: 'NLP' },
  { title: 'Deep Learning Lab Report 3', due: 'Oct 7', status: 'Pending', subject: 'Deep Learning' },
]

const activity = [
  { text: 'New notice published: Internal Assessment Schedule', time: '2 hours ago' },
  { text: 'ML Assignment 2 added by Dr. Priya Nair', time: '5 hours ago' },
  { text: 'Timetable updated: DL Lab moved to Lab 3', time: 'Yesterday' },
  { text: 'Registered for AI Workshop — Oct 5', time: '2 days ago' },
  { text: 'Submitted Lab Report 2 — Deep Learning', time: '3 days ago' },
]


  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <button onClick={() => navigate('student-dashboard')} className="hover:text-[#2563eb] transition-colors">Dashboard</button>
            <span>›</span>
            <span className="text-slate-900 font-medium">Student Profile</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">RS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Rahul Sharma</h1>
              <p className="text-sm text-slate-500">MSc Artificial Intelligence · Part I, Semester I · Batch 2026–28</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 transition-colors">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Personal + Academic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2563eb] rounded-full inline-block" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: 'Rahul Sharma' },
                  { label: 'Student ID', value: 'AI2026001' },
                  { label: 'University Email', value: 'rahul.sharma@gbs.ac.in' },
                  { label: 'Personal Email', value: 'rahul.s@gmail.com' },
                  { label: 'Mobile', value: '+91 98765 43210' },
                  { label: 'Date of Birth', value: '15 March 2002' },
                  { label: 'Nationality', value: 'Indian' },
                  { label: 'Home Address', value: 'Panaji, Goa' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm text-slate-900 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2563eb] rounded-full inline-block" />
                Academic Information
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'Programme', value: 'MSc AI' },
                  { label: 'Part / Semester', value: 'Part I / Sem I' },
                  { label: 'Batch', value: '2026–28' },
                  { label: 'CGPA', value: '8.7 / 10' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#f0f4ff] border border-blue-100 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm font-bold text-[#1e3a8a]">{value}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-slate-700 mb-3">Current Semester Subjects</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200">
                      <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Code</th>
                      <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Subject</th>
                      <th className="text-center py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Credits</th>
                      <th className="text-center py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s) => (
                      <tr key={s.code} className="border-b border-slate-100 hover:bg-blue-50/30">
                        <td className="py-2.5 px-3 text-xs text-slate-500 font-mono">{s.code}</td>
                        <td className="py-2.5 px-3 text-slate-900 font-medium text-xs">{s.name}</td>
                        <td className="py-2.5 px-3 text-center text-xs text-slate-600">{s.credits}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${s.grade === '—' ? 'text-slate-400' : 'bg-green-100 text-green-700'}`}>
                            {s.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Academic Achievements</h3>
                <div className="space-y-2">
                  {[
                    'Merit Scholarship — Academic Year 2025–26',
                    'Best Paper Award — GBS Tech Symposium 2025',
                    'Department Rank 2 — Bachelor\'s Programme',
                  ].map((a) => (
                    <div key={a} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="text-yellow-500">★</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#2563eb] rounded-full inline-block" />
                  Upcoming Tasks
                </h2>
                <button onClick={() => navigate('calendar')} className="text-xs text-[#2563eb] font-medium">View Calendar →</button>
              </div>
              <div className="space-y-3">
                {tasks.map((t) => (
                  <div key={t.title} className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
                    <div className="w-1 h-auto min-h-10 rounded-full bg-[#2563eb] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-blue-600 font-medium">{t.subject}</p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">{t.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-500">Due: {t.due}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{t.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Activity & Quick links */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-700 leading-snug">{a.text}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                {[
                  { label: 'View Timetable', page: 'timetable' as Page },
                  { label: 'Academic Calendar', page: 'calendar' as Page },
                  { label: 'Workload Analytics', page: 'workload' as Page },
                  { label: 'Notices & Announcements', page: 'notices' as Page },
                  { label: 'Community', page: 'community' as Page },
                ].map(({ label, page }) => (
                  <button
                    key={label}
                    onClick={() => navigate(page)}
                    className="w-full text-left text-sm text-[#2563eb] hover:text-blue-800 py-1.5 border-b border-slate-100 last:border-0 hover:translate-x-0.5 transition-transform"
                  >
                    → {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
