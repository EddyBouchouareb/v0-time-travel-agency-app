"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Users, Calendar } from "lucide-react"

const destinations = [
  { value: "paris-1889", label: "Paris 1889 — Belle Époque", price: 12500 },
  { value: "florence-1504", label: "Florence 1504 — Renaissance", price: 15800 },
  { value: "cretaceous", label: "Crétacé -65M — Ère des dinosaures", price: 22000 },
]

interface FormData {
  nom: string
  email: string
  destination: string
  date: string
  voyageurs: number
  preferences: string
}

export function ReservationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    nom: "",
    email: "",
    destination: "",
    date: "",
    voyageurs: 1,
    preferences: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const selectedDest = destinations.find((d) => d.value === form.destination)
  const estimatedPrice = selectedDest
    ? selectedDest.price * form.voyageurs
    : 0

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!form.email.trim()) newErrors.email = "L'email est requis"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email invalide"
    if (!form.destination) newErrors.destination = "Choisissez une destination"
    if (!form.date) newErrors.date = "La date est requise"
    if (form.voyageurs < 1 || form.voyageurs > 10)
      newErrors.voyageurs = "Entre 1 et 10 voyageurs"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  const update = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const inputClasses =
    "w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
  const labelClasses = "mb-1.5 block text-sm font-medium text-foreground"
  const errorClasses = "mt-1 text-xs text-red-400"

  return (
    <section id="reservation" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {"Réservation"}
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Préparez votre voyage"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {
              "Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les 24 heures."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="rounded-lg border border-border bg-card p-8 md:p-10"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Nom */}
                <div>
                  <label htmlFor="nom" className={labelClasses}>
                    {"Nom complet"}
                  </label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Jean Dupont"
                    className={inputClasses}
                    value={form.nom}
                    onChange={(e) => update("nom", e.target.value)}
                  />
                  {errors.nom && <p className={errorClasses}>{errors.nom}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    {"Email"}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jean@exemple.fr"
                    className={inputClasses}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  {errors.email && <p className={errorClasses}>{errors.email}</p>}
                </div>
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className={labelClasses}>
                  {"Destination"}
                </label>
                <select
                  id="destination"
                  className={`${inputClasses} appearance-none`}
                  value={form.destination}
                  onChange={(e) => update("destination", e.target.value)}
                >
                  <option value="" className="bg-card text-muted-foreground">
                    {"Sélectionnez une destination"}
                  </option>
                  {destinations.map((d) => (
                    <option key={d.value} value={d.value} className="bg-card text-foreground">
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p className={errorClasses}>{errors.destination}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Date */}
                <div>
                  <label htmlFor="date" className={labelClasses}>
                    <Calendar size={14} className="mr-1 inline text-gold" />
                    {"Date de départ"}
                  </label>
                  <input
                    id="date"
                    type="date"
                    className={inputClasses}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                  />
                  {errors.date && <p className={errorClasses}>{errors.date}</p>}
                </div>

                {/* Voyageurs */}
                <div>
                  <label htmlFor="voyageurs" className={labelClasses}>
                    <Users size={14} className="mr-1 inline text-gold" />
                    {"Nombre de voyageurs"}
                  </label>
                  <input
                    id="voyageurs"
                    type="number"
                    min={1}
                    max={10}
                    className={inputClasses}
                    value={form.voyageurs}
                    onChange={(e) =>
                      update("voyageurs", parseInt(e.target.value) || 1)
                    }
                  />
                  {errors.voyageurs && (
                    <p className={errorClasses}>{errors.voyageurs}</p>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <label htmlFor="preferences" className={labelClasses}>
                  {"Préférences spéciales"}
                </label>
                <textarea
                  id="preferences"
                  rows={3}
                  placeholder="Allergies, demandes particulières, occasions spéciales..."
                  className={`${inputClasses} resize-none`}
                  value={form.preferences}
                  onChange={(e) => update("preferences", e.target.value)}
                />
              </div>

              {/* Estimated price */}
              {estimatedPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="rounded-md border border-gold/20 bg-gold/5 p-4 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    {"Prix estimé"}
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold text-gold">
                    {estimatedPrice.toLocaleString("fr-FR")}
                    {"€"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {`Pour ${form.voyageurs} voyageur${form.voyageurs > 1 ? "s" : ""}`}
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full rounded-sm bg-gold py-3 text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-light"
              >
                {"Envoyer ma demande"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-10 text-center"
            >
              <div className="mb-6 inline-flex rounded-full bg-gold/10 p-4 text-gold">
                <Check size={32} />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {"Demande envoyée !"}
              </h3>
              <p className="mb-2 text-base text-muted-foreground">
                {`Merci ${form.nom}. Nous avons bien reçu votre demande pour`}
              </p>
              <p className="mb-6 font-serif text-lg font-semibold text-gold">
                {selectedDest?.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {
                  "Notre équipe vous contactera à l'adresse "
                }
                <span className="font-medium text-foreground">{form.email}</span>
                {" dans les 24 heures."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
