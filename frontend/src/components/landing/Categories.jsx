import categories from '../../data/categories'
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

export default function Categories() {
  return (
    <section
      id="kategori"
      aria-labelledby="kategori-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20"
    >
      <div className={sectionWrapper}>
        <div className="max-w-2xl">
          <span className={sectionLabel}>Kategori</span>
          <h2 id="kategori-heading" className={sectionTitle}>
            Pilih kategori aduan Anda
          </h2>
          <p className="mt-3 text-slate-600">
            Pilih kategori agar aduan sampai ke unit yang tepat agar
            penanganan lebih cepat.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {categories.map((category) => {
            const Icon = iconMap[category.icon]
            return (
              <li
                key={category.key}
                className={cardBase + ' p-6 ' + cardInteractive}
              >
                <span
                  className={
                    'flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800'
                  }
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className={headingText + ' mt-4'}>{category.title}</h3>
                <p className={bodyText + ' mt-2'}>{category.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}