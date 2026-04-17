import { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

type Lead = {
  name: string
  email: string
  phone: string
  organization: string
  message: string
}

// ✅ INIT SUPABASE (BACKEND SAFE)
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

    // 🔒 BASIC VALIDATION
    if (!name || !email || !phone || !organization || !message) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // 🔒 EMAIL VALIDATION (MINIMUM LEVEL)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }

    // 🔒 PHONE VALIDATION (basic)
    if (phone.length < 10) {
      return res.status(400).json({ error: "Invalid phone number" })
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