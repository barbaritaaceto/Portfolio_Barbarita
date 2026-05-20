import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Before/after face comparison slider.
 *
 * Architecture: TWO independent half-wrappers, each with overflow:hidden.
 * Each image fills its half with object-cover + a tuned object-position
 * that centers the face within that half.
 *
 * Baby  (800×704):  face is roughly centered horizontally, at ~40% from top
 * Adult (1500×1594): face is roughly at 35% from left, 18% from top
 *
 * Tune BABY_POS and ADULT_POS to align mouths/eyes visually.
 */

// Images are pre-aligned (600×800, 3:4 ratio = same as container ratio).
// object-cover fills the container with no overflow → nose always at 50% x.
// clip-path on the baby layer reveals left/right halves as the handle moves.

interface Props {
  imgBefore: string
  imgAfter: string
  altBefore?: string
  altAfter?: string
  initialPosition?: number
}

export default function ImageComparisonSlider({
  imgBefore,
  imgAfter,
  altBefore = 'Barbara 1989',
  altAfter = 'Barbara 2026',
  initialPosition = 50,
}: Props) {
  const [position, setPosition] = useState(initialPosition)
  const [dragging, setDragging] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120)
    return () => clearTimeout(t)
  }, [])

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    setPosition(clamp(((clientX - left) / width) * 100, 2, 98))
  }, [])

  // ── Mouse ──
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    updateFromClientX(e.clientX)
  }
  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => updateFromClientX(e.clientX)
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [dragging, updateFromClientX])

  // ── Touch ──
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true)
    updateFromClientX(e.touches[0].clientX)
  }
  useEffect(() => {
    if (!dragging) return
    const move = (e: TouchEvent) => updateFromClientX(e.touches[0].clientX)
    const up = () => setDragging(false)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('touchend', up)
    return () => { window.removeEventListener('touchmove', move); window.removeEventListener('touchend', up) }
  }, [dragging, updateFromClientX])

  return (
    <div
      ref={containerRef}
      aria-label="Comparación de fotos — Barbara 1989 y 2026"
      role="img"
      className="relative select-none overflow-hidden"
      style={{
        borderRadius: 20,
        aspectRatio: '3 / 4',
        cursor: dragging ? 'ew-resize' : 'col-resize',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 0.5s ease',
        boxShadow: '0 4px 24px rgba(31,46,42,0.12)',
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* ── AFTER (adult 2026): fills full container — bottom layer ── */}
      <img
        src={imgAfter}
        alt={altAfter}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          objectPosition: '50% 0%',
          filter: 'brightness(0.96) saturate(0.92)',
        }}
      />

      {/* ── BEFORE (baby 1989): fills full container, clipped to left portion ── */}
      {/* clip-path keeps left {position}% visible; nose is at exactly 50% of the
          600×800 aligned image → nose meets nose at the split line */}
      <img
        src={imgBefore}
        alt={altBefore}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          objectPosition: '50% 0%',
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          filter: 'brightness(0.92) saturate(0.78) sepia(0.18)',
        }}
      />
      {/* warm vignette on baby side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: 'linear-gradient(to right, rgba(220,180,140,0.10) 0%, transparent 70%)',
        }}
      />

      {/* ── Divider line ── */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${position}%`,
          width: 1,
          backgroundColor: 'rgba(255,255,255,0.60)',
          transform: 'translateX(-0.5px)',
        }}
      />



      {/* ── Year labels ── */}
      <span
        className="absolute bottom-2.5 left-2.5 pointer-events-none"
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.92)',
          backgroundColor: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 20,
          padding: '3px 8px',
          lineHeight: 1,
        }}
      >
        1989
      </span>
      <span
        className="absolute bottom-2.5 right-2.5 pointer-events-none"
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.92)',
          backgroundColor: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 20,
          padding: '3px 8px',
          lineHeight: 1,
        }}
      >
        2026
      </span>
    </div>
  )
}
