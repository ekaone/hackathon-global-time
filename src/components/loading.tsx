export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl font-bold">
        <span className="inline-block animate-pulse">Loading</span>
        <span className="inline-block animate-pulse delay-100">.</span>
        <span className="inline-block animate-pulse delay-200">.</span>
        <span className="inline-block animate-pulse delay-300">.</span>
      </div>
    </div>
  )
}
