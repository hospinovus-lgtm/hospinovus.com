import { useParams, Link } from "react-router-dom"
import { servicesData, commonBlocks } from "../data/servicesData"
import { useState, useEffect } from "react"
import { track } from "@vercel/analytics"

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = servicesData.find((s) => s.slug === slug)

  const [showPopup, setShowPopup] = useState(false)

  // CTA PER SERVICE
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

  // DYNAMIC INTERNAL LINKING
  const getInternalLinkingText = () => {
    switch (service?.slug) {
      case "nabh":
        return (
          <p className="text-gray-400 text-sm">
            NABH success depends heavily on how well your{" "}
            <Link to="/services/operations" className="text-gold underline">
              hospital operations are structured
            </Link>{" "}
            and whether your{" "}
            <Link to="/services/recruitment" className="text-gold underline">
              team is properly trained and aligned
            </Link>.
          </p>
        )
      case "operations":
        return (
          <p className="text-gray-400 text-sm">
            Strong operations also prepare your hospital for{" "}
            <Link to="/services/nabh" className="text-gold underline">
              NABH compliance
            </Link>{" "}
            and enable sustainable{" "}
            <Link to="/services/growth" className="text-gold underline">
              business growth
            </Link>.
          </p>
        )
      case "growth":
        return (
          <p className="text-gray-400 text-sm">
            Growth depends on{" "}
            <Link to="/services/operations" className="text-gold underline">
              operational efficiency
            </Link>{" "}
            and having the right{" "}
            <Link to="/services/recruitment" className="text-gold underline">
              team in place
            </Link>.
          </p>
        )
      case "recruitment":
        return (
          <p className="text-gray-400 text-sm">
            Hiring impacts your{" "}
            <Link to="/services/operations" className="text-gold underline">
              daily operations
            </Link>{" "}
            and your ability to meet{" "}
            <Link to="/services/nabh" className="text-gold underline">
              NABH standards
            </Link>.
          </p>
        )
      default:
        return null
    }
  }

  // EXIT INTENT
  useEffect(() => {
    let hasTriggered = false

    const timer = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 10 && !hasTriggered) {
          hasTriggered = true
          setShowPopup(true)
          track("Exit Popup Triggered", { service: service?.slug })
        }
      }

      let lastScroll = window.scrollY

      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) *
          100

        if (
          scrollPercent > 60 &&
          window.scrollY < lastScroll &&
          !hasTriggered
        ) {
          hasTriggered = true
          setShowPopup(true)
          track("Exit Popup Triggered", { service: service?.slug })
        }

        lastScroll = window.scrollY
      }

      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("scroll", handleScroll)

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave)
        window.removeEventListener("scroll", handleScroll)
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [service])

  if (!service) {
    return <div className="text-white p-20 text-center">Service not found</div>
  }

  const relatedServices = servicesData.filter((s) =>
    service.related?.includes(s.slug)
  )

  return (
    <div className="bg-black text-white pt-28 pb-32 px-4 md:px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-16">

          {/* HERO */}
          <div className="space-y-6">
            <p className="text-sm text-gold uppercase">{service.title}</p>

            <h1 className="text-4xl md:text-5xl font-bold">
              {service.title}
            </h1>

            <p className="text-gray-400 max-w-2xl">
              {service.subtitle}
            </p>

            {getInternalLinkingText()}

            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() =>
                track("CTA Click", { service: service.slug, location: "hero" })
              }
              className="bg-gold text-black px-8 py-3 rounded-lg font-medium inline-block"
            >
              {ctaText} →
            </Link>
          </div>

          {/* CONTENT SECTIONS SAME */}

          {/* RELATED */}
          {relatedServices.length > 0 && (
            <div>
              <h2 className="text-2xl text-gold mb-6">Related Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedServices.map((rs) => (
                  <Link
                    key={rs.slug}
                    to={`/services/${rs.slug}`}
                    onClick={() =>
                      track("Related Service Click", {
                        from: service.slug,
                        to: rs.slug,
                      })
                    }
                    className="border border-gold/20 p-6 rounded-xl hover:border-gold/40"
                  >
                    <h3 className="text-gold font-semibold">{rs.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{rs.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() =>
                track("CTA Click", { service: service.slug, location: "bottom" })
              }
              className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
            >
              {ctaText} →
            </Link>
          </div>

        </div>

        {/* RIGHT FAQ */}
        {service.faqs?.length > 0 && (
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-28 space-y-4 border border-gold/20 p-6 rounded-xl bg-zinc-900">

              <h2 className="text-lg text-gold font-semibold">
                Quick Answers
              </h2>

              {service.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gold/10 pb-3">
                  <p className="text-sm text-gold font-medium">{faq.q}</p>
                  <p className="text-xs text-gray-400 mt-1">{faq.a}</p>
                </div>
              ))}

              <Link
                to={`/contact?service=${service.slug}`}
                onClick={() =>
                  track("CTA Click", { service: service.slug, location: "faq" })
                }
                className="block text-center bg-gold text-black py-2 rounded-lg text-sm mt-4"
              >
                {ctaText}
              </Link>

            </div>
          </div>
        )}

      </div>

      {/* WHATSAPP FLOAT */}
      <a
        href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
        onClick={() => track("WhatsApp Click", { service: service.slug })}
        target="_blank"
        className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </a>

      {/* EXIT POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999] px-4">
          <div className="bg-zinc-900 border border-gold/20 rounded-2xl p-8 max-w-md w-full text-center space-y-6 relative">

            <button onClick={() => setShowPopup(false)}>✕</button>

            <h2 className="text-2xl font-bold text-gold">
              Before You Leave...
            </h2>

            <div className="space-y-3">

              <a
                href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                onClick={() =>
                  track("Exit WhatsApp Click", { service: service.slug })
                }
                target="_blank"
                className="bg-green-500 block py-3 rounded-lg"
              >
                💬 WhatsApp
              </a>

              <a
                href="tel:+918330016037"
                onClick={() =>
                  track("Exit Call Click", { service: service.slug })
                }
                className="bg-blue-500 block py-3 rounded-lg"
              >
                📞 Call
              </a>

              <Link
                to={`/contact?service=${service.slug}`}
                onClick={() =>
                  track("Exit CTA Click", { service: service.slug })
                }
                className="bg-gold text-black block py-3 rounded-lg"
              >
                📋 Get Action Plan
              </Link>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}