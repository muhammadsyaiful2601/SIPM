import { ArrowRight } from 'lucide-react'
import steps from '../../data/steps'
import { iconMap } from '../../lib/iconMap'
import {
  bodyText,
  cardBase,
  cardInteractive,
  headingText,
  sectionLabel,
  sectionTitle,
  sectionWrapper,
} from '../../lib/ui'

function StepCard({ step }) {
  const Icon = iconMap[step.icon]

  return (
    <div className={'relative ' + cardBase + ' p-6 ' + cardInteractive}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span
          aria-hidden="true"
          className="text-3xl leading-none font-extrabold text-emerald-100"
        >
          {step.number}
        </span>
      </div>
      <h3 className={headingText + ' mt-4'}>
        <span className="sr-only">Langkah {step.number}: </span>
        {step.title}
      </h3>
      <p className={bodyText + ' mt-2'}>{step.description}</p>
    </div>
  )
}

export default function Steps() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="langkah-heading"
      className="scroll-mt-20 bg-slate-50 py-16 sm:py-20"
    >
      <div className={sectionWrapper}>
        <div className="max-w-2xl">
          <span className={sectionLabel}>Cara Kerja</span>
          <h2 id="langkah-heading" className={sectionTitle}>
            Empat langkah, selesai
          </h2>
          <p className="mt-3 text-slate-600">
            Ikuti alur berikut mulai dari masuk hingga aduan Anda diteruskan ke
            unit yang menangani.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.number} className="relative">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 -right-6 hidden -translate-y-1/2 items-center lg:flex"
                >
                  <span className="block h-px w-3 bg-slate-300" />
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </span>
              )}
              <StepCard step={step} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}