import { Zap, TrendingDown, Layers, AlertCircle } from "lucide-react";

function PlantStats({ stats, selectedDate, globalMinPR, globalMaxPR }) {
    const performancePercentage = ((stats.averagePR - globalMinPR) / (globalMaxPR - globalMinPR) * 100).toFixed(1);

    return (
        <div className="w-80 bg-white/5 border-r border-white/10 p-6 overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" />
                Plant Overview
            </h2>

            {/* Date Card */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-4 mb-4">
                <div className="text-xs text-blue-300 mb-1">Monitoring Date</div>
                <div className="text-2xl font-bold text-white">{selectedDate}</div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3">
                {/* Total Assets */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-white/60 flex items-center gap-1">
                            <Layers size={14} />
                            Total Assets
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.totalAssets}</div>
                </div>

                {/* Average PR */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-white/60 flex items-center gap-1">
                            <Zap size={14} />
                            Average PR
                        </div>
                        <div className="text-xs font-semibold text-green-400">{performancePercentage}%</div>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.averagePR.toFixed(8)}</div>

                    {/* Mini progress bar */}
                    <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
                            style={{ width: `${performancePercentage}%` }}
                        />
                    </div>
                </div>

                {/* Underperforming Assets */}
                <div className={`border rounded-lg p-4 transition-all ${stats.underperformingAssets.length > 0
                        ? 'bg-red-600/10 border-red-500/30 hover:bg-red-600/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-white/60 flex items-center gap-1">
                            <AlertCircle size={14} />
                            Underperforming
                        </div>
                    </div>
                    <div className={`text-3xl font-bold ${stats.underperformingAssets.length > 0 ? 'text-red-400' : 'text-white'
                        }`}>
                        {stats.underperformingAssets.length}
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                        Below {stats.UNDERPERFORMANCE_THRESHOLD}
                    </div>
                </div>

                {/* Worst Performing Asset */}
                <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-lg p-4 hover:from-orange-600/20 hover:to-red-600/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-orange-300 flex items-center gap-1">
                            <TrendingDown size={14} />
                            Worst Asset
                        </div>
                    </div>
                    <div className="text-lg font-bold text-white">{stats.worstAsset.assetId}</div>
                    <div className="text-sm text-orange-400 font-mono mt-1">
                        PR: {stats.worstAsset.pr.toFixed(8)}
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default PlantStats;