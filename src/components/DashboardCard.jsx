function DashboardCard({ title, value, change = "", icon, color = "blue" }) {
    const colorClasses = {
      blue: {
        bg: "bg-blue-900/20",
        border: "border-blue-700",
        iconBg: "bg-blue-900/30",
      },
      green: {
        bg: "bg-green-900/20",
        border: "border-green-700",
        iconBg: "bg-green-900/30",
      },
      orange: {
        bg: "bg-orange-900/20",
        border: "border-orange-700",
        iconBg: "bg-orange-900/30",
      },
      purple: {
        bg: "bg-purple-900/20",
        border: "border-purple-700",
        iconBg: "bg-purple-900/30",
      },
    };
  
    // Fallback to blue if invalid color is provided
    const colors = colorClasses[color] || colorClasses.blue;
  
    return (
      <div
        className={`${colors.bg} ${colors.border} border rounded-xl p-5 hover:shadow-lg transition-all`}
      >
        <div className="flex justify-between">
          <h4 className="text-white/70 text-sm">{title}</h4>
          <div
            className={`p-2 rounded-lg ${colors.iconBg}`}
            aria-hidden="true"
          >
            {icon}
          </div>
        </div>
        <p className="text-2xl font-bold my-2">{value}</p>
        {change && (
          <p
            className={`text-xs ${
              change.startsWith("+") ? "text-green-400" : "text-red-400"
            }`}
          >
            {change} from yesterday
          </p>
        )}
      </div>
    );
  }
  
  export default DashboardCard;