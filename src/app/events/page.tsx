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

const events = [
  {
    id: 1, title: 'Applied AI Workshop', date: 'October 5–6, 2026', time: '9:00 AM – 5:00 PM',
    venue: 'Seminar Hall A, GBS', type: 'Workshop', speaker: 'Industry Experts — TCS & Infosys',
    registered: true, seats: 40, remaining: 8,
    desc: 'A two-day intensive hands-on workshop on applied artificial intelligence covering real-world ML deployment, MLOps, model optimization, and AI ethics. Participants will work on industry case studies.',
    tags: ['Machine Learning', 'Deployment', 'MLOps'],
  },
  {
    id: 2, title: 'Guest Lecture: Large Language Models in Industry', date: 'October 10, 2026', time: '2:00 PM – 4:00 PM',
    venue: 'Main Auditorium, GBS', type: 'Guest Lecture', speaker: 'Dr. Aryan Kapoor, Research Scientist — Google DeepMind',
    registered: false, seats: 200, remaining: 120,
    desc: 'Dr. Aryan Kapoor will discuss the evolution of Large Language Models, their industrial applications, challenges in alignment, and the future research directions in generative AI.',
    tags: ['LLMs', 'Generative AI', 'Industry'],
  },
  {
    id: 3, title: 'MSc AI Research Seminar — Computational Intelligence', date: 'October 18, 2026', time: '11:00 AM – 1:00 PM',
    venue: 'Conference Room 1, DCST', type: 'Seminar', speaker: 'Faculty Panel — DCST',
    registered: false, seats: 50, remaining: 35,
    desc: 'Faculty-led research seminar covering recent advances in computational intelligence, including fuzzy systems, evolutionary computing, and hybrid AI approaches. MSc AI students will present ongoing projects.',
    tags: ['Research', 'Computational Intelligence'],
  },
  {
    id: 4, title: 'MSc AI Hackathon 2026', date: 'November 2–3, 2026', time: '8:00 AM – 8:00 PM',
    venue: 'Innovation Lab, GBS', type: 'Hackathon', speaker: 'Open to all MSc AI Students',
    registered: false, seats: 60, remaining: 60,
    desc: 'A 24-hour hackathon for MSc AI students to build innovative AI solutions addressing real-world problems. Teams of 3–4 students. Prizes and certificates for top 3 teams. Problem statements to be released on Oct 28.',
    tags: ['Hackathon', 'AI Solutions', 'Competition'],
  },
  {
    id: 5, title: 'Alumni Meet 2026 — MSc AI', date: 'November 15, 2026', time: '4:00 PM – 7:00 PM',
    venue: 'GBS Main Campus, Panaji', type: 'Alumni Meet', speaker: 'MSc AI Alumni — 2024 & 2025 Batches',
    registered: false, seats: 100, remaining: 72,
    desc: 'Annual alumni meet connecting current MSc AI students with graduates from the 2024 and 2025 batches. Panel discussion on AI careers, research opportunities, and industry experiences.',
    tags: ['Alumni', 'Networking', 'Careers'],
  },
  {
    id: 6, title: 'Industrial Visit — NVIDIA AI Centre, Pune', date: 'November 20, 2026', time: 'Full Day',
    venue: 'NVIDIA AI Centre, Pune', type: 'Industrial Visit', speaker: 'NVIDIA India Team',
    registered: false, seats: 25, remaining: 15,
    desc: 'An exclusive industrial visit to the NVIDIA AI Centre in Pune for MSc AI Part II students. Students will attend demos, interact with research engineers, and attend sessions on GPU computing and AI infrastructure.',
    tags: ['Industry', 'NVIDIA', 'AI Infrastructure'],
  },
]

const typeStyle: Record<string, string> = {
  Workshop: 'bg-green-100 text-green-700 border-green-200',
  'Guest Lecture': 'bg-blue-100 text-blue-700 border-blue-200',
  Seminar: 'bg-purple-100 text-purple-700 border-purple-200',
  Hackathon: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Alumni Meet': 'bg-orange-100 text-orange-700 border-orange-200',
  'Industrial Visit': 'bg-teal-100 text-teal-700 border-teal-200',
}

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = events.find(e => e.id === selectedId)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Events & Academic Activities</h1>
              <p className="text-sm text-slate-500">Workshops, lectures, seminars and more · MSc AI, DCST</p>
            </div>
            {canManageEvents && (
              <button className="px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                + Create Event
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event list */}
          <div className={`space-y-4 ${selected ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            {events.map((e) => (
              <div
                key={e.id}
                className={`bg-white border rounded-xl p-5 hover:shadow-sm transition-all cursor-pointer ${selectedId === e.id ? 'border-[#2563eb] shadow-sm ring-1 ring-blue-200' : 'border-slate-200 hover:border-blue-300'}`}
                onClick={() => setSelectedId(selectedId === e.id ? null : e.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${typeStyle[e.type] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>{e.type}</span>
                      {e.registered && <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200 font-medium">✓ Registered</span>}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{e.title}</h3>
                    <p className="text-sm text-[#2563eb] font-medium mt-1">{e.speaker}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-slate-800">{e.date}</p>
                    <p className="text-xs text-slate-500">{e.time}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{e.venue}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mt-3 line-clamp-2">{e.desc}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {e.tags.map(t => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{e.remaining} seats left</span>
                    {!e.registered && canManageEvents && (
                      <button
                        className="text-xs px-3 py-1.5 bg-[#1e3a8a] text-white font-medium rounded hover:bg-[#1e40af] transition-colors"
                        onClick={(ev) => { ev.stopPropagation() }}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event detail panel */}
          {selected && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden h-fit sticky top-24">
              <div className="bg-[#1e3a8a] p-5 text-white">
                <span className={`inline-block text-xs px-2 py-0.5 rounded border font-medium mb-2 ${typeStyle[selected.type]}`}>{selected.type}</span>
                <h2 className="font-bold text-base leading-snug">{selected.title}</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Date', value: selected.date },
                    { label: 'Time', value: selected.time },
                    { label: 'Venue', value: selected.venue },
                    { label: 'Speaker', value: selected.speaker },
                    { label: 'Seats Available', value: `${selected.remaining} / ${selected.seats}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="col-span-2 border-b border-slate-100 pb-2 last:border-0">
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1.5">About</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{selected.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map(t => (
                    <span key={t} className="text-xs bg-[#eff6ff] text-[#1e40af] px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                {!selected.registered && canManageEvents && (
                  <button className="w-full py-2.5 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                    Register for Event
                  </button>
                )}
                {selected.registered && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-xs font-semibold text-green-700">✓ You are registered for this event</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
