import { partners } from '../../data/hero'
import { sectionWrapper } from '../../lib/ui'

export default function LogoStrip() {
  return (
    <section
      aria-label="Unit terkait"
      className="border-y border-slate-100 bg-slate-50/70 py-10"
    >
      <div className={sectionWrapper}>
        <p className="text-center text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Digunakan oleh unit di PSDKU Tanah Datar
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <li
              key={partner}
              className="text-sm font-semibold tracking-tight text-slate-400"
            >
              {partner}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}