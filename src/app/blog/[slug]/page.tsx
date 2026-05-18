import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { BlogPost } from '@/types/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Industrial Automation',
    slug: 'future-of-industrial-automation',
    excerpt: 'Exploring emerging technologies and their impact on manufacturing efficiency and productivity.',
    content: `Industrial automation is rapidly evolving with new technologies that promise to revolutionize manufacturing. From AI-powered quality control to collaborative robots working alongside humans, the future of automation is both exciting and transformative.

Key trends shaping the future include:

1. **Artificial Intelligence and Machine Learning**: AI is enabling predictive maintenance, quality inspection, and process optimization at unprecedented levels.

2. **Collaborative Robotics (Cobots)**: These robots work safely alongside human operators, combining the precision of automation with human flexibility.

3. **Industrial IoT (IIoT)**: Connected devices are creating smart factories where equipment communicates and optimizes operations in real-time.

4. **Edge Computing**: Processing data closer to the source reduces latency and enables faster decision-making.

5. **Digital Twins**: Virtual replicas of physical systems allow for simulation, testing, and optimization without disrupting production.

The integration of these technologies is creating more flexible, efficient, and cost-effective automation solutions. Companies that embrace these innovations will gain significant competitive advantages in the global market.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Getting Started with PLC Programming',
    slug: 'getting-started-with-plc-programming',
    excerpt: 'A comprehensive guide for beginners in industrial automation and PLC systems.',
    content: `PLC (Programmable Logic Controller) programming is a fundamental skill for anyone working in industrial automation. This guide will help you get started with the basics.

## Understanding PLCs

PLCs are industrial computers used to control manufacturing processes. They monitor inputs, process data according to stored programs, and control outputs to automate machinery and processes.

## Programming Languages

The IEC 61131-3 standard defines five programming languages for PLCs:

1. **Ladder Logic (LD)**: The most common language, using graphical symbols that resemble electrical relay logic diagrams.

2. **Structured Text (ST)**: A high-level text-based language similar to Pascal or C.

3. **Function Block Diagram (FBD)**: A graphical language using function blocks to represent operations.

4. **Sequential Function Chart (SFC)**: Ideal for sequential processes, using steps and transitions.

5. **Instruction List (IL)**: A low-level assembly-like language.

## Getting Started

1. Learn the basics of electrical circuits and logic gates
2. Study ladder logic programming fundamentals
3. Practice with simulation software before working with real hardware
4. Understand safety protocols and industry standards
5. Start with simple projects and gradually increase complexity

## Best Practices

- Document your code thoroughly
- Use consistent naming conventions
- Implement proper error handling
- Test thoroughly before deployment
- Follow safety standards at all times

With dedication and practice, you can master PLC programming and build a rewarding career in industrial automation.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cost-Efficient Automation Solutions',
    slug: 'cost-efficient-automation-solutions',
    excerpt: 'How to implement automation without breaking the budget using multi-brand hardware.',
    content: `Implementing automation doesn't have to be prohibitively expensive. With the right strategy and approach, businesses of all sizes can benefit from automation while maintaining budget constraints.

## Strategies for Cost-Efficient Automation

### 1. Multi-Brand Hardware Integration

Instead of being locked into a single vendor's ecosystem, use compatible components from multiple manufacturers. This approach:

- Increases flexibility in component selection
- Reduces costs through competitive pricing
- Prevents vendor lock-in
- Allows mixing premium and budget components strategically

### 2. Phased Implementation

Start with critical processes and expand gradually:

- Phase 1: Automate the most impactful processes
- Phase 2: Expand to supporting processes
- Phase 3: Integrate systems for maximum efficiency

### 3. Reuse Existing Equipment

- Retrofit existing machinery with modern controls
- Integrate legacy systems with new automation
- Maximize ROI on existing investments

### 4. Open-Source Solutions

- Use open-source software where appropriate
- Leverage community-supported tools
- Reduce licensing costs

### 5. Scalable Architecture

- Design systems that can grow with your needs
- Avoid over-engineering for current requirements
- Plan for future expansion without over-investing now

## Key Considerations

- Total Cost of Ownership (TCO) vs. initial cost
- Maintenance and support expenses
- Training requirements
- Expected ROI timeline
- Scalability for future needs

By carefully planning and selecting the right combination of components, businesses can achieve significant automation benefits while maintaining budget discipline.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Multi-Brand Automation Hardware Integration',
    slug: 'multi-brand-automation-hardware',
    excerpt: 'Best practices for integrating automation hardware from different manufacturers.',
    content: `Integrating automation hardware from multiple manufacturers can be challenging but offers significant benefits in terms of flexibility, cost savings, and avoiding vendor lock-in.

