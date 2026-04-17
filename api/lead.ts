import { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

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

    // ✅ PHONE VALIDATION (STRICT)
    if (phone && phone.length < 10) {
      errors.phone = "Enter a valid 10-digit phone number"
    }

    // 🚨 RETURN ALL ERRORS AT ONCE
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

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    })

  } catch (err) {
    console.error("Server error:", err)
    return res.status(500).json({ error: "Server error" })
  }
}