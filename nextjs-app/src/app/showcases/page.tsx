'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ShowcaseCard } from '@/components/ShowcaseCard'
import { seedShowcases } from '@/lib/seed-showcases'
import { Target, Zap, FlaskConical, Plus } from 'lucide-react'

type Category = 'all' | 'web' | 'design' | 'automation' | 'content'

export default function ShowcasesPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  const filteredShowcases = activeFilter === 'all'
    ? seedShowcases
    : seedShowcases.filter(s => s.category === activeFilter)

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web Apps' },
    { value: 'design', label: 'Design' },
    { value: 'automation', label: 'Automation' },
    { value: 'content', label: 'Content' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block font-mono text-[0.7rem] font-semibold tracking-widest px-3 py-1.5 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] mb-5">
              SEE THEM IN ACTION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Prompts, Proven
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Real before/after examples showing <em className="text-[var(--accent-primary)] not-italic font-medium">exactly</em> what each prompt does.
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[16px] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="mb-4">
              <Target className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-[var(--text-primary)]">Know When to Use It</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Each showcase shows the situation that calls for this prompt.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[16px] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="mb-4">
              <Zap className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-[var(--text-primary)]">See the Difference</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Before/after comparisons so you know what to expect.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[16px] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="mb-4">
              <FlaskConical className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-[var(--text-primary)]">Real Outputs</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Actual AI responses, not hypothetical examples.
            </p>
          </div>
        </div>

        {/* Filters */}
        <nav className="flex justify-center flex-wrap gap-2 px-6 pb-8">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-150 ${
                activeFilter === cat.value
                  ? 'bg-[var(--text-primary)] text-[var(--bg-card)] border-[var(--text-primary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Showcases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-16 max-w-6xl mx-auto">
          {filteredShowcases.map((showcase, index) => (
            <div 
              key={showcase.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ShowcaseCard 
                showcase={showcase} 
                featured={index === 0}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--text-primary)]">Built something cool with AI?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Share your prompt history and earn money when others learn from your journey.
            </p>
            <Link 
              href="/export"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] rounded-[var(--radius-md)] text-base font-semibold text-white hover:bg-[var(--accent-secondary)] transition-all no-underline"
            >
              <Plus size={20} />
              Submit Your Showcase
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
