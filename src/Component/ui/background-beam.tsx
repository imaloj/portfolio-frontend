"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BackgroundBeams = ({ className, ...props }: BackgroundBeamsProps) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn("h-full w-full overflow-hidden background-beams-container", className)}
      data-x-px={mousePosition.x}
      data-y-px={mousePosition.y}
      {...props}
    >
      <div className="relative h-full w-full">
        <div
          className="pointer-events-none absolute inset-0 z-10 h-full w-full background-beams-gradient"
          aria-hidden="true"
        />
        <div className="background-beams-circle" />
      </div>
    </div>
  )
}
