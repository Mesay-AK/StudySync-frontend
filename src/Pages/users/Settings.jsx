import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
	faHouse,
	faComments,
	faMessage,
	faBook,
	faUser,
	faChartBar,
	faGear,
	faBell,
	faLock,
	faSave,
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

function Settings() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [privacy, setPrivacy] = useState('friends');
	const [twoFactor, setTwoFactor] = useState(false);

	const handleSave = () => {
		console.log('Saving settings', { emailNotifications, pushNotifications, privacy, twoFactor });
	};

	return (
		<div className="flex min-h-screen">
			<DSideBar menuItems={userMenu} />

			<main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
				<header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Settings</h1>
						<Link to="/user/dashboard" className="text-blue-300 hover:text-blue-200 text-sm">Back to dashboard →</Link>
					</div>
				</header>

				<section className="max-w-4xl mx-auto p-6 space-y-6">
					<div className="bg-white/5 p-6 rounded-xl border border-white/10">
						<h2 className="text-xl font-semibold mb-4"><FontAwesomeIcon icon={faBell} className="mr-2"/> Notifications</h2>
						<div className="space-y-4">
							<label className="flex items-center justify-between">
								<span className="text-blue-200">Email notifications</span>
								<input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
							</label>
							<label className="flex items-center justify-between">
								<span className="text-blue-200">Push notifications</span>
								<input type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} />
							</label>
						</div>
					</div>

					<div className="bg-white/5 p-6 rounded-xl border border-white/10">
						<h2 className="text-xl font-semibold mb-4"><FontAwesomeIcon icon={faLock} className="mr-2"/> Privacy & Security</h2>
						<div className="space-y-4">
							<label className="block">
								<span className="text-blue-200">Profile visibility</span>
								<select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="mt-2 bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2">
									<option value="public" className="bg-blue-800">Public</option>
									<option value="friends" className="bg-blue-800">Friends</option>
									<option value="private" className="bg-blue-800">Private</option>
								</select>
							</label>
							<label className="flex items-center justify-between">
								<span className="text-blue-200">Two-factor authentication</span>
								<input type="checkbox" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
							</label>
						</div>
					</div>

					<div className="flex justify-end">
						<button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
							<FontAwesomeIcon icon={faSave} /> Save Changes
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Settings;
