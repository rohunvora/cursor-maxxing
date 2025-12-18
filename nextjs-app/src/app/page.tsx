'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PromptCard } from '@/components/PromptCard'
import { prompts } from '@/lib/prompts-data'

type Category = 'all' | 'coding' | 'writing' | 'analysis' | 'creative' | 'system'

export default function PromptsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [copiedToast, setCopiedToast] = useState(false)

  const filteredPrompts = activeFilter === 'all' 
    ? prompts 
    : prompts.filter(p => p.category === activeFilter)

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'coding', label: 'Coding' },
    { value: 'writing', label: 'Writing' },
    { value: 'analysis', label: 'Analysis' },
    { value: 'creative', label: 'Creative' },
    { value: 'system', label: 'System' },
  ]

  return (
    <>
      <Header />
      
      <main>
        {/* Hero */}
        <div className="text-center px-8 pb-8">
          <p className="text-lg text-[var(--text-secondary)]">
            Curated prompts that actually work. Click to copy.
          </p>
        </div>

        {/* Filters */}
        <nav className="flex justify-center flex-wrap gap-2 px-8 pb-10 sticky top-0 bg-gradient-to-b from-[var(--bg-primary)] from-60% to-transparent z-50">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6 px-8 pb-16 max-w-[1400px] mx-auto">
          {filteredPrompts.map((prompt, index) => (
            <div 
              key={prompt.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PromptCard
                title={prompt.title}
                description={prompt.description}
                category={prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)}
                modelTag={prompt.modelTag}
                prompt={prompt.prompt}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Toast */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3.5 bg-[var(--bg-card)] border border-[var(--success)] rounded-[var(--radius-md)] text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-250 z-[1001] ${
          copiedToast 
            ? 'translate-y-0 opacity-100 visible' 
            : 'translate-y-[100px] opacity-0 invisible'
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5 text-[var(--success)]">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Copied to clipboard
      </div>
    </>
  )
}
