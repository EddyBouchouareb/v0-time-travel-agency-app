"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Destinations", href: "#destinations" },
  { label: "Quiz", href: "#quiz" },
  { label: "Contact", href: "#reservation" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#accueil" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-wide text-gold">
            TimeTravel
          </span>
          <span className="font-serif text-xl font-light text-foreground">
            Agency
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="rounded-sm border border-gold bg-transparent px-5 py-2 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-background"
          >
            {"Réserver"}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservation"
                className="mt-2 rounded-sm border border-gold bg-transparent px-5 py-2 text-center text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-background"
                onClick={() => setMobileOpen(false)}
              >
                {"Réserver"}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
