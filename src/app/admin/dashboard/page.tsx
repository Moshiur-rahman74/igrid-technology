import { createServerSupabaseClient } from '@/lib/admin-auth';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Package,
  Tag,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

async function getDashboardStats() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      totalProducts: 0,
      totalBrands: 0,
      totalQuotations: 0,
      totalFeedback: 0,
      recentQuotations: [],
    };
  }

  const [
    { count: totalProducts },
    { count: totalBrands },
    { count: totalQuotations },
    { count: totalFeedback },
    { data: recentQuotations },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('brands').select('*', { count: 'exact', head: true }),
    supabase.from('quotation_requests').select('*', { count: 'exact', head: true }),
    supabase.from('feedback').select('*', { count: 'exact', head: true }),
    supabase
      .from('quotation_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return {
    totalProducts: totalProducts || 0,
    totalBrands: totalBrands || 0,
    totalQuotations: totalQuotations || 0,
    totalFeedback: totalFeedback || 0,
    recentQuotations: recentQuotations || [],
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Total Brands',
      value: stats.totalBrands,
      icon: Tag,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      title: 'Quotation Requests',
      value: stats.totalQuotations,
      icon: FileText,
      color: 'bg-purple-500',
      trend: '+23%',
    },
    {
      title: 'Feedback',
      value: stats.totalFeedback,
      icon: MessageSquare,
      color: 'bg-orange-500',
      trend: '+8%',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-[#0a192f] tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome to the IGrid Technology Admin Dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-premium border border-gray-200 p-6 hover:shadow-premium-lg transition-all hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{card.title}</p>
                    <p className="text-4xl font-bold text-[#0a192f] mt-2">{card.value}</p>
                    <p className="text-sm font-semibold text-[#10b981] mt-2">{card.trend}</p>
                  </div>
                  <div className={`${card.color} p-4 rounded-xl shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quotation Requests */}
          <div className="bg-white rounded-2xl shadow-premium border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#0a192f] tracking-tight">
                Recent Quotation Requests
              </h2>
            </div>
            <div className="p-6">
              {stats.recentQuotations.length === 0 ? (
                <p className="text-gray-500 text-center py-8 font-medium">No recent quotation requests</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentQuotations.map((quotation: any) => (
                    <div
                      key={quotation.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-premium transition-shadow"
                    >
                      <div>
                        <p className="font-bold text-[#0a192f]">{quotation.customer_name}</p>
                        <p className="text-sm text-gray-600">{quotation.email}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                            quotation.status === 'pending'
                              ? 'bg-[#fef3c7] text-[#d97706]'
                              : quotation.status === 'reviewed'
                              ? 'bg-[#dbeafe] text-[#1d4ed8]'
                              : quotation.status === 'quoted'
                              ? 'bg-[#d1fae5] text-[#059669]'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {quotation.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          {new Date(quotation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Popular Categories - Placeholder */}
          <div className="bg-white rounded-2xl shadow-premium border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#0a192f] tracking-tight flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-[#00d4ff]" />
                Popular Categories
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                {['PLCs', 'HMIs', 'Sensors', 'Drives', 'Industrial PCs'].map(
                  (category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700 font-semibold">{category}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className="bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] h-2.5 rounded-full"
                            style={{ width: `${80 - index * 15}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0a192f]">{80 - index * 15}%</span>
                      </div>
                    </div>
                  )
                )}
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center italic">
                * Placeholder data - will be populated with real analytics
              </p>
            </div>
          </div>
        </div>

        {/* Common Compatibility Warnings - Placeholder */}
        <div className="bg-white rounded-2xl shadow-premium border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#0a192f] tracking-tight flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-[#f59e0b]" />
              Common Compatibility Warnings
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { warning: 'Voltage mismatch', count: 23 },
                { warning: 'Protocol incompatibility', count: 18 },
                { warning: 'I/O count exceeded', count: 12 },
              ].map((item) => (
                <div key={item.warning} className="p-6 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#f59e0b] rounded-xl">
                  <p className="font-bold text-[#92400e]">{item.warning}</p>
                  <p className="text-3xl font-bold text-[#78350f] mt-2">{item.count}</p>
                  <p className="text-sm text-[#92400e] mt-1 font-medium">occurrences this month</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center italic">
              * Placeholder data - will be populated with real analytics
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
