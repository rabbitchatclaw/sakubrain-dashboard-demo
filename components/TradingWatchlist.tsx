'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Plus, Bell, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const watchlist = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.56,
    change: 2.34,
    changePercent: 1.25,
    volume: '52.3M',
    marketCap: '2.95T',
    alerts: true,
    category: 'Tech',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 238.45,
    change: -5.67,
    changePercent: -2.32,
    volume: '98.1M',
    marketCap: '756B',
    alerts: false,
    category: 'Auto',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 495.22,
    change: 12.89,
    changePercent: 2.67,
    volume: '45.7M',
    marketCap: '1.22T',
    alerts: true,
    category: 'Tech',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    price: 378.91,
    change: 1.23,
    changePercent: 0.33,
    volume: '28.4M',
    marketCap: '2.81T',
    alerts: false,
    category: 'Tech',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com',
    price: 155.33,
    change: -2.11,
    changePercent: -1.34,
    volume: '41.2M',
    marketCap: '1.61T',
    alerts: true,
    category: 'E-commerce',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.00,
    change: 850.00,
    changePercent: 2.00,
    volume: '28.5B',
    marketCap: '847B',
    alerts: true,
    category: 'Crypto',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.50,
    change: -45.25,
    changePercent: -1.95,
    volume: '12.8B',
    marketCap: '274B',
    alerts: false,
    category: 'Crypto',
  },
];

const portfolio = {
  totalValue: 124567.89,
  dayChange: 2345.67,
  dayChangePercent: 1.92,
  totalReturn: 18567.89,
  totalReturnPercent: 17.53,
};

const timeRanges = ['1H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];

export function TradingWatchlist() {
  const [selectedRange, setSelectedRange] = useState('1D');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const categories = ['All', 'Tech', 'Auto', 'E-commerce', 'Crypto'];

  const filteredWatchlist = selectedCategory === 'All' 
    ? watchlist 
    : watchlist.filter(item => item.category === selectedCategory);

  const positiveChange = portfolio.dayChange >= 0;

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Trading Watchlist</h2>
              <p className="text-sm text-slate-400">Track your favorite assets</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Eye className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-xs text-slate-400 mb-1">Portfolio Value</p>
            <p className="text-xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-xs text-slate-400 mb-1">Day Change</p>
            <div className="flex items-center gap-1">
              <p className={cn(
                "text-xl font-bold",
                positiveChange ? "text-emerald-400" : "text-rose-400"
              )}>
                {positiveChange ? '+' : ''}${portfolio.dayChange.toLocaleString()}
              </p>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                positiveChange ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              )}>
                {positiveChange ? '+' : ''}{portfolio.dayChangePercent}%
              </span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-xs text-slate-400 mb-1">Total Return</p>
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold text-emerald-400">+${portfolio.totalReturn.toLocaleString()}</p>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                +{portfolio.totalReturnPercent}%
              </span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-xs text-slate-400 mb-1">Assets</p>
            <p className="text-xl font-bold text-white">{watchlist.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
                  selectedRange === range
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-800/50 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-500">
          <div className="col-span-3">Asset</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Change</div>
          <div className="col-span-2 text-right">Volume</div>
          <div className="col-span-2 text-right">Market Cap</div>
          <div className="col-span-1 text-center">Alert</div>
        </div>

        {filteredWatchlist.map((item) => {
          const isPositive = item.change >= 0;

          return (
            <div
              key={item.symbol}
              className="group flex items-center sm:grid sm:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex-1 sm:col-span-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                    isPositive 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : "bg-rose-500/10 text-rose-400"
                  )}>
                    {item.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.symbol}</p>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block col-span-2 text-right">
                <p className="font-medium text-white">${item.price.toLocaleString()}</p>
              </div>

              <div className="hidden sm:block col-span-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-rose-400" />
                  )}
                  <span className={cn(
                    "font-medium",
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  )}>
                    {isPositive ? '+' : ''}{item.changePercent}%
                  </span>
                </div>
              </div>

              <div className="hidden sm:block col-span-2 text-right">
                <p className="text-sm text-slate-400">{item.volume}</p>
              </div>

              <div className="hidden sm:block col-span-2 text-right">
                <p className="text-sm text-slate-400">{item.marketCap}</p>
              </div>

              <div className="sm:col-span-1 flex items-center justify-end sm:justify-center gap-2">
                <button
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    item.alerts
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <Bell className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-500 hover:text-white transition-colors sm:hidden">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="sm:hidden text-right">
                <p className="font-medium text-white">${item.price.toLocaleString()}</p>
                <span className={cn(
                  "text-xs",
                  isPositive ? "text-emerald-400" : "text-rose-400"
                )}>
                  {isPositive ? '+' : ''}{item.changePercent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
          View All Assets
        </button>
      </div>
    </div>
  );
}
