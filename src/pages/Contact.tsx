import { useState } from "react"
import { motion } from "framer-motion"

type FormData = {
  name: string
  email: string
  phone: string
  organization: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  })

  const [status, setStatus] = useState<"" | "success" | "error">("")
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setStatus("")

    try {
      // 🔥 Placeholder (we connect backend later)
      await new Promise((res) => setTimeout(res, 1000))

      setStatus("success")

      // WhatsApp redirect
      const msg = `Hello HOSPINOVUS,
Name: ${formData.name}
Phone: ${formData.phone}
Organization: ${formData.organization}
Requirement: ${formData.message}`

      const url = `https://wa.me/918330016037?text=${encodeURIComponent(msg)}`
      window.open(url, "_blank")

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      })
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gold mb-6">
            Book a Free Consultation
          </h1>

          <p className="text-gray-400 mb-8">
            Let’s discuss how we can improve your hospital operations,
            achieve NABH accreditation, and drive sustainable growth.
          </p>

          <div className="space-y-4 text-gray-300">
            <p>📞 +91 83300 16037</p>
            <p>📞 +91 75948 25179</p>
            <p>✉ hospinovus@gmail.com</p>
          </div>
        </div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-900 border border-gold/20 focus:border-gold outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-900 border border-gold/20 focus:border-gold outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-900 border border-gold/20 focus:border-gold outline-none"
          />

          <input
            type="text"
            name="organization"
            placeholder="Hospital / Organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-900 border border-gold/20 focus:border-gold outline-none"
          />

          <textarea
            name="message"
            placeholder="Tell us your requirement"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 rounded-lg bg-zinc-900 border border-gold/20 focus:border-gold outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black px-6 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition"
          >
            {loading ? "Submitting..." : "Book Free Consultation"}
          </button>

          {/* STATUS */}
          {status === "success" && (
            <p className="text-green-400 text-sm">
              ✅ Request submitted successfully
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm">
              ❌ Something went wrong. Please try again.
            </p>
          )}

        </motion.form>
      </div>
    </div>
  )
}