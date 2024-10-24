import { Button } from "./components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card"
import { Check, X } from "lucide-react"
import Header from './header'
import Footer from "./footer"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>For casual users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">₹0 <span className="text-base font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>20 price comparisons per month</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">Automatic market analysis</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">Unlimited price comparisons</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
            Recommended
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>For serious entrepreneurs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">₹739 <span className="text-base font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited price comparisons</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Automatic market analysis</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade to Pro</Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>For large teams and organizations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">Custom <span className="text-base font-normal text-muted-foreground">pricing</span></p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>All Pro features</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Bulk licensing</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Custom integrations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  )
}