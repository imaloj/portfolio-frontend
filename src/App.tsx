
import { useEffect, useState, Suspense } from "react"
import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import Services from "./Component/Services";
import About from "./Component/About";
import Skills from "./Component/Skills";
import Portfolio from "./Component/Portfolio";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Loader from "./Component/loader";
import ScrollToTop from "./Component/ScrollToTop";
import FallbackLoader from "./Component/FallbackLoader";

export const API_CONFIG = {
  baseUrl: "http://localhost:5000/api",
}
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("App mounted")

    // This will ensure the loader is shown on every page refresh
    // and will wait for the page to be fully loaded
    const handleLoad = () => {
      console.log("Page loaded")
      // Add a small delay to make the loader visible even on fast connections
      setTimeout(() => {
        setLoading(false)
        console.log("Loading complete")
      }, 1000)
    }

    // If the page is already loaded
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)

      // Fallback in case the load event doesn't fire
      setTimeout(() => {
        setLoading(false)
        console.log("Loading timeout complete")
      }, 3000)

      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  // Add console log to debug
  console.log("App rendering, loading state:", loading)

  if (loading) {
    return (
      <div className="bg-black-500 text-white min-h-screen flex items-center justify-center fixed top-0 left-0 w-full z-50">
        <Suspense fallback={<FallbackLoader />}>
          <Loader />
        </Suspense>
      </div>
    )
  }
  return (
    <div className="font-custom bg-black-500 font- text-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
