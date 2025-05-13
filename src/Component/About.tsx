"use client"

import { motion } from "framer-motion"
import { getCVDownloadUrl } from "../services/api" // Adjust the import path as necessary
import { useState } from "react"

const About = () => {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const handleDownloadCV =async () =>{
     setIsDownloading(true)
     try {
       window.open(getCVDownloadUrl(), "_blank")
     } catch (error) {
       console.error("Error Downloading CV:", error)
       alert("An error occurred while downloading the CV.")
     }
     finally{
       setTimeout(() => {
         setIsDownloading(false)// Reset the downloading state after 1 second
       },1000)
     }
  }

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-11 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src="/About.png?height=500&width=400"
              alt="About Me"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
          <p className="text-gray-300 text-justify">
              As a passionate graphic designer with expertise in various design tools including Adobe Photoshop,
              Illustrator, and Canva, I bring creative concepts to life through visual storytelling. My design
              philosophy centers around creating meaningful, user-focused experiences that communicate effectively and
              leave lasting impressions.
            </p>

            <p className="text-gray-300 text-justify">
              With a background in both digital and print design, I've developed a versatile skill set that allows me to
              work across multiple platforms and mediums. I believe that great design is not just about aesthetics, but
              about solving problems and creating intuitive experiences that resonate with the target audience.
            </p>

            <p className="text-gray-300 text-justify">
              When I'm not designing, I'm constantly exploring new trends, techniques, and tools to expand my creative
              capabilities and bring fresh perspectives to my work.
            </p>

            <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl transition-colors"
              >
                {isDownloading ? "Downloading..." : "Download CV"}
              </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
