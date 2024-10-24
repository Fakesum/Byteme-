// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from "recharts"
// import { Card, CardContent } from "./components/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// // Sample data: stock prices over time with significant events
// const stockData = [
//   { day: 1, price: 100 },
//   { day: 2, price: 120 },
//   { day: 3, price: 115 },
//   { day: 4, price: 130 },
//   { day: 5, price: 145, event: "Product Launch" },
//   { day: 6, price: 160 },
//   { day: 7, price: 170 },
//   { day: 8, price: 155 },
//   { day: 9, price: 140, event: "CEO Resignation" },
//   { day: 10, price: 150 },
//   { day: 11, price: 165 },
//   { day: 12, price: 185, event: "Earnings Report" },
//   { day: 13, price: 190 },
//   { day: 14, price: 200 },
// ]

// function StockPriceChart() {
//   const CustomizedDot = (props) => {
//     const { cx, cy, payload } = props
//     if (payload.event) {
//       return (
//         <circle
//           cx={cx}
//           cy={cy}
//           r={4}
//           fill="hsl(var(--primary))"
//           stroke="white"
//           strokeWidth={2}
//         />
//       )
//     }
//     return null
//   }

//   return (
//     <ChartContainer
//       config={{
//         price: {
//           label: "Stock Price",
//           color: "hsl(var(--chart-1))",
//         },
//       }}
//       className="h-[250px] w-[350px]"
//     >
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" tick={{ fontSize: 10 }} />
//           <YAxis tick={{ fontSize: 10 }} />
//           <ChartTooltip
//             content={<ChartTooltipContent />}
//             formatter={(value, name, props) => {
//               if (props.payload.event) {
//                 return [`$${value}`, `${name} (${props.payload.event})`]
//               }
//               return [`$${value}`, name]
//             }}
//           />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="var(--color-price)"
//             strokeWidth={2}
//             dot={<CustomizedDot />}
//           />
//           {stockData.map((data, index) => {
//             if (data.event) {
//               return (
//                 <ReferenceLine
//                   key={index}
//                   x={data.day}
//                   stroke="hsl(var(--primary))"
//                   strokeDasharray="3 3"
//                 >
//                   <Label
//                     value={data.event}
//                     position="top"
//                     fill="hsl(var(--primary))"
//                     fontSize={10}
//                   />
//                 </ReferenceLine>
//               )
//             }
//             return null
//           })}
//         </LineChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }

// export default function Component() {
//   const [isHovering, setIsHovering] = useState(false)
//   const [position, setPosition] = useState({ x: 0, y: 0 })
//   const hoverRef = useRef(null)

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       if (hoverRef.current) {
//         const rect = hoverRef.current.getBoundingClientRect()
//         setPosition({
//           x: event.clientX - rect.left,
//           y: event.clientY - rect.top,
//         })
//       }
//     }

//     if (isHovering) {
//       window.addEventListener("mousemove", handleMouseMove)
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//     }
//   }, [isHovering])

//   return (
//     <Card className="w-[500px] h-[300px]">
//       <CardContent 
//         className="relative p-6 w-full h-full"
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         ref={hoverRef}
//       >
//         <div className="w-full h-full flex items-center justify-center bg-muted">
//           Hover anywhere in this area to see the stock price chart with event labels
//         </div>
//         {isHovering && (
//           <div 
//             className="absolute z-10 bg-background border rounded-lg shadow-lg"
//             style={{
//               left: `${position.x}px`,
//               top: `${position.y}px`,
//               transform: 'translate(-50%, -100%)',
//             }}
//           >
//             <StockPriceChart />
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }