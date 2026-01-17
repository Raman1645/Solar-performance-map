import { Activity } from "lucide-react";

function Legend({ minPR, maxPR }) {
    return (
        <div className="absolute bottom-6  bg-slate-900/95 right-20 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-2xl w-170">
            <div className="flex items-center gap-1.5 mb-2">
                <Activity size={14} className="text-blue-400" />
                <div className="text-xs font-bold text-white">Performance</div>
            </div>

            {/* Gradient Bar */}
            <div className="h-2 rounded mb-1.5 shadow-inner" style={{
                background: "linear-gradient(to right, rgb(239, 68, 68), rgb(239, 163, 68), rgb(234, 239, 68), rgb(34, 197, 94))"
            }} />

            {/* Labels */}
            <div className="flex justify-between text-xs mb-0.5">
                <div>
                    <div className="text-white/50 text-[10px]">Low</div>
                    <div className="font-mono font-semibold text-red-400 text-[10px]">{minPR.toFixed(6)}</div>
                </div>
                
                <div className="text-right">
                    <div className="text-white/50 text-[10px]">High</div>
                    <div className="font-mono font-semibold text-green-400 text-[10px]">{maxPR.toFixed(6)}</div>
                </div>
            </div>

            
            
        </div>
    );
}

export default Legend;