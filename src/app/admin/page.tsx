import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage products, configurations, and user requests.
            </p>
          </div>
        </Section>

        <Section>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">0</div>
                <div className="text-gray-600">Active Configurations</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">0</div>
                <div className="text-gray-600">Quote Requests</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">0</div>
                <div className="text-gray-600">Products</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">0</div>
                <div className="text-gray-600">Users</div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Quick Actions">
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    Manage Products
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    View Quote Requests
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    Manage Configurations
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    User Management
                  </button>
                </div>
              </Card>
              <Card title="System Status">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Database</span>
                    <span className="text-green-600 font-semibold">Connected</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">API Status</span>
                    <span className="text-green-600 font-semibold">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Server</span>
                    <span className="text-green-600 font-semibold">Running</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
