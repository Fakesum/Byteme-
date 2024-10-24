'use client'
// faster loading - 0.5
// market analysis should not be shit
// price range in any currancy and system - 1
// Fix the Visit Site button. - 0.9
import { useState, useRef, useEffect, useReducer } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label } from "recharts"
import { ChartTooltip } from "./chart"

function StockPriceChart({ data }) {
  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props
    if (payload.event) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="hsl(var(--primary))"
          stroke="white"
          strokeWidth={2}
        />
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width={300} height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <ChartTooltip
          formatter={(value, name, props) => {
            if (props.payload.event) {
              return [`$${value}`, `${name} (${props.payload.event})`]
            }
            return [`$${value}`, name]
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
          dot={<CustomizedDot />}
        />
        {data.map((data, index) => {
          if (data.event) {
            return (
              <ReferenceLine
                key={index}
                x={data.day}
                stroke="hsl(var(--primary))"
                strokeDasharray="3 3"
              >
                <Label
                  value={data.event}
                  position="top"
                  fill="hsl(var(--primary))"
                  fontSize={10}
                />
              </ReferenceLine>
            )
          }
          return null
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}

var currently_sending_requests = false;

export default function Results(resData) {
  resData = resData.resData;
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoverData, setHoverData] = useState(undefined)
  const hoverRef = useRef(null)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (hoverRef.current) {
        const rect = hoverRef.current.getBoundingClientRect()
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovering])

  function loadingHover(){
    if ((hoverData == undefined) && (!currently_sending_requests)){
      fetch(`http://localhost:3030/chart?q=${resData[0].query}`).then(res => {return res.json()}).then(res => {
        setHoverData(res);
        forceUpdate();
      })
      currently_sending_requests = true;
    }

    if (isHovering && (hoverData != undefined)){
      (<div 
        className="absolute z-10 bg-background border rounded-lg shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <StockPriceChart data={hoverData} />
      </div>)
    }
    return (hoverData == undefined) ? <p>{'loading... the spinny thing stoped working :( '}</p> : <></>;
  }
  
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
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 bg-white"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={hoverRef}
      >
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
                  href={`https://www.google.com/search?q=${offering.company}+${offering.query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Visit Site
                </a>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      {loadingHover()}
    </div>
  )
}