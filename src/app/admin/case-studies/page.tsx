'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, Search, Eye, EyeOff, Briefcase } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  content: string;
  image?: string;
  published: boolean;
  status: string;
  published_at?: string;
  created_at: string;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    problem: '',
    solution: '',
    result: '',
    content: '',
    image: '',
    published: false,
    status: 'draft',
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setCaseStudies(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingStudy(null);
    setFormData({
      title: '',
      industry: '',
      problem: '',
      solution: '',
      result: '',
      content: '',
      image: '',
      published: false,
      status: 'draft',
    });
    setShowModal(true);
  };

  const handleEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setFormData({
      title: study.title,
      industry: study.industry,
      problem: study.problem,
      solution: study.solution,
      result: study.result,
      content: study.content,
      image: study.image || '',
      published: study.published,
      status: study.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) {
      alert('Error deleting case study: ' + error.message);
    } else {
      fetchCaseStudies();
    }
  };

  const togglePublish = async (study: CaseStudy) => {
    const { error } = await supabase
      .from('case_studies')
      .update({
        published: !study.published,
        status: !study.published ? 'published' : 'draft',
        published_at: !study.published ? new Date().toISOString() : null,
      })
      .eq('id', study.id);

    if (error) {
      alert('Error updating case study: ' + error.message);
    } else {
      fetchCaseStudies();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const studyData = {
      title: formData.title,
      industry: formData.industry,
      problem: formData.problem,
      solution: formData.solution,
      result: formData.result,
      content: formData.content,
      image: formData.image || null,
      published: formData.published,
      status: formData.published ? 'published' : 'draft',
      published_at: formData.published && !editingStudy?.published ? new Date().toISOString() : editingStudy?.published_at,
    };

    let error;
    if (editingStudy) {
      const res = await supabase.from('case_studies').update(studyData).eq('id', editingStudy.id);
      error = res.error;
    } else {
      const res = await supabase.from('case_studies').insert(studyData);
      error = res.error;
    }

    if (error) {
      alert('Error saving case study: ' + error.message);
    } else {
      setShowModal(false);
      fetchCaseStudies();
    }
  };

  const filteredStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || study.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
            <p className="text-gray-600 mt-1">Manage customer success stories and case studies</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Case Study
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search case studies..."
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
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Case Studies Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {study.image && (
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        study.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {study.published ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {study.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePublish(study)}
                        className="text-blue-600 hover:text-blue-800"
                        title={study.published ? 'Unpublish' : 'Publish'}
                      >
                        {study.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(study)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(study.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <span className="inline-flex items-center px-2 py-1 text-xs bg-[#00d4ff] bg-opacity-10 text-[#00d4ff] rounded mb-2">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {study.industry}
                  </span>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{study.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{study.problem}</p>

                  <div className="text-xs text-gray-500">
                    {new Date(study.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingStudy ? 'Edit Case Study' : 'Add New Case Study'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="e.g., Manufacturing, Automotive, Healthcare"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Problem *</label>
                  <textarea
                    required
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="Describe the problem the customer was facing..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                  <textarea
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="Describe the solution provided..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Result *</label>
                  <textarea
                    required
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="Describe the results achieved..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="Detailed case study content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 text-[#00d4ff] border-gray-300 rounded focus:ring-[#00d4ff]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition"
                  >
                    {editingStudy ? 'Update Case Study' : 'Create Case Study'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
