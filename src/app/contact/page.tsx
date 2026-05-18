import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FeedbackForm from '@/components/FeedbackForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Contact & Request Quote</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our experts for consultation and quotes.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <Card title="Contact Information">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#0a192f] mb-1">Email</h3>
                  <p className="text-gray-600">contact@igridtechnology.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a192f] mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a192f] mb-1">Address</h3>
                  <p className="text-gray-600">123 Industrial Park<br />Tech City, TC 12345</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a192f] mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </Card>

            <Card title="Request a Quote">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff]" />
                </div>
                <button type="submit" className="w-full bg-[#00d4ff] text-[#0a192f] font-semibold py-3 rounded-md hover:bg-[#00b8e6] transition-colors">
                  Submit Request
                </button>
              </form>
            </Card>
          </div>
        </Section>

        <Section background="light">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0a192f] mb-4">Share Your Feedback</h2>
              <p className="text-gray-600">
                We value your opinion. Help us improve our products and services by sharing your experience.
              </p>
            </div>
            <Card>
              <FeedbackForm />
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
