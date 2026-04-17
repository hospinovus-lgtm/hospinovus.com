import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Header from "./components/Header"
import Footer from "./components/Footer"
import PageLoader from "./components/PageLoader"
import ScrollToTop from "./components/ScrollToTop"
import { Analytics } from "@vercel/analytics/react"

import Hero from "./components/Hero"
import Services from "./components/Services"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetail from "./pages/ServiceDetail"
import Contact from "./pages/Contact"
import About from "./pages/AboutPage"

function Home() {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <ScrollToTop />

      {/* 🔥 PAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="text-white p-20 text-center">
                  Page Not Found
                </div>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
      <Analytics />
    </>
  )
}