const ClockSweepLoader = () => {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <span className="sr-only">Loading...</span>
          
          {/* Clock container */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-600/30" />
            
            {/* Hour markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) - 90; // Start from top (12 o'clock)
              return (
                <div
                  key={i}
                  className="absolute w-1 h-4 bg-slate-400/60 rounded-full"
                  style={{
                    top: '10px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    transformOrigin: '50% 86px'
                  }}
                />
              );
            })}
  
            {/* Sweep track */}
            <div className="absolute inset-2 rounded-full overflow-hidden">
              {/* Sweep wedge */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, 
                    transparent 0deg, 
                    transparent 270deg, 
                    rgba(59, 130, 246, 0.6) 300deg,
                    rgb(59, 130, 246) 330deg,
                    rgba(59, 130, 246, 0.8) 360deg,
                    transparent 30deg,
                    transparent 360deg)`,
                  animation: 'spin 3s ease-in-out infinite'
                }}
              />
  
              {/* Inner circle to create ring effect */}
              <div className="absolute inset-8 rounded-full bg-slate-900" />
            </div>
  
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-blue-500/50">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
            </div>
  
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
            
            {/* Progress indicators around the rim */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px)`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
  
          {/* Caption */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Organizing your tasks</h3>
            <p className="text-slate-400">Please wait while we set everything up...</p>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-1 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.4s'
                  }}
                />
              ))}
            </div>
          </div>
  
          {/* Stats preview */}
          <div className="mt-8 flex justify-center gap-6 text-sm">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-3 bg-slate-600/60 rounded animate-pulse" />
              <div className="w-12 h-2 bg-slate-700/50 rounded animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-3 bg-slate-600/60 rounded animate-pulse" />
              <div className="w-10 h-2 bg-slate-700/50 rounded animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-3 bg-slate-600/60 rounded animate-pulse" />
              <div className="w-14 h-2 bg-slate-700/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ClockSweepLoader;