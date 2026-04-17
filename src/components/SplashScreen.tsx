import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2000) // ⏱️ duration

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] animate-fadeOut">

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="HOSPINOVUS"
        className="w-20 h-20 mb-4 animate-pulse"
      />

      {/* NAME */}
      <h1 className="text-gold text-2xl font-bold tracking-wide">
        HOSPINOVUS
      </h1>

      {/* TAGLINE */}
      <p className="text-gray-400 text-sm mt-2">
        YOU OWN • WE MANAGE
      </p>

    </div>
  )
}