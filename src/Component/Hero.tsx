"use client";

import { motion } from "framer-motion";
import { FacebookIcon, GitHubIcon, LinkedinIcon } from "./Icons";
import { BackgroundBeams } from "./ui/background-beam";
import Typewriter from "typewriter-effect";
import { useState } from "react";
import { getCVDownloadUrl } from "../services/api"; // Adjust the import path as necessary


const Hero = () => {
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
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-[-1]">
      <BackgroundBeams className="opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between pl-20 gap-12 md:gap-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-6/12 space-y-6"
          >
            <p className="text-orange-500 text-2xl">Hi, I am</p>
            <h1 className="text-7xl font-bold text-white">Aloj Oli</h1>
            {/* Typewriter */}
            <div className="text-3xl font-bold text-orange-500 h-12 flex items-center">
              <Typewriter
                options={{
                  strings: ["Web Designer", "Graphics Designer"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 40,
                  cursor: "_",
                }}
              />
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 pt-2 pb-2 text-2xl">
              <a aria-label="Facebook" href="https://www.facebook.com/aloj.oli.20" className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a aria-label="GitHub" href="https://github.com/imaloj" className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110">
                <GitHubIcon  className="w-5 h-5" />
              </a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/aloj-oli-9a1556306/" className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-6">
              <a
                href="#contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Hire Me
              </a>
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl transition-colors"
              >
                {isDownloading ? "Downloading..." : "Download CV"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 pt-8 text-center">
              {[
                { label: "Years Experience", value: "2+" },
                { label: "Project Done", value: "20+" },
                { label: "Happy Clients", value: "50+" },
              ].map((stat, i) => (
                <div key={i}>
                  <h3 className="text-3xl font-bold text-orange-500">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-5/12 flex justify-center relative"
          >
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-orange-500/10 rounded-full z-[-1]" />
              <img
                src="/PP.png"
                alt="Aloj Oli"
                className="w-full h-full object-cover rounded-full border-4 border-orange-500/30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
