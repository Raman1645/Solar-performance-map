import { Calendar, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function DateSelector({ dates, selectedIndex, onChange }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    const handlePrevious = () => {
        if (selectedIndex > 0) onChange(selectedIndex - 1);
    };

    const handleNext = () => {
        if (selectedIndex < dates.length - 1) onChange(selectedIndex + 1);
    };

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                onChange(prev => {
                    if (prev >= dates.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, dates.length, onChange]);

    const progressPercentage = ((selectedIndex / (dates.length - 1)) * 100).toFixed(1);

    return (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-blue-400" />
                <div className="flex-1">
                    <div className="text-xs text-white/60 mb-0.5">Selected Date</div>
                    <div className="text-lg font-bold text-white">{dates[selectedIndex]}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-white/50">Day {selectedIndex + 1} of {dates.length}</div>
                    <div className="text-sm font-semibold text-blue-400">{progressPercentage}%</div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={selectedIndex === 0}
                    className={`p-2 rounded-lg transition-all ${selectedIndex === 0
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-105'
                        }`}
                >
                    <ChevronLeft size={16} />
                </button>

                <button
                    onClick={togglePlayback}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <div className="flex-1 relative">
                    {/* Custom slider track */}
                    <div className="h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                        {/* Progress bar */}
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    {/* Native slider (invisible but functional) */}
                    <input
                        type="range"
                        min="0"
                        max={dates.length - 1}
                        value={selectedIndex}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                <button
                    onClick={handleNext}
                    disabled={selectedIndex === dates.length - 1}
                    className={`p-2 rounded-lg transition-all ${selectedIndex === dates.length - 1
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-105'
                        }`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default DateSelector;