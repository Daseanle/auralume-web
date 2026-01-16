import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email required' },
        { status: 400 }
      )
    }

    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_SECRET = process.env.CONVERTKIT_API_SECRET

    if (!FORM_ID || !API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Secret ${API_SECRET}`,
        },
        body: JSON.stringify({
          email,
        }),
      }
    )

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const error = await response.text()
      return NextResponse.json(
        { success: false, error: 'Subscription failed. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
