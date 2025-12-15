import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const stripe = getStripe()
    const { showcaseId, priceInCents } = await request.json()
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get showcase details
    const { data: showcase, error: showcaseError } = await supabase
      .from('showcases')
      .select('*, creator:profiles(*)')
      .eq('id', showcaseId)
      .single()

    if (showcaseError || !showcase) {
      return NextResponse.json({ error: 'Showcase not found' }, { status: 404 })
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('buyer_id', user.id)
      .eq('showcase_id', showcaseId)
      .single()

    if (existingPurchase) {
      return NextResponse.json({ error: 'Already purchased' }, { status: 400 })
    }

    // Calculate platform fee (15%)
    const platformFee = Math.round(priceInCents * 0.15)

    // Create Stripe Checkout Session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: showcase.title,
              description: `Full prompt history - ${showcase.stats?.prompts || 0} prompts`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/showcase/${showcaseId}?purchased=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/showcase/${showcaseId}`,
      metadata: {
        showcase_id: showcaseId,
        buyer_id: user.id,
        creator_id: showcase.creator_id,
      },
    }

    // If creator has Stripe Connect, use destination charges
    if (showcase.creator?.stripe_account_id) {
      sessionConfig.payment_intent_data = {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: showcase.creator.stripe_account_id,
        },
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
