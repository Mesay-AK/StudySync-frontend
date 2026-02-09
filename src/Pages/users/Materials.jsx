import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faMessage, faBook,faChartBar, faGear,
  faSearch, faBell,
  faHouse, faRightFromBracket, faFilter, faSort, faDownload,
  faFile, faFilePdf, faFileWord, faFileImage, faFileVideo, faFileAudio,
  faUpload, faShare, faHeart, faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import DashboardCard from '../../components/DashboardCard';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const userMenu = [
  { name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
  { name: 'Analytics', href: '/user/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockMaterials = [
  {
    id: 1,
    name: "Calculus Cheat Sheet",
    type: "pdf",
    size: "2.4 MB",
    uploader: "Alex Johnson",
    uploadDate: "2023-06-10",
    downloads: 45,
    likes: 12,
    description: "Comprehensive cheat sheet covering derivatives, integrals, and common formulas",
    subject: "Mathematics",
    tags: ["Calculus", "Math", "Formulas"],
    isBookmarked: true,
    isLiked: false
  },
  {
    id: 2,
    name: "Physics Lab Report Template",
    type: "doc",
    size: "1.1 MB",
    uploader: "Dr. Smith",
    uploadDate: "2023-06-08",
    downloads: 23,
    likes: 8,
    description: "Standard template for physics lab reports with formatting guidelines",
    subject: "Physics",
    tags: ["Physics", "Lab", "Template"],
    isBookmarked: false,
    isLiked: true
  },
  {
    id: 3,
    name: "Algorithm Complexity Analysis",
    type: "pdf",
    size: "3.2 MB",
    uploader: "Maria Garcia",
    uploadDate: "2023-06-05",
    downloads: 67,
    likes: 15,
    description: "Detailed analysis of time and space complexity for common algorithms",
    subject: "Computer Science",
    tags: ["Algorithms", "CS", "Complexity"],
    isBookmarked: true,
    isLiked: false
  },
  {
    id: 4,
    name: "Organic Chemistry Reactions",
    type: "pdf",
    size: "4.1 MB",
    uploader: "James Wilson",
    uploadDate: "2023-06-03",
    downloads: 34,
    likes: 9,
    description: "Comprehensive guide to organic chemistry reactions and mechanisms",
    subject: "Chemistry",
    tags: ["Chemistry", "Organic", "Reactions"],
    isBookmarked: false,
    isLiked: false
  },
  {
    id: 5,
    name: "Biology Study Notes - Cell Division",
    type: "pdf",
    size: "2.8 MB",
    uploader: "Sarah Chen",
    uploadDate: "2023-06-01",
    downloads: 28,
    likes: 6,
    description: "Detailed notes on mitosis and meiosis with diagrams",
    subject: "Biology",
    tags: ["Biology", "Cell Division", "Notes"],
    isBookmarked: true,
    isLiked: true
  }
];

const fileTypeIcons = {
  pdf: faFilePdf,
  doc: faFileWord,
  docx: faFileWord,
  jpg: faFileImage,
  jpeg: faFileImage,
  png: faFileImage,
  gif: faFileImage,
  mp4: faFileVideo,
  avi: faFileVideo,
  mp3: faFileAudio,
  wav: faFileAudio,
  default: faFile
};

const subjects = ['all', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];
const fileTypes = ['all', 'pdf', 'doc', 'docx', 'jpg', 'png', 'mp4', 'mp3'];
const sortOptions = ['name', 'date', 'downloads', 'likes', 'size'];

function Materials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(6);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter and sort materials
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesFileType = selectedFileType === 'all' || material.type === selectedFileType;
    return matchesSearch && matchesSubject && matchesFileType;
  });

  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'downloads':
        return b.downloads - a.downloads;
      case 'likes':
        return b.likes - a.likes;
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = sortedMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  const handleDownload = (materialId) => {
    console.log(`Downloading material ${materialId}`);
  };

  const handleLike = (materialId) => {
    console.log(`Liking material ${materialId}`);
  };

  const handleBookmark = (materialId) => {
    console.log(`Bookmarking material ${materialId}`);
  };

  // const handleShare = (materialId) => {
  //   console.log(`Sharing material ${materialId}`);
  // };

  const getFileIcon = (fileType) => {
    return fileTypeIcons[fileType] || fileTypeIcons.default;
  };

  const getFileTypeColor = (fileType) => {
    const colors = {
      pdf: 'text-red-400',
      doc: 'text-blue-400',
      docx: 'text-blue-400',
      jpg: 'text-green-400',
      jpeg: 'text-green-400',
      png: 'text-green-400',
      gif: 'text-green-400',
      mp4: 'text-purple-400',
      avi: 'text-purple-400',
      mp3: 'text-orange-400',
      wav: 'text-orange-400',
      default: 'text-gray-400'
    };
    return colors[fileType] || colors.default;
  };

  const totalDownloads = mockMaterials.reduce((sum, material) => sum + material.downloads, 0);
  const totalLikes = mockMaterials.reduce((sum, material) => sum + material.likes, 0);
  const bookmarkedMaterials = mockMaterials.filter(material => material.isBookmarked).length;

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={userMenu} />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md py-4 px-5 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-5">
            <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent"> Your Materials </h1>
            <p className="text-blue-200">Share and discover study resources with your peers</p>
          </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faUpload} />
                Upload Material
              </button>
              <Link to="/user/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></Link>
              <NotificationsDropdown />
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Total Materials" 
              value={mockMaterials.length} 
              change="Available resources"
              icon={<FontAwesomeIcon icon={faBook} />}
              color="blue"
              link="/user/materials"
            />
            <DashboardCard 
              title="Total Downloads" 
              value={totalDownloads} 
              change="Across all materials"
              icon={<FontAwesomeIcon icon={faDownload} />}
              color="green"
              link="/user/materials"
            />
            <DashboardCard 
              title="Total Likes" 
              value={totalLikes} 
              change="Community appreciation"
              icon={<FontAwesomeIcon icon={faHeart} />}
              color="purple"
              link="/user/materials"
            />
            <DashboardCard 
              title="Bookmarked" 
              value={bookmarkedMaterials} 
              change="Your saved materials"
              icon={<FontAwesomeIcon icon={faBookmark} />}
              color="orange"
              link="/user/materials"
            />
          </div>

          {/* Filters */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-blue-800">
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fileTypes.map(type => (
                    <option key={type} value={type} className="bg-blue-800">
                      {type === 'all' ? 'All Types' : type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSort} className="text-blue-300" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option} className="bg-blue-800">
                      Sort by {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-blue-200 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentMaterials.map(material => (
              <div key={material.id} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      material.type === 'pdf' ? 'bg-red-900/30' :
                      material.type === 'doc' || material.type === 'docx' ? 'bg-blue-900/30' :
                      material.type === 'jpg' || material.type === 'jpeg' || material.type === 'png' ? 'bg-green-900/30' :
                      material.type === 'mp4' || material.type === 'avi' ? 'bg-purple-900/30' :
                      'bg-gray-900/30'
                    }`}>
                      <FontAwesomeIcon 
                        icon={getFileIcon(material.type)} 
                        className={`text-xl ${getFileTypeColor(material.type)}`} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">{material.name}</h3>
                      <p className="text-sm text-blue-200">{material.subject} • {material.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBookmark(material.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        material.isBookmarked 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : 'bg-white/10 text-blue-300 hover:bg-white/20'
                      }`}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                    </button>
                    <button className="p-2 rounded-lg bg-white/10 text-blue-300 hover:bg-white/20 transition-colors">
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-blue-200 mb-4">{material.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {material.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-blue-200 mb-4">
                  <span>By {material.uploader}</span>
                  <span>{material.uploadDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-blue-200">
                    <span><FontAwesomeIcon icon={faDownload} className="mr-1" /> {material.downloads}</span>
                    <button
                      onClick={() => handleLike(material.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        material.isLiked ? 'text-red-300' : 'text-blue-200 hover:text-red-300'
                      }`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      {material.likes}
                    </button>
                  </div>
                  <button
                    onClick={() => handleDownload(material.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Previous
            </button>
            <span className="text-blue-200">
              Page {currentPage} of {Math.ceil(sortedMaterials.length / materialsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(sortedMaterials.length / materialsPerPage)))}
              disabled={currentPage === Math.ceil(sortedMaterials.length / materialsPerPage)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Materials;
