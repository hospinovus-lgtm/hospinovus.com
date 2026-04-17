import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import NProgress from "nprogress"

export default function PageLoader() {
  const location = useLocation()

  useEffect(() => {
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
    }, 400)

    return () => clearTimeout(timer)
  }, [location])

  return null
}