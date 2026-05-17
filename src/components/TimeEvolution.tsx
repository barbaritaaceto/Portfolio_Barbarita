import { useRef, useState, useEffect } from 'react'
import ImageComparisonSlider from './ImageComparisonSlider'

interface Props {
  isEnglish: boolean
}

export default function TimeEvolution({ isEnglish }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        width: 160,
        maxWidth: 180,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <ImageComparisonSlider
        imgBefore="/barbi-baby-aligned.png"
        imgAfter="/barbi-adult-aligned.png"
        altBefore="Barbara de niña"
        altAfter="Barbara hoy"
        initialPosition={50}
      />
    </div>
  )
}
