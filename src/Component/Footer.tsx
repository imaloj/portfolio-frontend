import { FacebookIcon, GitHubIcon, LinkedinIcon } from "./Icons"

const Footer = () => {
  return (
    <footer className="bg-black py-10 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <a href="#home" className="flex items-center mb-4 md:mb-0">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-20 w-auto"
            />
          </a>

          <nav className="flex items-center space-x-8 mb-4 md:mb-0">
            <a href="#home" className="text-gray-300 hover:text-orange-400 transition-colors">
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

          <div className="flex pd-4  space-x-4">
            <a
            aria-label="Facebook" 
            href="https://www.facebook.com/aloj.oli.20" className="text-gray-400 hover:text-orange-500 transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
            aria-label="GitHub" 
            href="https://github.com/imaloj" className="text-gray-400 hover:text-orange-500 transition-colors">
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a 
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/aloj-oli-9a1556306/" className="text-gray-400 hover:text-orange-500 transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>


        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Aloj Oli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
