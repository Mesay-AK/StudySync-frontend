import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

function SideBar({ isOpen, onClose }) {

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 p-6 flex flex-col justify-between text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} sidebar`}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="self-end text-white hover:text-blue-300 transition-colors"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
        </button>

        {/* Main Content */}
        <div className="sidebar-content">

        <div className="text-blue-300 font-extrabold text-2xl whitespace-nowrap mx-auto mb-5">
          Study<span className="text-blue-400">Sync</span>
        </div>
          
          <ul className="space-y-4">
            <li>
              <a 
                href="#home" 
                className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={onClose}
              >
                <span className="w-6 mr-3">🏠</span>
                <span className="font-medium">Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#description" 
                className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={onClose}
              >
                <span className="w-6 mr-3">🔄</span>
                <span className="font-medium">How It Works</span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={onClose}
              >
                <span className="w-6 mr-3">✉️</span>
                <span className="font-medium">Contact Us</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="sidebar-footer pb-4">
          <div className="social-links flex justify-center space-x-4 mb-4">
            <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-pink-400 transition-colors duration-200" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-sm text-center text-white/70 mb-1">
            &copy; {new Date().getFullYear()} StudySync
          </p>
          <p className="text-xs text-center text-white/50">
            All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}

export default SideBar;