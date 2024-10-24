import React from 'react'
import { Star, TrendingUp, PieChart, AlertTriangle, BarChart2, DollarSign } from 'lucide-react'
import { Progress } from "./progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"

const ProductAnalysisCard = ({ data }) => {
  const {
    merit_score,
    max_merit_score,
    past,
    current,
    future,
    desc,
    exists,
    risks
  } = data

  const meritPercentage = (merit_score / max_merit_score) * 100

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Product Merit Analysis
          <Badge variant={exists ? "default" : "secondary"}>
            {exists ? "Existing Product" : "Product Idea"}
          </Badge>
        </CardTitle>
        <CardDescription>Comprehensive market and financial analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Merit Score</h3>
              <div className="flex items-center gap-2">
                <Progress value={meritPercentage} className="w-full" />
                <span className={`font-bold ${getScoreColor(meritPercentage)}`}>
                  {merit_score}/{max_merit_score}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">Past Prospect: </span>
                  <span className="ml-2 font-semibold">{past}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Current Prospect: </span>
                  <span className="ml-2 font-semibold">{current}</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-gray-700">Future Prospect: </span>
                  <span className={`ml-2 font-semibold`}>
                    {future}  
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Potential Risks</h3>
              <ul className="list-disc list-inside space-y-1">
                {risks.map((risk, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{desc}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Component(data) {
    data = data.data;
  const productData = {
    merit_score: data.merit_score,
    max_merit_score: data.max_merit_score,
    past: data.past,
    current: data.current,
    future: data.future,
    desc: data.desc,
    exists: data.exists,
    risks: data.risks
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <ProductAnalysisCard data={productData} />
    </div>
  )
}