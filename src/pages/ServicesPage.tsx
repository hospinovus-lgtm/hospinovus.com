import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { servicesData } from "../data/servicesData"

export default function ServicesPage() {
  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Healthcare Consulting Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We partner with hospitals to improve operations, achieve accreditation, and scale sustainably — with real execution, not just advice.
          </p>
        </div>

        {/* SERVICES */}
        <div className="space-y-10">

          {servicesData.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition"
            >

              {/* TITLE */}
              <h2 className="text-2xl font-semibold text-gold mb-3">
                {service.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-400 mb-4">
                {service.description}
              </p>

              {/* DETAILS */}
              <ul className="text-gray-300 space-y-2 mb-6">
                {service.details.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex gap-6 items-center">

                {/* DETAILS PAGE */}
                <Link
                  to={`/services/${service.slug}`}
                  className="text-gold hover:underline"
                >
                  View Details →
                </Link>

                {/* 🔥 SMART CONTACT */}
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="text-gray-300 hover:text-white"
                >
                  Consult Now →
                </Link>

              </div>

            </motion.div>
          ))}

        </div>

        {/* GLOBAL CTA */}
        <div className="text-center mt-16">
          <Link
            to="/contact"
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition"
          >
            Book Free Consultation →
          </Link>
        </div>

      </div>
    </div>
  )
}