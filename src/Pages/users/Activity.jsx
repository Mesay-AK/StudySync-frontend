import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
	faHouse,
	faComments,
	faMessage,
	faBook,
	faChartBar,
	faGear,
	faClock,
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

const items = [
	{ id: 1, type: 'room', title: 'Joined Advanced Calculus', time: '2h ago' },
	{ id: 2, type: 'material', title: 'Uploaded Physics Notes', time: '4h ago' },
	{ id: 3, type: 'message', title: 'Chatted with Alex', time: '6h ago' },
	{ id: 4, type: 'study', title: '2h in Physics Lab', time: 'Yesterday' }
];

function Activity() {
	return (
		<div className="flex min-h-screen">
			<DSideBar menuItems={userMenu} />

			<main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
				<header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Recent Activity</h1>
						<Link to="/user/dashboard" className="text-blue-300 hover:text-blue-200 text-sm">Back to dashboard →</Link>
					</div>
				</header>

				<section className="max-w-3xl mx-auto p-6">
					<div className="bg-white/5 rounded-xl border border-white/10 divide-y divide-white/10">
						{items.map(i => (
							<div key={i.id} className="p-4 flex items-center gap-3">
								<FontAwesomeIcon icon={faClock} className="text-blue-300" />
								<div className="flex-1">
									<p className="text-white text-sm">{i.title}</p>
									<p className="text-xs text-blue-200">{i.time}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Activity;
