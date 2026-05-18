import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Pricing & Cost Estimation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing for industrial automation solutions.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card title="Starter" description="For small-scale automation">
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#0a192f]">$5,000</span>
                <span className="text-gray-600">/project</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-600">✓ Basic PLC configuration</li>
                <li className="text-gray-600">✓ Up to 10 I/O points</li>
                <li className="text-gray-600">✓ Standard support</li>
                <li className="text-gray-600">✓ 30-day warranty</li>
              </ul>
            </Card>
            <Card title="Professional" description="For growing businesses">
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#0a192f]">$15,000</span>
                <span className="text-gray-600">/project</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-600">✓ Advanced PLC + HMI</li>
                <li className="text-gray-600">✓ Up to 50 I/O points</li>
                <li className="text-gray-600">✓ Priority support</li>
                <li className="text-gray-600">✓ 90-day warranty</li>
              </ul>
            </Card>
            <Card title="Enterprise" description="For large-scale operations">
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#0a192f]">Custom</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-600">✓ Full system integration</li>
                <li className="text-gray-600">✓ Unlimited I/O points</li>
                <li className="text-gray-600">✓ 24/7 dedicated support</li>
                <li className="text-gray-600">✓ Extended warranty</li>
              </ul>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card title="Get a Custom Quote">
              <p className="text-gray-600 mb-6">
                Need a customized solution? Contact us for a detailed cost estimation based on your specific requirements.
              </p>
              <button className="w-full bg-[#00d4ff] text-[#0a192f] font-semibold py-3 rounded-md hover:bg-[#00b8e6] transition-colors">
                Request Quote
              </button>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
