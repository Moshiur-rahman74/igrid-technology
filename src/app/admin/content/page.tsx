'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, FileEdit, Globe, Layout, Image as ImageIcon } from 'lucide-react';

export default function WebsiteContentPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);

  const [heroContent, setHeroContent] = useState({
    title: 'Industrial Automation Solutions',
    subtitle: 'Empowering Industries with Cutting-Edge Technology',
    ctaText: 'Get Started',
    ctaLink: '/products',
    backgroundImage: '',
  });

  const [aboutContent, setAboutContent] = useState({
    title: 'About IGrid Technology',
    description: 'Leading provider of industrial automation solutions...',
    mission: 'Our mission is to revolutionize industrial automation...',
    vision: 'Our vision is to be the global leader in industrial technology...',
  });

  const [contactContent, setContactContent] = useState({
    email: 'info@igrid-technology.com',
    phone: '+1 (555) 123-4567',
    address: '123 Industrial Ave, Tech City, TC 12345',
    workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
  });

  const handleSave = async (section: string) => {
    setSaving(true);
    // Simulate save - in production, this would save to a database or CMS
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert(`${section} content saved successfully!`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Content</h1>
          <p className="text-gray-600 mt-1">Manage website content and settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('hero')}
                className={`${
                  activeTab === 'hero'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Layout className="w-4 h-4 mr-2" />
                Hero Section
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`${
                  activeTab === 'about'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileEdit className="w-4 h-4 mr-2" />
                About Section
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`${
                  activeTab === 'contact'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Contact Info
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={heroContent.title}
                    onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={heroContent.ctaText}
                      onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CTA Button Link
                    </label>
                    <input
                      type="text"
                      value={heroContent.ctaLink}
                      onChange={(e) => setHeroContent({ ...heroContent, ctaLink: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    value={heroContent.backgroundImage}
                    onChange={(e) => setHeroContent({ ...heroContent, backgroundImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="https://example.com/hero-bg.jpg"
                  />
                </div>

                <button
                  onClick={() => handleSave('Hero')}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">About Section</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={aboutContent.title}
                    onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={aboutContent.description}
                    onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mission
                  </label>
                  <textarea
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vision
                  </label>
                  <textarea
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <button
                  onClick={() => handleSave('About')}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactContent.email}
                    onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactContent.phone}
                    onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={contactContent.address}
                    onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={contactContent.workingHours}
                    onChange={(e) => setContactContent({ ...contactContent, workingHours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <button
                  onClick={() => handleSave('Contact')}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Content Management</h3>
              <p className="text-sm text-blue-700 mt-1">
                Changes made here will be reflected across the website. In production, this would be connected to a CMS or database for persistent storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
