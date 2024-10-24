import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PricePage from './price-page'
import MeritPage from './merits'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/price-page" element={<PricePage />} />
      <Route path="/merits" element={<MeritPage/>} />
    </Routes>
  </Router>
)
