'use client'

import { useRouter } from 'next/navigation'
import { Page, ROUTE_MAP } from '@/src/types/types'

export default function HomePage() {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])
  const NO_FOOTER_PAGES: Page[] = ['login']
  const notices = [
    { title: 'Internal Assessment Schedule Released', category: 'Examination', date: 'Sep 29, 2026', desc: 'The IA schedule for MSc AI Part II has been published. Students are advised to check their subject-wise dates and prepare accordingly.' },
    { title: 'Deep Learning Lab Session Rescheduled', category: 'Academic', date: 'Sep 27, 2026', desc: 'The Deep Learning practical session originally scheduled for Monday has been moved to Wednesday, 2:00 PM in Lab 3.' },
    { title: 'AI Workshop Registration Open', category: 'Event', date: 'Sep 25, 2026', desc: 'Registration for the two-day Applied AI Workshop is now open. Limited seats available. Industry professionals will be conducting the sessions.' },
    { title: 'Dissertation Proposal Submission Deadline', category: 'Urgent', date: 'Sep 24, 2026', desc: 'Final date for submission of MSc AI dissertation proposals is October 15, 2026. Proposals must be submitted via the academic portal.' },
  ]

  const events = [
    { title: 'Applied AI Workshop', date: 'Oct 5–6, 2026', type: 'Workshop', venue: 'Seminar Hall A', speaker: 'Industry Experts from TCS & Infosys' },
    { title: 'Guest Lecture: LLMs in Industry', date: 'Oct 10, 2026', type: 'Guest Lecture', venue: 'Main Auditorium', speaker: 'Dr. Aryan Kapoor, Google DeepMind' },
    { title: 'MSc AI Research Seminar', date: 'Oct 18, 2026', type: 'Seminar', venue: 'Conference Room 1', speaker: 'Faculty Panel' },
  ]

  const faculty = [
    { name: 'Dr. Priya Nair', designation: 'Associate Professor & HoD', research: ['Machine Learning', 'Deep Learning', 'Computer Vision'], initials: 'PN' },
    { name: 'Dr. Suresh Menon', designation: 'Assistant Professor', research: ['Natural Language Processing', 'Computational Linguistics'], initials: 'SM' },
    { name: 'Prof. Anita Desai', designation: 'Assistant Professor', research: ['Reinforcement Learning', 'Robotics', 'AI Ethics'], initials: 'AD' },
    { name: 'Dr. Vikram Rao', designation: 'Associate Professor', research: ['Data Science', 'Statistical Learning', 'Big Data'], initials: 'VR' },
  ]

  const catColor: Record<string, string> = {
    Examination: 'bg-purple-100 text-purple-700',
    Academic: 'bg-blue-100 text-blue-700',
    Event: 'bg-green-100 text-green-700',
    Urgent: 'bg-red-100 text-red-700',
    Department: 'bg-orange-100 text-orange-700',
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-100">Academic Year 2026–27 · Semester I</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              MSc Artificial<br />Intelligence
            </h1>
            <p className="text-blue-100 text-base mb-2 font-medium">
              Goa Business School · Department of Computer Science & Technology
            </p>
            <p className="text-blue-200 text-sm leading-relaxed mb-8 max-w-xl">
              An academic portal connecting MSc Artificial Intelligence students, faculty and alumni — for timetables, notices, research, tasks and community.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('timetable')}
                className="px-6 py-3 bg-white text-[#1e3a8a] font-semibold rounded text-sm hover:bg-blue-50 transition-colors shadow-sm"
              >
                Explore MSc AI
              </button>
              <button
                onClick={() => navigate('login')}
                className="px-6 py-3 bg-transparent border border-white/50 text-white font-medium rounded text-sm hover:bg-white/10 transition-colors"
              >
                Student / Faculty Login
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Access */}
      <section className="bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Timetable', icon: '📅', page: 'timetable' as Page },
              { label: 'Notices', icon: '📋', page: 'notices' as Page },
              { label: 'Events', icon: '🎓', page: 'events' as Page },
              { label: 'Faculty', icon: '👨‍🏫', page: 'faculty-directory' as Page },
              { label: 'Research', icon: '🔬', page: 'faculty-directory' as Page },
              { label: 'Community', icon: '🤝', page: 'community' as Page },
            ].map(({ label, icon, page }) => (
              <button
                key={label}
                onClick={() => navigate(page)}
                className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm hover:bg-blue-50/50 transition-all group"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#1e3a8a]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notices column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Latest Notices</h2>
              <button onClick={() => navigate('notices')} className="text-sm text-[#2563eb] hover:text-blue-800 font-medium">View All →</button>
            </div>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.title} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">{n.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${catColor[n.category] || 'bg-slate-100 text-slate-600'}`}>
                      {n.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{n.date}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{n.desc}</p>
                  <button onClick={() => navigate('notices')} className="text-xs text-[#2563eb] font-medium hover:underline">View Notice →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Upcoming Events</h2>
                <button onClick={() => navigate('events')} className="text-sm text-[#2563eb] font-medium">View All →</button>
              </div>
              <div className="space-y-3">
                {events.map((e) => (
                  <div key={e.title} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200">
                        <span className="text-[#2563eb] text-xs font-bold">{e.date.split(' ')[0].replace(',', '')}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug">{e.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{e.date}</p>
                        <span className="text-xs text-blue-600 font-medium">{e.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programme info */}
            <div className="bg-[#eff6ff] border border-blue-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-[#1e3a8a] mb-2">MSc Artificial Intelligence</h3>
              <ul className="text-xs text-slate-700 space-y-1.5">
                <li className="flex justify-between"><span>Duration</span><span className="font-medium">2 Years (4 Semesters)</span></li>
                <li className="flex justify-between"><span>Programme Type</span><span className="font-medium">Full-time</span></li>
                <li className="flex justify-between"><span>Intake</span><span className="font-medium">30 Students/Year</span></li>
                <li className="flex justify-between"><span>Department</span><span className="font-medium">DCST, GBS</span></li>
              </ul>
              <button onClick={() => navigate('faculty-directory')} className="mt-4 w-full text-center text-xs text-[#2563eb] font-medium hover:underline">
                View Programme Details →
              </button>
            </div>
          </div>
        </div>

        {/* Faculty preview */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Faculty & Research</h2>
              <p className="text-sm text-slate-500">Meet the academic faculty of MSc AI, DCST</p>
            </div>
            <button onClick={() => navigate('faculty-directory')} className="text-sm text-[#2563eb] font-medium">View Directory →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {faculty.map((f) => (
              <div key={f.name} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">{f.initials}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{f.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{f.designation} · DCST</p>
                <div className="flex flex-wrap gap-1">
                  {f.research.slice(0, 2).map((r) => (
                    <span key={r} className="text-xs bg-[#eff6ff] text-[#1e40af] px-2 py-0.5 rounded">{r}</span>
                  ))}
                </div>
                <button onClick={() => navigate('faculty-profile')} className="mt-3 text-xs text-[#2563eb] font-medium hover:underline">View Profile →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Community banner */}
        <div className="mt-10 bg-[#1e3a8a] rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">MSc AI Community</h2>
          <p className="text-blue-200 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Connect with current students, alumni, and faculty. Share research, discuss projects, discover career opportunities, and stay engaged with the MSc AI academic community.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('community')} className="px-5 py-2.5 bg-white text-[#1e3a8a] font-semibold rounded text-sm hover:bg-blue-50 transition-colors">
              Explore Community
            </button>
            <button onClick={() => navigate('login')} className="px-5 py-2.5 border border-white/40 text-white rounded text-sm hover:bg-white/10 transition-colors">
              Join as Student / Alumni
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
