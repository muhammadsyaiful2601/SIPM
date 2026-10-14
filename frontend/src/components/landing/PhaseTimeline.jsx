import phases from '../../data/phases'
import { sectionWrapper } from '../../lib/ui'

const tones = {
  emerald: {
    line: 'bg-emerald-400',
    dot: 'border-emerald-400 bg-white',
    label: 'text-emerald-600',
    gate: 'bg-emerald-500 text-white',
    curve: 'border-emerald-400',
  },
  amber: {
    line: 'bg-amber-400',
    dot: 'border-amber-400 bg-white',
    label: 'text-amber-600',
    gate: 'bg-amber-500 text-white',
    curve: 'border-amber-400',
  },
  sky: {
    line: 'bg-sky-500',
    dot: 'border-sky-500 bg-white',
    label: 'text-sky-600',
    gate: 'bg-sky-600 text-white',
    curve: 'border-sky-500',
  },
}

function Curve({ tone, side }) {
  const base =
    'hidden h-10 w-10 md:block ' + tones[tone].curve + ' border-2 '

  return (
    <span
      aria-hidden="true"
      className={
        base +
        (side === 'right'
          ? 'ml-auto rounded-br-3xl border-t-0 border-l-0'
          : 'rounded-bl-3xl border-t-0 border-r-0')
      }
    />
  )
}

export default function PhaseTimeline() {
  return (
    <section
      id="tahapan"
      aria-labelledby="tahapan-heading"
      className="scroll-mt-20 bg-slate-50 py-20"
    >
      <div className={sectionWrapper}>
        <h2 id="tahapan-heading" className="sr-only">
          Tahapan penanganan aduan
        </h2>

        <ol className="space-y-10 md:space-y-12">
          {phases.map((phase, index) => {
            const tone = tones[phase.tone]

            return (
              <li key={phase.id}>
                <p
                  className={
                    'font-mono text-xs font-semibold tracking-widest uppercase ' +
                    tone.label
                  }
                >
                  {phase.id} - {phase.label}
                </p>

                <div className="mt-6 flex items-start gap-4 md:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className={
                          'absolute top-1.5 right-0 left-0 h-0.5 rounded-full ' +
                          tone.line
                        }
                      />
                      <ul className="relative grid gap-6 sm:grid-cols-3">
                        {phase.checkpoints.map((checkpoint) => (
                          <li key={checkpoint.title}>
                            <span
                              aria-hidden="true"
                              className={
                                'block h-3.5 w-3.5 rounded-full ring-4 ring-slate-50 ' +
                                tone.dot
                              }
                            />
                            <p className="mt-3 text-sm font-semibold text-slate-900">
                              {checkpoint.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                              {checkpoint.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Curve
                      tone={phase.tone}
                      side={index % 2 === 0 ? 'right' : 'left'}
                    />
                  </div>

                  <span
                    className={
                      'hidden shrink-0 rounded-full px-4 py-2 font-mono text-[11px] font-semibold tracking-wide uppercase md:inline-block ' +
                      tone.gate
                    }
                  >
                    {phase.gate}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-12 text-center font-mono text-xs text-slate-500">
         Dukungan PPKPT: /hubungi-petugas - /panduan-aduan - /status-aduan-
          /faq
        </p>
      </div>
    </section>
  )
}