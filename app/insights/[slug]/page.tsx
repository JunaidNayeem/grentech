import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { InsightCard } from "@/components/sections/insight-card"
import { getInsightBySlug, getRelatedInsights, insights } from "@/data/insights"

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return {}
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  const related = getRelatedInsights(insight.slug)

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All insights
        </Link>

        <Eyebrow className="mt-8 block uppercase text-teal">{insight.category}</Eyebrow>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {insight.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {insight.publishedLabel} · {insight.readingTime}
        </p>

        <div className="prose-content mt-10 space-y-6">
          {insight.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="font-display text-xl font-semibold text-foreground">
                  {block.text}
                </h2>
              )
            }
            if (block.type === "list") {
              return (
                <ul key={index} className="list-inside list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="text-base leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )
          })}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16 max-w-3xl border-t border-border pt-12">
          <h2 className="font-display text-xl font-semibold text-foreground">Related insights</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>
        </Container>
      )}
    </article>
  )
}
