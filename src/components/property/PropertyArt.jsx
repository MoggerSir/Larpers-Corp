import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ease } from '@/lib/motion'

// Ilustración arquitectónica generativa (Manual 6.1: volumen, luz y silencio).
// Monocroma, perspectiva nivelada; se recorta con `slice` para 16:9, 4:3, 3:2 y 1:1.

const TONES = [
  { sky: '#DAD7D1', sea: '#BFC1BE', ground: '#C5C3BE', body: '#ECEAE5', side: '#DEDBD5', glass: '#4A4C4C', line: '#8A8985' },
  { sky: '#E3E1DC', sea: '#B8BBB9', ground: '#BDBBB5', body: '#F2F0EB', side: '#E2DFD9', glass: '#3E4142', line: '#7E7D79' },
  { sky: '#D2CFC9', sea: '#C3C4C0', ground: '#CAC7C1', body: '#E7E4DE', side: '#D8D5CF', glass: '#565857', line: '#908F8A' },
]

const W = 480
const H = 360
const HORIZON = 206
const GROUND = 288

function Tower({ x, width, floors, floorH, c, emphasis }) {
  const top = GROUND - floors * floorH - 10
  const glassW = width * (emphasis ? 0.42 : 0.5)
  return (
    <g>
      {/* volumen lateral para dar profundidad sin sombras */}
      <rect x={x + width} y={top + 6} width={width * 0.12} height={GROUND - top - 6} fill={c.side} />
      <rect x={x} y={top} width={width} height={GROUND - top} fill={c.body} />
      {/* losa de azotea */}
      <rect x={x - 6} y={top - 5} width={width + 12} height={5} fill={c.line} opacity=".55" />
      {Array.from({ length: floors }, (_, i) => {
        const y = top + 10 + i * floorH
        return (
          <g key={i}>
            <rect x={x + width - glassW - 8} y={y} width={glassW} height={floorH - 5} fill={c.glass} />
            {/* mullions */}
            {[1, 2, 3].map((m) => (
              <rect key={m} x={x + width - glassW - 8 + (glassW / 4) * m} y={y} width={0.8} height={floorH - 5} fill={c.body} opacity=".7" />
            ))}
            {/* balcón: filete continuo */}
            <rect x={x - 4} y={y + floorH - 5} width={width + 8} height={1.6} fill={c.line} />
          </g>
        )
      })}
      {/* plano ciego con vano vertical */}
      <rect x={x + 10} y={top + 10} width={width - glassW - 30} height={GROUND - top - 22} fill="#FFFFFF" opacity=".35" />
    </g>
  )
}

function layout(towers, floors) {
  if (towers === 1) return [{ x: 125, width: 220, floors, emphasis: true }]
  if (towers === 2)
    return [
      { x: 80, width: 140, floors: Math.max(3, floors - 3) },
      { x: 244, width: 170, floors, emphasis: true },
    ]
  return [
    { x: 60, width: 100, floors: Math.max(3, floors - 1) },
    { x: 178, width: 110, floors: floors + 2, emphasis: true },
    { x: 306, width: 104, floors },
  ]
}

function Facade({ art, c, animate, clipId, reduce }) {
  const reveal = animate && !reduce
  const towers = layout(art.towers, art.floors)
  // altura de piso común: todas las torres comparten escala
  const floorH = Math.min(22, 190 / Math.max(...towers.map((t) => t.floors)))
  return (
    <>
      <rect width={W} height={H} fill={c.sky} />
      {art.sea && (
        <>
          <rect y={HORIZON} width={W} height={GROUND - HORIZON} fill={c.sea} />
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1={i * 60}
              x2={W - i * 40}
              y1={HORIZON + 14 + i * 18}
              y2={HORIZON + 14 + i * 18}
              stroke="#FFFFFF"
              strokeOpacity=".35"
              strokeWidth=".8"
              initial={reveal ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: ease.out, delay: 0.6 + i * 0.12 }}
            />
          ))}
        </>
      )}
      <rect y={GROUND} width={W} height={H - GROUND} fill={c.ground} />

      <clipPath id={clipId}>
        <motion.rect
          x="0"
          width={W}
          height={H}
          initial={reveal ? { y: H } : false}
          animate={{ y: 0 }}
          transition={{ duration: 1.6, ease: ease.out, delay: 0.2 }}
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {towers.map((t, i) => (
          <Tower key={i} {...t} floorH={floorH} c={c} />
        ))}
      </g>

      {/* línea de suelo */}
      <motion.line
        x1="40"
        x2={W - 40}
        y1={GROUND + 6}
        y2={GROUND + 6}
        stroke={c.line}
        strokeWidth="3"
        initial={reveal ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: ease.out }}
      />
    </>
  )
}

