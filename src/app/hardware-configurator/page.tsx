'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import ProductCard from '@/components/configurator/ProductCard';
import PrototypeSummary from '@/components/configurator/PrototypeSummary';
import StepIndicator from '@/components/configurator/StepIndicator';
import CostBreakdown from '@/components/configurator/CostBreakdown';
import SmartRecommendations from '@/components/configurator/SmartRecommendations';
import RequestQuotation from '@/components/configurator/RequestQuotation';
import { getProducts, getProductsByCategory } from '@/lib/data';
import { ConfiguratorState, ConfiguratorStep, IndustryType, MachineType, AutomationLevel, BudgetRange } from '@/types/configurator';
import { Product } from '@/types/product';
import { checkCompatibility } from '@/utils/compatibility';
import { generateRecommendations, RecommendedBuild } from '@/utils/recommendations';

export default function HardwareConfiguratorPage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [state, setState] = useState<ConfiguratorState>({
    currentStep: 'industry',
    industry: null,
    machine: null,
    automationLevel: null,
    budgetRange: null,
    selectedProducts: [],
  });

  const [recommendations, setRecommendations] = useState<RecommendedBuild[]>([]);
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const steps = [
    { id: 'industry', label: 'Industry' },
    { id: 'machine', label: 'Machine' },
    { id: 'automation', label: 'Automation' },
    { id: 'budget', label: 'Budget' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'plc', label: 'PLC' },
    { id: 'hmi', label: 'HMI' },
    { id: 'sensors', label: 'Sensors' },
    { id: 'motors', label: 'Motors' },
    { id: 'safety', label: 'Safety' },
    { id: 'panel', label: 'Panel' },
    { id: 'review', label: 'Review' },
  ];

  const industries: IndustryType[] = [
    'CNC Machining',
    'Textile Industry',
    'Food Processing',
    'Packaging Industry',
    'Manufacturing Plant',
    'Robotics Automation',
    'Assembly Line',
    'Welding Automation',
    'Pharmaceutical Production',
  ];

  const machineTypes: MachineType[] = [
    'CNC Machine',
    'Conveyor System',
    'Packaging Machine',
    'Robotic Cell',
    'Production Line',
    'Pump Control System',
    'Motor Control System',
    'Material Handling System',
    'Custom Automation System',
  ];

  const automationLevels: AutomationLevel[] = [
    'Basic Automation',
    'Semi-Automation',
    'Full Automation',
    'Smart/SCADA Automation',
  ];

  const budgetRanges: BudgetRange[] = [
    'Economy',
    'Balanced',
    'Premium',
  ];

  const handleStepClick = (stepId: string) => {
    const currentIndex = steps.findIndex(s => s.id === state.currentStep);
    const newIndex = steps.findIndex(s => s.id === stepId);
    if (newIndex <= currentIndex + 1) {
      setState({ ...state, currentStep: stepId as ConfiguratorStep });
    }
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === state.currentStep);
    if (currentIndex < steps.length - 1) {
      setState({ ...state, currentStep: steps[currentIndex + 1].id as ConfiguratorStep });
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === state.currentStep);
    if (currentIndex > 0) {
      setState({ ...state, currentStep: steps[currentIndex - 1].id as ConfiguratorStep });
    }
  };

  const handleSelectProduct = (product: Product) => {
    const isSelected = state.selectedProducts.some(p => p.id === product.id);
    if (isSelected) {
      setState({
        ...state,
        selectedProducts: state.selectedProducts.filter(p => p.id !== product.id),
      });
    } else {
      setState({
        ...state,
        selectedProducts: [...state.selectedProducts, product],
      });
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setState({
      ...state,
      selectedProducts: state.selectedProducts.filter(p => p.id !== productId),
    });
  };

  const handleApplyBuild = (build: RecommendedBuild) => {
    setState({
      ...state,
      selectedProducts: build.recommendedProducts,
    });
  };

  const generateRecommendationsForUser = () => {
    const recs = generateRecommendations(
      state.industry,
      state.machine,
      state.automationLevel,
      state.budgetRange
    );
    setRecommendations(recs);
  };

  const handleSavePrototype = () => {
    // Save to localStorage with timestamp
    const savedPrototypes = JSON.parse(localStorage.getItem('savedPrototypes') || '[]');
    const prototype = {
      id: Date.now(),
      state: state,
      createdAt: new Date().toISOString(),
      name: `${state.industry} - ${state.machine} - ${new Date().toLocaleDateString()}`
    };
    savedPrototypes.push(prototype);
    localStorage.setItem('savedPrototypes', JSON.stringify(savedPrototypes));
    alert('Prototype saved successfully!');
  };

  const handleViewFullSummary = () => {
    // Save current state to localStorage for the summary page
    localStorage.setItem('configuratorState', JSON.stringify(state));
    router.push('/prototype-summary');
  };

  const getFilteredProducts = () => {
    let filteredProducts: Product[] = [];
    
    switch (state.currentStep) {
      case 'plc':
        filteredProducts = getProductsByCategory('PLC', allProducts);
        break;
      case 'hmi':
        filteredProducts = getProductsByCategory('HMI', allProducts);
        break;
      case 'sensors':
        filteredProducts = [
          ...getProductsByCategory('Sensors', allProducts),
          ...getProductsByCategory('Proximity Sensor', allProducts),
          ...getProductsByCategory('Limit Switch', allProducts),
          ...getProductsByCategory('Encoder', allProducts),
        ];
        break;
      case 'motors':
        filteredProducts = [
          ...getProductsByCategory('Servo Motor', allProducts),
          ...getProductsByCategory('Stepper Motor', allProducts),
          ...getProductsByCategory('VFD', allProducts),
        ];
        break;
      case 'safety':
        filteredProducts = [
          ...getProductsByCategory('Safety Devices', allProducts),
          ...getProductsByCategory('Emergency Stop', allProducts),
        ];
        break;
      case 'panel':
        filteredProducts = [
          ...getProductsByCategory('Control Panel / Enclosure', allProducts),
          ...getProductsByCategory('Power Supply', allProducts),
          ...getProductsByCategory('I/O Modules', allProducts),
          ...getProductsByCategory('Relays', allProducts),
          ...getProductsByCategory('Contactors', allProducts),
          ...getProductsByCategory('Circuit Protection', allProducts),
        ];
        break;
      default:
        filteredProducts = [];
    }

    // Filter by budget if selected
    if (state.budgetRange) {
      const budgetMap: Record<BudgetRange, string[]> = {
        'Economy': ['Budget'],
        'Balanced': ['Budget', 'Mid-Range'],
        'Premium': ['Mid-Range', 'Premium'],
      };
      const allowedBudgets = budgetMap[state.budgetRange];
      filteredProducts = filteredProducts.filter(p => allowedBudgets.includes(p.budgetLevel));
    }

    return filteredProducts;
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 'industry':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setState({ ...state, industry, currentStep: 'machine' })}
                className={`p-8 border-2 rounded-xl text-left transition-all duration-300 hover-lift ${
                  state.industry === industry
                    ? 'border-[#00d4ff] bg-gradient-to-br from-[#00d4ff]/10 to-[#00d4ff]/5 shadow-lg shadow-[#00d4ff]/20'
                    : 'border-gray-200 hover:border-[#00d4ff] hover:shadow-premium'
                }`}
              >
                <h3 className="font-bold text-[#0a192f] mb-3 text-lg tracking-tight">{industry}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Select this industry type</p>
              </button>
            ))}
          </div>
        );

      case 'machine':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {machineTypes.map((machine) => (
              <button
                key={machine}
                onClick={() => setState({ ...state, machine, currentStep: 'automation' })}
                className={`p-8 border-2 rounded-xl text-left transition-all duration-300 hover-lift ${
                  state.machine === machine
                    ? 'border-[#00d4ff] bg-gradient-to-br from-[#00d4ff]/10 to-[#00d4ff]/5 shadow-lg shadow-[#00d4ff]/20'
                    : 'border-gray-200 hover:border-[#00d4ff] hover:shadow-premium'
                }`}
              >
                <h3 className="font-bold text-[#0a192f] mb-3 text-lg tracking-tight">{machine}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Select this machine type</p>
              </button>
            ))}
          </div>
        );

      case 'automation':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationLevels.map((level) => (
              <button
                key={level}
                onClick={() => setState({ ...state, automationLevel: level, currentStep: 'budget' })}
                className={`p-8 border-2 rounded-xl text-left transition-all duration-300 hover-lift ${
                  state.automationLevel === level
                    ? 'border-[#00d4ff] bg-gradient-to-br from-[#00d4ff]/10 to-[#00d4ff]/5 shadow-lg shadow-[#00d4ff]/20'
                    : 'border-gray-200 hover:border-[#00d4ff] hover:shadow-premium'
                }`}
              >
                <h3 className="font-bold text-[#0a192f] mb-3 text-lg tracking-tight">{level}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {level === 'Basic Automation' && 'Simple control with basic I/O'}
                  {level === 'Semi-Automation' && 'Partial automation with HMI'}
                  {level === 'Full Automation' && 'Complete system with advanced features'}
                  {level === 'Smart/SCADA Automation' && 'Advanced system with monitoring and analytics'}
                </p>
              </button>
            ))}
          </div>
        );

      case 'budget':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budgetRanges.map((budget) => (
              <button
                key={budget}
                onClick={() => {
                  setState({ ...state, budgetRange: budget, currentStep: 'recommendations' });
                  generateRecommendationsForUser();
                }}
                className={`p-8 border-2 rounded-xl text-left transition-all duration-300 hover-lift ${
                  state.budgetRange === budget
                    ? 'border-[#00d4ff] bg-gradient-to-br from-[#00d4ff]/10 to-[#00d4ff]/5 shadow-lg shadow-[#00d4ff]/20'
                    : 'border-gray-200 hover:border-[#00d4ff] hover:shadow-premium'
                }`}
              >
                <h3 className="font-bold text-[#0a192f] mb-3 text-lg tracking-tight">{budget}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {budget === 'Economy' && 'Cost-effective solutions for basic needs'}
                  {budget === 'Balanced' && 'Good balance of performance and cost'}
                  {budget === 'Premium' && 'High-end solutions with advanced features'}
                </p>
              </button>
            ))}
          </div>
        );

      case 'recommendations':
        return (
          <div>
            <SmartRecommendations
              recommendations={recommendations}
              onApplyBuild={handleApplyBuild}
              selectedProducts={state.selectedProducts}
            />
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Skip Recommendations
              </button>
            </div>
          </div>
        );

      case 'plc':
      case 'hmi':
      case 'sensors':
      case 'motors':
      case 'safety':
      case 'panel':
        const stepProducts = getFilteredProducts();
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stepProducts.map((product) => {
              const testProducts = [...state.selectedProducts, product];
              const productCompatibility = checkCompatibility(testProducts);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={state.selectedProducts.some(p => p.id === product.id)}
                  onAdd={() => handleSelectProduct(product)}
                  onCompare={() => {}}
                  compatibilityStatus={productCompatibility.overallStatus}
                />
              );
            })}
          </div>
        );

      case 'review':
        const reviewCompatibility = checkCompatibility(state.selectedProducts);
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-premium">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-6 tracking-tight">Configuration Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                  <p className="font-semibold text-[#0a192f]">{state.industry}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Machine Type</p>
                  <p className="font-semibold text-[#0a192f]">{state.machine}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Automation Level</p>
                  <p className="font-semibold text-[#0a192f]">{state.automationLevel}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                  <p className="font-semibold text-[#0a192f]">{state.budgetRange}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-premium">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-6 tracking-tight">Selected Products ({state.selectedProducts.length})</h3>
              <div className="space-y-4">
                {state.selectedProducts.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-premium transition-shadow">
                    <div>
                      <p className="font-semibold text-[#0a192f]">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.brand} - {product.model}</p>
                    </div>
                    <p className="font-bold text-[#0a192f] text-lg">${product.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#0a192f]">Hardware Cost</span>
                  <span className="text-3xl font-bold text-[#00d4ff]">
                    ${state.selectedProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-premium">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-6 tracking-tight">Compatibility Check</h3>
              <div className={`p-6 rounded-xl border-2 mb-6 ${
                reviewCompatibility.overallStatus === 'compatible' ? 'bg-[#d1fae5] border-[#10b981]' :
                reviewCompatibility.overallStatus === 'warning' ? 'bg-[#fef3c7] border-[#f59e0b]' :
                'bg-[#fee2e2] border-[#ef4444]'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {reviewCompatibility.overallStatus === 'compatible' ? '✓' :
                     reviewCompatibility.overallStatus === 'warning' ? '⚠' : '✗'}
                  </span>
                  <div>
                    <p className="font-bold text-xl">
                      {reviewCompatibility.overallStatus === 'compatible' ? 'System Compatible' :
                       reviewCompatibility.overallStatus === 'warning' ? 'Compatibility Warnings' :
                       'Compatibility Issues Found'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {reviewCompatibility.issues.length} {reviewCompatibility.issues.length === 1 ? 'issue' : 'issues'} detected
                    </p>
                  </div>
                </div>
              </div>

              {reviewCompatibility.issues.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0a192f] text-lg">Issues and Solutions</h4>
                  {reviewCompatibility.issues.map((issue, index) => (
                    <div key={index} className={`p-5 rounded-xl border-2 ${
                      issue.status === 'incompatible' ? 'bg-[#fee2e2] border-[#ef4444]' :
                      issue.status === 'warning' ? 'bg-[#fef3c7] border-[#f59e0b]' :
                      'bg-[#d1fae5] border-[#10b981]'
                    }`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">
                          {issue.status === 'incompatible' ? '✗' :
                           issue.status === 'warning' ? '⚠' : '✓'}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-[#0a192f]">{issue.issue}</p>
                          {issue.productName && (
                            <p className="text-sm text-gray-600 mt-1">Affected: {issue.productName}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{issue.explanation}</p>
                      <p className="text-sm text-gray-600 italic bg-white/70 p-3 rounded-lg">
                        <strong>Suggested Fix:</strong> {issue.suggestedFix}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CostBreakdown products={state.selectedProducts} />

            <div className="flex gap-4">
              <button 
                onClick={handleSavePrototype}
                className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-[#0a192f] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all transform hover:-translate-y-0.5"
              >
                Save Prototype
              </button>
              <button 
                onClick={() => setShowQuotationModal(true)}
                className="flex-1 bg-[#1e3a5f] text-white font-bold py-4 rounded-xl hover:bg-[#2a4a7a] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Request Quote
              </button>
            </div>
            
            <button 
              onClick={handleViewFullSummary}
              className="w-full bg-gradient-to-r from-[#0a192f] to-[#1e3a5f] text-white font-bold py-4 rounded-xl hover:from-[#1e3a5f] hover:to-[#2a4a7a] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              View Full Prototype Summary
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepIndex = steps.findIndex(s => s.id === state.currentStep);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Section background="light">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-[#0a192f] mb-6 tracking-tight">Hardware Configurator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build your custom industrial automation system step by step with precision engineering
            </p>
          </div>
        </Section>

        <Section>
          <div className="max-w-7xl mx-auto">
            <StepIndicator
              steps={steps}
              currentStep={state.currentStep}
              onStepClick={handleStepClick}
            />

            <div className="flex gap-8">
              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-premium">
                  <h2 className="text-3xl font-bold text-[#0a192f] mb-8 tracking-tight">
                    {steps[currentStepIndex]?.label}
                  </h2>
                  {renderStepContent()}

                  {state.currentStep !== 'review' && state.currentStep !== 'industry' && (
                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                      >
                        Back
                      </button>
                      {state.currentStep !== 'plc' && state.currentStep !== 'hmi' && 
                       state.currentStep !== 'sensors' && state.currentStep !== 'motors' &&
                       state.currentStep !== 'safety' && state.currentStep !== 'panel' &&
                       state.currentStep !== 'recommendations' && (
                        <button
                          onClick={handleNext}
                          className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-[#0a192f] font-bold rounded-xl hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all transform hover:-translate-y-0.5"
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {state.currentStep !== 'review' && (
                <div className="w-96">
                  <PrototypeSummary
                    selectedProducts={state.selectedProducts}
                    onRemoveProduct={handleRemoveProduct}
                    onContinue={handleNext}
                    currentStep={String(currentStepIndex + 1)}
                    totalSteps={steps.length}
                  />
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer />

      {showQuotationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto">
            <RequestQuotation
              configuratorState={state}
              onClose={() => setShowQuotationModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
