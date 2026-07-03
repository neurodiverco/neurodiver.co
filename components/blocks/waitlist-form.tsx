"use client"

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const errorMessage = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
          ? data.error
          : 'Error submitting form'
        setErrorMessage(errorMessage)
        setStatus('error')
        setTimeout(() => {
          setStatus('idle')
          setErrorMessage('')
        }, 2000)
      }
    } catch {
      setErrorMessage('Network error')
      setStatus('error')
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 2000)
    }
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-x-3 gap-y-4 w-full max-w-md flex-wrap justify-center"
      onSubmit={handleSubmit}
    >
      <input
        name="email"
        type="email"
        className="flex-1 min-w-55 py-3 px-4 placeholder:text-muted-foreground border border-sidebar-border/50 active:border-sidebar-border focus:border-sidebar-border focus:bg-accent-foreground/10 rounded-lg text-sidebar-foreground outline-none transition"
        placeholder="Your email address"
        aria-label="Email address"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status !== 'idle'}
      />
      <button
        type="submit"
        className={`items-center gap-2 font-semibold tracking-[0.01em] px-5 py-2.5 rounded-lg border-0 cursor-pointer transition text-nowrap bg-accent text-accent-foreground hover:brightness-125 active:scale-[98%] w-full sm:w-auto ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? 'Join the waitlist' :
         status === 'submitting' ? 'Joining...' :
         status === 'success' ? 'We’ll be in touch when we launch.' :
         errorMessage}
      </button>
    </form>
  )
}
