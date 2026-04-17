import { Link } from "react-router-dom"

export default function AboutPage() {
  return (
    <div className="bg-black text-white pt-28 pb-20 px-4 md:px-6">

      <div className="max-w-5xl mx-auto space-y-16">

        {/* 🔥 HERO */}
        <div className="space-y-6 text-center">
          <p className="text-sm text-gold uppercase tracking-wide">
            About HOSPINOVUS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            We Fix What’s Slowing Your Hospital Down
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            From NABH delays to operational inefficiencies and low patient flow —
            we step in, structure your systems, and execute improvements that actually work.
          </p>
        </div>

        {/* 🔥 REALITY BLOCK */}
        <div>
          <h2 className="text-2xl text-gold mb-4">
            The Reality Most Hospitals Face
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>• Discharge summaries getting delayed for hours</li>
            <li>• Staff unclear about NABH protocols</li>
            <li>• Departments working in silos</li>
            <li>• Good clinical care but low patient inflow</li>
            <li>• No structured systems to scale operations</li>
          </ul>

          <p className="text-gray-400 mt-4">
            These are not isolated problems — they are systemic gaps.
          </p>
        </div>

        {/* 🔥 POSITIONING */}
        <div>
          <h2 className="text-2xl text-gold mb-4">
            What Makes HOSPINOVUS Different
          </h2>

          <p className="text-gray-300 mb-4">
            Most consultants stop at giving advice. We don’t.
          </p>

          <p className="text-gray-400">
            We work alongside your team, implement systems department-wise,
            and ensure your hospital runs in a structured, audit-ready, and scalable way.
          </p>
        </div>

        {/* 🔥 APPROACH */}
        <div>
          <h2 className="text-2xl text-gold mb-4">
            Our Approach
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>• Identify real operational gaps (not surface-level issues)</li>
            <li>• Build structured SOPs and workflows</li>
            <li>• Implement across departments — not just management level</li>
            <li>• Train teams for clarity and accountability</li>
            <li>• Prepare your hospital for real-world audits and growth</li>
          </ul>
        </div>

        {/* 🔥 PHILOSOPHY */}
        <div className="border border-gold/20 p-6 rounded-xl text-center">
          <p className="text-xl text-gold font-semibold">
            “Hospitals don’t fail due to lack of effort —  
            they fail due to lack of structured systems.”
          </p>
        </div>

        {/* 🔥 WHO WE WORK WITH */}
        <div>
          <h2 className="text-2xl text-gold mb-4">
            Who We Work With
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>• Hospitals preparing for NABH accreditation</li>
            <li>• 20–100 bed hospitals scaling operations</li>
            <li>• Facilities facing workflow and coordination issues</li>
            <li>• Hospitals aiming to improve patient experience and growth</li>
          </ul>
        </div>

        {/* 🔥 FINAL CTA */}
        <div className="text-center border border-gold/20 p-8 rounded-xl">
          <h3 className="text-2xl text-gold mb-3">
            Let’s Assess Where Your Hospital Stands
          </h3>

          <p className="text-gray-400 mb-6">
            Start with a structured gap analysis and get complete clarity on what needs to be fixed.
          </p>

          <Link
            to="/contact?service=General Inquiry"
            className="bg-gold text-black px-8 py-3 rounded-lg font-medium"
          >
            Book Consultation →
          </Link>
        </div>

      </div>
    </div>
  )
}