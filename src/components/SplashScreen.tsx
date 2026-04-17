import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("seenSplash")

    if (!hasSeen) {
      setVisible(true)
      sessionStorage.setItem("seenSplash", "true")

      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] animate-fadeOut">
      <img src="/logo.png" className="w-20 h-20 mb-4 animate-pulse" />
      <h1 className="text-gold text-2xl font-bold">HOSPINOVUS</h1>
      <p className="text-gray-400 text-sm mt-2">YOU OWN • WE MANAGE</p>
    </div>
  )
}