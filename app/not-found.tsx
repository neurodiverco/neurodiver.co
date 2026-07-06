import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex-1 flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
      <div className={cn(`flex flex-col sm:flex-row gap-x-20 gap-y-10 items-center after:content-none`)}>

      <div className="prose prose-headings:mt-8 prose-headings:font-semibold">
        <h2>Not Found</h2>
        <p>Could not find requested page</p>
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </main>
  )
}
