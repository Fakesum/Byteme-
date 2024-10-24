import React, { useEffect, useReducer, useState } from 'react'
import { Card, CardContent } from "./components/card"
import LoadingBar from './components/loading'
import ProductAnalysisCard from './components/productAnalysis'
import Headers from './header'
import Footer from './footer'

export default function Component() {
    const [loading, setLoading] = useState(0)
    const [loadingAnimation, setLoadingAnimation] = useState(0)
    const [result, setResult] = useState(null)
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingAnimation(prev => prev + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    function search(query) {
        setLoading(1)
        fetch(`http://localhost:3030/merits?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(res => {
                setResult(res)
                setLoading(0)
                forceUpdate()
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                setLoading(0)
            })
    }

    function loadingComponent() {
        if (loading !== 0) {
            return <LoadingBar progress={loadingAnimation} max={120} />
        }
        return result ? <ProductAnalysisCard data={result} /> : null
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Headers />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <h1 className="text-2xl font-bold text-center mb-4">Universal Automatic Product and Service Merit Analysis System</h1>
                        <p className="text-center text-muted-foreground mb-6">
                            Enter a product or service name to analyze its merits and receive an instant evaluation.
                        </p>
                        <div className="flex justify-center">
                            <input 
                                className="max-w-md"
                                placeholder="Enter product or service name"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        search(e.currentTarget.value)
                                    }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                {loadingComponent()}
            </main>
            <Footer />
        </div>
    )
}