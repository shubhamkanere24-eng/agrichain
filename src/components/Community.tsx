import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Send, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Plus,
  Camera,
  Video,
  Smile
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    farmerId: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface Farmer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialization: string;
  experience: number;
  isOnline: boolean;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'feed' | 'farmers' | 'discussions'>('feed');
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Suresh Patel',
        avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
        location: 'Gujarat, India',
        farmerId: 'F002'
      },
      content: 'Just harvested my organic tomatoes! The yield this season has been exceptional. Thanks to the new irrigation techniques I learned from this community. 🍅',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      isLiked: false
    },
    {
      id: '2',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        location: 'Punjab, India',
        farmerId: 'F003'
      },
      content: 'Looking for advice on pest control for wheat crops. Has anyone tried organic methods? Would love to hear your experiences.',
      likes: 15,
      comments: 12,
      timestamp: '4 hours ago',
      isLiked: true
    },
    {
      id: '3',
      author: {
        name: 'Rajesh Kumar',
        avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
        location: 'Maharashtra, India',
        farmerId: 'F004'
      },
      content: 'Attended the agricultural fair today. So many innovative farming tools and techniques. The future of farming looks bright! 🌾',
      image: 'https://images.pexels.com/photos/4110254/pexels-photo-4110254.jpeg',
      likes: 32,
      comments: 6,
      timestamp: '6 hours ago',
      isLiked: false
    }
  ]);

  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'Suresh Patel',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
      location: 'Gujarat, India',
      specialization: 'Vegetable Farming',
      experience: 12,
      isOnline: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      location: 'Punjab, India',
      specialization: 'Wheat & Rice',
      experience: 8,
      isOnline: true
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
      location: 'Maharashtra, India',
      specialization: 'Organic Farming',
      experience: 15,
      isOnline: false
    },
    {
      id: '4',
      name: 'Anjali Devi',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      location: 'Karnataka, India',
      specialization: 'Fruit Orchards',
      experience: 10,
      isOnline: true
    }
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: user?.name || 'Unknown',
        avatar: user?.avatar || 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
        location: user?.location || 'India',
        farmerId: user?.farmerId || 'F000'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const tabs = [
    { id: 'feed', name: 'Feed', icon: MessageCircle },
    { id: 'farmers', name: t('community.farmers.nearby'), icon: Users },
    { id: 'discussions', name: t('community.discussion'), icon: MessageCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('community.title')}</h1>
          <p className="text-gray-600 mt-1">{t('community.connect')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex space-x-4">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder={t('community.post.placeholder')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-4">
                        <button type="button" className="flex items-center space-x-2 text-gray-500 hover:text-green-600">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">Photo</span>
                        </button>
                        <button type="button" className="flex items-center space-x-2 text-gray-500 hover:text-green-600">
                          <Video className="w-4 h-4" />
                          <span className="text-sm">Video</span>
                        </button>
                        <button type="button" className="flex items-center space-x-2 text-gray-500 hover:text-green-600">
                          <Smile className="w-4 h-4" />
                          <span className="text-sm">Emoji</span>
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={!newPost.trim()}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {t('community.post.submit')}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{post.author.location}</span>
                      <span>•</span>
                      <span>{post.author.farmerId}</span>
                    </div>
                    
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Farmers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Farmers</h3>
              <div className="space-y-3">
                {farmers.filter(f => f.isOnline).map((farmer) => (
                  <div key={farmer.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={farmer.avatar}
                        alt={farmer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{farmer.name}</p>
                      <p className="text-xs text-gray-500 truncate">{farmer.location}</p>
                    </div>
                    <button className="text-green-600 hover:text-green-700">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New This Week</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'farmers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {farmer.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {farmer.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-medium">{farmer.specialization}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{farmer.experience} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${farmer.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                    {farmer.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Connect
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Discussion Forums</h3>
            <p className="text-gray-600 mb-6">Join topic-based discussions with fellow farmers</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Start a Discussion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;