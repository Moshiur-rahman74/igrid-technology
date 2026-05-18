import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { services } from '@/data/services';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <Section background="light">
          <div className="text-center py-24 md:py-36 lg:py-48">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a192f] mb-8 leading-tight tracking-tight">
                Let's Build Your{' '}
                <span className="text-[#00D4FF]">
                  Technology
                </span>{' '}
                Together
              </h1>
              <p className="text-xl md:text-2xl text-[#0a192f]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                Build cost-efficient or premium factory automation prototypes using multi-brand industrial hardware with precision engineering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/hardware-configurator" variant="primary" size="lg" className="px-8 py-4 text-lg">
                  Start Configuring
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  Request Expert Consultation
                </Button>
                <Button href="/automation-solutions" variant="outline" size="lg" className="px-8 py-4 text-lg">
                  View Automation Solutions
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Why Choose IGrid Technology</h2>
            <p className="text-[#0a192f]/70 max-w-2xl mx-auto text-lg leading-relaxed">
              We provide comprehensive industrial automation solutions tailored to your specific needs with precision and reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#FFFDF7] border border-[#e8c9a8] hover:shadow-premium-lg transition-all duration-300 hover-lift">
              <div className="w-20 h-20 bg-[#EAF8FC] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-[#0a192f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#0a192f] mb-3">Custom Configuration</h3>
              <p className="text-[#0a192f]/70 leading-relaxed">Build systems tailored to your specific industrial requirements with precision engineering.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#FFFDF7] border border-[#e8c9a8] hover:shadow-premium-lg transition-all duration-300 hover-lift">
              <div className="w-20 h-20 bg-[#FFF4DD] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-[#0a192f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#0a192f] mb-3">Multi-Brand Support</h3>
              <p className="text-[#0a192f]/70 leading-relaxed">Integration with leading industrial hardware brands for seamless compatibility.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#FFFDF7] border border-[#e8c9a8] hover:shadow-premium-lg transition-all duration-300 hover-lift">
              <div className="w-20 h-20 bg-[#EAF8FC] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-[#0a192f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#0a192f] mb-3">Cost-Effective</h3>
              <p className="text-[#0a192f]/70 leading-relaxed">Optimized solutions balancing performance and budget for maximum ROI.</p>
            </div>
          </div>
        </Section>

        {/* Our Engineering Services Section */}
        <Section background="light">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Our Engineering Services</h2>
            <p className="text-[#0a192f]/70 max-w-3xl mx-auto text-lg leading-relaxed">
              Comprehensive industrial engineering solutions from electrical infrastructure to advanced automation systems.
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
                    <p className="text-[#0a192f]/70 leading-relaxed mb-4 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <div className="space-y-2 mb-4">
                      {service.benefits.slice(0, 3).map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#00a8cc] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-[#0a192f]/70 line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Learn More
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/services" variant="primary" size="lg" className="px-8 py-4 text-lg">
              View All Services
            </Button>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="light">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Ready to Automate?</h2>
            <p className="text-[#0a192f]/70 mb-10 text-lg leading-relaxed">
              Get started with our hardware configurator or contact our experts for personalized consultation tailored to your needs.
            </p>
            <Button href="/hardware-configurator" variant="primary" size="lg" className="px-10 py-4 text-lg">
              Get Started Today
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
