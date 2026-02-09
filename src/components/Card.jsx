function Card({ title, description, icon }) {
    return (
      <div className="bg-white-100 shadow-xl rounded-xl overflow-hidden m-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full max-w-xs h-100 flex flex-col group border border-white/30">
        {/* Icon container with gradient background */}
        <div className="relative h-48 flex items-center justify-center ">
          <div className="text-6xl text-blue-300 p-6 bg-stone-800/50 rounded-full backdrop-blur-sm border border-amber-500/20 my-8">
            {icon}
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6 flex flex-col flex-grow bg-white/10 border-white/20 backdrop-blur-sm rounded-b-xl">
          <div className="flex items-center mb-4">
            <div className="h-1 w-8 bg-blue-300 mr-3"></div>
            <h2 className="text-2xl font-bold text-blue-300 tracking-tight">{title}</h2>
          </div>
          <p className="text-black flex-grow leading-relaxed">{description}</p>
          
          {/* Subtle CTA element */}
          <div className="mt-4 pt-4 border-t border-stone-600/30 flex justify-end">
            <span className="text-sm font-medium text-blue-400 hover:text-blue-700 transition-colors cursor-pointer">
              Learn more →
            </span>
          </div>
        </div>
      </div>
    );
  }


export default Card;