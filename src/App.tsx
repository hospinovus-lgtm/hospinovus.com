import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import ServicesPage from "./pages/ServicesPage"

function Home() {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </>
  )
}