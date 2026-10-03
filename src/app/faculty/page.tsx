'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

export default function FacultyProfile() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  const userRole: UserRole = 'faculty'

const publications = [
  {
    id: 1, title: 'Federated Learning with Differential Privacy for Medical Image Classification',
    authors: 'Nair, P., Rao, V., Kumar, R.', journal: 'IEEE Transactions on Medical Imaging',
    year: 2026, type: 'Journal', doi: '10.1109/TMI.2026.1234567', cited: 14,
  },
  {
    id: 2, title: 'Attention-Based Deep Learning Models for Remote Sensing Image Segmentation',
    authors: 'Nair, P., Desai, A.', journal: 'International Conference on Computer Vision (ICCV 2025)',
    year: 2025, type: 'Conference', doi: '10.1109/ICCV.2025.4567890', cited: 31,
  },
  {
    id: 3, title: 'Benchmarking Machine Learning Algorithms for Predictive Analytics in FinTech',
    authors: 'Nair, P., Menon, S., Sharma, M.', journal: 'Expert Systems with Applications',
    year: 2025, type: 'Journal', doi: '10.1016/j.eswa.2025.1234', cited: 22,
  },
  {
    id: 4, title: 'Transfer Learning Approaches for Low-Resource NLP Tasks in Indian Languages',
    authors: 'Menon, S., Nair, P.', journal: 'ACL 2024 — Annual Conference of the ACL',
    year: 2024, type: 'Conference', doi: '10.18653/v1/2024.acl-long.456', cited: 48,
  },
]

  const [addingPub, setAddingPub] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {addingPub && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Publication</h3>
              <button onClick={() => setAddingPub(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3">
              {['Title', 'Authors', 'Journal / Conference', 'Year', 'DOI'].map((label) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{label}</label>
                  <input type={label === 'Year' ? 'number' : 'text'} placeholder={`Enter ${label.toLowerCase()}…`} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Type</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                  <option>Journal</option>
                  <option>Conference</option>
                  <option>Book Chapter</option>
                  <option>Thesis</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setAddingPub(false)} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={() => setAddingPub(false)} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af]">Save Publication</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <button onClick={() => navigate('faculty-directory')} className="hover:text-[#2563eb]">Faculty Directory</button>
            <span>›</span>
            <span className="text-slate-900 font-medium">Dr. Priya Nair</span>
          </div>
          <div className="flex flex-wrap items-start gap-5">
            <div className="w-20 h-20 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">PN</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-slate-900">Dr. Priya Nair</h1>
              <p className="text-base text-[#2563eb] font-medium">Associate Professor & MSc AI Programme Coordinator</p>
              <p className="text-sm text-slate-500">Department of CS & Technology · Goa Business School</p>
              <p className="text-sm text-slate-500">priya.nair@gbs.ac.in · +91 832 000 0001</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[{ v: '12 Yrs Experience' }, { v: '24 Publications' }, { v: 'h-index: 8' }, { v: '342 Citations' }].map(({ v }) => (
                  <span key={v} className="text-xs bg-[#f0f4ff] border border-blue-100 text-[#1e3a8a] font-medium px-2.5 py-0.5 rounded-full">{v}</span>
                ))}
              </div>
            </div>
            {userRole === 'faculty' && (
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-[#2563eb] transition-colors">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-5">
            {/* About */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2563eb] rounded-full" />About
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dr. Priya Nair is an Associate Professor at DCST, Goa Business School, with over 12 years of teaching and research experience. Her work focuses on machine learning and deep learning for healthcare and remote sensing applications. She is the Programme Coordinator for MSc Artificial Intelligence.
              </p>
            </div>

            {/* Education */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2563eb] rounded-full" />Education
              </h2>
              <div className="space-y-3">
                {[
                  { degree: 'Ph.D. Computer Science', inst: 'IIT Bombay', year: '2012' },
                  { degree: 'M.Tech. Artificial Intelligence', inst: 'NIT Surathkal', year: '2008' },
                  { degree: 'B.E. Computer Engineering', inst: 'GEC Panaji', year: '2006' },
                ].map((e) => (
                  <div key={e.degree} className="border-l-2 border-blue-200 pl-3">
                    <p className="text-sm font-semibold text-slate-900">{e.degree}</p>
                    <p className="text-xs text-slate-500">{e.inst} · {e.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Interests */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2563eb] rounded-full" />Research Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Federated Learning', 'Medical Imaging', 'Remote Sensing', 'Transfer Learning'].map((r) => (
                  <span key={r} className="text-xs bg-[#eff6ff] border border-blue-100 text-[#1e40af] px-2.5 py-1 rounded-full">{r}</span>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2563eb] rounded-full" />Courses Taught
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {['Machine Learning (CSAI601)', 'Research Methodology (CSAI605)', 'ML Lab (CSAI601L)', 'AI Project Supervision'].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Publications */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <h2 className="font-bold text-slate-900">Publications</h2>
                {userRole === 'faculty' && (
                  <button onClick={() => setAddingPub(true)} className="px-3 py-1.5 bg-[#1e3a8a] text-white text-xs font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                    + Add Publication
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100">
                {publications.map((p) => (
                  <div key={p.id} className="p-5 hover:bg-blue-50/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug flex-1">{p.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${p.type === 'Journal' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
                          {p.type}
                        </span>
                        <span className="text-xs font-bold text-[#1e3a8a]">{p.year}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{p.authors}</p>
                    <p className="text-xs text-slate-600 font-medium italic mb-2">{p.journal}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-slate-500">Cited: <span className="font-semibold text-slate-700">{p.cited}</span></span>
                      <button className="text-[#2563eb] hover:underline font-medium">Read Paper →</button>
                      <button className="text-[#2563eb] hover:underline font-medium">DOI: {p.doi.slice(0, 20)}…</button>
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
