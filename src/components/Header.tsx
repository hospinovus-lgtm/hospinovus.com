import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const whatsappMessage = `Hello HOSPINOVUS,
I would like to discuss improving my hospital operations.`

  const services = [
    { name: "NABH Accreditation", slug: "nabh" },
    { name: "Operations Optimization", slug: "operations" },
    { name: "Business Growth", slug: "growth" },
    { name: "Workforce Recruitment", slug: "recruitment" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gold/20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 object-contain" />
          <div className="leading-tight">
            <p className="text-gold font-semibold text-sm">HOSPINOVUS</p>
            <p className="text-[10px] text-gray-400">YOU OWN WE MANAGE</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm relative">

          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-gold border-b border-gold pb-1" : "hover:text-gold"
          }>
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive ? "text-gold border-b border-gold pb-1" : "hover:text-gold"
          }>
            About
          </NavLink>

          {/* 🔥 SERVICES DROPDOWN */}
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="relative"
          >
            <span className="cursor-pointer hover:text-gold">
              Services ▾
            </span>

            {showDropdown && (
              <div className="absolute top-8 left-0 bg-black border border-gold/20 rounded-lg p-4 w-64 space-y-2 shadow-lg">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block text-gray-300 hover:text-gold text-sm"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/contact" className={({ isActive }) =>
            isActive ? "text-gold border-b border-gold pb-1" : "hover:text-gold"
          }>
            Contact
          </NavLink>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            className="text-green-400 text-sm hover:underline"
          >
            WhatsApp
          </a>

          {/* CTA */}
          <Link
            to="/contact"
            className="bg-gold text-black px-5 py-2 rounded-lg font-semibold"
          >
            Get Audit-Ready →
          </Link>
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

              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

              {/* 🔥 MOBILE: GO TO SERVICES PAGE */}
              <Link to="/services" onClick={() => setMenuOpen(false)}>
                Services
              </Link>

              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

              <a
                href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                className="bg-green-500 text-white px-4 py-3 rounded-lg text-center"
              >
                Chat on WhatsApp
              </a>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-gold text-black px-4 py-3 rounded-lg text-center"
              >
                Get Audit-Ready →
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  )
}