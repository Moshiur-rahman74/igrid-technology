import { Product } from '@/types/product';
import Button from '@/components/ui/Button';
import { calculateCostBreakdown, formatCurrency } from '@/utils/costCalculation';
import { checkCompatibility, getCompatibilityStatusColor, getCompatibilityStatusIcon } from '@/utils/compatibility';

interface PrototypeSummaryProps {
  selectedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onContinue: () => void;
  currentStep: string;
  totalSteps: number;
}

export default function PrototypeSummary({
  selectedProducts,
  onRemoveProduct,
  onContinue,
  currentStep,
  totalSteps,
}: PrototypeSummaryProps) {
  const costSummary = calculateCostBreakdown(selectedProducts);
  const totalCost = costSummary.breakdown.totalProjectCost;
  const hardwareCost = costSummary.breakdown.hardwareCost;
  const compatibilityResult = checkCompatibility(selectedProducts);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-premium">
      <h3 className="text-xl font-bold text-[#0a192f] mb-6 tracking-tight">Prototype Summary</h3>

      <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Total Project Cost:</span>
          <span className="text-3xl font-bold text-[#00d4ff]">{formatCurrency(totalCost)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Hardware Cost:</span>
          <span className="text-gray-800 font-semibold">{formatCurrency(hardwareCost)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Products:</span>
          <span className="text-gray-800 font-semibold">{selectedProducts.length}</span>
        </div>
      </div>

      <div className={`mb-6 p-4 rounded-xl border-2 ${getCompatibilityStatusColor(compatibilityResult.overallStatus)}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCompatibilityStatusIcon(compatibilityResult.overallStatus)}</span>
          <span className="text-sm font-bold">
            {compatibilityResult.overallStatus === 'compatible' ? 'Compatible' :
             compatibilityResult.overallStatus === 'warning' ? 'Compatibility Warnings' :
             'Compatibility Issues'}
          </span>
        </div>
      </div>

      {compatibilityResult.issues.length > 0 && (
        <div className="mb-6 max-h-48 overflow-y-auto">
          <h4 className="text-sm font-bold text-[#0a192f] mb-3">Compatibility Issues</h4>
          <div className="space-y-2">
            {compatibilityResult.issues.map((issue, index) => (
              <div key={index} className={`p-3 rounded-xl border text-xs ${
                issue.status === 'incompatible' ? 'bg-[#fee2e2] border-[#ef4444]' :
                issue.status === 'warning' ? 'bg-[#fef3c7] border-[#f59e0b]' :
                'bg-[#d1fae5] border-[#10b981]'
              }`}>
                <p className="font-bold mb-1">{issue.issue}</p>
                <p className="text-gray-600 mb-1">{issue.explanation}</p>
                <p className="text-gray-500 italic">Fix: {issue.suggestedFix}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 max-h-64 overflow-y-auto">
        <h4 className="text-sm font-bold text-[#0a192f] mb-3">Selected Products</h4>
        {selectedProducts.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No products selected yet</p>
        ) : (
          <div className="space-y-2">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-premium transition-shadow">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0a192f] truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.brand} - ${product.price}</p>
                </div>
                <button
                  onClick={() => onRemoveProduct(product.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={onContinue}
        variant="primary"
        size="md"
        className="w-full"
        disabled={selectedProducts.length === 0}
      >
        Continue to Next Step
      </Button>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 font-medium">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
