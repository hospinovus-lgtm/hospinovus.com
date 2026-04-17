import { useParams, Link } from "react-router-dom"
import { servicesData } from "../data/servicesData"
import { useState, useEffect } from "react"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = servicesData.find((s) => s.slug === slug)

  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    let lastScroll = window.scrollY

    const handleScroll = () => {
      if (window.scrollY < lastScroll) {
        setShowPopup(true)
      }
      lastScroll = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!service) {
    return (
      <div className="text-white p-20 text-center">
        Service not found
      </div>
    )
  }

  return (
    <div className="bg-black text-white pt-28 pb-32 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <div className="space-y-6">
          <p className="text-sm text-gold uppercase tracking-wide">
            NABH Accreditation Consulting — Kerala
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Struggling with NABH Compliance?
            <br />
            <span className="text-gold">
              We Take Your Hospital to Audit-Ready — Without Chaos
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl">
            From incomplete documentation to audit anxiety, we step in and build a
            structured, department-wise system that prepares your hospital for NABH
            certification with clarity and control.
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
            Book NABH Readiness Assessment →
          </Link>
        </div>

        {/* PROCESS */}
        <div>
          <h2 className="text-2xl text-gold mb-4">Our Approach</h2>
          <ul className="space-y-2 text-gray-300">
            {service.process.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>

        {/* OUTCOMES */}
        <div>
          <h2 className="text-2xl text-gold mb-4">Expected Outcomes</h2>
          <ul className="space-y-2 text-gray-300">
            {service.outcomes.map((o, i) => (
              <li key={i}>• {o}</li>
            ))}
          </ul>
        </div>

        {/* IDEAL CLIENT */}
        <div>
          <h2 className="text-2xl text-gold mb-4">Who This Is For</h2>
          <ul className="space-y-2 text-gray-300">
            {service.idealFor.map((iF, i) => (
              <li key={i}>• {iF}</li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
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

        {/* AUTHORITY */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="border border-gold/20 p-6 rounded-xl">
            <p className="text-3xl font-bold text-gold">10+</p>
            <p className="text-gray-400 text-sm mt-2">Years Experience</p>
          </div>
          <div className="border border-gold/20 p-6 rounded-xl">
            <p className="text-3xl font-bold text-gold">50+</p>
            <p className="text-gray-400 text-sm mt-2">Healthcare Network</p>
          </div>
          <div className="border border-gold/20 p-6 rounded-xl">
            <p className="text-3xl font-bold text-gold">100%</p>
            <p className="text-gray-400 text-sm mt-2">Execution Focus</p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div>
          <h2 className="text-2xl text-gold mb-4">
            Why Hospitals Choose HOSPINOVUS
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>• We execute, not just advise</li>
            <li>• Department-level implementation</li>
            <li>• Audit-focused preparation</li>
            <li>• Long-term operational stability</li>
          </ul>
        </div>

        {/* CASE */}
        <div className="border border-gold/20 p-6 rounded-xl">
          <p className="text-gray-300 text-sm">
            A 51-bed hospital approached us with delays and audit fear. We structured
            documentation, trained staff, and aligned departments — resulting in a
            fully compliant system within months.
          </p>
        </div>

        {/* TESTIMONIAL */}
        <div className="border border-gold/20 p-6 rounded-xl">
          <p className="text-gray-300 italic">
            “Our team finally understood NABH clearly. The execution support made the difference.”
          </p>
          <p className="text-gray-500 text-sm mt-2">
            — Hospital Admin Team
          </p>
        </div>

        {/* URGENCY */}
        <div className="border border-gold/20 p-6 rounded-xl text-center">
          <p className="text-gray-300 mb-3">
            Planning NABH in the next 3–6 months?
          </p>
          <Link
            to={`/contact?service=${service.slug}`}
            className="bg-gold text-black px-6 py-2 rounded-lg"
          >
            Book NABH Readiness Assessment →
          </Link>
        </div>

      </div>

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gold/20 p-4 flex justify-between items-center z-50">
        <p className="text-sm text-gray-300">Need NABH support?</p>
        <Link
          to={`/contact?service=${service.slug}`}
          className="bg-gold text-black px-4 py-2 rounded-lg text-sm"
        >
          Get Started →
        </Link>
      </div>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/918330016037"
        target="_blank"
        className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full z-50"
      >
        💬
      </a>

      {/* EXIT POPUP */}
      {showPopup && (
        <div className="fixed bottom-24 right-5 bg-black border border-gold/20 p-4 rounded-lg z-50">
          <p className="text-sm text-gray-300 mb-2">
            Need NABH guidance?
          </p>
          <Link
            to={`/contact?service=${service.slug}`}
            className="text-gold text-sm underline"
          >
            Get quick help →
          </Link>
        </div>
      )}
    </div>
  )
}