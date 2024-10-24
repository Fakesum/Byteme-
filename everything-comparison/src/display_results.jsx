'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'

export default function Results(resData) {
    resData = resData.resData;
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 bg-white">
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
            aria-label="Scroll right"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {resData.map((offering, index) => (
            <div key={index} className="flex-none w-72">
              <div className="border rounded-lg shadow-md p-4 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{offering.company}</h3>
                <div className="mb-4">
                  {
                    offering.pricies.map((value, index)=>(
                      <p className="font-bold text-2xl text-primary" key={`prices-${index}`}>{value}</p>
                    ))
                  }
                </div>
                <div className="flex-grow">
                  <div className="mb-2">
                    <h4 className="font-semibold mb-1">Pros:</h4>
                    <ul className="text-sm">
                      {offering.pros.map((pro, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cons:</h4>
                    <ul className="text-sm">
                      {offering.cons.map((con, i) => (
                        <li key={i} className="flex items-center">
                          <X className="h-4 w-4 text-red-500 mr-1" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={offering.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}