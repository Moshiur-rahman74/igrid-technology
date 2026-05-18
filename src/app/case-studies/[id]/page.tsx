import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { CaseStudy } from '@/types/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, CheckCircle } from 'lucide-react';

const SAMPLE_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Automotive Manufacturing Line Optimization',
    industry: 'Automotive',
    problem: 'Production bottlenecks and quality inconsistencies in assembly line',
    solution: 'Implemented multi-brand PLC automation with real-time monitoring',
    result: '35% increase in throughput, 50% reduction in defects',
    content: `A leading automotive manufacturer faced significant challenges with their assembly line, including production bottlenecks and quality inconsistencies that were affecting their competitive position in the market.

## The Challenge

The manufacturer was experiencing:
- Frequent production stoppages due to manual intervention requirements
- Quality inconsistencies leading to increased scrap rates
- Inability to scale production to meet growing demand
- High maintenance costs due to outdated equipment

## Our Solution

We implemented a comprehensive multi-brand PLC automation solution that included:
- Integration of PLCs from multiple manufacturers for optimal component selection
- Real-time monitoring and data collection system
- Adaptive control algorithms for process optimization
- Automated quality inspection stations
- Predictive maintenance capabilities

## Implementation

The project was executed in phases:
1. Assessment and planning - 2 weeks
2. Hardware installation and integration - 4 weeks
3. Software development and testing - 3 weeks
4. Training and commissioning - 2 weeks

## Results

The automation implementation delivered exceptional results:
- 35% increase in overall production throughput
- 50% reduction in quality defects
- 40% decrease in unplanned downtime
- 25% reduction in maintenance costs
- ROI achieved within 18 months

## Key Success Factors

- Careful selection of multi-brand components for optimal performance and cost
- Comprehensive operator training program
- Phased implementation to minimize production disruption
- Ongoing support and optimization services

This case study demonstrates how strategic automation investment can transform manufacturing operations and deliver significant competitive advantages.`,
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
    content: `A food processing plant struggled with manual processes that created contamination risks and operational inefficiencies, threatening both product safety and profitability.

## The Challenge

The plant faced critical issues:
- Manual handling processes increasing contamination risk
- Inconsistent product quality due to human error
- Difficulty meeting regulatory compliance requirements
- High labor costs and operational inefficiencies

## Our Solution

We implemented an end-to-end automation system featuring:
- Sanitary design automation equipment meeting food industry standards
- Automated quality control and inspection systems
- Compliance tracking and reporting software
- Integrated HMI systems for operator oversight
- Automated cleaning and sanitization protocols

## Implementation

The automation project included:
- Installation of food-grade automation equipment
- Integration with existing processing lines
- Implementation of HACCP-compliant monitoring systems
- Comprehensive staff training on new systems

## Results

The transformation delivered outstanding outcomes:
- Zero contamination incidents since implementation
- 40% improvement in operational efficiency
- 100% regulatory compliance achievement
- 30% reduction in labor costs
- Improved product consistency and quality

## Key Success Factors

- Strict adherence to food safety standards in design
- Comprehensive change management and training
- Phased implementation to maintain production
- Ongoing support and maintenance program

This case demonstrates how automation can enhance both safety and efficiency in food processing operations.`,
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
    content: `A precision machining company had isolated CNC machines requiring manual loading and unloading, limiting their capacity and increasing costs.

## The Challenge

The company faced several operational challenges:
- Machines operating only during shift hours
- High labor costs for machine loading/unloading
- Inconsistent part handling affecting quality
- Inability to compete on price due to high overhead

## Our Solution

We implemented a robotic automation cell featuring:
- Multi-axis industrial robots for part handling
- Integration of multiple CNC machines into a single cell
- Automated part identification and routing
- Real-time monitoring and scheduling system
- Quick-change tooling for flexibility

## Implementation

The project involved:
- Robot installation and safety system implementation
- CNC machine integration and programming
- Development of part handling fixtures
- Implementation of cell control software
- Comprehensive operator training

## Results

The automation cell delivered exceptional results:
- 24/7 operation capability
- 60% reduction in labor costs
- 45% increase in machine utilization
- Improved part quality consistency
- ROI achieved within 14 months

## Key Success Factors

- Careful cell design for optimal workflow
- Comprehensive safety system implementation
- Flexible programming for multiple part types
- Ongoing technical support and optimization

This case shows how robotic automation can transform machining operations and dramatically improve competitiveness.`,
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
    content: `A pharmaceutical manufacturer needed to meet strict regulatory requirements for compliance tracking and product serialization while maintaining efficiency.

## The Challenge

The manufacturer faced regulatory pressure:
- Increasing serialization requirements
- Need for comprehensive track-and-trace capabilities
- Stringent quality control requirements
- Pressure to reduce changeover times between products

## Our Solution

We implemented a comprehensive automation solution:
- Track-and-trace serialization system
- Integrated quality inspection stations
- Automated packaging line controls
- Compliance reporting and documentation system
- Quick-change tooling for rapid product changeovers

## Implementation

The project included:
- Installation of serialization equipment
- Integration with existing packaging lines
- Development of compliance reporting software
- Implementation of automated quality checks
- Validation and qualification processes

## Results

The implementation achieved:
- 100% regulatory compliance
- 25% faster product changeovers
- Real-time traceability of all products
- Automated compliance documentation
- Improved quality control consistency

## Key Success Factors

- Early engagement with regulatory requirements
- Comprehensive validation processes
- Integration with existing systems
- Thorough documentation and training

This case demonstrates how automation can help pharmaceutical manufacturers meet complex regulatory requirements while improving operational efficiency.`,
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
    content: `A textile factory operated with outdated machinery and manual quality control, resulting in quality issues and high energy consumption.

## The Challenge

The factory struggled with:
- Outdated machinery with poor efficiency
- Manual quality control missing defects
- High energy consumption increasing costs
- Inability to compete on quality and price

## Our Solution

We implemented a modernization program including:
- PLC-based automation system for machinery control
- Vision inspection systems for quality control
- Energy-efficient motor drives and controls
- Real-time production monitoring
- Predictive maintenance capabilities

## Implementation

The modernization involved:
- Installation of modern PLC control systems
- Integration of vision inspection technology
- Motor and drive upgrades for efficiency
- Development of monitoring dashboards
- Comprehensive staff training

## Results

The modernization delivered significant improvements:
- 45% improvement in product quality
- 30% reduction in energy consumption
- 50% reduction in defect rates
- Improved production consistency
- ROI achieved within 20 months

## Key Success Factors

- Comprehensive assessment of existing equipment
- Phased implementation to maintain production
- Focus on both quality and efficiency
- Ongoing optimization and support

This case shows how modernization can transform textile operations and deliver both quality and efficiency improvements.`,
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
    content: `A logistics company struggled with manual sorting and inventory management, causing delays and accuracy issues.

## The Challenge

The company faced operational bottlenecks:
- Manual sorting causing processing delays
- Inventory accuracy issues leading to stockouts
- High labor costs for manual operations
- Inability to scale with growing demand

## Our Solution

We implemented a comprehensive automation solution:
- Automated conveyor sorting system
- RFID tracking for inventory management
- Warehouse management system integration
- Automated picking and packing stations
- Real-time inventory visibility

## Implementation

The project included:
- Installation of conveyor systems
- RFID infrastructure deployment
- WMS integration and customization
- Automated station implementation
- Staff training and change management

## Results

The automation delivered exceptional outcomes:
- 70% faster order processing
- 99.9% inventory accuracy
- 50% reduction in labor costs
- Improved order accuracy
- Enhanced customer satisfaction

## Key Success Factors

- Comprehensive process analysis before implementation
- Integration with existing systems
- Phased rollout to minimize disruption
- Ongoing support and optimization

This case demonstrates how warehouse automation can transform logistics operations and deliver significant competitive advantages.`,
    image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
];

