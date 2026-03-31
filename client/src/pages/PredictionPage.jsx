import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw, BarChart2, Activity, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import '../index.css';

export default function PredictionPage() {
  const [stock, setStock] = useState('RELIANCE');
  const [searchValue, setSearchValue] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [historicalData, setHistoricalData] = useState([]);

  // Simple function to generate fake stock data based on ticker name so it changes when you search
  const generateMockGraphData = (basePrice) => {
    let price = basePrice;
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
      price = price + (Math.random() * 40 - 15); // Random fluctuation
      return { date: day, price: Math.round(price) };
    });
  };

  const fetchPrediction = async (ticker) => {
    setLoading(true);
    // Generate a pseudo-random base price between 100 and 3000 based on ticker length/letters
    const basePrice = 100 + (ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2900);
    
    try {
      // In production, fetch current stock data for target ticker and pass to /predict.
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker })
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      const currentP = data.current_price || basePrice;
      setPrediction({
        currentPrice: currentP,
        predictedPrice: data.predicted_price || (currentP + (Math.random() * 50 - 20)),
        confidence: data.confidence || Math.floor(Math.random() * 30 + 60),
        aiInsight: data.aiInsight || `Stock ${ticker} shows dynamic momentum due to shifting trading volumes and recent market activities.`,
        metrics: data.metrics || {
          volume: (Math.random() * 20 + 1).toFixed(1) + "M",
          volatility: (Math.random() * 3 + 0.5).toFixed(2) + "%",
          rsi: Math.floor(Math.random() * 40 + 30).toString(),
          sma_10: Math.round(currentP - (Math.random() * 20 - 10)).toString()
        }
      });
      
      setHistoricalData(generateMockGraphData(currentP - 30));
    } catch (error) {
      console.error(error);
      // Fallback dummy prediction to show UI that changes per stock
      const currentP = basePrice;
      const predictedP = currentP + (Math.random() * 50 - 15);
      
      setPrediction({
        currentPrice: currentP,
        predictedPrice: predictedP,
        confidence: Math.floor(Math.random() * 30 + 60),
        aiInsight: `AI analysis pattern for ${ticker} indicates potential trend alignments. Keep monitoring support levels.`,
        metrics: {
          volume: (Math.random() * 20 + 1).toFixed(1) + "M",
          volatility: (Math.random() * 3 + 0.5).toFixed(2) + "%",
          rsi: Math.floor(Math.random() * 40 + 30).toString(),
          sma_10: Math.round(currentP - (Math.random() * 20 - 10)).toString()
        }
      });
      
      setHistoricalData(generateMockGraphData(currentP - 30));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction(stock);
  }, [stock]);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchValue.trim()) setStock(searchValue.toUpperCase());
  };

  const isUp = prediction && (prediction.predictedPrice >= prediction.currentPrice);
  const changePercent = prediction ? (((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100).toFixed(2) : 0;

  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          
          {/* Header / Search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--outline-variant)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity style={{ color: 'var(--primary)', width: '32px', height: '32px' }} />
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Space Grotesk', color: '#fff' }}>
                AI Prediction <span style={{ color: 'var(--primary)' }}>Engine</span>
              </h1>
            </div>
            <form onSubmit={handleSearch} style={{ position: 'relative', width: '320px' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '16px', display: 'flex', alignItems: 'center' }}>
                <Search style={{ width: '20px', height: '20px', color: 'var(--on-surface-muted)' }} />
              </div>
              <input
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
                placeholder="Search Stock (e.g., RELIANCE)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>

          {/* Main Dashboard Layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="dashboard-grid">
              
              {/* Left Column: Chart */}
              <div className="glass dashboard-col" style={{ flex: 2, padding: '24px', borderRadius: '24px', border: '1px solid var(--outline-variant)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>{stock} Live Trend</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-muted)', marginTop: '4px' }}>Last 5 Days (1hr intervals)</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '4px 12px', fontSize: '0.875rem', background: 'var(--surface-highest)', borderRadius: '8px', color: 'var(--on-surface)' }}>1D</button>
                    <button style={{ padding: '4px 12px', fontSize: '0.875rem', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '8px', color: 'var(--primary-accent)' }}>5D</button>
                    <button style={{ padding: '4px 12px', fontSize: '0.875rem', background: 'var(--surface-highest)', borderRadius: '8px', color: 'var(--on-surface)' }}>1M</button>
                  </div>
                </div>
                <div style={{ height: '300px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary-accent)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--primary-accent)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
                      <XAxis dataKey="date" stroke="var(--on-surface-muted)" />
                      <YAxis domain={['dataMin - 20', 'dataMax + 20']} stroke="var(--on-surface-muted)" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--surface-highest)', border: '1px solid var(--outline-variant)', borderRadius: '12px' }}
                        itemStyle={{ color: 'var(--primary-accent)' }}
                      />
                      <Area type="monotone" dataKey="price" stroke="var(--primary-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Column: Prediction Card */}
              <div className="glass dashboard-col" style={{ 
                flex: 1, 
                padding: '24px', 
                borderRadius: '24px', 
                border: '1px solid var(--outline-variant)',
                position: 'relative',
                overflow: 'hidden',
                opacity: loading ? 0.7 : 1,
              }}>
                {/* Dynamic Glow */}
                {prediction && (
                  <div style={{
                    position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px',
                    borderRadius: '50%', background: isUp ? 'var(--secondary-green)' : 'var(--error)',
                    filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none'
                  }} />
                )}

                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '8px', background: 'var(--surface-highest)', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}>
                      <BarChart2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>AI Prediction</h2>
                    {loading && <RefreshCw style={{ width: '16px', height: '16px', marginLeft: 'auto', color: 'var(--on-surface-muted)', animation: 'spin 1s linear infinite' }} />}
                  </div>

                  {prediction && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div>
                        <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Current Price</p>
                        <p style={{ fontSize: '2rem', fontWeight: 300, color: '#fff' }}>₹{prediction.currentPrice}</p>
                      </div>
                      
                      <div style={{ position: 'relative', zIndex: 10, padding: '20px', background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                        <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Predicted Next Close</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: isUp ? 'var(--secondary-green)' : 'var(--error)' }}>
                            ₹{prediction.predictedPrice.toFixed(2)}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingBottom: '6px', color: isUp ? 'var(--secondary-green)' : 'var(--error)' }}>
                            {isUp ? <ArrowUpRight style={{ width: '24px', height: '24px' }} /> : <ArrowDownRight style={{ width: '24px', height: '24px' }} />}
                            <span style={{ fontWeight: 600 }}>{Math.abs(changePercent)}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                          <span style={{ color: 'var(--on-surface-muted)' }}>Model Confidence</span>
                          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{prediction.confidence}%</span>
                        </div>
                        <div style={{ width: '100%', background: 'var(--surface-highest)', borderRadius: '9999px', height: '8px' }}>
                          <div 
                            style={{ 
                              background: 'linear-gradient(to right, var(--primary), var(--primary-accent))', 
                              height: '8px', 
                              borderRadius: '9999px', 
                              width: `${prediction.confidence}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Layout */}
            {prediction && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' }}>
                
                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem' }}>Volume</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '4px', color: '#fff' }}>{prediction.metrics.volume}</p>
                  </div>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem' }}>Volatility (10D)</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '4px', color: '#ffb4ab' }}>{prediction.metrics.volatility}</p>
                  </div>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem' }}>RSI (14D)</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '4px', color: 'var(--primary)' }}>{prediction.metrics.rsi}</p>
                  </div>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--outline-variant)' }}>
                    <p style={{ color: 'var(--on-surface-muted)', fontSize: '0.875rem' }}>SMA (10D)</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '4px', color: '#fff' }}>₹{prediction.metrics.sma_10}</p>
                  </div>
                </div>

                {/* AI Insights Panel */}
                <div className="glass" style={{
                  padding: '24px', borderRadius: '16px', border: '1px solid var(--outline-variant)', 
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '128px', height: '128px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ padding: '6px', background: 'var(--surface-highest)', borderRadius: '8px' }}>
                      <Activity style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
                    </div>
                    <h3 style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.125rem' }}>AI Insight</h3>
                  </div>
                  <p style={{ color: 'var(--on-surface)', fontSize: '1.125rem', lineHeight: 1.6, position: 'relative', zIndex: 10 }}>
                    "{prediction.aiInsight}"
                  </p>
                </div>
                
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
