import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our automation solutions.
            </p>
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card title="What types of automation systems do you support?">
              <p className="text-gray-600">
                We support a wide range of automation systems including PLC-based control, CNC machining, 
                robotic integration, production line automation, and process control systems.
              </p>
            </Card>
            <Card title="How long does it take to implement a solution?">
              <p className="text-gray-600">
                Implementation time varies based on complexity. Simple configurations can be deployed 
                within 2-4 weeks, while complex enterprise solutions may take 8-12 weeks.
              </p>
            </Card>
            <Card title="Do you offer ongoing support and maintenance?">
              <p className="text-gray-600">
                Yes, we offer comprehensive support packages including 24/7 monitoring, regular maintenance, 
                and system updates to ensure optimal performance.
              </p>
            </Card>
            <Card title="Can I integrate with existing equipment?">
              <p className="text-gray-600">
                Absolutely. Our solutions are designed to integrate with a wide range of existing industrial 
                equipment and legacy systems.
              </p>
            </Card>
            <Card title="What brands of hardware do you work with?">
              <p className="text-gray-600">
                We work with multiple leading industrial automation brands including Siemens, Allen-Bradley, 
                Mitsubishi, Omron, and more, ensuring flexibility in hardware selection.
              </p>
            </Card>
            <Card title="How do I get started?">
              <p className="text-gray-600">
                Simply contact us through our request quote form or schedule a consultation. Our experts will 
                assess your needs and recommend the best solution for your requirements.
              </p>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
