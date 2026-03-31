import React from 'react'

export default function PredictionPanel() {
  return (
    <div
      className="glass"
      style={{
        border: '1px solid rgba(0,229,255,0.2)',
        borderRadius: '12px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background rocket icon */}
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px' }}>
        <span
          className="material-symbols-outlined"
          style={{ color: '#00e5ff', fontSize: '64px', opacity: 0.1 }}
        >
          rocket_launch
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
        <div>
          <h3
            style={{
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '4px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: '#bac9cc',
            }}
          >
            Reliance Industries (RELIANCE) Forecast
          </h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.75rem)',
                fontWeight: 900,
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'white',
              }}
            >
              ₹3,142.50
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: 700,
                gap: '4px',
                color: '#00e38b',
                background: 'rgba(0,227,139,0.1)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                trending_up
              </span>
              <span>+4.2%</span>
            </div>
          </div>
          <p style={{ fontSize: '14px', marginTop: '12px', color: '#bac9cc' }}>
            Next Day Predicted Close Price
          </p>
        </div>

        {/* Confidence Score Ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '8px',
              color: '#bac9cc',
            }}
          >
            Confidence Score
          </span>
          <div style={{ position: 'relative', width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle
                cx="64" cy="64" r="58"
                fill="transparent"
                stroke="#313540"
                strokeWidth="8"
              />
              <circle
                cx="64" cy="64" r="58"
                fill="transparent"
                stroke="#00e5ff"
                strokeWidth="8"
                strokeDasharray="364.4"
                strokeDashoffset="21.8"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' }}
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                fontSize: '1.5rem',
                fontWeight: 900,
                fontFamily: 'Space Grotesk, sans-serif',
                color: '#00e5ff',
              }}
            >
              94%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
