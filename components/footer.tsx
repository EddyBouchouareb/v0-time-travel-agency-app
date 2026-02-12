"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-border py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div>
            <a href="#accueil" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-wide text-gold">
                TimeTravel
              </span>
              <span className="font-serif text-xl font-light text-foreground">
                Agency
              </span>
            </a>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {"Agence de voyages temporels de luxe. Des expériences uniques à travers les époques."}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Navigation du pied de page">
            <a href="#accueil" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {"Accueil"}
            </a>
            <a href="#destinations" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {"Destinations"}
            </a>
            <a href="#quiz" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {"Quiz"}
            </a>
            <a href="#reservation" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {"Réservation"}
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            {"© 2026 TimeTravel Agency. Tous droits réservés. Projet pédagogique."}
          </p>
          <p className="text-xs text-muted-foreground">
            {"Conçu avec passion pour les voyageurs du temps."}
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
