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
	faUsers,
	faBookOpen,
	faFire,
	faArrowUp,
	faArrowDown,
	faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import DashboardCard from '../../components/DashboardCard';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const userMenu = [
	{ name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
	{ name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
	{ name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
	{ name: 'Materials', href: '/user/materials', icon: <FontAwesomeIcon icon={faBook} /> },
	{ name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

function Analytics() {
	return (
		<div className="flex min-h-screen">
			<DSideBar menuItems={userMenu} />

			<main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
				<header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
					<div className="max-w-7xl mx-auto flex items-center justify-between mr-5">
						<div className="flex items-center gap-4"> 
							<Link to="/user/dashboard" className="text-blue-300 hover:text-blue-200 text-sm">← Back</Link>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Your Analytics</h1>
						</div>

						<div className="flex items-center gap-4  mr-12">
						<Link to="/user/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></Link>
						<NotificationsDropdown />	
						</div>					
						
					</div>
				</header>

				<section className="max-w-7xl mx-auto p-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<DashboardCard title="Weekly Study Time" value="12h 40m" change="+8%" icon={<FontAwesomeIcon icon={faClock} />} color="blue" link="/user/analytics" />
						<DashboardCard title="Rooms Active" value="4" change="+1" icon={<FontAwesomeIcon icon={faUsers} />} color="green" link="/user/study-rooms" />
						<DashboardCard title="Materials Viewed" value="32" change="+12%" icon={<FontAwesomeIcon icon={faBookOpen} />} color="purple" link="/user/materials" />
						<DashboardCard title="Streak" value="6 days" change="Keep going" icon={<FontAwesomeIcon icon={faFire} />} color="orange" link="/user/analytics" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
							<h2 className="text-xl font-semibold mb-4">Weekly Trend</h2>
							<div className="h-64 flex items-center justify-center text-blue-200 text-sm">
								Chart placeholder (hook up later)
							</div>
						</div>

						<div className="bg-white/5 p-6 rounded-xl border border-white/10">
							<h2 className="text-xl font-semibold mb-4">Highlights</h2>
							<ul className="space-y-3 text-sm text-blue-200">
								<li className="flex items-center gap-2"><span className="text-green-300"><FontAwesomeIcon icon={faArrowUp} /></span> +24% time in study rooms</li>
								<li className="flex items-center gap-2"><span className="text-red-300"><FontAwesomeIcon icon={faArrowDown} /></span> -10% DM distractions</li>
								<li>3 new materials bookmarked</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Analytics;
