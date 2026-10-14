import phases from '../../data/phases'
import { sectionWrapper } from '../../lib/ui'

const tones = {
  emerald: {
    line: 'bg-emerald-400',
    dot: 'bg-emerald-500',
    label: 'text-emerald-600',
    pill: 'bg-emerald-500 text-white',
    stroke: 'border-emerald-400',
  },
  amber: {
    line: 'bg-amber-400',
    dot: 'bg-amber-500',
    label: 'text-amber-600',
    pill: 'bg-amber-500 text-white',
    stroke: 'border-amber-400',
  },
  sky: {
    line: 'bg-sky-500',
    dot: 'bg-sky-600',
    label: 'text-sky-600',
    pill: 'bg-sky-600 text-white',
    stroke: 'border-sky-500',
  },
}

function PhasePill({ tone, children }) {
  return (
    <span
      className={
        'inline-block rounded-full px-4 py-2 font-mono text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase ' +
        tones[tone].pill
      }
    >
      {children}
    </span>
  )
}

function Connector({ tone, side }) {
  const corner =
    side === 'right'
      ? 'rounded-tr-[56px] border-t-[3px] border-r-[3px]'
      : 'rounded-tl-[56px] border-t-[3px] border-l-[3px]'

  return (
    <span
      aria-hidden="true"
      className={
        'pointer-events-none absolute top-[3px] hidden h-[72px] w-16 md:block ' +
        corner +
        ' ' +
        (side === 'right' ? 'right-0' : 'left-0') +
        ' ' +
        tones[tone].stroke
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

        <ol className="reveal-group max-w-5xl space-y-8 md:space-y-10">
          {phases.map((phase, index) => {
            const tone = tones[phase.tone]
            const isReversed = index % 2 === 1
            const hasConnector = index < phases.length - 1

            const connectorSide = isReversed ? 'left' : 'right'
            const gateOnLeft = hasConnector && connectorSide === 'right'
            const inset = gateOnLeft
              ? 'md:pr-20'
              : hasConnector
                ? 'md:pl-20'
                : 'md:pr-3'

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

                <div className="mt-5 flex items-start gap-5 md:gap-6">
                  {gateOnLeft && (
                    <span className="hidden -mt-[15px] md:inline-block">
                      <PhasePill tone={phase.tone}>{phase.gate}</PhasePill>
                    </span>
                  )}

                  <div className="relative min-w-0 flex-1">
                    <span
                      aria-hidden="true"
                      className={
                        'absolute top-[3px] right-0 left-0 hidden h-[3px] rounded-full md:block ' +
                        tone.line
                      }
                    />

                    <ul
                      className={
                        'relative flex flex-col gap-6 md:flex-row md:gap-8 ' +
                        inset
                      }
                    >
                      {phase.checkpoints.map((checkpoint) => (
                        <li
                          key={checkpoint.title}
                          className="min-w-0 md:flex-1"
                        >
                          <span
                            aria-hidden="true"
                            className={
                              'hidden h-3 w-3 rounded-full ring-4 ring-slate-50 md:block ' +
                              tone.dot
                            }
                          />
                          <p className="text-sm font-semibold text-slate-900 md:mt-4">
                            {checkpoint.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600">
                            {checkpoint.description}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {hasConnector && (
                      <Connector tone={phase.tone} side={connectorSide} />
                    )}
                  </div>

                  {!gateOnLeft && (
                    <span className="hidden -mt-[15px] md:inline-block">
                      <PhasePill tone={phase.tone}>{phase.gate}</PhasePill>
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-14 text-center font-mono text-xs text-slate-500">
          Dukungan PPKPT: /hubungi-petugas - /panduan-aduan - /status-aduan -
          /faq
        </p>
      </div>
    </section>
  )
}