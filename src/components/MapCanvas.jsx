import { useState } from "react";
import Legend from "./Legend";

const getColorFromRank = (rankRatio) => {
    if (rankRatio === null || rankRatio === undefined) return "#374151";

    if (rankRatio < 0.33) {
        const t = rankRatio * 3;
        return `rgb(239, ${Math.floor(68 + t * 95)}, 68)`;
    } else if (rankRatio < 0.66) {
        const t = (rankRatio - 0.33) * 3;
        return `rgb(${Math.floor(239 - t * 35)}, ${Math.floor(163 + t * 76)}, 68)`;
    } else {
        const t = (rankRatio - 0.66) * 3;
        return `rgb(${Math.floor(234 - t * 168)}, ${239 - Math.floor(t * 43)}, ${68 + Math.floor(t * 26)})`;
    }
};

function MapCanvas({
    mapData,
    prData,
    selectedDate,
    selectedAsset,
    onAssetSelect,
    globalMinPR,
    globalMaxPR
}) {
    const [hoveredAsset, setHoveredAsset] = useState(null);

    const prEntries = Object.entries(prData[selectedDate] || {})
        .map(([id, v]) => [id, Number(v)])
        .filter(([, v]) => Number.isFinite(v))
        .sort((a, b) => a[1] - b[1]);

    const rankMap = new Map();
    prEntries.forEach(([id], index) => {
        rankMap.set(id, index / (prEntries.length - 1 || 1));
    });

    return (
        <div className="w-full h-full relative bg-slate-950/50">
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
                style={{ pointerEvents: "none" }}
            />


            <svg
                viewBox="0 0 700 700"
                className="w-full h-full"
                style={{ pointerEvents: "auto" }}
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {mapData.areas.map((area) => {
                    const prValue = prData[selectedDate]?.[area.id] ?? null;
                    const numericPR = Number(prValue);
                    const hasData = Number.isFinite(numericPR);
                    const rankRatio = hasData ? rankMap.get(area.id) : null;

                    const isSelected = area.id === selectedAsset;
                    const isHovered = area.id === hoveredAsset;

                    return (
                        <polygon
                            key={area.id}
                            points={area.points.map(p => `${p.x},${p.y}`).join(" ")}
                            fill={hasData ? getColorFromRank(rankRatio) : "#374151"}
                            fillOpacity={isSelected ? 1 : isHovered ? 0.9 : 0.75}
                            stroke={isSelected ? "#60a5fa" : isHovered ? "#93c5fd" : "#1e293b"}
                            strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.5}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                console.log("Asset clicked:", area.id);
                                onAssetSelect(area.id);
                            }}
                            onMouseEnter={() => setHoveredAsset(area.id)}
                            onMouseLeave={() => setHoveredAsset(null)}
                            style={{
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                filter: isSelected ? "url(#glow)" : "none",
                                pointerEvents: "visiblePainted"
                            }}
                        >

                            <title>
                                {hasData
                                    ? `Asset: ${area.id}\nPR: ${numericPR.toFixed(8)}`
                                    : `Asset: ${area.id}\nStatus: Data unavailable`}
                            </title>
                        </polygon>
                    );
                })}
            </svg>

            {hoveredAsset && !selectedAsset && (
                <div
                    className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 shadow-2xl"
                    style={{ pointerEvents: "none" }}   // ⭐ FIX
                >
                    <div className="text-xs text-white/60">Asset ID</div>
                    <div className="text-lg font-bold text-white">{hoveredAsset}</div>
                    <div className="text-xs text-white/60 mt-1">PR Value</div>
                    <div className="text-md font-semibold text-blue-400">
                        {Number.isFinite(Number(prData[selectedDate]?.[hoveredAsset]))
                            ? Number(prData[selectedDate][hoveredAsset]).toFixed(8)
                            : "No data"}
                    </div>
                </div>
            )}

            <Legend minPR={globalMinPR} maxPR={globalMaxPR} />
        </div>
    );
}

export default MapCanvas;