function Terrace({ art, c }) {
  return (
    <>
      <rect width={W} height={H} fill={c.body} />
      {/* vano de piso a techo hacia el horizonte */}
      <rect x="40" y="40" width="400" height="250" fill={c.sky} />
      {art.sea ? <rect x="40" y="170" width="400" height="120" fill={c.sea} /> : <rect x="40" y="190" width="400" height="100" fill={c.ground} />}
      {[140, 240, 340].map((x) => (
        <rect key={x} x={x} y="40" width="3" height="250" fill={c.line} />
      ))}
      <rect x="40" y="226" width="400" height="2" fill={c.line} opacity=".6" />
      <rect y="290" width={W} height="70" fill={c.side} />
      {/* mobiliario: banca baja y mesa */}
      <rect x="70" y="262" width="150" height="28" fill={c.glass} opacity=".85" />
      <rect x="290" y="270" width="70" height="20" fill={c.line} />
      <rect x="0" y="0" width={W} height="40" fill={c.side} />
    </>
  )
}

function Plan({ c, art }) {
  const rooms = Math.min(art.floors > 8 ? 4 : 3, 4)
  return (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      <g fill="none" stroke={c.glass} strokeWidth="3">
        <rect x="60" y="50" width="360" height="260" />
        <line x1="60" y1="170" x2="250" y2="170" />
        <line x1="250" y1="50" x2="250" y2="310" />
        {Array.from({ length: rooms - 1 }, (_, i) => (
          <line key={i} x1="250" y1={50 + (260 / rooms) * (i + 1)} x2="420" y2={50 + (260 / rooms) * (i + 1)} />
        ))}
      </g>
      <g fill="none" stroke={c.line} strokeWidth="1">
        <path d="M60 230 h-30 v80 h30" strokeDasharray="4 4" />
        <path d="M120 170 a40 40 0 0 1 40 -40" />
        <path d="M250 110 a30 30 0 0 0 -30 30" />
      </g>
      <rect x="20" y="230" width="40" height="80" fill={c.side} opacity=".5" />
    </>
  )
}

function Detail({ c }) {
  return (
    <>
      <rect width={W} height={H} fill={c.body} />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x="0" y={20 + i * 58} width={W} height="38" fill={c.glass} />
          {[96, 192, 288, 384].map((x) => (
            <rect key={x} x={x} y={20 + i * 58} width="1.2" height="38" fill={c.body} opacity=".6" />
          ))}
          <rect x="0" y={58 + i * 58} width={W} height="3" fill={c.line} />
        </g>
      ))}
      <rect x="300" y="0" width="180" height={H} fill={c.side} />
    </>
  )
}

const VIEWS = { facade: Facade, terrace: Terrace, plan: Plan, detail: Detail }

export function PropertyArt({ art, view = 'facade', animate = false, className, title }) {
  const clipId = useId()
  const reduce = useReducedMotion()
  const c = TONES[art.tone % TONES.length]
  const View = VIEWS[view]
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <View art={art} c={c} animate={animate} clipId={clipId} reduce={reduce} />
    </svg>
  )
}

export const GALLERY_VIEWS = [
  { view: 'facade', label: 'Fachada' },
  { view: 'terrace', label: 'Terraza' },
  { view: 'detail', label: 'Cancelería' },
  { view: 'plan', label: 'Planta' },
]
