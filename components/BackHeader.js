'use client'
import { useRouter } from 'next/navigation'

export default function BackHeader({ title }) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 sticky top-0 z-10">
      <button
        onClick={() => router.back()}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg"
        aria-label="Go back"
      >
        {'<'}
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  )
}