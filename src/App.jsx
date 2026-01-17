import { useState, useMemo } from "react";
import MapCanvas from "./components/MapCanvas";
import DateSelector from "./components/DateSelector";
import AIInsights from "./components/AIInsights";
import PlantStats from "./components/PlantStats";
import AssetPanel from "./components/AssetPanel";
import map_ICR17 from "./data/map_ICR17";
import { loadPRData } from "./data/index";

function App() {
  const pr_ICR17 = loadPRData();
  const dates = Object.keys(pr_ICR17.pr_data).sort();
  const [dateIndex, setDateIndex] = useState(dates.length - 1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showInsights, setShowInsights] = useState(false);

  const selectedDate = dates[dateIndex];

  // Calculate global PR range
  const { globalMinPR, globalMaxPR } = useMemo(() => {
    const allPRValues = Object.values(pr_ICR17.pr_data)
      .flatMap(day => Object.values(day))
      .map(v => Number(v))
      .filter(v => Number.isFinite(v));

    return {
      globalMinPR: allPRValues.length ? Math.min(...allPRValues) : 0,
      globalMaxPR: allPRValues.length ? Math.max(...allPRValues) : 1
    };
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const prValuesForDate = Object.entries(pr_ICR17.pr_data[selectedDate] || {})
      .map(([assetId, value]) => ({ assetId, pr: Number(value) }))
      .filter(item => Number.isFinite(item.pr));

    const averagePR = prValuesForDate.reduce((sum, item) => sum + item.pr, 0) / (prValuesForDate.length || 1);
    const UNDERPERFORMANCE_THRESHOLD = 0.008;
    const underperformingAssets = prValuesForDate.filter(item => item.pr < UNDERPERFORMANCE_THRESHOLD);
    const worstAsset = prValuesForDate.reduce(
      (worst, current) => (current.pr < worst.pr ? current : worst),
      prValuesForDate[0] || { assetId: "-", pr: 0 }
    );

    return {
      averagePR,
      underperformingAssets,
      worstAsset,
      totalAssets: prValuesForDate.length,
      UNDERPERFORMANCE_THRESHOLD
    };
  }, [selectedDate]);

  // Detect sudden drops
  const suddenDrops = useMemo(() => {
    const DROP_THRESHOLD = 0.10;
    const previousDate = dateIndex > 0 ? dates[dateIndex - 1] : null;

    if (!previousDate) return [];

    const todayData = pr_ICR17.pr_data[selectedDate] || {};
    const prevData = pr_ICR17.pr_data[previousDate] || {};

    return Object.keys(todayData)
      .map(assetId => {
        const todayPR = Number(todayData[assetId]);
        const prevPR = Number(prevData[assetId]);

        if (!Number.isFinite(todayPR) || !Number.isFinite(prevPR)) return null;

        const dropFraction = (prevPR - todayPR) / prevPR;

        return dropFraction >= DROP_THRESHOLD
          ? { assetId, todayPR, prevPR, dropPercent: dropFraction * 100 }
          : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.dropPercent - a.dropPercent);
  }, [selectedDate, dateIndex, dates]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      {/* Header */}
      <header className="px-8 py-5 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SuperPower Observability
            </h1>
            <p className="text-sm text-white/60 mt-1">ICR 17 Solar Plant Performance Monitor</p>
          </div>

          <button
            onClick={() => setShowInsights(!showInsights)}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${showInsights
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-white/10 hover:bg-white/20 border border-white/20'
              }`}
          >
            {showInsights ? '🤖 AI Insights Active' : '🤖 Show AI Insights'}
          </button>
        </div>

        <DateSelector
          dates={dates}
          selectedIndex={dateIndex}
          onChange={setDateIndex}
        />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Stats */}
        <PlantStats
          stats={stats}
          selectedDate={selectedDate}
          globalMinPR={globalMinPR}
          globalMaxPR={globalMaxPR}
        />

        {/* Map Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <MapCanvas
            mapData={map_ICR17}
            prData={pr_ICR17.pr_data}
            selectedDate={selectedDate}
            selectedAsset={selectedAsset}
            onAssetSelect={setSelectedAsset}
            globalMinPR={globalMinPR}
            globalMaxPR={globalMaxPR}
          />
        </div>

        {/* Right Sidebar - AI Insights & Asset Details */}
        <div className="w-96 flex flex-col bg-white/5 border-l border-white/10">
          {showInsights && (
            <AIInsights
              suddenDrops={suddenDrops}
              stats={stats}
              selectedDate={selectedDate}
              previousDate={dateIndex > 0 ? dates[dateIndex - 1] : null}
            />
          )}

          <AssetPanel
            assetId={selectedAsset}
            prData={pr_ICR17.pr_data}
            dates={dates}
            selectedDate={selectedDate}
            onClose={() => setSelectedAsset(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;