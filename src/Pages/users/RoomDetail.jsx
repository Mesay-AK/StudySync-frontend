import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import {
	faHouse,
	faComments,
	faMessage,
	faBook,
	faChartBar,
	faGear,
	faUsers,
	faClock,
	faGlobe,
	faLock,
	faArrowLeft,
	faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';

const userMenu = [
	{ name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
	{ name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
	{ name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
	{ name: 'Materials', href: '/user/materials', icon: <FontAwesomeIcon icon={faBook} /> },
	{ name: 'Analytics', href: '/user/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
	{ name: 'Settings', href: '/user/settings', icon: <FontAwesomeIcon icon={faGear} /> },
	{ name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockRooms = {
	1: {
		name: 'Advanced Calculus Study Group',
		subject: 'Mathematics',
		description: 'Weekly study group for Calculus II students',
		participants: 12,
		maxParticipants: 20,
		type: 'public',
		nextSession: 'Today, 6:00 PM',
		rules: 'Be respectful. No spamming.'
	}
};

function RoomDetail() {
	const { id } = useParams();
	const room = mockRooms[id] || mockRooms[1];

	return (
		<div className="flex min-h-screen">
			<DSideBar menuItems={userMenu} />

			<main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
				<header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">{room.name}</h1>
						<Link to="/user/study-rooms" className="text-blue-300 hover:text-blue-200 text-sm"><FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>Back to rooms</Link>
					</div>
				</header>

				<section className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
						<h2 className="text-xl font-semibold mb-2">About</h2>
						<p className="text-blue-200 mb-4">{room.description}</p>
						<div className="flex items-center gap-4 text-sm text-blue-200 mb-4">
							<span><FontAwesomeIcon icon={faUsers} className="mr-1" /> {room.participants}/{room.maxParticipants}</span>
							<span><FontAwesomeIcon icon={faClock} className="mr-1" /> {room.nextSession}</span>
							<span className={`px-2 py-1 rounded-full text-xs ${room.type === 'public' ? 'bg-green-900/30 text-green-300' : 'bg-purple-900/30 text-purple-300'}`}>
								<FontAwesomeIcon icon={room.type === 'public' ? faGlobe : faLock} className="mr-1" />
								{room.type}
							</span>
						</div>
						<div className="bg-white/5 rounded-lg p-4">
							<h3 className="font-semibold mb-2">Rules</h3>
							<p className="text-sm text-blue-200">{room.rules}</p>
						</div>
					</div>

					<div className="bg-white/5 p-6 rounded-xl border border-white/10">
						<h2 className="text-xl font-semibold mb-4">Actions</h2>
						<div className="space-y-3">
							<button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Join Room</button>
							<button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded">Message Members</button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default RoomDetail;
