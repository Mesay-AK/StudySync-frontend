import Header from '../../components/Header';


function Hero() {
  return (
    <div className="hero relative h-screen bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/src/assets/heroBg.jpg)' }}>
      <Header/>
      
      <div className="absolute inset-14 flex items-center justify-end pr-12">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInDown">
            Welcome to <span className="text-blue-400">Study<span className="text-blue-300">Sync</span></span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 font-light animate-fadeIn delay-100">
            Study smarter, <span className="font-medium text-blue-400">Together</span>.
          </p>
          
          <div className="mb-8 space-y-2 animate-fadeIn delay-200 hidden md:block">
            <p className="text-xl md:text-xl leading-relaxed">
            Achieve your study goals with platform 
            </p>
            <p className="text-xl md:text-xl leading-relaxed">
            designed for collaborative learning.</p>
          </div>
          
          <button className="
            border font-medium 
            hover:text-blue-300
            hover:border-blue-300
            py-3 px-8 rounded
            shadow-lg hover:shadow-xl 
            transition-all duration-100 
            transform hover:scale-105
            animate-fadeIn delay-300
            animate-fadeIn
          ">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Optional decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
}


export default Hero;