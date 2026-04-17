import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa"

type FormData = {
  name: string
  email: string
  phone: string
  organization: string
  message: string
}

export default function Contact() {
  const location = useLocation()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  })

  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"" | "success" | "error">("")
  const [loading, setLoading] = useState(false)

  // 🔥 PREFILL FROM SERVICE
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const service = params.get("service")

    if (service) {
      setFormData((prev) => ({
        ...prev,
        message: `I need help with ${service}. Please guide me.`,
      }))
    }
  }, [location])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setStatus("")
    setErrors({})

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors(data.errors || {})
        setStatus("error")
        return
      }

      setStatus("success")

      // 🔥 PRESERVE DATA FOR CTA ACTIONS
      setSubmittedData(formData)

      // optional reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      })

    } catch (err) {
      console.error(err)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  // 🔥 USE SUBMITTED DATA IF EXISTS
  const activeData = submittedData || formData

  const whatsappMessage = `Hello HOSPINOVUS,
Name: ${activeData.name}
Phone: ${activeData.phone}
Organization: ${activeData.organization}
Email: ${activeData.email}

Requirement:
${activeData.message}`

  const emailLink = `mailto:hospinovus@gmail.com?subject=${encodeURIComponent(
    `Inquiry from ${activeData.name || "Website"}`
  )}&body=${encodeURIComponent(
    `Name: ${activeData.name}
Phone: ${activeData.phone}
Email: ${activeData.email}
Organization: ${activeData.organization}

Requirement:
${activeData.message}`
  )}`

  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gold mb-6">
            Talk to Us — Get Clarity on What to Fix
          </h1>

          <p className="text-gray-400 mb-6">
            Whether it's NABH, operations, growth, or recruitment —
            we identify the real gaps and help you fix them with structured execution.
          </p>

          <div className="text-gray-300 text-sm space-y-2 mb-8">
            <p>✔ NABH Accreditation Support</p>
            <p>✔ Hospital Operations Optimization</p>
            <p>✔ Patient Flow & Growth Strategy</p>
            <p>✔ Non-clinical Staff Recruitment</p>
          </div>

          {/* CONTACT BUTTONS */}
          <div className="space-y-4">

            <a
              href="tel:+918330016037"
              className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium"
            >
              <FaPhone /> Call Now
            </a>

            <a
              href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-medium"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>

            <a
              href={emailLink}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg font-medium"
            >
              <FaEnvelope /> Send Email
            </a>

          </div>

          <p className="text-gray-500 text-sm mt-6">
            Most hospitals delay fixing systems — until it affects patients and audits.
          </p>
        </div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
          />
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}

          <input
            name="organization"
            placeholder="Hospital / Organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
          />
          {errors.organization && <p className="text-red-400 text-sm">{errors.organization}</p>}

          <textarea
            name="message"
            placeholder="Briefly describe your problem"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
          />
          {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg font-semibold"
          >
            {loading ? "Submitting..." : "Get Clear Action Plan →"}
          </button>

          <p className="text-gray-500 text-xs text-center">
            No spam. Just clarity and actionable steps.
          </p>

          {/* SUCCESS */}
          {status === "success" && (
            <div className="mt-6 p-4 border border-green-500/30 rounded-lg text-center space-y-3">
              <p className="text-green-400">
                ✅ Request submitted successfully
              </p>

              <p className="text-gray-400 text-xs">
                Continue instantly via WhatsApp or Email with your submitted details.
              </p>

              <div className="flex justify-center gap-6 text-2xl">

                <a
                  href="tel:+918330016037"
                  className="text-gold"
                >
                  <FaPhone />
                </a>

                <a
                  href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  className="text-green-400"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href={emailLink}
                  className="text-blue-400"
                >
                  <FaEnvelope />
                </a>

              </div>
            </div>
          )}

        </motion.form>
      </div>
    </div>
  )
}