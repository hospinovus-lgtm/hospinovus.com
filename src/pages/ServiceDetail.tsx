import { useParams, Link } from "react-router-dom"
import { servicesData } from "../data/servicesData"
import { useEffect } from "react"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = servicesData.find((s) => s.slug === slug)

  // ✅ BASIC SEO (dynamic title)
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | HOSPINOVUS`
    }
  }, [service])

  // ❌ BETTER NOT FOUND HANDLING
  if (!service) {
    return (
      <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl text-gold mb-4">Service not found</h1>
        <Link
          to="/services"
          className="text-gold underline"
        >
          Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gold mb-4">
          {service.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mb-8 text-lg">
          {service.description}
        </p>

        {/* DETAILS */}
        <ul className="space-y-3 mb-10 text-gray-300">
          {service.details.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>

        {/* 🔥 TRUST LINE */}
        <p className="text-gray-500 text-sm mb-6">
          Trusted by healthcare professionals across Kerala
        </p>

        {/* 🔥 SMART CTA */}
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="inline-block bg-gold text-black px-6 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition"
        >
          Book Free Consultation →
        </Link>

      </div>
    </div>
  )
}