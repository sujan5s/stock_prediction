import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw, Activity, Search, Clock, Minus, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import '../index.css';

const indianStocks = [
  { value: "RELIANCE.NS", label: "Reliance Industries" },
  { value: "TCS.NS", label: "Tata Consultancy" },
  { value: "HDFCBANK.NS", label: "HDFC Bank" },
  { value: "ICICIBANK.NS", label: "ICICI Bank" },
  { value: "INFY.NS", label: "Infosys" },
  { value: "SBIN.NS", label: "State Bank of India" },
  { value: "BHARTIARTL.NS", label: "Bharti Airtel" },
  { value: "ITC.NS", label: "ITC Limited" },
  { value: "HINDUNILVR.NS", label: "Hindustan Unilever" },
  { value: "LT.NS", label: "Larsen & Toubro" },
  { value: "BAJFINANCE", label: "Bajaj Finance" },
  { value: "AXISBANK", label: "Axis Bank" },
  { value: "HCLTECH", label: "HCL Technologies" },
  { value: "MARUTI", label: "Maruti Suzuki" },
  { value: "TATAMOTORS", label: "Tata Motors" },
  { value: "TATASTEEL.NS", label: "Tata Steel" },
  { value: "WIPRO.NS", label: "Wipro" },
  { value: "ONGC.NS", label: "Oil and Natural Gas" }
];

