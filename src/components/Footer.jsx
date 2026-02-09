import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-sm rounded-lg py-4 px-7 border border-2 border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm m-4">
            &copy; {new Date().getFullYear()} StudySync. All rights reserved.
          </p>
          
          <nav className="mt-2">
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-700 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;