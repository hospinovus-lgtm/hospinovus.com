import { useParams, Link } from "react-router-dom"
import { servicesData, commonBlocks } from "../data/servicesData"
import { useState, useEffect } from "react"
import { track } from "@vercel/analytics"

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = servicesData.find((s) => s.slug === slug)

  const [showPopup, setShowPopup] = useState(false)

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

  // 🔥 ELITE CASE STUDIES
  const getCaseStudy = () => {
    switch (service?.slug) {
      case "nabh":
        return {
          problem:
            "A 60-bed hospital in Central Kerala was struggling with NABH preparation. Documentation existed, but staff were not aligned and audit fear was high.",
          action:
            "We restructured SOPs, trained department-wise teams, and conducted 2 mock audits with real scenarios.",
          result:
            "Within 4 months, the hospital achieved full audit readiness with zero major non-conformities.",
        }

      case "operations":
        return {
          problem:
            "A multi-speciality hospital in Kochi had discharge delays of 6–8 hours, causing patient dissatisfaction and bed blocking.",
          action:
            "We redesigned discharge workflow, aligned billing + pharmacy + nursing coordination, and introduced TAT tracking.",
          result:
            "Discharge time reduced to under 2 hours, improving patient turnover and satisfaction significantly.",
        }

      case "growth":
        return {
          problem:
            "A newly established hospital had strong clinical capability but very low patient footfall due to poor positioning.",
          action:
            "We redefined service positioning, optimized Google presence, and aligned high-value services.",
          result:
            "Patient inflow increased by 40% within 3 months with improved revenue per patient.",
        }

      case "recruitment":
        return {
          problem:
            "A hospital faced high front-office staff turnover and poor patient interaction experience.",
          action:
            "We hired role-specific candidates and implemented structured onboarding with workflow-based training.",
          result:
            "Staff stability improved and patient experience scores increased noticeably within weeks.",
        }

      default:
        return null
    }
  }

  const caseStudy = getCaseStudy()

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
    <div className="bg-black text-white pt-28 pb-40 px-4 md:px-6">

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

          {/* SECTIONS */}
          <Section title="Common Challenges" data={service.problems} />
          <Section title="Our Approach" data={service.process} />
          <Section title="Expected Outcomes" data={service.outcomes} />
          <Section title="Who This Is For" data={service.idealFor} />

          {/* 🔥 CASE STUDY */}
          {caseStudy && (
            <div className="border border-gold/20 p-6 rounded-xl bg-zinc-900 space-y-4">
              <h2 className="text-2xl text-gold">Real Case We Solved</h2>

              <p className="text-gray-300 text-sm">
                <strong className="text-gold">Problem:</strong> {caseStudy.problem}
              </p>

              <p className="text-gray-400 text-sm">
                <strong className="text-gold">What We Did:</strong> {caseStudy.action}
              </p>

              <p className="text-gray-300 text-sm">
                <strong className="text-gold">Result:</strong> {caseStudy.result}
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
                    className="border border-gold/20 p-6 rounded-xl"
                  >
                    <h3 className="text-gold">{rs.title}</h3>
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
              className="bg-gold text-black px-8 py-3 rounded-lg"
            >
              {ctaText} →
            </Link>
          </div>

        </div>

        {/* RIGHT FAQ */}
        {service.faqs?.length > 0 && (
          <div className="hidden md:block">
            <div className="sticky top-28 space-y-4 border border-gold/20 p-6 rounded-xl bg-zinc-900">
              <h2 className="text-gold">Quick Answers</h2>

              {service.faqs.map((faq, i) => (
                <div key={i}>
                  <p className="text-gold text-sm">{faq.q}</p>
                  <p className="text-gray-400 text-xs">{faq.a}</p>
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