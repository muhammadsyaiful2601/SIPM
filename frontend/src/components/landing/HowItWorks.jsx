import { metaStats } from '../../data/hero'
import { sectionWrapper } from '../../lib/ui'

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-heading"
      className="scroll-mt-20 bg-white py-20"
    >
      <div className={sectionWrapper}>
        <div className="reveal-group mx-auto max-w-2xl text-center">
          <h2
            id="cara-kerja-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Cara kerjanya
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Satu aduan melewati tiga fase, dan di setiap fase ada titik kendali
            yang bisa dipantau baik oleh pelapor maupun petugas.
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {metaStats.map((stat, index) => (
              <li
                key={stat.label}
                className="flex items-center gap-3 text-sm"
              >
                {index > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
                )}
                <span>
                  <span className="font-mono text-xs font-semibold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="ml-1.5 text-slate-500">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}