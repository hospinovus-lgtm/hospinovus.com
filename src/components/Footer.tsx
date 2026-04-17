import { Link } from "react-router-dom"

export default function Footer() {
  const whatsappMessage = `Hello HOSPINOVUS,
I would like to improve my hospital operations. Please guide me.`

  return (
    <footer className="bg-black border-t border-gold/20 mt-20">

      {/* 🔥 FINAL CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 text-center space-y-6">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Fix Your Hospital Systems?
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Whether it's NABH, operations, growth, or staffing — we help you execute,
          not just advise.
        </p>

        <div className="flex flex-wrap justify-center gap-4">

          <Link
            to="/contact"
            className="bg-gold text-black px-6 py-3 rounded-lg font-semibold"
          >
            Book Consultation →
          </Link>

          <a
            href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            WhatsApp Now
          </a>

        </div>

      </div>

      {/* 🔥 LINKS + INFO */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-3 gap-10 text-sm">

        {/* BRAND */}
        <div>
          <h3 className="text-gold font-semibold mb-3">HOSPINOVUS</h3>
          <p className="text-gray-400">
            Healthcare management partner helping hospitals achieve compliance,
            efficiency, and growth through structured execution.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-gold font-semibold mb-3">Services</h3>
          <div className="space-y-2 text-gray-400">
            <Link to="/services/nabh" className="block hover:text-gold">NABH Accreditation</Link>
            <Link to="/services/operations" className="block hover:text-gold">Operations Optimization</Link>
            <Link to="/services/growth" className="block hover:text-gold">Business Growth</Link>
            <Link to="/services/recruitment" className="block hover:text-gold">Workforce Recruitment</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-gold font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-gray-400">
            <a href="tel:+918330016037" className="block hover:text-gold">
              📞 +91 83300 16037
            </a>
            <a href="mailto:hospinovus@gmail.com" className="block hover:text-gold">
              ✉ hospinovus@gmail.com
            </a>
            <a
              href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              className="block hover:text-gold"
            >
              💬 WhatsApp Chat
            </a>
          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM STRIP */}
      <div className="text-center text-gray-500 text-xs pb-6">
        © {new Date().getFullYear()} HOSPINOVUS. All rights reserved.
      </div>

    </footer>
  )
}