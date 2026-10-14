import lessons from '../../data/lessons'
import { sectionWrapper } from '../../lib/ui'

function Illustration({ command, labels }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100 sm:p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="font-mono text-xs text-slate-400">{command}</p>

        <ul className="mt-5 space-y-5">
          {labels.map((label) => (
            <li key={label}>
              <p className="font-mono text-[11px] font-semibold tracking-widest text-emerald-600 uppercase">
                {label}
              </p>
              <span className="mt-2 block h-2 w-full rounded-full bg-slate-100" />
              <span className="mt-2 block h-2 w-3/5 rounded-full bg-slate-100" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Lessons() {
  return (
    <section
      id="modul"
      aria-labelledby="modul-heading"
      className="scroll-mt-20 bg-white py-20"
    >
      <div className={sectionWrapper}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="modul-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Modulnya, satu per satu
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Setiap modul punya tugas yang jelas, dari pengisian formulir sampai
            laporan untuk Pembina Kemahasiswaan.
          </p>
        </div>

        <ul className="mt-16 space-y-20">
          {lessons.map((lesson, index) => (
            <li key={lesson.command}>
              <div
                className={
                  'grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ' +
                  (index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : '')
                }
              >
                <Illustration command={lesson.command} labels={lesson.labels} />

                <div>
                  <p className="font-mono text-xs font-semibold tracking-widest text-emerald-600 uppercase">
                    {lesson.phase}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                    {lesson.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {lesson.description}
                  </p>
                  <p className="mt-6 font-mono text-sm text-slate-700">
                    $ <span className="text-emerald-700">{lesson.command}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}