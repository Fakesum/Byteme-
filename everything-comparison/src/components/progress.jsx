import React from 'react'

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  const baseStyle = "relative h-4 w-full overflow-hidden rounded-full bg-secondary"
  const combinedClassName = `${baseStyle} ${className || ''}`

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={combinedClassName}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }