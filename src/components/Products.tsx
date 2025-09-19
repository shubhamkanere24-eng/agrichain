import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
  image?: string;
  certificate?: string;
  createdAt: string;
}

const Products: React.FC = () => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Wheat',
      category: 'grains',
      quantity: '100 kg',
      price: '₹25/kg',
      description: 'Premium organic wheat grown without pesticides',
      status: 'verified',
      image: 'https://images.pexels.com/photos/4110254/pexels-photo-4110254.jpeg',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      quantity: '50 kg',
      price: '₹30/kg',
      description: 'Fresh red tomatoes harvested today',
      status: 'pending',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      createdAt: '2024-01-14'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'grains',
    quantity: '',
    price: '',
    description: '',
    image: null as File | null,
    certificate: null as File | null
  });

  const categories = [
    { value: 'grains', label: t('category.grains') },
    { value: 'vegetables', label: t('category.vegetables') },
    { value: 'fruits', label: t('category.fruits') },
    { value: 'dairy', label: t('category.dairy') },
    { value: 'organic', label: t('category.organic') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: formData.quantity,
      price: formData.price,
      description: formData.description,
      status: 'pending',
      image: formData.image ? URL.createObjectURL(formData.image) : undefined,
      certificate: formData.certificate ? URL.createObjectURL(formData.certificate) : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts([newProduct, ...products]);
    setFormData({
      name: '',
      category: 'grains',
      quantity: '',
      price: '',
      description: '',
      image: null,
      certificate: null
    });
    setShowAddForm(false);
  };

  const handleFileUpload = (field: 'image' | 'certificate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('products.title')}</h1>
          <p className="text-gray-600 mt-1">Manage and track your agricultural products</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t('products.register')}</span>
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">{t('products.register')}</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.category')}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.quantity')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 100 kg"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.price')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., ₹25/kg"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('products.description')}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.upload.image')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload('image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : 'Click to upload image'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.upload.certificate')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload('certificate')}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <label
                      htmlFor="certificate-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <FileText className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formData.certificate ? formData.certificate.name : 'Click to upload certificate'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('products.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {product.image && (
              <div className="h-48 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(product.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {t(`products.status.${product.status}`)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('products.category')}:</span>
                  <span className="font-medium">{t(`category.${product.category}`)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('products.quantity')}:</span>
                  <span className="font-medium">{product.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('products.price')}:</span>
                  <span className="font-medium text-green-600">{product.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{product.createdAt}</span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">Start by registering your first agricultural product</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('products.register')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;