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

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"" | "success" | "error">("")
  const [loading, setLoading] = useState(false)

  // PREFILL FROM SERVICE
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const service = params.get("service")

    if (service) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in ${service} service. Please contact me.`,
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

    // 🔥 CLEAR ERROR ON CHANGE
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        // 🔥 SHOW FIELD ERRORS
        setErrors(data.errors || {})
        setStatus("error")
        return
      }

      setStatus("success")

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

  const whatsappLink = `https://wa.me/918330016037?text=${encodeURIComponent(
    `Hello HOSPINOVUS,
Name: ${formData.name}
Phone: ${formData.phone}
Organization: ${formData.organization}
Requirement: ${formData.message}`
  )}`

  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gold mb-6">
            Book a Free Consultation
          </h1>

          <p className="text-gray-400 mb-8">
            Let’s improve your hospital operations, achieve NABH accreditation, and drive sustainable growth.
          </p>

          <div className="space-y-4 text-gray-300">
            <a href="tel:+918330016037" className="block hover:text-gold">
              📞 +91 83300 16037
            </a>
            <a href="tel:+917594825179" className="block hover:text-gold">
              📞 +91 75948 25179
            </a>
            <a href="mailto:hospinovus@gmail.com" className="block hover:text-gold">
              ✉ hospinovus@gmail.com
            </a>
          </div>
        </div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}
          <div>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* PHONE */}
          <div>
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* ORGANIZATION */}
          <div>
            <input
              name="organization"
              placeholder="Hospital / Organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
            />
            {errors.organization && <p className="text-red-400 text-sm mt-1">{errors.organization}</p>}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              placeholder="Tell us your requirement"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-900 rounded-lg border border-gold/20"
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Book Free Consultation"}
          </button>

          {/* STATUS */}
          {status === "success" && (
            <div className="mt-6 p-4 border rounded-lg text-center space-y-3">
              <p className="text-green-400">✅ Request submitted successfully</p>

              <div className="flex justify-center gap-6 text-2xl">
                <a href="tel:+918330016037" className="text-gold">
                  <FaPhone />
                </a>

                <a href={whatsappLink} target="_blank" className="text-green-400">
                  <FaWhatsapp />
                </a>

                <a href="mailto:hospinovus@gmail.com" className="text-blue-400">
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