async function getCaseStudy(id: string): Promise<CaseStudy | null> {
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
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error || !data) {
      return SAMPLE_CASE_STUDIES.find((study) => study.id === id) || null;
    }

    return data;
  } catch {
    return SAMPLE_CASE_STUDIES.find((study) => study.id === id) || null;
  }
}

export default async function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = await getCaseStudy(params.id);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/case-studies" 
              className="inline-flex items-center text-[#00d4ff] hover:text-[#00b8e6] mb-6"
            >
              ← Back to Case Studies
            </Link>
            
            {study.image && (
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            {study.industry && (
              <div className="inline-flex items-center px-3 py-1 text-sm bg-[#00d4ff] bg-opacity-10 text-[#00d4ff] rounded mb-4">
                <Briefcase className="w-4 h-4 mr-2" />
                {study.industry}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6">
              {study.title}
            </h1>

            {study.created_at && (
              <p className="text-sm text-gray-500 mb-8">
                {new Date(study.created_at).toLocaleDateString()}
              </p>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {study.problem && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Problem</h3>
                  <p className="text-sm text-red-700">{study.problem}</p>
                </div>
              )}
              {study.solution && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Solution</h3>
                  <p className="text-sm text-blue-700">{study.solution}</p>
                </div>
              )}
              {study.result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Result</h3>
                  <p className="text-sm text-green-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {study.result}
                  </p>
                </div>
              )}
            </div>

            {study.content && (
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {study.content}
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
