import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock, faGlobe, faInfoCircle,
  faUserShield, faUsers, faFileAlt, faUser,
  faChevronLeft, faDownload, faCalendarAlt,
  faDoorOpen, faChartSimple
} from '@fortawesome/free-solid-svg-icons';



const RoomDetailPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch
        const mockRooms = [
            {
                id: 1,
                name: "Advanced Calculus",
                description: "Weekly study group for Calculus II students",
                type: "public",
                participants: [
                    { id: 1, name: 'Alex Johnson', joined: '2023-06-10T09:15:00', lastActive: '2023-06-10T14:30:00' },
                    { id: 2, name: 'Maria Garcia', joined: '2023-06-10T10:30:00', lastActive: '2023-06-10T14:25:00' },
                ],
                maxCapacity: 20,
                owner: "Dr. Smith",
                created: "2023-06-01",
                isActive: true,
                resources: [
                    { id: 1, name: 'Calculus Cheat Sheet', type: 'pdf', uploaded: '2023-06-08', size: '2.4 MB' },
                    { id: 2, name: 'Lecture Notes Week 5', type: 'doc', uploaded: '2023-06-05', size: '1.1 MB' },
                ],
                schedule: "Mon, Wed, Fri 6-8 PM",
                rules: "No late submissions. Respect all participants.",
                passcode: "math123",
                recentActivity: [
                    { id: 1, type: 'resource', action: 'uploaded', user: 'Dr. Smith', time: '2023-06-10T10:15:00' },
                    { id: 2, type: 'user', action: 'joined', user: 'Maria Garcia', time: '2023-06-10T10:30:00' }
                ]
            }
        ];

        setTimeout(() => {
            const foundRoom = mockRooms.find(r => r.id === parseInt(roomId));
            setRoom(foundRoom);
            setLoading(false);
        }, 500);
    }, [roomId]);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading room details...</p>
                </main>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    <p className="text-xl mb-4">Room not found</p>
                    <button
                        onClick={() => navigate('/admin/study-rooms')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Back to Study Rooms
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
            
            <main className="flex-1">
                {/* Header consistent with your admin dashboard */}
                <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <button 
                            onClick={() => navigate('/admin/study-rooms')}
                            className="flex items-center gap-2 text-blue-300 hover:text-blue-400"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            Back to Study Rooms
                        </button>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                            Room Details
                        </h1>
                        <div className="w-8"></div> {/* Spacer for balance */}
                    </div>
                </header>

                <section className="max-w-7xl mx-auto p-6">
                    {/* Room Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-xl ${
                                room.type === 'private' ? 'bg-purple-900/30 text-purple-300' : 'bg-blue-900/30 text-blue-300'
                            }`}>
                                <FontAwesomeIcon icon={room.type === 'private' ? faLock : faGlobe} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{room.name}</h2>
                                <p className="text-gray-300">{room.description}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm mt-2 md:mt-0 ${
                            room.isActive ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                        }`}>
                            {room.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Room Information Card */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-blue-300" />
                                    Room Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Owner</p>
                                        <p className="font-medium">{room.owner}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Created</p>
                                        <p className="font-medium">{room.created}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Schedule</p>
                                        <p className="font-medium flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-300" />
                                            {room.schedule}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Capacity</p>
                                        <p className="font-medium flex items-center gap-2">
                                            <FontAwesomeIcon icon={faDoorOpen} className="text-blue-300" />
                                            {room.participants.length}/{room.maxCapacity}
                                        </p>
                                    </div>
                                    {room.type === 'private' && (
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-400">Passcode</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <FontAwesomeIcon icon={faUserShield} className="text-purple-300" />
                                                {room.passcode}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Participants Card */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUsers} className="text-blue-300" />
                                        Participants ({room.participants.length})
                                    </h3>
                                    <button className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded hover:bg-blue-800/50">
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {room.participants.map(participant => (
                                        <div key={participant.id} className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faUser} className="text-blue-300" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{participant.name}</p>
                                                    <p className="text-xs text-gray-400">Joined: {new Date(participant.joined).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Last active: {new Date(participant.lastActive).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Resources Card */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-300" />
                                        Shared Resources ({room.resources.length})
                                    </h3>
                                    <button className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded hover:bg-blue-800/50">
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {room.resources.map(resource => (
                                        <div key={resource.id} className="p-3 hover:bg-white/10 rounded-lg">
                                            <div className="flex items-center gap-3 mb-1">
                                                <FontAwesomeIcon icon={faFileAlt} className="text-blue-300" />
                                                <p className="font-medium">{resource.name}</p>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-400 pl-7">
                                                <span>{resource.type.toUpperCase()}</span>
                                                <span>{resource.size}</span>
                                                <span>{resource.uploaded}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity Card */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChartSimple} className="text-blue-300" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {room.recentActivity.map(activity => (
                                        <div key={activity.id} className="text-sm">
                                            <p className="flex items-center gap-2">
                                                <span className="font-medium">{activity.user}</span>
                                                <span>{activity.action}</span>
                                                <span className="text-gray-400">
                                                    {new Date(activity.time).toLocaleTimeString()}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Room Rules Card - Full Width */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <FontAwesomeIcon icon={faUserShield} className="text-blue-300" />
                            Room Rules
                        </h3>
                        <div className="bg-black/20 p-4 rounded-lg">
                            <p className="whitespace-pre-line">{room.rules}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => navigate('/admin/study-rooms')}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            Back to List
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                            <FontAwesomeIcon icon={faDownload} />
                            Export Room Data
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RoomDetailPage;