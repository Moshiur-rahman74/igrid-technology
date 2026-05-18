'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, Eye, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

interface QuotationRequest {
  id: string;
  customer_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  country?: string;
  industry_type?: string;
  machine_type?: string;
  budget_range?: string;
  selected_products: any[];
  estimated_cost?: number;
  message?: string;
  status: string;
  created_at: string;
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('quotation_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setQuotations(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('quotation_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      fetchQuotations();
    }
  };

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.company_name && q.company_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      quoted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'quoted':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotation Requests</h1>
          <p className="text-gray-600 mt-1">Manage customer quotation requests</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search quotations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="quoted">Quoted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Quotations Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            Loading...
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {quotation.customer_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {quotation.company_name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{quotation.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {quotation.budget_range || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(quotation.status)}`}
                      >
                        {getStatusIcon(quotation.status)}
                        <span className="ml-1 capitalize">{quotation.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(quotation.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedQuotation(quotation);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {quotation.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(quotation.id, 'reviewed')}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Reviewed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {quotation.status === 'reviewed' && (
                          <button
                            onClick={() => updateStatus(quotation.id, 'quoted')}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Quoted"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => updateStatus(quotation.id, 'closed')}
                          className="text-red-600 hover:text-red-800"
                          title="Close"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredQuotations.length === 0 && (
              <div className="p-8 text-center text-gray-500">No quotation requests found</div>
            )}
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedQuotation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Quotation Details</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedQuotation.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedQuotation.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedQuotation.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedQuotation.company_name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{selectedQuotation.country || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium">{selectedQuotation.industry_type || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Project Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Machine Type</p>
                      <p className="font-medium">{selectedQuotation.machine_type || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget Range</p>
                      <p className="font-medium">{selectedQuotation.budget_range || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                      <p className="font-medium">
                        {selectedQuotation.estimated_cost
                          ? `$${selectedQuotation.estimated_cost.toFixed(2)}`
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selected Products */}
                {selectedQuotation.selected_products && selectedQuotation.selected_products.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Products</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedQuotation.selected_products.map((product: any, index: number) => (
                          <li key={index} className="text-sm">
                            • {product.name || `Product ${index + 1}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Message */}
                {selectedQuotation.message && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{selectedQuotation.message}</p>
                    </div>
                  </div>
                )}

                {/* Status Update */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Update Status</h3>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedQuotation.status}
                      onChange={(e) => updateStatus(selectedQuotation.id, e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
