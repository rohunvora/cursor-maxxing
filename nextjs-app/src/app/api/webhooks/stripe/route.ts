import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const stripe = getStripe()
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')
  
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Extract metadata
      const showcaseId = session.metadata?.showcase_id
      const buyerId = session.metadata?.buyer_id
      
      if (showcaseId && buyerId) {
        // Record the purchase
        const { error } = await supabase.from('purchases').insert({
          buyer_id: buyerId,
          showcase_id: showcaseId,
          stripe_payment_id: session.payment_intent as string,
          amount_cents: session.amount_total,
        })

        if (error) {
          console.error('Failed to record purchase:', error)
          return NextResponse.json({ error: 'Failed to record purchase' }, { status: 500 })
        }
      }
      break
    }

    case 'account.updated': {
      // Handle Stripe Connect account updates
      const account = event.data.object as Stripe.Account
      
      if (account.details_submitted) {
        // Update profile with stripe account status
        const { error } = await supabase
          .from('profiles')
          .update({ stripe_account_id: account.id })
          .eq('stripe_account_id', account.id)

        if (error) {
          console.error('Failed to update profile:', error)
        }
      }
      break
    }

    case 'transfer.created': {
      // Log creator payouts
      const transfer = event.data.object as Stripe.Transfer
      console.log('Transfer created:', transfer.id, transfer.amount)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
