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
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="text-center px-8 pt-8 pb-12">
          <span 
            className="inline-block font-mono text-[0.7rem] font-semibold tracking-widest px-3 py-1.5 rounded-full text-black mb-5"
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-primary), #f59e0b)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
          >
            SEE THEM IN ACTION
          </span>
          <h1 
            className="text-5xl font-bold tracking-tight mb-3"
            style={{ 
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Prompts, Proven
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-lg mx-auto">
            Real before/after examples showing <em className="text-[var(--accent-primary)] not-italic">exactly</em> what each prompt does.
          </p>
        </section>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-8 mb-12">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="text-3xl mb-4">
              <Target className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2">Know When to Use It</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Each showcase shows the situation that calls for this prompt.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="text-3xl mb-4">
              <Zap className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2">See the Difference</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Before/after comparisons so you know what to expect.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 text-center transition-all hover:border-[var(--border-medium)] hover:-translate-y-0.5">
            <div className="text-3xl mb-4">
              <FlaskConical className="w-8 h-8 mx-auto text-[var(--accent-primary)]" />
            </div>
            <h3 className="text-base font-semibold mb-2">Real Outputs</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Actual AI responses, not hypothetical examples.
            </p>
          </div>
        </div>

        {/* Filters */}
        <nav className="flex justify-center flex-wrap gap-2 px-8 pb-8">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-150 ${
                activeFilter === cat.value
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Showcases Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8 px-8 pb-16 max-w-[1400px] mx-auto">
          {filteredShowcases.map((showcase, index) => (
            <div 
              key={showcase.id}
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
        <section className="py-16 px-8 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Built something cool with AI?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Share your prompt history and earn money when others learn from your journey.
            </p>
            <Link 
              href="/export"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] rounded-[var(--radius-md)] text-base font-semibold text-black hover:bg-[var(--accent-secondary)] hover:-translate-y-0.5 transition-all no-underline"
            >
              <Plus size={20} />
              Submit Your Showcase
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

