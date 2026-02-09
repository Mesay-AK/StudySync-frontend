import Card from '../../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faUsers,
  faChalkboard,
  faShareNodes
} from '@fortawesome/free-solid-svg-icons';

function Description() {
  return (
    <div className="description min-h-screen bg-gradient-to-br from-stone-900 via-stone-500 to-stone-800 py-12 px-12">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-300 mb-4">
          How It Works
        </h1>
        <div className="text-amber-200 text-lg md:text-xl space-y-2 bg-white/20 backdrop-blur-sm rounded-lg 
        bg-gradient-to-tb from-white/10 to-transparent 
        border border-white/30 shadow-lg
        border-white/30 py-4 px-6 max-w-2xl mx-auto font-bold">
          <p>Tired of studying alone?</p>
          <p>Achieve your study goals with StudySync; the real-time platform designed for collaborative learning.</p>
        </div>
      </header>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          <Card 
            title="Instant Group Chats" 
            description="Got a quick question or concept to debate? Jump into instant group chats with peers for real-time answers and idea sharing." 
            icon={<FontAwesomeIcon icon={faUsers} className="h-16 w-16" />}
          />
          
          <Card 
            title="Shared Study Rooms" 
            description="Form public or private study rooms for specific subjects. Host ongoing discussions and collaborate on assignments with dedicated groups." 
            icon={<FontAwesomeIcon icon={faChalkboard} className="h-16 w-16" />}
          />
          
          <Card 
            title="Resource Sharing" 
            description="Share images, documents, and links directly within chats. Keep all study materials centralized for collective understanding." 
            icon={<FontAwesomeIcon icon={faShareNodes} className="h-16 w-16" />}
          />
          
          <Card 
            title="Direct Messaging" 
            description="Connect with classmates or mentors privately for focused discussions without distractions." 
            icon={<FontAwesomeIcon icon={faComments} className="h-16 w-16" />}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;