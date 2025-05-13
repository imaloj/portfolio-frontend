"use client"

import { motion } from "framer-motion"


const skills = [
  { name: "Figma", percentage: 60 },
  { name: "Adobe Photoshop", percentage: 75 },
  { name: "Adobe Illustrator", percentage: 85 },
  { name: "TypeScript", percentage: 50 },
  { name: "UI/UX", percentage: 60 },
  { name: "MySQL", percentage: 70 },
]

const Skills = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative w-20 h-20 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF5E00"
                    strokeWidth="8"
                    strokeDasharray={`${skill.percentage * 2.83} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">
                  {skill.percentage}%
                </div>
              </div>
              <p className="text-center text-gray-300">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
