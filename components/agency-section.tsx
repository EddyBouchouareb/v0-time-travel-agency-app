"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Voyages sur mesure",
    description:
      "Chaque itinéraire est conçu avec une précision absolue pour une immersion totale dans l'époque choisie.",
  },
  {
    icon: Shield,
    title: "Sécurité maximale",
    description:
      "Notre technologie de pointe garantit un retour sûr et ponctuel, quelle que soit la destination temporelle.",
  },
  {
    icon: Sparkles,
    title: "Expérience premium",
    description:
      "Un service d'exception avec accompagnateur historien personnel et équipements de luxe à chaque époque.",
  },
]

export function AgencySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="agence" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {"Notre vision"}
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Le luxe de voyager dans le temps"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {
              "TimeTravel Agency est la première agence de voyages temporels de luxe au monde. Nous offrons des expériences immersives et exclusives à travers les époques les plus fascinantes de l'humanité."
            }
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" }}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:border-gold/30"
            >
              <div className="mb-5 inline-flex rounded-sm bg-gold/10 p-3 text-gold transition-colors duration-300 group-hover:bg-gold/20">
                <feature.icon size={24} />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
