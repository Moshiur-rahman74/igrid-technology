'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, Search, GitBranch, AlertCircle } from 'lucide-react';

interface CompatibilityRule {
  id: string;
  product_id: string;
  compatible_product_id: string;
  rule_type: string;
  description?: string;
  status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  model: string;
}

export default function CompatibilityPage() {
  const [rules, setRules] = useState<CompatibilityRule[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<CompatibilityRule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    product_id: '',
    compatible_product_id: '',
    rule_type: 'required',
    description: '',
    status: 'active',
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [rulesRes, productsRes] = await Promise.all([
      supabase.from('compatibility_rules').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('id, name, model'),
    ]);

    if (rulesRes.data) setRules(rulesRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingRule(null);
    setFormData({
      product_id: '',
      compatible_product_id: '',
      rule_type: 'required',
      description: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleEdit = (rule: CompatibilityRule) => {
    setEditingRule(rule);
    setFormData({
      product_id: rule.product_id,
      compatible_product_id: rule.compatible_product_id,
      rule_type: rule.rule_type,
      description: rule.description || '',
      status: rule.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this compatibility rule?')) return;

    const { error } = await supabase.from('compatibility_rules').delete().eq('id', id);
    if (error) {
      alert('Error deleting rule: ' + error.message);
    } else {
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.product_id === formData.compatible_product_id) {
      alert('Source and target products cannot be the same');
      return;
    }

    const ruleData = {
      product_id: formData.product_id,
      compatible_product_id: formData.compatible_product_id,
      rule_type: formData.rule_type,
      description: formData.description || null,
      status: formData.status,
    };

    let error;
    if (editingRule) {
      const res = await supabase.from('compatibility_rules').update(ruleData).eq('id', editingRule.id);
      error = res.error;
    } else {
      const res = await supabase.from('compatibility_rules').insert(ruleData);
      error = res.error;
    }

    if (error) {
      alert('Error saving rule: ' + error.message);
    } else {
      setShowModal(false);
      fetchData();
    }
  };

  const filteredRules = rules.filter((rule) => {
    const sourceProduct = products.find((p) => p.id === rule.product_id);
    const targetProduct = products.find((p) => p.id === rule.compatible_product_id);
    const searchTermLower = searchTerm.toLowerCase();
    return (
      sourceProduct?.name.toLowerCase().includes(searchTermLower) ||
      targetProduct?.name.toLowerCase().includes(searchTermLower) ||
      rule.rule_type.toLowerCase().includes(searchTermLower)
    );
  });

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product ? `${product.name} (${product.model})` : 'Unknown Product';
  };

  const getRuleTypeBadge = (type: string) => {
    const badges = {
      required: 'bg-red-100 text-red-800',
      recommended: 'bg-blue-100 text-blue-800',
      incompatible: 'bg-gray-100 text-gray-800',
      optional: 'bg-green-100 text-green-800',
    };
    return badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getRuleTypeIcon = (type: string) => {
    switch (type) {
      case 'required':
        return <AlertCircle className="w-4 h-4" />;
      case 'incompatible':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <GitBranch className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compatibility Rules</h1>
            <p className="text-gray-600 mt-1">Manage product compatibility relationships</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-[#00d4ff] text-white rounded-md hover:bg-[#00b8e6] transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Rule
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Rules Table */}
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
                    Source Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rule Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{getProductName(rule.product_id)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getProductName(rule.compatible_product_id)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRuleTypeBadge(rule.rule_type)}`}
                      >
                        {getRuleTypeIcon(rule.rule_type)}
                        <span className="ml-1 capitalize">{rule.rule_type}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {rule.description || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          rule.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(rule)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rule.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRules.length === 0 && (
              <div className="p-8 text-center text-gray-500">No compatibility rules found</div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingRule ? 'Edit Compatibility Rule' : 'Add New Rule'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Product *
                  </label>
                  <select
                    required
                    value={formData.product_id}
                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  >
                    <option value="">Select source product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.model})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Product *
                  </label>
                  <select
                    required
                    value={formData.compatible_product_id}
                    onChange={(e) => setFormData({ ...formData, compatible_product_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  >
                    <option value="">Select target product</option>
                    {products
                      .filter((p) => p.id !== formData.product_id)
                      .map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.model})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rule Type *</label>
                  <select
                    required
                    value={formData.rule_type}
                    onChange={(e) => setFormData({ ...formData, rule_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  >
                    <option value="required">Required</option>
                    <option value="recommended">Recommended</option>
                    <option value="optional">Optional</option>
                    <option value="incompatible">Incompatible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                    placeholder="Explain why this compatibility rule exists..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
                    {editingRule ? 'Update Rule' : 'Add Rule'}
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
