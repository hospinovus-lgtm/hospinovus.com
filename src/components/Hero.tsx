import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight text-gold mb-6"
          >
            Transform Your Hospital Operations & Achieve NABH Accreditation Faster
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-400 mb-8 text-lg"
          >
            HOSPINOVUS helps hospitals across Kerala improve efficiency, streamline operations, 
            and scale sustainably with structured consulting and real execution.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition"
            >
              Book Free Consultation →
            </Link>

            <Link
              to="/services"
              className="border border-gold text-gold px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Explore Services →
            </Link>
          </motion.div>

          {/* TRUST LINE */}
          <p className="text-gray-500 text-sm mt-6">
            Trusted by healthcare professionals across Kerala
          </p>

        </div>

        {/* RIGHT SIDE (VISUAL / STATS CARD) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >

          {/* CARD 1 */}
          <div className="border border-gold/20 rounded-xl p-6 text-center bg-gradient-to-br from-black to-[#1a1a1a]">
            <h2 className="text-3xl font-bold text-gold">10+</h2>
            <p className="text-gray-400 text-sm">Years of Combined Healthcare Experience</p>
          </div>

          {/* CARD 2 */}
          <div className="border border-gold/20 rounded-xl p-6 text-center bg-gradient-to-br from-black to-[#1a1a1a]">
            <h2 className="text-3xl font-bold text-gold">50+</h2>
            <p className="text-gray-400 text-sm">Healthcare Professionals</p>
          </div>

          {/* CARD 3 */}
          <div className="border border-gold/20 rounded-xl p-6 text-center bg-gradient-to-br from-black to-[#1a1a1a]">
            <h2 className="text-3xl font-bold text-gold">100%</h2>
            <p className="text-gray-400 text-sm">Client Satisfaction</p>
          </div>

        </motion.div>

      </div>
    </section>
  )
}