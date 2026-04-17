import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const whatsappMessage = `Hello HOSPINOVUS,
I would like to discuss improving my hospital operations.`

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-gold border-b border-gold pb-1"
      : "hover:text-gold transition"

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gold/20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 object-contain" />
          <div className="leading-tight">
            <p className="text-gold font-semibold text-sm">HOSPINOVUS</p>
            <p className="text-[10px] text-gray-400">YOU OWN WE MANAGE</p>
          </div>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">

          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>

          {/* CALL */}
          <a href="tel:+918330016037" className="text-gray-300 hover:text-gold">
            📞
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            WhatsApp
          </a>

          {/* CTA */}
          <NavLink
            to="/contact"
            className="bg-gold text-black px-5 py-2 rounded-lg font-semibold"
          >
            Get Audit-Ready →
          </NavLink>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-gold text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 w-3/4 h-full bg-black p-6 flex flex-col gap-6 text-lg z-50 border-l border-gold/20"
            >
              <button
                className="text-right text-2xl text-gold"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>

              <NavLink to="/" onClick={() => setMenuOpen(false)} className={navClass}>Home</NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navClass}>About</NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)} className={navClass}>Services</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navClass}>Contact</NavLink>

              {/* CONTACT HUB */}
              <div className="space-y-3 pt-4 border-t border-gold/20">

                <a href="tel:+918330016037" className="block bg-blue-500 text-white py-3 rounded-lg text-center">
                  📞 Call Now
                </a>

                <a
                  href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  className="block bg-green-500 text-white py-3 rounded-lg text-center"
                >
                  💬 WhatsApp
                </a>

                <a
                  href="mailto:hospinovus@gmail.com"
                  className="block bg-gray-700 text-white py-3 rounded-lg text-center"
                >
                  ✉ Email
                </a>

              </div>

              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-gold text-black px-4 py-3 rounded-lg text-center font-semibold"
              >
                Get Audit-Ready →
              </NavLink>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  )
}