'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('🌙 Check your inbox for your free Moon Ritual Guide!')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        ✨ Unlock Your Manifestation Power
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Get free moon rituals, crystal guides, and manifestation tips delivered weekly.
      </p>

      {status === 'success' ? (
        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-green-600 dark:text-green-400 font-medium">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Free Moon Ritual Guide 🌙'}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          <p className="text-xs text-gray-500 text-center">
            Join 1,000+ manifestors. No spam, unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  )
}
