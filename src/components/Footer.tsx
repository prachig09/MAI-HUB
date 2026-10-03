import type { Page } from '@/src/types/types'

interface FooterProps {
  navigate: (p: Page) => void
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#0f172a] text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1e3a8a] border border-blue-700 flex items-center justify-center">
                <span className="text-xs font-bold text-white">GBS</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Goa Business School</div>
                <div className="text-slate-400 text-xs">DCST · MSc AI</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The official academic portal for MSc Artificial Intelligence students, faculty and alumni of the Department of Computer Science & Technology.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Academics</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Timetable', page: 'timetable' as Page },
                { label: 'Notices', page: 'notices' as Page },
                { label: 'Events', page: 'events' as Page },
                { label: 'Calendar', page: 'calendar' as Page },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button onClick={() => navigate(page)} className="hover:text-blue-400 transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Department</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Faculty Directory', page: 'faculty-directory' as Page },
                { label: 'Research & Publications', page: 'faculty-directory' as Page },
                { label: 'Community', page: 'community' as Page },
                { label: 'MSc AI Programme', page: 'home' as Page },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button onClick={() => navigate(page)} className="hover:text-blue-400 transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Contact</h4>
            <address className="not-italic text-xs space-y-2 text-slate-400">
              <p>Department of CS & Technology</p>
              <p>Goa Business School</p>
              <p>Panaji, Goa — 403 001</p>
              <p className="pt-1">
                <a href="mailto:dcst@gbs.ac.in" className="hover:text-blue-400 transition-colors">dcst@gbs.ac.in</a>
              </p>
              <p>+91 832 000 0000</p>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Goa Business School — Department of Computer Science & Technology. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-300 transition-colors">Terms of Use</button>
            <button className="hover:text-slate-300 transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
