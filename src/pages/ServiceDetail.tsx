import { useParams, Link } from "react-router-dom"
import { servicesData, commonBlocks } from "../data/servicesData"
import { useState, useEffect } from "react"
import { track } from "@vercel/analytics"

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = servicesData.find((s) => s.slug === slug)

  const [showPopup, setShowPopup] = useState(false)

  // CTA
  const getCTA = () => {
    switch (service?.slug) {
      case "nabh": return "Book NABH Gap Analysis"
      case "operations": return "Fix My Hospital Operations"
      case "growth": return "Increase Patient Footfall"
      case "recruitment": return "Build My Hospital Team"
      default: return "Book Consultation"
    }
  }

  const ctaText = getCTA()

  const whatsappMessage = `Hello HOSPINOVUS,
I’m interested in ${service?.title}.
Please guide me on next steps.`

  // 🔗 INTERNAL LINKING (UNCHANGED)
  const getInternalLinkingText = () => {
    switch (service?.slug) {
      case "nabh":
        return (
          <p className="text-gray-400 text-sm">
            NABH success depends on{" "}
            <Link to="/services/operations" className="text-gold underline">structured operations</Link>{" "}
            and{" "}
            <Link to="/services/recruitment" className="text-gold underline">trained teams</Link>.
          </p>
        )
      case "operations":
        return (
          <p className="text-gray-400 text-sm">
            Operations directly impact{" "}
            <Link to="/services/nabh" className="text-gold underline">NABH readiness</Link>{" "}
            and{" "}
            <Link to="/services/growth" className="text-gold underline">growth</Link>.
          </p>
        )
      case "growth":
        return (
          <p className="text-gray-400 text-sm">
            Growth requires{" "}
            <Link to="/services/operations" className="text-gold underline">efficient operations</Link>{" "}
            and the right{" "}
            <Link to="/services/recruitment" className="text-gold underline">team</Link>.
          </p>
        )
      case "recruitment":
        return (
          <p className="text-gray-400 text-sm">
            Hiring impacts{" "}
            <Link to="/services/operations" className="text-gold underline">operations</Link>{" "}
            and{" "}
            <Link to="/services/nabh" className="text-gold underline">compliance</Link>.
          </p>
        )
      default:
        return null
    }
  }

  // 🔥 CASE STUDY (UNCHANGED SOURCE)
  const caseStudy = commonBlocks.credibility.scenario

  // 🚨 EXIT INTENT (UNCHANGED LOGIC)
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
      const percent =
        (window.scrollY /
          (document.body.scrollHeight - window.innerHeight)) * 100

      if (percent > 60 && window.scrollY < lastScroll && !triggered) {
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
    <div className="bg-black text-white pt-28 pb-44 px-4 md:px-6">

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

          {/* SECTIONS */}
          <Section title="Common Challenges" data={service.problems} />
          <Section title="Our Approach" data={service.process} />
          <Section title="Expected Outcomes" data={service.outcomes} />
          <Section title="Who This Is For" data={service.idealFor} />

          {/* CASE STUDY */}
          {caseStudy && (
            <div className="border border-gold/20 p-6 rounded-xl bg-gradient-to-br from-black to-[#1a1a1a] space-y-4">
              <h2 className="text-2xl text-gold">Real Scenario We Handle</h2>

              <p className="text-gray-300 text-sm">
                <span className="text-gold font-semibold">Problem:</span> {caseStudy.problem}
              </p>

              <p className="text-gray-400 text-sm">
                <span className="text-gold font-semibold">What We Did:</span> {caseStudy.action}
              </p>

              <p className="text-gray-300 text-sm">
                <span className="text-gold font-semibold">Result:</span> {caseStudy.result}
              </p>
            </div>
          )}

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
                      track("Related Click", {
                        from: service.slug,
                        to: rs.slug,
                      })
                    }
                    className="border border-gold/20 p-6 rounded-xl hover:border-gold/40"
                  >
                    <h3 className="text-gold font-semibold">{rs.title}</h3>
                    <p className="text-gray-400 text-sm">{rs.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FINAL CTA */}
          <div className="text-center pt-10">
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

        {/* FAQ SIDEBAR */}
        {service.faqs?.length > 0 && (
          <div className="hidden md:block">
            <div className="sticky top-28 space-y-4 border border-gold/20 p-6 rounded-xl bg-zinc-900 shadow-lg">
              <h2 className="text-lg text-gold font-semibold">
                Quick Answers
              </h2>

              {service.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gold/10 pb-3 last:border-none">
                  <p className="text-sm text-gold font-medium">
                    {faq.q}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WHATSAPP FLOAT */}
      <a
        href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
        onClick={() => track("WhatsApp Click", { service: service.slug })}
        target="_blank"
        className="fixed bottom-24 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </a>

      {/* EXIT POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
          <div className="bg-zinc-900 border border-gold/20 rounded-2xl p-8 max-w-md w-full text-center space-y-6 relative">

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-4"
            >
              ✕
            </button>

            <h2 className="text-2xl text-gold font-bold">
              Before You Leave...
            </h2>

            <p className="text-gray-300 text-sm">
              Let’s quickly identify what’s slowing your hospital.
            </p>

            <div className="space-y-3">

              <a
                href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
                onClick={() => track("Exit WhatsApp Click", { service: service.slug })}
                className="bg-green-500 block py-3 rounded-lg"
              >
                💬 WhatsApp
              </a>

              <a
                href="tel:+918330016037"
                onClick={() => track("Exit Call Click", { service: service.slug })}
                className="bg-blue-500 block py-3 rounded-lg"
              >
                📞 Call
              </a>

              <a
                href={`mailto:hospinovus@gmail.com?subject=${service.title}`}
                onClick={() => track("Exit Email Click", { service: service.slug })}
                className="bg-gray-700 block py-3 rounded-lg"
              >
                ✉ Email
              </a>

              <Link
                to={`/contact?service=${service.slug}`}
                onClick={() => track("Exit CTA Click", { service: service.slug })}
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