'use client';

import { useState, type FormEvent } from 'react';
import {
  Plus, ArrowLeftRight, Minus, RefreshCw,
  TrendingUp, TrendingDown,
  BarChart2, Sparkles, X, Send, Home, Activity, Repeat, Briefcase,
} from 'lucide-react';

type Tab = 'home' | 'cfds' | 'exchange' | 'options' | 'portfolio';
type AccountType = 'Demo' | 'Real';
type ChatMessage = { sender: 'ai' | 'user'; text: string };

// Markets Data
const syntheticMarkets = [
  { name: 'Volatility 100 (1s) Index', badge: '100', code: '1s', price: '1,395.32', change: '+0.11% (5m)', positive: true },
  { name: 'Volatility 75 (1s) Index', badge: '75', code: '1s', price: '4,644.89', change: '+0.08% (5m)', positive: true },
  { name: 'Volatility 10 (1s) Index', badge: '10', code: '1s', price: '9,447.42', change: '-0.05% (5m)', positive: false },
  { name: 'Volatility 25 (1s) Index', badge: '25', code: '1s', price: '857,603.85', change: '+0.04% (5m)', positive: true },
];

const cryptoMarkets = [
  { pair: 'DOGE/USDT', volume: 'Vol 804.09M', price: '0.08231', change: '+2.34%', positive: true },
  { pair: 'ADA/USDT', volume: 'Vol 58.32M', price: '0.2312', change: '+3.86%', positive: true },
  { pair: 'TRX/USDT', volume: 'Vol 55.32M', price: '0.3353', change: '+0.90%', positive: true },
  { pair: 'DOGE/BTC', volume: 'Vol 49.52M', price: '0.00000100', change: '+2.04%', positive: true },
  { pair: 'XRP/USDT', volume: 'Vol 43.17M', price: '1.3418', change: '+1.94%', positive: true },
];

const navItems: { tab: Tab; label: string; Icon: typeof Home }[] = [
  { tab: 'home', label: 'Home', Icon: Home },
  { tab: 'cfds', label: 'CFDs', Icon: BarChart2 },
  { tab: 'exchange', label: 'Exchange', Icon: Repeat },
  { tab: 'options', label: 'Options', Icon: Activity },
  { tab: 'portfolio', label: 'Portfolio', Icon: Briefcase },
];

