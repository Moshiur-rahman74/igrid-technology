import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { services } from '@/data/services';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <Section background="light">
          <div className="text-center py-24 md:py-36 lg:py-48">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a192f] mb-8 leading-tight tracking-tight">
                Our{' '}
                <span className="text-[#00D4FF]">
                  Engineering Services
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#0a192f]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                Comprehensive industrial engineering solutions from substation design to automation systems, delivered with precision and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/contact" variant="primary" size="lg" className="px-8 py-4 text-lg">
                  Request Consultation
                </Button>
                <Button href="/hardware-configurator" variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  Configure Hardware
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Services Grid Section */}
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Complete Engineering Solutions</h2>
            <p className="text-[#0a192f]/70 max-w-3xl mx-auto text-lg leading-relaxed">
              From electrical infrastructure to advanced automation, we provide end-to-end engineering services tailored to your industrial needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <Card className="h-full hover:shadow-premium-lg transition-all duration-300 hover-lift cursor-pointer group">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-[#EAF8FC] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#0a192f] mb-3 group-hover:text-[#00a8cc] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#0a192f]/70 leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.industriesServed.slice(0, 3).map((industry, index) => (
                        <span key={index} className="text-xs px-3 py-1 bg-[#F8F3EA] text-[#0a192f]/70 rounded-full">
                          {industry}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-[#e8c9a8]">
                      <span className="text-[#00a8cc] font-semibold group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="light">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Need a Custom Solution?</h2>
            <p className="text-[#0a192f]/70 mb-10 text-lg leading-relaxed">
              Our engineering team can design and implement customized solutions for your specific industrial requirements. Get in touch with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contact" variant="primary" size="lg" className="px-10 py-4 text-lg">
                Request Quotation
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="px-10 py-4 text-lg">
                Contact Engineering Team
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
