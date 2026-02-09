import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function Logout() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(true);

	const handleConfirm = () => {
		try {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			localStorage.removeItem('user');
			sessionStorage.clear();
		} catch (error) {
			console.error('Error clearing session storage:', error);
		}
		navigate('/login');
		
	};

	const handleCancel = () => {
		setIsOpen(false);
		navigate(-1);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-600 to-stone-300 flex items-center justify-center p-6 text-white">
			{/* Overlay */}
			{isOpen && <div className="fixed inset-0 bg-black/60" />}

			{/* Modal */}
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl shadow-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center">
								<FontAwesomeIcon icon={faTriangleExclamation} className="text-red-300" />
							</div>
							<h2 className="text-xl font-semibold">Confirm Logout</h2>
						</div>
						<p className="text-blue-200 mb-6">Are you sure you want to log out?</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-end">
							<button onClick={handleCancel} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
								Cancel
							</button>
							<button onClick={handleConfirm} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 flex items-center gap-2">
								<FontAwesomeIcon icon={faRightFromBracket} />
								Log out
							</button>
						</div>
						<div className="mt-4 text-center text-sm text-blue-300">
							Changed your mind? <Link to="/user/dashboard" className="underline hover:text-blue-200">Go back</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Logout;
