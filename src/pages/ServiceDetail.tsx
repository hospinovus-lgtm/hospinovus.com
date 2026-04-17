import { useParams, Link } from "react-router-dom"
import { servicesData, commonBlocks } from "../data/servicesData"
import { useState, useEffect } from "react"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = servicesData.find((s) => s.slug === slug)

  const [showPopup, setShowPopup] = useState(false)

  // ✅ SERVICE-SPECIFIC CTA
  const getCTA = () => {
    switch (service?.slug) {
      case "nabh":
        return "Book NABH Gap Analysis"
      case "operations":
        return "Fix My Hospital Operations"
      case "growth":
        return "Increase Patient Footfall"
      case "recruitment":
        return "Build My Hospital Team"
      default:
        return "Book Consultation"
    }
  }

  const ctaText = getCTA()

  const whatsappMessage = `Hello HOSPINOVUS,
I’m interested in ${service?.title}.
Please guide me on next steps.`

  // 🔥 FIXED EXIT INTENT SYSTEM
  useEffect(() => {
    let hasTriggered = false

    const timer = setTimeout(() => {
      // 🖥️ Desktop exit (mouse to top)
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 10 && !hasTriggered) {
          hasTriggered = true
          setShowPopup(true)
        }
      }

      // 📱 Mobile fallback (scroll intent)
      let lastScroll = window.scrollY

      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) *
          100

        if (
          scrollPercent > 50 &&
          window.scrollY < lastScroll &&
          !hasTriggered
        ) {
          hasTriggered = true
          setShowPopup(true)
        }

        lastScroll = window.scrollY
      }

      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("scroll", handleScroll)

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave)
        window.removeEventListener("scroll", handleScroll)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!service) {
    return (
      <div className="text-white p-20 text-center">
        Service not found
      </div>
    )
  }

  const relatedServices = servicesData.filter((s) =>
    service.related?.includes(s.slug)
  )

  return (
    <div className="bg-black text-white pt-28 pb-32 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <div className="space-y-6">
          <p className="text-sm text-gold uppercase tracking-wide">
            {service.title}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {service.title}
          </h1>

          <p className="text-gray-400 max-w-2xl">
            {service.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span>✔ Structured implementation</span>
            <span>✔ Department-level execution</span>
            <span>✔ Audit-focused approach</span>
          </div>

          <Link
            to={`/contact?service=${service.slug}`}
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium inline-block"
          >
            {ctaText} →
          </Link>
        </div>

        {/* PROBLEMS */}
        {service.problems?.length > 0 && (
          <div>
            <h2 className="text-2xl text-gold mb-4">Common Challenges</h2>
            <ul className="space-y-2 text-gray-300">
              {service.problems.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* PROCESS */}
        {service.process?.length > 0 && (
          <div>
            <h2 className="text-2xl text-gold mb-4">Our Approach</h2>
            <ul className="space-y-2 text-gray-300">
              {service.process.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* OUTCOMES */}
        {service.outcomes?.length > 0 && (
          <div>
            <h2 className="text-2xl text-gold mb-4">Expected Outcomes</h2>
            <ul className="space-y-2 text-gray-300">
              {service.outcomes.map((o, i) => (
                <li key={i}>• {o}</li>
              ))}
            </ul>
          </div>
        )}

        {/* IDEAL CLIENT */}
        {service.idealFor?.length > 0 && (
          <div>
            <h2 className="text-2xl text-gold mb-4">Who This Is For</h2>
            <ul className="space-y-2 text-gray-300">
              {service.idealFor.map((iF, i) => (
                <li key={i}>• {iF}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {service.faqs?.length > 0 && (
          <div>
            <h2 className="text-2xl text-gold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border border-gold/20 p-4 rounded-lg">
                  <p className="font-semibold text-gold">{faq.q}</p>
                  <p className="text-gray-400 text-sm mt-2">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AUTHORITY */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {commonBlocks.credibility.authority.map((item, i) => (
            <div key={i} className="border border-gold/20 p-6 rounded-xl">
              <p className="text-3xl font-bold text-gold">{item.value}</p>
              <p className="text-gray-400 text-sm mt-2">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={`/contact?service=${service.slug}`}
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
          >
            {ctaText} →
          </Link>
        </div>

      </div>

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gold/20 p-4 flex justify-between items-center z-50">
        <p className="text-sm text-gray-300">Need help?</p>
        <Link
          to={`/contact?service=${service.slug}`}
          className="bg-gold text-black px-4 py-2 rounded-lg text-sm"
        >
          {ctaText}
        </Link>
      </div>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </a>

      {/* 🔥 EXIT MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999] px-4">
          <div className="bg-zinc-900 border border-gold/20 rounded-2xl p-8 max-w-md w-full text-center space-y-6 relative">

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-2xl text-gold font-bold">
              Need Help with {service.title}?
            </h2>

            <div className="space-y-3">

              <a
                href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                className="bg-green-500 block py-3 rounded-lg"
              >
                WhatsApp
              </a>

              <a
                href="tel:+918330016037"
                className="bg-blue-500 block py-3 rounded-lg"
              >
                Call
              </a>

              <a
                href={`mailto:hospinovus@gmail.com?subject=${encodeURIComponent(`Inquiry about ${service.title}`)}`}
                className="bg-gray-700 block py-3 rounded-lg"
              >
                Email
              </a>

              <Link
                to={`/contact?service=${service.slug}`}
                className="bg-gold text-black block py-3 rounded-lg"
              >
                Fill Form
              </Link>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}