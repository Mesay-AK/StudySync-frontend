import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faGear,
  faBell,
  faUser,
  faBook,
  faFileAlt,
  faFilePdf,
  faFileWord,
  faFileImage,
  faFileVideo,
  faFileAudio,
  faFileCode,
  faFileArchive,
  faTrashAlt,
  faEdit,
  faDownload,
  faEye,
  faPlus,
  faFilter,
  faHouse,
  faUsers,
  faComments,
  faFlag,
  faRightFromBracket,
  faChartBar,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import NotificationsDropdown from '../../components/NotificationsDropdown.jsx';

const adminMenu = [
  { name: 'Home', href: '/admin/home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

// Mock materials data
const mockMaterials = [
  {
    id: 1,
    name: 'Advanced Calculus Notes',
    type: 'pdf',
    size: '2.4 MB',
    uploadedBy: 'Dr. Smith',
    uploadDate: '2024-02-15',
    downloads: 156,
    views: 423,
    tags: ['calculus', 'mathematics', 'notes'],
    description: 'Comprehensive notes covering advanced calculus topics',
    category: 'Mathematics'
  },
  {
    id: 2,
    name: 'Quantum Physics Lecture Slides',
    type: 'pptx',
    size: '5.7 MB',
    uploadedBy: 'Prof. Higgs',
    uploadDate: '2024-02-14',
    downloads: 89,
    views: 234,
    tags: ['physics', 'quantum', 'lecture'],
    description: 'Detailed lecture slides on quantum mechanics',
    category: 'Physics'
  },
  {
    id: 3,
    name: 'Programming Fundamentals',
    type: 'doc',
    size: '1.8 MB',
    uploadedBy: 'Dr. Code',
    uploadDate: '2024-02-13',
    downloads: 245,
    views: 567,
    tags: ['programming', 'computer-science', 'basics'],
    description: 'Introduction to programming concepts',
    category: 'Computer Science'
  }
];

const MaterialsManagement = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: 'pdf',
    category: '',
    description: '',
    tags: ''
  });

  // Filter materials
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Pagination
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new material
  const addMaterial = () => {
    if (newMaterial.name && newMaterial.category) {
      const material = {
        id: Date.now(),
        name: newMaterial.name,
        type: newMaterial.type,
        size: '0 KB', // This would be calculated from the actual file
        uploadedBy: 'Admin', // This would be the current user
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        views: 0,
        tags: newMaterial.tags.split(',').map(tag => tag.trim()),
        description: newMaterial.description,
        category: newMaterial.category
      };
      
      setMaterials([material, ...materials]);
      setNewMaterial({
        name: '',
        type: 'pdf',
        category: '',
        description: '',
        tags: ''
      });
      setShowUploadForm(false);
    }
  };

  // Delete material
  const deleteMaterial = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };

  // Get icon for file type
  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return faFilePdf;
      case 'doc':
      case 'docx': return faFileWord;
      case 'jpg':
      case 'jpeg':
      case 'png': return faFileImage;
      case 'mp4':
      case 'avi': return faFileVideo;
      case 'mp3':
      case 'wav': return faFileAudio;
      case 'js':
      case 'py':
      case 'java': return faFileCode;
      case 'zip':
      case 'rar': return faFileArchive;
      default: return faFileAlt;
    }
  };

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={adminMenu} title="StudyPlatform" />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
            <ul className="flex items-center gap-8 mr-12">
              <li><a href="/admin/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></a></li>
              <li>
                <NotificationsDropdown />
              </li>
              <li><a href="/admin/user-profile" className="hover:text-blue-400"><FontAwesomeIcon icon={faUser} /></a></li>
            </ul>
          </div>
        </header>

        <section className="max-w-7xl mx-auto p-6">
          {/* Material Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 mx-auto">
            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-700">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faBook} />
                Total Materials
              </h3>
              <p className="text-2xl font-bold">{materials.length}</p>
              <p className="text-sm text-gray-300 mt-1">Available resources</p>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-700">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faDownload} />
                Total Downloads
              </h3>
              <p className="text-2xl font-bold">
                {materials.reduce((acc, material) => acc + material.downloads, 0)}
              </p>
              <p className="text-sm text-gray-300 mt-1">Across all materials</p>
            </div>
            <div className="bg-green-900/20 p-4 rounded-xl border border-green-700">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faEye} />
                Total Views
              </h3>
              <p className="text-2xl font-bold">
                {materials.reduce((acc, material) => acc + material.views, 0)}
              </p>
              <p className="text-sm text-gray-300 mt-1">Material views</p>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-700">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faFileAlt} />
                Categories
              </h3>
              <p className="text-2xl font-bold">
                {new Set(materials.map(m => m.category)).size}
              </p>
              <p className="text-sm text-gray-300 mt-1">Unique categories</p>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  className="bg-transparent text-white focus:outline-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="pptx">Presentation</option>
                  <option value="mp4">Video</option>
                  <option value="mp3">Audio</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  className="bg-transparent text-white focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {Array.from(new Set(materials.map(m => m.category))).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FontAwesomeIcon icon={showUploadForm ? faTimes : faPlus} />
              {showUploadForm ? 'Cancel' : 'Upload Material'}
            </button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <div className="bg-blue-900/10 p-6 rounded-xl mb-6 border border-blue-900/20">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} />
                Upload New Material
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Material Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newMaterial.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Enter material name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newMaterial.category}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">File Type</label>
                  <select
                    name="type"
                    value={newMaterial.type}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                  >
                    <option value="pdf">PDF</option>
                    <option value="doc">Document</option>
                    <option value="pptx">Presentation</option>
                    <option value="mp4">Video</option>
                    <option value="mp3">Audio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-1">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={newMaterial.tags}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Enter tags (comma-separated)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newMaterial.description}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                    placeholder="Enter material description"
                    rows="3"
                  />
                </div>
              </div>
              <button
                onClick={addMaterial}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Upload Material
              </button>
            </div>
          )}

          {/* Materials Table */}
          <div className="bg-white/10 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-gray-700">
                {currentMaterials.map(material => (
                  <tr key={material.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{material.name}</div>
                      <div className="text-sm text-gray-400">{material.description}</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {material.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-blue-900/20 text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={getFileTypeIcon(material.type)} className="text-blue-300" />
                        <span className="text-sm">{material.type.toUpperCase()}</span>
                      </div>
                      <div className="text-sm text-gray-400">{material.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{material.uploadedBy}</div>
                      <div className="text-sm text-gray-400">{material.uploadDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{material.downloads}</div>
                          <div className="text-xs text-gray-400">Downloads</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{material.views}</div>
                          <div className="text-xs text-gray-400">Views</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button 
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-600/20 text-blue-300"
                        title="View"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-green-500/10 hover:bg-green-600/20 text-green-300"
                        title="Download"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-600/20 text-yellow-300"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        onClick={() => deleteMaterial(material.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600/20 text-red-300"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={indexOfLastMaterial >= filteredMaterials.length}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-300">
                    Showing <span className="font-medium">{indexOfFirstMaterial + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastMaterial, filteredMaterials.length)}</span> of{' '}
                    <span className="font-medium">{filteredMaterials.length}</span> results
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={indexOfLastMaterial >= filteredMaterials.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MaterialsManagement; 