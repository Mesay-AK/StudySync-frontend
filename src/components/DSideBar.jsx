import { Link } from 'react-router-dom';

function DSideBar({ menuItems = [] }) {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-20 lg:w-64 hover:w-64 transition-all duration-300 ease-in-out bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 p-5 flex flex-col z-50 overflow-hidden group">
        {/* Logo */}
        <div className="text-blue-300 font-extrabold text-3xl whitespace-nowrap mx-auto lg:mx-0">
          Study<span className="text-blue-400">Sync</span>
        </div>

        <div className="w-full mt-5 border-t border-blue-200/30"></div>

        {/* Navigation */}
        <nav className="mt-7 flex-1">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="flex items-center text-blue-200 hover:text-white text-md font-medium p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                >
                  <span className="w-6 text-center mr-4">{item.icon}</span>
                  <span className="hidden lg:inline group-hover:inline">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Spacer div - matches sidebar width */}
      <div className="w-20 lg:w-64 group-hover:w-64 transition-all duration-300"></div>
    </>
  );
}

export default DSideBar;