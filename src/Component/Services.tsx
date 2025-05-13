"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Paintbrush, Globe, Layers, Palette, Box, Film } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "App Design",
    description:
      "Creating intuitive and visually appealing mobile application interfaces that enhance user experience and engagement.",
    icon: <Layers className="w-6 h-6 text-orange-500" />,
    link: "#app-design",
  },
  {
    title: "Web Design",
    description:
      "Designing responsive and modern websites that represent your brand identity and provide seamless user experiences.",
    icon: <Globe className="w-6 h-6 text-orange-500" />,
    link: "#web-design",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting user-centered interfaces with intuitive navigation and engaging interactions to improve user satisfaction.",
    icon: <Palette className="w-6 h-6 text-orange-500" />,
    link: "#ui-ux-design",
  },
  {
    title: "Branding",
    description:
      "Developing comprehensive brand identities including logos, color schemes, typography, and brand guidelines.",
    icon: <Box className="w-6 h-6 text-orange-500" />,
    link: "#branding",
  },
  {
    title: "Graphic Design",
    description:
      "Creating visual content for digital and print media including social media graphics, posters, brochures, and more.",
    icon: <Paintbrush className="w-6 h-6 text-orange-500" />,
    link: "#graphic-design",
  },
  {
    title: "Motion Design",
    description:
      "Bringing designs to life with animations and motion graphics for websites, apps, advertisements, and presentations.",
    icon: <Film className="w-6 h-6 text-orange-500" />,
    link: "#motion-design",
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-6 text-white"
        >
          Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
        >
          Specialized services tailored to meet your design and development needs with precision and creativity.
        </motion.p>

        <HoverEffect
          items={services.map((service) => ({
            title: service.title,
            description: service.description,
            link: service.link,
          }))}
        />
      </div>
    </section>
  )
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-orange-500/[0.08] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
              {services[idx].icon}
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>
}

export default Services
