'use client'

import Link from 'next/link'
import { Eye, Lock, MessageSquare, CheckCircle, Clock } from 'lucide-react'
import type { Showcase } from '@/lib/types'

interface ShowcaseCardProps {
  showcase: Showcase
  featured?: boolean
}

export function ShowcaseCard({ showcase, featured = false }: ShowcaseCardProps) {
  const priceFormatted = (showcase.price_cents / 100).toFixed(2)
  
  const categoryColors: Record<string, string> = {
    web: 'bg-[var(--accent-light)] text-[var(--accent-primary)]',
    design: 'bg-[#FDF2F8] text-[#DB2777]',
    automation: 'bg-[#ECFDF5] text-[#059669]',
    content: 'bg-[#EEF2FF] text-[#6366F1]',
  }

  return (
    <article 
      className={`bg-[var(--bg-card)] border rounded-[16px] overflow-hidden transition-all duration-150 hover:border-[var(--border-medium)] hover:-translate-y-0.5 animate-fadeIn ${
        featured 
          ? 'border-[var(--accent-primary)]' 
          : 'border-[var(--border-subtle)]'
      }`}
    >
      {/* Preview Section */}
      <div className="relative bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        {/* Browser Chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-subtle)]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-3 py-1 rounded">
              {showcase.category} • showcase
            </span>
          </div>
        </div>
        
        {/* Content Preview */}
        <div className="h-[160px] p-4 flex flex-col gap-2">
          {showcase.preview_messages?.slice(0, 2).map((msg, i) => (
            <div 
              key={i}
              className={`p-2.5 rounded-[var(--radius-sm)] text-xs truncate ${
                msg.role === 'user' 
                  ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]' 
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
              }`}
            >
              <span className="font-mono text-[0.65rem] uppercase opacity-60 mr-2">
                {msg.role === 'user' ? 'You' : 'AI'}:
              </span>
              {msg.content.substring(0, 70)}...
            </div>
          ))}
          <div className="flex-1 flex items-center justify-center text-[var(--text-muted)]">
            <Lock size={14} className="mr-2" />
            <span className="text-sm">{showcase.stats.prompts - 2}+ more messages</span>
          </div>
        </div>
        
        {featured && (
          <span className="absolute top-3 right-3 text-[0.65rem] font-semibold px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white">
            Featured
          </span>
        )}
      </div>
      
      {/* Info Section */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`font-mono text-[0.65rem] font-semibold uppercase tracking-wide px-2 py-1 rounded-[var(--radius-sm)] ${categoryColors[showcase.category] || categoryColors.web}`}>
            {showcase.category}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {new Date(showcase.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-base font-semibold tracking-tight mb-2 text-[var(--text-primary)]">
          {showcase.title}
        </h3>
        
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
          {showcase.description}
        </p>
        
        {/* Stats */}
        <div className="flex gap-4 p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] mb-4">
          <div className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-[var(--text-muted)]" />
            <span className="font-semibold text-sm text-[var(--text-primary)]">{showcase.stats.prompts}</span>
            <span className="text-xs text-[var(--text-muted)]">prompts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-[var(--text-muted)]" />
            <span className="font-semibold text-sm text-[var(--text-primary)]">{showcase.stats.iterations}</span>
            <span className="text-xs text-[var(--text-muted)]">iterations</span>
          </div>
          {showcase.stats.hours && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[var(--text-muted)]" />
              <span className="font-semibold text-sm text-[var(--text-primary)]">{showcase.stats.hours}</span>
              <span className="text-xs text-[var(--text-muted)]">hours</span>
            </div>
          )}
        </div>
        
        {/* Creator */}
        {showcase.creator && (
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm bg-[var(--accent-primary)] text-white"
            >
              {showcase.creator.display_name?.[0] || showcase.creator.username?.[0] || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[var(--text-primary)]">{showcase.creator.display_name || showcase.creator.username || 'Anonymous'}</span>
              <span className="text-xs text-[var(--text-muted)]">Creator</span>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-3">
          <Link 
            href={`/showcase/${showcase.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)] transition-all no-underline"
          >
            <Eye size={16} />
            Preview
          </Link>
          <Link 
            href={`/showcase/${showcase.id}?unlock=true`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--accent-primary)] rounded-[var(--radius-md)] text-sm font-semibold text-white hover:bg-[var(--accent-secondary)] transition-all no-underline"
          >
            <Lock size={16} />
            Unlock ${priceFormatted}
          </Link>
        </div>
      </div>
    </article>
  )
}
