import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Products',
    'nav.community': 'Community',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Farmer Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.products': 'Products Registered',
    'dashboard.stats.verified': 'Verified Products',
    'dashboard.stats.community': 'Community Members',
    'dashboard.stats.messages': 'Messages',
    
    // Products
    'products.title': 'My Products',
    'products.register': 'Register New Product',
    'products.name': 'Product Name',
    'products.category': 'Category',
    'products.quantity': 'Quantity',
    'products.price': 'Price per Unit',
    'products.description': 'Description',
    'products.upload.image': 'Upload Product Image',
    'products.upload.certificate': 'Upload Certificate',
    'products.submit': 'Register Product',
    'products.status.pending': 'Pending Verification',
    'products.status.verified': 'Verified',
    'products.status.rejected': 'Rejected',
    
    // Categories
    'category.grains': 'Grains',
    'category.vegetables': 'Vegetables',
    'category.fruits': 'Fruits',
    'category.dairy': 'Dairy',
    'category.organic': 'Organic',
    
    // Community
    'community.title': 'Farmer Community',
    'community.connect': 'Connect with Farmers',
    'community.post.placeholder': 'Share your farming experience...',
    'community.post.submit': 'Post',
    'community.farmers.nearby': 'Nearby Farmers',
    'community.discussion': 'Discussion',
    'community.tips': 'Farming Tips',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.edit': 'Edit Profile',
    'profile.name': 'Full Name',
    'profile.phone': 'Phone Number',
    'profile.location': 'Location',
    'profile.experience': 'Years of Experience',
    'profile.specialization': 'Specialization',
    'profile.save': 'Save Changes',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.upload': 'Upload',
    'common.download': 'Download',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.farmer.id': 'Farmer ID',
    'auth.welcome': 'Welcome to TraceAgri Chain',
    'auth.subtitle': 'Connecting farmers to the supply chain'
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.products': 'उत्पाद',
    'nav.community': 'समुदाय',
    'nav.profile': 'प्रोफाइल',
    'nav.logout': 'लॉगआउट',
    
    // Dashboard
    'dashboard.title': 'किसान डैशबोर्ड',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.stats.products': 'पंजीकृत उत्पाद',
    'dashboard.stats.verified': 'सत्यापित उत्पाद',
    'dashboard.stats.community': 'समुदाय के सदस्य',
    'dashboard.stats.messages': 'संदेश',
    
    // Products
    'products.title': 'मेरे उत्पाद',
    'products.register': 'नया उत्पाद पंजीकृत करें',
    'products.name': 'उत्पाद का नाम',
    'products.category': 'श्रेणी',
    'products.quantity': 'मात्रा',
    'products.price': 'प्रति यूनिट मूल्य',
    'products.description': 'विवरण',
    'products.upload.image': 'उत्पाद की तस्वीर अपलोड करें',
    'products.upload.certificate': 'प्रमाणपत्र अपलोड करें',
    'products.submit': 'उत्पाद पंजीकृत करें',
    'products.status.pending': 'सत्यापन लंबित',
    'products.status.verified': 'सत्यापित',
    'products.status.rejected': 'अस्वीकृत',
    
    // Categories
    'category.grains': 'अनाज',
    'category.vegetables': 'सब्जियां',
    'category.fruits': 'फल',
    'category.dairy': 'डेयरी',
    'category.organic': 'जैविक',
    
    // Community
    'community.title': 'किसान समुदाय',
    'community.connect': 'किसानों से जुड़ें',
    'community.post.placeholder': 'अपना कृषि अनुभव साझा करें...',
    'community.post.submit': 'पोस्ट करें',
    'community.farmers.nearby': 'आसपास के किसान',
    'community.discussion': 'चर्चा',
    'community.tips': 'कृषि सुझाव',
    
    // Profile
    'profile.title': 'मेरी प्रोफाइल',
    'profile.edit': 'प्रोफाइल संपादित करें',
    'profile.name': 'पूरा नाम',
    'profile.phone': 'फोन नंबर',
    'profile.location': 'स्थान',
    'profile.experience': 'अनुभव के वर्ष',
    'profile.specialization': 'विशेषज्ञता',
    'profile.save': 'परिवर्तन सहेजें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.sort': 'क्रमबद्ध करें',
    'common.upload': 'अपलोड',
    'common.download': 'डाउनलोड',
    
    // Auth
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.farmer.id': 'किसान आईडी',
    'auth.welcome': 'TraceAgri Chain में आपका स्वागत है',
    'auth.subtitle': 'किसानों को आपूर्ति श्रृंखला से जोड़ना'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};