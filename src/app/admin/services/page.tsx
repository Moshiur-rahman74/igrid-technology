'use client';

import { useState } from 'react';
import { services as localServices } from '@/data/services';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: string;
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>(
    localServices.map(s => ({ ...s, status: 'active' }))
  );
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    status: 'active',
  });

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      status: service.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      setServices(services.map(s =>
        s.id === editingService.id ? { ...formData, id: editingService.id } : s
      ));
    } else {
      const newService: Service = {
        ...formData,
        id: formData.slug.toLowerCase().replace(/\s+/g, '-'),
      };
      setServices([...services, newService]);
    }
    
    setShowModal(false);
    setEditingService(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#0a192f] tracking-tight">Service Management</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage engineering services and service quotation requests
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button onClick={handleAdd} variant="primary" size="lg" className="flex items-center gap-2">
                <Plus size={20} />
                Add Service
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Services</p>
                  <p className="text-4xl font-bold text-[#0a192f] mt-2">{services.length}</p>
                </div>
                <div className="bg-[#00d4ff] p-4 rounded-xl shadow-lg">
                  <Settings className="w-7 h-7 text-[#0a192f]" />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Active Services</p>
                  <p className="text-4xl font-bold text-[#0a192f] mt-2">
                    {services.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="bg-green-500 p-4 rounded-xl shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Service Quotations</p>
                  <p className="text-4xl font-bold text-[#0a192f] mt-2">0</p>
                  <p className="text-xs text-gray-500 mt-1">* Pending database integration</p>
                </div>
                <div className="bg-purple-500 p-4 rounded-xl shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-bold text-[#0a192f] tracking-tight">All Services</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] w-full md:w-64"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-[#0a192f]">{service.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{service.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {service.shortDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                            service.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="p-2 text-[#00d4ff] hover:bg-[#00d4ff]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredServices.length)} of{' '}
                  {filteredServices.length} services
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-[#0a192f]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Note about database integration */}
          <Card className="mt-8 bg-[#0a192f] border-[#1e3a5f]">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00d4ff]" />
                Database Integration Note
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Currently, services are managed using local data (src/data/services.ts). 
                This page is structured to easily migrate to Supabase database management. 
                To enable full database integration, create a services table in Supabase and 
                update this component to use the Supabase client for CRUD operations.
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-premium-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                placeholder="service-name (lowercase, hyphens)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                required
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setEditingService(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
  );
}
