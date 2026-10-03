'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function SearchPage() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

const allResults = {
  faculty: [
    { name: 'Dr. Priya Nair', sub: 'Associate Professor · Machine Learning, Deep Learning', page: 'faculty-profile' as Page },
    { name: 'Dr. Suresh Menon', sub: 'Assistant Professor · Natural Language Processing', page: 'faculty-directory' as Page },
    { name: 'Prof. Anita Desai', sub: 'Assistant Professor · Deep Learning, Reinforcement Learning', page: 'faculty-directory' as Page },
  ],
  notices: [
    { name: 'ML Assignment 2 Released', sub: 'Sep 20, 2026 · Assignment · Dr. Priya Nair', page: 'notices' as Page },
    { name: 'Internal Assessment Schedule', sub: 'Sep 29, 2026 · Examination · DCST', page: 'notices' as Page },
  ],
  events: [
    { name: 'Applied AI Workshop', sub: 'Oct 5–6, 2026 · Workshop · Seminar Hall A', page: 'events' as Page },
    { name: 'Guest Lecture: LLMs in Industry', sub: 'Oct 10, 2026 · Guest Lecture · Main Auditorium', page: 'events' as Page },
  ],
  courses: [
    { name: 'Machine Learning (CSAI601)', sub: 'Credits: 4 · Faculty: Dr. Priya Nair', page: 'timetable' as Page },
    { name: 'Natural Language Processing (CSAI602)', sub: 'Credits: 4 · Faculty: Dr. Suresh Menon', page: 'timetable' as Page },
    { name: 'Deep Learning (CSAI603)', sub: 'Credits: 4 · Faculty: Prof. Anita Desai', page: 'timetable' as Page },
  ],
  publications: [
    { name: 'Federated Learning with Differential Privacy for Medical Imaging', sub: 'Nair, P. et al. · IEEE TMI · 2026', page: 'faculty-profile' as Page },
    { name: 'Attention-Based Deep Learning for Remote Sensing Segmentation', sub: 'Nair, P., Desai, A. · ICCV 2025', page: 'faculty-profile' as Page },
  ],
}

const categories = ['All', 'Faculty', 'Notices', 'Events', 'Courses', 'Publications']

const catIcons: Record<string, string> = {
  faculty: '👨‍🏫', notices: '📋', events: '🎓', courses: '📚', publications: '🔬',
}

  const [query, setQuery] = useState('Machine Learning')
  const [activeTab, setActiveTab] = useState('All')
  const [searched, setSearched] = useState(true)

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearched(true) }

  const renderSection = (title: string, key: keyof typeof allResults) => {
    const items = allResults[key]
    if (activeTab !== 'All' && activeTab !== title) return null
    const filtered = query ? items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.sub.toLowerCase().includes(query.toLowerCase())) : items
    if (filtered.length === 0) return null

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">{catIcons[key]}</span>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{title}</h3>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{filtered.length}</span>
        </div>
        <div className="space-y-2">
          {filtered.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.page)}
              className="w-full text-left flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-[#2563eb] transition-colors">{item.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.sub}</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 group-hover:text-[#2563eb] mt-0.5 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const totalResults = Object.values(allResults).reduce((acc, arr) => {
    const filtered = arr.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.sub.toLowerCase().includes(query.toLowerCase()))
    return acc + filtered.length
  }, 0)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-xl font-bold text-slate-900 mb-4">Search</h1>
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search faculty, notices, events, courses, publications…"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <button type="submit" className="px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded-xl text-sm hover:bg-[#1e40af] transition-colors">
                Search
              </button>
            </div>
          </form>

          {searched && query && (
            <p className="text-xs text-slate-500 mt-3">
              {totalResults} result{totalResults !== 1 ? 's' : ''} for "<strong>{query}</strong>"
            </p>
          )}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeTab === cat ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!searched || !query ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">Search the MSc AI Portal</p>
            <p className="text-sm text-slate-400 mt-1">Find faculty, courses, notices, events, publications and more.</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-700 font-medium">No results found</p>
            <p className="text-sm text-slate-400 mt-1">Try a different search term or browse by category.</p>
          </div>
        ) : (
          <>
            {renderSection('Faculty', 'faculty')}
            {renderSection('Courses', 'courses')}
            {renderSection('Notices', 'notices')}
            {renderSection('Events', 'events')}
            {renderSection('Publications', 'publications')}
          </>
        )}
      </div>
    </div>
  )
}
