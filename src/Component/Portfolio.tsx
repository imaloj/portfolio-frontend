"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Paintbrush, Code, Figma, ImageIcon, PenTool, Layers } from "lucide-react"

type ProjectType = "design" | "programming"

interface Project {
  id: number
  title: string
  category: string
  image: string
  type: ProjectType
  tools?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Adobe Illustrator",
    image: "/placeholder.svg?height=300&width=400",
    type: "design",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Canva",
    image: "/placeholder.svg?height=300&width=400",
    type: "design",
    tools: ["Canva", "Adobe Photoshop"],
  },
  {
    id: 3,
    title: "Product Packaging Design",
    category: "Adobe Photoshop",
    image: "/placeholder.svg?height=300&width=400",
    type: "design",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
  },
  {
    id: 4,
    title: "Url-Shortner App",
    category: "Full Stack",
    image: "/placeholder.svg?height=300&width=400",
    type: "programming",
    tools: ["React", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
  },
  
  {
    id: 5,
    title: "Email-Validation App",
    category: "Frontend,API",
    image: "/placeholder.svg?height=300&width=400",
    type: "programming",
    tools: ["Html", "CSS", "JavaScript", "API"],
  },
  {
    id: 6,
    title: "Login -Signup Form",
    category: "Frontend",
    image: "/placeholder.svg?height=300&width=400",
    type: "programming",
    tools: ["HTML", "CSS", "JavaScript","php"],
  },
  {
    id: 7,
    title: "Online Attendance Using Face Recognition",
    category: "Full Stack",
    image: "/placeholder.svg?height=300&width=400",
    type: "programming",
    tools: ["Python", "OpenCV", "Flask", "MySQL"],
  },

  {
    id: 8,
    title: "Promotional Poster",
    category: "Graphic Design",
    image: "/placeholder.svg?height=300&width=400",
    type: "design",
    tools: ["Adobe Photoshop", "Canva"],
  },
  {
    id: 9,
    title: "Portfolio Website",
    category: "UI/UX",
    image: "/placeholder.svg?height=300&width=400",
    type: "programming",
    tools: ["React+Vite", "Tailwind CSS", "Figma", "Framer Motion"],
  },
]

const Portfolio = () => {
  const [activeType, setActiveType] = useState<ProjectType | "all">("all")

  const filteredProjects = activeType === "all" ? projects : projects.filter((project) => project.type === activeType)

  // Function to get the appropriate icon based on the tool
  const getToolIcon = (tool: string) => {
    const iconClass = "w-4 h-4 mr-1"

    if (tool.includes("Illustrator")) return <PenTool className={iconClass} />
    if (tool.includes("Photoshop")) return <ImageIcon className={iconClass} />
    if (tool.includes("Canva")) return <Paintbrush className={iconClass} />
    if (tool.includes("InDesign")) return <Layers className={iconClass} />
    if (tool.includes("Figma")) return <Figma className={iconClass} />
    return <Code className={iconClass} />
  }

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Portfolio
        </motion.h2>

        <div className="flex justify-center mb-10">
          <div className="bg-zinc-900 p-1 rounded-xl flex flex-wrap justify-center">
            <button
              onClick={() => setActiveType("all")}
              className={`px-4 py-2 m-1 rounded-xl transition-colors flex items-center ${
                activeType === "all" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveType("design")}
              className={`px-4 py-2 m-1 rounded-xl transition-colors flex items-center ${
                activeType === "design" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Paintbrush className="w-4 h-4 mr-2" />
              Graphics Design
            </button>
            <button
              onClick={() => setActiveType("programming")}
              className={`px-4 py-2 m-1 rounded-xl transition-colors flex items-center ${
                activeType === "programming" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              Programming Projects
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900 rounded-xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-orange-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-orange-500 px-4 py-2 rounded-xl font-medium">View Project</button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-400 mb-2">{project.category}</p>

                  {project.tools && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tools.map((tool, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded-lg flex items-center ${
                            project.type === "design"
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {getToolIcon(tool)}
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Portfolio;
