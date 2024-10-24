import { useState, useEffect } from "react"

export default function LoadingBar({ progress = 0, max = 3, texts=[] }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Ensure progress is between 0 and 3
    const clampedProgress = Math.max(0, Math.min(progress, max))
    // Convert progress to a percentage (0-100)
    setWidth((clampedProgress / 3) * 100)
  }, [progress])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}