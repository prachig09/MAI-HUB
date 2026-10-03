'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

export default function FacultyDirectory() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  const userRole: UserRole = 'faculty'

const faculty = [
  {
    initials: 'PN', name: 'Dr. Priya Nair', designation: 'Associate Professor & Programme Coordinator',
    dept: 'DCST', email: 'priya.nair@gbs.ac.in', experience: '12 Years',
    research: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Federated Learning'],
    courses: ['Machine Learning', 'Research Methodology'],
    pubs: 24, hIndex: 8,
  },
  {
    initials: 'SM', name: 'Dr. Suresh Menon', designation: 'Assistant Professor',
    dept: 'DCST', email: 'suresh.menon@gbs.ac.in', experience: '8 Years',
    research: ['Natural Language Processing', 'Computational Linguistics', 'Information Retrieval'],
    courses: ['Natural Language Processing', 'NLP Lab'],
    pubs: 18, hIndex: 6,
  },
  {
    initials: 'AD', name: 'Prof. Anita Desai', designation: 'Assistant Professor',
    dept: 'DCST', email: 'anita.desai@gbs.ac.in', experience: '6 Years',
    research: ['Reinforcement Learning', 'Robotics', 'AI Ethics', 'Autonomous Systems'],
    courses: ['Deep Learning', 'Deep Learning Lab'],
    pubs: 12, hIndex: 4,
  },
  {
    initials: 'VR', name: 'Dr. Vikram Rao', designation: 'Associate Professor',
    dept: 'DCST', email: 'vikram.rao@gbs.ac.in', experience: '14 Years',
    research: ['Data Science', 'Statistical Learning', 'Big Data Analytics', 'Optimization'],
    courses: ['Computer Vision', 'Computer Vision Lab', 'Research Methodology'],
    pubs: 31, hIndex: 11,
  },
  {
    initials: 'RK', name: 'Dr. Ravi Kumar', designation: 'Assistant Professor',
    dept: 'DCST', email: 'ravi.kumar@gbs.ac.in', experience: '5 Years',
    research: ['Knowledge Graphs', 'Semantic Web', 'Explainable AI'],
    courses: ['AI Foundations', 'Knowledge Representation'],
    pubs: 9, hIndex: 3,
  },
  {
    initials: 'MS', name: 'Prof. Meena Sharma', designation: 'Professor & HoD',
    dept: 'DCST', email: 'meena.sharma@gbs.ac.in', experience: '20 Years',
    research: ['Intelligent Systems', 'Human-Computer Interaction', 'AI in Education'],
    courses: ['Intelligent Systems', 'AI Project Supervision'],
    pubs: 48, hIndex: 14,
  },
]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <h1 className="text-xl font-bold text-slate-900">Faculty Directory</h1>
          <p className="text-sm text-slate-500">Department of Computer Science & Technology · MSc Artificial Intelligence</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {faculty.map((f) => (
            <div key={f.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] p-5 flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 border-2 border-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{f.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-snug">{f.name}</h3>
                  <p className="text-blue-200 text-xs mt-0.5">{f.designation}</p>
                  <p className="text-blue-300 text-xs">{f.dept} · GBS</p>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Experience', value: f.experience },
                    { label: 'Publications', value: f.pubs },
                    { label: 'h-index', value: f.hIndex },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#f0f4ff] rounded-lg p-2 text-center">
                      <p className="text-sm font-bold text-[#1e3a8a]">{value}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Research Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.research.slice(0, 3).map((r) => (
                      <span key={r} className="text-xs bg-blue-50 border border-blue-100 text-[#1e40af] px-2 py-0.5 rounded">{r}</span>
                    ))}
                    {f.research.length > 3 && (
                      <span className="text-xs text-slate-400">+{f.research.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Courses Taught</p>
                  <div className="flex flex-wrap gap-1">
                    {f.courses.map((c) => (
                      <span key={c} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => navigate('faculty-profile')}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-[#1e3a8a] rounded-lg hover:bg-[#1e40af] transition-colors"
                  >
                    View Profile
                  </button>
                  <a
                    href={`mailto:${f.email}`}
                    className="px-3 py-2 text-xs font-medium text-[#2563eb] border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={e => e.preventDefault()}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
