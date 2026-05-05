"use client"

import { useEffect, useRef } from "react"

interface SmokeOverlayProps {
  children: React.ReactNode
  /** 全体パーティクル数（デフォルト: 35） */
  globalCount?: number
  /** 各四隅パーティクル数（デフォルト: 5） */
  cornerCount?: number
  /** マウス反発半径 px（デフォルト: 110） */
  mouseRepelRadius?: number
  style?: React.CSSProperties
  className?: string
}

// value noise（ノイズによる横揺れ用）
function hash(n: number): number {
  const s = Math.sin(n) * 43758.5453123
  return s - Math.floor(s)
}
function noise2(x: number, y: number): number {
  const ix = Math.floor(x),
    iy = Math.floor(y)
  const fx = x - ix,
    fy = y - iy
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  const a = hash(ix + iy * 57)
  const b = hash(ix + 1 + iy * 57)
  const c = hash(ix + (iy + 1) * 57)
  const d = hash(ix + 1 + (iy + 1) * 57)
  return a + (b - a) * ux + (c - a) * uy + (d - a + a - b - c + b) * ux * uy
}

interface Particle {
  cornerIdx: number | undefined
  x: number
  y: number
  vx: number
  vy: number
  size: number
  peakAlpha: number
  noiseOffX: number
  noiseOffY: number
  noiseSpeed: number
  life: number
  maxLife: number
  grow: number
  scaleX: number
  scaleY: number
  rot: number
  rotSpeed: number
  brightness: number
}

function initParticle(
  p: Particle,
  w: number,
  h: number,
  randomLife: boolean,
): void {
  const isCorner = p.cornerIdx !== undefined

  if (isCorner) {
    const cx = [0, w, 0, w][p.cornerIdx!]
    const cy = [0, 0, h, h][p.cornerIdx!]
    p.x = cx + (Math.random() - 0.5) * w * 0.32
    p.y = cy + (Math.random() - 0.5) * h * 0.32
    p.size = Math.random() * 80 + 55
    p.peakAlpha = Math.random() * 0.22 + 0.1
  } else {
    p.x = Math.random() * w
    p.y = Math.random() * h
    p.size = Math.random() * 55 + 20
    p.peakAlpha = Math.random() * 0.08 + 0.02
  }

  p.vx = (Math.random() - 0.5) * 0.3
  p.vy = -(Math.random() * 0.45 + 0.12)
  p.noiseOffX = Math.random() * 100
  p.noiseOffY = Math.random() * 100
  p.noiseSpeed = Math.random() * 0.006 + 0.003
  p.maxLife = Math.random() * 360 + 180
  p.life = randomLife ? Math.floor(Math.random() * p.maxLife) : 0
  p.grow = Math.random() * 0.18 + 0.05
  p.scaleX = Math.random() * 0.5 + 0.75
  p.scaleY = Math.random() * 0.5 + 0.75
  p.rot = Math.random() * Math.PI * 2
  p.rotSpeed = (Math.random() - 0.5) * 0.006
  p.brightness = Math.floor(Math.random() * 80 + 190)
}

function createParticle(
  cornerIdx: number | undefined,
  w: number,
  h: number,
  randomLife: boolean,
): Particle {
  const p = { cornerIdx } as Particle
  initParticle(p, w, h, randomLife)
  return p
}

function updateParticle(
  p: Particle,
  frame: number,
  mouseX: number,
  mouseY: number,
  repelRadius: number,
  w: number,
  h: number,
): void {
  const nx = noise2(p.noiseOffX + frame * p.noiseSpeed, p.noiseOffY) * 2 - 1
  const ny = noise2(p.noiseOffX, p.noiseOffY + frame * p.noiseSpeed) * 2 - 1
  p.vx += nx * 0.04
  p.vy += ny * 0.01
  p.vx *= 0.97
  p.vy *= 0.97

  const dx = p.x - mouseX
  const dy = p.y - mouseY
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < repelRadius && dist > 0) {
    const f = ((repelRadius - dist) / repelRadius) * 0.9
    p.vx += (dx / dist) * f * 0.18
    p.vy += (dy / dist) * f * 0.18
  }

  p.x += p.vx
  p.y += p.vy
  p.size += p.grow
  p.rot += p.rotSpeed
  p.life++

  if (p.life >= p.maxLife) {
    initParticle(p, w, h, false)
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle): void {
  const t = p.life / p.maxLife
  const alpha = p.peakAlpha * Math.sin(t * Math.PI) ** 0.6
  if (alpha < 0.003) return

  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.scale(p.scaleX, p.scaleY)

  const r = p.size
  const g = ctx.createRadialGradient(0, 0, r * 0.05, 0, 0, r)
  const b = p.brightness
  g.addColorStop(0, `rgba(${b},${b},${b},${alpha})`)
  g.addColorStop(0.45, `rgba(${b},${b},${b},${alpha * 0.85})`)
  g.addColorStop(0.75, `rgba(${b},${b},${b},${alpha * 0.4})`)
  g.addColorStop(0.92, `rgba(${b},${b},${b},${alpha * 0.1})`)
  g.addColorStop(1, `rgba(${b},${b},${b},0)`)

  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function SmokeOverlay({
  children,
  globalCount = 35,
  cornerCount = 5,
  mouseRepelRadius = 110,
  style,
  className,
}: SmokeOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sync = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    sync()

    const w = canvas.width
    const h = canvas.height

    const particles: Particle[] = []
    for (let c = 0; c < 4; c++) {
      for (let i = 0; i < cornerCount; i++) {
        particles.push(createParticle(c, w, h, true))
      }
    }
    for (let i = 0; i < globalCount; i++) {
      particles.push(createParticle(undefined, w, h, true))
    }
    particlesRef.current = particles

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    container.addEventListener("mousemove", onMouseMove)
    container.addEventListener("mouseleave", onMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameRef.current++
      const { x: mx, y: my } = mouseRef.current
      for (const p of particlesRef.current) {
        updateParticle(
          p,
          frameRef.current,
          mx,
          my,
          mouseRepelRadius,
          canvas.width,
          canvas.height,
        )
        drawParticle(ctx, p)
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const ro = new ResizeObserver(sync)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener("mousemove", onMouseMove)
      container.removeEventListener("mouseleave", onMouseLeave)
      ro.disconnect()
    }
  }, [globalCount, cornerCount, mouseRepelRadius])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", flex: "1", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}
