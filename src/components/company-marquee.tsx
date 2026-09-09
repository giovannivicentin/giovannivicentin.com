'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from './motion/experience-provider'

const companies = [
  {
    name: 'Itaú Unibanco',
    image: '/images/icons/itau-orange.svg',
    kind: 'itau',
  },
  {
    name: 'Carrefour',
    image: '/images/icons/carrefour.svg',
    kind: 'carrefour',
  },
  {
    name: 'Sam’s Club Brasil',
    image: '/images/icons/sams-club.svg',
    kind: 'sams',
  },
] as const

export function CompanyMarquee({ label }: { label: string }) {
  const motionAllowed = useMotionAllowed()
  const [inView, setInView] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={root}
      className="company-marquee"
      role="group"
      aria-labelledby="company-marquee-label"
      data-motion={motionAllowed}
      data-paused={!inView}
    >
      <div className="company-marquee-heading">
        <p id="company-marquee-label">{label}</p>
      </div>
      <div className="company-marquee-viewport">
        <div className="company-marquee-track">
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              className="company-marquee-group"
              aria-hidden={duplicate || undefined}
              inert={duplicate || undefined}
            >
              {companies.map((company) => (
                <li
                  key={company.kind}
                  className="company-logo"
                  data-company={company.kind}
                >
                  <Image
                    src={company.image}
                    alt={company.name}
                    width={company.kind === 'sams' ? 160 : 48}
                    height={company.kind === 'sams' ? 27 : 48}
                  />
                  {company.kind !== 'sams' && (
                    <span aria-hidden="true">{company.name}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
