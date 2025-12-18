'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: unknown, session: { user: User | null } | null) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const isActive = (path: string) => pathname === path

  return (
    <header className="px-8 py-6 relative">
      {/* Gradient glow behind header */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)' }}
      />
      
      <nav className="flex items-center justify-between max-w-[1400px] mx-auto w-full relative">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="text-[1.75rem] text-[var(--accent-primary)]">⌘</span>
          <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">prompt.gallery</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium py-2 relative transition-colors no-underline ${
              isActive('/') 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Prompts
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-sm" />
            )}
          </Link>
          
          <Link 
            href="/showcases" 
            className={`text-sm font-medium py-2 relative transition-colors no-underline ${
              pathname.startsWith('/showcase') 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Showcases
            {pathname.startsWith('/showcase') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-sm" />
            )}
          </Link>
          
          <Link 
            href="/export" 
            className={`text-sm font-medium py-2 flex items-center gap-2 relative transition-colors no-underline ${
              isActive('/export') 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Export
            <span 
              className="font-mono text-[0.6rem] font-semibold tracking-wide px-1.5 py-0.5 rounded text-black"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary), #f59e0b)',
                animation: 'badge-pulse 2s ease-in-out infinite'
              }}
            >
              NEW
            </span>
            {isActive('/export') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-sm" />
            )}
          </Link>

          {user ? (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium py-2 relative transition-colors no-underline ${
                isActive('/dashboard') 
                  ? 'text-[var(--text-primary)]' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Dashboard
              {isActive('/dashboard') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-sm" />
              )}
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className="text-sm font-medium px-4 py-2 bg-[var(--accent-primary)] text-black rounded-lg hover:bg-[var(--accent-secondary)] transition-colors no-underline"
            >
              Sign In
            </Link>
          )}
          
          <a 
            href="https://github.com/rohunvora/prmpt-hstry" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={22} />
          </a>
        </div>
      </nav>
    </header>
  )
}

