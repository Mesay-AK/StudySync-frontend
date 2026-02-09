function HealthIndicator({ title, value, threshold, isWarning = false }) {
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>{title}</span>
          <span className={value > threshold ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-green-400'}>
            {value}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              value > threshold ? 'bg-red-500' : 
              isWarning ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  }


export default HealthIndicator;