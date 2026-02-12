"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsla(42, 45%, 57%, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {"Agence de voyages temporels de luxe"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl"
        >
          <span className="text-balance">{"Voyagez au-delà"}</span>
          <br />
          <span className="text-gold">{"du Temps"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {
            "Explorez les époques les plus fascinantes de l'histoire humaine. Des expériences immersives et exclusives, conçues pour les voyageurs les plus exigeants."
          }
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#destinations"
            className="group relative overflow-hidden rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-light"
          >
            <span className="relative z-10">{"Découvrir les destinations"}</span>
          </a>
          <a
            href="#agence"
            className="rounded-sm border border-border px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {"En savoir plus"}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-gold/30 pt-2"
          >
            <div className="h-2 w-0.5 rounded-full bg-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
