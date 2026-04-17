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

  // INTERNAL LINKING
  const getInternalLinkingText = () => {
    switch (service?.slug) {
      case "nabh":
        return (
          <p className="text-gray-400 text-sm">
            NABH success depends on{" "}
            <Link to="/services/operations" className="text-gold underline">
              structured operations
            </Link>{" "}
            and a{" "}
            <Link to="/services/recruitment" className="text-gold underline">
              well-trained team
            </Link>.
          </p>
        )
      case "operations":
        return (
          <p className="text-gray-400 text-sm">
            Strong operations help achieve{" "}
            <Link to="/services/nabh" className="text-gold underline">
              NABH compliance
            </Link>{" "}
            and enable{" "}
            <Link to="/services/growth" className="text-gold underline">
              hospital growth
            </Link>.
          </p>
        )
      case "growth":
        return (
          <p className="text-gray-400 text-sm">
            Growth depends on{" "}
            <Link to="/services/operations" className="text-gold underline">
              operations
            </Link>{" "}
            and the right{" "}
            <Link to="/services/recruitment" className="text-gold underline">
              team
            </Link>.
          </p>
        )
      case "recruitment":
        return (
          <p className="text-gray-400 text-sm">
            Hiring impacts{" "}
            <Link to="/services/operations" className="text-gold underline">
              operations
            </Link>{" "}
            and{" "}
            <Link to="/services/nabh" className="text-gold underline">
              NABH readiness
            </Link>.
          </p>
        )
      default:
        return null
    }
  }

  // EXIT INTENT
  useEffect(() => {
    let triggered = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered) {
        triggered = true
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

      if (scrollPercent > 60 && window.scrollY < lastScroll && !triggered) {
        triggered = true
        setShowPopup(true)
        track("Exit Popup Triggered", { service: service?.slug })
      }

      lastScroll = window.scrollY
    }

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("scroll", handleScroll)
    }, 4000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
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
            <h1 className="text-4xl md:text-5xl font-bold">
              {service.title}
            </h1>

            <p className="text-gray-400 max-w-2xl">
              {service.subtitle}
            </p>

            {getInternalLinkingText()}

            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() => track("CTA Click", { service: service.slug, location: "hero" })}
              className="bg-gold text-black px-8 py-3 rounded-lg"
            >
              {ctaText} →
            </Link>
          </div>

          {/* PROBLEMS */}
          <Section title="Common Challenges" data={service.problems} />

          {/* PROCESS */}
          <Section title="Our Approach" data={service.process} />

          {/* OUTCOMES */}
          <Section title="Expected Outcomes" data={service.outcomes} />

          {/* IDEAL */}
          <Section title="Who This Is For" data={service.idealFor} />

          {/* AUTHORITY */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {commonBlocks.credibility.authority.map((item, i) => (
              <div key={i} className="border border-gold/20 p-6 rounded-xl">
                <p className="text-3xl text-gold font-bold">{item.value}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

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
                    className="border border-gold/20 p-6 rounded-xl"
                  >
                    <h3 className="text-gold font-semibold">{rs.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{rs.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT FAQ */}
        {service.faqs?.length > 0 && (
          <div className="sticky top-28 space-y-4 border border-gold/20 p-6 rounded-xl bg-zinc-900 h-fit">
            <h2 className="text-lg text-gold">Quick Answers</h2>

            {service.faqs.map((faq, i) => (
              <div key={i}>
                <p className="text-gold text-sm">{faq.q}</p>
                <p className="text-gray-400 text-xs">{faq.a}</p>
              </div>
            ))}

            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() => track("CTA Click", { service: service.slug, location: "faq" })}
              className="block bg-gold text-black py-2 text-center rounded-lg"
            >
              {ctaText}
            </Link>
          </div>
        )}

      </div>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
        onClick={() => track("WhatsApp Click", { service: service.slug })}
        target="_blank"
        className="fixed bottom-20 right-5 bg-green-500 p-4 rounded-full"
      >
        💬
      </a>

      {/* EXIT POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
          <div className="bg-zinc-900 p-8 rounded-xl text-center space-y-4">

            <h2 className="text-gold text-xl">Before You Leave</h2>

            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() => track("Exit CTA Click", { service: service.slug })}
              className="bg-gold text-black px-6 py-2 rounded-lg"
            >
              Get Action Plan
            </Link>

          </div>
        </div>
      )}
    </div>
  )
}

// REUSABLE SECTION COMPONENT
function Section({ title, data }: any) {
  if (!data?.length) return null

  return (
    <div>
      <h2 className="text-2xl text-gold mb-4">{title}</h2>
      <ul className="space-y-2 text-gray-300">
        {data.map((item: string, i: number) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}