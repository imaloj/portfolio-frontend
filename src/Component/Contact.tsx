"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { SparklesCore } from "./ui/sparkles"
import { useEffect, useState, useRef, type FormEvent } from "react"
import { submitContactForm } from "../services/api" // Adjust the import path as necessary
import { ChevronDown } from "lucide-react"

const Contact = () => {
  const [mapUrl, setMapUrl] = useState<string>("")
  const mapRef = useRef<HTMLIFrameElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  // Subject options for the dropdown
  const subjectOptions = ["Graphics Design","Programming", "Others"]

  // The default map URL based on the provided Google Maps link
  const defaultMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1617.5983962550572!2d87.98543841566425!3d26.623426783663316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5bae93461dbc5%3A0x62a2fd30c7134735!2sJXFP%2B885%2C%20Birtamod%2057204!5e1!3m2!1sen!2snp!4v1745982530542!5m2!1sen!2snp"

  useEffect(() => {
    // Set the map URL immediately
    setMapUrl(defaultMapUrl)
  }, [])

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
    setIsDropdownOpen(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })
    try {
      const formData = new FormData(e.currentTarget)

      // If using the dropdown, ensure the subject is set
      if (selectedSubject) {
        formData.set("subject", selectedSubject)
      }

      // Create data object from form
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: (formData.get("subject") as string) || selectedSubject, // Use either form data or state
        message: formData.get("message") as string,
      }

      // Send data to backend API using our service
      const result = await submitContactForm(data)

      if (result.success) {
        setFormStatus({ type: "success", message: result.message })
        // Reset form
        e.currentTarget.reset()
        setSelectedSubject("") // Reset the dropdown selection
      } else {
        setFormStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FF5E00"
          opacity={0.1}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16 text-white"
        >
          Contact
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-[400px] rounded-xl overflow-hidden"
          >
            {!mapUrl ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-xl">
                <div className="animate-pulse text-gray-400">Loading map...</div>
              </div>
            ) : (
              <iframe
                ref={mapRef}
                src={mapUrl}
                width="100%"
                height="100%"
                className="map-iframe"
                style={{ border: 0, borderRadius: "0.75rem" }}
                allowFullScreen={false}
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps showing location"
                aria-label="Interactive Google Map"
              />
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full grid grid-cols-1 gap-6"
            onSubmit={handleSubmit}
          >
            {formStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  formStatus.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-zinc-900 border-zinc-800 focus:border-orange-500 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-zinc-900 border-zinc-800 focus:border-orange-500 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <div
                    className={`w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 rounded-xl text-white px-3 py-2 flex justify-between items-center cursor-pointer ${
                      selectedSubject ? "text-white" : "text-gray-500"
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{selectedSubject || "Select a subject"}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-xl z-10 overflow-hidden">
                      {subjectOptions.map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 hover:bg-zinc-800 cursor-pointer text-white"
                          onClick={() => handleSubjectSelect(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  <input type="hidden" id="subject" name="subject" value={selectedSubject} required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  className="w-full h-32 bg-zinc-900 border-zinc-800 focus:border-orange-500 rounded-xl text-white"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
