"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { RotateCcw, Compass } from "lucide-react"

type Destination = "paris" | "florence" | "cretaceous"

interface Question {
  question: string
  options: { label: string; value: Destination }[]
}

const questions: Question[] = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culture et art", value: "florence" },
      { label: "Aventure et nature", value: "cretaceous" },
      { label: "Élégance et raffinement", value: "paris" },
    ],
  },
  {
    question: "Quelle période vous fascine le plus ?",
    options: [
      { label: "XIXe siècle", value: "paris" },
      { label: "Temps anciens", value: "cretaceous" },
      { label: "Renaissance", value: "florence" },
    ],
  },
  {
    question: "Quel environnement préférez-vous ?",
    options: [
      { label: "Urbain", value: "paris" },
      { label: "Sauvage", value: "cretaceous" },
      { label: "Artistique", value: "florence" },
    ],
  },
  {
    question: "Quelle activité vous attire le plus ?",
    options: [
      { label: "Monuments historiques", value: "paris" },
      { label: "Faune préhistorique", value: "cretaceous" },
      { label: "Musées et ateliers", value: "florence" },
    ],
  },
]

const results: Record<Destination, { title: string; subtitle: string; description: string }> = {
  paris: {
    title: "Paris 1889",
    subtitle: "Belle Époque",
    description:
      "Votre profil correspond parfaitement à un voyage dans le Paris de 1889. L'élégance, le raffinement et la grandeur de l'Exposition universelle vous attendent. Découvrez la Tour Eiffel lors de son inauguration !",
  },
  florence: {
    title: "Florence 1504",
    subtitle: "Renaissance",
    description:
      "Votre âme d'artiste vous appelle vers la Florence de la Renaissance. Rencontrez les plus grands maîtres, explorez les ateliers et vivez l'apogée de la création artistique occidentale.",
  },
  cretaceous: {
    title: "Crétacé -65M",
    subtitle: "Ère des dinosaures",
    description:
      "L'aventure coule dans vos veines ! Le Crétacé est fait pour vous. Observez les créatures les plus impressionnantes ayant jamais foulé la Terre dans un cadre naturel à couper le souffle.",
  },
}

export function QuizSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Destination[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: Destination) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResult(true)
    }
  }

  const getResult = (): Destination => {
    const counts: Record<Destination, number> = { paris: 0, florence: 0, cretaceous: 0 }
    answers.forEach((a) => counts[a]++)
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Destination
  }

  const reset = () => {
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
  }

  const progress = showResult ? 100 : (currentQ / questions.length) * 100

  return (
    <section id="quiz" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {"Quiz temporel"}
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Quelle est votre destination idéale ?"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {
              "Répondez à 4 questions et découvrez l'époque qui vous correspond le mieux."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="rounded-lg border border-border bg-card p-8 md:p-10"
        >
          {/* Progress bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{"Progression"}</span>
              <span>
                {showResult
                  ? "Terminé"
                  : `${currentQ + 1}/${questions.length}`}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="mb-6 font-serif text-xl font-semibold text-foreground md:text-2xl">
                  {questions[currentQ].question}
                </h3>
                <div className="flex flex-col gap-3">
                  {questions[currentQ].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt.value)}
                      className="group rounded-md border border-border bg-secondary/50 px-6 py-4 text-left text-sm font-medium text-foreground transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <div className="mb-6 inline-flex rounded-full bg-gold/10 p-4 text-gold">
                  <Compass size={32} />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-gold md:text-3xl">
                  {results[getResult()].title}
                </h3>
                <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {results[getResult()].subtitle}
                </p>
                <p className="mb-8 text-base leading-relaxed text-muted-foreground text-pretty">
                  {results[getResult()].description}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="#reservation"
                    className="rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-light"
                  >
                    {"Réserver cette destination"}
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    <RotateCcw size={14} />
                    {"Recommencer"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
