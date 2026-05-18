import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function IndustriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Industries We Serve</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering automation solutions across diverse industrial sectors.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Automotive">
              <p className="text-gray-600">
                Assembly line automation, robotic welding, and quality control systems.
              </p>
            </Card>
            <Card title="Aerospace">
              <p className="text-gray-600">
                Precision machining, component testing, and assembly automation.
              </p>
            </Card>
            <Card title="Food & Beverage">
              <p className="text-gray-600">
                Processing automation, packaging systems, and hygiene control.
              </p>
            </Card>
            <Card title="Pharmaceutical">
              <p className="text-gray-600">
                Precision dispensing, packaging, and compliance automation.
              </p>
            </Card>
            <Card title="Metal Fabrication">
              <p className="text-gray-600">
                CNC machining, cutting systems, and material handling.
              </p>
            </Card>
            <Card title="Electronics">
              <p className="text-gray-600">
                PCB assembly, testing systems, and component placement.
              </p>
            </Card>
            <Card title="Textile">
              <p className="text-gray-600">
                Weaving automation, dyeing systems, and quality inspection.
              </p>
            </Card>
            <Card title="Chemical">
              <p className="text-gray-600">
                Process control, mixing systems, and safety monitoring.
              </p>
            </Card>
            <Card title="Packaging">
              <p className="text-gray-600">
                Filling systems, labeling automation, and palletizing.
              </p>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
