import { BarChart2 } from 'lucide-react'

export default () => (
    <header className="bg-white shadow-md w-full">
      <div className="mx-auto px-4 sm:px-8 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900"></span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="/price-page" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Prices
            </a>
            <a href="/merits" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Product Merit Search
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
)