## Benefits of Multi-Brand Integration

1. **Cost Optimization**: Select the best components for each application regardless of brand
2. **Flexibility**: Mix and match components to meet specific requirements
3. **Redundancy**: Avoid single points of failure from vendor issues
4. **Innovation**: Access to the latest technologies from various manufacturers
5. **Negotiation Power**: Leverage competition for better pricing

## Integration Challenges

### Communication Protocols

Different manufacturers use various communication protocols. Common standards include:

- **Modbus**: Widely supported, simple and reliable
- **PROFINET**: Industrial Ethernet standard popular in Europe
- **EtherNet/IP**: Rockwell Automation's industrial Ethernet protocol
- **OPC UA**: Modern, platform-independent standard
- **MQTT**: Lightweight protocol for IoT applications

### Best Practices for Integration

1. **Standardize on Common Protocols**: Choose protocols supported by most vendors
2. **Use Gateways/Converters**: Bridge incompatible systems when necessary
3. **Implement Proper Documentation**: Track all interfaces and configurations
4. **Test Thoroughly**: Validate integration before deployment
5. **Plan for Maintenance**: Ensure access to support for all components

### Integration Architecture

The integration architecture follows a hierarchical pattern:

- SCADA/HMI System at the top level
- Communication Gateway in the middle
- Multiple Brand PLCs (A, B, C) at the bottom level

This architecture allows the SCADA system to communicate with different brand PLCs through a centralized gateway that handles protocol translation and data routing.

## Success Factors

- Clear integration strategy
- Comprehensive testing procedures
- Proper training for maintenance staff
- Vendor support agreements
- Regular system audits

With proper planning and execution, multi-brand integration can deliver excellent results while providing flexibility and cost savings.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Factory Automation Best Practices',
    slug: 'factory-automation-best-practices',
    excerpt: 'Essential guidelines for implementing successful factory automation systems.',
    content: `Implementing factory automation requires careful planning, execution, and ongoing management. These best practices will help ensure successful automation projects.

## Planning Phase

### 1. Define Clear Objectives

- Identify specific problems to solve
- Set measurable goals and KPIs
- Calculate expected ROI
- Establish realistic timelines

### 2. Assess Current Processes

- Document existing workflows
- Identify bottlenecks and inefficiencies
- Evaluate equipment capabilities
- Analyze data collection needs

### 3. Stakeholder Engagement

- Involve operators and maintenance staff early
- Get management buy-in and support
- Align with overall business strategy
- Plan for change management

## Design Phase

### 1. System Architecture

- Design scalable and flexible systems
- Plan for future expansion
- Ensure proper integration points
- Consider cybersecurity requirements

### 2. Technology Selection

- Choose proven, reliable technologies
- Consider total cost of ownership
- Evaluate vendor support and longevity
- Plan for obsolescence

### 3. Safety First

- Implement comprehensive safety systems
- Follow industry standards (ISO, ANSI, etc.)
- Design for emergency stops and fail-safes
- Train operators on safety procedures

## Implementation Phase

### 1. Phased Rollout

- Start with pilot projects
- Learn and adjust before full deployment
- Minimize production disruption
- Maintain backup processes

### 2. Training and Documentation

- Train all affected personnel
- Create comprehensive documentation
- Establish standard operating procedures
- Plan for ongoing training

### 3. Testing and Validation

- Thoroughly test all systems
- Validate against requirements
- Perform stress testing
- Document test results

## Operation Phase

### 1. Maintenance Strategy

- Implement preventive maintenance
- Monitor system performance
- Plan for spare parts inventory
- Establish support procedures

### 2. Continuous Improvement

- Collect and analyze performance data
- Identify optimization opportunities
- Stay updated on technology advances
- Plan for system upgrades

### 3. Security Management

- Implement cybersecurity measures
- Regular security audits
- Update software and firmware
- Train staff on security best practices

## Key Success Metrics

- Overall Equipment Effectiveness (OEE)
- Production throughput
- Quality improvement
- Cost reduction
- Safety incident reduction
- Operator satisfaction

Following these best practices will help ensure your factory automation project delivers lasting value and competitive advantage.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Machining Process Automation',
    slug: 'machining-process-automation',
    excerpt: 'Optimizing machining processes through intelligent automation solutions.',
    content: `Machining process automation can significantly improve production efficiency, quality, and consistency. This guide covers key aspects of automating machining operations.

