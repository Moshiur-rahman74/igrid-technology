import { useState } from 'react';
import { ConfiguratorState } from '@/types/configurator';
import Button from '@/components/ui/Button';
import { calculateCostBreakdown, formatCurrency } from '@/utils/costCalculation';
import { checkCompatibility } from '@/utils/compatibility';
import { supabase } from '@/lib/supabase';
import { QuotationRequestInsert, Json } from '@/types/database';

interface RequestQuotationProps {
  configuratorState: ConfiguratorState;
  onClose: () => void;
}

interface QuotationFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  additionalMessage: string;
}

export default function RequestQuotation({ configuratorState, onClose }: RequestQuotationProps) {
  const [formData, setFormData] = useState<QuotationFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    additionalMessage: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber] = useState(() => `IGRID-${Date.now().toString().slice(-8)}`);

  const costSummary = calculateCostBreakdown(configuratorState.selectedProducts);
  const compatibilityResult = checkCompatibility(configuratorState.selectedProducts);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Check if Supabase is configured
    if (!supabase) {
      setError('Supabase is not configured. Please set up the environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) to submit quotation requests.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the quotation data for Supabase
      const quotationData: QuotationRequestInsert = {
        customer_name: formData.name,
        company_name: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        industry_type: configuratorState.industry,
        machine_type: configuratorState.machine,
        budget_range: configuratorState.budgetRange,
        selected_products: configuratorState.selectedProducts as unknown as Json,
        estimated_cost: costSummary.breakdown.totalProjectCost,
        message: formData.additionalMessage,
        status: 'pending',
      };

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('quotation_requests')
        .insert(quotationData);

      if (insertError) {
        throw insertError;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting quotation request:', err);
      setError('Failed to submit quotation request. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-10 max-w-2xl mx-auto shadow-premium-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#10b981]/20">
            <svg className="w-10 h-10 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#0a192f] mb-4 tracking-tight">Quotation Request Submitted!</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Thank you. IGrid Technology will review your automation requirement and contact you soon.
          </p>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2 font-medium">Reference Number:</p>
            <p className="text-2xl font-bold text-[#00d4ff]">{referenceNumber}</p>
          </div>
          <Button onClick={onClose} variant="primary" size="lg" className="w-full">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-10 max-w-5xl mx-auto shadow-premium-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#0a192f] tracking-tight">Request Quotation</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              placeholder="ABC Manufacturing Ltd."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              placeholder="United States"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Additional Message
          </label>
          <textarea
            name="additionalMessage"
            value={formData.additionalMessage}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all resize-none"
            placeholder="Any specific requirements or questions..."
          />
        </div>

        {error && (
          <div className="mb-8 bg-gradient-to-br from-[#fee2e2] to-[#fecaca] border-2 border-[#ef4444] rounded-xl p-5">
            <p className="text-sm text-[#dc2626] font-medium">{error}</p>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 border border-gray-200 shadow-premium">
          <h3 className="text-xl font-bold text-[#0a192f] mb-6 tracking-tight">Configuration Summary</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Industry</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.industry}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Machine Type</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.machine}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Automation Level</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.automationLevel}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Budget Range</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.budgetRange}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Total Products:</span>
              <span className="font-bold text-[#0a192f]">{configuratorState.selectedProducts.length}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Estimated Hardware Cost:</span>
              <span className="font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.hardwareCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-bold text-lg">Total Project Cost:</span>
              <span className="font-bold text-[#00d4ff] text-2xl">{formatCurrency(costSummary.breakdown.totalProjectCost)}</span>
            </div>
          </div>

          <div className={`mt-6 p-5 rounded-xl border-2 ${
            compatibilityResult.overallStatus === 'compatible' ? 'bg-[#d1fae5] border-[#10b981]' :
            compatibilityResult.overallStatus === 'warning' ? 'bg-[#fef3c7] border-[#f59e0b]' :
            'bg-[#fee2e2] border-[#ef4444]'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {compatibilityResult.overallStatus === 'compatible' ? '✓' :
                 compatibilityResult.overallStatus === 'warning' ? '⚠' : '✗'}
              </span>
              <span className="text-sm font-bold">
                {compatibilityResult.overallStatus === 'compatible' ? 'System Compatible' :
                 compatibilityResult.overallStatus === 'warning' ? 'Compatibility Warnings' :
                 'Compatibility Issues'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Note:</strong> This quotation request will be reviewed by our engineering team. 
            Final pricing may vary based on detailed engineering review and specific project requirements.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quotation Request'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
