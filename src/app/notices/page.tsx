'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP, UserRole } from '@/src/types/types'

export default function StudentDashboard() {
  const router = useRouter()
  const userRole: UserRole = 'faculty'
const categories = ['All', 'Academic', 'Examination', 'Assignment', 'Department', 'Event', 'Urgent']

const notices = [
  {
    id: 1, title: 'Internal Assessment Schedule Released', category: 'Examination', priority: 'High',
    postedBy: 'Dr. Priya Nair', target: 'MSc AI Part II', date: 'Sep 29, 2026',
    desc: 'The Internal Assessment schedule for MSc AI Part II has been published for Semester I (2026–27). The IA examinations will be conducted during October 20–25, 2026. Students are advised to check their subject-wise dates and prepare accordingly. Hall tickets will be available one week prior.',
    attachment: 'IA_Schedule_Oct2026.pdf',
  },
  {
    id: 2, title: 'Deep Learning Lab Session Rescheduled', category: 'Academic', priority: 'Normal',
    postedBy: 'Prof. Anita Desai', target: 'MSc AI Part I', date: 'Sep 27, 2026',
    desc: 'The Deep Learning Lab practical session originally scheduled for Monday, September 28, has been moved to Wednesday, September 30, at 2:00 PM in Computer Lab 3. Students must carry their lab manuals.',
    attachment: null,
  },
  {
    id: 3, title: 'AI Workshop Registration Open — Oct 5–6', category: 'Event', priority: 'Normal',
    postedBy: 'DCST Office', target: 'All MSc AI Students', date: 'Sep 25, 2026',
    desc: 'Registration for the Applied Artificial Intelligence Workshop (October 5–6, 2026) is now open. The two-day workshop will be conducted by industry professionals from TCS and Infosys. Limited seats are available. Register through the portal by October 2, 2026.',
    attachment: 'Workshop_Brochure.pdf',
  },
  {
    id: 4, title: 'Dissertation Proposal Submission Deadline', category: 'Urgent', priority: 'High',
    postedBy: 'Dr. Priya Nair', target: 'MSc AI Part II', date: 'Sep 24, 2026',
    desc: 'This is a reminder that the final date for submission of MSc AI Part II dissertation proposals is October 15, 2026. Proposals must be submitted in the prescribed format via the academic portal. Late submissions will not be accepted.',
    attachment: 'Dissertation_Proposal_Format.docx',
  },
  {
    id: 5, title: 'Department Seminar — Research in Computational Intelligence', category: 'Department', priority: 'Normal',
    postedBy: 'DCST', target: 'All Faculty & Students', date: 'Sep 22, 2026',
    desc: 'The Department of Computer Science & Technology will organize a research seminar on "Recent Advances in Computational Intelligence" on October 18, 2026. All faculty and MSc AI students are invited to attend.',
    attachment: null,
  },
  {
    id: 6, title: 'Assignment 2 Released — Machine Learning', category: 'Assignment', priority: 'Normal',
    postedBy: 'Dr. Priya Nair', target: 'MSc AI Part I', date: 'Sep 20, 2026',
    desc: 'Machine Learning Assignment 2 covering Regression and Classification techniques has been released. Students must submit by October 3, 2026. The assignment covers topics from Units 2 and 3. Submission via the academic portal only.',
    attachment: 'ML_Assignment2_Questions.pdf',
  },
]

const catColor: Record<string, string> = {
  Examination: 'bg-purple-100 text-purple-700 border-purple-200',
  Academic: 'bg-blue-100 text-blue-700 border-blue-200',
  Event: 'bg-green-100 text-green-700 border-green-200',
  Urgent: 'bg-red-100 text-red-700 border-red-200',
  Department: 'bg-orange-100 text-orange-700 border-orange-200',
  Assignment: 'bg-amber-100 text-amber-700 border-amber-200',
}

function CreateNoticeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Create Notice</h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Notice Title</label>
            <input type="text" placeholder="Enter notice title…" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea rows={4} placeholder="Detailed notice content…" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Priority</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                <option>Normal</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Target Audience</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
              <option>All MSc AI Students</option>
              <option>MSc AI Part I</option>
              <option>MSc AI Part II</option>
              <option>All Faculty & Students</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Date</label>
            <input type="date" defaultValue="2026-09-29" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Attachment (optional)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <p className="text-xs text-slate-500">Click to upload or drag & drop</p>
              <p className="text-[10px] text-slate-400">PDF, DOCX, XLSX — max 10 MB</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={onClose} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af]">Publish Notice</button>
          </div>
        </div>
      </div>
    </div>
  )
}

  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filtered = activeCategory === 'All' ? notices : notices.filter(n => n.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {showModal && <CreateNoticeModal onClose={() => setShowModal(false)} />}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Notices & Announcements</h1>
              <p className="text-sm text-slate-500">Department of CS & Technology · MSc AI</p>
            </div>
            {userRole === 'faculty' && (
              <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                + Create Notice
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-[#2563eb]'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({notices.filter(n => n.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">No notices in this category</p>
              <p className="text-xs text-slate-400 mt-1">Check back later for updates.</p>
            </div>
          ) : filtered.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all hover:shadow-sm ${n.priority === 'High' ? 'border-l-4 border-l-red-400 border-slate-200' : 'border-slate-200'}`}
            >
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${catColor[n.category] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>{n.category}</span>
                      {n.priority === 'High' && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 font-medium">Urgent</span>}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{n.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500">{n.date}</p>
                    <p className="text-xs text-slate-400">{n.target}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">Posted by: <span className="font-medium text-slate-700">{n.postedBy}</span></p>
                <p className={`text-sm text-slate-600 leading-relaxed ${expandedId === n.id ? '' : 'line-clamp-2'}`}>{n.desc}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
                    className="text-xs text-[#2563eb] font-medium hover:underline"
                  >
                    {expandedId === n.id ? 'Collapse' : 'View Notice →'}
                  </button>
                  {n.attachment && (
                    <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-[#2563eb] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {n.attachment}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