function SignalPage() {
  const [ticker, setTicker] = useState('RELIANCE.NS');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signalData, setSignalData] = useState(null);

  const fetchSignal = async (stock) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: stock }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch signal');
      setSignalData(data);
    } catch (err) {
      setError("Could not run signal analysis for this ticker. Please verify the symbol.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignal(ticker);
  }, [ticker]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) setTicker(searchValue.toUpperCase());
  };

  // Color logic for signals
  const getSignalColor = (sig) => {
    if (sig === 'BUY') return 'var(--secondary-green)';
    if (sig === 'SELL') return 'var(--error)';
    return 'var(--primary)';
  };

  const getSignalBg = (sig) => {
    if (sig === 'BUY') return 'rgba(0, 227, 139, 0.1)';
    if (sig === 'SELL') return 'rgba(255, 77, 77, 0.1)';
    return 'rgba(0, 229, 255, 0.1)';
  };

  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          
          {/* Header & Search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Target style={{ color: 'var(--primary)', width: '32px', height: '32px' }} />
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#fff' }}>
                Buy/Sell <span style={{ color: 'var(--primary)' }}>Intelligence</span>
              </h1>
            </div>
            
            <form onSubmit={handleSearch} style={{ position: 'relative', width: '320px' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '16px', display: 'flex', alignItems: 'center' }}>
                  <Search style={{ width: '20px', height: '20px', color: 'var(--on-surface-muted)' }} />
                </div>
                <input
                  list="signal-tickers"
                  type="text"
                  style={{
                    background: 'var(--surface-high)',
                    border: '1px solid var(--outline-variant)',
                    color: 'white',
                    borderRadius: '9999px',
                    width: '100%',
                    padding: '10px 16px 10px 48px',
                    outline: 'none',
                  }}
                  placeholder="e.g., RELIANCE.NS"
                  value={searchValue}
                  onFocus={() => setSearchValue('')}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <datalist id="signal-tickers">
                  {indianStocks.map(stock => <option key={stock.value} value={stock.value}>{stock.label}</option>)}
                </datalist>
              </form>
          </div>

          {error && (
            <div style={{ padding: '20px', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid var(--error)', borderRadius: '12px', color: 'var(--error)', textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ fontWeight: 600 }}>Analysis Failed</p>
              <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>{error}</p>
            </div>
          )}

          {/* Initial Loading State */}
          {!signalData && loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', opacity: 0.7 }}>
               <RefreshCw style={{ width: '48px', height: '48px', color: 'var(--primary)', animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
               <p style={{ color: 'var(--on-surface-muted)', fontSize: '1.125rem' }}>Running ML sequence and extracting signals...</p>
            </div>
          )}

          {/* Core Content */}
          {signalData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', opacity: loading ? 0.6 : 1, transition: 'opacity 0.3s' }}>
              
              {/* Present Stock Heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', background: 'var(--surface-highest)', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                 <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface-muted)' }}>
                   Current Target: <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>{ticker}</span>
                 </h2>
              </div>

              {/* Top Row: Main Signal & Confidence */}
              <div className="dashboard-grid">
                
                {/* 1. Signal Card */}
                <div className="glass dashboard-col" style={{ 
                  flex: 1, 
                  padding: '32px', 
                  borderRadius: '24px', 
                  border: `1px solid ${getSignalColor(signalData.signal)}`,
                  background: getSignalBg(signalData.signal),
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute', inset: 0, 
                    background: getSignalColor(signalData.signal),
                    filter: 'blur(100px)', opacity: 0.15, pointerEvents: 'none'
                  }} />

                  <h3 style={{ fontSize: '0.875rem', color: 'var(--on-surface-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', zIndex: 10 }}>
                    Action Required
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0', zIndex: 10 }}>
                    {signalData.signal === 'BUY' && <TrendingUp style={{ width: '48px', height: '48px', color: getSignalColor(signalData.signal) }} />}
                    {signalData.signal === 'SELL' && <TrendingDown style={{ width: '48px', height: '48px', color: getSignalColor(signalData.signal) }} />}
                    {signalData.signal === 'HOLD' && <Minus style={{ width: '48px', height: '48px', color: getSignalColor(signalData.signal) }} />}
                    
                    <h2 style={{ fontSize: '4rem', fontWeight: 900, color: getSignalColor(signalData.signal), lineHeight: 1 }}>
                      {signalData.signal}
                    </h2>
                  </div>
                  
                  <div style={{ textAlign: 'center', zIndex: 10 }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-muted)' }}>Expected Direction</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '8px', color: signalData.expectedMove.startsWith('+') ? 'var(--secondary-green)' : 'var(--error)' }}>
                      {signalData.expectedMove}
                    </p>
                  </div>
                </div>

                {/* 2. Confidence & AI Insight */}
                <div className="glass dashboard-col" style={{ flex: 2, padding: '24px', borderRadius: '24px', border: '1px solid var(--outline-variant)', justifyContent: 'space-between' }}>
                  <div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                       <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                         <Activity style={{ color: 'var(--primary)' }} /> Model Confidence
                       </h3>
                       <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                         {signalData.confidence.toFixed(1)}%
                       </span>
                     </div>
                     
                     <div style={{ width: '100%', background: 'var(--surface-highest)', borderRadius: '9999px', height: '12px', marginBottom: '24px', overflow: 'hidden' }}>
                       <div 
                         style={{ 
                           background: 'linear-gradient(to right, var(--primary), var(--primary-accent))', 
                           height: '100%', 
                           width: `${signalData.confidence}%`,
                           transition: 'width 1s ease-out',
                           position: 'relative'
                         }}>
                           <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.2)', animation: 'pulse 2s infinite' }}></div>
                       </div>
                     </div>
                  </div>
                  
                  <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', padding: '20px', borderRadius: '16px' }}>
                     <h4 style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Rationale</h4>
                     <p style={{ color: 'var(--on-surface)', fontSize: '1rem', lineHeight: 1.6 }}>"{signalData.aiInsight}"</p>
                  </div>
                </div>
              </div>

               {/* Middle Row: Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                 {[
                   { label: "RSI (14D)", value: signalData.metrics.rsi, color: 'var(--primary)' },
                   { label: "SMA (10D)", value: `₹${signalData.metrics.sma_10}`, color: '#fff' },
                   { label: "EMA (10D)", value: `₹${signalData.metrics.ema_10 || '-'}`, color: '#fff' },
                   { label: "Volatility", value: signalData.metrics.volatility, color: 'var(--error)' },
                   { label: "Volume", value: signalData.metrics.volume, color: '#fff' }
                 ].map((metric, i) => (
                   <div key={i} className="glass" style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--outline-variant)', textAlign: 'center' }}>
                     <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{metric.label}</p>
                     <p style={{ fontSize: '1.25rem', fontWeight: 700, color: metric.color }}>{metric.value}</p>
                   </div>
                 ))}
              </div>

              {/* Bottom Row: Chart & History */}
              <div className="dashboard-grid">
                
                {/* Chart Area */}
                <div className="glass dashboard-col" style={{ flex: 2, padding: '24px', borderRadius: '24px', border: '1px solid var(--outline-variant)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                    <TrendingUp style={{ color: 'var(--primary)' }} /> 60-Day Signal Trajectory
                  </h3>
                  <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={signalData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary-accent)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--primary-accent)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="var(--on-surface-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={30} />
                        <YAxis domain={['auto', 'auto']} stroke="var(--on-surface-muted)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--surface-highest)', borderColor: 'var(--outline-variant)', borderRadius: '8px', color: '#fff' }}
                          itemStyle={{ color: 'var(--primary-accent)' }}
                          labelStyle={{ color: 'var(--on-surface-muted)', marginBottom: '4px' }}
                          formatter={(value, name) => [name === 'price' ? `₹${value.toFixed(2)}` : value, name.charAt(0).toUpperCase() + name.slice(1)]}
                        />
                        <Area type="monotone" dataKey="price" stroke="var(--primary-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* History Table */}
                <div className="glass dashboard-col" style={{ flex: 1, padding: '24px', borderRadius: '24px', border: '1px solid var(--outline-variant)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                    <Clock style={{ color: 'var(--tertiary-container)' }} /> Recent Triggers
                  </h3>
                  
                  <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                    {signalData.historyTable && signalData.historyTable.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {signalData.historyTable.map((item, idx) => (
                          <div key={idx} style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', 
                            borderRadius: '12px', background: 'var(--surface-highest)', border: '1px solid var(--outline-variant)' 
                          }}>
                            <div>
                               <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--on-surface)' }}>{item.date}</p>
                               <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-muted)', marginTop: '4px' }}>₹{item.price.toFixed(2)}</p>
                            </div>
                            <span style={{ 
                               padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px',
                               background: getSignalBg(item.signal), color: getSignalColor(item.signal), border: `1px solid ${getSignalColor(item.signal)}`
                            }}>
                              {item.signal}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-muted)', gap: '8px' }}>
                        <Clock style={{ width: '32px', height: '32px', opacity: 0.5 }} />
                        <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>No distinct Buy/Sell triggers in recent history.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Empty State / Loading */}
          {!signalData && !loading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--on-surface-muted)', marginTop: '40px' }}>
               <Target style={{ width: '64px', height: '64px', opacity: 0.5, marginBottom: '16px' }} />
               <p style={{ fontSize: '1.125rem' }}>Enter a stock ticker above to run sequence analysis.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default SignalPage;
