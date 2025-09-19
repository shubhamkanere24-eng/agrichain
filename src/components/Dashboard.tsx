import React from 'react';
import { 
  Package, 
  CheckCircle, 
  Users, 
  MessageCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      name: t('dashboard.stats.products'),
      value: '24',
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: t('dashboard.stats.verified'),
      value: '18',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: t('dashboard.stats.community'),
      value: '156',
      icon: Users,
      color: 'bg-purple-500',
      change: '+23%'
    },
    {
      name: t('dashboard.stats.messages'),
      value: '42',
      icon: MessageCircle,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const recentProducts = [
    {
      id: 1,
      name: 'Organic Wheat',
      category: 'Grains',
      status: 'verified',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/4110254/pexels-photo-4110254.jpeg'
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      status: 'pending',
      date: '2024-01-14',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
    },
    {
      id: 3,
      name: 'Pure Milk',
      category: 'Dairy',
      status: 'verified',
      date: '2024-01-13',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Agricultural Fair 2024',
      date: '2024-02-15',
      location: 'Punjab Agricultural University'
    },
    {
      id: 2,
      title: 'Organic Farming Workshop',
      date: '2024-02-20',
      location: 'Community Center'
    },
    {
      id: 3,
      title: 'Harvest Festival',
      date: '2024-03-01',
      location: 'Village Ground'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.name}!
            </h1>
            <p className="text-green-100">
              Manage your products, connect with community, and track your farming journey.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {t(`products.status.${product.status}`)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>{product.category}</span>
                      <span>{product.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;