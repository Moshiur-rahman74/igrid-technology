'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, Eye, CheckCircle, XCircle, Star, MessageSquare } from 'lucide-react';

interface Feedback {
  id: string;
  name: string;
  email: string;
  company_name?: string;
  rating: number;
  category: string;
  message: string;
  status: string;
  created_at: string;
}

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setFeedbackList(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('feedback')
      .update({ status })
      .eq('id', id);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      fetchFeedback();
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback({ ...selectedFeedback, status });
      }
    }
  };

  const filteredFeedback = feedbackList.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      solved: 'bg-green-100 text-green-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, string> = {
      product_quality: 'bg-purple-100 text-purple-800',
      customer_service: 'bg-blue-100 text-blue-800',
      delivery: 'bg-green-100 text-green-800',
      pricing: 'bg-orange-100 text-orange-800',
      website_experience: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return badges[category] || badges.other;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
          <p className="text-gray-600 mt-1">Manage customer feedback and reviews</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search feedback..."
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
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="solved">Solved</option>
            </select>
          </div>
        </div>

        {/* Feedback Table */}
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
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
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
                {filteredFeedback.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{feedback.name}</p>
                        <p className="text-xs text-gray-500">{feedback.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadge(feedback.category)}`}
                      >
                        {feedback.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {feedback.message}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(feedback.status)}`}
                      >
                        {feedback.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {feedback.status === 'new' && (
                          <button
                            onClick={() => updateStatus(feedback.id, 'reviewed')}
                            className="text-yellow-600 hover:text-yellow-800"
                            title="Mark as Reviewed"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        )}
                        {feedback.status !== 'solved' && (
                          <button
                            onClick={() => updateStatus(feedback.id, 'solved')}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Solved"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFeedback.length === 0 && (
              <div className="p-8 text-center text-gray-500">No feedback found</div>
            )}
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Feedback Details</h2>
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
                      <p className="font-medium">{selectedFeedback.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedFeedback.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedFeedback.company_name || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Rating and Category */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Rating & Category</h3>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Rating</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedFeedback.rating)}
                        <span className="ml-2 font-medium">{selectedFeedback.rating}/5</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getCategoryBadge(selectedFeedback.category)}`}
                      >
                        {selectedFeedback.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Update Status</h3>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedFeedback.status}
                      onChange={(e) => updateStatus(selectedFeedback.id, e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="solved">Solved</option>
                    </select>
                    <span className="text-sm text-gray-500">
                      {selectedFeedback.status === 'new' && 'Feedback is pending review'}
                      {selectedFeedback.status === 'reviewed' && 'Feedback has been reviewed'}
                      {selectedFeedback.status === 'solved' && 'Feedback has been resolved'}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  Submitted on {new Date(selectedFeedback.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
