import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaHospital, FaChartLine, FaUserTie, FaAward } from "react-icons/fa"

const services = [
  {
    slug: "nabh",
    icon: <FaAward size={26} />,
    title: "NABH Accreditation",
    description:
      "Struggling with compliance, documentation, or audit fear? We take your hospital to audit-ready.",
    cta: "Start NABH Preparation",
  },
  {
    slug: "operations",
    icon: <FaHospital size={26} />,
    title: "Operations Optimization",
    description:
      "Fix discharge delays, workflow gaps, and coordination issues across departments.",
    cta: "Fix My Operations",
  },
  {
    slug: "growth",
    icon: <FaChartLine size={26} />,
    title: "Hospital Growth",
    description:
      "Increase patient flow, improve visibility, and drive predictable revenue growth.",
    cta: "Increase Patient Flow",
  },
  {
    slug: "recruitment",
    icon: <FaUserTie size={26} />,
    title: "Workforce Recruitment",
    description:
      "Build reliable front office, billing, and admin teams that actually perform.",
    cta: "Build My Team",
  },
]

export default function Services() {
  return (
    <section className="bg-black text-white py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 PROBLEM-FIRST HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            Where Is Your Hospital Struggling Right Now?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether it’s NABH compliance, operational delays, low patient inflow,
            or staffing issues — we step in and execute solutions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {services.map((service) => {
            const whatsappMessage = `Hello HOSPINOVUS,
I need help with ${service.title}.
Please guide me.`

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-gold/20 rounded-2xl p-6 bg-gradient-to-br from-black to-[#1a1a1a] hover:border-gold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition"
              >

                {/* ICON */}
                <div className="text-gold mb-4">{service.icon}</div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gold mb-2">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 mb-6 text-sm">
                  {service.description}
                </p>

                {/* 🔥 ACTION ZONE */}
                <div className="flex flex-wrap gap-4 items-center">

                  {/* PRIMARY CTA */}
                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="bg-gold text-black px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {service.cta} →
                  </Link>

                  {/* DETAILS */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-gold text-sm hover:underline"
                  >
                    Learn More →
                  </Link>

                  {/* WHATSAPP */}
                  <a
                    href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    className="text-green-400 text-sm hover:underline"
                  >
                    WhatsApp
                  </a>

                </div>
              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}