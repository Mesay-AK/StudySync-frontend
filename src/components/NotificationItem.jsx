function NotificationItem({ notification }) {
    return (
      <div className="flex items-start p-3 rounded-lg hover:bg-white/10 cursor-pointer">
        <div className={`p-2 rounded-full mr-3 ${
          notification.type === 'alert' ? 'bg-red-900/50 text-red-300' :
          notification.type === 'update' ? 'bg-blue-900/50 text-blue-300' :
          'bg-green-900/50 text-green-300'
        }`}>
          {notification.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium">{notification.title}</h4>
            <span className="text-xs text-white/50">{notification.time}</span>
          </div>
          <p className="text-sm text-white/70">{notification.message}</p>
        </div>
        {!notification.read && (
          <div className="ml-2 w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
        )}
      </div>
    );
  }


export default NotificationItem;