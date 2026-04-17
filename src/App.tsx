import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { Analytics } from "@vercel/analytics/react"

import Hero from "./components/Hero"
import Services from "./components/Services"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetail from "./pages/ServiceDetail"
import Contact from "./pages/Contact"
import AboutPage from "./pages/AboutPage"   // ✅ ADD THIS

function Home() {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />   {/* ✅ ADD THIS */}
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

      <Footer />
      <Analytics />
    </>
  )
}