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
            We don’t just advise — we execute and transform hospital operations.
          </p>
        </div>

        {/* SERVICES LIST */}
        <div className="space-y-12">

          {servicesData.map((service) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border border-gold/20 rounded-xl p-6"
            >

              {/* TITLE */}
              <h2 className="text-2xl font-semibold text-gold mb-3">
                {service.title}
              </h2>

              {/* SUBTITLE (REPLACED description) */}
              <p className="text-gray-400 mb-4">
                {service.subtitle}
              </p>

              {/* PROCESS (REPLACED details) */}
              <ul className="text-gray-300 space-y-2 mb-6">
                {service.process.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={`/services/${service.slug}`}
                className="text-gold hover:underline"
              >
                View Details →
              </Link>

            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/contact"
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
          >
            Book Free Consultation →
          </Link>
        </div>

      </div>
    </div>
  )
}