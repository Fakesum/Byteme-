import React, { useState, useRef, useEffect, useReducer } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label } from "recharts"
import { ChartTooltip } from "./chart"
import Cookies from 'js-cookie'

function TimelineChart(data) {
  data = data.data;

// Add index to data for x-axis
const processedData = data.map((item, index) => ({
  ...item,
  index
}));

const maxPrice = Math.max(...data.map(item => item.price));

return (
  <div className="w-full h-64">
    <LineChart
      width={800}
      height={256}
      data={processedData}
      margin={{ top: 32, right: 32, left: 32, bottom: 32 }}
    >
      {/* Line for price data */}
      <Line
        type="monotone"
        dataKey="price"
        stroke="#2563eb"
        strokeWidth={2}
        dot={false}
      />
      
      {/* Axes without ticks or labels */}
      <XAxis hide={true} />
      <YAxis hide={true} />
      
      {/* Event markers */}
      {processedData.map((point, index) => {
        return null;
      })}
    </LineChart>
  </div>
);
};

export function StockPriceChart({ data }) {
  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.event) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#2563eb"
          stroke="white"
          strokeWidth={2}
        />
      );
    }
    return null;
  }

  const formattedData = data.map(item => ({
    name: item.event || '',
    amt: item.price
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis data={formattedData} dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <ChartTooltip
          formatter={(value, name, props) => {
            if (props.payload.event) {
              return [`$${value}`, `${name} (${props.payload.event})`];
            }
            return [`$${value}`, name];
          }}
        />
        <Line
          data={formattedData}
          type="monotone"
          dataKey="amt"
          stroke="#2563eb"
          strokeWidth={10}
          dot={<CustomizedDot />}
        />
        {formattedData.map((data, index) => {
          if (data.name) {
            return (
              <ReferenceLine
                key={index}
                x={index}
                stroke="#2563eb"
                strokeDasharray="3 3"
              >
                <Label
                  value={data.name}
                  position="top"
                  fill="#2563eb"
                  fontSize={10}
                />
              </ReferenceLine>
            );
          }
          return null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function Results(resData, showGraph = false) {
  resData = resData.resData;

  if (resData.length == 0){
    return (<div>NO results found, Try searching without the use of location specifier.</div>)
  }

  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoverDataMap, setHoverDataMap] = useState({})
  const [loadingStates, setLoadingStates] = useState({})
  const hoverRef = useRef(null)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  // Function to add to favorites
  const addToFavorites = (offering) => {
    const favorites = Cookies.get('favorites') || [];
    if (!favorites.some(fav => fav.company === offering.company)) {
      favorites.push(offering);
      Cookies.set('favorites', favorites, { expires: 7 }); // Store for 7 days
    } else {
      alert(`${offering.company} is already in favorites.`);
    }
  };


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

    if (hoveredCard !== null) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [hoveredCard])

  const loadHoverData = async (index, company) => {
    if (!hoverDataMap[index] && !loadingStates[index]) {
      setLoadingStates(prev => ({ ...prev, [index]: true }))
      try {
        const res = await fetch(`http://localhost:3030/chart?q=${resData[0].query}&company=${company}`)
        const data = await res.json()
        setHoverDataMap(prev => ({ ...prev, [index]: data }))
        forceUpdate()
      } catch (error) {
        console.error('Error loading hover data:', error)
      }
      setLoadingStates(prev => ({ ...prev, [index]: false }))
    }
  }

  const renderHoverContent = (index) => {
    if (hoveredCard === index) {
      if (loadingStates[index]) {
        return <p>loading... the spinny thing stopped working :( </p>
      }

      const hoverData = hoverDataMap[index]
      if (!hoverData) return null

       return (
        <div 
          className="absolute z-10 bg-background border rounded-lg shadow-lg"
          style={{
            left: `${position.x - 160}px`,
            top: `${position.y - 30}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {hoverData.length > 0 ? (
            <TimelineChart data={hoverData} />
          ) : (
            <p>No data available</p>
          )}
        </div>
      )
    }
    return null
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
      handleScroll()
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
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 bg-white" ref={hoverRef}>
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
            <div 
              key={index} 
              className="flex-none w-72"
            >
              <button
                onClick={() => addToFavorites(offering)} // Add favorite button
                className="mt-2 text-yellow-500 hover:text-yellow-700"
                aria-label="Add to favorites"
              >♥</button>
              <div className="border rounded-lg shadow-md p-4 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{offering.company}</h3>
                <div className="mb-4">
                  {offering.pricies.map((value, index) => (
                    <p className="font-bold text-2xl text-primary" key={`prices-${index}`}>{value}</p>
                  ))}
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
          ))}
        </div>
      </div>
    </div>
  )
}