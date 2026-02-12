import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `Tu es l'assistant virtuel premium de TimeTravel Agency. Tu conseilles des voyages temporels de luxe vers Paris 1889, Florence 1504 et le Crétacé -65M. Ton ton est élégant, professionnel, immersif et passionné d'histoire. Tu peux inventer des prix premium. Tu réponds toujours en français. Tu es concis mais captivant.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message requis" },
        { status: 400 }
      )
    }

    const apiKey = process.env.AI_API_KEY
    const apiBase = process.env.AI_API_BASE || "https://openrouter.ai/api/v1"
    const model = process.env.AI_MODEL || "z-ai/glm-4.5-air:free"

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "Je suis actuellement en maintenance. Veuillez réessayer ultérieurement ou nous contacter directement par email.",
        },
        { status: 200 }
      )
    }

    const response = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      console.error("OpenRouter API error:", response.status)
      return NextResponse.json(
        {
          reply:
            "Je rencontre un problème technique. N'hésitez pas à remplir notre formulaire de réservation en attendant !",
        },
        { status: 200 }
      )
    }

    const data = await response.json()
    const reply =
      data.choices?.[0]?.message?.content ||
      "Je suis désolé, je n'ai pas pu traiter votre demande."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        reply:
          "Une erreur est survenue. Veuillez réessayer dans quelques instants.",
      },
      { status: 200 }
    )
  }
}
