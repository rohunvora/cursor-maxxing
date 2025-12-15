export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  stripe_account_id: string | null
  stripe_customer_id: string | null
  created_at: string
}

export interface Showcase {
  id: string
  creator_id: string
  title: string
  description: string | null
  category: string
  price_cents: number
  preview_messages: Message[]
  full_content_path: string | null
  stats: ShowcaseStats
  is_published: boolean
  created_at: string
  // Joined data
  creator?: Profile
  is_purchased?: boolean
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ShowcaseStats {
  prompts: number
  iterations: number
  hours?: number
}

export interface Purchase {
  id: string
  buyer_id: string
  showcase_id: string
  stripe_payment_id: string
  amount_cents: number
  created_at: string
}

export interface ExportData {
  meta: {
    title: string
    description: string
    category: string
    price: number
    creator: string
    exportedAt: string
    stats: {
      totalMessages: number
      userPrompts: number
      redactedItems: number
    }
  }
  messages: Message[]
}

