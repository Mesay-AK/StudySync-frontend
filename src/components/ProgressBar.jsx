export default function ProgressBar({ percentage, color = 'blue' }) {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      gray: 'bg-gray-500'
    };
  
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClasses[color]}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  }