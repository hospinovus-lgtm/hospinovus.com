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

  // 🔥 INTERNAL LINKING (RESTORED)
  const getInternalLinkingText = () => {
    switch (service?.slug) {
      case "nabh":
        return (
          <p className="text-gray-400 text-sm">
            NABH success depends on{" "}
            <Link to="/services/operations" className="text-gold underline">
              structured operations
            </Link>{" "}
            and{" "}
            <Link to="/services/recruitment" className="text-gold underline">
              trained teams
            </Link>.
          </p>
        )
      case "operations":
        return (
          <p className="text-gray-400 text-sm">
            Operations impact{" "}
            <Link to="/services/nabh" className="text-gold underline">
              NABH readiness
            </Link>{" "}
            and drive{" "}
            <Link to="/services/growth" className="text-gold underline">
              hospital growth
            </Link>.
          </p>
        )
      case "growth":
        return (
          <p className="text-gray-400 text-sm">
            Growth requires{" "}
            <Link to="/services/operations" className="text-gold underline">
              strong operations
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
            Hiring affects{" "}
            <Link to="/services/operations" className="text-gold underline">
              operations
            </Link>{" "}
            and{" "}
            <Link to="/services/nabh" className="text-gold underline">
              accreditation success
            </Link>.
          </p>
        )
      default:
        return null
    }
  }

  // 🔥 CASE STUDY (KEPT)
  const getCaseStudy = () => {
    switch (service?.slug) {
      case "nabh":
        return {
          problem: "60-bed hospital struggled with audit readiness.",
          action: "SOP restructuring + mock audits.",
          result: "Achieved NABH readiness in 4 months.",
        }
      case "operations":
        return {
          problem: "6–8 hour discharge delays.",
          action: "Workflow + TAT system implemented.",
          result: "Reduced to under 2 hours.",
        }
      case "growth":
        return {
          problem: "Low patient inflow.",
          action: "Repositioning + digital alignment.",
          result: "40% growth in 3 months.",
        }
      case "recruitment":
        return {
          problem: "High staff turnover.",
          action: "Structured hiring + onboarding.",
          result: "Improved stability & experience.",
        }
      default:
        return null
    }
  }

  const caseStudy = getCaseStudy()

  // 🔥 EXIT POPUP (FULLY FIXED)
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
          (document.body.scrollHeight - window.innerHeight)) *
        100

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
    <div className="bg-black text-white pt-28 pb-40 px-4 md:px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-16">

          {/* HERO */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>

            <p className="text-gray-400">{service.subtitle}</p>

            {getInternalLinkingText()}

            <Link
              to={`/contact?service=${service.slug}`}
              onClick={() =>
                track("CTA Click", { service: service.slug, location: "hero" })
              }
              className="bg-gold text-black px-8 py-3 rounded-lg inline-block"
            >
              {ctaText} →
            </Link>
          </div>

          <Section title="Common Challenges" data={service.problems} />
          <Section title="Our Approach" data={service.process} />
          <Section title="Expected Outcomes" data={service.outcomes} />
          <Section title="Who This Is For" data={service.idealFor} />

          {/* CASE */}
          {caseStudy && (
            <div className="border border-gold/20 p-6 rounded-xl bg-zinc-900">
              <h2 className="text-gold text-xl mb-3">Real Case</h2>
              <p><b>Problem:</b> {caseStudy.problem}</p>
              <p><b>Action:</b> {caseStudy.action}</p>
              <p><b>Result:</b> {caseStudy.result}</p>
            </div>
          )}

          {/* AUTH */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {commonBlocks.credibility.authority.map((item, i) => (
              <div key={i} className="border border-gold/20 p-6 rounded-xl">
                <p className="text-3xl text-gold">{item.value}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          {/* RELATED */}
          {relatedServices.length > 0 && (
            <div>
              <h2 className="text-gold text-2xl mb-4">Related</h2>
              {relatedServices.map((rs) => (
                <Link key={rs.slug} to={`/services/${rs.slug}`}>
                  {rs.title}
                </Link>
              ))}
            </div>
          )}

          {/* FINAL CTA */}
          <div className="text-center pt-10">
            <Link
              to={`/contact?service=${service.slug}`}
              className="bg-gold text-black px-8 py-3 rounded-lg"
            >
              {ctaText}
            </Link>
          </div>
        </div>

        {/* FAQ */}
        {service.faqs?.length > 0 && (
          <div className="hidden md:block">
            <div className="sticky top-28 bg-zinc-900 p-6 rounded-xl">
              {service.faqs.map((faq, i) => (
                <div key={i}>
                  <p className="text-gold">{faq.q}</p>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        className="fixed bottom-24 right-5 bg-green-500 p-4 rounded-full"
      >
        💬
      </a>

      {/* 🔥 EXIT POPUP WITH EMAIL RESTORED */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
          <div className="bg-zinc-900 p-8 rounded-xl text-center space-y-4">

            <button onClick={() => setShowPopup(false)}>✕</button>

            <h2 className="text-gold text-xl">Before You Leave...</h2>

            <a href={`https://wa.me/918330016037?text=${encodeURIComponent(whatsappMessage)}`}>
              WhatsApp
            </a>

            <a href="tel:+918330016037">Call</a>

            <a href={`mailto:hospinovus@gmail.com?subject=${service.title}`}>
              Email
            </a>

            <Link to={`/contact?service=${service.slug}`}>
              Get Plan
            </Link>

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
      <h2 className="text-gold text-2xl">{title}</h2>
      <ul>
        {data.map((item: string, i: number) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}