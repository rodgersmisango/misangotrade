'use client';

import { useMemo, useState } from 'react';

export default function DerivFormatPage() {
  const [account, setAccount] = useState<'demo' | 'real'>('demo');
  const [showTradeTypes, setShowTradeTypes] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState('Accumulators');

  const chartPoints = useMemo(() => {
    const values = [
      1010, 1030, 1045, 1038, 1015, 1005, 990, 975, 990, 1035, 1100, 1080, 1040, 1115,
      1180, 1165, 1208, 1241, 1225, 1210, 1198, 1220, 1244, 1248, 1245, 1238, 1241,
    ];

    const width = 980;
    const height = 420;
    const min = Math.min(...values) - 30;
    const max = Math.max(...values) + 30;

    const points = values
      .map((value, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((value - min) / (max - min || 1)) * (height - 20) - 10;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const area = `${points} L ${width} ${height} L 0 ${height} Z`;
    return { points, area, min, max };
  }, []);

  const tradeCategories = [
    { title: 'Accumulators', selected: true },
    { title: 'Vanillas', items: ['Call/Put'] },
    { title: 'Turbos', items: ['Turbos'] },
    { title: 'Digits', items: ['Matches/Differs', 'Even/Odd', 'Over/Under'] },
    { title: 'Ups & Downs', items: ['Rise/Fall', 'Higher/Lower'] },
    { title: 'Touch & No Touch', items: ['Touch', 'No Touch'] },
    { title: 'Multipliers', items: ['Multipliers'] },
  ];

  return (
    <>
      <main className="deriv-shell">
        <div className="phone-frame">
          <header className="top-statusbar">
            <div className="time">01:41</div>
            <div className="status-icons">
              <span>◔</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </header>

          <div className="address-bar">
            <div className="address-left">
              <span className="home-icon">⌂</span>
              <span className="site-dot" />
              <span className="url-text">moneytrades.site/?account={account}</span>
            </div>
            <div className="address-actions">
              <button className="add-btn">＋</button>
              <span className="badge">3</span>
              <button className="menu-btn">⋮</button>
            </div>
          </div>

          <div className="toolbar">
            <div className="toolbar-left">
              <button className="icon-btn">☰</button>
              <button className="icon-btn small">⇄</button>
              <button className="icon-btn small">↻</button>
            </div>

            <div className="balance-box">
              <span className="coin">₿</span>
              <span className="balance-value">7,390.25 USD</span>
              <span className="caret">⌄</span>
            </div>
          </div>

          <nav className="market-tabs">
            {['Bulk Trader', 'Dashboard', 'Bot Builder', 'Free Bots', 'D-Trader', 'Analysis To...'].map((label, index) => (
              <button
                key={label}
                className={label === 'D-Trader' ? 'tab active' : 'tab'}
                onClick={() => {
                  if (label === 'D-Trader') setShowTradeTypes(true);
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          <section className="market-card">
            <div className="market-head">
              <div className="market-left">
                <span className="volume-pill">100</span>
                <div className="market-name">Volatility 100 (1s) Index</div>
              </div>
              <div className="market-price">
                <span className="price-value">1241.37</span>
                <span className="price-change">- 0.31 (0.02%)</span>
              </div>
            </div>

            <div className="chart-wrap">
              <svg viewBox="0 0 980 420" preserveAspectRatio="none" aria-label="Market chart">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(80,80,80,0.25)" />
                    <stop offset="100%" stopColor="rgba(80,80,80,0.02)" />
                  </linearGradient>
                </defs>

                {[...Array(8)].map((_, index) => (
                  <line
                    key={`h-${index}`}
                    x1="0"
                    x2="980"
                    y1={20 + index * 48}
                    y2={20 + index * 48}
                    stroke="rgba(0,0,0,0.08)"
                  />
                ))}

                {[...Array(10)].map((_, index) => (
                  <line
                    key={`v-${index}`}
                    x1={index * 98}
                    x2={index * 98}
                    y1="0"
                    y2="420"
                    stroke="rgba(0,0,0,0.04)"
                  />
                ))}

                <path d={chartPoints.area} fill="url(#chartFill)" />
                <path d={chartPoints.points} fill="none" stroke="#4c4c4c" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

                <line
                  x1="0"
                  x2="980"
                  y1="210"
                  y2="210"
                  stroke="rgba(0,0,0,0.35)"
                  strokeDasharray="6 8"
                />

                <circle cx="680" cy="228" r="8" fill="#222" stroke="#eee" strokeWidth="2" />
              </svg>
            </div>
          </section>

          <div className="trade-form-card">
            <div className="trade-row">
              <div className="type-pill">Accumulators</div>
              <button className="trade-help" onClick={() => setShowTradeTypes(true)}>
                {'>'}
              </button>
            </div>

            <div className="trade-inputs">
              <div className="input-block">
                <span>0.35</span>
                <label>USD</label>
              </div>
              <div className="input-block right">
                <span className="math-plus">＋</span>
                <label>Stake</label>
              </div>
            </div>

            <div className="take-profit-row">
              <div className="checkbox-wrap">
                <input type="checkbox" checked readOnly />
                <span>Take profit</span>
              </div>
              <div className="input-block mini">
                <span>0.02</span>
                <label>USD</label>
              </div>
            </div>

            <div className="risk-banner">
              <span className="warning-icon">⚠</span>
              <span>Risk Disclaimer</span>
            </div>

            <div className="risk-meta">
              <div>
                <span className="meta-label">Max. payout</span>
                <span className="meta-value">0.00 USD</span>
              </div>
              <div>
                <span className="meta-label">Max. ticks</span>
                <span className="meta-value">0 ticks</span>
              </div>
            </div>

            <div className="alert-strip">
              <span>Please enter a stake amount that's at least 1.00.</span>
              <div className="ai-bubble">AI</div>
            </div>
          </div>
        </div>

        {showTradeTypes && (
          <aside className="trade-panel">
            <div className="panel-header">
              <h3>Trade types</h3>
              <button className="close-btn" onClick={() => setShowTradeTypes(false)}>
                ×
              </button>
            </div>

            <div className="panel-list">
              <div className="panel-link">Learn more about trade types</div>

              <div className="panel-section-title">Accumulators</div>

              {tradeCategories.slice(1).map((group) => (
                <div key={group.title} className="category-group">
                  <h4>{group.title}</h4>
                  {group.items?.map((item) => (
                    <button
                      key={item}
                      className={selectedTrade === item ? 'category-option selected' : 'category-option'}
                      onClick={() => {
                        setSelectedTrade(item);
                        setShowTradeTypes(false);
                      }}
                    >
                      <span className="option-icon">↗</span>
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          min-height: 100%;
          background: #1d242f;
          font-family: Inter, Arial, sans-serif;
        }

        body {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button {
          font: inherit;
        }

        .deriv-shell {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #0d1016 0%, #1d242f 100%);
          padding: 24px;
        }

        .phone-frame {
          position: relative;
          width: 100%;
          max-width: 430px;
          min-height: 880px;
          background: #ebebeb;
          border-radius: 28px 28px 0 0;
          box-shadow: 0 36px 44px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .top-statusbar {
          background: #1d1e25;
          color: #f4f7fb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px 12px;
          font-size: 16px;
          font-weight: 700;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
        }

        .address-bar {
          background: #171b25;
          color: #eaf5ff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 14px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .address-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #dfe8f3;
          font-size: 12px;
        }

        .site-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d4dbe4;
          display: inline-block;
        }

        .home-icon {
          font-size: 18px;
          color: #dfe8f3;
        }

        .address-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-btn,
        .menu-btn {
          border: none;
          background: transparent;
          color: #e9eff9;
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 0 5px;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f3f3f7;
          padding: 10px 14px;
          gap: 12px;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-btn {
          border: none;
          background: transparent;
          color: #2a2c32;
          font-size: 22px;
          cursor: pointer;
        }

        .icon-btn.small {
          font-size: 18px;
        }

        .balance-box {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          border-radius: 24px;
          background: #f5f6f8;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
          color: #071f3c;
          font-weight: 800;
        }

        .coin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0e1d2e;
          color: #fff;
          font-size: 11px;
        }

        .balance-value {
          font-size: 14px;
        }

        .caret {
          font-size: 18px;
          line-height: 1;
          margin-top: -6px;
        }

        .market-tabs {
          display: flex;
          padding: 10px 12px 0;
          gap: 8px;
          background: #1d2b49;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .market-tabs::-webkit-scrollbar {
          display: none;
        }

        .tab {
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.75);
          padding: 10px 12px;
          font-size: 11px;
          white-space: nowrap;
          cursor: pointer;
          border-radius: 10px 10px 0 0;
        }

        .tab.active {
          background: #ff8d2b;
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .market-card {
          padding: 12px 14px 0;
          background: #f3f3f5;
        }

        .market-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: rgba(255,255,255,0.4);
          border: 1px solid rgba(28,35,50,0.12);
          border-radius: 10px;
          padding: 12px 14px;
        }

        .market-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .volume-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: #f5c7c7;
          color: #2a2c32;
          font-size: 11px;
          font-weight: 800;
        }

        .market-name {
          font-size: 15px;
          font-weight: 800;
          color: #0d1622;
          white-space: nowrap;
        }

        .market-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          white-space: nowrap;
        }

        .price-value {
          font-size: 17px;
          font-weight: 900;
          color: #0d1622;
        }

        .price-change {
          color: #dc2626;
          font-size: 12px;
          font-weight: 700;
        }

        .chart-wrap {
          width: 100%;
          height: 330px;
          margin-top: 8px;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.28);
          overflow: hidden;
        }

        .chart-wrap svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .trade-form-card {
          background: #f3f3f5;
          padding: 10px 16px 18px;
          min-height: 300px;
        }

        .trade-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
        }

        .type-pill {
          font-size: 14px;
          font-weight: 800;
          color: #111827;
        }

        .trade-help {
          border: none;
          background: transparent;
          font-size: 24px;
          color: #3d4959;
          cursor: pointer;
        }

        .trade-inputs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding-bottom: 8px;
        }

        .input-block {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          color: #111827;
        }

        .input-block span {
          font-size: 16px;
        }

        .input-block label {
          color: #6b7280;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .input-block.right {
          margin-left: auto;
          color: #0f172a;
        }

        .math-plus {
          font-size: 20px;
          color: #1f2937;
        }

        .take-profit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #111827;
          font-weight: 700;
        }

        .checkbox-wrap input {
          accent-color: #ef4444;
          width: 18px;
          height: 18px;
        }

        .input-block.mini {
          gap: 10px;
        }

        .risk-banner {
          margin-top: 20px;
          background: #f7d94a;
          color: #171b25;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          font-weight: 800;
        }

        .warning-icon {
          font-size: 17px;
        }

        .risk-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          color: #18212c;
          font-size: 12px;
        }

        .risk-meta > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          color: #525d68;
          font-weight: 700;
        }

        .meta-value {
          color: #111827;
          font-weight: 700;
          font-size: 14px;
        }

        .alert-strip {
          position: relative;
          margin-top: 20px;
          background: #e94646;
          color: #fff;
          border-radius: 16px 16px 20px 16px;
          padding: 16px 18px 16px 14px;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .ai-bubble {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c084fc, #7c3aed);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.5);
          flex-shrink: 0;
          margin-left: auto;
        }

        .trade-panel {
          position: absolute;
          right: 0;
          top: 0;
          width: min(100%, 480px);
          height: 100%;
          background: rgba(241, 245, 249, 0.98);
          box-shadow: -10px 0 24px rgba(15, 23, 42, 0.2);
          z-index: 20;
          padding: 18px 18px 20px;
          overflow-y: auto;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .panel-header h3 {
          margin: 0;
          color: #0f172a;
          font-size: 20px;
        }

        .close-btn {
          border: none;
          background: transparent;
          font-size: 38px;
          color: #334155;
          line-height: 1;
          cursor: pointer;
        }

        .panel-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          color: #0f172a;
          font-weight: 700;
        }

        .panel-section-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          background: rgba(148,163,184,0.12);
          padding: 12px 10px;
          border-radius: 12px;
        }

        .category-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .category-group h4 {
          margin: 0;
          color: #0f172a;
          font-size: 15px;
          font-weight: 800;
        }

        .category-option {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          padding: 12px 10px;
          cursor: pointer;
          color: #0f172a;
          font-size: 15px;
          font-weight: 700;
          text-align: left;
          transition: all 0.15s ease;
        }

        .category-option.selected {
          border-color: rgba(59,130,246,0.2);
          background: rgba(59,130,246,0.06);
        }

        .option-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 8px;
          background: rgba(148,163,184,0.12);
          color: #1f2937;
          font-size: 18px;
        }

        @media (max-width: 480px) {
          .deriv-shell {
            padding: 0;
          }

          .phone-frame {
            border-radius: 0;
            max-width: 100%;
            min-height: 100vh;
          }
        }
      `}</style>
    </>
  );
}
