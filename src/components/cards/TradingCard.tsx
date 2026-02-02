/**
 * Trading Watchlist Components
 */

'use client';

import { TrendingUp, TrendingDown, Eye, Plus, Bell, ArrowUpRight, ArrowDownRight, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Asset, Portfolio, TradingFilters } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { useModal } from '@/components/ui/Modal';
import { AddAssetForm } from '@/components/ui/Forms';

// ============================================================================
// CONSTANTS
// ============================================================================

const TIME_RANGES: TradingFilters['timeRange'][] = ['1H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];
const CATEGORIES = ['All', 'Tech', 'Auto', 'E-commerce', 'Crypto'] as const;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface PortfolioStatsProps {
  portfolio: Portfolio;
}

function PortfolioStats({ portfolio }: PortfolioStatsProps) {
  const positiveChange = portfolio.dayChange >= 0;

  return (
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
        <p className="text-xl font-bold text-white">--</p>
      </div>
    </div>
  );
}

interface TradingFiltersProps {
  filters: TradingFilters;
  onUpdateFilters: (filters: Partial<TradingFilters>) => void;
}

function TradingFiltersBar({ filters, onUpdateFilters }: TradingFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => onUpdateFilters({ timeRange: range })}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
              filters.timeRange === range
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
          value={filters.category}
          onChange={(e) => onUpdateFilters({ category: e.target.value as TradingFilters['category'] })}
          className="px-3 py-1.5 bg-slate-800/50 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface AssetRowProps {
  asset: Asset;
  onToggleAlerts: () => void;
}

function AssetRow({ asset, onToggleAlerts }: AssetRowProps) {
  const { showToast } = useToast();
  const isPositive = asset.change >= 0;
  
  const handleToggleAlerts = () => {
    onToggleAlerts();
    showToast(
      `${asset.symbol} alerts ${asset.alerts ? 'disabled' : 'enabled'} 🔔`,
      asset.alerts ? 'info' : 'success'
    );
  };

  return (
    <div className="group flex items-center sm:grid sm:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
      <div className="flex-1 sm:col-span-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
            isPositive 
              ? "bg-emerald-500/10 text-emerald-400" 
              : "bg-rose-500/10 text-rose-400"
          )}>
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="font-semibold text-white">{asset.symbol}</p>
            <p className="text-xs text-slate-400">{asset.name}</p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block col-span-2 text-right">
        <p className="font-medium text-white">${asset.price.toLocaleString()}</p>
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
            {isPositive ? '+' : ''}{asset.changePercent}%
          </span>
        </div>
      </div>

      <div className="hidden sm:block col-span-2 text-right">
        <p className="text-sm text-slate-400">{asset.volume}</p>
      </div>

      <div className="hidden sm:block col-span-2 text-right">
        <p className="text-sm text-slate-400">{asset.marketCap}</p>
      </div>

      <div className="sm:col-span-1 flex items-center justify-end sm:justify-center">
        <button
          onClick={handleToggleAlerts}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            asset.alerts
              ? "text-amber-400 bg-amber-500/10"
              : "text-slate-500 hover:text-slate-300"
          )}
        >
          <Bell className={cn("w-4 h-4", asset.alerts && "animate-pulse")} />
        </button>
      </div>

      <div className="sm:hidden text-right">
        <p className="font-medium text-white">${asset.price.toLocaleString()}</p>
        <span className={cn(
          "text-xs",
          isPositive ? "text-emerald-400" : "text-rose-400"
        )}>
          {isPositive ? '+' : ''}{asset.changePercent}%
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface TradingWatchlistCardProps {
  assets: Asset[];
  portfolio: Portfolio;
  filters: TradingFilters;
  onUpdateFilters: (filters: Partial<TradingFilters>) => void;
  onToggleAlerts: (symbol: string) => void;
  isLoading?: boolean;
}

export function TradingWatchlistCard({
  assets,
  portfolio,
  filters,
  onUpdateFilters,
  onToggleAlerts,
  isLoading = false,
}: TradingWatchlistCardProps) {
  const { showToast } = useToast();
  const { openModal } = useModal();

  const handleAddAsset = () => {
    openModal(
      <AddAssetForm onAdd={(newAsset) => {
        showToast(`Added ${newAsset.symbol} to watchlist! 📈`, 'success');
      }} />,
      'Add Asset to Watchlist'
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="h-48 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

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
            <button 
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              onClick={() => showToast('Watchlist view toggled 👁️', 'info')}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddAsset}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <PortfolioStats portfolio={portfolio} />
        <TradingFiltersBar filters={filters} onUpdateFilters={onUpdateFilters} />
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

        {assets.map((asset) => (
          <AssetRow
            key={asset.symbol}
            asset={asset}
            onToggleAlerts={() => onToggleAlerts(asset.symbol)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => showToast('Full asset list view coming soon! 📊', 'info')}
          className="w-full py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          View All Assets
        </button>
      </div>
    </div>
  );
}