export default function MisangoTrader() {
  // Navigation & AI State
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [accountType, setAccountType] = useState<AccountType>('Demo');
  const [balance, setBalance] = useState(10007.2);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Hello Bramwell! Welcome to Misango Trader (@misango). How can I assist your trading today?' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Exchange Tab State
  const [tradeAmount, setTradeAmount] = useState('');

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputMsg.trim();
    if (!text) return;

    setAiMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputMsg('');

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Regarding "${text}": Volatility market feeds on @misango are running with normal latency.` },
      ]);
    }, 800);
  };

  return (
    // Own scroll container: the root layout locks body scrolling on mobile.
    <div className="w-full bg-[#0e1117] max-lg:h-dvh max-lg:overflow-y-auto lg:min-h-screen">
      <div className="bg-[#0e1117] min-h-screen text-white font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden pb-20">

        {/* GLOBAL TOP BAR */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800 bg-[#0e1117]/90 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider text-white">MISANGO <span className="text-[#ff444f]">TRADER</span></span>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">@misango</span>
          </div>

          {/* AI Drawer Launcher */}
          <button
            onClick={() => setIsAiOpen(true)}
            className="bg-indigo-900/30 border border-indigo-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-indigo-300 hover:border-indigo-400 transition">
            <Sparkles size={12} className="text-indigo-400 animate-pulse" />
            <span>Ask Amy</span>
          </button>
        </div>

        {/* ACCOUNT & BALANCE HEADER */}
        <div className="p-5 text-center border-b border-gray-800 bg-[#161b22]">
          <div className="flex justify-center mb-3">
            <div className="bg-[#0e1117] p-1 rounded-full flex gap-1 border border-gray-800">
              <button
                onClick={() => setAccountType('Real')}
                className={`px-4 py-1 text-xs rounded-full transition ${accountType === 'Real' ? 'bg-[#ff444f] text-white font-bold' : 'text-gray-400'}`}>
                Real
              </button>
              <button
                onClick={() => setAccountType('Demo')}
                className={`px-4 py-1 text-xs rounded-full transition ${accountType === 'Demo' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400'}`}>
                Demo
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-1">Total Trading Balance ({accountType})</p>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</h1>
            <button onClick={() => setBalance(10000)} aria-label="Reset balance" className="text-gray-400 hover:text-white transition">
              <RefreshCw size={15} />
            </button>
          </div>

          {/* Quick Wallet Actions */}
          <div className="flex justify-center gap-6 mt-5">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-[#ff444f] group-hover:bg-[#e03b45] rounded-full flex items-center justify-center font-bold text-white shadow-lg transition">
                <Plus size={18} />
              </div>
              <span className="text-[11px] text-gray-300">Deposit</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gray-800 border border-gray-700 group-hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition">
                <ArrowLeftRight size={16} />
              </div>
              <span className="text-[11px] text-gray-300">Transfer</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gray-800 border border-gray-700 group-hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition">
                <Minus size={16} />
              </div>
              <span className="text-[11px] text-gray-300">Withdraw</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC SCREEN VIEWS */}
        <div className="p-4">

          {/* VIEW 1: HOME / DEPOSIT METHODS */}
          {activeTab === 'home' && (
            <div>
              <h3 className="font-semibold text-sm mb-1">Make your deposit</h3>
              <p className="text-xs text-gray-400 mb-4">Deposit instantly in local currency or crypto.</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800 flex flex-col justify-between h-28 hover:border-gray-700 transition cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">₮</div>
                  <span className="font-bold text-xs">USDT</span>
                </div>

                <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800 flex flex-col justify-between h-28 hover:border-gray-700 transition cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">$</div>
                  <span className="font-bold text-xs">USDC</span>
                </div>

                <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800 flex flex-col justify-between h-28 hover:border-gray-700 transition cursor-pointer">
                  <div className="w-7 h-7 rounded bg-green-600 text-white flex items-center justify-center font-bold text-[9px]">M-PESA</div>
                  <div>
                    <span className="font-bold text-xs block">MPESA</span>
                    <span className="text-[9px] bg-gray-800 px-1 py-0.5 rounded text-gray-400">Instant</span>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-sm mb-3">Explore Markets</h3>
              <div className="space-y-3">
                {syntheticMarkets.slice(0, 2).map((m) => (
                  <div key={m.name} className="bg-[#161b22] border border-gray-800 p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs block">{m.name}</span>
                      <span className="text-sm font-semibold text-gray-200">{m.price}</span>
                    </div>
                    <span className={`text-xs font-semibold ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {m.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 2: OPTIONS & SYNTHETIC INDICES */}
          {(activeTab === 'cfds' || activeTab === 'options') && (
            <div>
              <h3 className="font-bold text-sm mb-3">Synthetic Indices ({activeTab.toUpperCase()})</h3>
              <div className="grid grid-cols-2 gap-3">
                {syntheticMarkets.map((market) => (
                  <div key={market.name} className="bg-[#161b22] border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition cursor-pointer">
                    <div className="flex items-center gap-1 mb-2">
                      <span className="bg-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-300">{market.badge}</span>
                      <span className="bg-red-500/20 text-red-400 text-[9px] font-bold px-1 py-0.5 rounded">{market.code}</span>
                    </div>
                    <span className="text-xs text-gray-300 font-medium block mb-1 truncate">{market.name}</span>
                    <span className="text-base font-bold block mb-2">{market.price}</span>
                    <span className={`text-[10px] font-semibold flex items-center gap-1 ${market.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {market.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {market.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: EXCHANGE / SPOT */}
          {activeTab === 'exchange' && (
            <div>
              {/* Quick Swap Input */}
              <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-4 mb-6">
                <h3 className="text-xs font-bold mb-3 text-gray-300">Quick Swap Order</h3>
                <div className="bg-[#0e1117] border border-gray-800 rounded-xl p-3 mb-3">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Amount"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    className="bg-transparent text-base font-semibold focus:outline-none w-full text-white placeholder-gray-600"
                  />
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition text-xs">
                  Buy Token
                </button>
              </div>

              {/* Crypto Pairs List */}
              <h3 className="font-bold text-sm mb-3">Crypto Pairs</h3>
              <div className="space-y-2">
                {cryptoMarkets.map((coin) => (
                  <div key={coin.pair} className="bg-[#161b22] border border-gray-800 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs block">{coin.pair}</span>
                      <span className="text-[10px] text-gray-500">{coin.volume}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xs block">{coin.price}</span>
                      <span className={`text-[10px] font-medium ${coin.positive ? 'text-emerald-400' : 'text-red-400'}`}>{coin.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: PORTFOLIO / POSITIONS */}
          {activeTab === 'portfolio' && (
            <div>
              <h3 className="font-bold text-sm mb-3">Active Positions</h3>
              <div className="space-y-3">
                <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-gray-500">#849201</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">+4.25 USD</span>
                  </div>
                  <h4 className="font-bold text-xs mb-1">Volatility 100 (1s) Index</h4>
                  <p className="text-[11px] text-gray-400">Stake: 50.00 USD | Entry: 1,392.10</p>
                </div>

                <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-gray-500">#849188</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">+0.99 USD</span>
                  </div>
                  <h4 className="font-bold text-xs mb-1">DOGE/USDT Spot</h4>
                  <p className="text-[11px] text-gray-400">Stake: 100.00 USD | Entry: 0.08150</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* AI ASSISTANT DRAWER MODAL */}
        {isAiOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-end">
            <div className="bg-[#161b22] border-t border-gray-800 rounded-t-3xl h-[75vh] flex flex-col w-full max-w-md mx-auto shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-400" />
                  <h3 className="font-bold text-sm">Ask Amy AI (@misango)</h3>
                </div>
                <button onClick={() => setIsAiOpen(false)} aria-label="Close assistant" className="text-gray-400"><X size={18} /></button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#ff444f] text-white'
                        : 'bg-[#0e1117] text-gray-200 border border-gray-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Amy..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-[#0e1117] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
                <button type="submit" aria-label="Send message" className="bg-indigo-600 text-white p-2.5 rounded-xl"><Send size={14} /></button>
              </form>
            </div>
          </div>
        )}

        {/* STICKY BOTTOM NAVIGATION BAR */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0e1117] border-t border-gray-800 flex justify-around py-2.5 text-[10px] text-gray-400 z-40">
          {navItems.map(({ tab, label, Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center gap-1 ${activeTab === tab ? 'text-[#ff444f] font-bold' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
