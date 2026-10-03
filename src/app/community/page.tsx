'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function CommunityPage() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])
  const userRole: 'visitor' = 'visitor'

const discussions = [
  { id: 1, forum: 'Academics', title: 'Best resources for understanding Transformer architecture in depth?', author: 'Rahul Sharma', role: 'Student · Part I', time: '2 hours ago', replies: 8, views: 42 },
  { id: 2, forum: 'AI & Technology', title: 'Discussion: Impact of LLMs on traditional NLP pipelines', author: 'Kavita Iyer', role: 'Alumni · 2024 Batch', time: '5 hours ago', replies: 15, views: 89 },
  { id: 3, forum: 'Projects', title: 'Looking for team members for MSc AI Hackathon 2026', author: 'Arjun Pillai', role: 'Student · Part I', time: 'Yesterday', replies: 6, views: 34 },
  { id: 4, forum: 'Internships', title: 'AI internship openings at Infosys — Sharing JD and application link', author: 'Deepa Rao', role: 'Alumni · 2025 Batch', time: 'Yesterday', replies: 12, views: 156 },
  { id: 5, forum: 'Careers', title: 'ML Engineer at NVIDIA vs. Research Scientist path — experiences?', author: 'Nikhil Shetty', role: 'Alumni · 2024 Batch', time: '2 days ago', replies: 19, views: 203 },
  { id: 6, forum: 'General', title: 'Welcome new MSc AI 2026–28 batch! Introduce yourself', author: 'Dr. Priya Nair', role: 'Faculty', time: '3 days ago', replies: 24, views: 187 },
]

const alumni = [
  { initials: 'KI', name: 'Kavita Iyer', batch: '2024', role: 'ML Engineer', company: 'Google India', skills: ['TensorFlow', 'PyTorch', 'MLOps'] },
  { initials: 'NS', name: 'Nikhil Shetty', batch: '2024', role: 'Research Scientist', company: 'IISc Bangalore', skills: ['Deep Learning', 'Computer Vision', 'Research'] },
  { initials: 'DR', name: 'Deepa Rao', batch: '2025', role: 'Data Scientist', company: 'Infosys', skills: ['NLP', 'Python', 'Data Science'] },
  { initials: 'AM', name: 'Arun Mathew', batch: '2025', role: 'AI Researcher', company: 'TCS Research', skills: ['Reinforcement Learning', 'AI', 'Research'] },
  { initials: 'SP', name: 'Sowmya Pillai', batch: '2024', role: 'Product Manager — AI', company: 'Flipkart', skills: ['AI Products', 'ML Strategy'] },
  { initials: 'VK', name: 'Vijay Kulkarni', batch: '2025', role: 'AI Engineer', company: 'Amazon India', skills: ['NLP', 'AWS', 'MLOps'] },
]

const forumColors: Record<string, string> = {
  Academics: 'bg-blue-100 text-blue-700',
  'AI & Technology': 'bg-indigo-100 text-indigo-700',
  Projects: 'bg-purple-100 text-purple-700',
  Internships: 'bg-green-100 text-green-700',
  Careers: 'bg-teal-100 text-teal-700',
  General: 'bg-slate-100 text-slate-700',
  Events: 'bg-orange-100 text-orange-700',
}

type CommunityTab = 'discussions' | 'alumni'

  const [tab, setTab] = useState<CommunityTab>('discussions')
  const [selectedForum, setSelectedForum] = useState('All')
  const [showPostModal, setShowPostModal] = useState(false)

  const forums = ['All', 'General', 'Academics', 'Projects', 'AI & Technology', 'Internships', 'Careers', 'Events']
  const filtered = selectedForum === 'All' ? discussions : discussions.filter(d => d.forum === selectedForum)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {showPostModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Create Post</h3>
              <button onClick={() => setShowPostModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Forum</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb]">
                  {forums.slice(1).map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Title</label>
                <input type="text" placeholder="Enter a descriptive title…" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Content</label>
                <textarea rows={5} placeholder="Share your thoughts, questions, or experiences…" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563eb] resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowPostModal(false)} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={() => setShowPostModal(false)} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e40af]">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">MSc AI Community</h1>
              <p className="text-sm text-slate-500">Connecting current students and alumni of MSc Artificial Intelligence, DCST · GBS</p>
            </div>
            {userRole !== 'visitor' && (
              <button onClick={() => setShowPostModal(true)} className="px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                + Create Post
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {(['discussions', 'alumni'] as CommunityTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${tab === t ? 'bg-[#eff6ff] text-[#1e3a8a] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {t === 'discussions' ? 'Discussions' : 'Alumni Directory'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === 'discussions' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Forums</h3>
                <div className="space-y-1">
                  {forums.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedForum(f)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedForum === f ? 'bg-[#eff6ff] text-[#1e3a8a] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#eff6ff] border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-bold text-[#1e3a8a] mb-1">Community Guidelines</p>
                <p className="text-xs text-slate-600 leading-relaxed">Maintain academic professionalism. Be respectful and constructive. No plagiarism or spam.</p>
              </div>
            </div>

            {/* Discussions */}
            <div className="lg:col-span-3 space-y-3">
              {filtered.map((d) => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                      {d.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${forumColors[d.forum] || 'bg-slate-100 text-slate-600'}`}>{d.forum}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug hover:text-[#2563eb] transition-colors">{d.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-xs text-slate-700 font-medium">{d.author}</span>
                        <span className="text-xs text-slate-400">{d.role}</span>
                        <span className="text-xs text-slate-400">{d.time}</span>
                        <div className="flex items-center gap-3 ml-auto">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            {d.replies}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            {d.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Alumni Directory</h2>
              <p className="text-sm text-slate-500">{alumni.length} alumni listed</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alumni.map((a) => (
                <div key={a.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{a.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{a.name}</p>
                      <p className="text-xs text-slate-500">Batch {a.batch}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#1e3a8a]">{a.role}</p>
                  <p className="text-xs text-slate-500 mb-3">{a.company}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {a.skills.map(s => (
                      <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-semibold text-[#1e3a8a] border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View Profile</button>
                    {userRole !== 'visitor' && (
                      <button className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#1e3a8a] rounded-lg hover:bg-[#1e40af] transition-colors">Connect</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
