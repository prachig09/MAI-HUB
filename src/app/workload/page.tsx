'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

interface EventsPageProps {
  userRole?: UserRole
}

export default function EventsPage({ userRole = 'faculty' }: EventsPageProps) {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  // 2. Define which roles can view this page
  const allowedRoles: UserRole[] = ['student', 'faculty', 'visitor']
  const canManageEvents = ['faculty', 'admin'].includes(userRole)

  // 3. Access Guard
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="text-sm text-slate-500 mt-1">You do not have access to view events.</p>
      </div>
    )
  }


const weekData = [
  { day: 'Mon', pct: 88, tasks: 4 },
  { day: 'Tue', pct: 55, tasks: 2 },
  { day: 'Wed', pct: 92, tasks: 5 },
  { day: 'Thu', pct: 78, tasks: 3 },
  { day: 'Fri', pct: 42, tasks: 2 },
]

const subjectData = [
  { subject: 'Machine Learning', pct: 85, tasks: 3, credits: 4 },
  { subject: 'Natural Language Processing', pct: 65, tasks: 2, credits: 4 },
  { subject: 'Deep Learning', pct: 58, tasks: 2, credits: 4 },
  { subject: 'Computer Vision', pct: 35, tasks: 1, credits: 3 },
  { subject: 'Research Methodology', pct: 25, tasks: 1, credits: 2 },
]

const deadlines = [
  { title: 'ML Assignment 2 — Regression & Classification', subject: 'Machine Learning', date: 'Oct 3, 2026', workload: 'High' },
  { title: 'NLP Presentation — Transformer Architectures', subject: 'NLP', date: 'Oct 5, 2026', workload: 'Medium' },
  { title: 'Deep Learning Lab Report 3', subject: 'Deep Learning', date: 'Oct 7, 2026', workload: 'Medium' },
  { title: 'Computer Vision Project Proposal', subject: 'Computer Vision', date: 'Oct 12, 2026', workload: 'Low' },
  { title: 'Dissertation Proposal Submission', subject: 'Research', date: 'Oct 15, 2026', workload: 'High' },
]

const barColor = (pct: number) =>
  pct >= 80 ? 'bg-red-400' : pct >= 60 ? 'bg-amber-400' : 'bg-green-400'

const labelStyle = (w: string) =>
  w === 'High' ? 'bg-red-100 text-red-700' : w === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'

  const avgWeekly = Math.round(weekData.reduce((a, d) => a + d.pct, 0) / weekData.length)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <button onClick={() => navigate(userRole === 'faculty' ? 'faculty-dashboard' : 'student-dashboard')} className="hover:text-[#2563eb]">Dashboard</button>
            <span>›</span>
            <span className="text-slate-900 font-medium">Workload Analytics</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Student Workload Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {userRole === 'faculty' ? 'Aggregate workload analytics for MSc AI Part I & II' : 'Your personal academic workload — Semester I, 2026–27'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Average', value: `${avgWeekly}%`, sub: 'This week', color: avgWeekly >= 70 ? 'text-amber-600' : 'text-green-600' },
            { label: 'Pending Tasks', value: '5', sub: 'Across all subjects', color: 'text-red-500' },
            { label: 'Upcoming Deadlines', value: '3', sub: 'Within 7 days', color: 'text-orange-500' },
            { label: 'Workload Status', value: 'Moderate', sub: 'Current week', color: 'text-amber-600' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Insight card */}
        <div className="bg-[#fff8ed] border border-amber-300 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-amber-900 text-sm">Workload Insight</p>
            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
              Several major academic tasks are scheduled within the same week (Oct 3–7). Consider allocating time early in the week for ML Assignment 2, as it carries the highest workload estimate. Wednesday shows the highest scheduled workload this week.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly workload chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-slate-900 mb-5">Weekly Workload</h2>
            <div className="flex items-end gap-3 h-40 mb-3">
              {weekData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">{d.pct}%</span>
                  <div className="w-full bg-slate-100 rounded-t-md overflow-hidden" style={{ height: '100px' }}>
                    <div
                      className={`w-full rounded-t-md transition-all ${barColor(d.pct)}`}
                      style={{ height: `${d.pct}%`, marginTop: `${100 - d.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-100">
              {[['bg-green-400', 'Low (< 60%)'], ['bg-amber-400', 'Moderate (60–79%)'], ['bg-red-400', 'High (≥ 80%)']].map(([cls, label]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${cls}`} />
                  <span className="text-[10px] text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workload by Subject */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-slate-900 mb-5">Workload by Subject</h2>
            <div className="space-y-4">
              {subjectData.map((s) => (
                <div key={s.subject}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-medium text-slate-800">{s.subject}</span>
                      <span className="text-xs text-slate-400 ml-2">{s.tasks} task{s.tasks > 1 ? 's' : ''}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor(s.pct)}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.title} className="flex flex-wrap items-center gap-3 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.workload === 'High' ? 'bg-red-400' : d.workload === 'Medium' ? 'bg-amber-400' : 'bg-green-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{d.title}</p>
                  <p className="text-xs text-slate-500">{d.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">{d.date}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${labelStyle(d.workload)}`}>{d.workload}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Status Guide */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">Workload Status Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Low', range: '< 60%', desc: 'Comfortable pace. Good time for revision, self-study, or additional research.', color: 'bg-green-50 border-green-200', dot: 'bg-green-400', text: 'text-green-700' },
              { label: 'Moderate', range: '60–79%', desc: 'Manageable workload. Stay organized and avoid postponing tasks.', color: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400', text: 'text-amber-700' },
              { label: 'High', range: '≥ 80%', desc: 'Intense period. Prioritize tasks carefully and seek support if needed.', color: 'bg-red-50 border-red-200', dot: 'bg-red-400', text: 'text-red-700' },
            ].map(({ label, range, desc, color, dot, text }) => (
              <div key={label} className={`p-4 border rounded-xl ${color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${dot}`} />
                  <span className={`font-bold text-sm ${text}`}>{label}</span>
                  <span className={`text-xs ${text} opacity-70`}>{range}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
