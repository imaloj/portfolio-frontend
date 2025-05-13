"use client"

import { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#Home" className="flex items-center">
          <img 
          src="/Logo.png"
          alt="Logo"
          className="h-20 w-auto"/>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <a href="#home" className="text-orange-500 hover:text-orange-400 transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-300 hover:text-orange-400 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-orange-400 transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors"
          >
            Hire Me
          </a>
        </div>

        <button type="button" 
        className="md:hidden text-white" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute w-full">
          <nav className="flex flex-col items-center space-y-4 py-6">
            <a href="#home" className="text-orange-500 hover:text-orange-400 transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-300 hover:text-orange-400 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">
              About me
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-orange-400 transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">
              Contact me
            </a>
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
