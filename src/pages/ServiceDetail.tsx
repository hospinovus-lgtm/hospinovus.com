import { useParams, Link } from "react-router-dom"
import { servicesData } from "../data/servicesData"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="text-white p-20 text-center">
        Service not found
      </div>
    )
  }

  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            {service.title}
          </h1>
          <p className="text-gray-400">
            {service.subtitle}
          </p>
        </div>

        {/* PROBLEMS */}
        {service.problems && (
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
        {service.process && (
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
        {service.outcomes && (
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
        {service.idealFor && (
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
        {service.faqs && (
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
{/* AUTHORITY STRIP */}
<div className="grid md:grid-cols-3 gap-6 text-center">
  <div className="border border-gold/20 p-6 rounded-xl">
    <p className="text-3xl font-bold text-gold">10+</p>
    <p className="text-gray-400 text-sm mt-2">
      Years Combined Experience
    </p>
  </div>

  <div className="border border-gold/20 p-6 rounded-xl">
    <p className="text-3xl font-bold text-gold">50+</p>
    <p className="text-gray-400 text-sm mt-2">
      Healthcare Professionals Network
    </p>
  </div>

  <div className="border border-gold/20 p-6 rounded-xl">
    <p className="text-3xl font-bold text-gold">100%</p>
    <p className="text-gray-400 text-sm mt-2">
      Structured Execution Approach
    </p>
  </div>
</div>


{/* WHY CHOOSE US */}
<div>
  <h2 className="text-2xl text-gold mb-4">
    Why Hospitals Choose HOSPINOVUS
  </h2>

  <ul className="space-y-3 text-gray-300">
    <li>• We don’t just consult — we execute on-ground</li>
    <li>• Department-wise implementation support</li>
    <li>• Real audit preparation, not theoretical advice</li>
    <li>• Focus on long-term operational stability</li>
  </ul>
</div>


{/* URGENCY BLOCK */}
<div className="border border-gold/20 p-6 rounded-xl text-center bg-gradient-to-br from-black to-[#1a1a1a]">
  <p className="text-lg text-gray-300 mb-4">
    Planning NABH accreditation in the next 3–6 months?
  </p>

  <p className="text-gray-400 mb-6 text-sm">
    Start with a structured gap analysis and avoid costly delays during audits.
  </p>

  <Link
    to={`/contact?service=${service.slug}`}
    className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
  >
    Book NABH Readiness Assessment →
  </Link>
</div>
        {/* CTA */}
        <div className="text-center">
          <Link
            to={`/contact?service=${service.slug}`}
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
          >
            Book NABH Consultation →
          </Link>
        </div>

      </div>
    </div>
  )
}