import { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

type Lead = {
  name: string
  email: string
  phone: string
  organization: string
  message: string
}

// ✅ INIT SUPABASE
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// ✅ INIT RESEND
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const body = req.body as Lead
    const { name, email, phone, organization, message } = body

    // ✅ COLLECT ALL ERRORS
    const errors: Record<string, string> = {}

    if (!name) errors.name = "Name is required"
    if (!email) errors.email = "Email is required"
    if (!phone) errors.phone = "Phone is required"
    if (!organization) errors.organization = "Organization is required"
    if (!message) errors.message = "Message is required"

    // ✅ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      errors.email = "Enter a valid email address"
    }

    // ✅ PHONE VALIDATION
    if (phone && phone.length < 10) {
      errors.phone = "Enter a valid 10-digit phone number"
    }

    // 🚨 RETURN ALL ERRORS
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    // 🚀 INSERT INTO SUPABASE
    const { error } = await supabase.from("leads").insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        organization: organization.trim(),
        message: message.trim(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return res.status(500).json({ error: "Database error" })
    }

    // 🚀 SEND EMAIL (NEW ADDITION)
    try {
      await resend.emails.send({
        from: "Hospinovus <onboarding@resend.dev>",
        to: ["hospinovus@gmail.com"], // 🔥 replace if needed
        subject: "🚨 New Hospital Lead - HOSPINOVUS",
        html: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Requirement:</strong> ${message}</p>
        `,
      })
    } catch (emailErr) {
      console.error("Email error:", emailErr)
      // ❗ DO NOT FAIL REQUEST if email fails
    }

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    })

  } catch (err) {
    console.error("Server error:", err)
    return res.status(500).json({ error: "Server error" })
  }
}