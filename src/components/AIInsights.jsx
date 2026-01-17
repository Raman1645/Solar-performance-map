import { Sparkles, AlertTriangle, TrendingDown, CheckCircle, Info } from "lucide-react";

function AIInsights({ suddenDrops, stats, selectedDate, previousDate }) {
    const hasAlerts = suddenDrops.length > 0 || stats.underperformingAssets.length > 5;

    return (
        <div className="border-b border-white/10">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-400" />
                    <h3 className="text-lg font-bold text-white">AI Insights</h3>
                </div>
                <p className="text-xs text-white/60 mt-1">Real-time performance analysis</p>
            </div>

            {/* Insights Content */}
            <div className="px-6 py-4 max-h-96 overflow-y-auto space-y-3">
                {/* Overall Status */}
                {!hasAlerts && (
                    <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <div className="text-sm font-semibold text-green-300 mb-1">All Systems Operational</div>
                                <p className="text-xs text-white/60">
                                    No critical performance issues detected for {selectedDate}. Plant is operating within normal parameters.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sudden Drops Alert */}
                {previousDate && suddenDrops.length > 0 && (
                    <div className="bg-red-600/10 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-red-300 mb-2">
                                    {suddenDrops.length} Asset{suddenDrops.length > 1 ? 's' : ''} with Sudden Performance Drop
                                </div>
                                <p className="text-xs text-white/60 mb-3">
                                    Compared to {previousDate}, these assets experienced significant PR decline:
                                </p>

                                <div className="space-y-2">
                                    {suddenDrops.slice(0, 3).map(item => (
                                        <div key={item.assetId} className="bg-black/20 rounded px-3 py-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-white">{item.assetId}</span>
                                                <span className="text-xs font-semibold text-red-400">
                                                    -{item.dropPercent.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-white/40">{item.prevPR.toFixed(6)}</span>
                                                <TrendingDown size={12} className="text-red-400" />
                                                <span className="text-white/60">{item.todayPR.toFixed(6)}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {suddenDrops.length > 3 && (
                                        <div className="text-xs text-white/40 text-center pt-1">
                                            +{suddenDrops.length - 3} more asset{suddenDrops.length - 3 > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="flex items-start gap-2">
                                        <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-white/50">
                                            <span className="font-semibold text-blue-400">Recommended Action:</span> Inspect physical assets for soiling, shading, or equipment malfunction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Underperformance Alert */}
                {stats.underperformingAssets.length > 0 && (
                    <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={20} className="text-orange-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-orange-300 mb-1">
                                    Chronic Underperformance Detected
                                </div>
                                <p className="text-xs text-white/60 mb-2">
                                    {stats.underperformingAssets.length} asset{stats.underperformingAssets.length > 1 ? 's are' : ' is'} performing below threshold ({stats.UNDERPERFORMANCE_THRESHOLD})
                                </p>

                                <div className="bg-black/20 rounded px-3 py-2">
                                    <div className="text-xs">
                                        <span className="text-white/60">Worst performer:</span>{' '}
                                        <span className="font-bold text-orange-400">{stats.worstAsset.assetId}</span>
                                        {' '}
                                        <span className="text-white/40">({stats.worstAsset.pr.toFixed(8)})</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="flex items-start gap-2">
                                        <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-white/50">
                                            <span className="font-semibold text-blue-400">Suggested:</span> Schedule maintenance review for persistently low-performing assets.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Performance Summary */}
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Sparkles size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-blue-300 mb-2">Performance Summary</div>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-white/60">Average PR:</span>
                                    <span className="font-mono text-white">{stats.averagePR.toFixed(8)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Total Assets Monitored:</span>
                                    <span className="font-mono text-white">{stats.totalAssets}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Assets Meeting Target:</span>
                                    <span className="font-mono text-green-400">
                                        {stats.totalAssets - stats.underperformingAssets.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIInsights;