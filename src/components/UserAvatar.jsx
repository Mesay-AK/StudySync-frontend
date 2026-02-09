export default function UserAvatar({ user, size = 'md', showName = false, className = '' }) {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10',
    lg: 'h-12 w-12 text-lg'
  };

  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className={`flex items-center ${className}`}>
      {user.avatarUrl ? (
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div 
          className={`${sizeClasses[size]} bg-blue-600 rounded-full flex items-center justify-center`}
        >
          {initials}
        </div>
      )}
      {showName && (
        <span className={`ml-2 ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>
          {user.name}
        </span>
      )}
    </div>
  );
}