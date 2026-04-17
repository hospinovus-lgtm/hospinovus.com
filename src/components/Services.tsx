import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaHospital, FaChartLine, FaUserTie, FaAward } from "react-icons/fa"

const services = [
  {
    icon: <FaAward size={26} />,
    title: "NABH Accreditation & Compliance",
    description:
      "End-to-end NABH preparation from gap analysis to final certification.",
    points: [
      "Detailed gap analysis",
      "Documentation & SOP creation",
      "Mock audits & implementation",
    ],
  },
  {
    icon: <FaHospital size={26} />,
    title: "Hospital Operations Optimization",
    description:
      "Fix inefficiencies in workflows, reduce delays, and improve patient experience.",
    points: [
      "Discharge & TAT optimization",
      "Workflow restructuring",
      "Operational monitoring systems",
    ],
  },
  {
    icon: <FaChartLine size={26} />,
    title: "Healthcare Business Growth",
    description:
      "Drive patient volume, branding, and sustainable revenue growth.",
    points: [
      "Local market positioning",
      "Brand & digital strategy",
      "Revenue optimization",
    ],
  },
  {
    icon: <FaUserTie size={26} />,
    title: "Healthcare Workforce Recruitment",
    description:
      "Build strong non-clinical teams that keep hospital operations running smoothly.",
    points: [
      "Front office & billing staff",
      "Operations & admin hiring",
      "PRO & support staff recruitment",
    ],
  },
]

export default function Services() {
  return (
    <section className="bg-black text-white py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            Healthcare Consulting Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don’t just advise. We step in, execute, and transform how your hospital operates, grows, and scales.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gold/20 rounded-2xl p-6 bg-gradient-to-br from-black to-[#1a1a1a] hover:border-gold/40 transition"
            >
              {/* ICON */}
              <div className="text-gold mb-4">{service.icon}</div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-gold mb-2">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 mb-4 text-sm">
                {service.description}
              </p>

              {/* BULLET POINTS */}
              <ul className="text-gray-300 text-sm mb-6 space-y-1">
                {service.points.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex gap-4 items-center">
                <Link
                  to="/services"
                  className="text-gold text-sm hover:underline"
                >
                  View Details →
                </Link>

                <Link
                  to="/contact"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Consult Now →
                </Link>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}