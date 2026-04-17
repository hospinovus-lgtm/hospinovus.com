import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Hero() {

  const whatsappMessage = `Hello HOSPINOVUS,
I want to improve my hospital operations. Please guide me.`

  return (
    <section className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          {/* 🔥 HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          >
            Fix What’s Slowing Your Hospital Down —
            <span className="text-gold"> Without Chaos</span>
          </motion.h1>

          {/* 🔥 SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-400 mb-8 text-lg"
          >
            From NABH delays and discharge inefficiencies to low patient flow —
            we step in, structure your systems, and execute improvements that actually work.
          </motion.p>

          {/* 🔥 PAIN BULLETS */}
          <div className="text-gray-300 text-sm mb-8 space-y-2">
            <p>✔ Delayed discharge summaries</p>
            <p>✔ Staff confusion during NABH audits</p>
            <p>✔ Poor coordination across departments</p>
          </div>

          {/* 🔥 CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="bg-gold text-black px-6 py-3 rounded-lg font-semibold"
            >
              Get Audit-Ready →
            </Link>

            <a
              href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              className="border border-green-500 text-green-400 px-6 py-3 rounded-lg"
            >
              WhatsApp Now
            </a>
          </motion.div>

          {/* 🔥 TRUST */}
          <p className="text-gray-500 text-sm mt-6">
            Built for hospitals that want execution — not just advice
          </p>

        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >

          {/* 🔥 CARD 1 */}
          <div className="border border-gold/20 rounded-xl p-6 bg-gradient-to-br from-black to-[#1a1a1a]">
            <p className="text-gold font-semibold mb-2">NABH Support</p>
            <p className="text-gray-400 text-sm">
              From gap analysis to final audit readiness
            </p>
          </div>

          {/* 🔥 CARD 2 */}
          <div className="border border-gold/20 rounded-xl p-6 bg-gradient-to-br from-black to-[#1a1a1a]">
            <p className="text-gold font-semibold mb-2">Operations Fix</p>
            <p className="text-gray-400 text-sm">
              Reduce delays and improve workflow efficiency
            </p>
          </div>

          {/* 🔥 CARD 3 */}
          <div className="border border-gold/20 rounded-xl p-6 bg-gradient-to-br from-black to-[#1a1a1a]">
            <p className="text-gold font-semibold mb-2">Growth Systems</p>
            <p className="text-gray-400 text-sm">
              Increase patient inflow and revenue predictability
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  )
}