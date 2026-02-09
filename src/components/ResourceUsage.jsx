export default function ResourceUsage({ cpu, memory, storage, connections, uptime }) {
    const getColor = (value) => {
      if (value < 50) return 'green';
      if (value < 75) return 'yellow';
      return 'red';
    };
  
    return (
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">CPU Usage</span>
            <span className="text-sm">{cpu}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full bg-${getColor(cpu)}-500`} 
              style={{ width: `${cpu}%` }}
            ></div>
          </div>
        </div>
  
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Memory Usage</span>
            <span className="text-sm">{memory}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full bg-${getColor(memory)}-500`} 
              style={{ width: `${memory}%` }}
            ></div>
          </div>
        </div>
  
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Storage Usage</span>
            <span className="text-sm">{storage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full bg-${getColor(storage)}-500`} 
              style={{ width: `${storage}%` }}
            ></div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-300">Connections</div>
            <div className="text-xl font-medium">{connections}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-300">Uptime</div>
            <div className="text-xl font-medium">{uptime}</div>
          </div>
        </div>
      </div>
    );
  }