"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  particleImage?: string
  className?: string
  id?: string
  opacity?: number
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  particleColor = "#FFF",
  particleImage,
  opacity = 1, 
  ...props
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMouse({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleResize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        setContext(ctx)
        setWidth(canvas.offsetWidth)
        setHeight(canvas.offsetHeight)
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }
  }

  const createParticles = () => {
    const newParticles = []
    for (let i = 0; i < particleDensity; i++) {
      const particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * opacity,
      }
      newParticles.push(particle)
    }
    setParticles(newParticles)
  }

  const updateParticles = () => {
    if (!context) return
    context.clearRect(0, 0, width, height)
    particles.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      if (particle.x > width) {
        particle.x = 0
      } else if (particle.x < 0) {
        particle.x = width
      }

      if (particle.y > height) {
        particle.y = 0
      } else if (particle.y < 0) {
        particle.y = height
      }

      if (isHovering) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * force * 2
          particle.y -= Math.sin(angle) * force * 2
        }
      }

      if (particleImage) {
        const img = new Image()
        img.src = particleImage
        context.globalAlpha = particle.opacity
        context.drawImage(img, particle.x, particle.y, particle.size, particle.size)
      } else {
        context.fillStyle = particleColor
        context.globalAlpha = particle.opacity
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }
    })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (width && height) {
      createParticles()
    }
  }, [width, height])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove)
      canvasRef.current.addEventListener("mouseenter", handleMouseEnter)
      canvasRef.current.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", handleMouseMove)
        canvasRef.current.removeEventListener("mouseenter", handleMouseEnter)
        canvasRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      updateParticles()
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [particles, context, width, height, isHovering, mouse])

  return (
    <div className={cn("h-full w-full", className)} {...props}>
      <canvas
        ref={canvasRef}
        id={id}
        style={{
          background: background || "transparent",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
