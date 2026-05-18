import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <Section background="dark">
          <div className="text-center py-20 md:py-28 lg:py-36">
            <div className="max-w-5xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00d4ff] to-[#00b8e6] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#00d4ff]/20">
                <span className="text-5xl">{service.icon}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/contact" variant="primary" size="lg" className="px-8 py-4 text-lg">
                  Request Consultation
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  Get Quotation
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Overview Section */}
        <Section>
          <div className="max-w-5xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold text-[#0a192f] mb-6 tracking-tight">Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {service.overview}
              </p>
            </Card>
          </div>
        </Section>

        {/* Scope of Work Section */}
        <Section background="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Scope of Work</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.serviceScope.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Key Components Section */}
        <Section>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Key Components / Systems</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.keyComponents.map((component, index) => (
                <div key={index} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <span className="text-gray-700">{component}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Technical Features Section */}
        <Section background="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Technical Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.technicalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Industries Served Section */}
        <Section>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Industries Served</h2>
            <div className="flex flex-wrap gap-3">
              {service.industriesServed.map((industry, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-[#0a192f] rounded-full font-medium">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section background="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00d4ff] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0a192f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Working Process Section */}
        <Section>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Working Process</h2>
            <div className="space-y-6">
              {service.processSteps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#00b8e6] rounded-xl flex items-center justify-center shadow-lg shadow-[#00d4ff]/20">
                      <span className="text-[#0a192f] font-bold text-lg">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-6">
                    <h3 className="text-xl font-semibold text-[#0a192f] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Deliverables Section */}
        <Section background="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Deliverables</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Safety and Standards Section */}
        <Section>
          <div className="max-w-5xl mx-auto">
            <Card className="bg-[#0a192f] border-[#1e3a5f]">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#00d4ff] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0a192f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Safety and Standards</h2>
                  <p className="text-gray-300 leading-relaxed">{service.safetyAndStandards}</p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Maintenance Support Section */}
        <Section background="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Maintenance and Support</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{service.maintenanceSupport}</p>
          </div>
        </Section>

        {/* Related Products Section */}
        {service.relatedProducts.length > 0 && (
          <Section>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">Related Products / Hardware</h2>
              <div className="flex flex-wrap gap-3">
                {service.relatedProducts.map((product, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* CTA Section */}
        <Section background="dark">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Need a Customized Solution for Your Project?
            </h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Our engineering team can design and implement customized solutions tailored to your specific requirements. Get in touch with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contact" variant="primary" size="lg" className="px-10 py-4 text-lg">
                Request Quotation
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="px-10 py-4 text-lg">
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

export async function generateStaticParams() {
  const { services } = await import('@/data/services');
  return services.map((service) => ({
    slug: service.slug,
  }));
}
