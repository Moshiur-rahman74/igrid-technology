'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import EnhancedPrototypeSummary from '@/components/configurator/EnhancedPrototypeSummary';
import { ConfiguratorState } from '@/types/configurator';

export default function PrototypeSummaryPage() {
  const router = useRouter();
  const [configuratorState] = useState<ConfiguratorState | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedState = localStorage.getItem('configuratorState');
    return savedState ? JSON.parse(savedState) : null;
  });

  const handleDownloadPDF = () => {
    if (!configuratorState) return;
    
    // Create a printable version of the summary
    const printContent = document.getElementById('prototype-summary-content');
    if (!printContent) return;

    // Use browser's print functionality
    const originalTitle = document.title;
    document.title = `IGrid-Prototype-Summary-${Date.now()}`;
    window.print();
    document.title = originalTitle;
  };

  const handleRequestQuote = () => {
    router.push('/contact?subject=prototype-quotation');
  };

  const handleSavePrototype = () => {
    if (!configuratorState) return;
    
    // Save to localStorage with timestamp
    const savedPrototypes = JSON.parse(localStorage.getItem('savedPrototypes') || '[]');
    const prototype = {
      id: Date.now(),
      state: configuratorState,
      createdAt: new Date().toISOString(),
      name: `${configuratorState.industry} - ${configuratorState.machine} - ${new Date().toLocaleDateString()}`
    };
    savedPrototypes.push(prototype);
    localStorage.setItem('savedPrototypes', JSON.stringify(savedPrototypes));
    alert('Prototype saved successfully!');
  };

  const handleEditPrototype = () => {
    router.push('/hardware-configurator');
  };

  if (!configuratorState || configuratorState.selectedProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <Section background="dark">
            <div className="text-center py-20">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Prototype Summary</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Review and manage your automation system prototypes with precision engineering.
              </p>
            </div>
          </Section>

          <Section>
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-10 mb-8 shadow-premium">
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  No prototype data found. Use the Hardware Configurator to build your first automation system prototype.
                </p>
                <button
                  onClick={() => router.push('/hardware-configurator')}
                  className="px-8 py-4 bg-[#00D4FF] text-[#0A192F] font-bold rounded-xl hover:bg-[#00B8E6] hover:shadow-lg hover:shadow-[#00D4FF]/20 transition-all transform hover:-translate-y-0.5"
                >
                  Go to Hardware Configurator
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 text-left shadow-premium">
                <h3 className="font-bold text-[#0a192f] mb-6 text-xl">Prototype Features</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Complete Bill of Materials with pricing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Detailed cost breakdown (hardware, installation, engineering, etc.)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Compatibility analysis and warnings
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Brand and category distribution
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Engineering recommendations
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Suggested alternatives for optimization
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Download as PDF for client presentation
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Request quotation directly
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#00d4ff] rounded-full mt-2 flex-shrink-0"></span>
                    Save and edit prototypes
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <Section>
          <div id="prototype-summary-content" className="py-12">
            <EnhancedPrototypeSummary
              configuratorState={configuratorState}
              onEdit={handleEditPrototype}
              onRequestQuote={handleRequestQuote}
              onSave={handleSavePrototype}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
