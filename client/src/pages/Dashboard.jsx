import React from 'react'
import '../index.css' // Import from parent directory
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import HeroSection from '../components/HeroSection'
import PredictionPanel from '../components/PredictionPanel'
import StockChart from '../components/StockChart'
import HistoricalTable from '../components/HistoricalTable'
import AIInsights from '../components/AIInsights'
import TechnicalHealth from '../components/TechnicalHealth'

export default function Dashboard() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="app-main">
          <HeroSection />

          <div className="dashboard-grid">
            <div className="dashboard-col">
              <PredictionPanel />
              <StockChart />
              <HistoricalTable />
            </div>
            <div className="dashboard-col">
              <AIInsights />
              <TechnicalHealth />
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
