import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">About IGrid Technology</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the future of industrial automation with innovative hardware configurators and cutting-edge solutions.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <Card title="Our Mission" description="Empowering industries with customizable automation solutions">
              <p className="text-gray-600">
                We provide cost-efficient and premium factory automation prototypes using multi-brand industrial hardware, 
                enabling businesses of all sizes to optimize their production processes.
              </p>
            </Card>
            <Card title="Our Vision" description="Revolutionizing industrial automation through technology">
              <p className="text-gray-600">
                To become the global leader in industrial automation configurators, making advanced automation 
                accessible to every factory and production line worldwide.
              </p>
            </Card>
          </div>
        </Section>

        <Section background="light">
          <h2 className="text-3xl font-bold text-[#0a192f] mb-8 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-semibold text-[#0a192f] mb-3">Expert Team</h3>
              <p className="text-gray-600">Decades of combined experience in industrial automation and hardware configuration.</p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-[#0a192f] mb-3">Multi-Brand Solutions</h3>
              <p className="text-gray-600">Integration with leading industrial hardware brands for maximum flexibility.</p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-[#0a192f] mb-3">Cost-Effective</h3>
              <p className="text-gray-600">Optimized solutions that balance performance with budget requirements.</p>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
