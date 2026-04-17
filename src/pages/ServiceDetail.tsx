import { useParams, Link } from "react-router-dom"
import { servicesData } from "../data/servicesData"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="text-white p-20 text-center">
        Service not found
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
        <p className="text-gray-400 mb-8">
          {service.description}
        </p>

        {/* DETAILS */}
        <ul className="space-y-3 mb-10 text-gray-300">
          {service.details.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="bg-gold text-black px-6 py-3 rounded-lg font-medium"
        >
          Book Consultation →
        </Link>

      </div>
    </div>
  )
}