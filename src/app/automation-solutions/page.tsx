import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function AutomationSolutionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Section background="dark">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Automation Solutions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive automation solutions tailored to your specific industrial needs with precision engineering.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card title="CNC Machine Automation" description="Advanced CNC control systems and automation for precision machining operations.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Multi-axis control systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Real-time monitoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Adaptive machining
                </li>
              </ul>
            </Card>
            <Card title="Production Line Automation" description="End-to-end production line automation for manufacturing efficiency.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Conveyor systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Robotic integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Quality control
                </li>
              </ul>
            </Card>
            <Card title="Factory Automation" description="Complete factory automation solutions for modern manufacturing facilities.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  PLC systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  SCADA integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  MES connectivity
                </li>
              </ul>
            </Card>
            <Card title="Robotics Integration" description="Seamless integration of industrial robots into your automation ecosystem.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Robot controllers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Safety systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Programming interfaces
                </li>
              </ul>
            </Card>
            <Card title="Process Control Systems" description="Advanced process control for consistent and reliable operations.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  PID controllers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Data acquisition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Analytics dashboard
                </li>
              </ul>
            </Card>
            <Card title="Safety Systems" description="Comprehensive safety solutions for automated industrial environments.">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Emergency stops
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Safety interlocks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Monitoring systems
                </li>
              </ul>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