## Types of Machining Automation

### 1. CNC Automation

- Computer Numerical Control (CNC) systems
- Automated tool changers
- Multi-axis machining centers
- Integrated workholding systems

### 2. Robotic Automation

- Robotic loading and unloading
- Material handling between machines
- Part inspection and quality control
- Deburring and finishing operations

### 3. Process Control Automation

- Automated process monitoring
- Adaptive control systems
- Temperature and vibration monitoring
- Tool wear detection and compensation

## Benefits of Machining Automation

### Productivity Improvements

- 24/7 operation capability
- Reduced cycle times
- Higher machine utilization
- Increased throughput

### Quality Enhancements

- Consistent part quality
- Reduced human error
- Improved repeatability
- Better process control

### Cost Reductions

- Lower labor costs
- Reduced scrap and rework
- Better material utilization
- Lower inventory costs

## Implementation Considerations

### 1. Process Analysis

- Document current machining processes
- Identify automation opportunities
- Calculate potential ROI
- Assess technical feasibility

### 2. System Integration

- Integrate with existing equipment
- Ensure proper communication protocols
- Plan for data collection and analysis
- Design for scalability

### 3. Safety Systems

- Implement proper guarding
- Emergency stop systems
- Light curtains and sensors
- Safety interlocks

### 4. Programming and Setup

- Develop efficient CNC programs
- Optimize tool paths
- Implement quick-change tooling
- Standardize setups

## Advanced Technologies

### 1. IoT and Industry 4.0

- Real-time monitoring
- Predictive maintenance
- Remote diagnostics
- Data analytics

### 2. AI and Machine Learning

- Process optimization
- Quality prediction
- Adaptive control
- Anomaly detection

### 3. Digital Twins

- Virtual simulation
- Process optimization
- Training tool
- Troubleshooting aid

## Best Practices

- Start with high-volume, repetitive operations
- Implement proper maintenance procedures
- Train operators thoroughly
- Monitor performance continuously
- Plan for obsolescence and upgrades

## Measuring Success

Key performance indicators include:

- Overall Equipment Effectiveness (OEE)
- Parts per hour
- Scrap rate
- Tool life
- Downtime percentage
- Cost per part

By following these guidelines and implementing appropriate automation solutions, machining operations can achieve significant improvements in efficiency, quality, and profitability.`,
    author: 'IGrid Team',
    cover_image: '',
    published: true,
    status: 'published',
    created_at: new Date().toISOString(),
  },
];

async function getBlogPost(slug: string): Promise<BlogPost | null> {
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
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      return SAMPLE_BLOGS.find((blog) => blog.slug === slug) || null;
    }

    return data;
  } catch {
    return SAMPLE_BLOGS.find((blog) => blog.slug === slug) || null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Section background="light">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[#00d4ff] hover:text-[#00b8e6] mb-6"
            >
              ← Back to Blog
            </Link>
            
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-8">
              {post.author && (
                <>
                  <span>By {post.author}</span>
                  <span>•</span>
                </>
              )}
              {post.created_at && (
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              )}
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none">
              {post.content && (
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {post.content}
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
