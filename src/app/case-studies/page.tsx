import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { CaseStudy } from '@/types/supabase';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

const SAMPLE_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Automotive Manufacturing Line Optimization',
    industry: 'Automotive',
    problem: 'Production bottlenecks and quality inconsistencies in assembly line',
    solution: 'Implemented multi-brand PLC automation with real-time monitoring',
    result: '35% increase in throughput, 50% reduction in defects',
    content: 'A leading automotive manufacturer faced significant challenges with their assembly line, including production bottlenecks and quality inconsistencies. By implementing a multi-brand PLC automation system with real-time monitoring and adaptive control, we achieved a 35% increase in throughput and a 50% reduction in defects.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Food Processing Plant Automation',
    industry: 'Food & Beverage',
    problem: 'Manual processes leading to contamination risks and inefficiency',
    solution: 'End-to-end automation with sanitary design and compliance tracking',
    result: 'Zero contamination incidents, 40% efficiency gain',
    content: 'A food processing plant struggled with manual processes that created contamination risks and inefficiency. We implemented end-to-end automation with sanitary design, compliance tracking, and automated quality checks. The result was zero contamination incidents and a 40% efficiency gain.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'CNC Machining Cell Integration',
    industry: 'Manufacturing',
    problem: 'Isolated CNC machines requiring manual loading and unloading',
    solution: 'Robotic automation with multi-machine cell integration',
    result: '24/7 operation, 60% labor cost reduction',
    content: 'A precision machining company had isolated CNC machines requiring manual loading and unloading. We implemented robotic automation with multi-machine cell integration, enabling 24/7 operation and achieving a 60% reduction in labor costs while maintaining precision quality.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Pharmaceutical Packaging Line',
    industry: 'Pharmaceutical',
    problem: 'Compliance tracking and serialization requirements',
    solution: 'Track-and-trace automation with integrated quality systems',
    result: '100% compliance, 25% faster changeovers',
    content: 'A pharmaceutical manufacturer needed to meet strict compliance tracking and serialization requirements. We implemented a track-and-trace automation system with integrated quality controls, achieving 100% compliance and 25% faster changeovers between product runs.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Textile Factory Modernization',
    industry: 'Textile',
    problem: 'Outdated machinery and manual quality control',
    solution: 'Modern PLC automation with vision inspection systems',
    result: '45% quality improvement, 30% energy savings',
    content: 'A textile factory operated with outdated machinery and manual quality control. We modernized the facility with PLC automation and vision inspection systems, resulting in a 45% quality improvement and 30% energy savings through optimized machine control.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Warehouse Logistics Automation',
    industry: 'Logistics',
    problem: 'Manual sorting and inventory management inefficiencies',
    solution: 'Automated conveyor systems with RFID tracking',
    result: '70% faster processing, 99.9% inventory accuracy',
    content: 'A logistics company struggled with manual sorting and inventory management. We implemented automated conveyor systems with RFID tracking and warehouse management integration, achieving 70% faster processing and 99.9% inventory accuracy.',
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
];

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return SAMPLE_CASE_STUDIES;
    }

    return data;
  } catch {
    return SAMPLE_CASE_STUDIES;
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Case Studies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world success stories showcasing how our automation solutions transform businesses across industries.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => (
              <Link key={study.id} href={`/case-studies/${study.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {study.image && (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-6">
                    {study.industry && (
                      <div className="inline-flex items-center px-2 py-1 text-xs bg-[#00d4ff] bg-opacity-10 text-[#00d4ff] rounded mb-2">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {study.industry}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-[#0a192f] mb-2">{study.title}</h3>
                    {study.problem && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{study.problem}</p>
                    )}
                    {study.result && (
                      <p className="text-sm font-semibold text-green-600 mb-3">{study.result}</p>
                    )}
                    {study.created_at && (
                      <p className="text-xs text-gray-500">
                        {new Date(study.created_at).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm text-[#00d4ff] font-semibold mt-4">View Case Study →</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
