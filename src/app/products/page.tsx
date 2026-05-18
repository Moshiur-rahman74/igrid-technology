import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-quality industrial automation hardware from leading brands.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="PLC Systems">
              <p className="text-gray-600 mb-4">
                Programmable Logic Controllers for industrial automation control.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
            <Card title="CNC Controllers">
              <p className="text-gray-600 mb-4">
                Advanced CNC control systems for precision machining.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
            <Card title="HMI Panels">
              <p className="text-gray-600 mb-4">
                Human Machine Interface panels for operator control.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
            <Card title="Servo Drives">
              <p className="text-gray-600 mb-4">
                High-performance servo drives for motion control.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
            <Card title="Industrial Sensors">
              <p className="text-gray-600 mb-4">
                Wide range of sensors for position, temperature, and pressure.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
            <Card title="I/O Modules">
              <p className="text-gray-600 mb-4">
                Digital and analog input/output modules for system expansion.
              </p>
              <p className="text-sm text-[#00d4ff] font-semibold">View Details →</p>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
