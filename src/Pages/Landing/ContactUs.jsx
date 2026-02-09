import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';

function ContactUs() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-400 to-stone-800 py-12 px-4 sm:px-12">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-300 mb-3">
          Contact Us
        </h1>
        <p className="text-stone-200">We'd love to hear from you!</p>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-4xl mb-12">
        {/* Left Side - Compact Contact Info */}
        <div className="p-2 backdrop-blur-sm rounded-lg">
          <h2 className="text-xl font-bold text-blue-200 mb-4">Get in Touch</h2>
          
          <div className="space-y-9">
            <div className="flex items-start">
              <FontAwesomeIcon 
                icon={faMapMarkerAlt} 
                className="text-blue-300 mt-0.5 mr-3 text-lg" 
              />
              <div>
                <h3 className="font-medium text-white">Address</h3>
                <p className="text-stone-200 text-sm">
                  123 Study Street<br />
                  Knowledge City, KC 10001
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={faPhone} 
                className="text-blue-300 mr-3 text-lg" 
              />
              <div>
                <h3 className="font-medium text-white">Phone</h3>
                <p className="text-stone-200 text-sm">(123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={faEnvelope} 
                className="text-blue-300 mr-3 text-lg" 
              />
              <div>
                <h3 className="font-medium text-white">Email</h3>
                <p className="text-stone-200 text-sm">contact@studysync.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Compact Contact Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg py-10 px-7 border border-white/20">
          <h2 className="text-xl font-bold text-blue-200 mb-4">Send Us a Message</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white/10"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white/10"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white/10"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-1/3 hover:text-blue-300 text-white font-medium py-2 px-4 rounded-md transition duration-300 text-sm border hover:border-blue-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer/>
    </div>

    
    </>
  );
}

export default ContactUs;