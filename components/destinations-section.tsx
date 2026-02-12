"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    subtitle: "Belle Époque",
    description:
      "Assistez à l'inauguration de la Tour Eiffel lors de l'Exposition universelle. Plongez dans le Paris scintillant de la fin du XIXe siècle.",
    image: "/images/paris-1889.jpg",
    price: "12 500",
  },
  {
    id: "florence-1504",
    title: "Florence 1504",
    subtitle: "Renaissance",
    description:
      "Rencontrez Michel-Ange dans son atelier et admirez la création du David. Vivez l'apogée artistique de la Renaissance italienne.",
    image: "/images/florence-1504.jpg",
    price: "15 800",
  },
  {
    id: "cretaceous",
    title: "Crétacé -65M",
    subtitle: "Ère des dinosaures",
    description:
      "Observez les derniers dinosaures dans leur habitat naturel. Une aventure préhistorique unique, encadrée par nos experts paléontologues.",
    image: "/images/cretaceous.jpg",
    price: "22 000",
  },
]

export function DestinationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="destinations" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {"Nos destinations"}
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Explorez les époques"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {
              "Trois destinations exceptionnelles, soigneusement sélectionnées pour leur richesse historique et leur potentiel d'émerveillement."
            }
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:border-gold/30"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.title} - ${dest.subtitle}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-sm bg-gold/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                    {dest.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
                  {dest.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {"À partir de "}
                    <span className="font-semibold text-gold">
                      {dest.price}{"€"}
                    </span>
                  </span>
                  <a
                    href="#reservation"
                    className="group/btn inline-flex items-center gap-1 text-sm font-medium text-gold transition-all duration-300 hover:gap-2"
                  >
                    {"En savoir plus"}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
                <a
                  href="#reservation"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold/20 hover:border-gold/60"
                >
                  {"Réserver"}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
