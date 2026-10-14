import features from '../../data/features'
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

export default function Features() {
  return (
    <section
      id="fitur"
      aria-labelledby="fitur-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20"
    >
      <div className={sectionWrapper}>
        <div className="max-w-2xl">
          <span className={sectionLabel}>Fitur</span>
          <h2 id="fitur-heading" className={sectionTitle}>
            Semua yang Anda butuhkan untuk melapor dengan aman
          </h2>
          <p className="mt-3 text-slate-600">
            SIPM dirancang agar mahasiswa lebih berani bersuara karena setiap
            aduan pasti tercatat dan mendapat tanggapan.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <li
                key={feature.title}
                className={cardBase + ' p-6 ' + cardInteractive}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className={headingText + ' mt-4'}>{feature.title}</h3>
                <p className={bodyText + ' mt-2'}>{feature.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}