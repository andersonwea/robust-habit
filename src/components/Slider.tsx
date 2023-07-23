'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { DifferentialCard } from './DifferentialCard'
import { useEffect, useState } from 'react'

interface Cards {
  id: number
  icon: StaticImport
  title: string
  text: string
  buttonText: string
}

interface SliderProps {
  cards: Cards[]
}

export function Slider({ cards }: SliderProps) {
  const [slidesPerView, setSlidesPerView] = useState(4)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: slidesPerView,
      spacing: 18,
    },
  })

  useEffect(() => {
    const sm = window.matchMedia('(max-width: 640px)')
    const md = window.matchMedia('(max-width: 1024px)')
    const lg = window.matchMedia('(min-width: 1024px)')

    if (lg.matches) setSlidesPerView(4)
    if (md.matches) setSlidesPerView(3)
    if (sm.matches) setSlidesPerView(2)
  }, [])

  return (
    <div className="keen-slider py-12" ref={sliderRef}>
      {cards.map((card) => {
        return (
          <DifferentialCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            text={card.text}
            buttonText={card.buttonText}
            className="keen-slider__slide"
          />
        )
      })}
    </div>
  )
}
