import { X, TrendingUp, TrendingDown, Minus, Layers } from "lucide-react";

function AssetPanel({ assetId, prData, dates, selectedDate, onClose }) {
    if (!assetId) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers size={32} className="text-white/30" />
                    </div>
                    <p className="text-white/60 text-sm">Select an asset on the map</p>
                    <p className="text-white/40 text-xs mt-2">Click any asset to view detailed performance data</p>
                </div>
            </div>
        );
    }

    // Calculate trend
    const rawCurrentPR = prData[selectedDate]?.[assetId];
    const currentPR = Number.isFinite(Number(rawCurrentPR))
        ? Number(rawCurrentPR)
        : null;

    const currentIndex = dates.indexOf(selectedDate);
    const previousPR = currentIndex > 0 ? prData[dates[currentIndex - 1]]?.[assetId] : null;

    let trend = null;

    const numericCurrentPR = Number(currentPR);
    const numericPreviousPR = Number(previousPR);

    if (
        Number.isFinite(numericCurrentPR) &&
        Number.isFinite(numericPreviousPR) &&
        numericPreviousPR !== 0
    ) {
        const change =
            ((numericCurrentPR - numericPreviousPR) / numericPreviousPR) * 100;

        trend = {
            change,
            direction:
                change > 0 ? "up" : change < 0 ? "down" : "stable"
        };
    }


    return (
        <div className="flex-1 flex flex-col border-t border-white/10 min-h-0">

            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs text-white/60 mb-1">Asset Details</div>
                        <div className="text-xl font-bold text-white">{assetId}</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                        <X size={20} className="text-white/60" />
                    </button>
                </div>
            </div>

            {/* Current Performance */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                <div className="text-xs text-white/60 mb-1">Current Performance ({selectedDate})</div>
                <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-white">
                        {currentPR !== null ? currentPR.toFixed(8) : 'Data Unavailable'}
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trend.direction === 'up'
                                ? 'bg-green-600/20 text-green-400'
                                : trend.direction === 'down'
                                    ? 'bg-red-600/20 text-red-400'
                                    : 'bg-white/10 text-white/60'
                            }`}>
                            {trend.direction === 'up' && <TrendingUp size={14} />}
                            {trend.direction === 'down' && <TrendingDown size={14} />}
                            {trend.direction === 'stable' && <Minus size={14} />}
                            {Math.abs(trend.change).toFixed(2)}%
                        </div>
                    )}
                </div>
            </div>

            {/* Time Series Table */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="text-xs font-semibold text-white/60 mb-3">Performance History</div>
                <div className="space-y-1">
                    {dates.map((date) => {
                        const rawPR = prData[date]?.[assetId];
                        const pr = Number.isFinite(Number(rawPR)) ? Number(rawPR) : null;
                        const isActive = date === selectedDate;

                        return (
                            <div
                                key={date}
                                className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 font-bold'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <span className={`text-xs ${isActive ? 'text-white' : 'text-white/60'}`}>
                                    {date}
                                </span>
                                <span className={`text-sm font-mono ${isActive
                                        ? 'text-white'
                                        : pr !== null
                                            ? 'text-white/80'
                                            : 'text-white/30'
                                    }`}>
                                    {pr !== null ? (pr * 100).toFixed(6) + '%' : 'No Data'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AssetPanel;