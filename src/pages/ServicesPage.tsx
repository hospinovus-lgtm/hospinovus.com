import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function ServicesPage() {
  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Healthcare Consulting Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We partner with hospitals to improve operations, achieve accreditation, and scale sustainably — with real execution, not just advice.
          </p>
        </div>

        {/* SERVICE 1 */}
        <motion.div className="mb-14 border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gold mb-3">
            NABH Accreditation & Compliance
          </h2>
          <p className="text-gray-400 mb-4">
            We take your hospital from its current state to full NABH compliance with structured execution and continuous support.
          </p>
          <ul className="text-gray-300 space-y-2 mb-4">
            <li>• Complete gap analysis</li>
            <li>• SOP & documentation development</li>
            <li>• Implementation support</li>
            <li>• Mock audits before final inspection</li>
          </ul>
        </motion.div>

        {/* SERVICE 2 */}
        <motion.div className="mb-14 border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gold mb-3">
            Hospital Operations Optimization
          </h2>
          <p className="text-gray-400 mb-4">
            We identify inefficiencies in your daily operations and fix them to improve patient flow, reduce delays, and increase efficiency.
          </p>
          <ul className="text-gray-300 space-y-2 mb-4">
            <li>• Discharge delay reduction</li>
            <li>• Workflow redesign</li>
            <li>• Department coordination systems</li>
            <li>• Performance tracking setup</li>
          </ul>
        </motion.div>

        {/* SERVICE 3 */}
        <motion.div className="mb-14 border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gold mb-3">
            Healthcare Business Growth
          </h2>
          <p className="text-gray-400 mb-4">
            We help hospitals grow patient volume and revenue with structured strategies tailored to their market.
          </p>
          <ul className="text-gray-300 space-y-2 mb-4">
            <li>• Branding & positioning</li>
            <li>• Digital presence optimization</li>
            <li>• Revenue growth strategies</li>
            <li>• Local market expansion planning</li>
          </ul>
        </motion.div>

        {/* SERVICE 4 */}
        <motion.div className="mb-14 border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gold mb-3">
            Healthcare Workforce Recruitment
          </h2>
          <p className="text-gray-400 mb-4">
            We build strong non-clinical teams that ensure smooth hospital operations and better patient experience.
          </p>
          <ul className="text-gray-300 space-y-2 mb-4">
            <li>• Front office & billing staff</li>
            <li>• Operations & admin hiring</li>
            <li>• PRO & support staff recruitment</li>
            <li>• Workforce structuring</li>
          </ul>
        </motion.div>

        {/* CTA */}
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