import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black font-bold">
            HNS
          </div>
          <div className="leading-tight">
            <p className="text-gold font-semibold text-sm">HOSPINOVUS</p>
            <p className="text-[10px] text-gray-400">YOU OWN WE MANAGE</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-gold transition">Home</Link>
          <Link to="/about" className="hover:text-gold transition">About</Link>
          <Link to="/services" className="hover:text-gold transition">Services</Link>
          <Link to="/contact" className="hover:text-gold transition">Contact</Link>

          {/* CTA */}
          <Link
            to="/contact"
            className="bg-gold text-black px-4 py-2 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition"
          >
            Book Consultation
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gold text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed top-0 right-0 w-3/4 h-full bg-black p-6 flex flex-col gap-6 text-lg"
        >
          <button
            className="text-right text-2xl text-gold"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-gold text-black px-4 py-2 rounded-lg text-center"
          >
            Book Consultation
          </Link>
        </motion.div>
      )}
    </header>
  )
}